// Разметка текста правил: перекрёстные ссылки на правила ширмы
// и подсветка ключевых слов «преимущество» (зелёный) / «помеха» (красный).

import { RULE_LINK_INDEX_5E } from '~/data/ruleLinkIndex5e.js'
import { RULE_SCREENS_5E } from '~/data/ruleScreens5e.js'
import { RULE_SCREEN_LOADERS_5E } from '~/data/ruleScreenRegistry5e.js'

let compiled = null

// Цели, которые чаще путают, чем помогают: общеупотребимые слова,
// совпадающие с названиями узких правил из чужого контекста.
const LINK_EXCLUDE_PATHS = new Set([
  '/dnd5e/screens/origins/random-status', // «Состояние» — социальное положение, а не игровые состояния
  '/dnd5e/screens/downtime_activities/recuperating', // «Восстановление» — занятие в простое
  '/dnd5e/screens/downtime_activities/work', // «Работа»
  '/dnd5e/screens/downtime_activities/relaxation', // «Отдых» — не короткий/продолжительный отдых
  '/dnd5e/screens/origins/adventures-events', // «Приключения»
  '/dnd5e/screens/origins/random-alignment', // «Мировоззрение» — случайная таблица, не описание мировоззрений
  '/dnd5e/screens/origins/random-relationship', // «Отношения»
  '/dnd5e/screens/origins/random-occupation', // «Род занятий»
  '/dnd5e/screens/origins/punishment-events', // «Наказание»
  '/dnd5e/screens/origins/crime-events', // «Преступление»
  '/dnd5e/screens/planar_travel/spells-planar', // «Заклинания» — только о планарных перемещениях
  '/dnd5e/screens/monster/monstrosity', // «Монстры» — тип существа, есть одноимённый раздел
  '/dnd5e/screens/monster/proficiency-bonus', // «Бонус мастерства» — про монстров, не про персонажей
  '/dnd5e/screens/equipment/special', // «Особое»
  '/dnd5e/screens/equipment/hidden', // «Скрытое» — свойство оружия, совпадает с обычным прилагательным
  '/dnd5e/screens/equipment/heavy', // «Тяжёлое»
  '/dnd5e/screens/equipment/light' // «Лёгкое»
])

// Односложные названия навыков и действий, совпадающие с обычными словами:
// линкуем только когда слово написано с заглавной буквы (например, «проверка Интеллекта (История)»).
const LINK_CAPITAL_ONLY_PATHS = new Set([
  '/dnd5e/screens/stats_and_skills/history', // История
  '/dnd5e/screens/stats_and_skills/arcana', // Магия
  '/dnd5e/screens/stats_and_skills/nature', // Природа
  '/dnd5e/screens/action/help' // Помощь — «с помощью верёвки» не про действие
])

// Частые термины, у которых нет прямого совпадения по заголовку с нужным разделом.
const LINK_ALIASES = [
  { title: 'Состояние', path: '/dnd5e/screens/conditions_and_disease' }
]

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Слово с допуском на русские окончания: «труднопроходимая» найдёт и «труднопроходимой».
// Основа получается срезанием только гласного окончания (не более 3 букв) — так
// «Механус» остаётся «механус» и не ловит «механизм», а «ловушка» → «ловушк» ловит «ловушки».
function wordPattern(word) {
  const clean = word.toLowerCase()
  if (!/^[а-яё-]+$/.test(clean)) return escapeRegExp(clean)
  const stem = clean.replace(/[аеёиоуыэюяйь]{1,3}$/, '')
  if (stem.length < 4 || stem === clean) return escapeRegExp(clean) + '[аеёиоуыэюяйь]{0,2}'
  return escapeRegExp(stem) + '[а-яё]{0,3}'
}

function compileIndex() {
  compiled = [...RULE_LINK_INDEX_5E, ...LINK_ALIASES]
    .filter(entry => entry.title && entry.title.length >= 5 && !LINK_EXCLUDE_PATHS.has(entry.path))
    .map(entry => {
      const pattern = entry.title.trim().split(/\s+/).map(wordPattern).join('\\s+')
      return {
        path: entry.path,
        title: entry.title,
        capitalOnly: LINK_CAPITAL_ONLY_PATHS.has(entry.path),
        rx: new RegExp(`(?<![а-яёa-z0-9])(?:${pattern})(?![а-яёa-z0-9])`, 'iu'),
        weight: entry.title.length
      }
    })
    .sort((a, b) => b.weight - a.weight)
  return compiled
}

const ADVANTAGE_RX = /преимуществ[а-яё]*/giu
const DISADVANTAGE_RX = /помех[а-яё]*/giu

// Обозначения бросков: 1к6, 2к8, к20, 1к10 + 2, поддерживается и латинское d.
const DICE_RX = /(?<![а-яёa-z0-9])(\d{1,2})?[кd](4|6|8|10|12|20|100)(\s*[+−-]\s*\d{1,3})?(?![а-яёa-z0-9])/giu

function overlaps(ranges, start, end) {
  return ranges.some(r => start < r.end && end > r.start)
}

const tooltipCache = new Map()

/**
 * Краткая сводка для всплывающей подсказки по пути правила или раздела ширмы.
 * Данные раздела подгружаются лениво из того же реестра, что и аккордеон.
 */
export async function getRuleTooltip(path) {
  if (tooltipCache.has(path)) return tooltipCache.get(path)

  const parts = String(path).split('/').filter(Boolean) // ['dnd5e', 'screens', section, rule?]
  const sectionSlug = parts[2]
  const ruleSlug = parts[3]
  let info = null

  if (!ruleSlug) {
    const screen = RULE_SCREENS_5E.find(item => item.slug === sectionSlug)
    if (screen) info = { title: screen.title, titleEn: screen.titleEn, summary: screen.summary, section: 'Раздел ширмы' }
  } else if (RULE_SCREEN_LOADERS_5E[sectionSlug]) {
    try {
      const data = await RULE_SCREEN_LOADERS_5E[sectionSlug]()
      for (const group of data.groups) {
        const rule = group.rules.find(item => item.slug === ruleSlug)
        if (rule) {
          info = { title: rule.title, titleEn: rule.titleEn, summary: rule.summary, section: data.screen.title }
          break
        }
      }
    } catch {
      info = null
    }
  }

  tooltipCache.set(path, info)
  return info
}

/**
 * Разбивает текст на токены: { type: 'text'|'link'|'adv'|'dis', text, path? }.
 * currentPath исключает ссылку правила на самого себя, excludePaths — контекстно неверные
 * совпадения; на каждую цель ставится не более одной ссылки.
 */
export function tokenizeRuleText(text, currentPath = '', excludePaths = []) {
  if (!text) return []
  const index = compiled || compileIndex()
  const ranges = []
  const contextualExcludes = new Set(excludePaths)

  // Раздел, внутри которого находится текущее правило: ссылка на него — шум.
  const ownSectionPath = currentPath.split('/').slice(0, 4).join('/')

  for (const entry of index) {
    if (entry.path === currentPath || entry.path === ownSectionPath || contextualExcludes.has(entry.path)) continue
    const match = entry.rx.exec(text)
    if (!match) continue
    if (entry.capitalOnly && !/^[А-ЯЁ]/.test(match[0])) continue
    const start = match.index
    const end = start + match[0].length
    if (overlaps(ranges, start, end)) continue
    if (ranges.some(r => r.path === entry.path)) continue
    ranges.push({ start, end, type: 'link', path: entry.path })
  }

  for (const [rx, type] of [[ADVANTAGE_RX, 'adv'], [DISADVANTAGE_RX, 'dis']]) {
    rx.lastIndex = 0
    let match
    while ((match = rx.exec(text))) {
      const start = match.index
      const end = start + match[0].length
      if (!overlaps(ranges, start, end)) ranges.push({ start, end, type })
    }
  }

  DICE_RX.lastIndex = 0
  let diceMatch
  while ((diceMatch = DICE_RX.exec(text))) {
    const start = diceMatch.index
    const end = start + diceMatch[0].length
    if (overlaps(ranges, start, end)) continue
    ranges.push({
      start,
      end,
      type: 'dice',
      dice: {
        count: diceMatch[1] ? parseInt(diceMatch[1], 10) : 1,
        sides: parseInt(diceMatch[2], 10),
        mod: diceMatch[3] ? parseInt(diceMatch[3].replace(/\s/g, '').replace('−', '-'), 10) : 0
      }
    })
  }

  ranges.sort((a, b) => a.start - b.start)

  const tokens = []
  let cursor = 0
  for (const range of ranges) {
    if (range.start > cursor) tokens.push({ type: 'text', text: text.slice(cursor, range.start) })
    tokens.push({ type: range.type, text: text.slice(range.start, range.end), path: range.path, dice: range.dice })
    cursor = range.end
  }
  if (cursor < text.length) tokens.push({ type: 'text', text: text.slice(cursor) })

  return tokens
}
