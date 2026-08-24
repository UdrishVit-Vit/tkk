// Shared shape for a Pathfinder 2e spell.
//
// A PF2e spell block reads: name and rank, traits, traditions, cast time, then
// range/area/targets, then defence and duration, then effect and heightening.
// The builder keeps every entry to the fields it actually uses.

export function spell(id, title, en, rank, options = {}) {
  const {
    traditions = [],
    traits = [],
    actions = '2',
    range = '',
    area = '',
    targets = '',
    save = '',
    duration = '',
    trigger = '',
    requirements = '',
    desc = '',
    heightened = '',
    rarity = 'Обычное',
    // Setting spells group under their own heading instead of by rank.
    cat = rank === 0 ? 'cantrips' : `rank-${rank}`
  } = options

  return {
    id,
    title,
    en,
    rank,
    cat,
    traditions,
    traits,
    actions,
    range,
    area,
    targets,
    save,
    duration,
    trigger,
    requirements,
    desc,
    heightened,
    rarity,
    searchText: [title, en, desc, heightened, range, area, targets, save, duration, ...traits, ...traditions].join(' ')
  }
}

export const PF2E_TRADITIONS = ['арканная', 'божественная', 'оккультная', 'первозданная']

export const PF2E_SPELL_ACTION_GLYPHS = {
  1: '◆',
  2: '◆◆',
  3: '◆◆◆',
  reaction: '⤶',
  free: '◇'
}
