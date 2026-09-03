// Архетипы классов D&D 5.5e (2024): собственные, перенесённые вручную в
// classdata2024.js (сейчас это мудры Шамана), плюс авторские архетипы раздела
// 2014 — они общие для обеих редакций и не дублируются по названию.
const archetypeKey = name => String(name || '')
  .toLocaleLowerCase('ru')
  .replace(/ё/g, 'е')
  .replace(/[^a-zа-я0-9]+/gi, ' ')
  .trim()

export function mergeArchetypes2024(ownList, legacyList) {
  const own = ownList || []
  const legacy = legacyList || []
  if (!own.length) return legacy
  const seen = new Set(own.map(archetype => archetypeKey(archetype?.name)))
  return [...own, ...legacy.filter(archetype => !seen.has(archetypeKey(archetype?.name)))]
}
