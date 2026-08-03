// Пережимает все PNG/JPG в public/images -> .webp рядом (оригиналы сохраняются).
// Ресайз: длинная сторона не больше --max (без увеличения мелких).
//
//   node scripts/images-to-webp.mjs            # конвертировать (max 1600, webp q80)
//   node scripts/images-to-webp.mjs --dry      # только показать, без записи
//   node scripts/images-to-webp.mjs --max=2000 --q=82
//
// После добавления новых картинок: сначала этот скрипт, затем images-repoint-webp.mjs.
import { readdir, stat } from 'node:fs/promises'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const PROJ = join(dirname(fileURLToPath(import.meta.url)), '..')
const IMAGES = join(PROJ, 'public', 'images')

// sharp приходит транзитивно с @nuxt/image и не всегда поднят в корень node_modules.
function loadSharp() {
  try { return require('sharp') } catch {}
  const { existsSync, readdirSync } = require('node:fs')
  const store = join(PROJ, 'node_modules', '.pnpm')
  if (existsSync(store)) {
    const dir = readdirSync(store).find(d => /^sharp@/.test(d))
    if (dir) return require(join(store, dir, 'node_modules', 'sharp'))
  }
  throw new Error('Не найден пакет sharp. Установи: pnpm add -D sharp')
}
const sharp = loadSharp()

const args = process.argv.slice(2)
const DRY = args.includes('--dry')
const MAX_EDGE = Number((args.find(a => a.startsWith('--max=')) || '').split('=')[1]) || 1600
const QUALITY = Number((args.find(a => a.startsWith('--q=')) || '').split('=')[1]) || 80
const CONCURRENCY = 6

const isRaster = f => ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase())
const fmt = b => (b / 1048576).toFixed(2) + ' MB'

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) await walk(p, out)
    else if (e.isFile() && isRaster(e.name)) out.push(p)
  }
  return out
}

async function convertOne(src) {
  const dst = src.replace(/\.(png|jpe?g)$/i, '.webp')
  const before = (await stat(src)).size
  if (DRY) return { src, before, after: 0, dst, skipped: 'dry' }
  const img = sharp(src, { failOn: 'none' })
  const meta = await img.metadata()
  const longEdge = Math.max(meta.width || 0, meta.height || 0)
  let pipe = img
  if (longEdge > MAX_EDGE) {
    pipe = pipe.resize({
      width: meta.width >= meta.height ? MAX_EDGE : null,
      height: meta.height > meta.width ? MAX_EDGE : null,
      withoutEnlargement: true
    })
  }
  await pipe.webp({ quality: QUALITY, effort: 5 }).toFile(dst)
  const after = (await stat(dst)).size
  return { src, before, after, dst, resized: longEdge > MAX_EDGE, w: meta.width, h: meta.height }
}

async function run() {
  const files = await walk(IMAGES)
  console.log(`Найдено растровых картинок: ${files.length}`)
  console.log(`Настройки: max ${MAX_EDGE}px, webp q${QUALITY}${DRY ? ' (DRY RUN)' : ''}\n`)

  let totalBefore = 0, totalAfter = 0, done = 0, errors = 0
  const results = []
  let i = 0
  async function worker() {
    while (i < files.length) {
      const idx = i++
      try {
        const r = await convertOne(files[idx])
        totalBefore += r.before; totalAfter += r.after
        results.push(r); done++
        if (done % 40 === 0) process.stdout.write(`  …${done}/${files.length}\n`)
      } catch (e) {
        errors++; console.error('  ОШИБКА', files[idx], e.message)
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  console.log(`\nГотово: ${done} сконвертировано, ${errors} ошибок`)
  console.log(`Оригиналы (эти файлы):   ${fmt(totalBefore)}`)
  console.log(`WebP-версии:             ${fmt(totalAfter)}`)
  if (totalAfter) {
    console.log(`Экономия:                ${fmt(totalBefore - totalAfter)}  (−${(100 * (1 - totalAfter / totalBefore)).toFixed(1)}%)`)
    console.log(`Во сколько раз меньше:   ${(totalBefore / totalAfter).toFixed(1)}×`)
  }
  const top = results.filter(r => r.after).sort((a, b) => (b.before - b.after) - (a.before - a.after)).slice(0, 8)
  if (top.length) {
    console.log('\nТОП по экономии:')
    for (const r of top) {
      const rel = r.src.replace(PROJ + '\\', '').replace(PROJ + '/', '')
      console.log(`  ${fmt(r.before)} -> ${fmt(r.after)}  ${r.resized ? `(${r.w}px→${MAX_EDGE}px) ` : ''}${rel}`)
    }
  }
}
run().catch(e => { console.error(e); process.exit(1) })
