import fs from 'node:fs';
import assert from 'node:assert/strict';
const file='app/data/dnd55e/backgrounds.js';let text=fs.readFileSync(file,'utf8');
const prefix='export const DND55E_BACKGROUNDS = ',s=text.indexOf(prefix)+prefix.length,e=text.indexOf('\n\nexport const DND55E_BACKGROUND_FEATS',s);
const b=JSON.parse(text.slice(s,e).trim()),old=structuredClone(b),by=id=>b.find(x=>x.id===id);
by('mine-escapee').play='Атлетика и Скрытность отражают тяжёлый труд и опыт побега. «Крепкий» увеличивает запас хитов по правилам черты. История диадемы и способ освобождения не предоставляют дополнительных преимуществ и требуют договорённости с мастером.';
by('huurch').play='История помогает вспоминать сказки и события, Выступление — держать внимание слушателей. «Музыкант» даёт преимущества по правилам черты. Сказитель может играть на свадьбах, рассказывать детям и собирать истории в дороге; он не обязан быть хранителем родовых прав.';
let x=by('white-falcon-watcher');x.enoaLead[1]=x.enoaLead[1].replace('Что вы знали о намерениях Соколов и почему покинули прежние занятия, могло остаться вашей собственной историей.','Как вы относитесь к методам Соколов и какое поручение привело вас в нынешнее путешествие, решаете вы.');
x.hooks.label='Что изменило вашу работу';x.hooks.entries[5].text='Вас отправили собирать сведения далеко от знакомой части сети.';
for(let i=0;i<b.length;i++)if(JSON.stringify(b[i])!==JSON.stringify(old[i])){
 const fmt=x=>JSON.stringify(x,null,2).split('\n').map((l,i)=>i?'  '+l:l).join('\n');assert(text.includes(fmt(old[i])));text=text.replace(fmt(old[i]),fmt(b[i]));
}fs.writeFileSync(file,text);
