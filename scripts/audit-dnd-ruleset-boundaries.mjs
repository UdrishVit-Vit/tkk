import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import gameIcons from '@iconify-json/game-icons/icons.json' with { type: 'json' }

import { RULE_LINK_INDEX_5E } from '../app/data/ruleLinkIndex5e.js'
import { RULE_SCREENS_5E } from '../app/data/ruleScreens5e.js'
import { DND55E_FEATS } from '../app/data/dnd55e/feats.js'
import { DND55E_GLOSSARY } from '../app/data/dnd55e/glossary.js'
import { DND55E_GLOSSARY_ICON_NAMES } from '../app/data/dnd55e/glossary-icons.js'
import { DND55E_SPELLS } from '../app/data/dnd55e/spells.js'
import { tokenizeRuleText55e } from '../app/utils/ruleText55e.js'

const errors = []

for (const entry of RULE_LINK_INDEX_5E) {
  if (!entry.path.startsWith('/dnd5e/')) errors.push(`Индекс 2014 вышел за /dnd5e: ${entry.path}`)
}

for (const screen of RULE_SCREENS_5E) {
  if (!screen.path.startsWith('/dnd5e/screens')) errors.push(`Раздел ширмы 2014 вышел за /dnd5e/screens: ${screen.path}`)
}

const glossaryIds = new Set(DND55E_GLOSSARY.map(item => item.id))
const availableGameIcons = new Set(Object.keys(gameIcons.icons))
if (glossaryIds.size !== DND55E_GLOSSARY.length) {
  errors.push('В глоссарии 2024 есть повторяющиеся идентификаторы')
}

for (const item of DND55E_GLOSSARY) {
  const iconName = DND55E_GLOSSARY_ICON_NAMES[item.id]
  if (!iconName || !availableGameIcons.has(iconName) || item.icon !== `i-game-icons-${iconName}`) {
    errors.push(`У правила 2024 нет локальной семантической иконки: ${item.id}`)
  }
  if (!item.summary?.trim()) errors.push(`У правила 2024 нет краткого определения: ${item.id}`)
  if (!Array.isArray(item.paragraphs) || !item.paragraphs.some(text => text?.trim())) {
    errors.push(`У правила 2024 нет автономного описания: ${item.id}`)
  }
  if (!Array.isArray(item.quick) || item.quick.length < 2 || item.quick.some(fact => !fact?.label?.trim() || !fact?.value?.trim())) {
    errors.push(`У правила 2024 нет кратких параметров: ${item.id}`)
  }
  if (!Array.isArray(item.sections) || item.sections.length < 4 || item.sections.some(section => (
    !section?.title?.trim()
    || (!section.paragraphs?.some(text => text?.trim()) && !section.bullets?.some(text => text?.trim()))
  ))) {
    errors.push(`У правила 2024 нарушена структура разделов: ${item.id}`)
  }
  for (const requiredKind of ['example', 'gm', 'nuance']) {
    if (!item.sections?.some(section => section.kind === requiredKind)) {
      errors.push(`У правила 2024 нет прикладного раздела «${requiredKind}»: ${item.id}`)
    }
  }
  if ('sourceUrl' in item || 'url' in item) {
    errors.push(`Правило 2024 зависит от внешней страницы: ${item.id}`)
  }
}

const ruleTexts2024 = [
  ...DND55E_SPELLS.flatMap(item => [item.description, item.upgrade]),
  ...DND55E_FEATS.flatMap(item => item.benefits.map(benefit => benefit.text))
].filter(Boolean)

for (const text of ruleTexts2024) {
  for (const token of tokenizeRuleText55e(text)) {
    if (!token.path) continue
    if (!token.path.startsWith('/dnd55e/glossary?rule=')) {
      errors.push(`Термин 2024 ведёт за пределы глоссария: ${token.path}`)
      continue
    }
    const id = new URL(token.path, 'http://localhost').searchParams.get('rule')
    if (!glossaryIds.has(id)) errors.push(`Термин 2024 ведёт на отсутствующую карточку: ${token.path}`)
  }
}

async function filesUnder(directory) {
  const result = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) result.push(...await filesUnder(fullPath))
    else if (/\.(?:js|md|vue|ts)$/u.test(entry.name)) result.push(fullPath)
  }
  return result
}

for (const directory of ['app/components/dnd55e', 'app/data/dnd55e', 'app/pages/dnd55e', 'content/dnd55e']) {
  for (const file of await filesUnder(directory)) {
    const source = await readFile(file, 'utf8')
    if (source.includes('/dnd5e')) errors.push(`Прямая ссылка на 2014 внутри ветки 2024: ${file}`)
    if (/https?:\/\//u.test(source)) errors.push(`Внешняя веб-зависимость внутри ветки правил 2024: ${file}`)
    if (/sourceUrl/u.test(source)) errors.push(`Поле внешнего источника внутри ветки правил 2024: ${file}`)
    if (/from\s+['"][^'"]*(?:ruleText5e|ruleLinkIndex5e|ruleScreens5e|spells5e)[^'"]*['"]/u.test(source)) {
      errors.push(`Импорт данных 2014 внутри ветки 2024: ${file}`)
    }
  }
}

const ruleText2014 = await readFile('app/utils/ruleText5e.js', 'utf8')
const ruleText2024 = await readFile('app/utils/ruleText55e.js', 'utf8')
if (ruleText2014.includes('/dnd55e') || ruleText2014.includes('data/dnd55e')) {
  errors.push('Обработчик терминов 2014 зависит от ветки 2024')
}
if (ruleText2024.includes("'/dnd5e/") || ruleText2024.includes('data/ruleLinkIndex5e')) {
  errors.push('Обработчик терминов 2024 зависит от ветки 2014')
}

console.log(JSON.stringify({
  rules2014: RULE_LINK_INDEX_5E.length,
  screens2014: RULE_SCREENS_5E.length,
  glossary2024: DND55E_GLOSSARY.length,
  checkedTexts2024: ruleTexts2024.length,
  errors
}, null, 2))

if (errors.length) process.exitCode = 1
