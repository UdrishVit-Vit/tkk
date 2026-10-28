// Independent transcription of numeric prices from official Free Rules 2024,
// Equipment, accessed 2026-10-28. Never imports prices from the project catalogue.
import fs from 'node:fs';
const source='https://www.dndbeyond.com/sources/dnd/br-2024/equipment';
const prices={
 'tool-calligraphers-supplies':1000,'gear-book':2500,'gear-holy-symbol':500,'gear-parchment':10,'gear-robe':100,
 'tool-carpenters-tools':800,'gear-pouch':50,'gear-clothes-travelers':200,'tool-forgery-kit':1500,'gear-clothes-fine':1500,
 'gear-costume':500,'weapon-dagger':200,'tool-thieves-tools':2500,'gear-crowbar':200,'tool-musical-instrument':200,
 'gear-mirror-steel':500,'gear-perfume':500,'weapon-sickle':100,'gear-healers-kit':500,'gear-pot-iron':200,'gear-shovel':200,
 'weapon-spear':100,'weapon-light-crossbow':2500,'gear-ammunition':100,'tool-gaming-set':10,'gear-lantern-hooded':500,
 'gear-manacles':200,'gear-quiver':100,'weapon-shortbow':2500,'tool-cartographers-tools':1500,'gear-bedroll':100,'gear-tent':200,
 'weapon-quarterstaff':20,'tool-herbalism-kit':500,'gear-lamp':50,'gear-oil':10,'tool-navigators-tools':2500,'gear-rope':100,
 'gear-tinderbox':50,'gear-blanket':50,'gear-map':100,'gear-waterskin':20,'tool-weavers-tools':100,'gear-case-map-or-scroll':100,
 'gear-grappling-hook':200,'gear-torch':1,'gear-net':100,'gear-flask':2,'tool-cooks-utensils':100,'tool-masons-tools':1000,
 'tool-disguise-kit':2500,'tool-tinkers-tools':5000,'tool-leatherworkers-tools':500,'tool-alchemists-supplies':5000,
 'tool-jewelers-tools':2500,'weapon-handaxe':500,'tool-painters-supplies':1000,'tool-glassblowers-tools':3000,
 'tool-potters-tools':1000,'tool-smiths-tools':2000,'gear-ink':1000,'gear-ink-pen':2,'gear-bottle-glass':200,
 'gear-backpack':200,'gear-rations':50,'gear-vial':100,'tool-woodcarvers-tools':100,'weapon-light-hammer':200,
 'tool-brewers-supplies':2000,'weapon-club':10,'gear-jug':2
};
const d=JSON.parse(fs.readFileSync('reports/enoa-backgrounds/baseline/snapshot.json'));
const variants=new Map();
const packages=d.b24.map(b=>{
 let total=b.equipment.coinsCp,open=[];
 for(const i of b.equipment.items){
  let expected=prices[i.id];
  if(i.id==='tool-musical-instrument'&&!/флейта/.test(i.note||''))throw Error('Unreviewed instrument variant');
  if(i.id==='tool-gaming-set'&&i.note!=='кости')throw Error('Unreviewed game variant');
  if(i.id==='gear-ammunition'&&!/^(стрелы|болты), 20 шт\.$/.test(i.note||''))throw Error('Unreviewed ammunition variant');
  if(expected===undefined)open.push(i.id);else total+=(i.quantity||1)*expected;
  variants.set(i.id+'|'+i.note,{id:i.id,note:i.note||'',localCp:i.unitCostCp,officialCp:expected??null,status:expected===undefined?'HOMEBREW_NO_OFFICIAL_PRICE':expected===i.unitCostCp?'MATCH':'MISMATCH',source:expected===undefined?'AUTHOR_DECISION_REQUIRED':source});
 }
 return {id:b.id,title:b.title,officialTotalCp:open.length?null:total,status:open.length?'PENDING_HOMEBREW':total===5000?'BUDGET_50_GP':'BUDGET_MISMATCH',open};
});
const result={date:'2026-10-28',edition:'2024',source,scope:'Prices and 50 GP arithmetic, not exact PHB package composition',variantRules:'Flute 2 GP; dice 1 SP; arrows/bolts 20 for 1 GP; emblem 5 GP. Lore reskins inherit their stated base item price only.',items:[...variants.values()],packages};
fs.writeFileSync('reports/enoa-backgrounds/official-price-check.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({variants:result.items.length,mismatches:result.items.filter(i=>i.status==='MISMATCH'),packages:packages.reduce((a,p)=>(a[p.status]=(a[p.status]||0)+1,a),{})}));
