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
  // Короткие имена, совпадающие с обычными словами: «От этого решения…» и
  // «Ту ночь он провёл…» — не ссылки. Статьи о них остаются, но в тексте
  // подсвечивать их нельзя: с заглавной они стоят в начале любой фразы.
  'от', 'ту', 'ар',
])

// Апостроф между буквами имени: может быть, может не быть, может быть любым.
const APOSTROPHE = "[’'`ʼ]?"

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
  const long = []
  // Короткие имена ищутся с учётом регистра: «Ияр», «Цам», «Ул» — имена, а
  // «от» и «ар» строчными это предлог и мусор. Без такого разделения главный
  // герой сезона вообще не размечался: порог в четыре буквы его отсекал.
  const short = []

  for (const entry of LORE_GLOSSARY) {
    for (const name of [entry.term, ...(entry.aliases || [])]) {
      const clean = fold(name).replace(/[’'`«»]/g, '')
      if (clean.length < 2 || SKIP.has(clean)) continue
      const words = clean.split(/[^а-яa-z0-9]+/).filter(Boolean)
      if (!words.length) continue
      const key = words.map(stem).join(' ')
      // Одно имя может вести в несколько статей: народ вету и земли Вету.
      // Выбирать за читателя нельзя — храним всех и предложим выбор.
      const known = byStem.get(key)
      if (known) {
        if (!known.some(item => item.id === entry.id)) known.push({ id: entry.id, term: entry.term })
        continue
      }
      byStem.set(key, [{ id: entry.id, term: entry.term }])

      // Апостроф внутри имени необязателен и пишется по-разному: «Иджин’Ан»,
      // «Иджин'Ан», «Иджинан» — одно и то же. Без этой поблажки половина имён
      // Эноа не находилась в тексте вовсе: индекс строится по имени без
      // апострофа, а в прозе он на месте.
      const body = words
        .map(word => stem(word).split('').join(APOSTROPHE))
        // Апостроф бывает и перед окончанием: у «Ятх’У» основа «ятх», а «у» —
        // окончание, и без этой поблажки подсвечивалось только «Ятх».
        .map(word => `${word}${APOSTROPHE}(?:${ENDINGS})?`)
        .join('[\\s’\'-]+')
      if (clean.length >= 4) long.push(body)
      // У короткого имени первая буква обязана быть прописной, остальные — как
      // придётся: «Ул», «Ула», «Иярдар» — да; «ул» посреди слова — нет.
      else short.push(body.replace(/^([а-яё])/, (_, char) => char.toUpperCase()))
    }
  }

  // Длинные термины вперёд, иначе «Вуаль» съест «Семь Глаз Вуали».
  long.sort((a, b) => b.length - a.length)
  short.sort((a, b) => b.length - a.length)

  const wrap = (body, flags) => new RegExp(`(?<![а-яa-zё])(${body})(?![а-яa-zё])`, flags)
  return {
    byStem,
    patterns: [
      long.length ? wrap(long.join('|'), 'gi') : null,
      short.length ? wrap(short.join('|'), 'g') : null,
    ].filter(Boolean),
  }
}

let index = null
function getIndex() {
  if (!index) index = buildIndex()
  return index
}

const ENDING = new RegExp(`(?:${ENDINGS})$`)

// Regexp нашёл слово, но по какому ключу его искать в индексе — вопрос
// отдельный. Основа отсекает одну гласную, а падежное окончание бывает
// согласным: «боросов» и «садхияров» так и оставались собой, не находились и
// молча выпадали из разметки. Поэтому у каждого слова две догадки — само
// слово и оно же без окончания, — и проверяются их сочетания.
function lookup(match) {
  const { byStem } = getIndex()
  const words = fold(match).replace(/[’'`«»]/g, '').split(/[^а-яa-z0-9]+/).filter(Boolean)
  if (!words.length) return null

  const guesses = words.map(word => {
    const cut = word.replace(ENDING, '')
    const variants = [stem(word)]
    if (cut.length >= 2 && cut !== word && !variants.includes(cut)) variants.push(cut)
    return variants
  })

  let keys = ['']
  for (const variants of guesses) {
    keys = keys.flatMap(key => variants.map(variant => (key ? `${key} ${variant}` : variant)))
  }
  for (const key of keys) {
    if (byStem.has(key)) return byStem.get(key)
  }
  return null
}

/**
 * Режет текст на куски: обычный текст и найденные термины со ссылкой.
 * `skipId` — статья, внутри которой идёт текст: сама на себя не ссылается.
 */
export function tokenizeLoreText(text, skipId = '') {
  const source = String(text || '')
  if (!source) return []
  const { patterns } = getIndex()

  // Совпадения собираются из обоих наборов и раскладываются по порядку:
  // пересечения отбрасываются, побеждает начавшееся раньше, а при равенстве —
  // более длинное.
  const found = []
  for (const pattern of patterns) {
    pattern.lastIndex = 0
    let match
    while ((match = pattern.exec(source)) !== null) {
      const hits = (lookup(match[0]) || []).filter(item => item.id !== skipId)
      if (!hits.length) continue
      found.push({ index: match.index, text: match[0], hits })
    }
  }
  found.sort((a, b) => a.index - b.index || b.text.length - a.text.length)

  const tokens = []
  let cursor = 0
  for (const item of found) {
    if (item.index < cursor) continue
    if (item.index > cursor) tokens.push({ type: 'text', text: source.slice(cursor, item.index) })
    tokens.push({
      type: 'term',
      text: item.text,
      id: item.hits[0].id,
      title: item.hits[0].term,
      ids: item.hits.map(hit => hit.id),
    })
    cursor = item.index + item.text.length
  }

  if (cursor < source.length) tokens.push({ type: 'text', text: source.slice(cursor) })
  return tokens
}
