// Разметка текста правил D&D 5.5e (2024).
// Этот индекс намеренно знает только о /dnd55e/glossary и не импортирует данные 2014 года.

import { DND55E_GLOSSARY } from '../data/dnd55e/glossary.js'

let compiled = null

const GLOSSARY_PATH = '/dnd55e/glossary'
const ADVANTAGE_PATH = `${GLOSSARY_PATH}?rule=advantage-phb`
const DISADVANTAGE_PATH = `${GLOSSARY_PATH}?rule=disadvantage-phb`

// Общеупотребимые слова создают ссылку только при терминологическом написании
// с заглавной буквы, принятом в текстах редакции 2024 года.
const CAPITAL_ONLY_TITLES = new Set([
  'Атака', 'Влияние', 'Действие', 'Засада', 'Изучение', 'Использование', 'Магия',
  'Поиск', 'Помощь', 'Рывок', 'Враг', 'Лечение', 'Монстр', 'Навык', 'Объект',
  'Опасность', 'Оружие', 'Размер', 'Скорость', 'Состояние', 'Союзник', 'Существо',
  'Смерть', 'Сцена', 'Тьма', 'Урон', 'Цель', 'Языки', 'Падение'
])

const CAPITAL_ONLY_CATEGORIES = new Set([
  'actions',
  'skills',
  'conditions',
  'weapon-properties',
  'weapon-masteries',
  'attitudes'
])

const AUTO_LINK_EXCLUDE_IDS = new Set([
  'per-day-phb',
  'campaign-phb',
  'adventure-phb',
  'character-sheet-phb',
  'rules-glossary-phb'
])

const GLOSSARY_BY_ID = new Map(DND55E_GLOSSARY.map(item => [item.id, item]))

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function wordPattern(word) {
  const clean = word.toLocaleLowerCase('ru')
  if (!/^[а-яё-]+$/u.test(clean)) return escapeRegExp(clean)
  const stem = clean.replace(/[аеёиоуыэюяйь]{1,3}$/u, '')
  if (stem.length < 4 || stem === clean) return `${escapeRegExp(clean)}[аеёиоуыэюяйь]{0,2}`
  return `${escapeRegExp(stem)}[а-яё]{0,3}`
}

function rulePath(id) {
  return `${GLOSSARY_PATH}?rule=${encodeURIComponent(id)}`
}

function compileIndex() {
  compiled = DND55E_GLOSSARY
    // Автоматические ссылки в текстах PHB ведут только на термины PHB.
    // Правила DMG и дополнений остаются в каталоге и подключаются вручную в
    // соответствующем контексте, чтобы «провал» спасброска не стал «Провалом»
    // местности, а название заклинания — одноимённой опасностью.
    .filter(item => item.source === 'PHB' && !AUTO_LINK_EXCLUDE_IDS.has(item.id))
    .flatMap(item => [
      { title: item.title, item },
      { title: item.originalName, item }
    ])
    .filter(entry => entry.title && entry.title.length >= 4)
    .map((entry) => {
      const pattern = entry.title.trim().split(/\s+/u).map(wordPattern).join('\\s+')
      return {
        path: rulePath(entry.item.id),
        title: entry.title,
        capitalOnly: CAPITAL_ONLY_TITLES.has(entry.item.title)
          || CAPITAL_ONLY_CATEGORIES.has(entry.item.category),
        rx: new RegExp(`(?<![а-яёa-z0-9])(?:${pattern})(?![а-яёa-z0-9])`, 'iu'),
        weight: entry.title.length
      }
    })
    .sort((a, b) => b.weight - a.weight)
  return compiled
}

const ADVANTAGE_RX = /(?<![а-яё])преимуществ(?:о|ом)(?![а-яё])/giu
const DISADVANTAGE_RX = /помех[а-яё]*/giu
const DICE_RX = /(?<![а-яёa-z0-9])(\d{1,2})?[кd](4|6|8|10|12|20|100)(\s*[+−-]\s*\d{1,3})?(?![а-яёa-z0-9])/giu

function overlaps(ranges, start, end) {
  return ranges.some(range => start < range.end && end > range.start)
}

export function getRuleTooltip55e(path) {
  let id = ''
  try {
    id = new URL(String(path || ''), 'http://localhost').searchParams.get('rule') || ''
  } catch {
    return null
  }

  const item = GLOSSARY_BY_ID.get(id)
  if (!item) return null

  return {
    path: rulePath(item.id),
    title: item.title,
    titleEn: item.originalName,
    summary: item.summary,
    section: `${item.categoryTitle} · ${item.source}`
  }
}

export function tokenizeRuleText55e(text, currentPath = '', excludePaths = []) {
  if (!text) return []
  const index = compiled || compileIndex()
  const ranges = []
  const contextualExcludes = new Set(excludePaths)

  for (const [rx, type, path] of [
    [ADVANTAGE_RX, 'adv', ADVANTAGE_PATH],
    [DISADVANTAGE_RX, 'dis', DISADVANTAGE_PATH]
  ]) {
    rx.lastIndex = 0
    let match
    while ((match = rx.exec(text))) {
      const start = match.index
      const end = start + match[0].length
      if (!overlaps(ranges, start, end)) ranges.push({ start, end, type, path })
    }
  }

  for (const entry of index) {
    if (entry.path === currentPath || contextualExcludes.has(entry.path)) continue
    const match = entry.rx.exec(text)
    if (!match) continue
    if (entry.capitalOnly && !/^[А-ЯЁ]/u.test(match[0])) continue
    const start = match.index
    const end = start + match[0].length
    if (overlaps(ranges, start, end)) continue
    if (ranges.some(range => range.path === entry.path)) continue
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
        count: diceMatch[1] ? Number.parseInt(diceMatch[1], 10) : 1,
        sides: Number.parseInt(diceMatch[2], 10),
        mod: diceMatch[3] ? Number.parseInt(diceMatch[3].replace(/\s/gu, '').replace('−', '-'), 10) : 0
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
