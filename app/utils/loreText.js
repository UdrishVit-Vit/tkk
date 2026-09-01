// Разметка терминов глоссария в лорной прозе.
//
// Задача: встретив в тексте «мор’хоров», «Садхияров» или «Вуали», превратить их
// в ссылку на статью глоссария. Русские слова склоняются, поэтому термин ищется
// как основа плюс закрытый список падежных окончаний — тот же приём, что в
// scripts/ogni_text.py на стороне импорта.
//
// Список окончаний закрыт намеренно: свободное усечение основы начинает
// находить чужие слова («Абрам» внутри «Абракса»).
//
// Ищем не термины в тексте, а текст в указателе. Обратный ход — одна регулярка
// на восемьсот имён — работал, пока размечались абзацы карточки, и лёг на главе
// книги: восемь секунд на шестьдесят тысяч знаков, потому что в каждой позиции
// строки перебирались все восемьсот. Теперь текст разбирается на слова один
// раз, а имя ищется хешем по основе.

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
  // Статьи с именем нарицательным. Они остаются в своде и находятся поиском,
  // но подсвечивать их в прозе нельзя: «Руки» — Северная и Южная Руки
  // Синдиката, а в книге «руку» встречается триста раз. Так же «Старик»,
  // «Круг», «Пустота», «Пламя», «Шепоты» и эпитет «Маг» из досье Ильбеша.
  'руки', 'старик', 'круг', 'пустота', 'пламя', 'шепоты', 'маг', 'мирна', 'рябь',
  'империя', 'наблюдатель',
])

// Слово текста: апостроф внутри имени — часть слова («Ятх’У»), дефис — нет
// («Тик-Чик» в указателе лежит двумя словами).
const WORD = /[а-яёa-z0-9’'`ʼ]+/gi
// Между словами составного имени допустимы только пробелы, дефисы и апострофы:
// иначе «Марак. Султанат» склеилось бы в одно имя.
const JOINER = /^[\s’'`ʼ-]*$/
const CAPITAL = /^[А-ЯЁA-Z]/
const ENDING = new RegExp(`(?:${ENDINGS})$`)

const fold = value => String(value || '').toLocaleLowerCase('ru-RU').replace(/ё/g, 'е')
const bare = value => fold(value).replace(/[’'`ʼ«»]/g, '')

function stem(word) {
  return word.length >= 4 && 'аоуыэяюеиьй'.includes(word[word.length - 1])
    ? word.slice(0, -1)
    : word
}

function buildIndex() {
  const byStem = new Map()
  // Первое слово каждого имени: дешёвое сито, чтобы не собирать ключи в каждой
  // позиции текста. Имён восемьсот, слов в главе — десятки тысяч.
  const openers = new Set()
  let maxWords = 1

  for (const entry of LORE_GLOSSARY) {
    for (const name of [entry.term, ...(entry.aliases || [])]) {
      const clean = bare(name)
      if (clean.length < 2 || SKIP.has(clean)) continue
      const words = clean.split(/[^а-яa-z0-9]+/).filter(Boolean)
      if (!words.length) continue

      const stems = words.map(stem)
      const key = stems.join(' ')
      // У короткого имени первая буква обязана быть прописной: «Ул», «Цам»,
      // «Ияр» — имена, а те же буквы строчными — обрывки чужих слов. Порог в
      // четыре буквы иначе отсекал главного героя сезона.
      const item = { id: entry.id, term: entry.term, short: clean.length < 4 }

      // Одно имя может вести в несколько статей: народ вету и земли Вету.
      // Выбирать за читателя нельзя — храним всех и предложим выбор.
      const known = byStem.get(key)
      if (known) {
        if (!known.some(hit => hit.id === entry.id)) known.push(item)
      } else {
        byStem.set(key, [item])
      }
      openers.add(stems[0])
      if (stems.length > maxWords) maxWords = stems.length
    }
  }

  return { byStem, openers, maxWords }
}

let index = null
function getIndex() {
  if (!index) index = buildIndex()
  return index
}

// Основа отсекает одну гласную, а падежное окончание бывает согласным:
// «боросов» и «садхияров» так и оставались собой, не находились и молча
// выпадали из разметки. Поэтому у каждого слова две догадки — само слово и оно
// же без окончания, — и проверяются их сочетания.
function guesses(word) {
  const cut = word.replace(ENDING, '')
  const variants = [stem(word)]
  if (cut.length >= 2 && cut !== word && !variants.includes(cut)) variants.push(cut)
  return variants
}

function lookupWords(words) {
  const { byStem } = getIndex()
  let keys = ['']
  for (const word of words) {
    keys = keys.flatMap(key => guesses(word).map(variant => (key ? `${key} ${variant}` : variant)))
  }
  for (const key of keys) {
    const hit = byStem.get(key)
    if (hit) return hit
  }
  return null
}

/** Ищет имя, начинающееся со слова `at`, и возвращает самое длинное совпадение. */
function matchAt(source, words, at, skipId) {
  const { openers, maxWords } = getIndex()
  const first = bare(words[at].raw)
  if (!first || !guesses(first).some(variant => openers.has(variant))) return null

  const limit = Math.min(maxWords, words.length - at)
  for (let length = limit; length >= 1; length -= 1) {
    const window = words.slice(at, at + length)
    let joined = true
    for (let step = 1; step < length && joined; step += 1) {
      joined = JOINER.test(source.slice(window[step - 1].end, window[step].start))
    }
    if (!joined) continue

    const found = lookupWords(window.map(word => bare(word.raw)))
    if (!found) continue
    const hits = found.filter(item => item.id !== skipId
      && (!item.short || CAPITAL.test(window[0].raw)))
    if (hits.length) return { hits, from: window[0].start, to: window[length - 1].end, skip: length }
  }
  return null
}

// Один и тот же абзац перерисовывается при каждом переключении главы, а разбор
// его не меняется — держим последние разборы.
const CACHE_LIMIT = 4000
const cache = new Map()

/**
 * Режет текст на куски: обычный текст и найденные термины со ссылкой.
 * `skipId` — статья, внутри которой идёт текст: сама на себя не ссылается.
 */
export function tokenizeLoreText(text, skipId = '') {
  const source = String(text || '')
  if (!source) return []

  const cacheKey = `${skipId}\n${source}`
  const cached = cache.get(cacheKey)
  if (cached) return cached

  const words = []
  WORD.lastIndex = 0
  let match
  while ((match = WORD.exec(source)) !== null) {
    words.push({ raw: match[0], start: match.index, end: match.index + match[0].length })
  }

  const tokens = []
  let cursor = 0
  for (let at = 0; at < words.length; at += 1) {
    const found = matchAt(source, words, at, skipId)
    if (!found) continue
    if (found.from > cursor) tokens.push({ type: 'text', text: source.slice(cursor, found.from) })
    tokens.push({
      type: 'term',
      text: source.slice(found.from, found.to),
      id: found.hits[0].id,
      title: found.hits[0].term,
      ids: found.hits.map(hit => hit.id),
    })
    cursor = found.to
    at += found.skip - 1
  }
  if (cursor < source.length) tokens.push({ type: 'text', text: source.slice(cursor) })

  if (cache.size >= CACHE_LIMIT) cache.clear()
  cache.set(cacheKey, tokens)
  return tokens
}
