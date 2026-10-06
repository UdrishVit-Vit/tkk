from pathlib import Path
import json,re,csv
root=Path.cwd();base=Path('C:/EnoaTranscripts/Campaign_KB/name_constructor');data=json.loads(Path('tmp/name_analysis/corrections-current.json').read_text(encoding='utf-8'));kb=json.loads((base/'constructors.json').read_text(encoding='utf-8'))
p=Path('NAME_GENERATORS.md');s=p.read_text(encoding='utf-8').replace('Пол новых образцов не указан: для подбора используется один общий список, без выведенных из окончания мужских и женских правил.','Пол прежних авторских образцов не назначается автоматически.');s=s.replace('## Морхоры\n','## Морхоры\n\nАвторский образец **Маль\'Так** показывает внутреннюю границу и самостоятельную вторую часть. Пол образца не уточнён; апостроф не объявляется исключительно женским признаком.\n');s=s.replace('Это вероятность первого броска.', 'Это вероятность первого броска обычной таблицы. Ойрдуги на сайте выбирают равномерно из общего пула мира без 4к4.');p.write_text(s,encoding='utf-8')
p=Path('NAMES_OGNI_KINGS.md');s=p.read_text(encoding='utf-8').replace('эрил не ограничены тремя открытыми слогами;', 'эрил не ограничены тремя открытыми слогами; мужские и женские новые предложения даны в отдельных колонках по запросу автора;');s=s.replace('а у удришей — общий список без назначенного пола.', 'у удришей также по 35 мужских и женских предложений с редакторским распределением пола.')
s += "\n## Авторские дополнения к именнику\n\n- Маракийцы: **Шида — женское**, **Саф'Харул, Тцафах — мужские**. Подраса не уточнена.\n- Морхоры: **Маль'Так**, пол не уточнён.\n- Ойрдуг может быть представителем любой расы и носить любое имя мира; отдельного обязательного человеческого именника нет.\n- В новых женских джабарийских формах четвёртая часть — продолжение имени, а не русское слово о природе. Исторические цитаты не задают правило генерации.\n"
p.write_text(s,encoding='utf-8')
# Correct live race name descriptions in all three editions, without altering mechanics.
for path in [Path('content/dnd5e/races'),Path('content/dnd55e/species'),Path('content/pf2e/ancestries')]:
 for slug in ['jabari','oyrdugi']:
  p=path/(slug+'.md')
  if not p.exists():continue
  s=p.read_text(encoding='utf-8')
  if slug=='jabari':s=re.sub(r'Женские имена: Имена женщин Джабари[^\n]*', 'Женские имена: Полное имя состоит из именных частей. Четвёртая часть продолжает имя и не записывается буквальным русским словом о природе. Для повседневного общения используется короткая форма.',s)
  else:
   s=s.replace('Мужские имена: пока не зафиксированы.', 'Мужские имена: ойрдуг может быть представителем любой расы и носить любое имя этого мира.').replace('Женские имена: пока не зафиксированы.', 'Женские имена: выбираются из именника любой расы; отдельного обязательного ойрдугского именника нет.')
   s=re.sub(r'Особые имена: имена ойрдугов[^\n]*', 'Особые имена: принадлежность к ойрдугам не требует имени, связанного со стигматами, нефритом или Лабиринтом. Дополнительное прозвище возможно по биографии.',s)
  p.write_text(s,encoding='utf-8')
anchors=[('Шида','F'),("Саф'Харул",'M'),('Тцафах','M')]
for pr in kb['profiles']:
 if pr['id'].startswith('udr_'):
  label={'udr_urma':'Урма','udr_eril':'Эрил','udr_pyy':'Пйюр-Пйюр'}[pr['id']];t=next(t for t in data['udrishi'] if t['label']==label)
  pr['analysis']=pr['analysis'].replace('Пол новых образцов не указан: для подбора используется один общий список, без выведенных из окончания мужских и женских правил.','').replace('Пол новых образцов не задан; список общий.','').replace('Пол не выводится из звучания.','')+' Мужские и женские новые предложения распределены редакторски по прямому запросу автора; пол прежних образцов этим не устанавливается.'
  pr['curated_setting_candidates']=t['recommended'];pr['setting_candidate_lists']={'m':t['m'],'f':t['f']};pr['gender_assignment']='editorial_proposal'
 if pr['id'] in ['mara_ash','mara_amber','dragmir']:
  pr['shared_race_author_examples']=[{'name':n,'gender':g,'subrace':None} for n,g in anchors]
  pr['analysis']+=' Авторские общие маракийские примеры: Шида (жен.), Саф\'Харул и Тцафах (муж.). Подраса не уточнена; допускаются короткие, составные и плотные начальные формы, без обязательного шаблона.'
 if pr['id']=='morhor':
  pr['canon']=list(dict.fromkeys(pr['canon']+["Маль'Так"]));pr['analysis']+=" Маль'Так — авторский пример внутренней границы; пол не уточнён. Апостроф не считать исключительно женским признаком."
 if pr['id']=='oyrdug':
  pr['pools']=sorted(set(n['pool'] for n in kb['real_name_bank']));pr['analysis']='По прямому уточнению автора ойрдуг может быть представителем любой расы и носить любое имя мира. Это не отдельная человеческая этническая система имён.';pr['formula']='Любое происхождение → имя из именника соответствующей расы либо любое другое имя мира → общая проверка повторов.';pr['exception']='CLI strict-real выбирает только подтверждённые человеческие основы; сайт использует общий пул всех активных рас, включая Вету Цикла.';pr['curated_setting_candidates']=data['oyrdugi'][0]['recommended'];pr['name_model']='world_pool_any_race'
 if pr['id']=='jabari':pr['analysis']+=' По авторскому уточнению четвёртая часть женского имени продолжает имя и не является буквальным русским словом природы.';pr['curated_setting_candidates']=data['jabari'][0]['recommended']
kb['author_corrections_followup']={'marakiytsy':[{'name':n,'gender':g,'subrace':None} for n,g in anchors],'morhor':{'name':"Маль'Так",'gender':None},'oyrdug':'any_race_any_world_name','udrish_gender_lists':'35 male and 35 female per group, editorial assignment','jabari_female_fourth_segment':'name continuation, no literal nature words'}
(base/'constructors.json').write_text(json.dumps(kb,ensure_ascii=False,indent=2),encoding='utf-8')
# Reserve author references and preserve earlier evidence; no inference of a Marakian subrace.
reserved=json.loads((base/'reserved_names.json').read_text(encoding='utf-8'));norm=lambda s:''.join(c for c in s.casefold().replace('ё','е') if c.isalnum())
for n in [x[0] for x in anchors]+["Маль'Так"]:
 row=next((r for r in reserved if r['normalized']==norm(n)),None)
 if row:row['forms']=list(dict.fromkeys(row['forms']+[n]));row['sources']=list(dict.fromkeys(row['sources']+['Прямое уточнение автора 2026-10-06']))
 else:reserved.append({'normalized':norm(n),'forms':[n],'sources':['Прямое уточнение автора 2026-10-06'],'kind':'author_reference_reserved'})
(base/'reserved_names.json').write_text(json.dumps(reserved,ensure_ascii=False,indent=2),encoding='utf-8')
with (base/'evidence.csv').open('a',encoding='utf-8',newline='') as f:
 w=csv.writer(f)
 for n,g in anchors:w.writerow(['marakian_unassigned_subrace',n,'direct_author_correction','Сообщение автора 2026-10-06',f'Пол: {g}; подраса не уточнена'])
 w.writerow(['morhor',"Маль'Так",'direct_author_correction','Сообщение автора 2026-10-06','Пол не уточнён'])
# Synchronize profile cards rather than leave the previous neutral-list instructions in the report.
p=base/'АНАЛИЗ_И_КОНСТРУКТОРЫ.md';s=p.read_text(encoding='utf-8')
for pid in ['udr_urma','udr_eril','udr_pyy','oyrdug']:
 pr=next(p for p in kb['profiles'] if p['id']==pid)
 pat=r'(### .*?\(`'+pid+r'`\)\n).*?(?=\n### |\n## |\Z)';m=re.search(pat,s,re.S);assert m,pid
 body='\n'+pr['analysis']+'\n\n**Конструктор:** '+pr['formula']+'\n\n**Ограничение:** '+pr['exception']+'\n\nАктуальные таблицы и отбор: [NAME_REVIEW.md](C:/Projects/ENOA/tkk/NAME_REVIEW.md).\n\n---\n'
 s=s[:m.start()]+m.group(1)+body+s[m.end():]
s=s.replace('## Карточки конструкторов','## Авторские уточнения текущей редакции\n\nМаракийские образцы: Шида (жен.), Саф\'Харул и Тцафах (муж.), подраса не уточнена. Морхор Маль\'Так: пол не уточнён. Женская четвёртая часть джабарийского имени продолжает имя, а не обозначает природу буквальным русским словом.\n\n## Карточки конструкторов')
p.write_text(s,encoding='utf-8')
print('Source pages, author evidence and 29 profiles synchronized')
