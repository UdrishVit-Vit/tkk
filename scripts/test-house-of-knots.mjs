import fs from 'node:fs';
import assert from 'node:assert/strict';
import {DND55E_BACKGROUNDS as backgrounds24, DND55E_TOOL_EQUIPMENT as tools24} from '../app/data/dnd55e/backgrounds.js';
import {BACKGROUNDS_5E as backgrounds14} from '../app/data/backgrounds5e.js';
import {DND55E_FEATS as feats24} from '../app/data/dnd55e/feats.js';
import {FEATS_5E as feats14} from '../app/data/feats5e.js';
import {DND55E_EQUIPMENT as equipment24} from '../app/data/dnd55e/equipment2024.js';
import {EQUIPMENT_5E as equipment14} from '../app/data/equipment5e.js';
import {MAGIC_ITEMS_5E as magic14} from '../app/data/magicItems5e.js';
import * as house from '../app/data/house-of-knots.js';

const root='reports/enoa-backgrounds/house-of-knots-publication/';
const before=JSON.parse(fs.readFileSync(root+'before.json','utf8'));
const b24=house.HOUSE_BACKGROUND_2024,b14=house.HOUSE_BACKGROUND_2014,f=house.HOUSE_ORIGIN_FEAT;
for(const [old,current] of [[before.backgrounds2024,backgrounds24],[before.backgrounds2014,backgrounds14]]){
 assert.equal(current.length,old.length+1);
 for(const row of old)assert.deepEqual(current.find(x=>x.id===row.id),row,row.id+': prior record changed');
}
for(const list of [backgrounds24,backgrounds14,feats24,feats14,equipment24,equipment14,magic14])assert.equal(new Set(list.map(x=>x.id)).size,list.length,'duplicate ID');
assert.equal(backgrounds24.find(x=>x.id===b24.id),b24);
assert.equal(backgrounds14.find(x=>x.id===b14.id),b14);
assert.equal(feats24.find(x=>x.id===f.id),f);
assert.equal(f.status,'Approved');assert.equal(f.category,'origin');assert.deepEqual(f.abilities,[]);
assert.equal(f.balance.playtest,false);
assert.equal(b24.tool,'Набор узлового письма');assert.deepEqual(b14.proficiencies.tools,[b24.tool]);
assert.equal(tools24[b24.tool],house.HOUSE_KIT_2024.id);
assert(!/Инструменты узлового писца|Архивный связной/.test(JSON.stringify(house)));
assert.equal(b14.grantsFeat,null);assert(!('abilities' in b14));assert.equal(b14.feature.title,'Жемчужный узел');
assert.equal(b24.equipment.items.reduce((n,x)=>n+x.quantity*x.unitCostCp,0)+b24.equipment.coinsCp,5000);
assert.equal(b24.equipment.alternativeCp,5000);
assert.equal(b24.grantedItems.length,1);assert.equal(b24.grantedItems[0].id,'magic-pearl-knot');
assert.deepEqual(f.grantedItems,['magic-pearl-knot']);
assert(!b24.equipment.items.some(x=>x.id==='magic-pearl-knot'),'gift must not be priced as mundane gear');
assert(b24.grantedItems[0].note.includes('при любом выборе'));
assert(b14.feature.text.includes('один Жемчужный узел'));
assert.equal(b24.equipment.items[0].id,'tool-knot-writing-kit');
for(const [kit,catalogue] of [[house.HOUSE_KIT_2024,equipment24],[house.HOUSE_KIT_2014,equipment14]]){
 assert.deepEqual(catalogue.find(x=>x.id===kit.id),kit);
 assert.equal(kit.cost,'10 зм');assert.equal(kit.kit.contents.length,5);
 assert.equal(kit.kit.proficiency.tasks.length,4);assert.equal(kit.kit.supplies.length,1);
}
for(const item of [house.HOUSE_MAGIC_ITEM_2024,house.HOUSE_MAGIC_ITEM_2014]){
 assert.equal(item.rarity,'unknown');assert.equal(item.source,'TVV');
 const text=JSON.stringify(item);
 assert(text.includes('10 минут'));assert(text.includes('Прерванное исследование начинают заново'));
 assert(text.includes('Узел многоразовый'));assert(text.includes('одного предмета или существа'));
 assert(!/опознание|identify|spellGrants|spell-identify/iu.test(text));
}
assert.equal(magic14.find(x=>x.id==='magic-pearl-knot'),house.HOUSE_MAGIC_ITEM_2014);
const magic24=[house.HOUSE_MAGIC_ITEM_2024,...JSON.parse(fs.readFileSync('public/data/dnd55e/magic-items-2024.json')).items];
assert.equal(new Set(magic24.map(x=>x.id)).size,magic24.length);
assert(fs.readFileSync('app/pages/dnd55e/magic-items/index.vue','utf8').includes('[HOUSE_MAGIC_ITEM_2024, ...(magicItemsData.value?.items || [])]'));
const routes=new Map([
 ['/dnd55e/backgrounds',['background',backgrounds24]],['/dnd5e/backgrounds',['bg',backgrounds14]],
 ['/dnd55e/feats',['feat',feats24]],['/dnd55e/equipment',['item',equipment24]],['/dnd5e/equipment',['e',equipment14]],
 ['/dnd55e/magic-items',['item',magic24]],['/dnd5e/magic-items',['m',magic14]]
]);
let links=0;
function visit(value){
 if(Array.isArray(value)){const paths=value.filter(x=>x?.path).map(x=>x.path);assert.equal(new Set(paths).size,paths.length,'duplicate related link');value.forEach(visit);return;}
 if(!value||typeof value!=='object')return;
 if(value.path){const url=new URL(value.path,'http://localhost');const target=routes.get(url.pathname);assert(target,value.path);assert(target[1].some(x=>x.id===url.searchParams.get(target[0])),value.path);links++;}
 Object.values(value).forEach(visit);
}
visit(house);assert(links>=10);
const result={status:'PASS',date:'2026-10-30',backgrounds2024:backgrounds24.length,backgrounds2014:backgrounds14.length,feats2024:feats24.length,feats2014:feats14.length,priorBackgroundsPreserved:before.backgrounds2024.length+before.backgrounds2014.length,checkedLinks:links,kitBudgetCp:5000,browserLayout:'separate check',playtest:false,remoteDeployment:false};
fs.writeFileSync(root+'verification.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
