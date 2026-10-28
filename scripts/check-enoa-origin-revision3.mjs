import assert from 'node:assert/strict'
import fs from 'node:fs'
import { ENOA_ORIGIN_DRAFTS as feats } from '../app/data/dnd55e/origin-feats-enoa-drafts.js'
import { DND55E_FEATS as published } from '../app/data/dnd55e/feats.js'
import { isPublishableHomebrew } from '../app/data/dnd55e/origin-feats-homebrew.js'
const root='docs/backgrounds-2024/revision-3/'
const review=JSON.parse(fs.readFileSync(root+'review-data.json','utf8'))
const old=JSON.parse(fs.readFileSync(root+'before.json','utf8'))
const math=JSON.parse(fs.readFileSync(root+'math.json','utf8'))
assert.equal(feats.length,57)
assert.equal(review.length,57)
for(const f of feats){
 const full=review.find(x=>x.id===f.id)
 assert.deepEqual(full.benefits,f.benefits,f.id+': report drift')
 assert.equal(old.find(x=>x.relatedBackgrounds[0]===f.relatedBackgrounds[0]).id,f.id)
 assert.equal(f.category,'origin')
 assert.equal(f.repeatable,false)
 assert.equal(f.requirement,null)
 assert.deepEqual(f.abilities,[])
 assert.ok(['Draft','Playtest'].includes(f.status))
 assert.equal(isPublishableHomebrew(f),false)
 if(['enoa-mlah-diver-origin', 'enoa-cohort-renegade-origin'].includes(f.id)) assert.ok(published.some(x=>x.id===f.id && x.version==='0.4.0' && x.status==='Approved'))
 else assert.ok(!published.some(x=>x.id===f.id && x.version===f.version),'Archived revision 3 must not be published as the current version')
 assert.equal(full.design.concepts.length,3)
 assert.equal(new Set(full.design.concepts.map(x=>x.effect)).size,3)
 for(const c of full.design.concepts)for(const k of ['title','origin','effect','activation','frequency','application','risk'])assert.ok(c[k],f.id+': '+k)
 assert.equal(full.design.scenarios.length,5)
 for(const s of full.design.scenarios)for(const k of ['circumstances','decision','rule','result','issue'])assert.ok(s[k],f.id+': '+k)
 assert.deepEqual(full.design.levels.map(x=>x.level),[1,5,11,17])
 assert.equal(Object.keys(f.balance.ratings).length,10)
 assert.equal(f.balance.score,Object.values(f.balance.ratings).reduce((a,b)=>a+b,0))
 const words=f.summary.split(/\s+/u).length
 assert.ok(words>=20&&words<=50,f.id+': description length')
 assert.ok(fs.existsSync(root+'feats/'+f.relatedBackgrounds[0]+'.md'))
}
assert.equal(math.probability.length,72)
const base=math.probability.find(x=>x.level===1&&!x.expertise&&x.mode==='normal'&&x.dc===15)
assert.equal(base.base,.55)
assert.equal(base.plusD4,.675)
assert.equal(base.rerollOneOnFailure,.7975)
for(const p of math.probability){assert.ok(p.plusD4>=p.base);assert.ok(p.rerollOneOnFailure>=p.base);assert.ok(p.plusD4<=1&&p.rerollOneOnFailure<=1)}
assert.equal(math.attackPenalty.find(x=>x.ac===16).after,.375)
for(const status of ['Draft','Playtest'])assert.equal(isPublishableHomebrew({contentKind:'Homebrew',status}),false)
console.log('57 dossiers: 171 concepts, 285 scenarios, 228 level analyses; 72 probability cases and publication exclusion passed.')
