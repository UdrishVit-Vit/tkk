from pathlib import Path
import importlib.util,json,sys,io,contextlib,shutil
ROOT=Path('C:/Projects/ENOA/tkk')
OUT=Path('C:/EnoaTranscripts/Campaign_KB/name_constructor')
spec=importlib.util.spec_from_file_location('constructor',OUT/'name_constructor.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
data=json.loads((OUT/'constructors.json').read_text(encoding='utf-8'))
assert len({p['id'] for p in data['profiles']})==34
assert len({n['id'] for n in data['real_name_bank']})==101
assert all(n['source_id'] in data['sources'] for n in data['real_name_bank'])
assert all(p in {n['pool'] for n in data['real_name_bank']} for c in data['profiles'] for p in c['pools'])
assert len(data['vetu_table']['prefixes'])==13
assert len(data['vetu_table']['signs'])==35
cache={}
original_read=m.read
def cached(name,default=None):
    if name=='issued_names.json':return original_read(name,default)
    if name not in cache:cache[name]=original_read(name,default)
    return cache[name]
m.read=cached
def run(*args):
    sys.argv=['name_constructor.py',*args]
    out=io.StringIO()
    with contextlib.redirect_stdout(out):m.main()
    return json.loads(out.getvalue())
assert run('check',"Гогур'сар")['available'] is False
assert run('check','Нармандах')['available'] is False
assert run('check','Темулен')['attested_bank_entries']
checked=[]
for p in data['profiles']:
    if p['id']=='vetu_cycle':continue
    result=run('suggest',p['id'],'--count','2')
    if p['id']=='chotgor':assert result['name'] is None;continue
    assert result['returned']>0,p['id']
    assert len({m.norm(n['name_ru']) for n in result['results']})==result['returned']
    for n in result['results']:
        assert n['bank_id']
        assert n['source']['url'].startswith('https://')
        if p['id']=='hudd_sar':assert n['setting_full'].endswith('’сар')
        if p['id']=='virmborn':assert not set('пбм').intersection(n['name_ru'].casefold())
    checked.append(p['id'])
cycle=run('cycle','--count','3')
assert cycle['returned']==3
assert all(n['real_base'] is None and n['authenticity']=='setting_name_not_verified_real_personal_name' for n in cycle['results'])
# Reserve only in an isolated scratch directory, then verify aliases and repeated issuance.
testdir=ROOT/'tmp/name_analysis/ledger_test'
testdir.mkdir(parents=True,exist_ok=True)
m.BASE=testdir
first=run('suggest','boros','--gender','F','--count','2','--reserve','--character','техническая проверка')
assert first['returned']==2
ledger=json.loads((testdir/'issued_names.json').read_text(encoding='utf-8'))
assert len(ledger)==2
for n in first['results']:assert run('check',n['name_ru'])['available'] is False
second=run('suggest','boros','--gender','F','--count','100')
assert not {n['bank_id'] for n in first['results']}.intersection(n['bank_id'] for n in second['results'])
assert not (OUT/'issued_names.json').exists()
report={'date':'2026-10-06','status':'passed','profiles_checked':len(checked),'cycle_prefixes':13,'cycle_signs':35,'checks':['JSON integrity and source references','all selectable profiles return attested bases','canonical apostrophe variant rejected','Mongolian transcription variant recognised','sar setting form separated','wyrmborn labial filter','Vetu cycle explicitly fictional','isolated reservation and exhaustion without duplicate issuance'],'production_names_reserved':0}
(OUT/'validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
