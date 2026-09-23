#!/usr/bin/env node
// Проверка свода лора по контракту сущности (app/data/loreEntity.js).
//
// Проверяется не только форма записи, но и связность: битые ссылки, дубли
// слагов, главы за пределами сезона, синонимы, ведущие сразу в две статьи.
// Именно связность ломалась в этом своде чаще всего — форму видно и глазами.
//
// Запуск: pnpm lore:check

import { readFileSync, writeFileSync, mkdtempSync, rmSync, cpSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DATA = join(ROOT, 'app', 'data')
const { GEOGRAPHY_SHARDS, GEOGRAPHY_REGIONS } = await import(pathToFileURL(join(DATA, 'loreGeography.js')).href)

// Модули данных написаны для сборщика: JSON они импортируют без атрибута типа,
// который требует голый Node. Копируем каталог данных целиком и правим только
// этот импорт — так любые связи между модулями разрешаются сами, и загрузчик
// не приходится чинить при каждом новом файле.
const REVIEW = process.argv.includes('--types')

function loadGlossary() {
  const dir = mkdtempSync(join(tmpdir(), 'lore-check-'))
  cpSync(DATA, dir, { recursive: true })

  const ogni = join(dir, 'loreOgniGlossary', 'index.js')
  const source = readFileSync(ogni, 'utf8').replace(
    /from '\.\/(season-\d+\.generated\.json)'/g,
    (_, filename) => {
      const json = pathToFileURL(join(dir, 'loreOgniGlossary', filename)).href
      return `from ${JSON.stringify(json)} with { type: 'json' }`
    },
  )
  writeFileSync(ogni, source, 'utf8')

  const glossary = pathToFileURL(join(dir, 'loreGlossary.js')).href
  return import(glossary).finally(() => rmSync(dir, { recursive: true, force: true }))
}

const {
  LORE_GLOSSARY,
  LORE_ENTITY_TYPES,
  LORE_GLOSSARY_SOURCES,
  LORE_GLOSSARY_SEASONS,
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
for (const shard of GEOGRAPHY_SHARDS) {
  if (byId.get(shard.glossaryId)?.category !== 'places') {
    note('ошибка', { id: shard.id }, `география ссылается на отсутствующее место: ${shard.glossaryId}`)
  }
  for (const thread of shard.threads || []) {
    if (!byId.has(thread.glossaryId)) note('ошибка', { id: shard.id }, `география ссылается на отсутствующую статью: ${thread.glossaryId}`)
  }
}
for (const region of GEOGRAPHY_REGIONS) {
  if (region.map && !existsSync(join(ROOT, 'public', region.map.replace(/^\//, '')))) {
    note('ошибка', { id: region.id }, `не найдена карта: ${region.map}`)
  }
  const names = region.groups.flatMap(group => group.names)
  if (new Set(names).size !== names.length) note('ошибка', { id: region.id }, 'название места повторяется в регионе')
  if (region.areas) {
    const areaNames = region.areas.flatMap(area => area.names)
    if (new Set(areaNames).size !== areaNames.length) note('ошибка', { id: region.id }, 'место повторяется в географических областях')
    for (const name of names) {
      if (!areaNames.includes(name)) note('ошибка', { id: region.id }, `место не распределено по областям: ${name}`)
    }
    for (const name of areaNames) {
      if (!names.includes(name)) note('ошибка', { id: region.id }, `в области указано неизвестное место: ${name}`)
    }
  }
  const markers = region.markers || []
  if (markers.length && !region.map) note('ошибка', { id: region.id }, 'отметки указаны без карты')
  if (new Set(markers.map(item => item.name)).size !== markers.length) note('ошибка', { id: region.id }, 'отметка на карте повторяется')
  for (const marker of markers) {
    if (!names.includes(marker.name)) note('ошибка', { id: region.id }, `отметки «${marker.name}» нет в указателе`)
    if (![marker.x, marker.y].every(value => Number.isFinite(value) && value >= 0 && value <= 100)) {
      note('ошибка', { id: region.id }, `неверные координаты отметки «${marker.name}»`)
    }
  }
}
const seasonLength = new Map(
  LORE_GLOSSARY_SEASONS.map(item => [item.season, item.chapterCount]),
)

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
}

for (const entry of LORE_GLOSSARY) {
  for (const claim of entry.ogni?.claims || []) {
    const season = claim.season || entry.ogni?.season
    const limit = seasonLength.get(season) || 0
    if (claim.chapter < 1 || claim.chapter > limit) {
      note('ошибка', entry, `утверждение указывает на сезон ${season}, главу ${claim.chapter}, а в сезоне их ${limit}`)
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
