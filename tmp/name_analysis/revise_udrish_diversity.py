from pathlib import Path
import json,re,unicodedata,collections,difflib,sys
sys.stdout.reconfigure(encoding='utf-8');base=Path('C:/EnoaTranscripts/Campaign_KB/name_constructor');p=Path('app/data/raceNameGenerators.js');s=p.read_text(encoding='utf-8');prefix,tail=s.split('export const RACE_NAME_GENERATORS = ',1);raw,suffix=tail.split('\n\nexport const VETU_NAME_PARTS = ',1);data=json.loads(raw)
old={t['label']:json.loads(json.dumps(t)) for t in data['udrishi'][:2]};Path('tmp/name_analysis/udrish-diversity-before.json').write_text(json.dumps(old,ensure_ascii=False,indent=2),encoding='utf-8')
norm=lambda n:''.join(c for c in unicodedata.normalize('NFKC',n).casefold().replace('ё','е') if c.isalnum());fold=lambda n:unicodedata.normalize('NFKC',n).casefold().replace('ё','е').replace('’',"'")
occupied={norm(n) for race,ts in data.items() for t in ts if t['label'] not in ['Урма','Эрил'] for n in (t.get('names') or t['m']+t['f'])};occupied.update(r['normalized'] for r in json.loads((base/'reserved_names.json').read_text(encoding='utf-8')))
for t in data['udrishi']:occupied.update(map(norm,t['examples']))
texts=[fold(r['text']) for r in json.loads((base/'collision_corpus.json').read_text(encoding='utf-8'))]
proposals={
'Урма':{
'm':('Арви Тарке Варке Лерко Далке Энри Арден Айлер', 'Орт Грен Мэк Рудд Эсси Латто Ишку Валда Пруна Дримо Клум Вэс Ярмо Хальт Усто Келин Маур Нитто Брэм Савек Овран Илмо Тэвик Ондра Арнет Фальк Эмбро Ювек Мико Нерис Вайр Гуло Клас Рэм Яско Вирн Эваль'),
'f':('Эмри Ларка Керна Шани Тавра Ирме Элма Мавра','Ивва Ресси Айно Вэсса Млэна Олли Шуви Нимэ Лаур Сэлт Тэс Ярна Увра Мэлди Киана Дрэя Райси Нэлта Усма Эска Брена Хэйди Алтэ Урса Эйри Велт Энди Ринэ Арси Ильва Эвра Грэни Лэрси Вилма')},
'Эрил':{
'm':('Кадумбо Талундо Керст Лурт','Дагг Джуф Бост Крамм Гурд Стэн Мокаду Бенору Чамбо Ундоро Бурута Шанду Румадого Джунарубо Баругондо Тунгарадо Догаруно Урамбодо Гаруру Нумуду Оромбо Гуррано Бамура Орогуру Ганудар Джа’Рум Нгу’До Ма’Гун Роам’Бу Там’Оро Га’Нур Сурогам Драгуно Фурган Ругарибо Чадарум Эрамого Бонурума Уваргун'),
'f':('Рондума Налумба Иру’Ма Нейрума Дунари','Дэсс Вум Гафи Нумэ Джуна Бэши Намби Абумэ Кимбара Мусэни Джарума Овамэ Вамури Кавиго Терумина Орамиду Нарамуго Банурима Джумарэна Огурамба Тамуори Мирари Нагарара Мумэри Орурума Дуруми Наэ’Му Иам’Ри Воа’Нум Ану’Би Мэ’Руа Гануми Джумана Арамуго Нэруба Дувами Вамбара Орэсса')}
}
selected=[];rejected=[];new_names=[]
def stats(names):
 ends=collections.Counter(norm(n)[-2:] for n in names)
 return {'distinct_endings':len(ends),'most_common_ending':ends.most_common(1)[0],'min_length':min(len(norm(n)) for n in names),'max_length':max(len(norm(n)) for n in names)}
for t in data['udrishi'][:2]:
 label=t['label']
 for gender in ['m','f']:
  retain,candidates=proposals[label][gender];names=retain.split();assert set(names)<=set(old[label][gender])
  selected.extend(names);occupied.update(map(norm,names))
  for name in candidates.split():
   key=norm(name);reason=None
   if key in occupied:reason='occupied_normalized_key'
   else:
    pat=re.compile(r'(?<!\w)'+re.escape(fold(name))+r'(?!\w)')
    if any(pat.search(text) for text in texts):reason='exact_corpus_occurrence'
   near=next((n for n in selected if min(len(norm(n)),len(key))>=4 and abs(len(norm(n))-len(key))<=2 and difflib.SequenceMatcher(None,key,norm(n)).ratio()>=.82),None)
   if not reason and near:reason='too_close_to_selected:'+near
   if reason:rejected.append({'name':name,'profile':label,'reason':reason});continue
   names.append(name);selected.append(name);occupied.add(key);new_names.append(name)
   if len(names)==35:break
  assert len(names)==35,(label,gender,len(names))
  t[gender]=names
 t['diversityReview']={'basis':'author_examples_plus_editorial_word_shapes','before':{g:stats(old[label][g]) for g in ['m','f']},'after':{g:stats(t[g]) for g in ['m','f']}}
 if label=='Урма':
  t['hint']='Урма: компактные имена по образцам Эрке, Арна, Млака. Короткие закрытые формы, открытые окончания и сочетания согласных сосуществуют; -ке/-ко/-ви и женское -на не обязательны. Мужские и женские новые варианты распределены редакторски.'
  t['recommended']={'m':['Арви','Тарке','Рудд','Ишку','Валда','Дримо'],'f':['Эмри','Ларка','Ивва','Ресси','Млэна','Шуви']}
 else:
  t['hint']='Эрил: короткие плотные формы, связанные носовые звуки, длинные имена с меняющимся ритмом и редкие внутренние границы по образцам Стафф, Дангудо, Гурурору, Ниам\'Бу. Нет обязательного -до/-бо у мужчин или -ма у женщин; распределение пола редакторское.'
  t['recommended']={'m':['Керст','Кадумбо','Джуф','Шанду','Румадого','Джа’Рум'],'f':['Налумба','Дэсс','Намби','Кимбара','Терумина','Наэ’Му']}
 for g in ['m','f']:assert set(t['recommended'][g])<=set(t[g]),(label,g,t['recommended'][g])
p.write_text(prefix+'export const RACE_NAME_GENERATORS = '+json.dumps(data,ensure_ascii=False,indent=2)+'\n\nexport const VETU_NAME_PARTS = '+suffix,encoding='utf-8')
# Regenerate only Urma and Eril row blocks; unrelated tables stay untouched.
p=Path('NAME_GENERATORS.md');md=p.read_text(encoding='utf-8')
for t in data['udrishi'][:2]:
 label=t['label'];a=md.index('### '+label+'\n');end=re.search(r'\n(?:### |## |---)',md[a+len(label)+5:]);assert end; b=a+len(label)+5+end.start();section=md[a:b];rows=list(re.finditer(r'^\| ([1-4](?: [1-4]){3}) \| ([0-9]+/256) \| [^\n]*$',section,re.M));assert len(rows)==35,(label,len(rows))
 for i,m in reversed(list(enumerate(rows))):section=section[:m.start()]+f"| {m.group(1)} | {m.group(2)} | {t['m'][i]} | {t['f'][i]} |"+section[m.end():]
 section=re.sub(r'\*\*Правило\.\*\*.*?(?=\n\n)', '**Правило.** '+t['hint']+' Авторские образцы не объявляют земную этничность. Подробный пересмотр: [UDRISH_NAMES.md](UDRISH_NAMES.md).',section,flags=re.S);md=md[:a]+section+md[b:]
p.write_text(md,encoding='utf-8')
report={'tables':data['udrishi'][:2],'new_names':new_names,'rejected':rejected,'retained':140-len(new_names)};Path('tmp/name_analysis/udrish-diversity-review.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'new_names':len(new_names),'retained':report['retained'],'rejected':rejected,'metrics':{t['label']:t['diversityReview'] for t in data['udrishi'][:2]}},ensure_ascii=False,indent=2))
