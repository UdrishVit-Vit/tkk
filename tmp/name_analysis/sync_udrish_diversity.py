from pathlib import Path
import json,re
base=Path('C:/EnoaTranscripts/Campaign_KB/name_constructor');revision=json.loads(Path('tmp/name_analysis/udrish-diversity-review.json').read_text(encoding='utf-8'));tables={t['label']:t for t in revision['tables']}
p=Path('UDRISH_NAMES.md');s=p.read_text(encoding='utf-8');s=s.replace('Бытовая проба: «Джуф починил настил», «Кимбара уже вернулась», «Позови Термину» — последняя проба выявляет риск сокращения и перестановки звуков в Терумина. Поэтому для частого обращения в небольшой партии более устойчивыми считаю Намби и Кимбара. Терумина остаётся допустимым длинным вариантом, но не объявляется автоматически удобнее коротких.', 'Бытовая проба: «Джуф починил настил», «Кимбара уже вернулась», «Позови Термину» здесь не используется: выбранное имя — Терумина, и при проверке важно сохранять его слоги. Для частого обращения в небольшой партии редакторски предпочитаю Намби и Кимбара. Терумина остаётся допустимым длинным вариантом, без утверждения, что слушатели обязательно будут его путать.');s=s.replace('«Позови Термину» здесь не используется: выбранное имя — Терумина, и при проверке важно сохранять его слоги.', '«Позови Термину»',1) if False else s
# Keep the example clean rather than make a fictional mishearing part of the test.
s=s.replace('«Джуф починил настил», «Кимбара уже вернулась», «Позови Термину» здесь не используется: выбранное имя — Терумина, и при проверке важно сохранять его слоги.', '«Джуф починил настил», «Кимбара уже вернулась», «Позови Термину» здесь не используется. Для выбранного имени реплика — «Позови Терумину»; при чтении важно сохранить его слоги.')
s=s.replace('«Позови Термину» здесь не используется. Для выбранного имени реплика — «Позови Терумину»; при чтении важно сохранить его слоги.', '«Позови Терумину». При чтении длинного имени важно сохранить все его слоги.');p.write_text(s,encoding='utf-8')
p=Path('NAME_REVIEW.md');s=p.read_text(encoding='utf-8');a=s.index('## Отбор удришских имён\n');b=s.index('\n## Земные источники',a)
section='''## Отбор удришских имён

Урма и Эрил пересмотрены: заменены 115 из 140 форм, сохранены 25 прежних. Урма сохраняют компактность, но получают закрытые, открытые и плотные начала вместо массовых -ке/-ко/-ви и -на. Эрил используют диапазон от коротких плотных до длинных ритмических форм вместо почти обязательных -до/-бо и -ма. Пйюр-Пйюр сохраняют отдельный конструктор.

| Группа | Мужские предложения | Женские предложения |
|---|---|---|
'''
for label,t in tables.items():section+='| '+label+' | '+', '.join(t['recommended']['m'])+' | '+', '.join(t['recommended']['f'])+' |\n'
# Existing Pyy shortlist is preserved from the current JS, not an older snapshot.
js=Path('app/data/raceNameGenerators.js').read_text(encoding='utf-8');data=json.loads(js.split('export const RACE_NAME_GENERATORS = ',1)[1].split('\n\nexport const VETU_NAME_PARTS = ',1)[0]);pyy=data['udrishi'][2]
section+='| Пйюр-Пйюр | '+', '.join(pyy['recommended']['m'])+' | '+', '.join(pyy['recommended']['f'])+' |\n\nПодробная критика, сравнение до/после и конструктор: [UDRISH_NAMES.md](UDRISH_NAMES.md). Проверка естественности — редакторская; ни статистика буквенных завершений, ни автоматическая уникальность не доказывают засвидетельствованное человеческое употребление.\n';s=s[:a]+section+s[b:];p.write_text(s,encoding='utf-8')
p=Path('NAMES_OGNI_KINGS.md');s=p.read_text(encoding='utf-8');s+='\n### Удриши: пересмотр разнообразия предложений\n\nАвторские ориентиры Урма и Эрил сохранены. Обновлены мужские и женские таблицы: Урма — компактные формы с разными согласными и завершениями; Эрил — короткие плотные, связанные носовые, длинные ритмические и формы с внутренней границей. Заменены 115 из 140 предложений. Это не новые канонические персонажи. [UDRISH_NAMES.md](UDRISH_NAMES.md).\n';p.write_text(s,encoding='utf-8')
# Source race descriptions explain the optional construction without asserting ethnic rules.
for p in [Path('content/dnd5e/races/udrishi.md'),Path('content/dnd55e/species/udrishi.md'),Path('content/pf2e/ancestries/udrishi.md')]:
 s=p.read_text(encoding='utf-8')
 s=s.replace('Имена удришей короткие и звонкие, часто удвоенные: Пйюр-Пйюр, Тик-Тик, Нар, Мешша, Урмаа.', 'Урма чаще используют компактные формы; у Эрил встречаются и короткие плотные, и длинные ритмические имена. Удвоение и перекличка частей характерны для пйюр-пйюр, а не обязательны для всех удришей. Примеры прежнего именника: Пйюр-Пйюр, Тик-Тик, Нар, Мешша, Урмаа.')
 match=re.search(r'(  - title: Имена\n    text: \|-\n.*?)(?=\n  - title: |\ntags:)',s,re.S);assert match,str(p)
 addition='\n\n      Авторские ориентиры Урма: Эрке, Арна, Млака. Эрил: Стафф, Дангудо, Гурурору, Ниам\'Бу. Для новых персонажей Урма можно выбирать компактные формы с разными окончаниями и сочетаниями согласных, а Эрил — короткие плотные, связанные и более длинные ритмические формы. Одно окончание не обязательно для всех мужчин или женщин; пол новых предложений распределён редакторски.\n'
 s=s[:match.end()]+addition+s[match.end():];p.write_text(s,encoding='utf-8')
p=base/'constructors.json';kb=json.loads(p.read_text(encoding='utf-8'))
for pid,label in [('udr_urma','Урма'),('udr_eril','Эрил')]:
 pr=next(pr for pr in kb['profiles'] if pr['id']==pid);t=tables[label];pr['curated_setting_candidates']=t['recommended'];pr['setting_candidate_lists']={'m':t['m'],'f':t['f']};pr['diversity_review']=t['diversityReview'];pr['analysis']=t['hint']+' Национальный земной прототип не установлен; авторские формы не выдаются за реальные имена людей.';pr['formula']='Выбрать разновидность и пол предложения → несколько допустимых ритмов и окончаний → целое имя → проверить близость, повседневное обращение и занятые формы. Для настоящего человеческого имени явно выбрать земной пул.';pr['exception']='Мужские и женские формы распределены редакторски. Авторские образцы и подтверждённые книжные персонажи сохраняют свой статус; новых NPC эта редакция не создаёт.'
p.write_text(json.dumps(kb,ensure_ascii=False,indent=2),encoding='utf-8')
p=base/'АНАЛИЗ_И_КОНСТРУКТОРЫ.md';s=p.read_text(encoding='utf-8')
for pid,label in [('udr_urma','Урма'),('udr_eril','Эрил')]:
 pr=next(pr for pr in kb['profiles'] if pr['id']==pid);pattern=r'^### [^\n]*\(`'+pid+r'`\)\n.*?(?=\n### |\n## |\Z)';match=re.search(pattern,s,re.M|re.S);assert match,pid
 section='### Удриши: '+label+' (`'+pid+'`)\n\n'+pr['analysis']+'\n\n**Конструктор:** '+pr['formula']+'\n\nПредпочтительные мужские предложения: '+', '.join(pr['curated_setting_candidates']['m'])+'. Женские: '+', '.join(pr['curated_setting_candidates']['f'])+'.\n\n[Подробный пересмотр](C:/Projects/ENOA/tkk/UDRISH_NAMES.md).\n\n---\n';s=s[:match.start()]+section+s[match.end():]
p.write_text(s,encoding='utf-8')
print('140 rows, source naming sections and 29-profile knowledge base synchronized')
