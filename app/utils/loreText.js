// Разметка терминов глоссария в лорной прозе.
//
// Задача: встретив в тексте «мор’хоров», «Садхияров» или «Вуали», превратить их
// в ссылку на статью глоссария. Русские слова склоняются, поэтому термин ищется
// как основа плюс закрытый список падежных окончаний — тот же приём, что в
// scripts/ogni_text.py на стороне импорта.
//
// Список окончаний закрыт намеренно: свободное усечение основы начинает
// находить чужие слова («Абрам» внутри «Абракса»).

import { LORE_GLOSSARY } from '~/data/loreGlossary.js'

const ENDINGS = 'ами|ями|ими|ов|ев|ей|ам|ям|ах|ях|ом|ем|ём|ой|ые|ых|ым|ия|ии|ию|ье|ья|ью|а|я|ы|и|у|ю|е|о|ь|й'

// Слишком общие слова: как ссылки они только зашумляют текст.
const SKIP = new Set([
  'огни', 'огонь', 'город', 'земли', 'море', 'небо', 'люди', 'человек', 'слово',
  'имя', 'кровь', 'путь', 'дом', 'мир', 'война', 'глаз', 'рука', 'ветер',
  'жертва', 'святилище', 'звезда', 'звёзды', 'звезды', 'луна', 'солнце', 'тень',
])

const fold = value => String(value || '').toLocaleLowerCase('ru-RU').replace(/ё/g, 'е')

function stem(word) {
  return word.length >= 4 && 'аоуыэяюеиьй'.includes(word[word.length - 1])
    ? word.slice(0, -1)
    : word
}

// Одна регулярка на все термины: перебирать четыре сотни по отдельности для
// каждого абзаца слишком дорого.
function buildIndex() {
  const byStem = new Map()
  const patterns = []

  for (const entry of LORE_GLOSSARY) {
    for (const name of [entry.term, ...(entry.aliases || [])]) {
      const clean = fold(name).replace(/[’'`«»]/g, '')
      if (clean.length < 4 || SKIP.has(clean)) continue
      const words = clean.split(/[^а-яa-z0-9]+/).filter(Boolean)
      if (!words.length) continue
      const key = words.map(stem).join(' ')
      if (byStem.has(key)) continue
      byStem.set(key, { id: entry.id, term: entry.term })
      patterns.push(words.map(stem).map(word => `${word}(?:${ENDINGS})?`).join('[\\s’\'-]+'))
    }
  }

  // Длинные термины вперёд, иначе «Вуаль» съест «Семь Глаз Вуали».
  patterns.sort((a, b) => b.length - a.length)
  return {
    byStem,
    pattern: new RegExp(`(?<![а-яa-zё])(${patterns.join('|')})(?![а-яa-zё])`, 'gi'),
  }
}

let index = null
function getIndex() {
  if (!index) index = buildIndex()
  return index
}

function lookup(match) {
  const { byStem } = getIndex()
  const words = fold(match).replace(/[’'`«»]/g, '').split(/[^а-яa-z0-9]+/).filter(Boolean)
  const key = words.map(stem).join(' ')
  if (byStem.has(key)) return byStem.get(key)
  // Совпало по окончанию, а не по основе: «садхияров» -> «садхияр».
  const trimmed = words.map(word => stem(stem(word))).join(' ')
  return byStem.get(trimmed) || null
}

/**
 * Режет текст на куски: обычный текст и найденные термины со ссылкой.
 * `skipId` — статья, внутри которой идёт текст: сама на себя не ссылается.
 */
export function tokenizeLoreText(text, skipId = '') {
  const source = String(text || '')
  if (!source) return []
  const { pattern } = getIndex()
  pattern.lastIndex = 0

  const tokens = []
  let cursor = 0
  let match

  while ((match = pattern.exec(source)) !== null) {
    const hit = lookup(match[0])
    if (!hit || hit.id === skipId) continue
    if (match.index > cursor) tokens.push({ type: 'text', text: source.slice(cursor, match.index) })
    tokens.push({ type: 'term', text: match[0], id: hit.id, title: hit.term })
    cursor = match.index + match[0].length
  }

  if (cursor < source.length) tokens.push({ type: 'text', text: source.slice(cursor) })
  return tokens
}
