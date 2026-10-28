import fs from 'node:fs';
import assert from 'node:assert/strict';
import {cores,secondaries} from '../reports/enoa-backgrounds/clarity-edits.mjs';
import {DND55E_HOMEBREW_ORIGIN_FEATS as active} from '../app/data/dnd55e/origin-feats-homebrew.js';
const root='reports/enoa-backgrounds/clarity-review';fs.mkdirSync(root,{recursive:true});
const file='app/data/enoa-authored-feats-v4.js';
assert(!fs.existsSync(root+'/before.js'),'Review already applied; preserve the original snapshot.');
let text=fs.readFileSync(file,'utf8');fs.writeFileSync(root+'/before.js',text);
const read=name=>{const m='export const '+name+' = ',s=text.indexOf(m)+m.length;let e=text.indexOf('\n\nexport const ',s);if(e<0)e=text.length;return {s,e,rows:JSON.parse(text.slice(s,e).trim())};};
const origins=read('ENOA_AUTHORED_ORIGINS_V4').rows;
const old=structuredClone(origins);
const rerolls=new Set(['hakar','huurch','nagbo','steppe-tiger','titania-returned','dangun-secret','promised-to-ibon','blue-blooded']);
const expiry={
 hakar:'Подготовка также заканчивается, когда вы заканчиваете продолжительный отдых.',
 'mithras-caravaneer':'Совет также перестаёт давать преимущество, когда вы заканчиваете продолжительный отдых.',
 'omor-without-obo':'Подготовленное место даёт преимущества этой черты только до вашего следующего продолжительного отдыха.'
};
const consumption={
 hakar:'Применение расходуется при прикосновении.',
 'mithras-caravaneer':'Применение расходуется после 10 минут объяснения маршрута.',
 'knot-scribe':'Применение расходуется после 10 минут восстановления записи. Готовая немагическая запись остаётся у вас после отдыха.',
 huurch:'Применение расходуется после 10 минут выступления, даже если слушатели впоследствии не используют переброс.',
 'urdreg-hunter':'Применение расходуется после минуты изучения следов, а не при последующей проверке.',
 'great-game-player':'Применение расходуется при осмотре, независимо от успеха проверки.',
 'spiral-runner':'Применение расходуется по окончании разметки.',
 'cradle-born':'Применение расходуется при выборе инструмента.',
 'tower-echo':'Применение расходуется только при реакции на атаку, а не при выборе союзника.',
 'omen-reader':'Применение расходуется по окончании минуты толкования.',
 'deep-brother':'Применение расходуется при закреплении верёвки, даже если падения не произойдёт.',
 'dangun-secret':'Применение расходуется только при повторе проваленной проверки.',
 'tea-house-keeper':'Применение расходуется при приготовлении чая.',
 'omor-without-obo':'Применение расходуется после 10 минут подготовки привала.',
 'hound-of-the-dune-shah':'Применение расходуется после минуты изучения следа.',
 'apprentice-of-the-star':'Применение расходуется при повторной проверке после дополнительных 10 минут работы, независимо от её успеха.',
 'who-pleased-chidkur':'Применение расходуется по окончании минуты разговора.'
};
const older=s=>s.replaceAll('Действием Магия','Действием').replaceAll('Действием Изучение','Действием').replaceAll('Действием Использование','Действием').replaceAll('Действием Поиск','Действием').replaceAll('действием Использование','действием').replaceAll('действием Магия','действием').replaceAll('действием Изучение','действием').replaceAll('действием Поиск','действием').replaceAll('при действии Влияние','при разговоре');
function resource(f,id,edition){
 const one=f.balance?.usesAtLevels?.every(n=>n===1);
 const n=one?'один раз':edition==='2014'?'два раза':'количество раз, равное вашему бонусу мастерства';
 let s=`Вы можете использовать основной приём ${n}. Все применения восстанавливаются, когда вы заканчиваете продолжительный отдых.`;
 if(consumption[id])s+=' '+consumption[id];
 if(expiry[id])s+=' '+expiry[id];
 return s;
}
for(const f of origins){
 const id=f.relatedBackgrounds[0];if(id==='bone-seer')continue;
 const original=f.benefits[0];
 let primary=cores[id]||original.text;
 if(rerolls.has(id))primary+=' Один и тот же бросок нельзя повторно перебросить этой чертой.';
 // Preserve the old prohibition only where the active benefit has no action cost.
 if(['syndicate-appraiser','norbu','promised-to-ibon','blue-blooded'].includes(id))primary+=' В состоянии Недееспособный воспользоваться этим приёмом нельзя.';
 f.version='0.4.3';f.action=primary;f.conditions='Требования к цели и моменту использования приведены в основном приёме.';
 f.benefits=[{title:original.title,text:primary}];
 if(secondaries[id])f.benefits.push(secondaries[id]);
 const use=resource(f,id,'2024');f.benefits.push({title:'Использование и восстановление',text:use});f.uses=use;f.recovery='Все применения восстанавливаются по окончании продолжительного отдыха.';
}
const mirrored=[];
const legacy=read('ENOA_AUTHORED_FEATS_2014_V4').rows;
for(const f of legacy){const id=f.relatedBackgrounds[0],origin=origins.find(o=>o.relatedBackgrounds[0]===id);if(!origin||id==='bone-seer')continue;
 const first=f.benefits[0];assert(first.startsWith('**Закалка опыта.**'),id);
 f.version='0.4.3';f.benefits=[first,`**${origin.benefits[0].title}.** ${older(origin.benefits[0].text)}`];
 if(secondaries[id])f.benefits.push(`**${secondaries[id].title}.** ${older(secondaries[id].text)}`);
 f.benefits.push('**Использование и восстановление.** '+resource(origin,id,'2014'));mirrored.push(id);
}
for(const [name,rows] of [['ENOA_AUTHORED_ORIGINS_V4',origins],['ENOA_AUTHORED_FEATS_2014_V4',legacy]]){const {s,e}=read(name);text=text.slice(0,s)+JSON.stringify(rows,null,2)+text.slice(e);}
fs.writeFileSync(file,text);
const review=active.map(f=>{const id=f.relatedBackgrounds[0],after=origins.find(x=>x.relatedBackgrounds[0]===id),before=old.find(x=>x.relatedBackgrounds[0]===id),secondary=before?.benefits.find(b=>b.title==='Опыт прошлого');return {id,title:f.title,decision:!after||id==='bone-seer'?'KEEP_ALREADY_CLEAR':'REVISE',primary:cores[id]?'Уточнены триггер, действие, цель, результат и ограничения.':'Основной приём проверен и сохранён; снят общий текстовый шаблон.',secondary:secondary?(secondaries[id]?'Сохранено реальное преимущество; дано конкретное название.':'Удалено обычное действие или искусственная память без самостоятельного игрового результата.'):'Ранее оформленные индивидуальные свойства сохранены.',removedSecondary:!!secondary&&!secondaries[id],secondaryBefore:secondary?.text||null,secondaryAfter:secondaries[id]||null,scenario:'Условие основного приёма выполнено → только указанный эффект; условие отсутствует → черта его не создаёт; запас исчерпан → новое применение недоступно.'};});
fs.writeFileSync(root+'/review.json',JSON.stringify(review,null,2)+'\n');
fs.writeFileSync(root+'/index.md','# Индивидуальная проверка 55 черт происхождения\n\n'+review.map(r=>`## ${r.title}\n\n${r.id} · ${r.decision}\n\n${r.primary}\n\n${r.secondary}\n\n${r.scenario}`).join('\n\n')+'\n');
console.log(JSON.stringify({reviewed:review.length,rewritten:review.filter(r=>r.decision==='REVISE').length,primaryClarifications:Object.keys(cores).length,removedSecondary:review.filter(r=>r.removedSecondary).length,retainedNamedSecondary:Object.keys(secondaries).length,mirrored2014:mirrored.length}));
