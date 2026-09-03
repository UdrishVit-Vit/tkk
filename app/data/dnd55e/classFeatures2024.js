import { CLASSDATA } from '../classdata.js'
import { CLASS_FEATURE_SOURCE_NAMES, CLASS_FEATURE_SOURCE_URLS, normalizeFeatureSource } from '../classFeatureSources.js'
import { DND55E_CLASSES } from './catalogues.js'
import { DND55E_CLASS_DETAILS } from './classdata2024.js'
import { mergeArchetypes2024 } from './classArchetypes2024.js'

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
  return rows.map(row => Array.isArray(row) ? { level: row[0], spell: row[1] } : { level: row.lvl, spell: row.spell })
}

// Базовые умения 2024 записаны и массивом [название, источник, уровень, текст, таблица],
// и объектом {name, src, lvl, text, items} — приводим к одному виду.
function normalizeBaseFeature(feature) {
  if (Array.isArray(feature)) {
    return { name: feature[0], source: feature[1], levelText: feature[2], text: feature[3], spellTable: feature[4] || [], items: [] }
  }
  return {
    name: feature.name,
    source: feature.src || feature.source,
    levelText: feature.lvl || feature.level,
    text: feature.text,
    spellTable: feature.spellTable || [],
    items: feature.items || []
  }
}

const records = []

for (const { title: className } of DND55E_CLASSES.filter(item => item.hitDie)) {
  const details = DND55E_CLASS_DETAILS[className] || {}

  for (const [order, raw] of (details.features || []).entries()) {
    const feature = normalizeBaseFeature(raw)
    const source = normalizeFeatureSource(feature.source)
    records.push({
      id: featureId(className, feature.levelText, feature.name),
      className,
      subclassId: '',
      subclassName: 'Базовый класс',
      type: 'class',
      typeLabel: 'Умение класса',
      name: feature.name,
      source: source.code,
      sourceName: source.name,
      sourceUrl: CLASS_FEATURE_SOURCE_URLS[source.code] || '',
      levelText: feature.levelText,
      level: featureLevel(feature.levelText),
      text: feature.text,
      items: itemList(feature.items),
      spellTable: spellTable(feature.spellTable),
      spells: [],
      order
    })
  }

  const archetypes = mergeArchetypes2024(details.archetypes, CLASSDATA[className]?.archetypes)

  for (const archetype of archetypes) {
    const source = normalizeFeatureSource(archetype.source)
    const sourceName = archetype.sourceFullName || CLASS_FEATURE_SOURCE_NAMES[source.code] || source.name

    for (const [order, feature] of (archetype.features || []).entries()) {
      records.push({
        id: featureId(className, archetype.id, feature.name),
        className,
        subclassId: archetype.id,
        subclassName: archetype.name,
        type: 'subclass',
        typeLabel: archetype.type || 'Подкласс',
        name: feature.name,
        source: source.code,
        sourceName,
        sourceUrl: CLASS_FEATURE_SOURCE_URLS[source.code] || '',
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
      records.push({
        id: featureId(className, archetype.id, 'Дополнительные заклинания'),
        className,
        subclassId: archetype.id,
        subclassName: archetype.name,
        type: 'spells',
        typeLabel: 'Заклинания подкласса',
        name: 'Дополнительные заклинания',
        source: source.code,
        sourceName,
        sourceUrl: CLASS_FEATURE_SOURCE_URLS[source.code] || '',
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

export const CLASS_FEATURES_2024 = records.sort((a, b) =>
  a.className.localeCompare(b.className, 'ru') ||
  a.level - b.level ||
  a.order - b.order ||
  a.name.localeCompare(b.name, 'ru')
)
