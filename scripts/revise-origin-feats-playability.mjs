import fs from 'node:fs';
import assert from 'node:assert/strict';
import {designs,retained} from '../reports/enoa-backgrounds/playability-review/designs.mjs';
import {DND55E_HOMEBREW_ORIGIN_FEATS as beforeActive} from '../app/data/dnd55e/origin-feats-homebrew.js';
import {DND55E_BACKGROUNDS as beforeBackgrounds} from '../app/data/dnd55e/backgrounds.js';

const root='reports/enoa-backgrounds/playability-review';
const source='app/data/enoa-authored-feats-v4.js';
const backgroundFile='app/data/dnd55e/backgrounds.js';
assert(!fs.existsSync(root+'/before.js'),'Already applied. Preserve the snapshot; make subsequent edits explicitly.');
assert.equal(designs.length,48);assert.equal(Object.keys(retained).length,7);
assert.equal(new Set(designs.map(d=>d.id)).size,48);
for(const f of beforeActive) assert.equal(Number(designs.some(d=>d.id===f.relatedBackgrounds[0]))+Number(!!retained[f.relatedBackgrounds[0]]),1,f.id);
const text=fs.readFileSync(source,'utf8');
const beforeBackgroundText=fs.readFileSync(backgroundFile,'utf8');
fs.writeFileSync(root+'/before.js',text);
fs.writeFileSync(root+'/backgrounds.before.js',beforeBackgroundText);
fs.writeFileSync(root+'/active-before.json',JSON.stringify(beforeActive,null,2)+'\n');
const read=(content,name)=>{
 const marker='export const '+name+' = ',s=content.indexOf(marker)+marker.length;
 assert(s>=marker.length,name);
 let e=content.indexOf('\n\nexport const ',s);if(e<0)e=content.length;
 return {s,e,rows:JSON.parse(content.slice(s,e).trim())};
};
const origins=read(text,'ENOA_AUTHORED_ORIGINS_V4').rows;
const legacy=read(text,'ENOA_AUTHORED_FEATS_2014_V4').rows;
const preLegacy=structuredClone(legacy);
const rerolls=new Set(['great-game-player','word-preacher','elixir-warden','ilbesh-marked','dangun-secret','promised-to-ibon','servant-of-the-meridirs','blue-blooded']);
const sharedDice=new Set(['knot-scribe','who-pleased-chidkur']);
const resourceBenefit={
 'mithras-caravaneer':'Общий темп','knot-scribe':'Сопоставить сведения','silk-mouse-catcher':'Сноровка',
 'crystal-eye':'Увидеть несоответствие','flame-keeper':'Спокойно вспомнить','ripple-listener':'Раннее предупреждение',
 'hound-of-the-dune-shah':'Не отстать','chosen-of-batrina':'Вывести из схватки','blood-of-the-heshegi':'Заметить след',
 'apprentice-of-the-star':'Точная подгонка','ruzda-apprentice':'Быстрое применение',
 'blue-blooded':'На грани','spiral-dweller':'Проблеск навыка'
};
const spending={
 'caravanserai-keeper':'Применение расходуется, когда отдых заканчивается и выдаётся дополнительное лечение.',
 huurch:'Применение расходуется, когда слушатели получают кубики.',
 'cradle-born':'Сам выбор обновляется при окончании продолжительного отдыха; дополнительный к6 можно прибавить лишь один раз до следующего такого отдыха.',
 'tea-house-keeper':'Применение расходуется, когда отдых заканчивается и выдаются временные хиты.',
 'omor-without-obo':'Применение расходуется, когда отдых заканчивается и получатели выбирают преимущества.',
 'apprentice-of-the-star':'Применение расходуется по окончании 10 минут работы, даже если получатель впоследствии не воспользуется бонусом.'
};
const older=s=>s.replaceAll('действие Засада','действие Засада (скрыться)').replaceAll('Действием Использование','Действием').replaceAll('действием Использование','действием').replaceAll('действие Использование','действие Использование предмета');
function resource(d,edition){
 if(d.id==='cradle-born') return spending[d.id];
 const n=d.model==='LONG1'?'один раз':edition==='2014'?'два раза':'количество раз, равное вашему бонусу мастерства';
 return `Вы можете использовать свойство «${resourceBenefit[d.id]||d.benefits[0].title}» ${n}. Все применения восстанавливаются, когда вы заканчиваете продолжительный отдых.`+(spending[d.id]?' '+spending[d.id]:'');
}
for(const d of designs){
 const f=origins.find(f=>f.relatedBackgrounds[0]===d.id);assert(f,d.id);
 const benefits=structuredClone(d.benefits);
 if(rerolls.has(d.id)){
  const r=benefits.find(b=>/перебросить/.test(b.text));assert(r,d.id);
  r.text+=' Решение о перебросе принимается сразу после объявления провала, до применения его последствий. При преимуществе или помехе перебрасывается только один к20 по выбору получателя; затем заново определяется используемый результат. Остальные модификаторы и уже брошенные дополнительные кубики сохраняются.';
 }
 if(sharedDice.has(d.id)) benefits[0].text+=' К одному броску можно прибавить только один кубик этого свойства, независимо от числа его обладателей.';
 f.title=d.title;f.version='0.5.0';
 if(d.id==='brotherhood-debtor') f.summary='Вы привыкли выполнять свою часть общей работы и помогать тем, с кем вас связывают обязательства.';
 f.approvalNote='Автор запросил переработку применимости и ясности в чате 29.10.2026. Допуск к локальному каталогу не означает утверждения нового лора или подтверждённого игровыми сессиями баланса.';
 f.benefits=[...benefits,{title:'Использование и восстановление',text:resource(d,'2024')}];
 f.action=benefits.find(b=>b.title===(resourceBenefit[d.id]||benefits[0].title)).text;
 f.conditions='Условия отдельных свойств приведены в их тексте.';
 f.uses=resource(d,'2024');f.recovery='Все применения восстанавливаются по окончании продолжительного отдыха.';
 f.balance={...f.balance,comparator:d.comparison,concern:d.risk,usesAtLevels:d.model==='LONG1'?[1,1,1,1]:[2,3,4,6],playtest:false};
 const f14=legacy.find(f=>f.relatedBackgrounds[0]===d.id);assert(f14,d.id);
 const asi=f14.benefits[0];assert(asi.startsWith('**Закалка опыта.**'));
 f14.title=d.title;f14.version='0.5.0';
 f14.benefits=[asi,...benefits.map(b=>`**${b.title}.** ${older(b.text)}`),'**Использование и восстановление.** '+resource(d,'2014')];
 f14.balance={...f14.balance,concern:d.risk+' Отдельная адаптация 2014: +1 характеристики сохранён, запас PB заменён двумя применениями; полная сверка с платными чертами PHB 2014 не заявляется.',playtest:false};
 if(d.id==='brotherhood-debtor') f14.intro=f.summary+f14.intro.slice(f14.intro.indexOf('\n\n'));
 // Do not turn the 2014 option into an automatic background benefit.
 assert(f14.intro.includes('Предыстория 2014 не выдаёт её автоматически'));
 assert.equal(f14.benefits[0],preLegacy.find(x=>x.id===f14.id).benefits[0]);
}
let updated=text;
for(const [name,rows] of [['ENOA_AUTHORED_ORIGINS_V4',origins],['ENOA_AUTHORED_FEATS_2014_V4',legacy]]){
 const {s,e}=read(updated,name);updated=updated.slice(0,s)+JSON.stringify(rows,null,2)+updated.slice(e);
}
// Only the visible names of existing linked feats change in background records.
let backgroundText=beforeBackgroundText;
for(const d of designs){
 const bg=beforeBackgrounds.find(b=>b.id===d.id);if(bg.feat.title===d.title)continue;
 const old=JSON.stringify(bg.feat,null,2).split('\n').map((s,i)=>i?'    '+s:s).join('\n');
 const next=JSON.stringify({...bg.feat,title:d.title},null,2).split('\n').map((s,i)=>i?'    '+s:s).join('\n');
 assert(backgroundText.includes(old),d.id+': feat assignment formatting');backgroundText=backgroundText.replace(old,next);
}
fs.writeFileSync(source,updated);
fs.writeFileSync(backgroundFile,backgroundText);
console.log(JSON.stringify({reviewed:55,rewritten:48,retained:7,mirrored2014:48,version:'0.5.0',remoteDeployment:false}));
