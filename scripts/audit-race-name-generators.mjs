import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { parse, compileScript, compileTemplate } from 'vue/compiler-sfc'
import { NAME_ROLLS, RACE_NAME_GENERATORS, VETU_NAME_PARTS } from '../app/data/raceNameGenerators.js'
import { nameKey, rowKeys, ROLL_WEIGHTS, drawNameRow, worldNameTable, isLostVetuName, LOST_VETU_KEYS } from '../app/data/raceNameRoll.js'
import { knowledge, NAME_RACES, NAME_GUIDES, tablesForRace, profileForTable, evidenceForName, VETU_CYCLE_TABLE } from '../app/data/nameLibrary.js'
import { NAME_ENRICHMENT, enrichedNameTable } from '../app/data/nameEnrichment.js'
import { publicNamesForTable } from '../app/data/publicRaceNames.js'

const markdown = readFileSync(new URL('../NAME_GENERATORS.md', import.meta.url), 'utf8')
const tables = Object.values(RACE_NAME_GENERATORS).flat()
const occupied = new Map()
let names = 0
assert.equal(NAME_ROLLS.length, 35)
assert.equal(new Set(NAME_ROLLS).size, 35)
assert.equal(ROLL_WEIGHTS.reduce((a, b) => a + b, 0), 256)
const counts = new Map()
for (let n = 0; n < 256; n++) {
  const dice = [0, 1, 2, 3].map(i => 1 + ((n >> (i * 2)) & 3)).sort()
  const key = dice.join(' ')
  counts.set(key, (counts.get(key) || 0) + 1)
}
NAME_ROLLS.forEach((key, i) => assert.equal(ROLL_WEIGHTS[i], counts.get(key)))
for (const table of tables) {
  const columns = table.names ? [table.names] : [table.m, table.f]
  columns.forEach(column => assert.equal(column.length, 35, table.label))
  for (const column of columns) {
    for (const name of column) {
      assert.ok(name.trim() === name && name.length > 0)
      const isCanonicalException = Object.values(table.canonicalNames || {}).flat().some(example => nameKey(example) === nameKey(name))
      assert.ok(isCanonicalException || !table.examples?.some(example => nameKey(example) === nameKey(name)))
      names++
    }
  }
  const rows = markdown.split(/\r?\n/).filter(line => line.startsWith('| ') && NAME_ROLLS.some(key => line.startsWith(`| ${key} |`)))
  for (let i = 0; i < 35; i++) {
    const expected = `| ${NAME_ROLLS[i]} | ${ROLL_WEIGHTS[i]}/256 | ${columns.map(column => column[i]).join(' | ')} |`
    assert.ok(rows.includes(expected), `${table.label}: markdown row ${i}`)
    for (const key of rowKeys(table, i)) {
      assert.ok(!occupied.has(key), `Duplicate ${key}: ${occupied.get(key)} / ${table.label}`)
      occupied.set(key, table.label)
    }
  }
  for (const name of Object.values(table.recommended || {}).flat()) {
    assert.ok((table.worldPool ? worldNameTable(table).names.includes(name) : columns.some(column => column.includes(name))), `Recommendation missing: ${name}`)
  }
  if (table.nameSources) for (const name of columns.flat()) {
    assert.ok(table.nameSources[name]?.source?.startsWith('https://'), `No attestation: ${name}`)
    assert.ok(table.nameSources[name].original)
  }
  // Exercise exhaustion with different random sequences, including distribution boundaries.
  for (const random of [() => 0, () => 0.999999, Math.random]) {
    const used = new Set()
    const seen = new Set()
    for (let i = 0; i < 35; i++) {
      const roll = drawNameRow({ ...table, worldPool: false }, used, random)
      assert.ok(roll)
      assert.ok(!seen.has(roll.index)); seen.add(roll.index)
      assert.equal([...roll.dice].sort().join(' '), NAME_ROLLS[roll.index])
      rowKeys(table, roll.index).forEach(key => used.add(key))
    }
    assert.equal(drawNameRow(table, used, random), null)
  }
}
const same = { names: Array(35).fill('Ён-Ра') }
assert.equal(drawNameRow(same, new Set(['енра'])), null)
const jabari = { m: Array(35).fill('Длинное имя (Короткое)'), f: Array(35).fill('Другое') }
assert.equal(drawNameRow(jabari, new Set(['короткое'])), null)
const used = new Set()
for (const table of tables) {
  for (let i = 0; i < 35; i++) {
    const roll = drawNameRow({ ...table, worldPool: false }, used)
    assert.ok(roll, `Cross-table exhaustion: ${table.label}`)
    rowKeys(table, roll.index).forEach(key => used.add(key))
  }
}
for (const table of RACE_NAME_GENERATORS.udrishi) {
  assert.equal(table.m.length, 35); assert.equal(table.f.length, 35)
  assert.ok(!table.names)
}
const chotgor = RACE_NAME_GENERATORS.chotgory[0]
const addressForms = ['Короткий жест', 'Звучный отклик', 'Перехват дыхания', 'Развёртывание', 'Две опоры']
for (const gender of ['m', 'f']) {
  assert.equal(chotgor.nameForms[gender].length, chotgor[gender].length)
  assert.ok(chotgor.nameForms[gender].every(form => addressForms.includes(form)))
  for (const form of addressForms) assert.equal(chotgor.nameForms[gender].filter(value => value === form).length, 7)
  assert.ok(chotgor[gender].some(name => !/[’']/.test(name)))
  assert.ok(chotgor[gender].some(name => /[’']/.test(name)))
}
assert.equal(chotgor.m[0], 'Тхуч')
assert.equal(chotgor.m.filter(name => nameKey(name) === nameKey('Тхуч')).length, 1)
assert.ok(!chotgor.f.some(name => nameKey(name) === nameKey('Тхуч')))
assert.deepEqual(chotgor.canonicalNames, { m: ['Тхуч'], f: [] })
const rejectedChotgorKeys = ['Нэйт', 'Нэсэль', 'Ируэль', 'Нувэль', 'Эй Лун', 'ЛэВи', 'Вэ Луна'].map(nameKey)
assert.deepEqual(chotgor.rejectedByAuthor.map(nameKey).sort(), [...rejectedChotgorKeys].sort())
for (const name of [...chotgor.m, ...chotgor.f]) assert.ok(!rejectedChotgorKeys.includes(nameKey(name)))
for (const name of RACE_NAME_GENERATORS.jabari[0].f) {
  assert.ok(!/ (Ветер|Ручей|Скала|Малахит|Гром|Озеро|Снег|Камень|Туман|Ливень|Обвал|Иней)-/.test(name))
}
const world = worldNameTable(RACE_NAME_GENERATORS.oyrdugi[0])
assert.ok(world.names.every(name => !rejectedChotgorKeys.includes(nameKey(name))))
assert.ok(world.names.length > 1500)
for (const table of tables) for (const name of (table.names || [...table.m, ...table.f])) assert.ok(world.names.includes(name))
assert.equal(LOST_VETU_KEYS.size, 9)
for (const prefix of VETU_NAME_PARTS.prefixes) for (const sign of VETU_NAME_PARTS.signs) assert.equal(world.names.some(name => nameKey(name) === nameKey(prefix + sign)), !isLostVetuName(prefix + sign))
const worldUsed = new Set()
for (let i = 0; i < world.names.length; i++) {
  const result = drawNameRow(world, worldUsed)
  assert.ok(result); assert.deepEqual(result.dice, [])
  rowKeys(world, result.index).forEach(key => { assert.ok(!worldUsed.has(key)); worldUsed.add(key) })
}
assert.equal(drawNameRow(world, worldUsed), null)
let extraNames = 0
for (const table of tables) {
  const addition = NAME_ENRICHMENT[table.label]
  if (!addition) continue
  assert.equal(addition.m.length, 4); assert.equal(addition.f.length, 4)
  const expanded = enrichedNameTable(table)
  assert.equal(expanded.m.length, 39); assert.equal(expanded.f.length, 39)
  assert.deepEqual(enrichedNameTable(expanded), expanded)
  for (let i = 35; i < 39; i++) for (const key of rowKeys(expanded, i)) {
    assert.ok(!occupied.has(key), `New name collision: ${key}`)
    occupied.set(key, table.label)
  }
  for (const name of [...addition.m, ...addition.f]) {
    assert.ok(world.names.includes(name), `Not in Oyrdug pool: ${name}`)
    assert.ok(!rejectedChotgorKeys.includes(nameKey(name)))
    assert.ok(!knowledge.profiles.some(p => p.canon?.some(n => nameKey(n) === nameKey(name))))
    if (table.label === 'Вирморождённые') assert.ok(!/[пбм]/i.test(name))
    extraNames++
  }
  for (const random of [() => 0, () => 0.999999]) {
    const used = new Set()
    for (let i = 0; i < 39; i++) {
      const result = drawNameRow(expanded, used, random)
      assert.ok(result)
      if (result.index >= 35) assert.deepEqual(result.dice, [])
      else assert.equal([...result.dice].sort().join(' '), NAME_ROLLS[result.index])
      rowKeys(expanded, result.index).forEach(key => { assert.ok(!used.has(key)); used.add(key) })
    }
    assert.equal(drawNameRow(expanded, used, random), null)
  }
  const guide = publicNamesForTable(expanded)
  assert.equal(guide.m.length + guide.f.length, 6)
  for (const gender of ['m', 'f']) for (const name of guide[gender]) assert.ok(expanded[gender].some(n => n === name || n.includes(`(${name})`)))
}
assert.equal(extraNames, 168)
for (const name of ['Бразан', 'Мак’а', 'Меток', 'Чулуга']) assert.ok(!world.names.some(n => nameKey(n) === nameKey(name)))
assert.equal(knowledge.profiles.length, 29)
assert.equal(knowledge.realNames.length, 101)
assert.ok(!knowledge.profiles.some(profile => ['meridir', 'ogre', 'dragons', 'colossus', 'vetu_exile'].includes(profile.id)))
for (const table of tables) assert.ok(profileForTable(table), `Missing site profile: ${table.label}`)
for (const slug of Object.keys(RACE_NAME_GENERATORS)) assert.ok(NAME_RACES.some(race => race.slug === slug))
for (const race of NAME_RACES) assert.ok(tablesForRace(race.slug).length)
assert.equal(evidenceForName('Тхуч').status, 'Подтверждено автором')
const published = JSON.parse(readFileSync(new URL('../public/name-library/names.json', import.meta.url), 'utf8'))
assert.deepEqual(published.tables, RACE_NAME_GENERATORS, 'Site download has stale name tables; run names:sync')
assert.deepEqual(published.additions, NAME_ENRICHMENT)
assert.deepEqual(published.profiles, knowledge.profiles)
assert.equal(published.vetuCycleRules.lost.entries.length, 9)
assert.deepEqual(published.vetuCycleRules.d13.entries.map(entry => nameKey(entry.value)), VETU_NAME_PARTS.prefixes.map(nameKey))
assert.deepEqual(published.vetuCycleRules.d4x4.entries.map(entry => nameKey(entry.value)), VETU_NAME_PARTS.signs.map(nameKey))
assert.deepEqual([...VETU_CYCLE_TABLE.rolls].sort(), [...NAME_ROLLS].sort())
for (const guide of NAME_GUIDES) {
  const article = readFileSync(new URL(`../content/lore/names/${guide.slug}.md`, import.meta.url), 'utf8')
  assert.ok(article.includes('status: published'))
  assert.ok(!/\]\(C:[^)]*\)/i.test(article), 'Local file link in published guide')
}
const cycleUsed = new Set()
assert.equal(VETU_CYCLE_TABLE.names.length, 455)
const cycleUniqueCount = new Set(VETU_CYCLE_TABLE.names.map(nameKey)).size
for (let i = 0; i < cycleUniqueCount; i++) {
  const result = drawNameRow(VETU_CYCLE_TABLE, cycleUsed)
  assert.ok(result)
  assert.ok(result.prefixRoll >= 1 && result.prefixRoll <= 13)
  assert.equal([...result.dice].sort().join(' '), VETU_CYCLE_TABLE.rolls[result.index % 35])
  rowKeys(VETU_CYCLE_TABLE, result.index).forEach(key => cycleUsed.add(key))
}
assert.equal(drawNameRow(VETU_CYCLE_TABLE, cycleUsed), null)
for (const path of ['../app/components/RaceNameGuide.vue', '../app/pages/lore/names/index.vue', '../app/pages/lore/names/[slug].vue']) {
  const result = parse(readFileSync(new URL(path, import.meta.url), 'utf8'))
  assert.deepEqual(result.errors, [])
  compileScript(result.descriptor, { id: 'name-library-audit' })
  assert.deepEqual(compileTemplate({ source: result.descriptor.template.content, filename: path, id: 'name-library-audit' }).errors, [])
}
const { descriptor, errors } = parse(readFileSync(new URL('../app/components/RaceNameGenerator.vue', import.meta.url), 'utf8'))
assert.deepEqual(errors, [])
compileScript(descriptor, { id: 'name-generator-audit' })
assert.deepEqual(compileTemplate({ source: descriptor.template.content, filename: 'RaceNameGenerator.vue', id: 'name-generator-audit' }).errors, [])
console.log(JSON.stringify({ status: 'passed', tables: tables.length, names, unique_keys: occupied.size, world_pool_names: world.names.length, draws_checked: tables.length * 35 * 4 + world.names.length + cycleUniqueCount, guides: NAME_GUIDES.length, profiles: knowledge.profiles.length, real_names: knowledge.realNames.length, dice_outcomes_checked: 256, vue_compiled: true }, null, 2))
