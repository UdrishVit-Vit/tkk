#!/usr/bin/env node
// Какой вид свод присвоил этим статьям? Вид выводится правилами, а правила
// ошибаются — но увидеть ошибку можно только списком.
// Запуск: node scripts/lore-types-of.mjs id1 id2 …
import { readFileSync, writeFileSync, mkdtempSync, rmSync, cpSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dir = mkdtempSync(join(tmpdir(), 'lore-types-'))
cpSync(join(ROOT, 'app', 'data'), dir, { recursive: true })
const ogni = join(dir, 'loreOgniGlossary', 'index.js')
const json = pathToFileURL(join(dir, 'loreOgniGlossary', 'season-01.generated.json')).href
writeFileSync(ogni, readFileSync(ogni, 'utf8').replace("from './season-01.generated.json'", `from ${JSON.stringify(json)} with { type: 'json' }`), 'utf8')
const { LORE_GLOSSARY, LORE_ENTITY_TYPES } = await import(pathToFileURL(join(dir, 'loreGlossary.js')).href)
rmSync(dir, { recursive: true, force: true })
const titles = Object.fromEntries(LORE_ENTITY_TYPES.map(t => [t.id, t.title]))
const want = new Set(process.argv.slice(2))
for (const entry of LORE_GLOSSARY) {
  if (want.size && !want.has(entry.id)) continue
  console.log(`${entry.id}\t${entry.type} (${titles[entry.type]})\t${entry.term}`)
}
