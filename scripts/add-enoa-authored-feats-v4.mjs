// One-time import of the concrete V4 collection requested by the author in chat.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const target='app/data/enoa-authored-feats-v4.js';
assert(!fs.existsSync(target),'Already imported; do not overwrite reviewed production data.');
const rows=JSON.parse(fs.readFileSync('proposals/enoa-backgrounds/unique-feats-v4/catalog.json'));
assert.equal(rows.length,56);
const origins=[],legacy=[];
const benefits=f=>[...f.benefits,{title:'Использование и восстановление',text:f.resource+(f.preparation==='Не применяется.'?'':' '+f.preparation)},{title:'Условия',text:f.controls+(f.spellNote==='Не применяется.'?'':' '+f.spellNote)}];
for(const r of rows){
 const f=r.origin;
 if(!['mlah-diver','cohort-renegade'].includes(r.backgroundId))origins.push({
  id:f.id,title:f.title,originalName:'',category:'origin',categoryTitle:'Черта происхождения',source:'TVV',sourceTitle:'Эноа',contentKind:'Homebrew',status:'Approved',version:'0.4.1',
  approvalNote:'Автор запросил добавление подготовленного комплекта V4 в чате. Допуск к каталогу не означает подтверждённый игровыми сессиями баланс.',
  requirement:f.requirement,repeatable:false,abilities:[],relatedBackgrounds:[r.backgroundId],summary:f.flavour,
  action:f.benefits[0].text,conditions:'Триггер, действие, цели и ограничения указаны в эффектах.',uses:f.resource,recovery:'Применения восстанавливаются по окончании продолжительного отдыха; постоянные свойства не требуют восстановления.',benefits:benefits(f),
  balance:{comparator:f.comparators.join('; '),concern:f.review.risk,usesAtLevels:r.levels.filter(l=>[1,5,11,20].includes(l.level)).map(l=>l.uses2024),playtest:false}
 });
 const g=r.feat2014;
 legacy.push({id:g.id,title:g.title,source:'TVV',sourceTitle:'Эноа',edition:'2014',category:'feat-2014',contentKind:'Homebrew',status:'Approved',version:'0.4.1',repeatable:false,minLevel:null,abilities:g.abilities,requirement:g.requirement,relatedBackgrounds:[r.backgroundId],intro:g.flavour+'\n\n'+g.acquisition,benefits:benefits(g).map(b=>`**${b.title}.** ${b.text}`),balance:{comparator:g.comparators.join('; '),concern:g.review.risk,playtest:false}});
}
fs.mkdirSync('reports/enoa-backgrounds/batch-02',{recursive:true});
for(const p of ['app/data/dnd55e/backgrounds.js','app/data/dnd55e/origin-feats-homebrew.js','app/data/feats5e.js'])fs.copyFileSync(p,'reports/enoa-backgrounds/batch-02/'+p.split('/').at(-1)+'.before');
fs.writeFileSync(target,'// Author requested adding the reviewed V4 proposal collection, 2026-10-28.\n// Numeric design remains homebrew; no live playtest is claimed.\nexport const ENOA_AUTHORED_ORIGINS_V4 = '+JSON.stringify(origins,null,2)+'\n\nexport const ENOA_AUTHORED_FEATS_2014_V4 = '+JSON.stringify(legacy,null,2)+'\n');
const file='app/data/dnd55e/backgrounds.js';let text=fs.readFileSync(file,'utf8');
const marker='export const DND55E_BACKGROUNDS = ',start=text.indexOf(marker)+marker.length,end=text.indexOf('\n\nexport const DND55E_BACKGROUND_FEATS');
const backgrounds=JSON.parse(text.slice(start,end).trim());
assert.deepEqual(backgrounds.map(b=>b.id).sort(),rows.map(r=>r.backgroundId).sort());
for(const b of backgrounds){const r=rows.find(r=>r.backgroundId===b.id);b.feat={id:r.origin.id,title:r.title};}
fs.writeFileSync(file,text.slice(0,start)+JSON.stringify(backgrounds,null,2)+text.slice(end));
console.log('Imported 54 new origins + retained 2 approved originals; 56 separate 2014 feats.');
