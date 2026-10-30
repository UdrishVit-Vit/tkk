import fs from 'node:fs';
import assert from 'node:assert/strict';
import {meta,title,summary,story,variants,hooks,questions,tool,pearlKnot,origin,background2024,background2014} from '../proposals/enoa-backgrounds/house-of-knots-attendant/draft.mjs';
import {DND55E_BACKGROUNDS} from '../app/data/dnd55e/backgrounds.js';
import {BACKGROUNDS_5E} from '../app/data/backgrounds5e.js';
const root='reports/enoa-backgrounds/house-of-knots-publication';
assert(!fs.existsSync(root+'/before.json')||process.argv.includes('--refresh'),'Already adopted; preserve the baseline.');
fs.mkdirSync(root,{recursive:true});
if(!fs.existsSync(root+'/before.json'))fs.writeFileSync(root+'/before.json',JSON.stringify({backgrounds2024:DND55E_BACKGROUNDS,backgrounds2014:BACKGROUNDS_5E,proposalVersion:meta.version},null,2)+'\n');
const bgPath='/dnd55e/backgrounds?background=house-of-knots-attendant';
const bg14Path='/dnd5e/backgrounds?bg=house-of-knots-attendant';
const magicPath='/dnd55e/magic-items?item='+pearlKnot.id;
const magic14Path='/dnd5e/magic-items?m='+pearlKnot.id;
const kitPath='/dnd55e/equipment?item='+tool.id;
const kit14Path='/dnd5e/equipment?e='+tool.id;
const related=(edition)=>[
 {title, path:edition===2024?bgPath:bg14Path},
 {title:pearlKnot.title,path:edition===2024?magicPath:magic14Path}
];
const contents=[
 {title:'Шнуры и нити',description:'Основа для узловых записей, копий, бирок и небольших связок.'},
 {title:'Челноки и плетельные иглы',description:'Для ведения нити через плетение и работы с плотными участками записи.'},
 {title:'Разделитель узлов',description:'Тонкое приспособление для аккуратного разбора и исправления плетения.'},
 {title:'Небольшие ножницы',description:'Для подготовки нитей и удаления повреждённых концов.'},
 {title:'Бирки и крепёжные шнурки',description:'Для отметок, соединения связок и сохранения порядка записей.'}
];
const kit=(edition)=>({
 intro:'Принадлежности для создания, копирования и восстановления узловых записей.',contents,
 proficiency:{rule:'Владение набором позволяет добавлять бонус мастерства к подходящим проверкам работы с узловыми записями. Характеристика и сложность зависят от задачи. Бонус мастерства добавляется к одной проверке только один раз.',
 tasks:['Составить опись или записать договорённость на известном вам языке.','Скопировать доступную узловую запись, сохранив порядок связок.','Исправить повреждённое плетение или разобрать перепутанные нити.','Подготовить бирки и указатели для хранения вещей и записей.'],
 limit:'Чтение требует знания языка. Набор не раскрывает неизвестный шифр и сам по себе не создаёт магических свойств.'},
 supplies:[{title:'Нити для новых записей',description:'Нити и шнуры расходуются по мере создания записей; запас пополняют отдельно.',storage:'Храните волокно в сухом чехле, защищая от грязи и масел.'}],
 related:related(edition)
});
const kit24={id:tool.id,title:tool.title,englishName:'Knot-Writing Kit',source:'TVV',sourceTitle:'Эноа',srdVersion:'Эноа',category:'tools',kind:'tool',tags:['tool','artisan'],group:'Ремесленный набор Эноа',ability:'По выполняемой задаче',cost:'10 зм',weight:'5 фнт.',description:tool.description,utilize:'Создание, копирование и восстановление узловых записей.',craft:'Обычные узловые записи; бирки; описи',kit:kit(2024)};
const kit14={id:tool.id,title:tool.title,englishName:'Knot-Writing Kit',source:'TVV',category:'kit',cost:'10 зм',weight:'5 фнт.',tags:['utility','social'],description:tool.description,details:[],kit:kit(2014),usedBy:[]};
const feat={...structuredClone(origin),status:'Approved',version:'0.4.2',approvalNote:'Автор запросил добавление согласованной предыстории, черты и предметов на сайт 30.10.2026.',action:'Постоянная Компетентность и получение одного Жемчужного узла.',conditions:'Выбор навыка и правила Жемчужного узла приведены в соответствующих описаниях.',uses:'Вы получаете один узел при получении черты. Число применений самого предмета не ограничено.',recovery:'Не требуется; отдых не создаёт новый предмет.',relatedItems:[{title:pearlKnot.title,path:magicPath},{title:tool.title,path:kitPath}]};
const b24={group:'enoa',source:'TVV',sourceTitle:'Эноа',id:background2024.id,title,originalName:background2024.originalName,summary,abilities:background2024.abilities,skills:background2024.skills,tool:tool.title,feat:{id:feat.id,title:feat.title},equipment:structuredClone(background2024.equipment),glossary:[],ties:['Дом Узлов'],enoaLead:story,questions,variants:variants.map(v=>({...v,region:'Дом Узлов'})),hooks,grantedItems:[{id:pearlKnot.id,title:pearlKnot.title,path:magicPath,note:'Вы получаете один узел по черте «Архивная выучка» при любом выборе стартового снаряжения.'}]};
for(const i of b24.equipment.items)Object.assign(i,{label:i.title,note:''});
const b14={id:background2014.id,title,source:'TVV',grantsFeat:null,intro:summary,proficiencies:{skills:background2014.skills.map(name=>({name,text:null})),tools:[tool.title],languages:[background2014.languages],equipment:background2014.equipment},feature:background2014.feature,storyParagraphs:story,questions,tables:[{id:'hook',label:hooks.label,dice:hooks.dice,entries:hooks.entries}],relatedLinks:[{title:pearlKnot.title,path:magic14Path},{title:tool.title,path:kit14Path}]};
b24.equipment.storyItems=[background2024.memento.replace(/\.$/,'')];
b14.variants=variants;
feat.relatedItems.unshift({title,path:bgPath});
const blocks=[{type:'paragraph',text:pearlKnot.description},{type:'paragraph',text:pearlKnot.rule}];
const magic24={id:pearlKnot.id,title:pearlKnot.title,englishName:'Pearl Knot',source:'TVV',sourceTitle:'Эноа',rarity:'unknown',rarityLabel:'Редкость не определена',attunement:false,type:'wondrous',typeLabel:'Чудесный предмет',subtitle:'Служебный инструмент Дома Узлов',summary:pearlKnot.description+' '+pearlKnot.rule,description:blocks,srdVersion:'Эноа',sourcePage:null,relatedLinks:[{title,path:bgPath},{title:tool.title,path:kitPath}]};
const magic14={id:pearlKnot.id,title:pearlKnot.title,rarity:'unknown',type:'wondrous',attune:false,source:'TVV',description:pearlKnot.description+'\n\n'+pearlKnot.rule,excludeRulePaths:['/dnd5e/screens/downtime_activities/research','/dnd5e/screens/action'],relatedLinks:[{title,path:bg14Path},{title:tool.title,path:kit14Path}]};
const exports={HOUSE_BACKGROUND_2024:b24,HOUSE_BACKGROUND_2014:b14,HOUSE_ORIGIN_FEAT:feat,HOUSE_KIT_2024:kit24,HOUSE_KIT_2014:kit14,HOUSE_MAGIC_ITEM_2024:magic24,HOUSE_MAGIC_ITEM_2014:magic14};
fs.writeFileSync('app/data/house-of-knots.js','// Author-approved content for site inclusion, 2026-10-30. Homebrew; no playtest claimed.\n\n'+Object.entries(exports).map(([name,value])=>'export const '+name+' = '+JSON.stringify(value,null,2)).join('\n\n')+'\n');
fs.writeFileSync(root+'/adoption.json',JSON.stringify({date:'2026-10-30',proposalVersion:meta.version,ids:{background:b24.id,feat:feat.id,kit:kit24.id,magicItem:magic24.id},kitRenamed:true,playtest:false,remoteDeployment:false},null,2)+'\n');
console.log('Prepared both backgrounds, Origin Feat, both tool-kit records and both magic-item records.');
