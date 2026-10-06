from pathlib import Path
import urllib.request,zipfile,io,json
p=Path('C:/Projects/ENOA/tkk/tmp/name_analysis')
url='https://www.ssa.gov/oact/babynames/names.zip'
data=urllib.request.urlopen(url,timeout=60).read()
(p/'ssa_names.zip').write_bytes(data)
z=zipfile.ZipFile(io.BytesIO(data))
counts={}
for f in z.namelist():
    if not f.startswith('yob') or not f.endswith('.txt'):continue
    year=int(f[3:7])
    if year>2025:continue
    for line in z.read(f).decode().splitlines():
        name,sex,n=line.split(',')
        d=counts.setdefault(name.casefold(),{})
        old=d.get(sex,{'total':0,'first_year':year,'last_year':year,'source_spelling':name})
        old['total']+=int(n);old['first_year']=min(old['first_year'],year);old['last_year']=max(old['last_year'],year)
        d[sex]=old
(p/'ssa_index.json').write_text(json.dumps(counts,ensure_ascii=False),encoding='utf-8')
print('SSA spellings',len(counts),'zip bytes',len(data))
