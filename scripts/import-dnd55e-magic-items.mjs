import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const sourcePath = process.argv[2]
if (!sourcePath) {
  throw new Error('Передайте путь к текстовому списку магических предметов первым аргументом.')
}

const ROOT = resolve(import.meta.dirname, '..')
const OUTPUT = resolve(ROOT, 'public/data/dnd55e/magic-items-2024.json')
const CACHE = resolve(ROOT, '.codex-tmp/dnd55e-magic-items-cache.json')
const LIST_URL = 'https://new.ttg.club/magic-items'
const API_BASE = 'https://new.ttg.club/api/v2/magic-items'

const SOURCE_TITLES = {
  DMG: 'Руководство мастера',
  PHB: 'Книга игрока',
  MM: 'Бестиарий'
}

const TITLE_CORRECTIONS = {
  'Potion of Healing': 'Зелье лечения'
}

const RARITIES = [
  ['varies', 'Редкость варьируется', /редкость варьируется/i],
  ['very-rare', 'Очень редкий', /очень редкий/i],
  ['uncommon', 'Необычный', /необычный/i],
  ['legendary', 'Легендарный', /легендарный/i],
  ['artifact', 'Артефакт', /артефакт/i],
  ['common', 'Обычный', /обычный/i],
  ['rare', 'Редкий', /редкий/i],
  ['unknown', 'Редкость не определена', /редкость не определена/i]
]

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[’‘`]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('en')
}

function decodeHtml(value) {
  return value
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
}

function parseRarity(raw) {
  let value = raw.trim()
  let attunement = false
  if (/^Н(?=[а-яё])/u.test(value)) {
    attunement = true
    value = value.slice(1)
  }
  const rarity = RARITIES.find(([, , pattern]) => pattern.test(value)) || RARITIES.at(-1)
  return { rarity: rarity[0], rarityLabel: rarity[1], attunement }
}

function parseCatalogue(text) {
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean)
  const items = []

  lines.forEach((line, index) => {
    const match = line.match(/^(.*?)\s*\[([^\]]+)\]$/u)
    if (!match) return
    const source = lines[index + 1]
    if (!SOURCE_TITLES[source]) return
    items.push({
      title: TITLE_CORRECTIONS[match[2].trim()] || match[1].trim(),
      englishName: match[2].trim(),
      source,
      sourceTitle: SOURCE_TITLES[source],
      ...parseRarity(lines[index + 2] || '')
    })
  })

  return items
}

function typeInfo(subtitle = '') {
  const lower = subtitle.toLocaleLowerCase('ru')
  const variants = [
    ['armor', 'Доспех', /^доспех/u],
    ['weapon', 'Оружие', /^оружие/u],
    ['potion', 'Зелье', /^зелье/u],
    ['ring', 'Кольцо', /^кольцо/u],
    ['rod', 'Жезл', /^жезл/u],
    ['staff', 'Посох', /^посох/u],
    ['wand', 'Волшебная палочка', /^волшебная палочка/u],
    ['scroll', 'Свиток', /^свиток/u],
    ['wondrous', 'Чудесный предмет', /^чудесный предмет/u]
  ]
  return variants.find(([, , pattern]) => pattern.test(lower))?.slice(0, 2)
    || ['other', subtitle.split(',')[0] || 'Магический предмет']
}

function firstText(nodes) {
  for (const node of nodes || []) {
    if (typeof node === 'string' && node.trim()) return node.trim()
    if (node?.text?.trim()) return node.text.trim()
    const nested = firstText(node?.content)
    if (nested) return nested
  }
  return ''
}

const SPELL_LINK_ALIASES = {
  'wall-of-wind-phb': 'wind-wall-phb',
  'leomund-s-tiny-hut-phb': 'leomunds-tiny-hut-phb',
  'mordenkainen-s-private-sanctum-phb': 'mordenkainens-private-sanctum-phb',
  'otiluke-s-resilient-sphere-phb': 'otilukes-resilient-sphere-phb',
  'tasha-s-hideous-laughter-phb': 'tashas-hideous-laughter-phb'
}

const GLOSSARY_LINK_ALIASES = {
  'magic-action-phb': 'magic-phb',
  advantage: 'advantage-phb',
  'melee-attack-phb': 'attack-phb',
  'hit-phb': 'attack-roll-phb',
  'ring-phb': 'magic-items-phb',
  'spells-phb': 'spell-phb',
  'destroyed-phb': 'object-phb',
  'auran-phb': 'languages-phb',
  'terran-phb': 'languages-phb',
  'ignan-phb': 'languages-phb',
  'aquan-phb': 'languages-phb',
  'abyss-phb': 'planar-effects-dmg',
  'fiend-phb': 'creature-type-phb',
  'undead-phb': 'creature-type-phb'
}

const MAGIC_ITEM_REFERENCE_ALIASES = {
  'Зелье лечения [Potion of Healing]': 'potion-of-healing-dmg',
  'Большое зелье лечения [Potion of Greater Healing]': 'potion-of-greater-healing-dmg',
  'Отличное зелье лечения [Potion of Superior Healing]': 'potion-of-superior-healing-dmg',
  'Превосходное зелье лечения [Potion of Supreme Healing]': 'potion-of-supreme-healing-dmg',
  'Переносная дыра [Portable Hole]': 'portable-hole-dmg'
}

function cleanRuleText(value) {
  return String(value || '')
    .replace(/\{@br\}/gu, ' ')
    .replace(/\{@spell\s+([^}|]+)\s*\|\s*url\s*:\s*([^}\s]+)\s*\}/gu, (_, label, url) => `[${label.trim()}](/dnd55e/spells?spell=${SPELL_LINK_ALIASES[url] || url})`)
    .replace(/\{@magicItem\s+([^}|]+)\s*\|\s*url\s*:\s*([^}\s]+)\s*\}/gu, (_, label, url) => `[${label.trim()}](/dnd55e/magic-items?item=${url})`)
    .replace(/\{@glossary\s+([^}|]+)\s*\|\s*url\s*:\s*([^}\s]+)\s*\}/gu, (_, label, url) => `[${label.trim()}](/dnd55e/glossary?rule=${GLOSSARY_LINK_ALIASES[url] || url})`)
    .replace(/\{@(?:bold|b)\s+([^}]+)\}/gu, '**$1**')
    .replace(/\{@(?:italic|i)\s+([^}]+)\}/gu, '*$1*')
    .replace(/\{@(?:roll|dice)\s+([^}]+)\}/gu, '$1')
    .replace(/\{@\w+\s+([^}|]+)(?:\|[^}]*)?\}/gu, '$1')
    .replace(/\s+/gu, ' ')
    .replace(/\s+([,.;:!?])/gu, '$1')
    .trim()
}

function inlineLink(type, label, url) {
  if (!url) return label
  if (type === 'spell') return `[${label}](/dnd55e/spells?spell=${SPELL_LINK_ALIASES[url] || url})`
  if (type === 'magicItem') return `[${label}](/dnd55e/magic-items?item=${url})`
  if (type === 'glossary') return `[${label}](/dnd55e/glossary?rule=${GLOSSARY_LINK_ALIASES[url] || url})`
  return label
}

function joinInline(parts) {
  return parts
    .filter(Boolean)
    .join(' ')
    .replace(/\s+([,.;:!?])/gu, '$1')
    .replace(/([([])\s+/gu, '$1')
    .trim()
}

function inlineText(node) {
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return cleanRuleText(node)
  if (Array.isArray(node)) return joinInline(node.map(inlineText))
  if (node.text) return cleanRuleText(node.text)
  const content = inlineText(node.content)
  if (node.type === 'bold' || node.type === 'b') return `**${content}**`
  if (node.type === 'italic' || node.type === 'i') return `*${content}*`
  if (node.type === 'spell' || node.type === 'magicItem' || node.type === 'glossary') {
    return inlineLink(node.type, content, node.attrs?.url)
  }
  return content
}

function normalizeDescription(nodes) {
  return (nodes || []).map((node) => {
    if (typeof node === 'string') return { type: 'paragraph', text: cleanRuleText(node) }
    if (node?.type === 'table') {
      return {
        type: 'table',
        caption: inlineText(node.caption),
        columns: (node.colLabels || []).map(inlineText),
        rows: (node.rows || []).map(row => row.map(inlineText))
      }
    }
    if (node?.type === 'list') {
      return {
        type: 'list',
        items: (node.content || []).map(inlineText).filter(Boolean)
      }
    }
    return { type: 'paragraph', text: inlineText(node) }
  }).filter(block => block.text || block.items?.length || block.rows?.length)
}

function enrichKnownItemReferences(value) {
  if (typeof value === 'string') {
    let enriched = value
    for (const [label, id] of Object.entries(MAGIC_ITEM_REFERENCE_ALIASES)) {
      if (enriched.includes(`[${label}](/dnd55e/magic-items?item=${id})`)) continue
      enriched = enriched.split(label).join(`[${label}](/dnd55e/magic-items?item=${id})`)
    }
    return enriched
  }
  if (Array.isArray(value)) return value.map(enrichKnownItemReferences)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, enrichKnownItemReferences(item)]))
  }
  return value
}

async function fetchText(url, attempts = 8) {
  let error
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'TKK.club content importer (D&D 5.5e)' }
      })
      if (!response.ok) {
        const retryAfter = Number(response.headers.get('retry-after')) || 0
        const requestError = new Error(`${response.status} ${response.statusText}`)
        requestError.retryAfter = retryAfter
        throw requestError
      }
      return await response.text()
    } catch (caught) {
      error = caught
      const delay = Math.max((caught.retryAfter || 0) * 1000, 1800 * (attempt + 1))
      await new Promise(resolvePromise => setTimeout(resolvePromise, delay))
    }
  }
  throw error
}

async function pooledMap(values, concurrency, mapper) {
  const result = new Array(values.length)
  let cursor = 0
  async function worker() {
    while (cursor < values.length) {
      const index = cursor
      cursor += 1
      result[index] = await mapper(values[index], index)
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker))
  return result
}

async function loadCache() {
  try {
    return JSON.parse(await readFile(CACHE, 'utf8'))
  } catch {
    return {}
  }
}

async function saveCache(cache) {
  let error
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      await writeFile(CACHE, `${JSON.stringify(cache)}\n`, 'utf8')
      return
    } catch (caught) {
      error = caught
      await new Promise(resolvePromise => setTimeout(resolvePromise, 180 * (attempt + 1)))
    }
  }
  throw error
}

const catalogue = parseCatalogue(await readFile(resolve(sourcePath), 'utf8'))
if (catalogue.length !== 560) {
  throw new Error(`Ожидалось 560 предметов, найдено ${catalogue.length}.`)
}

const listHtml = await fetchText(LIST_URL)
const slugIndex = new Map()
for (const match of listHtml.matchAll(/<a href="\/magic-items\/([^"?#]+)">[\s\S]{0,1400}?<span title="[^"]+? \[([^\]]+)]"/g)) {
  const slug = match[1]
  const source = slug.match(/-(dmg|phb|mm)$/i)?.[1]?.toUpperCase()
  if (source) slugIndex.set(`${normalize(decodeHtml(match[2]))}|${source}`, slug)
}

const unresolvedSlugs = catalogue.filter(item => !slugIndex.has(`${normalize(item.englishName)}|${item.source}`))
if (unresolvedSlugs.length) {
  throw new Error(`Не найдены адреса (${unresolvedSlugs.length}):\n${unresolvedSlugs.map(item => item.englishName).join('\n')}`)
}
const slugs = catalogue.map(item => slugIndex.get(`${normalize(item.englishName)}|${item.source}`))

const cache = await loadCache()
let downloaded = 0
const details = await pooledMap(slugs, 1, async (slug, index) => {
  if (cache[slug]) return cache[slug]
  const json = JSON.parse(await fetchText(`${API_BASE}/${slug}`))
  cache[slug] = json
  downloaded += 1
  await saveCache(cache)
  if (downloaded % 25 === 0) process.stdout.write(`Загружено новых карточек: ${downloaded}; всего в кэше: ${Object.keys(cache).length}/${slugs.length}\n`)
  await new Promise(resolvePromise => setTimeout(resolvePromise, 300))
  return json
})

const detailIndex = new Map()
for (const detail of details) {
  const source = detail.source?.name?.label
  if (!SOURCE_TITLES[source]) continue
  detailIndex.set(`${normalize(detail.name?.eng)}|${source}`, detail)
}

const missing = []
const items = catalogue.map((item) => {
  const detail = detailIndex.get(`${normalize(item.englishName)}|${item.source}`)
  if (!detail) {
    missing.push(`${item.englishName} (${item.source})`)
    return null
  }
  const [type, typeLabel] = typeInfo(detail.subtitle)
  return {
    id: detail.url,
    ...item,
    attunement: /требуется настройка/iu.test(detail.subtitle),
    type,
    typeLabel,
    subtitle: detail.subtitle,
    summary: cleanRuleText(firstText(detail.description)),
    description: enrichKnownItemReferences(normalizeDescription(detail.description)),
    srdVersion: detail.srdVersion || null,
    sourcePage: detail.source?.page || null
  }
})

if (missing.length) {
  throw new Error(`Не найдены карточки (${missing.length}):\n${missing.join('\n')}`)
}

const payload = {
  generatedAt: new Date().toISOString(),
  count: items.length,
  items
}

await writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
process.stdout.write(`Готово: ${items.length} предметов → ${OUTPUT}\n`)
