// Pathfinder 2e advances every class on the same universal spine: class feats on
// even levels, skill feats alongside them, general feats and skill increases on
// odd levels, ability boosts every five. Only the class-specific column differs,
// so the shared spine lives here and each class file supplies just its own
// features per level.

export const UNIVERSAL_BY_LEVEL = {
  1: ['Предок и предыстория', 'Начальные владения', 'Родовой талант'],
  2: ['Классовый талант', 'Талант навыка'],
  3: ['Общий талант', 'Повышение навыка'],
  4: ['Классовый талант', 'Талант навыка'],
  5: ['Повышения характеристик', 'Родовой талант', 'Повышение навыка'],
  6: ['Классовый талант', 'Талант навыка'],
  7: ['Общий талант', 'Повышение навыка'],
  8: ['Классовый талант', 'Талант навыка'],
  9: ['Родовой талант', 'Повышение навыка'],
  10: ['Повышения характеристик', 'Классовый талант', 'Талант навыка'],
  11: ['Общий талант', 'Повышение навыка'],
  12: ['Классовый талант', 'Талант навыка'],
  13: ['Родовой талант', 'Повышение навыка'],
  14: ['Классовый талант', 'Талант навыка'],
  15: ['Повышения характеристик', 'Общий талант', 'Повышение навыка'],
  16: ['Классовый талант', 'Талант навыка'],
  17: ['Родовой талант', 'Повышение навыка'],
  18: ['Классовый талант', 'Талант навыка'],
  19: ['Общий талант', 'Повышение навыка'],
  20: ['Повышения характеристик', 'Классовый талант', 'Талант навыка']
}

// Prepared and spontaneous casters gain a new spell rank on odd levels; the
// column reads the same for every full caster, so it is generated rather than
// repeated in fifteen files.
export const FULL_CASTER_BY_LEVEL = {
  1: ['Заклинания 1 круга'],
  3: ['Заклинания 2 круга'],
  5: ['Заклинания 3 круга'],
  7: ['Заклинания 4 круга'],
  9: ['Заклинания 5 круга'],
  11: ['Заклинания 6 круга'],
  13: ['Заклинания 7 круга'],
  15: ['Заклинания 8 круга'],
  17: ['Заклинания 9 круга'],
  19: ['Заклинания 10 круга']
}

// Build the 1–20 table for a class: universal spine + optional caster column +
// the class's own features, in that reading order.
export function buildClassTable(featuresByLevel = {}, { fullCaster = false } = {}) {
  const rows = []
  for (let level = 1; level <= 20; level += 1) {
    const own = featuresByLevel[level] || []
    const caster = fullCaster ? (FULL_CASTER_BY_LEVEL[level] || []) : []
    rows.push({
      level,
      features: [...own, ...caster, ...(UNIVERSAL_BY_LEVEL[level] || [])]
    })
  }
  return rows
}

export const PROFICIENCY_LABELS = {
  U: 'Не обучен',
  T: 'Обучен',
  E: 'Эксперт',
  M: 'Мастер',
  L: 'Легенда'
}
