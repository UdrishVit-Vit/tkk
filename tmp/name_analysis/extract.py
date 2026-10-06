from pathlib import Path
import json, re
from pypdf import PdfReader

root=Path('C:/Projects/ENOA/tkk')
out=root/'tmp/name_analysis'
out.mkdir(parents=True,exist_ok=True)
pages=[]
for season in range(1,4):
    path=Path('C:/EnoaTranscripts/Готовые версии')/f'ЭНОА - Кампания II - Сезон {season} - Огни - v0.10.0.pdf'
    doc=PdfReader(path)
    texts=[]
    for i,page in enumerate(doc.pages):
        txt=page.extract_text() or ''
        pages.append({'season':season,'page':i+1,'text':txt})
        texts.append(f'\n--- PDF page {i+1} ---\n'+txt)
    (out/f'season{season}.txt').write_text(''.join(texts),encoding='utf-8')
    print(f'Season {season}: {len(doc.pages)} pages, {sum(map(len,texts))} chars')
(out/'pages.json').write_text(json.dumps(pages,ensure_ascii=False),encoding='utf-8')
kb=json.loads(Path('C:/EnoaTranscripts/Campaign_KB/campaign_knowledge.json').read_text(encoding='utf-8'))
print('KB keys:',list(kb))
for k,v in kb.items():
    if isinstance(v,list):print(k,len(v),str(v[0])[:1200] if v else '')
vk=json.loads((root/'app/data/loreUzlyVremyaKoroley.generated.json').read_text(encoding='utf-8'))
(out/'kings.txt').write_text(json.dumps(vk,ensure_ascii=False,indent=2),encoding='utf-8')
for path in sorted((root/'content/dnd5e/races').glob('*.md')):
    txt=path.read_text(encoding='utf-8')
    match=re.search(r'  - title: Имена\n(.*?)(?=\n  - title:|\n\w|\Z)',txt,re.S)
    if match: print('\nRACE',path.stem,'\n',match.group(1))
