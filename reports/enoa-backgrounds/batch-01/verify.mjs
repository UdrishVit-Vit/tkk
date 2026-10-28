import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {DND55E_BACKGROUNDS as current} from '../../../app/data/dnd55e/backgrounds.js';
import {BACKGROUNDS_5E as legacy} from '../../../app/data/backgrounds5e.js';
const root='reports/enoa-backgrounds/batch-01/';
const beforeText=fs.readFileSync(root+'backgrounds-2024.before.js','utf8');
const marker='export const DND55E_BACKGROUNDS = ';
const before=JSON.parse(beforeText.slice(beforeText.indexOf(marker)+marker.length,beforeText.indexOf('\n\nexport const DND55E_BACKGROUND_FEATS')).trim());
assert.deepEqual(legacy.map(b=>b.id),['kshaakh-creation','ayur-tamer']);
assert.equal(current.length,73);
for(const b of current){
 const old=before.find(x=>x.id===b.id);assert(old);
 for(const key of ['abilities','skills','tool','equipment','feat'])assert.deepEqual(b[key],old[key],b.id+': mechanic changed '+key);
}
for(const id of ['nagbo','norbu'])assert.equal(current.find(b=>b.id===id).speciesRestriction.id,'virmorozhdennye');
assert(!current.find(b=>b.id==='hakar').variants.some(v=>/Вы дошли|Отвергнут/.test(v.text+' '+v.title)));
const html=fs.readFileSync('.tmpwork/backgrounds-render/BackgroundsPage.html','utf8');
assert.equal((html.match(/Доступно только для/g)||[]).length,2);
assert.equal((html.match(/href="\/dnd55e\/species\/virmorozhdennye"/g)||[]).length,2);
const hashes=JSON.parse(fs.readFileSync('reports/enoa-backgrounds/baseline/hashes.json','utf8'));
const changed=Object.keys(hashes).filter(p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')!==hashes[p]).sort();
assert.deepEqual(changed,['app/components/dnd55e/BackgroundsPage.vue','app/data/backgrounds5e.js','app/data/dnd55e/backgrounds.js']);
const result={status:'PASS',date:'2026-10-28',backgrounds2014:legacy.length,backgrounds2024:current.length,unchanged2024Mechanics:73,sourceFilesChanged:changed,originalAuditBaseline:'Preserved; verify-audit.mjs intentionally rejects changed production sources after this authorized batch'};
fs.writeFileSync(root+'verification.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
