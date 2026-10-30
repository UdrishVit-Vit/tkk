import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {meta,title,premise,summary,story,variants,hooks,tool,storage,pearlKnot,origin,background2024 as b24,background2014 as b14,integration} from './draft.mjs';
import {DND55E_BACKGROUNDS as existing} from '../../../app/data/dnd55e/backgrounds.js';
import {DND55E_FEATS as existingFeats} from '../../../app/data/dnd55e/feats.js';
import {DND55E_EQUIPMENT as equipment} from '../../../app/data/dnd55e/equipment2024.js';
const root='proposals/enoa-backgrounds/house-of-knots-attendant';
const protectedPaths=['app/data/dnd55e/backgrounds.js','app/data/enoa-authored-feats-v4.js','app/data/backgrounds5e.js'];
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const before=Object.fromEntries(protectedPaths.map(p=>[p,sha(p)]));
assert.equal(b24.skills.length,2);assert.equal(b24.abilities.length,3);assert.equal(new Set(b24.skills).size,2);
assert.equal(b24.feat.id,origin.id);assert.equal(b24.toolId,tool.id);assert.equal(origin.category,'origin');
assert.deepEqual(origin.abilities,[]);assert.equal(origin.requirement,null);assert.equal(origin.repeatable,false);
assert.equal(origin.status,'Draft');assert.equal(origin.balance.playtest,false);
const adopted=existing.find(b=>b.id===b24.id);
if(adopted){assert.equal(adopted.title,title);assert.equal(adopted.feat.id,origin.id);assert.equal(existingFeats.find(f=>f.id===origin.id)?.status,'Approved');}
const itemsTotal=b24.equipment.items.reduce((s,e)=>s+e.quantity*e.unitCostCp,0);
assert.equal(itemsTotal,1860);assert.equal(itemsTotal+b24.equipment.coinsCp,5000);assert.equal(b24.equipment.alternativeCp,5000);
const officialPriceCp={'tool-calligraphers-supplies':1000,'gear-lantern-hooded':500,'gear-oil':10,'gear-clothes-travelers':200,'gear-pouch':50};
for(const item of b24.equipment.items){
 if(item.id===storage.id){assert.equal(item.unitCostCp,storage.costCp);assert(equipment.some(e=>e.id===item.id));continue;}
 const id=item.id===tool.id?'tool-calligraphers-supplies':item.id;
 assert(equipment.some(e=>e.id===id));assert.equal(item.unitCostCp,officialPriceCp[id]);
}
assert.equal(b14.skills.length,2);assert.equal(b14.tools.length,1);assert(b14.languages);
assert(!('abilities' in b14));assert(!('feat' in b14));assert.equal(b14.feature.title,pearlKnot.title);
assert(b14.feature.text.replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').includes('получили один Жемчужный узел'));
assert(!/связной|рабочего дня|запрос/iu.test(b14.feature.text),'old contact feature removed');
assert.equal(hooks.entries.length,6);assert.equal(variants.length,3);
const wordCount=s=>s.split(/\s+/u).length;
assert(wordCount(summary)>=25&&wordCount(summary)<=35);
assert.equal(summary.split(/[.!?]+/u).filter(s=>s.trim()).length,3);
assert(wordCount(story.join(' '))>=180&&wordCount(story.join(' '))<=210);
assert(story.length>=2&&story.length<=3);
assert(!story[0].startsWith(summary.split(/[.!?]/u)[0]));
const playerText=JSON.stringify({summary,story,variants,hooks,origin,b24,b14});
assert(!/книг[а-яё]*|бумаг[а-яё]*|пергамент[а-яё]*|чернил[а-яё]*/iu.test(playerText),'non-kipu writing');
assert(!origin.benefits.some(b=>b.title==='Опыт прошлого'));
assert(origin.benefits[0].text.includes('не складывается'));
assert(!('spellGrant' in origin),'the character no longer learns a spell');
assert.deepEqual(origin.grantedItems,[pearlKnot.id]);assert.deepEqual(b14.grantedItems,[pearlKnot.id]);
assert.equal(pearlKnot.activationMinutes,10);assert.equal(pearlKnot.consumable,false);
assert.equal(pearlKnot.requiresAttunement,false);assert.equal(pearlKnot.uses,'unlimited');
assert(!('spellEffect' in pearlKnot),'independent effect, not a linked spell');
assert.equal(pearlKnot.systemIndependent,true);assert.equal(pearlKnot.effectType,'magical-research');
assert.deepEqual(pearlKnot.targetKinds,['object','creature']);assert.equal(pearlKnot.requiresContinuousContact,true);assert.equal(pearlKnot.interruption,'restart');
assert(!/Опознание|identify|накладывать|ячейк|правил своей редакции/iu.test(pearlKnot.rule),'standalone setting text');
assert(pearlKnot.rule.includes('10 минут'));assert(pearlKnot.rule.includes('сколько использований'));
assert(!/всегда имеете подготовленным|раз наложить|продолжительный отдых/u.test(origin.benefits[1].text),'no spell grant or daily respawn');
assert.equal(pearlKnot.costCp,null);assert.equal(pearlKnot.rarity,null);assert(!b24.equipment.items.some(e=>e.id===pearlKnot.id),'grant separately from priced gear');
assert.deepEqual(origin.balance.usesAtLevels,[null,null,null,null]);
const chance=(mod,dc)=>Array.from({length:20},(_,i)=>i+1).filter(r=>r+mod>=dc).length/20;
const math=[1,4,5,11].map(level=>{
 const pb=Math.ceil(level/4)+1,int=3;
 return {level,intModifierHeldConstant:int,pb,proficient:int+pb,expert:int+2*pb,normalDC15:chance(int+pb,15),expertDC15:chance(int+2*pb,15),normalDC20:chance(int+pb,20),expertDC20:chance(int+2*pb,20)};
});
assert.equal(math[0].normalDC15,0.55);assert.equal(math[0].expertDC15,0.65);
assert.equal(Math.floor(60/pearlKnot.activationMinutes),6,'six serial uses in a quiet hour, not an instant effect');

const card=`# ${title}\n\nПроект ${meta.version}, ${meta.date}. Основа Дома задана автором; рабочие подробности и механика предложены для этой предыстории.\n\n${premise}\n\n## Краткое описание\n\n${summary}\n\n## История и связи\n\n${story.join('\n\n')}\n\n## Параметры D&D 2024\n\n| Параметр | Значение |\n| --- | --- |\n| Характеристики | ${b24.abilities.join(', ')} |\n| Владение навыками | ${b24.skills.join(', ')} |\n| Владение инструментом | ${b24.tool} |\n| Черта происхождения | ${origin.title} |\n\nВыберите +2 к одной и +1 к другой из указанных характеристик либо +1 ко всем трём. Эти повышения не увеличивают значение выше 20.\n\n## Стартовое снаряжение 2024\n\nВыберите А или Б.\n\n**А. Готовый комплект**\n\n${b24.equipment.items.map(e=>'- '+e.title).join('\n')}\n\n**Оставшиеся деньги:** ${b24.equipment.coins}. Предметы и деньги вместе стоят 50 зм.\n\n**Б. Деньги:** 50 зм вместо всего комплекта.\n\n## Черта происхождения «${origin.title}»\n\nD&D 2024 · авторская Origin Feat · предпосылок нет · повторный выбор невозможен.\n\n${origin.benefits.map(b=>`**${b.title}.** ${b.text}`).join('\n\n')}\n\nЭто личная возможность персонажа, а не установленное правило о способностях всех служителей.\n\n## Варианты прошлого\n\n${variants.map(v=>`**${v.title}.** ${v.text}`).join('\n\n')}\n\n## Зацепки — ${hooks.label.toLowerCase()}\n\nВыберите вариант или бросьте к6.\n\n| к6 | Вариант |\n| --- | --- |\n${hooks.entries.map(e=>`| ${e.roll} | ${e.text} |`).join('\n')}\n\n**Памятная вещь для истории:** ${b24.memento}\n\n## Отдельная версия D&D 2014\n\n- **Владение навыками:** ${b14.skills.join(', ')}.\n- **Владение инструментами:** ${b14.tools.join(', ')}.\n- **Язык:** ${b14.languages}\n- **Снаряжение:** ${b14.equipment.join('; ')}. Пакет 2014 не доводится автоматически до 50 зм.\n\n**Особенность «${b14.feature.title}».** ${b14.feature.text}\n\n${b14.acquisitionNote}\n\nТекст истории, варианты и зацепки используются те же.\n\n## Материал Мастеру — предложения\n\n${integration.gmHooks.map(h=>`**${h.scale}.** ${h.text}`).join('\n\n')}\n\n**Отношения:** ${integration.npcs.map(n=>n.role+': '+n.idea).join(' ')}\n\n**Выбор:** ${integration.dilemma}\n\n## Для проверки\n\n[Канонический бриф](CANON_BRIEF.md) · [Механическая и литературная проверка](REVIEW.md) · [Машиночитаемые записи](catalog.json).\n`;
// Match the agreed card reading order: summary, rules/equipment, feat, history.
const storySection='## История и связи\n\n'+story.join('\n\n')+'\n\n';
const pearlSection=`## Жемчужный узел\n\n*Служебный магический инструмент Дома Узлов.*\n\n${pearlKnot.description}\n\n${pearlKnot.rule}\n\nОдин узел выдаётся по черте происхождения 2024 либо как отдельный служебный предмет предыстории 2014. Это один и тот же предмет; две редакции не используются для получения двух узлов. Он предоставляется отдельно от оплаченного комплекта А/Б; цена и редкость пока не установлены.\n\n`;
const orderedCard=card.replace(storySection,'').replace('## Варианты прошлого\n\n',pearlSection+storySection+'## Варианты прошлого\n\n');
fs.writeFileSync(root+'/README.md',orderedCard+`\n## ${storage.title}\n\n${storage.description}\n\nРабочая авторская цена — ${storage.costCp/100} зм; вес — ${storage.weightLb} фнт. Это отдельный предмет снаряжения для хранения записей.\n`);
fs.writeFileSync(root+'/catalog.json',JSON.stringify({meta,tool,storage,pearlKnot,background2024:b24,originFeat:origin,background2014:b14,integration},null,2)+'\n');
fs.writeFileSync(root+'/math.json',JSON.stringify({assumptions:'Интеллект +3 удерживается постоянным; только обычный к20, без преимущества и иных бонусов. Результат — вероятность одной проверки, не баланс кампании.',levels:math,itemActivationMinutes:10,maxSerialItemUsesPerQuietHour:6,playtest:false},null,2)+'\n');
for(const p of protectedPaths)assert.equal(sha(p),before[p],p+': production changed');
const result={status:'PASS',date:meta.date,proposalVersion:meta.version,background2024:true,originFeat2024:true,background2014:true,equipmentACp:5000,equipmentBCp:5000,summaryWords:wordCount(summary),storyWords:wordCount(story.join(' ')),duplicateIds:false,editionsSeparated:true,canonBasis:'DIRECT_AUTHOR plus bounded chronicle evidence',playtest:false,productionUnchanged:true,productionHashes:before};
fs.writeFileSync(root+'/verification.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
