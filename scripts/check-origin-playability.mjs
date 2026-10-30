import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {designs,retained} from '../reports/enoa-backgrounds/playability-review/designs.mjs';
import {expected,loreOverrides} from '../reports/enoa-backgrounds/playability-review/qa-notes.mjs';
import {DND55E_HOMEBREW_ORIGIN_FEATS as activeFeats} from '../app/data/dnd55e/origin-feats-homebrew.js';
import {DND55E_BACKGROUNDS as backgrounds} from '../app/data/dnd55e/backgrounds.js';
import {ENOA_AUTHORED_FEATS_2014_V4 as legacy} from '../app/data/enoa-authored-feats-v4.js';
const root='reports/enoa-backgrounds/playability-review';
const before=JSON.parse(fs.readFileSync(root+'/active-before.json','utf8'));
// This dated review protects its original 55 entries. Later additions have dedicated checks.
const feats=activeFeats.filter(f=>before.some(old=>old.id===f.id));
const oldModule=await import('../'+root+'/before.js');
const snapshot=fs.readFileSync(root+'/backgrounds.before.js','utf8');
const marker='export const DND55E_BACKGROUNDS = ';
const oldBackgrounds=JSON.parse(snapshot.slice(snapshot.indexOf(marker)+marker.length,snapshot.indexOf('\n\nexport const DND55E_BACKGROUND_FEATS')).trim());
const proposal=JSON.parse(fs.readFileSync('proposals/enoa-backgrounds/unique-feats-v4/catalog.json','utf8'));
assert.equal(feats.length,55);assert.equal(legacy.length,55);
assert.equal(new Set(feats.map(f=>f.id)).size,55);
assert.deepEqual(feats.map(f=>f.id),before.map(f=>f.id),'stable IDs and ordering');
for(const f of feats){
 const id=f.relatedBackgrounds[0],old=before.find(x=>x.id===f.id),d=designs.find(x=>x.id===id);
 for(const k of ['id','category','source','contentKind','requirement','repeatable','abilities','relatedBackgrounds']) assert.deepEqual(f[k],old[k],f.id+': protected '+k);
 assert.equal(expected[id]?.length,3,id+': three individually reviewed scenarios');
 assert(!f.benefits.some(b=>b.title==='Опыт прошлого'),id);
 if(retained[id])assert.deepEqual(f,old,id+': retained feat changed');
 else{
  assert(d,id);assert.equal(f.version,'0.5.0');assert.equal(f.title,d.title);
  assert.notDeepEqual(f.benefits,old.benefits,id+': requires substantive edit');
  assert(!/Действием Использование попытайтесь извлечь|Когда видимое существо в пределах 30 футов успешно скрывается|Перед попыткой освободиться вы можете использовать эту черту, если/.test(JSON.stringify(f)),id+': obsolete trigger');
  assert.deepEqual(f.balance.usesAtLevels,d.model==='LONG1'?[1,1,1,1]:[2,3,4,6],id+': resource metadata');
  assert.equal(f.balance.playtest,false);
  const f14=legacy.find(x=>x.relatedBackgrounds[0]===id),old14=oldModule.ENOA_AUTHORED_FEATS_2014_V4.find(x=>x.id===f14.id);
  assert.equal(f14.version,'0.5.0');assert.equal(f14.title,f.title);
  for(const k of ['id','requirement','abilities','minLevel','repeatable','relatedBackgrounds'])assert.deepEqual(f14[k],old14[k],f14.id+': protected '+k);
  assert.equal(f14.benefits[0],old14.benefits[0],f14.id+': ASI');
  assert(f14.intro.includes('Предыстория 2014 не выдаёт её автоматически'));
  assert(!/действие[м]? (?:Магия|Изучение|Поиск|Использование(?! предмета))|Долгого отдыха|Героическое вдохновение/iu.test(f14.benefits.join(' ')),f14.id+': edition leak');
 }
 const bg=backgrounds.find(b=>b.id===id),oldBg=oldBackgrounds.find(b=>b.id===id);
 assert.equal(bg.feat.id,f.id);assert.equal(bg.feat.title,f.title);
 const withoutFeat=({feat,...rest})=>rest;
 assert.deepEqual(withoutFeat(bg),withoutFeat(oldBg),id+': background scope');
}
assert.equal(designs.length,48);assert.equal(Object.keys(retained).length,7);
assert(feats.find(f=>f.relatedBackgrounds[0]==='silk-mouse-catcher').benefits[0].text.includes('скорость лазания'));
assert(feats.find(f=>f.relatedBackgrounds[0]==='blue-blooded').benefits.some(b=>b.text.includes('в состоянии Недееспособный')),'death-save exception');
assert(feats.find(f=>f.relatedBackgrounds[0]==='urdreg-hunter').benefits[0].text.includes('В течение 1 минуты'),'bounded pursuit');

// Mathematical reference checks. These are explicit models, not a character engine.
const rolls=Array.from({length:20},(_,i)=>i+1);
const success=(roll,mod,dc)=>roll+mod>=dc;
const probability=(mod,dc)=>rolls.filter(r=>success(r,mod,dc)).length/20;
const withDie=(mod,dc,sides)=>rolls.reduce((n,r)=>n+Array.from({length:sides},(_,i)=>i+1).filter(d=>success(r+d,mod,dc)).length,0)/(20*sides);
const withFloor=(mod,dc)=>rolls.filter(r=>success(Math.max(r,10),mod,dc)).length/20;
assert.equal(probability(2,15),0.4);
assert.equal(withDie(2,15,6),0.575);
assert.equal(withFloor(5,15),1);
const chooseAfterReplacement=(pair,index,value,advantage)=>{
 const next=[...pair];next[index]=value;return advantage?Math.max(...next):Math.min(...next);
};
assert.equal(chooseAfterReplacement([1,8],0,10,false),8,'replace only one d20; disadvantage still applies');
assert.equal(chooseAfterReplacement([2,3],0,10,true),10,'choose result again after replacement');
const damageAfter=(damage,die,pb,resistance=false)=>Math.floor(Math.max(0,damage-die-pb)/(resistance?2:1));
assert.equal(damageAfter(10,4,2,true),2,'reduce before resistance');
assert.equal(damageAfter(3,6,2),0,'no negative damage');
const temp=(current,incoming)=>Math.max(current,incoming);
assert.equal(temp(8,5),8);assert.equal(temp(8,9),9,'temporary HP never add');
const maxMove=(speed,budget,extraCost=1)=>speed<=0?0:Math.floor(Math.min(speed,budget)/extraCost);
assert.equal(maxMove(30,10,2),5,'difficult terrain consumes the granted movement budget');
assert.equal(maxMove(0,10),0);assert.equal(maxMove(5,10),5);
const death=(r)=>r===1?{fails:2,successes:0,hp:0}:r===20?{fails:0,successes:0,hp:1}:r<10?{fails:1,successes:0,hp:0}:{fails:0,successes:1,hp:0};
assert.deepEqual(death(20),{fails:0,successes:0,hp:1});
// A reroll replaces the first result; it does not add the failed result first.
assert.equal(death(1).fails,2);assert.equal(death(12).fails,0);
const rerollIds=['great-game-player','word-preacher','elixir-warden','ilbesh-marked','dangun-secret','promised-to-ibon','servant-of-the-meridirs','blue-blooded'];
for(const id of rerollIds)assert(feats.find(f=>f.relatedBackgrounds[0]===id).benefits.some(b=>b.text.includes('перебрасывается только один к20')),id+': one die under advantage/disadvantage');
const reactionPool={available:true,uses:2};
const consume=()=>{if(!reactionPool.available||reactionPool.uses<1)return false;reactionPool.available=false;reactionPool.uses--;return true;};
assert(consume());assert(!consume());assert.equal(reactionPool.uses,1,'cannot spend two reactions');
reactionPool.available=true;assert(consume());reactionPool.available=true;assert(!consume());

const math=[1,4,5,11,20].map(level=>{
 const pb=Math.ceil(level/4)+1;
 return {level,pb,pbResource2024:pb,pbResource2014:2,meanD6Reduction:3.5+pb,meanD6HPPerRecipient:3.5+pb,maxGroupRecipients:pb,meanOnceRestGroupHP:pb*(3.5+pb)};
});
const model={base40percent:0.4,withD4:withDie(2,15,4),withD6:withDie(2,15,6),advantage:1-(1-0.4)**2,rerollFailed:0.4+0.6*0.4,floor10Mod5DC15:withFloor(5,15),levels:math,note:'К6 в среднем 3.5; численная модель не оценивает частоту ситуаций и расход реакций. Равная вероятность отдельного броска не означает равную ценность запаса.'};
fs.writeFileSync(root+'/math.json',JSON.stringify(model,null,2)+'\n');

const ledger=feats.map(f=>{
 const id=f.relatedBackgrounds[0],d=designs.find(x=>x.id===id),keep=retained[id],old=before.find(x=>x.id===f.id),bg=backgrounds.find(x=>x.id===id),p=proposal.find(x=>x.backgroundId===id);
 return {id,background:bg.title,featId:f.id,title:f.title,previousTitle:old.title,decision:d?'REWORK':'KEEP',problem:d?.problem||keep.reason,promise:d?.promise||keep.reason,comparators:d?.comparison||keep.comparison,risk:d?.risk||keep.risk,
  canon:{state:loreOverrides[id]?'SEE_AUTHOR_DECISION':'SOURCE_ATTESTED_OR_AUTHOR_DRAFT',basis:loreOverrides[id]||p?.origin?.lore?.basis||'См. индивидуальный аудит.',interpretation:'Механика — PROPOSAL / homebrew для героя. Существующая профессия в карточке не считается заново утверждённым каноном. Не вводятся общие обряды, законы или божественные полномочия.'},
  scenarios:(d?.scenes||keep.scenes).map((scene,i)=>({scene,expected:expected[id][i],status:'DESK_REVIEWED_NOT_PLAYTESTED'})),
  resourceBefore:old.balance.usesAtLevels,resourceAfter:f.balance.usesAtLevels,resourceChanged:JSON.stringify(old.balance.usesAtLevels)!==JSON.stringify(f.balance.usesAtLevels),
  acceptance:'APPROVED_DRAFT_FOR_LOCAL_REVIEW',playtest:false};
});
fs.writeFileSync(root+'/review.json',JSON.stringify(ledger,null,2)+'\n');
const header='# Черты происхождения Эноа — игровая применимость\n\n29.10.2026. Проверена группа из 55 черт на эту дату; 48 переработаны, 7 сохранены. Позднейшие добавления проверяются отдельно. Это авторские правила, а не официальные черты D&D. Игровые сессии по новой редакции ещё не проводились.\n\n';
fs.writeFileSync(root+'/current-2024.md',header+feats.map(f=>{
 const r=ledger.find(x=>x.featId===f.id);return `## ${r.background} — ${f.title}\n\n${f.summary}\n\n**Для игры:** ${designs.find(d=>d.id===r.id)?.promise||retained[r.id].reason}\n\n${f.benefits.map(b=>`**${b.title}.** ${b.text}`).join('\n\n')}\n\n**Примеры:** ${r.scenarios.map(s=>s.scene).join(' ')}`;
}).join('\n\n')+'\n');
fs.writeFileSync(root+'/current-2014.md','# Отдельные черты Эноа — 2014\n\n29.10.2026. Не выдаются автоматически предысторией. +1 характеристики сохранён; у переработанных ограниченных приёмов вместо PB два применения, разовые остаются разовыми. Полная сверка платных текстов PHB 2014 и плейтест не заявляются.\n\n'+legacy.map(f=>`## ${f.title}\n\n${f.intro}\n\n${f.benefits.join('\n\n')}`).join('\n\n')+'\n');
fs.writeFileSync(root+'/individual-review.md','# Индивидуальные решения и сценарии\n\n29.10.2026. Кабинетная проверка 165 сценариев; это не протокол сыгранных сессий. Оценка игровых частот предварительная.\n\n'+ledger.map(r=>`## ${r.background} — ${r.title}\n\n**Решение:** ${r.decision}. ${r.problem}\n\n**Обещание игроку:** ${r.promise}\n\n**Аналоги 2024:** ${r.comparators}. Это сравнение областей пользы, а не заявление о равной силе.\n\n**Риск:** ${r.risk}\n\n**Ресурс на уровнях 1/5/11/20:** ${r.resourceBefore.join('/')} → ${r.resourceAfter.join('/')}.\n\n**Лорная опора:** ${r.canon.basis}\n\n${r.canon.interpretation}\n\n${r.scenarios.map((s,i)=>`${i+1}. ${s.scene} ${s.expected}`).join('\n\n')}\n\n[Исходный аудит предыстории](../../../audit/enoa-backgrounds/2024-${r.id}.md)`).join('\n\n')+'\n');
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const result={status:'PASS',date:'2026-10-29',reviewed:55,rewritten:48,retained:7,mirrored2014:48,scenariosDeskReviewed:165,playedScenarios:0,resourceBudgetsChanged:ledger.filter(r=>r.resourceChanged).map(r=>r.id),titleChanges:ledger.filter(r=>r.previousTitle!==r.title).map(r=>({id:r.id,from:r.previousTitle,to:r.title})),protectedBackgroundFields:'unchanged',protectedFeatIds:'unchanged',automatic2014Grant:false,mathematicalModels:'PASS; explicit reference assumptions',playtest:false,remoteDeployment:false,hashes:Object.fromEntries(['app/data/enoa-authored-feats-v4.js','app/data/dnd55e/backgrounds.js'].map(p=>[p,sha(p)]))};
fs.writeFileSync(root+'/verification.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
