import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {DND55E_BACKGROUNDS as backgrounds} from '../../../app/data/dnd55e/backgrounds.js';
const root='proposals/enoa-backgrounds/unique-feats-v4';
const rows=JSON.parse(fs.readFileSync(root+'/catalog.json'));
const assignments=JSON.parse(fs.readFileSync(root+'/assignments.json'));
assert.deepEqual(rows.map(r=>r.backgroundId).sort(),backgrounds.map(b=>b.id).sort());
assert.equal(rows.length,56);assert.equal(assignments.length,56);
const all=rows.flatMap(r=>[r.origin,r.feat2014]);
assert.equal(new Set(all.map(f=>f.id)).size,112);
assert.equal(new Set(rows.map(r=>r.title)).size,56);
assert.equal(new Set(rows.map(r=>r.origin.benefits[0].text)).size,56);
for(const r of rows){
 assert.equal(r.origin.category,'origin');assert.equal(r.feat2014.category,'feat-2014');
 assert.deepEqual(r.origin.abilities,[]);assert.equal(r.feat2014.benefits[0].title,'Закалка опыта');
 assert(!/действи.{0,3} (Магия|Изучение|Использование|Влияние|Засада)/.test(r.feat2014.benefits.map(b=>b.text).join(' ')),r.backgroundId+': 2024 action leaked');
 assert.equal(r.scenarios.length,3);
 for(const f of [r.origin,r.feat2014]){
  assert.equal(f.status,'DRAFT');assert.equal(f.contentKind,'Homebrew');assert.equal(f.repeatable,false);
  for(const field of ['resource','controls','acquisition','playerReason'])assert(f[field]?.length>10,f.id+': '+field);
  assert(f.benefits.every(b=>b.title&&b.text));assert(f.comparators.length>=2);
 }
 if(['nagbo','norbu'].includes(r.backgroundId))for(const f of [r.origin,r.feat2014])assert.equal(f.requirement,'Вирморожденные');
 assert(!assignments.find(a=>a.backgroundId===r.backgroundId).apply);
 assert.equal(r.levels.find(l=>l.level===1).pb,2);assert.equal(r.levels.find(l=>l.level===20).pb,6);
}
const hashes=JSON.parse(fs.readFileSync(root+'/source-hashes.json'));
for(const [p,hash] of Object.entries(hashes))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'),hash,p+': live content changed');
const broken=[];
for(const p of ['README.md',...rows.map(r=>'cards/'+r.backgroundId+'.md')]){
 const full=path.join(root,p),text=fs.readFileSync(full,'utf8');
 for(const m of text.matchAll(/\]\(([^)]+)\)/g))if(!/^https?:/.test(m[1])&&!fs.existsSync(path.resolve(path.dirname(full),m[1])))broken.push([p,m[1]]);
}assert.deepEqual(broken,[]);
// Exact enumeration: reference examples, not execution of 112 feats in a combat engine.
let single=0,adv=0,bonusD4=0;
for(let a=1;a<=20;a++){
 if(a+5>=15)single++;
 for(let b=1;b<=20;b++)if(Math.max(a,b)+5>=15)adv++;
 for(let d=1;d<=4;d++)if(a+5+d>=15)bonusD4++;
}
assert.equal(single/20,.55);assert.equal(adv/400,.7975);assert.equal(bonusD4/80,.675);
const result={date:'2026-10-28',status:'STRUCTURE_PASS',concepts:56,versions:112,individualCards:56,sourceFilesUnchanged:Object.keys(hashes).length,assignmentsApplied:0,uniqueTitles:56,uniqueCoreTexts:56,semanticPlaytest:false,review:'REVISION_REQUIRED: individual numeric review and human playtest remain',referenceMath:{dc:15,modifier:5,ordinary:single/20,advantage:adv/400,plusD4:bonusD4/80,level20ReductionD6PlusPB:{perUse:9.5,pbUses:6,maximumExpectedTotal:57,condition:'Only if all six applicable reactions are actually used; before resistance.'}}};
fs.writeFileSync(root+'/verification.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
