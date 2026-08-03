// Перенацеливает ссылки на картинки /images/*.png|jpg -> .webp в коде и контенте.
// Меняет ссылку ТОЛЬКО если рядом реально существует .webp в public/images.
// Пути без webp не трогает, а выводит списком (битые/незаконвертированные).
//
//   node scripts/images-repoint-webp.mjs         # DRY RUN — только показать
//   node scripts/images-repoint-webp.mjs --apply # применить
//
// Запускать после images-to-webp.mjs. Динамические пути вида
// `/images/.../${var}.png` regex не ловит — такие правь вручную.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const PROJ = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = join(PROJ, 'public')
const APPLY = process.argv.includes('--apply')
const SCAN_DIRS = [join(PROJ, 'app'), join(PROJ, 'content')]
const EXT_OK = new Set(['.vue', '.js', '.mjs', '.ts', '.md', '.json'])
const IMG_RX = /(\/?images\/[^\s"'`)\]}<>]+?\.(?:png|jpe?g))/gi

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) await walk(p, out)
    else if (e.isFile() && EXT_OK.has(extname(e.name).toLowerCase())) out.push(p)
  }
  return out
}

function webpDiskPath(ref) {
  const clean = ref.replace(/^\//, '')
  const webp = clean.replace(/\.(png|jpe?g)$/i, '.webp')
  return join(PUBLIC, webp)
}
const rel = f => f.replace(PROJ + '\\', '').replace(PROJ + '/', '').replace(/\\/g, '/')

async function run() {
  const missing = new Map()
  let filesChanged = 0, refsReplaced = 0
  const perFile = []
  const files = (await Promise.all(SCAN_DIRS.map(d => walk(d)))).flat()

  for (const file of files) {
    const src = await readFile(file, 'utf8')
    let count = 0
    const next = src.replace(IMG_RX, (m) => {
      if (existsSync(webpDiskPath(m))) { count++; return m.replace(/\.(png|jpe?g)$/i, '.webp') }
      if (!missing.has(m)) missing.set(m, new Set())
      missing.get(m).add(rel(file))
      return m
    })
    if (count > 0) {
      perFile.push([rel(file), count]); refsReplaced += count; filesChanged++
      if (APPLY) await writeFile(file, next)
    }
  }

  console.log(APPLY ? '=== ПРИМЕНЕНО ===' : '=== DRY RUN (ничего не записано) ===')
  console.log(`Файлов затронуто: ${filesChanged}, ссылок заменено: ${refsReplaced}\n`)
  perFile.sort((a, b) => b[1] - a[1])
  for (const [f, c] of perFile) console.log(`  ${String(c).padStart(3)}  ${f}`)

  if (missing.size) {
    console.log(`\n⚠️  Ссылки БЕЗ webp-версии (НЕ тронуты) — ${missing.size} шт:`)
    for (const [ref, set] of missing) {
      console.log(`  ${ref}`)
      console.log(`       в: ${[...set].join(', ')}`)
    }
  } else {
    console.log('\n✅ Для всех ссылок нашлась webp-версия.')
  }
}
run().catch(e => { console.error(e); process.exit(1) })
