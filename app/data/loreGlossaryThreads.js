import { ogniChapterLink } from './loreOgniGlossary/index.js'

export function glossaryTermPath(id) {
  return id ? `/lore/glossary/${id}` : '/lore/glossary'
}

// Called with the payload already cut to the reader's progress. Only its
// current-season lists are safe to use; full indexes may contain future chapters.
export function glossaryThreadLinks(ogni) {
  if (!ogni) return []
  const chapters = new Map()
  function collect(season, numbers) {
    for (const chapter of numbers ?? []) {
      const to = ogniChapterLink(season, chapter)
      const key = `${season}:${chapter}`
      if (to) chapters.set(key, { key, season, chapter, title: `Огни · сезон ${season}, глава ${chapter}`, to })
    }
  }
  for (const entry of [...ogni.seasons, ...ogni.mentionsBySeason]) {
    if (entry.season < ogni.season) collect(entry.season, entry.chapters)
  }
  collect(ogni.season, ogni.chapters)
  collect(ogni.season, ogni.mentions)
  return [...chapters.values()].sort((a, b) => a.season - b.season || a.chapter - b.chapter)
}
