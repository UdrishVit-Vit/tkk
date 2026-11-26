export const SECTION_ROUTES_BY_SYSTEM = {
  '5e': {
    'Расы и происхождения': '/dnd5e/races',
    'Черты': '/dnd5e/feats',
    'Особенности классов': '/dnd5e/class-features',
    'Предыстории': '/dnd5e/backgrounds',
    'Заклинания': '/dnd5e/spells',
    'Оружие': '/dnd5e/weapons',
    'Доспехи': '/dnd5e/armor',
    'Снаряжение': '/dnd5e/equipment',
    'Драгоценности': '/dnd5e/jewelry',
    'Магические предметы': '/dnd5e/magic-items',
    'Бестиарий': '/dnd5e/bestiary',
    'Знамения': '/dnd5e/omens',
    'Гнев Ильбеша': '/dnd5e/wrath',
    'Чай': '/dnd5e/tea',
    'Бусины': '/dnd5e/beads',
    'Ширма (справочник)': '/dnd5e/screens'
  },
  '2024': {
    'Классы': '/dnd55e/classes',
    'Виды': '/dnd55e/species',
    'Черты': '/dnd55e/feats',
    'Особенности классов': '/dnd55e/class-features',
    'Предыстории': '/dnd55e/backgrounds',
    'Заклинания': '/dnd55e/spells',
    'Снаряжение': '/dnd55e/equipment',
    'Магические предметы': '/dnd55e/magic-items',
    'Знамения': '/dnd55e/omens',
    'Гнев Ильбеша': '/dnd55e/wrath',
    'Чай': '/dnd55e/tea',
    'Бусины': '/dnd55e/beads',
    'Бестиарий': '/dnd55e/bestiary',
    'Глоссарий': '/dnd55e/glossary'
  },
  pf: {
    'Наследия': '/pf2e/ancestries',
    'Классы': '/pf2e/classes',
    'Снаряжение': '/pf2e/equipment',
    'Магические предметы': '/pf2e/magic-items',
    'Бусины': '/pf2e/beads',
    'Заклинания': '/pf2e/spells',
    'Бестиарий': '/pf2e/bestiary',
    'Глоссарий': '/pf2e/glossary'
  },
  lore: {
    'Календарь': '/lore/calendar',
    'Пантеон': '/lore/pantheon',
    'География': '/lore/geography',
    'Осколки': '/lore/shards',
    'Фракции': '/lore/factions',
    'Гильдии': '/lore/guilds',
    'Сказания': '/lore/tales',
    'Узлы': '/lore/uzly',
    'Глоссарий': '/lore/glossary',
    'Нить Башни Мафраш': '/lore/history'
  },
}

export function findReferenceSections(systems, value, currentSystem) {
  const query = value.trim().toLocaleLowerCase('ru')
  const ordered = [...systems].sort((a, b) => Number(b.id === currentSystem) - Number(a.id === currentSystem))
  return ordered.flatMap((system) => {
    const sections = system.groups?.flatMap(group => group.sections) ?? system.sections
    return [...new Set(sections)].flatMap((title) => {
      const to = SECTION_ROUTES_BY_SYSTEM[system.id]?.[title]
        || (system.id === '5e' && title === 'Классы' ? '/dnd5e/classes' : '')
      const edition = system.id === 'lore' ? 'Lore' : system.tag
      const label = system.id === 'lore' ? 'Lore' : `${system.name} · ${edition}`
      return to && `${title} ${label}`.toLocaleLowerCase('ru').includes(query) ? [{ title, label, edition, to }] : []
    })
  }).slice(0, 12)
}
