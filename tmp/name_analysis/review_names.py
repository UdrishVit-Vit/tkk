from pathlib import Path
import json,re,unicodedata,hashlib,csv,itertools

ROOT=Path('C:/Projects/ENOA/tkk')
KB=Path('C:/EnoaTranscripts/Campaign_KB/name_constructor')
TMP=ROOT/'tmp/name_analysis'
data=json.loads((TMP/'current-tables.json').read_text(encoding='utf-8'))
kb=json.loads((KB/'constructors.json').read_text(encoding='utf-8'))
old_md=(ROOT/'NAME_GENERATORS.md').read_text(encoding='utf-8')
old_js=(ROOT/'app/data/raceNameGenerators.js').read_text(encoding='utf-8')
(TMP/'review-before.json').write_text(json.dumps({'tables':data,'md':old_md,'js':old_js},ensure_ascii=False,indent=2),encoding='utf-8')
rolls=re.findall(r'"([1-4] [1-4] [1-4] [1-4])"',old_js.split('export const NAME_ROLLS = ')[1].split('\n')[0])
assert len(rolls)==35
def norm(s):return ''.join(c for c in unicodedata.normalize('NFKC',s).casefold().replace('ё','е') if c.isalnum())
def fold(s):return unicodedata.normalize('NFKC',s).casefold().replace('ё','е').replace('’',"'")
corpus=json.loads((KB/'collision_corpus.json').read_text(encoding='utf-8'))
for c in corpus:c['folded']=fold(c['text'])
author={'Урма':['Эрке','Арна','Млака'],'Эрил':['Стафф','Дангудо','Гурурору',"Ниам'Бу"],'Пйюр-Пйюр':['МишМаш','Вит-Вит']}
rules={
'Урма':'Авторские ориентиры: Эрке, Арна, Млака. Короткие компактные имена; допустимы закрытые слоги и сочетания согласных. Повторение и окончания -о/-и не обязательны. Пол новых образцов не указан: для подбора используется один общий список, без выведенных из окончания мужских и женских правил.',
'Эрил':"Авторские ориентиры: Стафф, Дангудо, Гурурору, Ниам'Бу. Есть короткие плотные имена, плавные многосложные и формы с внутренней границей. Три открытых слога — лишь один из возможных типов. Апостроф в Ниам'Бу не объявляется автоматически знаком клана. Пол новых образцов не задан; список общий. Кофу Ва’афна остаётся известным эрилским примером, а Ва’афна — отдельным именем клана.",
'Пйюр-Пйюр':'Авторские ориентиры: МишМаш и Вит-Вит. Две ритмически связанные части: возможны точный повтор или перекличка гласных. Изменять звук обязательно не нужно. Правило о случайности всех имён снято: пара должна произноситься как одно устойчивое имя. Для новых вариантов принята единая запись: точный повтор через дефис, перекличка гласных слитно с двумя прописными. Авторские написания сохраняются. Пол не выводится из звучания.'}
# Deliberate drafts, not fabricated claims of national etymology or real carriers.
candidates={
'Урма':'Эмри Ларка Арви Тарке Керна Энна Варке Шани Тавра Ирме Унна Лерко Нарке Мавра Райке Элма Далке Тирна Алви Энри Ламке Мелви Эйна Марви Армэ Руне Терна Олми Улке Лэнна Ранке Кэлви Венри Умри Орми Арко Нэрви Шарви Тэмна Ерми'.split(),
'Эрил':'Кадумбо Талундо Рондума Малундо Гануро Бурумо Налумба Дорумбо Гарундо Туранго Мандоро Сенгури Ирамбу Норумба Муруди Далуро Кадуро Равундо Тамуро Онгури Ладумба Сурумо Нейрума Харунго Джоруба Арэндо Бамуро Дунари Руамбо Тарудо Уруморо Марарума Орондоро Галурума Муронгоро Терунари Керст Лурт Нэрт Урган Дунор Керун Аргун Нирам'.split()+['Иру’Ма','Ору’На','Аран’До','Веру’Но'],
'Пйюр-Пйюр':'Ним-Ним Рун-Рун Шир-Шир Тен-Тен Нор-Нор Тук-Тук Рем-Рем Тир-Тир Лум-Лум НимНам РумРам ШирШар ТинТан ЛирЛар КирКур НорНар РинРун ДинДан ЗирЗар МирМур ТемТам ДорДар ШенШон ФирФар ЛемЛам ГурГар ВинВен РунРон Нар-Нар Рир-Рир Лон-Лон Тар-Тар Шор-Шор РелРал ТурТар ЛенЛон Рар-Рар ШамШум'.split()}
# Keep varied rhythms among Eril rather than filling the table with one CV pattern.
candidates['Эрил']=['Кадумбо','Талундо','Керст','Рондума','Иру’Ма','Гануро','Лурт','Налумба','Туранго','Нирам','Гарундо','Муруди','Ору’На','Мандоро','Нэрт','Далуро','Онгури','Дунор','Нейрума','Сенгури','Аран’До','Уруморо','Керун','Равундо','Марарума','Веру’Но','Дорумбо','Галурума','Терунари','Дунари','Руамбо','Ладумба','Арэндо','Джоруба','Тамуро','Сурумо','Харунго','Органди']
other_keys={norm(n) for r,ts in data.items() if r not in ['udrishi','oyrdugi'] for t in ts for col in ['m','f','names'] for n in t.get(col,[])}
anchor_keys={norm(n) for a in author.values() for n in a}
new_keys=set()
rejections=[]
def corpus_hits(n):
    pat=re.compile(r'(?<!\w)'+re.escape(fold(n))+r'(?!\w)')
    return [c['source'] for c in corpus if pat.search(c['folded'])][:3]
for t in data['udrishi']:
    accepted=[]
    for n in candidates[t['label']]:
        key=norm(n);hits=corpus_hits(n)
        if key in other_keys|anchor_keys|new_keys or hits:
            rejections.append({'name':n,'profile':t['label'],'reason':'existing_name_or_corpus_occurrence','sources':hits});continue
        if len(accepted)<35:accepted.append(n);new_keys.add(key)
    if len(accepted)<35:raise ValueError((t['label'],'too few candidates',len(accepted),rejections))
    t.pop('m');t.pop('f');t['names']=accepted
    t['examples']=author[t['label']]
    t['hint']={'Урма':'Короткие, живые имена по образцам Эрке, Арна и Млака: подходят и закрытые слоги, и сочетания согласных.','Эрил':"Стафф, Дангудо, Гурурору, Ниам'Бу: рядом живут короткие плотные имена, плавные длинные и формы с внутренней границей.",'Пйюр-Пйюр':'МишМаш и Вит-Вит: две части с общим ритмом, точный повтор или перекличка гласных.'}[t['label']]
    t['reviewStatus']='authored_setting_proposals'
    t['recommended']=accepted[:8]

# Replace the Oyrdug copy of other races' pools with independently attested names.
all_keys={norm(n) for r,ts in data.items() if r!='oyrdugi' for t in ts for col in ['m','f','names'] for n in t.get(col,[])}|anchor_keys
free=[n for n in kb['real_name_bank'] if n['draft_status']=='available_in_checked_corpus' and all(norm(v) not in all_keys for v in n['variants_for_collision'])]
def mix(sex):
    pools={p:[n for n in free if n['gender']==sex and n['pool']==p] for p in sorted({n['pool'] for n in free})}
    ordered=[]
    while any(pools.values()):
        for a in pools.values():
            if a:ordered.append(a.pop(0))
    return ordered
o=data['oyrdugi'][0];o['nameSources']={}
for sex,col in [('M','m'),('F','f')]:
    selected=mix(sex)[:35]
    if len(selected)<35:raise ValueError(('not enough real Oyrdug',sex,len(selected)))
    o[col]=[n['name_ru'] for n in selected]
    for n in selected:o['nameSources'][n['name_ru']]={'original':n['original'],'source':kb['sources'][n['source_id']]['url'],'source_id':n['source_id'],'attestation':'modern_personal_name','pool':n['pool']}
o['hint']='Имя по культуре семьи или воспитания. Здесь собраны настоящие личные имена с отдельными источниками; общего национального именника ойрдугов пока нет.'
o['reviewStatus']='attested_borrowed_names_setting_assignment_proposed'

changes={
('lyudi','Дангунцы'):{'Бабулор':'Байсар'},
('marakiytsy','Пепельные'):{'И’зар':'Захаар'},
('borosy','Боросы'):{'Махрашрэн':'Дармэн','Нэррашрэн':'Нархан'},
('jabari','Джабари'):{'Харуддар-дул-тар-дон (Хардон)':'Харуддар-дул-тар-дан (Хардан)'},
('samaghi','Самагхи'):{'Тамогаг':'Тирнагаг','Карогха':'Ларкагха','Гарофугаг':'Кадумбогаг','Церекугха':'Талундогха','Чохига':'Эмрига','Киросига':'Рондумага','Талафога':'Далурога','Раккогха':'Арвигха','Пахога':'Энрига','Цицуга':'Уннага','Фифагха':'Таврагха','Ханахугаг':'Ирмегаг','Мофинага':'Налумбага','Чафугаг':'Нейрумагаг','Гемусага':'Эйнага','Кесумагха':'Мурудигха'}
}
for (r,label),mapping in changes.items():
    t=next(t for t in data[r] if t['label']==label)
    for col in ['m','f']:
        t[col]=[mapping.get(n,n) for n in t[col]]

recommended={
'Дангунцы':(['Мирзад','Акил','Авилан'],['Нарджан','Канза','Хазира']),
'Бралльцы':(['Тархо','Кандур','Кирро'],['Нимала','Рушма','Вессава']),
'Адаады':(['Аса’бек','Лай’дир','Кара’хаз'],['Шира’мия','Хаба’ина','Мара’зира']),
'Эрх':(['Олзун','Хорсун','Йерден'],['Сесен','Сангэ','Хулара']),
'Сар':(['Ургэн’сар','Тохтар’сар','Шуркэн’сар'],['Сэлма’сар','Кэрма’сар','Тэмра’сар']),
'Омор':(['Чагдар','Чоргон','Чомбур'],['Чунгэ','Чэлтара','Тэвка']),
'Пепельные':(['Каэрим','Харуун','Дилаар'],['Ламиис','Мейра','Сурэя']),
'Янтарные':(['Бахтар','Мехтар','Зейгар'],['Зейла','Задрия','Зульма']),
'Драгмирцы':(['Дархум','Шуркан','Хорзин'],['Тамхира','Хешайра','Харзэна']),
'Вирморождённые':(['Шторвак','Грентор','Гурштер'],['Гварха','Торнэш','Ворнэша']),
'Кобольды':(['Гнук','Цвирк','Дзык'],['Гридди','Цвитти','Грэтти']),
'Чотгоры':(['Тхуч','Кхуш','Отхур'],['Сэвиэ','Шэллэ','Шиэнь']),
'Морхоры':(['Бразан','Ормазид','Мерахур'],['Вельд’а','Ард’а','Харз’а']),
'Аджаиды':(['Нергар','Джарун','Кетар'],['Ирджай','Нушай','Хенис']),
'Боросы':(['Хэндэр','Тархэн','Мардэн'],['Хэнира','Рухина','Тэмира']),
'Джабари':(['Барогуль-гуль-дул-дан (Бардан)','Борадур-дар-ган-гуль-дон (Бордон)','Гарадур-ган-гуль-дул-тар-бал (Гарбал)'],['Груллмарах’Ковала-Рагулла Скала-Гарра’Эну (Ухла)','Бохуррах’Рангатоа-Таббура Ливень-Нарра’Ову (Бурра)','Груллмарах’Ковала-Рагулла Скала-Нарра’Ову (Тамма)']),
'Самагхи':(['Ларкагха','Талундогха','Чогтокгаг'],['Таврагха','Налумбага','Сомага']),
'Эхор’нуры':(['Сау’У','Оан’Ир','Тан’Ул'],['Ша’Ульнур','Оль’Арнур','Иш’Оннур'])
}
for r,ts in data.items():
    for t in ts:
        if t['label'] in recommended:
            a,b=recommended[t['label']];assert all(n in t['m'] for n in a) and all(n in t['f'] for n in b),t['label']
            t['recommended']={'m':a,'f':b}
        t.setdefault('reviewStatus','existing_setting_drafts_with_curated_shortlist')
o['recommended']={'m':o['m'][:3],'f':o['f'][:3]}
data['lyudi'][0]['hint']='Имена разных семей и культур караванного пути. Изудин и Иярдар — отдельные образцы, а не обязательные приставки для всех дангунцев.'
data['marakiytsy'][0]['hint']='Певучие протяжные имена; долгие гласные — один из приёмов этой подборки, а не обязательное правило народа.'
data['morhory'][0]['hint']='Разнородные имена Спиралей. Короткие женские формы с ’а — предложение по образцу Эдр’а, а не установленное правило всех морхорок.'
data['chotgory'][0]['hint']='Чотгоры не получают личных имён. Здесь предлагаются различительные оклики и шёпоты, которыми их могут звать другие.'
data['chotgory'][0]['columnLabels']={'m':'Оклик','f':'Шёпот'}
data['borosy'][0]['hint']='Рокочущие имена по мужским образцам Нармандах и Тардэр. Певучие женские формы и формы со щелчком — рабочие предложения; женских канонических примеров пока недостаточно.'
data['jabari'][0]['hint']='Длинная родная форма и короткое имя для общения. В таблице — авторские предложения; краткое имя не обязано собираться из начала и окончания полного.'
data['ehornur'][0]['hint']='Предложения по образцам Ятх’У и Ша’Эннур: две слышимые части. Разница мужских и женских окончаний пока гипотеза.'

# Mathematical frequencies for the initial roll. Subsequent rolls are conditional on unused rows.
def multiplicity(roll):
    import math,collections
    result=24
    for n in collections.Counter(roll.split()).values():result//=math.factorial(n)
    return result
def table_md(t):
    cols=t.get('columnLabels',{'m':'♂','f':'♀'})
    neutral='names' in t
    out=['| 4к4 | шанс | Имя |' if neutral else f'| 4к4 | шанс | {cols["m"]} | {cols["f"]} |','|---|---|---|' if neutral else '|---|---|---|---|']
    for i,roll in enumerate(rolls):
        out.append(f'| {roll} | {multiplicity(roll)}/256 | {t["names"][i]} |' if neutral else f'| {roll} | {multiplicity(roll)}/256 | {t["m"][i]} | {t["f"][i]} |')
    return '\n'.join(out)
md=old_md
for r,ts in data.items():
    for t in ts:
        heading=('### ' if r in ['lyudi','hudduliny','marakiytsy','udrishi'] else '## ')+t['label']
        pat=re.compile(r'(?m)^'+re.escape(heading)+r'\n(.*?)(?=^#{2,3} |\Z)',re.S|re.M)
        match=pat.search(md)
        assert match,t['label']
        body=match.group(1)
        body=re.sub(r'(?m)^\| 4к4 \| шанс \|.*?\n(?:\|.*\n?)+',table_md(t)+'\n',body,count=1)
        if r=='udrishi':
            body=re.sub(r'\*\*Правило\.\*\*.*?(?=\n\n\|)', '**Правило.** '+rules[t['label']],body,flags=re.S,count=1)
        for n,m in changes.get((r,t['label']),{}).items():body=body.replace(n,m)
        if r=='oyrdugi':body=re.sub(r'\*\*Правило\.\*\*.*?(?=\n\n\|)','**Правило.** Ойрдуг получает имя по культуре семьи или воспитания. У народа пока нет отдельной доказанной национальной системы имён. В таблице — целые настоящие имена с реальными носителями; источники сохранены в `nameSources` таблицы JS и в [редакторском разборе](NAME_REVIEW.md). Запись в таблице не делает эти имена новыми каноническими персонажами.',body,flags=re.S,count=1)
        md=md[:match.start(1)]+body+md[match.end(1):]
md=md.replace('Черновик от 2026-10-05, на утверждение автору.','Рабочая редакция от 2026-10-06. Авторские корректировки удришей учтены; новые варианты остаются предложениями.')
md=md.replace('в каждой таблице по 35 мужских и 35 женских имён.','в обычных таблицах по 35 вариантов на столбец. У удришей один общий список из 35 имён: пол не выводится из авторских образцов.')
md=md.replace('- Все имена проверены на повторы внутри и между таблицами и на совпадения с лором сайта и текстами обеих книг.','- Проведена повторная проверка: одинаковые формы и краткие имена джабари не дублируются между активными таблицами. Совпадения с персонажами, примерами страниц и близкие созвучия учитываются отдельно; это не доказательство реального употребления всех черновых имён.\n- Авторские образцы Эрке, Арна, Млака; Стафф, Дангудо, Гурурору, Ниам\'Бу; МишМаш, Вит-Вит хранятся как ориентиры и не выдаются повторно новым персонажам.\n- Меридиры, огры, драконы и вирмы, колоссы и вету-изгнанники исключены из рабочего пула. Вирморождённые и вету Цикла сохранены.\n- Настоящие имена с источниками и естественные авторские формы ЭНОА различаются. Подробная критика и отбор: [NAME_REVIEW.md](NAME_REVIEW.md).\n- Сайт не повторяет уже показанные имена в пределах открытого блока генератора. После перезагрузки этот временный учёт начинается заново; постоянная уникальность требует общего реестра персонажей.')
md=md.replace('Изгнанники, живущие вне народа Вету, носят любое имя вне Цикла — так в каноне названы Хагах и Могой.','В этом рабочем пуле используются только имена Вету по Циклу.')
md=md.replace('часто начинается на Из- или Ия-','может начинаться на Из- или Ия-')
md=md.replace('главная примета — двойная гласная','один из редакторских приёмов — двойная гласная')
md=md.replace('Апостроф, как у генерала А’за’ала, встречается редко и только в одном месте имени.','Апостроф — отдельный приём; А’за’ал содержит два, поэтому правило «только один» не подтверждено.')
md=md.replace('Женские строятся как короткий корень + ’а — по единственному образцу Эдр’а.','Женские формы «короткий корень + ’а» в этой таблице — гипотеза по единственному образцу Эдр’а, а не установленный закон именования.')
md=md.replace('а короткое — **начало + окончание**','а короткое в этой подборке часто использует **начало + окончание**; это редакторский приём, не обязательный закон')
md=md.replace('1. **Перенос на сайт.** Таблицы 4к4 по формату совпадают с таблицей знаков Вету (`nameData` в `SpeciesCataloguePage.vue`). Сейчас этот блок показывается только у Вету, его нужно обобщить для остальных рас.','1. **Дальнейшее уточнение.** Самые сильные новые предложения собраны в [NAME_REVIEW.md](NAME_REVIEW.md). Таблицы уже подключены на сайте; неустановленные женские и подрасовые правила помечены как предложения.')
md=md.replace('Частота каждого сочетания указана в колонке «шанс».','Частота каждого сочетания указана в колонке «шанс». Это вероятность первого броска. Когда сайт исключает уже показанные строки, последующие вероятности условны и меняются.')
(ROOT/'NAME_GENERATORS.md').write_text(md,encoding='utf-8')
header='''// Генераторы имён для страниц рас: 4к4, 35 упорядоченных сочетаний.
// NAME_GENERATORS.md содержит те же строки. Имена удришей — общий список names.
// examples — авторские ориентиры, не варианты для повторного наречения.
// recommended — редакторский отбор; authored_setting_proposals не означает реальных носителей.
// Имена Вету Цикла остаются в nameData страницы расы.

'''
(ROOT/'app/data/raceNameGenerators.js').write_text(header+'export const NAME_ROLLS = '+json.dumps(rolls,ensure_ascii=False)+'\n\nexport const RACE_NAME_GENERATORS = '+json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

# Update factual working catalogue without treating its workflow instructions as user requests.
cat=(ROOT/'NAMES_OGNI_KINGS.md').read_text(encoding='utf-8')
cat=cat.replace('**Мишмаш** (из пйюр-пйюр)','**МишМаш** (из пйюр-пйюр; актуальное авторское написание)')
marker='**Кланы:** Ва’афна, Самбу, Каба, Нохо, Слепые Буйволы.'
addition='''**Новые авторские образцы, 2026-10-06:**
- Урма: **Эрке**, **Арна**, **Млака**.
- Эрил: **Стафф**, **Дангудо**, **Гурурору**, **Ниам'Бу**.
- Пйюр-Пйюр: **МишМаш**, **Вит-Вит**.

Пол новых образцов, кроме уже известных книжных персонажей, не сообщён. Урма допускают сочетания согласных; эрил не ограничены тремя открытыми слогами; точный повтор у пйюр-пйюр разрешён. Современные национальные аналоги не устанавливают этничность народа. Эти образцы зарезервированы как авторские ориентиры.

'''
cat=cat.replace(marker,addition+marker)
(ROOT/'NAMES_OGNI_KINGS.md').write_text(cat,encoding='utf-8')

excluded={'meridir','ogre','dragons','colossus','vetu_exile'}
kb['profiles']=[p for p in kb['profiles'] if p['id'] not in excluded]
kb['revision']='2026-10-06-author-corrections'
kb['excluded_profiles']=sorted(excluded)
mapping={'udr_urma':'Урма','udr_eril':'Эрил','udr_pyy':'Пйюр-Пйюр'}
id_mapping={'dangun':'Дангунцы','brall':'Бралльцы','adaad':'Адаады','hudd_erh':'Эрх','hudd_sar':'Сар','hudd_omor':'Омор','mara_ash':'Пепельные','mara_amber':'Янтарные','dragmir':'Драгмирцы','oyrdug':'Ойрдуги','morhor':'Морхоры','adj':'Аджаиды','boros':'Боросы','jabari':'Джабари','samagh':'Самагхи','virmborn':'Вирморождённые','kobold':'Кобольды','chotgor':'Чотгоры','ehor':'Эхор’нуры',**mapping}
for p in kb['profiles']:
    label=id_mapping.get(p['id'])
    if label:
        t=next(t for ts in data.values() for t in ts if t['label']==label)
        p['curated_setting_candidates']=t['recommended']
        p['setting_candidates_status']='editorial_proposals_not_attested_unless_separate_source_given'
    if p['id'] in mapping:
        label=mapping[p['id']]
        p['author_examples']=author[label]
        p['canon']=list(dict.fromkeys(p['canon']+author[label]))
        p['analysis']=rules[label]+' Собственный национальный именник не установлен; финский резерв прежнего анализа не является доказанным удришским прототипом.'
        p['formula']='Авторские образцы → целое имя выбранного типа → проверка повторов и близости → запись биографии. Для настоящего земного имени явно выбрать культуру наречения; не смешивать это с авторским именем ЭНОА.'
        p['avoid']='Не выводить пол, фиксированную слоговую длину и единственный этнический пул по созвучию; не выдавать авторские формы за засвидетельствованные реальные имена.'
        p['confidence']='высокая для новых авторских примеров; низкая для национального прототипа'
        p['pools']=sorted({n['pool'] for n in kb['real_name_bank']})
        p['requires_explicit_pool']=True
        p['exception']='Настоящее имя может быть выбрано по культуре воспитания; новый авторский список дан отдельно, без выдуманных этимологий.'
    if p['id']=='vetu_cycle':p['exception']='Вету-изгнанники исключены из рабочего пула. Имена Цикла остаются формами сеттинга; не заявляется, что это настоящие современные личные имена.'
kb['sources']['ARNA']={'title':'Реальная носительница Arna: World Athletics','url':'https://worldathletics.org/athletes/iceland/arna-rut-arnarsdottir-14944770'}
kb['sources']['ERKE']={'title':'Носительница формы Ерке: государственный портал Алматы','url':'https://www.gov.kz/memleket/entities/almaty/press/news/details/733290?lang=ru'}
kb['author_examples_reality']={'Арна':'Arna засвидетельствовано у настоящей носительницы; это не делает всех урма исландскими.','Эрке':'Проверена близкая форма Ерке; русская запись Эрке задана автором, не объявляется тождеством без оговорки.','остальные':'Точное современное антропонимическое употребление не установлено. Авторская достоверность ЭНОА — отдельный статус.'}
(KB/'constructors.json').write_text(json.dumps(kb,ensure_ascii=False,indent=2),encoding='utf-8')
reserved=json.loads((KB/'reserved_names.json').read_text(encoding='utf-8'))
keys={r['normalized'] for r in reserved}
for label,names in author.items():
    for n in names:
        if norm(n) not in keys:
            reserved.append({'normalized':norm(n),'forms':[n],'sources':['Прямое сообщение автора 2026-10-06: '+label],'kind':'author_reference_reserved'});keys.add(norm(n))
(KB/'reserved_names.json').write_text(json.dumps(reserved,ensure_ascii=False,indent=2),encoding='utf-8')

report=(KB/'АНАЛИЗ_И_КОНСТРУКТОРЫ.md').read_text(encoding='utf-8')
report=report.replace('Дата: 6 октября 2026. Это аналитический рабочий справочник, а не изменение канона.','Дата: 6 октября 2026. Пересмотрено по прямым авторским корректировкам. Активных аналитических профилей: 29. Это рабочий справочник; новые варианты остаются предложениями.')
for title in ['Вету: изгнанники','Меридиры','Драконы и вирмы','Огры','Колоссы']:
    report=re.sub(r'(?m)^### '+re.escape(title)+r' .*?(?=^### |^## |\Z)','',report,flags=re.S|re.M)
for id,label in mapping.items():
    p=next(p for p in kb['profiles'] if p['id']==id)
    replacement=f'### Удриши: {label} (`{id}`)\n\n**Авторские образцы:** '+', '.join(author[label])+'.\n\n'+p['analysis']+'\n\n**Конструктор:** '+p['formula']+'\n\n**Не делать:** '+p['avoid']+'\n\n**Лучшие новые предложения:** '+', '.join(p['curated_setting_candidates'])+'.\n\nПол новых образцов не задан. Авторские образцы зарезервированы; список новых имён относится к формам ЭНОА, а не к доказанному земному именнику. Полный редакторский отбор: `C:/Projects/ENOA/tkk/NAME_REVIEW.md`.\n\n'
    report=re.sub(r'(?m)^### Удриши: .*?\(`'+re.escape(id)+r'`\).*?(?=^### |^## |\Z)',replacement,report,flags=re.S|re.M)
report=report.replace('Южноазиатский короткий пул — рабочая экстраполяция общих удришских образцов; финский — только необязательный фонетический резерв с простыми слогами, не гипотеза о происхождении.','Собственный национальный пул удришей не установлен.')
report=report.replace('Исключение — чотгоры: нормальный результат «личного имени нет».','Исключение — чотгоры: нормальный результат «личного имени нет».\n\nИсключены из активного пула: меридиры, огры, драконы и вирмы, колоссы, вету-изгнанники. Их существование и уже занятые имена не стираются из источников. Вирморождённые и Вету Цикла сохранены. Удришские варианты, отобранные после авторских корректировок, находятся в таблицах сайта и NAME_REVIEW.md; реальный земной пул для них выбирается только явно, по биографии.')
report=report.replace('использовать профиль vetu_exile','использовать отдельно оговорённое заимствование вне текущего активного пула').replace('suggest vetu_exile','явно оговорённое заимствование вне текущего пула')
(KB/'АНАЛИЗ_И_КОНСТРУКТОРЫ.md').write_text(report,encoding='utf-8')
with (KB/'evidence.csv').open(encoding='utf-8-sig',newline='') as f:rows=list(csv.reader(f))
with (KB/'evidence.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.writer(f)
    for row in rows:
        if row[0] not in excluded:w.writerow(row)
    for id,label in mapping.items():
        for n in author[label]:w.writerow([id,n,'Прямое сообщение автора 2026-10-06','Текущий чат','Авторская привязка к '+label+'; пол не задан, кроме известного книжного контекста.'])
state={'date':'2026-10-06','author_examples':author,'excluded_profiles':sorted(excluded),'new_udrish_lists':{t['label']:t['names'] for t in data['udrishi']},'changes':{f'{r}/{l}':v for (r,l),v in changes.items()},'rejected_candidates':rejections,'attested_oyrdug_names':70,'status':'editorial_review_pending_automated_checks'}
(TMP/'review-state.json').write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'profiles':len(kb['profiles']),'new_udrish_names':105,'attested_oyrdug_names':70,'rejected_candidates':rejections},ensure_ascii=False))
