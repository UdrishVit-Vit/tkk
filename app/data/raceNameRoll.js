import { NAME_ROLLS, RACE_NAME_GENERATORS, VETU_NAME_PARTS } from './raceNameGenerators.js'
import vetuCycleRules from './vetuCycleNames.json' with { type: 'json' }

export const nameKey = name => name.normalize('NFKC').toLowerCase().replaceAll('ё', 'е').replace(/[^\p{L}\p{N}]/gu, '')
export const LOST_VETU_KEYS = new Set(vetuCycleRules.lost.entries.map(entry => nameKey(
  vetuCycleRules.d13.entries.find(prefix => prefix.roll === entry.d13).value
  + vetuCycleRules.d4x4.entries.find(sign => sign.roll === entry.roll).value
)))
export const isLostVetuName = name => LOST_VETU_KEYS.has(nameKey(name))
export function rowKeys(table, index) {
  const names = table.names ? [table.names[index]] : [table.m[index], table.f[index]]
  return names.flatMap(name => [nameKey(name), ...(name.match(/\(([^)]+)\)/) ? [nameKey(name.match(/\(([^)]+)\)/)[1])] : [])])
}
const factorial = n => n < 2 ? 1 : n * factorial(n - 1)
export const ROLL_WEIGHTS = NAME_ROLLS.map(roll => {
  const counts = Object.values(roll.split(' ').reduce((acc, n) => { acc[n] = (acc[n] || 0) + 1; return acc }, {}))
  return 24 / counts.reduce((product, n) => product * factorial(n), 1)
})
export const availableRows = (table, used) => Array.from({ length: (table.names || table.m).length }, (_, index) => index).filter(index => rowKeys(table, index).every(key => !used.has(key)))

// Oyrdug is compatible with every racial origin; examples are not its own ethnic pool.
export function worldNameTable(table) {
  if (!table.worldPool) return table
  const seen = new Set()
  const names = []
  const add = name => {
    const keys = rowKeys({ names: [name] }, 0)
    if (keys.some(key => seen.has(key))) return
    keys.forEach(key => seen.add(key))
    names.push(name)
  }
  Object.values(RACE_NAME_GENERATORS).flat().forEach(t => (t.names || [...t.m, ...t.f]).forEach(add))
  VETU_NAME_PARTS.prefixes.forEach(prefix => VETU_NAME_PARTS.signs.forEach(sign => {
    if (!isLostVetuName(prefix + sign)) add(prefix + sign)
  }))
  return { ...table, names, recommended: table.recommended }
}

// Condition the original 4d4 distribution on rows whose names have not been shown.
export function drawNameRow(table, used, random = Math.random) {
  const available = availableRows(table, used)
  if (!available.length) return null
  const weight = index => table.worldPool ? 1 : ROLL_WEIGHTS[table.cyclePool ? NAME_ROLLS.indexOf(table.rolls[index % NAME_ROLLS.length]) : index]
  let remaining = random() * available.reduce((total, index) => total + weight(index), 0)
  const index = available.find(index => (remaining -= weight(index)) < 0) ?? available.at(-1)
  if (table.worldPool) return { index, dice: [], sorted: [] }
  const sorted = (table.cyclePool ? table.rolls[index % NAME_ROLLS.length] : NAME_ROLLS[index]).split(' ').map(Number)
  const dice = [...sorted]
  for (let i = dice.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[dice[i], dice[j]] = [dice[j], dice[i]]
  }
  return { index, sorted, dice, ...(table.cyclePool ? { prefixRoll: Math.floor(index / NAME_ROLLS.length) + 1 } : {}) }
}
