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
  { title: 'Аджаид', slug: 'adzhaidy' },
  { title: 'Борос', slug: 'borosy' },
  { title: 'Вету', slug: 'vetu' },
  { title: 'Вирморожденные', slug: 'virmorozhdennye' },
  { title: 'Джабари', slug: 'jabari' },
  { title: 'Маракиец', slug: 'marakiytsy' },
  { title: 'Мор’хор', slug: 'morhory' },
  { title: 'Ойрдуг', slug: 'oyrdugi' },
  { title: 'Самагхи', slug: 'samaghi' },
  { title: 'Удриш', slug: 'udrishi' },
  { title: 'Худдулин', slug: 'hudduliny' },
  { title: 'Человек', slug: 'lyudi' },
  { title: 'Чотгоры', slug: 'chotgory' },
  { title: 'Эхор’нур', slug: 'ehornur' },
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
