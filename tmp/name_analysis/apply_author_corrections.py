from pathlib import Path
import json,re,unicodedata
root=Path.cwd();base=Path('C:/EnoaTranscripts/Campaign_KB/name_constructor')
p=root/'app/data/raceNameGenerators.js';s=p.read_text(encoding='utf-8');marker='export const RACE_NAME_GENERATORS = ';prefix=s[:s.index(marker)];data=json.loads(s.split(marker,1)[1]);rolls=json.loads(re.search(r'export const NAME_ROLLS = (\[.*?\])',prefix).group(1))
kb=json.loads((base/'constructors.json').read_text(encoding='utf-8'))
Path('tmp/name_analysis/corrections-before.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
norm=lambda n:''.join(c for c in unicodedata.normalize('NFKC',n).casefold().replace('ё','е') if c.isalnum())
fold=lambda n:unicodedata.normalize('NFKC',n).casefold().replace('ё','е').replace('’',"'")
corpus=[fold(r['text']) for r in json.loads((base/'collision_corpus.json').read_text(encoding='utf-8'))]
used={norm(n) for ts in data.values() for t in ts for n in (t.get('names') or t['m']+t['f'])}
anchors=['Шида',"Саф'Харул",'Тцафах',"Маль'Так"]
used.update(map(norm,anchors))
for t in data['udrishi']:used.update(map(norm,t['examples']))
groups=[
('Урма','Арви Тарке Варке Лерко Нарке Райке Далке Алви Энри Ламке Мелви Марви Олми Улке Кэлви Венри Арко',
 'Дэрко Кэрви Элко Тарви Мэрке Олке Нэлко Арден Лэри Рэмко Нэрко Ивке Айлер Эндри Урден Вэлко Марко Рэлви Тэрко Элден Нарви Дэрви Тэлко',
 'Эрна Лирна Арла Мэрна Кайна Тэлма Шарна Ирла Нэлма Вэрна Ольна Эвна Лэлма Рэвна Ульна Нирла Кэрла Элра Аэрна Вэлма Орна'),
('Эрил','Кадумбо Талундо Керст Гануро Лурт Туранго Нирам Гарундо Мандоро Нэрт Далуро Дунор Сенгури Керун Равундо Дорумбо Арэндо',
 'Дарунбо Калундо Нагуру Гунардо Рурондо Лануро Талумбо Кагуро Дулондо Намуро Гурондо Кавурдо Нарумбо Дэрст Лумар Гардо Урамдо Кунаро Ворундо Дануро Аргумбо',
 'Налурма Мируна Калума Дурума Ирумба Наруру Лурима Гаруми Сарума Арумба Неруми Ралума Умарана Ланума Керуми Далума Варуми Анурма Тамуна Рулума Сенума'),
('Пйюр-Пйюр','Ним-Ним Рун-Рун Нор-Нор Рем-Рем Тир-Тир НимНам РумРам КирКур НорНар РинРун ДинДан ЗирЗар МирМур ДорДар ГурГар РунРон ТурТар',
 'Дар-Дар Дум-Дум Кер-Кер Гир-Гир Зун-Зун Вор-Вор Кун-Кун Дур-Дур Нер-Нер Тум-Тум Бур-Бур КорКар ДумДам КерКар ГирГар ЗунЗан ВорВар КунКан ДурДар НерНар',
 'Лин-Лин Шен-Шен Лир-Лир Мел-Мел Вен-Вен Шим-Шим Лем-Лем Син-Син Фен-Фен ЛинЛан МелМал ВенВан ШимШам СинСан ФенФан ЛунЛан ШелШал ШирШур ЛимЛам')]
rejected=[]
for label,old_m,new_m,new_f in groups:
 t=next(t for t in data['udrishi'] if t['label']==label);old=t.pop('names');m=old_m.split();assert len(m)==17 and set(m)<=set(old);f=[n for n in old if n not in m];assert len(f)==18
 for target,candidates in [(m,new_m.split()),(f,new_f.split())]:
  for n in candidates:
   pattern=re.compile(r'(?<!\w)'+re.escape(fold(n))+r'(?!\w)')
   if norm(n) in used or any(pattern.search(txt) for txt in corpus):rejected.append(n);continue
   target.append(n);used.add(norm(n))
   if len(target)==35:break
  assert len(target)==35,(label,len(target))
 t['m']=m;t['f']=f;t['recommended']={'m':m[:4],'f':f[:4]};t['genderAssignment']='editorial_proposal_author_examples_sex_unspecified'
 t['hint']+=' Мужские и женские варианты распределены редакторски; авторские образцы остаются ориентирами.'
# Replace every natural-language image in the female fourth segment, not just the three examples.
nature={'Малахит':'Маллар','Скала':'Грумма','Гром':'Тарум','Озеро':'Уллама','Ветер':'Зарума','Снег':'Оммар','Ручей':'Лагума','Камень':'Арума','Туман':'Хурума','Ливень':'Рамуга','Обвал':'Гарума','Иней':'Иллума'}
jab=data['jabari'][0]
def replace_nature(n):
 for a,b in nature.items():n=n.replace(' '+a+'-',' '+b+'-')
 return n
jab['f']=[replace_nature(n) for n in jab['f']];jab['recommended']['f']=[replace_nature(n) for n in jab['recommended']['f']]
jab['hint']='Полное имя составляется из именных частей. Четвёртая часть женского имени продолжает имя; буквальные русские названия природы не вставляются. В скобках — короткое обращение.'
oy=data['oyrdugi'][0];oy['worldPool']=True;oy['hint']='Ойрдуг может быть представителем любой расы и носить любое имя мира. Генератор выбирает из общего пула всех включённых рас и дополнительных человеческих вариантов; собственного обязательного именника нет.';oy['reviewStatus']='world_pool_any_race';oy['recommended']={'m':['Талундо','Мирзад','Шторвак'],'f':['Керна','Нимала','Хэнира']}
for ts in data.values():
 for t in ts:
  if t['label'] in ['Пепельные','Янтарные','Драгмирцы']:
   t['examples']=list(dict.fromkeys(t.get('examples',[])+anchors[:3]));t['exampleGenders']={'Шида':'F',"Саф'Харул":'M','Тцафах':'M'}
   t['hint']+=' Общие маракийские образцы: Шида (жен.), Саф\'Харул и Тцафах (муж.); их подраса не уточнена.'
  if t['label']=='Морхоры':
   t['examples']=list(dict.fromkeys(t.get('examples',[])+[anchors[3]]));t['hint']+=" Маль'Так — авторский образец с внутренней границей; пол отдельно не уточнён."
# Native Vetu parts already exist in the knowledge base; expose the complete Cycle pool for Oyrdugs.
parts={'prefixes':[r['value'].replace("'",'’') for r in kb['vetu_table']['prefixes']], 'signs':[r['value'] for r in kb['vetu_table']['signs']]}
prefix=prefix.replace('Имена удришей — общий список names.', 'Удриши имеют мужские и женские списки; распределение новых форм редакторское.')
p.write_text(prefix+marker+json.dumps(data,ensure_ascii=False,indent=2)+'\n\nexport const VETU_NAME_PARTS = '+json.dumps(parts,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
# Update Markdown sections from the same data, preserving all unrelated prose.
p=root/'NAME_GENERATORS.md';md=p.read_text(encoding='utf-8');md=md.replace('У удришей один общий список из 35 имён: пол не выводится из авторских образцов.','У удришей по 35 мужских и женских предложений; это редакторское распределение, пол прежних авторских ориентиров не выводится из звучания.')
md=re.sub(r'\*\*Женское имя\*\* собирается.*?(?=\n\n)', '**Женское имя** собирается из именных частей: **[А]’[Б]-[В] [Г]-[Д]**. Четвёртая часть продолжает обычное имя, а не обозначает природу русским словом. Примеры: Маллар, Грумма, Лагума. Образные переводы старых примеров не являются обязательными частями написания. Короткое обращение указывается отдельно.',md)
md=re.sub(r'(?<=## Ойрдуги\n\n)\*\*Правило\.\*\*.*?(?=\n\n)', '**Правило.** '+oy['hint']+' Ниже — дополнительная выборка человеческих имён, а не ограничение. На сайте используется весь общий пул, включая формы Вету Цикла. Ойрдугское имя может совпадать по культурному типу с именами любой другой расы.',md)
for label in ['Урма','Эрил','Пйюр-Пйюр']:
 pat=r'(### '+re.escape(label)+r'\n)(.*?)(?=\n(?:## |### |---)|\Z)';match=re.search(pat,md,re.S);assert match,label
 section=match.group(2);rule=section.split('| 4к4')[0].strip();rule=re.sub(r'Пол новых образцов[^.]*\.[^.]*\.', '',rule);rule=re.sub(r'Пол новых образцов не задан; список общий\.', '',rule);rule=re.sub(r'Пол не выводится из звучания\.', '',rule)
 rule+=' Мужские и женские новые варианты распределены редакторски по прямому запросу автора; это не восстановленный закон окончаний.'
 t=next(t for t in data['udrishi'] if t['label']==label)
 rows=['| 4к4 | шанс | ♂ | ♀ |','|---|---|---|---|']
 import math
 for i,roll in enumerate(rolls):
  weight=24
  for num in set(roll.split()):weight//=math.factorial(roll.split().count(num))
  rows.append(f"| {roll} | {weight}/256 | {t['m'][i]} | {t['f'][i]} |")
 md=md[:match.start(2)]+'\n'+rule+'\n\n'+'\n'.join(rows)+'\n'+md[match.end(2):]
md=replace_nature(md)
md=md.replace('**Правило.** Имя морхора', "**Правило.** Авторский образец Маль'Так допускает составную форму с внутренней границей. Имя морхора")
md=md.replace('## Маракийцы\n','## Маракийцы\n\nАвторские дополнения: **Шида — женское**, **Саф\'Харул и Тцафах — мужские**. Подраса не уточнена: короткая форма, апострофная составная форма и начало тц допустимы в общем маракийском репертуаре; они не назначаются всем подрасам как обязательный шаблон.\n')
p.write_text(md,encoding='utf-8')
Path('tmp/name_analysis/corrections-current.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8');Path('tmp/name_analysis/corrections-rejected.json').write_text(json.dumps(rejected,ensure_ascii=False),encoding='utf-8')
print(json.dumps({'udrish_names':210,'rejected':rejected},ensure_ascii=False))
