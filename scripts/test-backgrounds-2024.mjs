import assert from 'node:assert/strict'
import fs from 'node:fs'
import { currentData } from './check-backgrounds-2024.mjs'
import { validateBackgrounds } from './lib/validate-backgrounds-2024.mjs'
import { isPublishableHomebrew } from '../app/data/dnd55e/origin-feats-homebrew.js'
const cases = [
  ['id-missing', d => { d.backgrounds[0].id = '' }],
  ['id-duplicate', d => d.backgrounds.push(structuredClone(d.backgrounds[0]))],
  ['description', d => { d.backgrounds[0].enoaLead = [] }],
  ['feat-missing', d => { d.backgrounds[0].feat = null }],
  ['feat-unresolved', d => { d.backgrounds[0].feat.id = 'missing' }],
  ['feat-category', d => { d.feats.find(f => f.id === d.backgrounds[0].feat.id).category = 'general' }],
  ['abilities-count', d => d.backgrounds[0].abilities.pop()],
  ['abilities-duplicate', d => { d.backgrounds[0].abilities[1] = d.backgrounds[0].abilities[0] }],
  ['skills-count', d => d.backgrounds[0].skills.pop()],
  ['skills-duplicate', d => { d.backgrounds[0].skills[1] = d.backgrounds[0].skills[0] }],
  ['tool', d => { d.backgrounds[0].tool = 'Нет такого инструмента' }],
  ['alternative', d => { d.backgrounds[0].equipment.alt = '100 зм' }],
  ['equipment-total', d => d.backgrounds[0].equipment.coinsCp++],
  ['equipment-catalog-price', d => { d.backgrounds[0].equipment.items[0].unitCostCp--; d.backgrounds[0].equipment.coinsCp++ }],
  ['homebrew-field', d => { delete d.homebrew[0].action }],
  ['unpublished-feat', d => d.feats.push(d.homebrew.find(f => f.status !== 'Approved'))],
  ['coins-display', d => { d.backgrounds[0].equipment.coins = '0 зм' }],
  ['proposal-reference', d => d.proposals['knot-scribe'].push('missing')],
  ['equipment-forbidden', d => { d.backgrounds[0].equipment.items[0].id = 'weapon-lance' }]
]
for (const [code, mutate] of cases) {
  const data = structuredClone(currentData)
  const before = validateBackgrounds(data).filter(e => e.code === code).length
  mutate(data)
  assert.ok(validateBackgrounds(data).filter(e => e.code === code).length > before, code)
}
for (const status of ['Draft', 'Testing', 'Playtest', 'Legacy', undefined]) assert.equal(isPublishableHomebrew({contentKind:'Homebrew',status}), false)
assert.equal(isPublishableHomebrew({contentKind:'Homebrew',status:'Approved'}), true)
const before = JSON.parse(fs.readFileSync('docs/backgrounds-2024/before.json'))
for (const f of before.linkedFeats) {
  const after = currentData.feats.find(x => x.id === f.id)
  for (const key of ['benefits', 'requirement', 'category', 'repeatable']) assert.deepEqual(after[key], f[key], `${f.id}.${key} changed`)
}
for (const b of before.backgrounds.filter(b => b.id !== 'mlah-diver')) assert.deepEqual(currentData.backgrounds.find(x => x.id === b.id).feat, b.feat, `${b.id}: published feat changed`)
const diver = currentData.backgrounds.find(b => b.id === 'mlah-diver')
assert.deepEqual(diver.skills, ['Атлетика', 'Природа'])
assert.equal(diver.feat.title, 'Выучка глубин')
assert.equal(diver.equipment.items.find(i => i.id === 'gear-dulur').quantity, 4)
assert.equal(diver.equipment.coinsCp, null)
assert.ok(currentData.feats.some(f => f.id === diver.feat.id && f.status === 'Approved'))
assert.ok(validateBackgrounds({...currentData, backgrounds: currentData.backgrounds.map(b => b.id === diver.id ? {...b, equipment:{...b.equipment, coins:'10 зм', coinsCp:1000}} : b)}).some(e => e.code === 'coins'))
console.log(`${cases.length} rejection cases passed; publication gate and published mechanics preserved.`)
