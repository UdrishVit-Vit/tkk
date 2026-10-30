import fs from 'node:fs';
import assert from 'node:assert/strict';
import {meta,title,summary,story,variants,hooks,questions,tool,storage,pearlKnot,origin,background2024,background2014} from '../proposals/enoa-backgrounds/house-of-knots-attendant/draft.mjs';
import {DND55E_BACKGROUNDS} from '../app/data/dnd55e/backgrounds.js';
import {BACKGROUNDS_5E} from '../app/data/backgrounds5e.js';
const root='reports/enoa-backgrounds/house-of-knots-publication';
assert(!fs.existsSync(root+'/before.json')||process.argv.includes('--refresh'),'Already adopted; preserve the baseline.');
fs.mkdirSync(root,{recursive:true});
if(!fs.existsSync(root+'/before.json'))fs.writeFileSync(root+'/before.json',JSON.stringify({backgrounds2024:DND55E_BACKGROUNDS,backgrounds2014:BACKGROUNDS_5E,proposalVersion:meta.version},null,2)+'\n');
const magicPath='/dnd55e/magic-items?item='+pearlKnot.id;
const magic14Path='/dnd5e/magic-items?m='+pearlKnot.id;
const contents=tool.contents;
const kit=(edition)=>({
 intro:'Письма и записи вяжут вручную. В наборе четыре вида нитей, нож и материалы для расстановки акцентов.',contents,
 proficiency:{rule:'Владение набором позволяет добавлять бонус мастерства к подходящим проверкам работы с узловыми записями. Характеристика и сложность зависят от задачи. Бонус мастерства добавляется к одной проверке только один раз.',
 tasks:['Связать простое письмо из джутовых нитей или официальное письмо из шерсти яка на известном вам языке.','Скопировать доступную узловую запись, сохранив порядок узлов.','Исправить повреждённое плетение или разобрать перепутанные нити.','Расставить акценты с помощью костей, бусин, украшений и металлических нитей, соблюдая правила оформления документов.'],
 limit:'Чтение и составление писем требуют знания языка записи.'},
 supplies:[{title:'Пополнение набора',description:'Начальная длина каждого вида нитей указана в составе. Нити, кости, бусины и украшения можно пополнять отдельно.',storage:'Храните нити сухими и раздельно, чтобы они не путались.'}]
});
const kit24={id:tool.id,title:tool.title,englishName:'Knot-Writing Kit',source:'TVV',sourceTitle:'Эноа',srdVersion:'Эноа',category:'tools',kind:'tool',tags:['tool','artisan'],group:'Ремесленный набор Эноа',ability:'По выполняемой задаче',cost:'10 зм',weight:'5 фнт.',description:tool.description,utilize:'Создание, копирование и восстановление узловых записей.',craft:'Узловые письма; копии записей; описи',kit:kit(2024)};
const kit14={id:tool.id,title:tool.title,englishName:'Knot-Writing Kit',source:'TVV',category:'kit',cost:'10 зм',weight:'5 фнт.',tags:['utility','social'],description:tool.description,details:[],kit:kit(2014),usedBy:[]};
const feat={...structuredClone(origin),status:'Approved',version:'0.4.2',approvalNote:'Автор запросил добавление согласованной предыстории, черты и предметов на сайт 30.10.2026.',action:'Постоянная Компетентность и получение одного Жемчужного узла.',conditions:'Выбор навыка и правила Жемчужного узла приведены в соответствующих описаниях.',uses:'Вы получаете один узел при получении черты. Число применений самого предмета не ограничено.',recovery:'Не требуется; отдых не создаёт новый предмет.'};
const b24={group:'enoa',source:'TVV',sourceTitle:'Эноа',id:background2024.id,title,originalName:background2024.originalName,summary,abilities:background2024.abilities,skills:background2024.skills,tool:tool.title,feat:{id:feat.id,title:feat.title},equipment:structuredClone(background2024.equipment),glossary:[],ties:['Дом Узлов'],enoaLead:story,questions,variants:variants.map(v=>({...v,region:'Дом Узлов'})),hooks,grantedItems:[{id:pearlKnot.id,title:pearlKnot.title,path:magicPath,note:'Вы получаете один узел по черте «Архивная выучка» при любом выборе стартового снаряжения.'}]};
for(const i of b24.equipment.items)Object.assign(i,{label:i.title,note:''});
const b14={id:background2014.id,title,source:'TVV',grantsFeat:null,intro:summary,proficiencies:{skills:background2014.skills.map(name=>({name,text:null})),tools:[tool.title],languages:[background2014.languages],equipment:background2014.equipment},feature:background2014.feature,storyParagraphs:story,questions,tables:[{id:'hook',label:hooks.label,dice:hooks.dice,entries:hooks.entries}]};
b24.equipment.storyItems=[background2024.memento.replace(/\.$/,'')];
b14.variants=variants;
const blocks=[{type:'paragraph',text:pearlKnot.description},{type:'paragraph',text:pearlKnot.rule}];
const magic24={id:pearlKnot.id,title:pearlKnot.title,englishName:'Pearl Knot',source:'TVV',sourceTitle:'Эноа',rarity:'unknown',rarityLabel:'Редкость не определена',attunement:false,type:'wondrous',typeLabel:'Чудесный предмет',subtitle:'Служебный инструмент Дома Узлов',summary:pearlKnot.description+' '+pearlKnot.rule,description:blocks,srdVersion:'Эноа',sourcePage:null};
const magic14={id:pearlKnot.id,title:pearlKnot.title,rarity:'unknown',type:'wondrous',attune:false,source:'TVV',description:pearlKnot.description+'\n\n'+pearlKnot.rule,excludeRulePaths:['/dnd5e/screens/downtime_activities/research','/dnd5e/screens/action']};
const storageCommon={id:storage.id,title:storage.title,englishName:storage.englishName,source:'TVV',cost:`${storage.costCp/100} зм`,weight:`${storage.weightLb} фнт.`,description:storage.description};
const storage24={...storageCommon,sourceTitle:'Эноа',srdVersion:'Эноа',category:'gear',kind:'gear',tags:['container']};
const storage14={...storageCommon,category:'container',tags:['utility','travel'],details:[],usedBy:[]};
const exports={HOUSE_BACKGROUND_2024:b24,HOUSE_BACKGROUND_2014:b14,HOUSE_ORIGIN_FEAT:feat,HOUSE_KIT_2024:kit24,HOUSE_KIT_2014:kit14,HOUSE_MAGIC_ITEM_2024:magic24,HOUSE_MAGIC_ITEM_2014:magic14,HOUSE_STORAGE_2024:storage24,HOUSE_STORAGE_2014:storage14};
fs.writeFileSync('app/data/house-of-knots.js','// Author-approved content for site inclusion, 2026-10-30. Homebrew; no playtest claimed.\n\n'+Object.entries(exports).map(([name,value])=>'export const '+name+' = '+JSON.stringify(value,null,2)).join('\n\n')+'\n');
fs.writeFileSync(root+'/adoption.json',JSON.stringify({date:'2026-10-30',proposalVersion:meta.version,ids:{background:b24.id,feat:feat.id,kit:kit24.id,magicItem:magic24.id},kitRenamed:true,playtest:false,remoteDeployment:false},null,2)+'\n');
console.log('Prepared both backgrounds, Origin Feat, both tool-kit records and both magic-item records.');
