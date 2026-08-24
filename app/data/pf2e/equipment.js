import { PF2E_WEAPONS, PF2E_WEAPON_CATEGORIES, PF2E_WEAPON_GROUP_CRIT } from './weapons.js'
import { PF2E_ARMOR, PF2E_ARMOR_CATEGORIES, PF2E_SHIELDS, PF2E_ARMOR_GROUP_SPEC } from './armor.js'
import { PF2E_GEAR, PF2E_GEAR_CATEGORIES } from './gear.js'
import { PF2E_ALCHEMY, PF2E_ALCHEMY_CATEGORIES } from './alchemy.js'

// One flat catalogue for the equipment page. Every entry carries a `stats` list
// so the page renders any item type without knowing which table it came from.

const weaponEntries = PF2E_WEAPONS.map(w => ({
  id: `w-${w.id}`,
  title: w.title,
  en: w.en,
  category: w.cat,
  price: w.price,
  bulk: w.bulk,
  traits: w.traits,
  stats: [
    { label: 'Урон', value: w.damage },
    { label: 'Руки', value: String(w.hands) },
    { label: 'Груз', value: w.bulk },
    { label: 'Группа', value: w.group }
  ],
  desc: PF2E_WEAPON_GROUP_CRIT[w.group]
    ? `Критическая специализация (${w.group.toLowerCase()}): ${PF2E_WEAPON_GROUP_CRIT[w.group]}`
    : ''
}))

const armorEntries = PF2E_ARMOR.map(a => ({
  id: `a-${a.id}`,
  title: a.title,
  en: a.en,
  category: `armor-${a.cat}`,
  price: a.price,
  bulk: a.bulk,
  traits: a.traits,
  stats: [
    { label: 'Бонус КБ', value: a.ac },
    { label: 'Предел Ловкости', value: a.dexCap },
    { label: 'Штраф проверок', value: a.check },
    { label: 'Штраф скорости', value: a.speed },
    { label: 'Требуемая Сила', value: a.str },
    { label: 'Груз', value: a.bulk },
    { label: 'Группа', value: a.group }
  ],
  desc: [a.note, PF2E_ARMOR_GROUP_SPEC[a.group] ? `Специализация брони (${a.group.toLowerCase()}): ${PF2E_ARMOR_GROUP_SPEC[a.group]}` : '']
    .filter(Boolean).join(' ')
}))

const shieldEntries = PF2E_SHIELDS.map(s => ({
  id: `s-${s.id}`,
  title: s.title,
  en: s.en,
  category: 'shields',
  price: s.price,
  bulk: s.bulk,
  traits: [],
  stats: [
    { label: 'Бонус КБ', value: s.ac },
    { label: 'Твёрдость', value: String(s.hardness) },
    { label: 'Хиты', value: String(s.hp) },
    { label: 'Порог поломки', value: String(s.bt) },
    { label: 'Груз', value: s.bulk }
  ],
  desc: s.note
}))

const gearEntries = PF2E_GEAR.map(g => ({
  id: `g-${g.id}`,
  title: g.title,
  en: g.en,
  category: g.cat,
  price: g.price,
  bulk: g.bulk,
  traits: [],
  stats: [
    { label: 'Цена', value: g.price },
    { label: 'Груз', value: g.bulk }
  ],
  desc: g.desc
}))

const alchemyEntries = PF2E_ALCHEMY.map(a => ({
  id: `al-${a.id}`,
  title: a.title,
  en: a.en,
  category: `alch-${a.cat}`,
  price: a.price,
  bulk: a.bulk,
  level: a.level,
  traits: a.traits,
  stats: [
    { label: 'Уровень', value: String(a.level) },
    { label: 'Цена', value: a.price },
    { label: 'Груз', value: a.bulk }
  ],
  desc: a.desc
}))

export const PF2E_EQUIPMENT = [
  ...weaponEntries,
  ...armorEntries,
  ...shieldEntries,
  ...gearEntries,
  ...alchemyEntries
]

// Category order is the reading order on the page: weapons, then protection,
// then everything a character actually carries, then alchemy.
export const PF2E_EQUIPMENT_CATEGORIES = {
  ...PF2E_WEAPON_CATEGORIES,
  ...Object.fromEntries(Object.entries(PF2E_ARMOR_CATEGORIES).map(([k, v]) => [`armor-${k}`, v])),
  shields: 'Щиты',
  ...PF2E_GEAR_CATEGORIES,
  ...Object.fromEntries(Object.entries(PF2E_ALCHEMY_CATEGORIES).map(([k, v]) => [`alch-${k}`, v]))
}

// Coarse groups for the filter panel, so the reader can narrow to "оружие"
// without ticking six separate weapon categories.
export const PF2E_EQUIPMENT_GROUPS = {
  weapons: { label: 'Оружие', categories: Object.keys(PF2E_WEAPON_CATEGORIES) },
  protection: { label: 'Броня и щиты', categories: [...Object.keys(PF2E_ARMOR_CATEGORIES).map(k => `armor-${k}`), 'shields'] },
  gear: { label: 'Снаряжение', categories: ['gear', 'tools', 'clothing'] },
  world: { label: 'Услуги и транспорт', categories: ['services', 'mounts', 'materials'] },
  alchemy: { label: 'Алхимия', categories: Object.keys(PF2E_ALCHEMY_CATEGORIES).map(k => `alch-${k}`) }
}
