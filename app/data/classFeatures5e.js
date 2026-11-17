import { CLASSDATA } from './classdata.js'

export { CLASS_FEATURE_SOURCE_NAMES, CLASS_FEATURE_SOURCE_URLS } from './classFeatureSources.js'
import { CLASS_FEATURE_SOURCE_NAMES, CLASS_FEATURE_SOURCE_URLS } from './classFeatureSources.js'

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

function addBaseFeatures(className, features, variantSource = '') {
  for (const [order, feature] of (features || []).entries()) {
    const [name, source, levelText, text, rows] = Array.isArray(feature)
      ? feature
      : [feature.name, feature.src || feature.source, feature.lvl || feature.level, feature.text, feature.spellTable]
    records.push({
      id: featureId(className, variantSource, levelText, name),
      className,
      subclassId: '',
      subclassName: 'Базовый класс',
      type: 'class',
      typeLabel: 'Умение класса',
      name,
      source,
      sourceName: sourceName(source),
      sourceUrl: CLASS_FEATURE_SOURCE_URLS[source] || '',
      levelText,
      level: featureLevel(levelText),
      text,
      items: itemList(feature.items),
      spellTable: spellTable(rows || []),
      spells: [],
      order
    })
  }
}

for (const [className, data] of Object.entries(CLASSDATA)) {
  addBaseFeatures(className, data.features)
  for (const [source, variant] of Object.entries(data.baseVariants || {})) {
    addBaseFeatures(className, variant.features, source)
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
