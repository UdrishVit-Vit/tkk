// Разметка текста правил: перекрёстные ссылки на правила ширмы
// и подсветка ключевых слов «преимущество» (зелёный) / «помеха» (красный).

import { RULE_LINK_INDEX_5E } from '~/data/ruleLinkIndex5e.js'
import { RULE_SCREENS_5E } from '~/data/ruleScreens5e.js'
import { RULE_SCREEN_LOADERS_5E } from '~/data/ruleScreenRegistry5e.js'
import { EQUIPMENT_5E } from '~/data/equipment5e.js'
import { WEAPONS_5E } from '~/data/weapons5e.js'
import { ARMOR_5E } from '~/data/armor5e.js'
import { MAGIC_ITEMS_5E, MAGIC_ITEM_RARITY_SINGULAR, MAGIC_ITEM_TYPES } from '~/data/magicItems5e.js'
import { SPELLS_5E, SPELL_LEVELS, SPELL_SCHOOLS } from '~/data/spells5e.js'

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
  '/dnd5e/screens/stats_and_skills/honor', // «Честь» в описаниях обычно означает почёт, а не опциональную характеристику
  '/dnd5e/screens/planar_travel/spells-planar', // «Заклинания» — только о планарных перемещениях
  '/dnd5e/screens/spells/saving-throw', // общий «спасбросок» относится к проверкам характеристик
  '/dnd5e/screens/monster/monstrosity', // «Монстры» — тип существа, есть одноимённый раздел
  '/dnd5e/screens/monster/proficiency-bonus', // «Бонус мастерства» — про монстров, не про персонажей
  '/dnd5e/screens/equipment/special', // «Особое»
  '/dnd5e/screens/equipment/hidden', // «Скрытое» — свойство оружия, совпадает с обычным прилагательным
  '/dnd5e/screens/equipment/heavy', // «Тяжёлое»
  '/dnd5e/screens/equipment/light', // «Лёгкое»
  '/dnd5e/screens/language' // «Язык» в обычном тексте не означает каталог игровых языков
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

const SEMANTIC_RULE_PATH = '/dnd5e/screens/damage_and_attack/advantage-and-disadvantage'

// Короткие названия, которые в текстах классов регулярно являются частью
// другого слова, именем или игровым термином. Их страницы остаются доступны
// из каталогов, но автоматическая ссылка по одиночному слову не создаётся.
const ITEM_AUTO_LINK_EXCLUDE = new Set([
  '/dnd5e/equipment?e=book', // линкуем только точное «книга заклинаний» ниже
  '/dnd5e/equipment?e=pole', // «шест» совпадает с числительным «шестью»
  '/dnd5e/equipment?e=perfume', // «духи» почти всегда означает сущностей
  '/dnd5e/equipment?e=arrows', // «стрела» встречается в названиях заклинаний
  '/dnd5e/weapons?w=war-pick', // основа «кирк» совпадает с именем Кирк
  '/dnd5e/spells?s=void' // «пустота» часто употребляется как обычное слово
])

// Слова, которые в обычном тексте гораздо чаще означают не предмет.
const ITEM_CAPITAL_ONLY = new Set([
  '/dnd5e/equipment?e=lock'
])

function itemTitles(title) {
  const full = String(title || '').trim()
  const short = full.replace(/\s*(?:[,([]).*$/, '').trim()
  return [...new Set([full, short].filter(value => value.length >= 4))]
}

function itemEntries(items, path, queryKey, section, summary) {
  return items.flatMap(item => {
    const itemPath = `${path}?${queryKey}=${encodeURIComponent(item.id)}`
    if (ITEM_AUTO_LINK_EXCLUDE.has(itemPath)) return []
    return itemTitles(item.title).map(title => ({
      title,
      titleEn: item.englishName || '',
      path: itemPath,
      summary: summary(item),
      section,
      kind: 'item'
    }))
  })
}

const REFERENCE_LINKS = [
  ...itemEntries(
    EQUIPMENT_5E,
    '/dnd5e/equipment',
    'e',
    'Снаряжение',
    item => [item.description, item.cost && `Стоимость: ${item.cost}.`, item.weight && `Вес: ${item.weight}.`].filter(Boolean).join(' ')
  ),
  ...itemEntries(
    WEAPONS_5E,
    '/dnd5e/weapons',
    'w',
    'Оружие',
    item => [item.lore, item.damage && `Урон: ${item.damage}.`, item.cost && `Стоимость: ${item.cost}.`].filter(Boolean).join(' ')
  ),
  ...itemEntries(
    ARMOR_5E,
    '/dnd5e/armor',
    'a',
    'Доспехи',
    item => [item.lore, item.armorClass && `КД: ${item.armorClass}.`, item.cost && `Стоимость: ${item.cost}.`].filter(Boolean).join(' ')
  ),
  ...itemEntries(
    MAGIC_ITEMS_5E,
    '/dnd5e/magic-items',
    'm',
    'Магические предметы',
    item => [item.description, MAGIC_ITEM_RARITY_SINGULAR[item.rarity], MAGIC_ITEM_TYPES[item.type]].filter(Boolean).join(' · ')
  ),
  ...itemEntries(
    SPELLS_5E,
    '/dnd5e/spells',
    's',
    'Заклинания',
    spell => [spell.description, SPELL_LEVELS[spell.level], SPELL_SCHOOLS[spell.school]].filter(Boolean).join(' · ')
  ),
  {
    title: 'Гнев Ильбеша',
    titleEn: 'Wrath of Ilbesh',
    path: '/dnd5e/wrath',
    summary: 'Особая система последствий, возникающих при обращении к силе Ильбеша.',
    section: 'Правила Эноа',
    kind: 'reference'
  }
]

const REFERENCE_TOOLTIP_BY_PATH = new Map()
for (const entry of REFERENCE_LINKS) {
  if (!REFERENCE_TOOLTIP_BY_PATH.has(entry.path)) {
    REFERENCE_TOOLTIP_BY_PATH.set(entry.path, {
      title: entry.title,
      titleEn: entry.titleEn,
      summary: entry.summary,
      section: entry.section
    })
  }
}

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
  compiled = [...RULE_LINK_INDEX_5E, ...LINK_ALIASES, ...REFERENCE_LINKS]
    .filter(entry => entry.title && entry.title.length >= (entry.kind ? 4 : 5) && !LINK_EXCLUDE_PATHS.has(entry.path))
    .map(entry => {
      const pattern = entry.title.trim().split(/\s+/).map(wordPattern).join('\\s+')
      return {
        path: entry.path,
        title: entry.title,
        capitalOnly: LINK_CAPITAL_ONLY_PATHS.has(entry.path) || ITEM_CAPITAL_ONLY.has(entry.path),
        rx: new RegExp(`(?<![а-яёa-z0-9])(?:${pattern})(?![а-яёa-z0-9])`, 'iu'),
        weight: entry.title.length
      }
    })
    .sort((a, b) => b.weight - a.weight)
  return compiled
}

// Механический термин обычно употребляется как «преимущество» или
// «с преимуществом». Не захватываем обычные «преимущества» и «преимущественно».
const ADVANTAGE_RX = /(?<![а-яё])преимуществ(?:о|ом)(?![а-яё])/giu
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

  const reference = REFERENCE_TOOLTIP_BY_PATH.get(path)
  if (reference) {
    tooltipCache.set(path, reference)
    return reference
  }

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

  // Цветовая семантика важнее обычной ссылки: даже внутри названия правила
  // «Преимущество и помеха» каждое слово сохраняет свой цвет.
  for (const [rx, type] of [[ADVANTAGE_RX, 'adv'], [DISADVANTAGE_RX, 'dis']]) {
    rx.lastIndex = 0
    let match
    while ((match = rx.exec(text))) {
      const start = match.index
      const end = start + match[0].length
      if (!overlaps(ranges, start, end)) ranges.push({ start, end, type, path: SEMANTIC_RULE_PATH })
    }
  }

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
