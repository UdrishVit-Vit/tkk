from pathlib import Path
import json,re,unicodedata,math,sys
sys.stdout.reconfigure(encoding='utf-8');base=Path('C:/EnoaTranscripts/Campaign_KB/name_constructor');p=Path('app/data/raceNameGenerators.js');s=p.read_text(encoding='utf-8');prefix,tail=s.split('export const RACE_NAME_GENERATORS = ',1);raw,suffix=tail.split('\n\nexport const VETU_NAME_PARTS = ',1);data=json.loads(raw);t=data['chotgory'][0]
old=json.loads(json.dumps(t));Path('tmp/name_analysis/chotgor-second-before.json').write_text(json.dumps(t,ensure_ascii=False,indent=2),encoding='utf-8')
rejected_by_author=['Нэйт','Нэсэль','Ируэль','Нувэль','Эй’Лун','Лэ’Ви','Вэ’Луна']
replacements={
 'm':{'Гулх':['Хурт','Хурк'],'Хэмр':['Ухт','Урхт'],'Вуран':['Урхум','Хурэм'],'Хэлун':['Харух','Хэрух'],'Нэвур':['Нэхар','Нохэр'],'Мурэн':['Рухан','Рухэн'],'Вэрон':['Шэхур','Шэрхун'],'Тумэр':['Кхорэн','Кхэрон'],'Вор’Аш':['Хэ’Рух','Шор’Ух'],'Ор’Вэн':['Охрун','Охрэн']},
 'f':{'Нэйт':['Хисса','Хиссэ'],'Лиуна':['Шэни','Шэна'],'Илэй':['Шуэ','Шуэх'],'Хиэль':['Хиэш','Хиэс'],'Умэй':['Умэ','Ушэ'],'Нэсэль':['Сэнха','Сэхна'],'Ируэль':['Хэшуа','Хэшэа'],'Нувэль':['Нэши','Нэсхи'],'Эй’Лун':['Уш’Са','Ус’Шэ'],'Лэ’Ви':['Хи’Сэ','Хэ’Си'],'Вэ’Луна':['Эс’Шуа','Эш’Суа'],'Аэви':['Уэш','Уиш'],'Фиэла':['Фишэ','Фишуа'],'Сэлуна':['Хиусса','Хиусэ'],'Хавиэль':['Шэсуа','Шасуэ'],'Хэ’Лиэн':['Хэшуна','Хэшунэ'],'Шайэль':['Шиуэ','Шуиэ']}}
norm=lambda n:''.join(c for c in unicodedata.normalize('NFKC',n).casefold().replace('ё','е') if c.isalnum());fold=lambda n:unicodedata.normalize('NFKC',n).casefold().replace('ё','е').replace('’',"'")
occupied={norm(n) for ts in data.values() for tab in ts for n in (tab.get('names') or tab['m']+tab['f'])};occupied.update(r['normalized'] for r in json.loads((base/'reserved_names.json').read_text(encoding='utf-8')));occupied.update(map(norm,rejected_by_author))
texts=[fold(r['text']) for r in json.loads((base/'collision_corpus.json').read_text(encoding='utf-8'))]
accepted={};screened_out=[]
for gender,mapping in replacements.items():
 for previous,candidates in mapping.items():
  for name in candidates:
   pattern=re.compile(r'(?<!\w)'+re.escape(fold(name))+r'(?!\w)')
   if norm(name) in occupied or any(pattern.search(text) for text in texts):screened_out.append(name);continue
   accepted[previous]=name;occupied.add(norm(name));break
  assert previous in accepted,previous
 t[gender]=[accepted.get(n,n) for n in t[gender]]
assert t['m'][0]=='Тхуч' and len(t['m'])==len(t['f'])==35
assert not set(map(norm,rejected_by_author)).intersection(map(norm,t['m']+t['f']))
t['recommended']={'m':['Тхуч','Нэрх',accepted['Вуран'],accepted['Хэлун'],accepted['Мурэн'],accepted['Вэрон'],'Тхавур'],'f':[accepted['Нэйт'],accepted['Нэсэль'],accepted['Ируэль'],accepted['Нувэль'],'Лиэс','Аур’Шен']}
t['rejectedByAuthor']=rejected_by_author;t['editoriallyRetired']=[n for n in accepted if n not in rejected_by_author];t['hint']='Тхуч — первое подтверждённое создателем мужское имя чотгора. Остальные варианты — предложения: цельные звуковые обращения с разным ритмом. Мужские чаще плотнее, женские чаще шипящие и текучие; окончания -эль и искусственные сочетания вроде Вэ’Луна исключены. Апостроф не обязателен.'
p.write_text(prefix+'export const RACE_NAME_GENERATORS = '+json.dumps(data,ensure_ascii=False,indent=2)+'\n\nexport const VETU_NAME_PARTS = '+suffix,encoding='utf-8')
p=Path('NAME_GENERATORS.md');s=p.read_text(encoding='utf-8');a=s.index('## Чотгоры\n');b=s.index('\n---',a);section=s[a:b];rows=list(re.finditer(r'^\| ([1-4](?: [1-4]){3}) \| ([0-9]+/256) \| [^\n]*$',section,re.M));assert len(rows)==35
for i,m in reversed(list(enumerate(rows))):section=section[:m.start()]+f"| {m.group(1)} | {m.group(2)} | {t['m'][i]} | {t['f'][i]} |"+section[m.end():]
section=section.replace('**Рабочее расширение.**','**Новый отбор.** Формы, отклонённые автором, удалены. Предпочтение отдано цельным обращениям без окончаний -эль и прозрачных сочетаний вроде Вэ’Луна.\n\n**Рабочее расширение.**');s=s[:a]+section+s[b:];p.write_text(s,encoding='utf-8')
Path('tmp/name_analysis/chotgor-second-review.json').write_text(json.dumps({'table':t,'replacements':accepted,'screened_out':screened_out,'rejected_by_author':rejected_by_author},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'replacements':accepted,'screened_out':screened_out,'recommended':t['recommended']},ensure_ascii=False,indent=2))
