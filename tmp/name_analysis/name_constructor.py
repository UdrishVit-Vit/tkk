"""Offline name selection for Enoa. Stdlib only; originals and setting forms stay separate."""
from pathlib import Path
import argparse,json,re,unicodedata,secrets,difflib,sys

BASE=Path(__file__).resolve().parent
def norm(text):
    return ''.join(c for c in unicodedata.normalize('NFKC',text).casefold().replace('ё','е') if c.isalnum())
def fold(text):
    return unicodedata.normalize('NFKC',text).casefold().replace('ё','е').replace('’',"'").replace('‘',"'")
def read(name,default=None):
    p=BASE/name
    return json.loads(p.read_text(encoding='utf-8')) if p.exists() else default
def emit(value):print(json.dumps(value,ensure_ascii=False,indent=2))
def check(name,data,reserved,corpus,issued,variants=()):
    forms=list(dict.fromkeys([name,*variants]))
    keys={norm(n) for n in forms}
    occupied=[r for r in reserved if r['normalized'] in keys]
    already=[r for r in issued if keys.intersection(r.get('collision_keys',[norm(r['name_ru'])]))]
    matches=[]
    for candidate in forms:
        pat=re.compile(r'(?<!\w)'+re.escape(fold(candidate))+r'(?!\w)')
        for row in corpus:
            m=pat.search(row['folded'])
            if m:
                matches.append({'form':candidate,'source':row['source'],'quote':row['text'][max(0,m.start()-45):m.end()+65].replace('\n',' ')})
                if len(matches)>=3:break
        if len(matches)>=3:break
    similar=[]
    if len(norm(name))>=4:
        for row in reserved:
            ratio=difflib.SequenceMatcher(None,norm(name),row['normalized']).ratio()
            if 0.8<=ratio<1 and abs(len(norm(name))-len(row['normalized']))<=2:
                similar.append({'form':row['forms'][0],'score':round(ratio,2)})
        similar=sorted(similar,key=lambda r:r['score'],reverse=True)[:5]
    attested=[n for n in data['real_name_bank'] if keys.intersection(norm(v) for v in n['variants_for_collision'])]
    return {'name':name,'available':not(occupied or already or matches),'reserved_matches':occupied[:4],'issued_matches':already[:4],'corpus_matches':matches,'similar_review':similar,'attested_bank_entries':[n['id'] for n in attested],'scope':'Проверенный локальный корпус и реестр; незаписанные склонения/транскрипции и сходство на слух требуют ручной оценки.'}

def main():
    parser=argparse.ArgumentParser(description='Реальные имена ЭНОА с отдельной формой сеттинга и проверкой повторов')
    commands=parser.add_subparsers(dest='cmd',required=True)
    commands.add_parser('list')
    c=commands.add_parser('check');c.add_argument('name')
    s=commands.add_parser('suggest');s.add_argument('profile');s.add_argument('--gender',choices=['M','F','any'],default='any');s.add_argument('--pool');s.add_argument('--count',type=int,default=3);s.add_argument('--reserve',action='store_true');s.add_argument('--character',default='')
    cy=commands.add_parser('cycle');cy.add_argument('--count',type=int,default=3);cy.add_argument('--reserve',action='store_true');cy.add_argument('--character',default='')
    args=parser.parse_args()
    data=read('constructors.json')
    if not data:parser.error('constructors.json должен находиться рядом со скриптом')
    if args.cmd=='list':
        emit([{'id':p['id'],'title':p['title'],'confidence':p['confidence'],'pools':p['pools']} for p in data['profiles']]);return
    if args.cmd in ['suggest','cycle'] and not 1<=args.count<=100:parser.error('--count должен быть от 1 до 100')
    reserved=read('reserved_names.json',[]);issued=read('issued_names.json',[]);corpus=read('collision_corpus.json',[])
    for row in corpus:row['folded']=fold(row['text'])
    if args.cmd=='check':
        emit(check(args.name,data,reserved,corpus,issued));return
    profile=next((p for p in data['profiles'] if p['id']==getattr(args,'profile','vetu_cycle')),None)
    if not profile:parser.error('Неизвестный профиль; см. list')
    if profile['id']=='chotgor':
        emit({'profile':'chotgor','name':None,'rule':profile['formula'],'note':'Для отличения персонажей используйте уникальное описание или обращение. Число вариантов личного имени неприменимо.'});return
    if profile['id']=='vetu_cycle' and args.cmd!='cycle':
        emit({'profile':'vetu_cycle','results':[],'reason':'Собственная форма Цикла — форма ЭНОА. Используйте cycle для неё или suggest vetu_exile для настоящего заимствованного личного имени.'});return
    candidates=[]
    if args.cmd=='cycle':
        table=data['vetu_table']
        for a in table['prefixes']:
            for b in table['signs']:
                full=a['value'].replace("'",'’')+b['value']
                candidates.append({'name_ru':full,'real_base':None,'setting_full':full,'authenticity':'setting_name_not_verified_real_personal_name','meaning_from_site':[a['desc'],b['sign']],'variants_for_collision':[full]})
    else:
        if args.pool and args.pool not in profile['pools']:parser.error('Этот пул не включён в выбранный профиль')
        for n in data['real_name_bank']:
            if n['pool'] not in profile['pools'] or (args.pool and n['pool']!=args.pool):continue
            if args.gender!='any' and n['gender']!=args.gender:continue
            if n['draft_status']=='blocked_existing':continue
            if profile['id']=='virmborn' and any(c in n['name_ru'].casefold() for c in 'пбм'):continue
            full=n['name_ru'];status='unmodified_attested_personal_base'
            if profile['id']=='hudd_sar':full+='’сар';status='attested_base_plus_setting_marker'
            if profile['id']=='samagh':full+=secrets.choice(['га','гха','гаг']);status='attested_base_plus_setting_marker'
            candidates.append({'name_ru':n['name_ru'],'real_base':n['name_ru'],'original':n['original'],'setting_full':full,'authenticity':status,'source':data['sources'][n['source_id']],'bank_id':n['id'],'pool':n['pool'],'gender':n['gender'],'variants_for_collision':n['variants_for_collision']})
    secrets.SystemRandom().shuffle(candidates)
    results=[];temporary=list(issued)
    for n in candidates:
        evaluation=check(n['name_ru'],data,reserved,corpus,temporary,n['variants_for_collision'])
        full_check=check(n['setting_full'],data,reserved,corpus,temporary) if n['setting_full']!=n['name_ru'] else evaluation
        if not evaluation['available'] or not full_check['available']:continue
        n['similar_review']=evaluation['similar_review']
        keys=list(dict.fromkeys(norm(v) for v in [*n['variants_for_collision'],n['setting_full']]))
        record={'name_ru':n['name_ru'],'setting_full':n['setting_full'],'profile':profile['id'],'character':args.character,'collision_keys':keys,'bank_id':n.get('bank_id'),'authenticity':n['authenticity']}
        temporary.append(record);results.append(n)
        if len(results)==args.count:break
    # Explicit reservations are the only action that changes the issuance ledger.
    if args.reserve and results:
        target=BASE/'issued_names.json'
        tmp=BASE/'issued_names.json.tmp'
        tmp.write_text(json.dumps(temporary,ensure_ascii=False,indent=2),encoding='utf-8');tmp.replace(target)
    emit({'profile':profile['id'],'requested':args.count,'returned':len(results),'reserved':bool(args.reserve and results),'results':results,'constructor':profile['formula'],'proposal_status':profile['proposal_status'],'limitation':profile['exception'],'note':'Основы подтверждены источниками; культурное соответствие ЭНОА — аналитическое предложение. similar_review требует ручной оценки. При нехватке имён пополните подтверждённый банк.'})

if __name__=='__main__':
    if hasattr(sys.stdout,'reconfigure'):sys.stdout.reconfigure(encoding='utf-8')
    main()
