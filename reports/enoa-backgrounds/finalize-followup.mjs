import fs from 'node:fs';
const root='reports/enoa-backgrounds/';
let s=fs.readFileSync(root+'review-notes.mjs','utf8').replace('p661–663, гл.44','p661–663, гл.47');
fs.writeFileSync(root+'review-notes.mjs',s);
s=fs.readFileSync(root+'build-audit.mjs','utf8');
s=s.replace("lore_status:isLore?'CONFLICT':sourceChecks[nk]?'PARTIAL_SOURCE_CHECK':'UNKNOWN'", "lore_status:isLore?'CONFLICT':sourceChecks[nk]&&!lore.startsWith('UNKNOWN')?'PARTIAL_SOURCE_CHECK':'UNKNOWN'");
s=s.replace("n.concern,n.proposal,'Сопоставить", "n.concern+(isLore?' Свидетельство: '+lore:''),n.proposal,'Сопоставить");
s=s.replace('это не независимая проверка каждой цены по PHB.', 'независимая сверка стандартных цен выполнена отдельно: reports/enoa-backgrounds/10_official_equipment_review.md. Точный состав PHB и бюджет — разные проверки.');
fs.writeFileSync(root+'build-audit.mjs',s);
for(const file of ['00_inventory.md','02_lore_and_prose_audit.md']) {
 s=fs.readFileSync(root+file,'utf8');
 s+='\n\nПродолжение 28.10.2026: [оставшиеся лорные тезисы](09_remaining_lore_claims.md), [независимые цены](10_official_equipment_review.md), [интерфейс](11_browser_review.md), [решения автора](12_author_decisions.md). Актуальные счётчики — в coverage.json; прежние числа описывают предыдущий проход. Все 18 прежних UNKNOWN разобраны; три остаются без подтверждения центральных тезисов.\n';
 fs.writeFileSync(root+file,s);
}
s=fs.readFileSync(root+'00_gaps.md','utf8');
s=s.replace('Полная каноническая атрибуция 18 записей и остаточных тезисов 59', 'Три центральных UNKNOWN и остаточные тезисы PARTIAL');
s=s.replace('Все пять источников доступны и извлечены; точечно прочитаны релевантные разделы, весь корпус не прочитан. UNKNOWN не означает ложь', 'Все 18 прежних UNKNOWN разобраны; farmer, huurch, lifestone-wright требуют автора. Выявлено расхождение рудников. Точные локаторы в индивидуальных аудитах, решения в отчёте 12');
s=s.replace('Публичный каталог 73/73, карточка М’лаха и переход к набору проверены. Затем browser.user is unavailable; мобильный вид, поиск и deployed revision не проверены. См. 08_evidence_followup.md', 'Повторная проверка: поиск, пустая выдача, PHB 16, Эноа 57, сброс, мобильный экран 390×844, якоря и новая вкладка черты работают. Найдены тесные отступы. Остаточный охват в отчёте 11; deployed revision неизвестен');
s=s.replace('Арифметика 72 комплектов совпала с локальным каталогом, один pending. Локальный каталог может сам содержать ошибку цены', '88 стандартных вариантов независимо совпали с официальной таблицей; 4 авторских без цены. 72 бюджета подтверждены. Из 4 открытых пакетов PHB у Мудреца и Солдата отличаются монеты; остальные 12 составов требуют полного PHB. См. отчёт 10');
fs.writeFileSync(root+'00_gaps.md',s);
