// Досье — полные авторские статьи, которые на сайте уже есть: народы, пантеон,
// фракции. Глоссарий их не пересказывает: он опорная точка термина и показывает
// досье целиком, а рядом — что об этой сущности узнала кампания.
//
// Ключ поиска — название статьи. Сведение с глоссарием идёт по той же основе
// слова, что и сведение источников, поэтому «Мор’хоры», «морхор» и «Мор’хор»
// из досье рас сходятся в одну статью.

import { PANTHEON_THREAD, PANTHEON_CONTENT } from './lorePantheon.js'
import { FACTIONS_THREAD, FACTIONS_CONTENT } from './loreFactions.js'

// Народы: тексты лежат в content/dnd5e/races/*.md и грузятся через Nuxt Content
// по маршруту. Список фиксирован — файлов четырнадцать.
export const RACE_DOSSIERS = [
  { title: 'Аджаид', slug: 'adzhaidy', summary: 'Дварфы дюн, созданные Ночной Колесницей: мастера туннелей и камня, хранители священного пламени Бараскуса и величайшие бегуны песков.' },
  { title: 'Борос', slug: 'borosy', summary: 'Народ Нефритовых гор, чей танец хранит память о трёх лунах и трёх солнцах.' },
  { title: 'Вету', slug: 'vetu', summary: 'Змееобразные метисы болот Уатаны, воздвигшие города-зиккураты на Линиях Силы и несущие в себе цикл Иджин’Ана — проклятие, традицию и судьбу.' },
  { title: 'Вирморожденные', slug: 'virmorozhdennye', summary: 'Рождённый пламенем древних вирмов и плотью гор народ Таш’Нагара, разделённый Вирмоханой и пытающийся спасти своё затухающее пламя.' },
  { title: 'Джабари', slug: 'jabari', summary: 'Народ Даскара, чьи предания восходят к древним временам осколка.' },
  { title: 'Маракиец', slug: 'marakiytsy', summary: 'Народ Маракийского Султаната, поднявшийся под властью вирма Мардука и освободившийся после его гибели.' },
  { title: 'Мор’хор', slug: 'morhory', summary: 'Рогатые выходцы из Спиралей, несущие в себе энергию мхур, память древних изобретателей и опасное табу на Анзу.' },
  { title: 'Ойрдуг', slug: 'oyrdugi', summary: 'Дети Лабиринта, рождённые по договору стигматов и несущие на себе отметины своего истинного дома.' },
  { title: 'Самагхи', slug: 'samaghi', summary: 'Амфибийный народ глубин, кяризов и подземных рек, проклятый солнцем и благословлённый вечной тьмой.' },
  { title: 'Удриш', slug: 'udrishi', summary: 'Народ, созданный близнецами Урмой и Эрилом по своему образу и получивший от них искру игривости, хитрецы и устроители великих гонок.' },
  { title: 'Худдулин', slug: 'hudduliny', summary: 'Кочевники выжженной степи, разводящие аюров и живущие по Закону Бесконечных Небес; их происхождение восходит к детям Сумуга.' },
  { title: 'Человек', slug: 'lyudi', summary: 'Народы Даскара — наследники башен Дангуна, верующие Бралла и вольные адаады степей Хурхона.' },
  { title: 'Чотгоры', slug: 'chotgory', summary: 'Слепцы пустошей, не покинувшие убежищ после Лета Трёх Солнц и не начавшие давать друг другу имена. Удриши почитают их добрыми духами пустынь.' },
  { title: 'Эхор’нур', slug: 'ehornur', summary: 'Наблюдатели, созданные Пурушем и подвешенные над Колыбелью; узрев переплетения Судьбы, они покинули Святилище.' },
]

const SOURCES = [
  {
    kind: 'pantheon',
    kindLabel: 'Пантеон',
    base: '/lore/pantheon',
    thread: PANTHEON_THREAD,
    content: PANTHEON_CONTENT,
  },
  {
    kind: 'faction',
    kindLabel: 'Фракции',
    base: '/lore/factions',
    thread: FACTIONS_THREAD,
    content: FACTIONS_CONTENT,
  },
]

function collect() {
  const list = RACE_DOSSIERS.map(race => ({
    kind: 'race',
    kindLabel: 'Народы',
    title: race.title,
    summary: race.summary || '',
    route: `/dnd5e/races/${race.slug}`,
    // Проза народов живёт в Markdown, поэтому грузится отдельно по маршруту.
    contentPath: `/dnd5e/races/${race.slug}`,
    blocks: [],
  }))

  for (const source of SOURCES) {
    const titles = Object.fromEntries(
      (source.thread.sections || []).map(section => [section.slug, section]),
    )
    for (const category of source.content.categories || []) {
      const card = titles[category.slug]
      if (card?.title) {
        // Досье категории — это её вступление вместе со всеми главами:
        // у «Садхияров» вступление пустое, а весь текст живёт в главах.
        const blocks = [...(category.intro || [])]
        for (const chapter of category.chapters || []) {
          if (chapter?.title) blocks.push({ type: 'heading', text: chapter.title })
          blocks.push(...(chapter.blocks || []))
        }
        list.push({
          kind: source.kind,
          kindLabel: source.kindLabel,
          title: card.title,
          summary: card.summary || '',
          route: `${source.base}/${category.slug}`,
          blocks,
        })
      }
      for (const chapter of category.chapters || []) {
        if (!chapter?.title) continue
        list.push({
          kind: source.kind,
          kindLabel: source.kindLabel,
          title: chapter.title,
          route: `${source.base}/${category.slug}?chapter=${chapter.slug}`,
          blocks: chapter.blocks || [],
          parent: card?.title || '',
        })
      }
    }
  }

  return list
}

export const LORE_DOSSIERS = collect()

// Категория глоссария по виду досье: народы — существа, пантеон — основа мира,
// фракции — силы и сообщества.
const DOSSIER_CATEGORY = { race: 'beings', pantheon: 'foundations', faction: 'powers' }

// Имена, которые в Эноа честно называют две разные вещи. Народ вету и земли
// Вету — одно слово и две статьи; так же устроены многие имена осколка.
// Пишутся как есть: в ключи их переводит та же функция, что сводит источники.
export const HOMONYMS = ['Вету', 'Борос']

function firstProse(blocks) {
  for (const block of blocks || []) {
    if (block.type !== 'prose') continue
    const text = (block.paragraphs || []).find(item => item && item.trim())
    if (text) return text.trim()
  }
  return ''
}

// Толкование для статьи, у которой его нет: одна-две фразы из начала досье.
function leadSentences(text, limit = 240) {
  const value = String(text || '').replace(/\s+/g, ' ').trim()
  if (value.length <= limit) return value
  const cut = value.slice(0, limit)
  const stop = cut.lastIndexOf('. ')
  return stop > 90 ? cut.slice(0, stop + 1) : `${cut.trim()}…`
}

/**
 * Досье, у которых нет статьи в глоссарии, становятся статьями: иначе раздел
 * остаётся островом — термин не найти поиском и не связать ссылкой из текста.
 *
 * `taken` — карта «основа имени → виды уже существующих статей». Сравнение идёт
 * по имени И по виду: народ вету и земли Вету зовутся одинаково, но это разные
 * статьи, и одна не должна отменять другую.
 */
export function dossierEntries(taken, key) {
  const entries = []
  const seen = new Set()
  const homonyms = new Set(HOMONYMS.map(key))

  for (const dossier of LORE_DOSSIERS) {

    // «Ильбеш — Маг» это имя и эпитет: статья должна называться именем, иначе
    // ни поиск, ни разметка терминов в тексте её не найдут. Совпадение с уже
    // существующей статьёй проверяется тоже по имени, а не по полному титулу.
    const [name, epithet] = dossier.title.split(/\s+—\s+/)
    const id = key(name || dossier.title)
    const category = DOSSIER_CATEGORY[dossier.kind] || 'foundations'
    if (!id) continue

    // Занятое имя обычно значит «статья уже есть». Исключение — имена из
    // HOMONYMS: там одно слово честно называет две разные вещи, и вторая
    // статья нужна. Список ведётся руками: угадывать такое нельзя.
    const homonym = homonyms.has(id)
    const seenKey = homonym ? `${id}|${category}` : id
    if (seen.has(seenKey)) continue
    if (taken.has(id) && !(homonym && !taken.get(id).has(category))) continue

    const summary = leadSentences(dossier.summary || firstProse(dossier.blocks))
    // Полная проза народа лежит в Markdown и подгружается уже в карточке.
    if (!summary) continue

    seen.add(seenKey)
    entries.push({
      title: name || dossier.title,
      aliases: epithet ? [epithet, dossier.title] : [],
      category,
      summary,
      route: dossier.route,
      kind: dossier.kind,
    })
  }

  return entries
}
