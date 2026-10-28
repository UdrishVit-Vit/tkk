import fs from 'node:fs';
import assert from 'node:assert/strict';
import {DND55E_HOMEBREW_ORIGIN_FEATS as feats} from '../app/data/dnd55e/origin-feats-homebrew.js';
import {ENOA_AUTHORED_FEATS_2014_V4 as legacy} from '../app/data/enoa-authored-feats-v4.js';
import {cores,secondaries} from '../reports/enoa-backgrounds/clarity-edits.mjs';
const root='reports/enoa-backgrounds/clarity-review';
const previous=await import('../'+root+'/before.js');
const prior=previous.ENOA_AUTHORED_ORIGINS_V4;
assert.equal(feats.length,55);
for(const f of feats){
 assert(!f.benefits.some(b=>b.title==='Опыт прошлого'),f.id);
 if(f.version==='0.4.3'){
  assert(!f.benefits.some(b=>b.text.includes('Если приём готовит эффект на будущее')),f.id);
  const old=prior.find(x=>x.id===f.id);assert(old);
  for(const k of ['id','title','category','requirement','abilities','relatedBackgrounds','repeatable'])assert.deepEqual(f[k],old[k],f.id+': '+k);
  assert.deepEqual(f.balance.usesAtLevels,old.balance.usesAtLevels,f.id+': resource budget');
  const f14=legacy.find(x=>x.relatedBackgrounds.includes(f.relatedBackgrounds[0]));
  assert.deepEqual(f14.benefits[0],previous.ENOA_AUTHORED_FEATS_2014_V4.find(x=>x.id===f14.id).benefits[0]);
  assert(!/действием (?:Магия|Изучение|Использование|Поиск)/i.test(f14.benefits.join(' ')),f14.id);
 }
}
assert.deepEqual(feats.find(f=>f.id==='enoa-bone-seer-origin'),prior.find(f=>f.id==='enoa-bone-seer-origin'));
const review=JSON.parse(fs.readFileSync(root+'/review.json'));
review.find(r=>r.id==='blind-bunti').primary='Уточнена активация бонусным действием; обычное запоминание входов удалено.';
fs.writeFileSync(root+'/review.json',JSON.stringify(review,null,2)+'\n');
const result={status:'PASS',reviewed:feats.length,rewritten:feats.filter(f=>f.version==='0.4.3').length,removedSecondary:review.filter(r=>r.removedSecondary).length,retainedNamedSecondary:Object.keys(secondaries).length,individualCoreEdits:Object.keys(cores).length,originPastHeadings:0,unchangedResourceBudgets:true,playtest:false};
fs.writeFileSync(root+'/verification.json',JSON.stringify(result,null,2)+'\n');
const card=f=>`## ${f.title}\n\n${f.summary}\n\n${f.benefits.map(b=>`**${b.title}.** ${b.text}`).join('\n\n')}`;
fs.writeFileSync(root+'/current-2024.md','# Черты происхождения Эноа — действующая редакция после проверки\n\n55 черт. Игровой плейтест не проводился; это действующий текст сайта в локальном проекте.\n\n'+feats.map(card).join('\n\n')+'\n');
console.log(JSON.stringify(result));
