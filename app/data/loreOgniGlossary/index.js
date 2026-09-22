// Свод глоссария кампании «Огни» — один источник, несколько сезонов.
//
// Сезонные файлы собираются скриптом scripts/import-ogni-glossary.py из
// C:\EnoaTranscripts. Руками их не правят: правки вносятся наверху, в пайплайне
// транскриптов, и приезжают следующим импортом. Здесь только склейка.
//
// Добавить сезон: импортировать файл и дописать его в SEASON_FILES.

import season01 from './season-01.generated.json'
import season02 from './season-02.generated.json'
import season03 from './season-03.generated.json'

const SEASON_FILES = [season01, season02, season03]

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
  const mergeSeasonChapters = (groups) => [...groups.reduce((map, group) => {
    const chapters = new Set([...(map.get(group.season) || []), ...group.chapters])
    map.set(group.season, [...chapters].sort((a, b) => a - b))
    return map
  }, new Map())].map(([season, chapters]) => ({ season, chapters }))
  merged.aliases = [...new Set([...target.aliases, ...incoming.aliases])]
  merged.sourceNames = [...new Set([...target.sourceNames, ...incoming.sourceNames])]
  merged.claims = [...target.claims, ...incoming.claims]
  merged.stub = target.stub && incoming.stub
  merged.hero = target.hero || incoming.hero
  merged.profile = { ...target.profile, ...incoming.profile }
  merged.seasons = mergeSeasonChapters([...target.seasons, ...incoming.seasons])
  merged.season = incoming.season
  merged.chapters = target.season === incoming.season
    ? [...new Set([...target.chapters, ...incoming.chapters])].sort((a, b) => a - b)
    : incoming.chapters
  merged.firstChapter = merged.chapters[0] ?? null
  merged.lastChapter = merged.chapters.at(-1) ?? null
  merged.mentions = target.season === incoming.season
    ? [...new Set([...target.mentions, ...incoming.mentions])].sort((a, b) => a - b)
    : incoming.mentions
  merged.mentionsBySeason = mergeSeasonChapters([
    ...target.mentionsBySeason,
    ...incoming.mentionsBySeason,
  ])
  merged.summaries = [...target.summaries, ...incoming.summaries]
  merged.summaryByChapter = [...target.summaryByChapter, ...incoming.summaryByChapter]
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
        season: file.season,
        seasons: [{ season: file.season, chapters: entry.chapters }],
        mentionsBySeason: [{ season: file.season, chapters: entry.mentions }],
        summaryByChapter: entry.summaryByChapter.map(item => ({ ...item, season: file.season })),
        relations: entry.relations.map(item => ({ ...item, season: file.season })),
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
  const selectedSeason = typeof cut === 'number' ? ogni.season : cut.season
  const selectedChapter = typeof cut === 'number' ? cut : cut.chapter
  const withinCut = item => (
    item?.season == null
    || item.season < selectedSeason
    || (item.season === selectedSeason && (item.chapter == null || item.chapter <= selectedChapter))
  )
  const facets = ogni.facets
    .map(facet => ({ ...facet, items: facet.items.filter(withinCut) }))
    .filter(facet => facet.items.length)
  const claims = ogni.claims.filter(withinCut)
  const seasonChapters = ogni.seasons.find(item => item.season === selectedSeason)?.chapters || []
  const seasonMentions = ogni.mentionsBySeason
    .find(item => item.season === selectedSeason)?.chapters || []

  return {
    ...ogni,
    season: selectedSeason,
    facets,
    claims,
    relations: ogni.relations.filter(withinCut),
    mentions: seasonMentions.filter(chapter => chapter <= selectedChapter),
    chapters: seasonChapters.filter(chapter => chapter <= selectedChapter),
    summary: (ogni.summaryByChapter.filter(withinCut).pop() || {}).text || '',
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
    acc.push({ ...entry, ...cutOgniPayload(entry, { season, chapter: limit }) })
    return acc
  }, [])
}
