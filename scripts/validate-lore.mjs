#!/usr/bin/env node
// Проверка свода лора по контракту сущности (app/data/loreEntity.js).
//
// Проверяется не только форма записи, но и связность: битые ссылки, дубли
// слагов, главы за пределами сезона, синонимы, ведущие сразу в две статьи.
// Именно связность ломалась в этом своде чаще всего — форму видно и глазами.
//
// Запуск: pnpm lore:check

import { readFileSync, writeFileSync, mkdtempSync, rmSync, cpSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DATA = join(ROOT, 'app', 'data')

// Модули данных написаны для сборщика: JSON они импортируют без атрибута типа,
// который требует голый Node. Копируем каталог данных целиком и правим только
// этот импорт — так любые связи между модулями разрешаются сами, и загрузчик
// не приходится чинить при каждом новом файле.
const REVIEW = process.argv.includes('--types')

function loadGlossary() {
  const dir = mkdtempSync(join(tmpdir(), 'lore-check-'))
  cpSync(DATA, dir, { recursive: true })

  const ogni = join(dir, 'loreOgniGlossary', 'index.js')
  const json = pathToFileURL(join(dir, 'loreOgniGlossary', 'season-01.generated.json')).href
  writeFileSync(ogni, readFileSync(ogni, 'utf8').replace(
    "from './season-01.generated.json'",
    `from ${JSON.stringify(json)} with { type: 'json' }`,
  ), 'utf8')

  const glossary = pathToFileURL(join(dir, 'loreGlossary.js')).href
  return import(glossary).finally(() => rmSync(dir, { recursive: true, force: true }))
}

const {
  LORE_GLOSSARY,
  LORE_ENTITY_TYPES,
  LORE_GLOSSARY_SOURCES,
  LORE_ENTITY_SCHEMA,
  SLUG_PATTERN,
  loreMatchKey,
} = await loadGlossary()

const problems = []
const note = (level, entry, message) => problems.push({ level, id: entry?.id || '—', message })

// ——— Форма записи по контракту ———
const ids = new Map()
for (const entry of LORE_GLOSSARY) {
  for (const [field, rule] of Object.entries(LORE_ENTITY_SCHEMA.fields)) {
    const value = entry[field]
    if (rule.type === 'string[]') {
      if (value === undefined) {
        if (rule.required) note('ошибка', entry, `нет поля «${field}»`)
        continue
      }
      if (!Array.isArray(value)) note('ошибка', entry, `«${field}» должно быть списком`)
      else if (rule.minItems && value.length < rule.minItems) note('ошибка', entry, `«${field}» пусто`)
      continue
    }
    if (rule.required && (value === undefined || value === null || value === '')) {
      note('ошибка', entry, `нет поля «${field}»`)
      continue
    }
    if (rule.type === 'enum' && value !== undefined && !rule.values.has(value)) {
      note('ошибка', entry, `«${field}» = «${value}» вне списка допустимых`)
    }
    if (rule.type === 'slug' && value !== undefined && !SLUG_PATTERN.test(value)) {
      note('ошибка', entry, `слаг «${value}» не годится для адреса`)
    }
  }

  if (ids.has(entry.id)) note('ошибка', entry, `слаг повторяется: уже занят статьёй «${ids.get(entry.id)}»`)
  else ids.set(entry.id, entry.title)

  for (const source of entry.sources || []) {
    if (!LORE_GLOSSARY_SOURCES[source]) note('ошибка', entry, `неизвестный источник «${source}»`)
  }
}

// ——— Связность ———
const byId = new Map(LORE_GLOSSARY.map(entry => [entry.id, entry]))
const seasonLength = new Map()

for (const entry of LORE_GLOSSARY) {
  for (const id of entry.related || []) {
    if (!byId.has(id)) note('ошибка', entry, `ссылка «related» ведёт в никуда: ${id}`)
  }
  // Одна и та же связь внесена дважды, когда новую добавили, не заметив
  // старой: в карточке она удваивается, а основания расходятся. Пара статей с
  // двумя разными связями — не ошибка: Ха’ар и Мардук и братья, и противники.
  const pairs = new Set()
  for (const link of entry.links || []) {
    if (!byId.has(link.id)) note('ошибка', entry, `типизированная связь ведёт в никуда: ${link.id}`)
    if (link.id === entry.id) note('ошибка', entry, 'типизированная связь указывает на саму статью')
    if (!link.label) note('предупреждение', entry, `у связи с «${link.term}» нет подписи`)
    const pair = `${link.id}|${link.type}`
    if (pairs.has(pair)) note('предупреждение', entry, `связь «${link.label}» с «${link.term}» внесена дважды`)
    pairs.add(pair)
  }
  for (const relation of entry.ogni?.relations || []) {
    if (!byId.has(relation.id) && !LORE_GLOSSARY.some(item => item.ogniId === relation.id)) {
      note('предупреждение', entry, `связь ведёт в никуда: ${relation.term} (${relation.id})`)
    }
  }
  const season = entry.ogni?.season
  if (season && entry.ogni?.chapters?.length) {
    seasonLength.set(season, Math.max(seasonLength.get(season) || 0, ...entry.ogni.chapters))
  }
}

for (const entry of LORE_GLOSSARY) {
  const season = entry.ogni?.season
  if (!season) continue
  const limit = seasonLength.get(season) || 0
  for (const claim of entry.ogni.claims || []) {
    if (claim.chapter < 1 || claim.chapter > limit) {
      note('ошибка', entry, `утверждение указывает на главу ${claim.chapter}, а в сезоне их ${limit}`)
    }
  }
}

// Синоним, ведущий в две статьи, делает ссылку в тексте непредсказуемой.
const aliasOwners = new Map()
for (const entry of LORE_GLOSSARY) {
  for (const name of [entry.title, ...(entry.aliases || [])]) {
    const key = loreMatchKey(name)
    if (!key) continue
    const owner = aliasOwners.get(key)
    if (owner && owner !== entry.id) {
      note('предупреждение', entry, `имя «${name}» уже ведёт в статью «${byId.get(owner)?.title || owner}»`)
    } else {
      aliasOwners.set(key, entry.id)
    }
  }
}

// ——— Отчёт ———
const errors = problems.filter(item => item.level === 'ошибка')
const warnings = problems.filter(item => item.level === 'предупреждение')

console.log(`Статей: ${LORE_GLOSSARY.length}; ошибок: ${errors.length}; предупреждений: ${warnings.length}`)

const byStatus = LORE_GLOSSARY.reduce((acc, entry) => {
  acc[entry.status] = (acc[entry.status] || 0) + 1
  return acc
}, {})
console.log('По статусу знания:', Object.entries(byStatus).map(([k, v]) => `${k} — ${v}`).join(', '))

const show = (title, list, limit = 25) => {
  if (!list.length) return
  console.log(`\n${title}`)
  for (const item of list.slice(0, limit)) console.log(`  ${item.id}: ${item.message}`)
  if (list.length > limit) console.log(`  … и ещё ${list.length - limit}`)
}
show('Ошибки', errors)
show('Предупреждения', warnings)

// Вид определяется правилами, и правила ошибаются. Отчёт для ревизии: автор
// проходит список глазами, а несогласия закрепляет в TYPE_OVERRIDES.
if (REVIEW) {
  const lines = ['# Виды статей — на проверку', '',
    'Вид выведен правилами (`app/data/loreEntity.js`). Что разобрано неверно,',
    'закрепляется строкой в `TYPE_OVERRIDES` — переразмечать весь свод не нужно.', '']
  for (const type of LORE_ENTITY_TYPES) {
    const list = LORE_GLOSSARY.filter(entry => entry.type === type.id)
    if (!list.length) continue
    lines.push(`## ${type.title} — ${list.length}`, '')
    for (const entry of list) lines.push(`- **${entry.term}** \`${entry.id}\` — ${entry.summary.slice(0, 110)}`)
    lines.push('')
  }
  const target = join(ROOT, 'app', 'data', 'lore-types.review.md')
  writeFileSync(target, lines.join(String.fromCharCode(10)), 'utf8')
  console.log(`
Отчёт по видам: ${target}`)
}

process.exit(errors.length ? 1 : 0)
