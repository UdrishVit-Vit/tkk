#!/usr/bin/env node
// Есть ли уже такая статья в своде?
//
// Каждый новый кусок лора — это в первую очередь список имён, и главный вопрос
// по нему один: что из этого свод уже знает, а что придётся заводить. Сверять
// глазами по четырём сотням записей нельзя — имя склоняется, пишется с
// апострофом и живёт в синонимах, поэтому сравнение идёт той же основой слова,
// что сводит источники.
//
// Запуск: node scripts/lore-lookup.mjs Марак «Серый Султан» …
//         node scripts/lore-lookup.mjs < names.txt

import { readFileSync, writeFileSync, mkdtempSync, rmSync, cpSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DATA = join(ROOT, 'app', 'data')

function loadGlossary() {
  const dir = mkdtempSync(join(tmpdir(), 'lore-lookup-'))
  cpSync(DATA, dir, { recursive: true })
  const ogni = join(dir, 'loreOgniGlossary', 'index.js')
  const json = pathToFileURL(join(dir, 'loreOgniGlossary', 'season-01.generated.json')).href
  writeFileSync(ogni, readFileSync(ogni, 'utf8').replace(
    "from './season-01.generated.json'",
    `from ${JSON.stringify(json)} with { type: 'json' }`,
  ), 'utf8')
  const glossary = pathToFileURL(join(dir, 'loreGlossary.js')).href
  return import(glossary).finally(() => rmSync(dir, { recursive: true, force: true }))
}

const { LORE_GLOSSARY, LORE_ENTITY_TYPES, loreMatchKey } = await loadGlossary()

const names = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readFileSync(0, 'utf8').split('\n')

const byKey = new Map()
for (const entry of LORE_GLOSSARY) {
  for (const name of [entry.term, ...(entry.aliases || [])]) {
    const key = loreMatchKey(name)
    if (!key) continue
    if (!byKey.has(key)) byKey.set(key, [])
    if (!byKey.get(key).some(item => item.id === entry.id)) byKey.get(key).push(entry)
  }
}

const типы = Object.fromEntries(LORE_ENTITY_TYPES.map(type => [type.id, type.title]))
const есть = []
const нет = []

for (const raw of names) {
  const name = raw.trim().replace(/^[«"']|[»"']$/g, '')
  if (!name || name.startsWith('#')) continue
  const hits = byKey.get(loreMatchKey(name))
  if (hits) есть.push(`  ${name} → ${hits.map(h => `${h.term} [${типы[h.type] || h.type}] ${h.id}`).join(' | ')}`)
  else нет.push(`  ${name}`)
}

console.log(`Уже в своде (${есть.length}):`)
console.log(есть.join('\n') || '  —')
console.log(`\nНет статьи (${нет.length}):`)
console.log(нет.join('\n') || '  —')
