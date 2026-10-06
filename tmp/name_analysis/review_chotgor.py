from pathlib import Path
import json,re,unicodedata,math,sys
sys.stdout.reconfigure(encoding='utf-8')
p=Path('app/data/raceNameGenerators.js');js=p.read_text(encoding='utf-8');marker='export const RACE_NAME_GENERATORS = ';before,tail=js.split(marker,1);raw,after=tail.split('\n\nexport const VETU_NAME_PARTS = ',1);data=json.loads(raw);rolls=json.loads(re.search(r'export const NAME_ROLLS = (\[.*?\])',before).group(1));old=data['chotgory'][0]
base=Path('C:/EnoaTranscripts/Campaign_KB/name_constructor');corpus=json.loads((base/'collision_corpus.json').read_text(encoding='utf-8'));reserved=json.loads((base/'reserved_names.json').read_text(encoding='utf-8'))
norm=lambda s:''.join(c for c in unicodedata.normalize('NFKC',s).casefold().replace('ё','е') if c.isalnum());fold=lambda s:unicodedata.normalize('NFKC',s).casefold().replace('ё','е').replace('’',"'")
occupied={norm(n) for slug,ts in data.items() if slug!='chotgory' for t in ts for n in (t.get('names') or t['m']+t['f'])};occupied.update(r['normalized'] for r in reserved)
texts=[fold(r['text']) for r in corpus];forms=['Короткий жест','Звучный отклик','Перехват дыхания','Развёртывание','Две опоры']
candidates={
'm':[
'Урх Нэрх Улх Дрэх Шорг Гулх Хэмр Орхэл Нэрк',
'Вуран Хэлун Рэнух Хоррэн Нэвур Мурэн Ирхун Вэрун Хурун',
'Арх’Ун Нор’Эш Кэр’Ум Ох’Тар Ун’Рах Тор’Эн Эш’Ур Ар’Хум Ур’Нэх',
'Эйрх Арух Хаур Раух Эрум Нурэх Хруэн Эйрун Уруэх',
'Тхавур Вэрон Тумэр Тхорум Вор’Аш Ор’Вэн Хэрмун Вурхэн Тхэрум'],
'f':[
'Вэши Нэйт Суэна Ойша Илкэ Лиуна Элуи Элькэ Нирэ',
'Илэй Хиэль Лиэс Умэй Нэсэль Ируэль Нувэль Илайэ Фэлуи',
'Аур’Шен Эй’Лун Лэ’Ви Ши’Наэ Вэ’Луна Шэ’Уна Сэй’Ри Уэ’Лин Эт’Шаи',
'Фэруа Эссаи Авиэс Нэруи Аэви Фиэла Вуэна Уиэла Сэруи',
'Сэлуна Шэрина Хавиэль Лахэя Ушэна Хэ’Лиэн Шайэль Нэлуэн Вэлири']}
new={};kinds={};reject=[]
for gender,batches in candidates.items():
 new[gender]=[];kinds[gender]=[]
 for form,batch in zip(forms,batches):
  selected=[]
  for name in batch.split():
   pattern=re.compile(r'(?<!\w)'+re.escape(fold(name))+r'(?!\w)')
   if norm(name) in occupied or any(pattern.search(txt) for txt in texts):reject.append(name);continue
   selected.append(name);occupied.add(norm(name))
   if len(selected)==7:break
  assert len(selected)==7,(gender,form,selected)
  new[gender]+=selected;kinds[gender]+=[form]*7
old.update(new);old['nameForms']=kinds;old['examples']=['Тхуч'];old['genderAssignment']='editorial_sound_registers_not_canonical_sex_rule';old['reviewStatus']='authored_chotgor_sound_addresses';old['columnLabels']={'m':'Мужское','f':'Женское'}
old['recommended']={'m':[new['m'][i] for i in [1,7,8,14,28,9]],'f':[new['f'][i] for i in [7,1,8,14,28,2]]};old['hint']='Чотгоры не проходят наречения: здесь мужские и женские звуковые обращения. Их различают по ритму, опорам голоса и перехвату дыхания. Короткие, звучные, прерывистые и плавные формы встречаются в обеих колонках; это редакторские предложения, а не строгий закон пола.'
p.write_text(before+marker+json.dumps(data,ensure_ascii=False,indent=2)+'\n\nexport const VETU_NAME_PARTS = '+after,encoding='utf-8')
p=Path('NAME_GENERATORS.md');md=p.read_text(encoding='utf-8');a=md.index('## Чотгоры\n');b=md.index('\n---',a)
section='''## Чотгоры

**Правило.** Чотгоры сохраняют традицию не нарекать детей. Для игры используются устойчивые звуковые обращения, по которым конкретного чотгора узнают и зовут. **Тхуч** остаётся авторским ориентиром, а не новым вариантом для повторного наречения.

**Рабочее расширение.** Обращение имеет собственный рисунок: короткий жест, звучный отклик, перехват дыхания, плавное развёртывание либо две ритмические опоры. Апостроф отмечает короткий перехват, не род и не фамилию. Мужские формы чаще плотнее и ниже по редакторскому замыслу; женские чаще подвижнее и плавнее. Это предпочтения списков, не запрет согласных или характеристика любого мужского/женского голоса. Нельзя механически заменять все слоги на тх/кх или ш/с.

Обе колонки содержат по семь вариантов каждого типа, от коротких до многосложных. Различимость строится на разных ритмах, а не на одной заменённой гласной. Культурная модель и произношение: [CHOTGOR_NAMES.md](CHOTGOR_NAMES.md).

| 4к4 | шанс | Мужское | Женское |
|---|---|---|---|
'''
for i,roll in enumerate(rolls):
 weight=24//math.prod(math.factorial(roll.split().count(n)) for n in set(roll.split()));section+=f"| {roll} | {weight}/256 | {new['m'][i]} | {new['f'][i]} |\n"
md=md[:a]+section+md[b:];p.write_text(md,encoding='utf-8')
Path('tmp/name_analysis/chotgor-review.json').write_text(json.dumps({'table':old,'rejected':reject,'new_names_checked':70},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'recommended':old['recommended'],'rejected':reject},ensure_ascii=False,indent=2))
