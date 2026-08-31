// Свод глоссария кампании «Огни» — один источник, несколько сезонов.
//
// Сезонные файлы собираются скриптом scripts/import-ogni-glossary.py из
// C:\EnoaTranscripts. Руками их не правят: правки вносятся наверху, в пайплайне
// транскриптов, и приезжают следующим импортом. Здесь только склейка.
//
// Добавить сезон: импортировать файл и дописать его в SEASON_FILES.

import season01 from './season-01.generated.json'

const SEASON_FILES = [season01]

export const LORE_OGNI_SOURCE = {
  id: 'ogni',
  mark: 'ОГ',
  title: 'Огни',
  attributedTo: 'Вечерние Кости',
  description:
    'Свод сведений, собранный по записям кампании: то, что герои видели, слышали и узнали сами.',
}

export const LORE_OGNI_SEASONS = SEASON_FILES.map(file => ({
  season: file.season,
  title: file.seasonTitle,
  chapterCount: file.chapterCount,
  glossaryVersion: file.glossaryVersion,
  bookVersion: file.bookVersion,
  generatedAt: file.generatedAt,
  counts: file.counts,
}))

// Статус утверждения. Порядок — от подтверждённого к зыбкому: в этом же
// порядке статусы показываются в статье и в легенде фильтра.
export const LORE_OGNI_CLAIM_STATUSES = [
  { id: 'world-fact', label: 'Факт мира', short: 'Подтверждено записями кампании' },
  { id: 'event', label: 'Событие', short: 'Случилось на глазах героев' },
  { id: 'scene-canon', label: 'Канон сцены', short: 'Установлено в игре, но не проверено миром' },
  { id: 'belief', label: 'Поверье', short: 'Во что верят жители, а не что доказано' },
  { id: 'gm-hint', label: 'Намёк Мастера', short: 'Обещание сюжета без разгадки' },
  { id: 'unconfirmed', label: 'Не подтверждено', short: 'Догадка, ожидающая подтверждения' },
]

function mergeEntry(target, incoming) {
  const merged = { ...target }
  merged.aliases = [...new Set([...target.aliases, ...incoming.aliases])]
  merged.sourceNames = [...new Set([...target.sourceNames, ...incoming.sourceNames])]
  merged.claims = [...target.claims, ...incoming.claims]
  merged.stub = target.stub && incoming.stub
  merged.hero = target.hero || incoming.hero
  merged.profile = { ...target.profile, ...incoming.profile }
  merged.seasons = [...target.seasons, ...incoming.seasons]
  merged.mentions = [...target.mentions, ...incoming.mentions]
  merged.relations = [...target.relations, ...incoming.relations]
  // Атрибуты сходятся по виду: «Биография» из второго сезона продолжает первую.
  merged.facets = incoming.facets.reduce((acc, facet) => {
    const existing = acc.find(item => item.id === facet.id)
    if (existing) existing.items = [...existing.items, ...facet.items]
    else acc.push({ ...facet })
    return acc
  }, target.facets.map(facet => ({ ...facet })))
  // Актуальной считается сводка позднейшего сезона.
  merged.summary = incoming.summary || target.summary
  return merged
}

function buildEntries() {
  const byId = new Map()
  for (const file of SEASON_FILES) {
    for (const entry of file.entries) {
      const shaped = {
        ...entry,
        seasons: [{ season: file.season, chapters: entry.chapters }],
      }
      const existing = byId.get(entry.id)
      byId.set(entry.id, existing ? mergeEntry(existing, shaped) : shaped)
    }
  }
  return [...byId.values()].sort((a, b) => a.term.localeCompare(b.term, 'ru'))
}

export const LORE_OGNI_ENTRIES = buildEntries()

// Главы узла «Огни»: по ним статья ссылается в сам текст сезона.
export const LORE_OGNI_CHAPTERS = Object.fromEntries(
  SEASON_FILES.flatMap(file => (file.chapterIndex || []).map(ch => [`${file.season}:${ch.number}`, ch])),
)

export function ogniChapter(season, number) {
  return LORE_OGNI_CHAPTERS[`${season}:${number}`] || null
}

export function ogniChapterLink(season, number) {
  const chapter = ogniChapter(season, number)
  return chapter ? { path: '/lore/uzly/ogni', query: { chapter: chapter.slug } } : null
}

export const LORE_OGNI_BY_ID = Object.fromEntries(
  LORE_OGNI_ENTRIES.map(entry => [entry.id, entry]),
)

/**
 * Срез сведений одной статьи по главе: остаётся только то, что к этой главе
 * уже прозвучало. Сводка берётся на тот же момент; если её нет — пустая строка,
 * потому что более поздняя сводка знает больше читателя.
 */
export function cutOgniPayload(ogni, cut) {
  if (!ogni || !cut) return ogni
  const withinCut = chapter => chapter == null || chapter <= cut
  const facets = ogni.facets
    .map(facet => ({ ...facet, items: facet.items.filter(item => withinCut(item.chapter)) }))
    .filter(facet => facet.items.length)
  const claims = ogni.claims.filter(claim => claim.chapter <= cut)

  return {
    ...ogni,
    facets,
    claims,
    relations: ogni.relations.filter(relation => withinCut(relation.chapter)),
    mentions: ogni.mentions.filter(chapter => chapter <= cut),
    chapters: ogni.chapters.filter(chapter => chapter <= cut),
    summary: (ogni.summaryByChapter.filter(item => item.chapter <= cut).pop() || {}).text || '',
    withheld: ogni.claims.length - claims.length,
  }
}

/**
 * Срез «я дошёл до главы N сезона S»: статья остаётся, если появилась не позже
 * среза, и показывает только те утверждения, что к этому моменту уже прозвучали.
 * Без аргументов возвращает весь свод.
 */
export function filterOgniEntries({ season, chapter, entries = LORE_OGNI_ENTRIES } = {}) {
  if (!season) return entries
  const limit = Number.isFinite(chapter) ? chapter : Infinity

  return entries.reduce((acc, entry) => {
    const seen = entry.seasons.some(
      s => s.season < season
        || (s.season === season && s.chapters.some(ch => ch <= limit)),
    )
    if (!seen) return acc
    acc.push({ ...entry, ...cutOgniPayload(entry, limit) })
    return acc
  }, [])
}
