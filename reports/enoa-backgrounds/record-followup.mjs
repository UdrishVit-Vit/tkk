import fs from 'node:fs';
import crypto from 'node:crypto';
const root='reports/enoa-backgrounds/';
for(const file of ['00_inventory.md','02_lore_and_prose_audit.md','00_gaps.md']) {
 let s=fs.readFileSync(root+file,'utf8');
 s=s.replace('Для 52 записей есть точечные первичные/авторские опоры (3 с конфликтом, 49 с частичной сверкой), для 25', 'Для 59 записей есть точечные опоры, включая внутренние материалы сайта (3 с конфликтом, 56 с частичной сверкой), для 18');
 s=s.replace('Проверенные опоры записаны по каждой из 52 карточек; в остальных 25 стоит UNKNOWN. В 52 также остаются непроверенные частные подробности.', 'Проверенные опоры записаны у 59 карточек; в остальных 18 стоит UNKNOWN. В 59 также остаются непроверенные частные подробности. Четыре новые опоры — LOCAL_CATALOG, внутренняя согласованность опубликованных материалов проекта; они не заменяют независимый первоисточник. Подробности продолжения: [08_evidence_followup](08_evidence_followup.md).');
 s=s.replace('атрибуция 25 записей и остаточных тезисов 52','атрибуция 18 записей и остаточных тезисов 59');
 s=s.replace('Корень сайта доступен; web-карточки дали ошибку, IAB timed out. Локальные данные/SSR/сборка проверены', 'Публичный каталог 73/73, карточка М’лаха и переход к набору проверены. Затем browser.user is unavailable; мобильный вид, поиск и deployed revision не проверены. См. 08_evidence_followup.md');
 s=s.replace('Basic Rules 2014 открыты, страницы полных отдельных черт не получены.', 'Basic Rules 2014 открыты; официальные Lucky /29-lucky и Skilled /44-skilled ведут к покупке PHB 2014, полные тексты не получены.');
 fs.writeFileSync(root+file,s);
}
const paths=['content/dnd55e/species/virmorozhdennye.md','content/dnd55e/species/udrishi.md','app/data/loreGlossary.js'];
fs.writeFileSync(root+'followup-source-hashes.json',JSON.stringify({date:'2026-10-28',purpose:'Дополнительные локальные опоры; исходный baseline не заменён',files:Object.fromEntries(paths.map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]))},null,2)+'\n');
