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
 * Срез «я дошёл до главы N сезона S»: статья остаётся, если появилась не позже
 * среза, и показывает только те утверждения, что к этому моменту уже прозвучали.
 * Без аргументов возвращает весь свод.
 */
export function filterOgniEntries({ season, chapter, entries = LORE_OGNI_ENTRIES } = {}) {
  if (!season) return entries
  const limit = Number.isFinite(chapter) ? chapter : Infinity
  const withinCut = claim =>
    claim.season < season || (claim.season === season && claim.chapter <= limit)

  return entries.reduce((acc, entry) => {
    const claims = entry.claims.filter(withinCut)
    const seen = entry.seasons.some(
      s => s.season < season
        || (s.season === season && s.chapters.some(ch => ch <= limit)),
    )
    if (!seen) return acc

    const summaryStep = [...(entry.summaryByChapter || [])]
      .filter(s => s.chapter <= limit)
      .pop()

    acc.push({
      ...entry,
      claims,
      summary: summaryStep ? summaryStep.text : entry.summaryEarly || entry.summary,
    })
    return acc
  }, [])
}
