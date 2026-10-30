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
  ['unpublished-feat', d => d.feats.push({...structuredClone(d.homebrew[0]),id:'test-unpublished-origin',status:'Draft'})],
  ['coins-display', d => { d.backgrounds[0].equipment.coins = '0 зм' }],
  ['proposal-reference', d => d.proposals[d.backgrounds[0].id].push('missing')],
  ['equipment-forbidden', d => { d.backgrounds[0].equipment.items[0].id = 'weapon-lance' }]
]
for (const [code, mutate] of cases) {
  const data = structuredClone(currentData)
  // Generic invalid-price cases require a fully priced record, not M’lah's pending kit.
  data.backgrounds.sort((a,b)=>Number(a.equipment.pricingStatus==='pending')-Number(b.equipment.pricingStatus==='pending'))
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
// Explicit author removal; keep the original snapshot as historical evidence.
const removedBackgrounds = new Set(['acolyte','artisan','charlatan','criminal','entertainer','farmer','guard','guide','hermit','merchant','noble','sage','sailor','scribe','soldier','wayfarer','nameless','lifestone-wright','knot-scribe','sarban-drover'])
assert.equal(currentData.backgrounds.length,54)
assert.ok(currentData.backgrounds.every(b => b.group==='enoa'&&!removedBackgrounds.has(b.id)))
assert.equal(currentData.backgrounds.find(b=>b.id==='hakar').title,'Хакар')
assert.ok(currentData.feats.some(f=>f.id==='nameless'))
// The author requested unique V4 assignments for all active backgrounds.
assert.equal(new Set(currentData.backgrounds.map(b=>b.feat.id)).size,54)
assert.deepEqual(currentData.feats.find(f=>f.id==='enoa-knot-memory').relatedBackgrounds,[])
for(const b of currentData.backgrounds){
  const f=currentData.feats.find(f=>f.id===b.feat.id)
  assert.ok(f&&f.source==='TVV'&&f.category==='origin'&&f.status==='Approved',b.id)
  assert.equal(f.title,b.feat.title)
  assert.deepEqual(f.relatedBackgrounds,[b.id])
}
const renegade = currentData.backgrounds.find(b => b.id === 'cohort-renegade')
assert.deepEqual(renegade.feat, {id:'enoa-cohort-renegade-origin', title:'Всегда есть выход'})
assert.ok(currentData.feats.some(f => f.id === renegade.feat.id && f.status === 'Approved' && f.version === '0.4.0'))
assert.deepEqual(renegade.equipment.items.map(i => i.id), before.backgrounds.find(b => b.id === renegade.id).equipment.items.map(i => i.id))
assert.equal(renegade.equipment.coinsCp, 1950)
const diver = currentData.backgrounds.find(b => b.id === 'mlah-diver')
assert.deepEqual(diver.skills, ['Атлетика', 'Природа'])
assert.equal(diver.feat.title, 'Выучка глубин')
assert.equal(diver.equipment.items.find(i => i.id === 'gear-dulur').quantity, 4)
assert.equal(diver.equipment.coinsCp, null)
assert.ok(currentData.feats.some(f => f.id === diver.feat.id && f.status === 'Approved'))
assert.ok(validateBackgrounds({...currentData, backgrounds: currentData.backgrounds.map(b => b.id === diver.id ? {...b, equipment:{...b.equipment, coins:'10 зм', coinsCp:1000}} : b)}).some(e => e.code === 'coins'))
console.log(`${cases.length} rejection cases passed; publication gate and published mechanics preserved.`)
