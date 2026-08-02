export const DND55E_GROUPS = [
  {
    id: 'character',
    title: 'Персонаж',
    sections: ['classes', 'species', 'feats', 'backgrounds', 'spells']
  },
  {
    id: 'items',
    title: 'Предметы',
    sections: ['equipment', 'magic-items']
  },
  {
    id: 'tools',
    title: 'Инструменты',
    sections: ['omens', 'wrath', 'tea']
  },
  {
    id: 'workshop',
    title: 'Мастерская',
    sections: ['bestiary', 'glossary']
  }
]

export const DND55E_SECTIONS = {
  classes: {
    title: 'Классы',
    path: '/dnd55e/classes',
    description: 'Классы персонажей по правилам редакции 2024 года и их развитие по уровням.'
  },
  species: {
    title: 'Виды',
    path: '/dnd55e/species',
    description: 'Виды персонажей D&D 5.5e и отдельные варианты происхождения мира Эноа.'
  },
  feats: {
    title: 'Черты',
    path: '/dnd55e/feats',
    description: 'Черты происхождения, общие, боевые и эпические черты редакции 2024 года.'
  },
  backgrounds: {
    title: 'Предыстории',
    path: '/dnd55e/backgrounds',
    description: 'Предыстории персонажей, их характеристики, владения и стартовое снаряжение.'
  },
  spells: {
    title: 'Заклинания',
    path: '/dnd55e/spells',
    description: 'Самостоятельный каталог заклинаний D&D 5.5e с правилами редакции 2024 года.'
  },
  equipment: {
    title: 'Снаряжение',
    path: '/dnd55e/equipment',
    description: 'Оружие, доспехи, инструменты и прочее снаряжение редакции 2024 года.'
  },
  'magic-items': {
    title: 'Магические предметы',
    path: '/dnd55e/magic-items',
    description: 'Магические предметы, их категории, свойства и требования к настройке.'
  },
  omens: {
    title: 'Знамения',
    path: '/dnd55e/omens',
    description: 'Знамения мира Эноа, подготовленные для самостоятельного пространства D&D 5.5e.'
  },
  wrath: {
    title: 'Гнев Ильбеша',
    path: '/dnd55e/wrath',
    description: 'Правила и эффекты Гнева Ильбеша в редакции D&D 5.5e.'
  },
  tea: {
    title: 'Чай',
    path: '/dnd55e/tea',
    description: 'Чаи мира Эноа и их игровые эффекты для редакции 2024 года.'
  },
  bestiary: {
    title: 'Бестиарий',
    path: '/dnd55e/bestiary',
    description: 'Отдельный каталог существ и статблоков, рассчитанных для D&D 5.5e.'
  },
  glossary: {
    title: 'Глоссарий',
    path: '/dnd55e/glossary',
    description: 'Термины и определения правил D&D 5.5e в едином справочнике.'
  }
}

export function dnd55eSection(id) {
  const section = DND55E_SECTIONS[id]
  if (!section) return null
  const group = DND55E_GROUPS.find(item => item.sections.includes(id))
  return { id, ...section, group: group?.title || '' }
}

