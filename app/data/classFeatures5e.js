import { CLASSDATA } from './classdata.js'

export const CLASS_FEATURE_SOURCE_NAMES = {
  PHB: "Player's Handbook (2014)",
  TCE: "Tasha's Cauldron of Everything",
  TJB: 'The Threads of JorasBashu',
  TLDC: 'The Threads of Lost Dice Club',
  TS: 'The Threads of Shkad',
  TU: 'The Threads of Unseen',
  TL: 'The Threads of Largo',
  TM: 'The Threads of Marn',
  TVV: 'The Threads of Vit-Vit',
  TMC: 'The Threads of Magnificent Cringelord',
  TST: 'The Threads of Stekly',
  TLEG: 'The Threads of Legolaisik',
  TA: 'The Threads of Ainur',
  TOMU: 'The Threads of Ob.med.uza',
  TH: 'The Threads of Hekych',
  TMG: 'The Threads of Mogrion',
  TRC: 'The Threads of RandCarter',
  TAX: 'The Threads of Axtimag',
  TLU: 'The Threads of Lui',
  TX: 'The Threads of Xrustalb',
  TKK: 'TKK.club'
}

export const CLASS_FEATURE_SOURCE_URLS = {
  PHB: 'https://www.dndbeyond.com/sources/dnd/phb-2014',
  TCE: 'https://www.dndbeyond.com/sources/dnd/tcoe'
}

function slug(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-я0-9]+/giu, '-')
    .replace(/^-+|-+$/g, '')
}

function featureId(...parts) {
  return parts.map(slug).filter(Boolean).join('--')
}

function featureLevel(value) {
  const match = String(value || '').match(/\d+/)
  return match ? Number(match[0]) : 999
}

function itemList(items = []) {
  return items.map(item => Array.isArray(item)
    ? { name: item[0], text: item[1] }
    : { name: item.name, text: item.text }
  )
}

function spellTable(rows = []) {
  return rows.map(row => ({ level: row[0], spell: row[1] }))
}

function sourceName(source) {
  return CLASS_FEATURE_SOURCE_NAMES[source] || source || 'Неизвестный источник'
}

const records = []

for (const [className, data] of Object.entries(CLASSDATA)) {
  for (const [order, feature] of (data.features || []).entries()) {
    const id = featureId(className, feature[2], feature[0])
    records.push({
      id,
      className,
      subclassId: '',
      subclassName: 'Базовый класс',
      type: 'class',
      typeLabel: 'Умение класса',
      name: feature[0],
      source: feature[1],
      sourceName: sourceName(feature[1]),
      sourceUrl: CLASS_FEATURE_SOURCE_URLS[feature[1]] || '',
      levelText: feature[2],
      level: featureLevel(feature[2]),
      text: feature[3],
      items: [],
      spellTable: spellTable(feature[4] || []),
      spells: [],
      order
    })
  }

  for (const archetype of (data.archetypes || [])) {
    for (const [order, feature] of (archetype.features || []).entries()) {
      const id = featureId(className, archetype.id, feature.name)
      records.push({
        id,
        className,
        subclassId: archetype.id,
        subclassName: archetype.name,
        type: 'subclass',
        typeLabel: archetype.type || 'Подкласс',
        name: feature.name,
        source: archetype.source,
        sourceName: archetype.sourceFullName || sourceName(archetype.source),
        sourceUrl: CLASS_FEATURE_SOURCE_URLS[archetype.source] || '',
        levelText: feature.level,
        level: featureLevel(feature.level),
        text: feature.text,
        items: itemList(feature.items || []),
        spellTable: [],
        spells: [],
        order: 100 + order
      })
    }

    if (archetype.spells?.length) {
      const id = featureId(className, archetype.id, 'Дополнительные заклинания')
      records.push({
        id,
        className,
        subclassId: archetype.id,
        subclassName: archetype.name,
        type: 'spells',
        typeLabel: 'Заклинания подкласса',
        name: 'Дополнительные заклинания',
        source: archetype.source,
        sourceName: archetype.sourceFullName || sourceName(archetype.source),
        sourceUrl: CLASS_FEATURE_SOURCE_URLS[archetype.source] || '',
        levelText: archetype.level || '',
        level: featureLevel(archetype.level),
        text: 'Дополнительные заклинания подкласса считаются заклинаниями выбранного класса и добавляются к правилам выбранного архетипа.',
        items: [],
        spellTable: [],
        spells: archetype.spells.map(spell => ({ ...spell, hasHigher: !!spell.higher })),
        order: 198
      })
    }
  }
}

export const CLASS_FEATURES_5E = records.sort((a, b) =>
  a.className.localeCompare(b.className, 'ru') ||
  a.level - b.level ||
  a.order - b.order ||
  a.name.localeCompare(b.name, 'ru')
)
