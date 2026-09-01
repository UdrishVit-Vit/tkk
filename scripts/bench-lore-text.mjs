#!/usr/bin/env node
// Сколько стоит разметка терминов на главе книги.
//
// Мерить в браузере не выходит: в скрытой панели не идут кадры, и любое
// измерение через requestAnimationFrame висит. Здесь тот же код гоняется по
// настоящему тексту главы.
//
// Запуск: node scripts/bench-lore-text.mjs [слаг главы]

import { readFileSync, writeFileSync, mkdtempSync, rmSync, cpSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dir = mkdtempSync(join(tmpdir(), 'lore-bench-'))
cpSync(join(ROOT, 'app', 'data'), join(dir, 'data'), { recursive: true })
cpSync(join(ROOT, 'app', 'utils'), join(dir, 'utils'), { recursive: true })

const ogni = join(dir, 'data', 'loreOgniGlossary', 'index.js')
const json = pathToFileURL(join(dir, 'data', 'loreOgniGlossary', 'season-01.generated.json')).href
writeFileSync(ogni, readFileSync(ogni, 'utf8').replace(
  "from './season-01.generated.json'",
  `from ${JSON.stringify(json)} with { type: 'json' }`,
), 'utf8')

const text = join(dir, 'utils', 'loreText.js')
writeFileSync(text, readFileSync(text, 'utf8').replace(
  "from '~/data/loreGlossary.js'",
  `from '../data/loreGlossary.js'`,
), 'utf8')

const { tokenizeLoreText } = await import(pathToFileURL(text).href)
const book = JSON.parse(readFileSync(join(ROOT, 'app', 'data', 'loreUzlyVremyaKoroley.generated.json'), 'utf8'))
rmSync(dir, { recursive: true, force: true })

const slug = process.argv[2] || 'zolotoy-telec'
const chapter = book.chapters.find(item => item.slug === slug)
if (!chapter) throw new Error(`нет главы ${slug}`)
const paragraphs = chapter.blocks.flatMap(block => block.paragraphs || [])
const size = paragraphs.reduce((sum, line) => sum + line.length, 0)

const started = performance.now()
let terms = 0
for (const paragraph of paragraphs) {
  terms += tokenizeLoreText(paragraph).filter(token => token.type === 'term').length
}
const cold = performance.now() - started

const again = performance.now()
for (const paragraph of paragraphs) tokenizeLoreText(paragraph)
const warm = performance.now() - again

console.log(`Глава «${chapter.title}»: ${paragraphs.length} абзацев, ${size} знаков, ${terms} терминов`)
console.log(`Первый разбор: ${cold.toFixed(0)} мс; повторный: ${warm.toFixed(0)} мс`)
