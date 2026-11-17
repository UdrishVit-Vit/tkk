from pathlib import Path
from zipfile import ZipFile
from lxml import etree
from unicodedata import normalize
import hashlib
import json
import re
import pdfplumber

ROOT=Path(__file__).resolve().parent.parent
SOURCE=Path(r"C:\Users\Admin\Downloads\Эноа_4D4_шаблон_35_событий_только_эффекты.docx")
TARGET=ROOT/"output/docx/Хакар — 35 событий Натяжения нитей 4к4.docx"
PDF=ROOT/"tmp/hakar-35/final-06/final.pdf"
DATA=json.loads((ROOT/"proposals/hakar-35-events-v1.json").read_text(encoding='utf-8'))
NS={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

def norm(s):
    return re.sub(r'\s+','',normalize('NFKC',s).replace('\u00ad','')).lower()

with ZipFile(SOURCE) as a,ZipFile(TARGET) as b:
    assert a.namelist()==b.namelist()
    changed=[p for p in a.namelist() if a.read(p)!=b.read(p)]
    assert changed==['word/document.xml']
    src=etree.fromstring(a.read('word/document.xml'))
    dst=etree.fromstring(b.read('word/document.xml'))
    assert len(dst.xpath('.//w:drawing',namespaces=NS))==144
    assert [etree.tostring(n) for n in src.xpath('.//w:drawing',namespaces=NS)]==[etree.tostring(n) for n in dst.xpath('.//w:drawing',namespaces=NS)]
    text=' '.join(dst.xpath('.//w:t/text()',namespaces=NS))
    assert '[Название события]' not in text
    assert text.count('Эффект:')==35
    for e in DATA['events']:
        assert e['description'] in text
        assert e['effect'] in text
        assert text.count(f'{e["id"]}. {e["name"]}')==2
    for p in DATA['intro']:
        assert norm(p) in norm(text)

with pdfplumber.open(PDF) as d:
    pages=[p.extract_text() or '' for p in d.pages]
    all_text=norm(' '.join(pages))
    for p in DATA['intro']:
        assert norm(p) in all_text, p[:60]
    cards=[]
    for e in DATA['events']:
        matches=[i+1 for i,t in enumerate(pages) if norm(e['description']) in norm(t)]
        assert len(matches)==1,(e['id'],matches)
        page=pages[matches[0]-1]
        assert norm(e['effect']) in norm(page),('effect split or missing',e['id'])
        assert norm(f'{e["id"]}. {e["name"]}') in norm(page)
        if 'subtable' in e:
            assert all(norm(x) in norm(page) for x in e['subtable'])
        cards.append({'id':e['id'],'page':matches[0]})
    assert not any(len(t.strip())<40 for t in pages)

assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()=='d5f5ad528255cbe6c3d42f8cce819b36ceff2f265b7881dfe82cdb69fe80b4c9'
result={'pages':len(pages),'cards_verified':35,'each_card_complete_on_one_page':True,'source_unchanged':True,'changed_parts':changed,'drawings_preserved':144,'card_pages':cards}
(ROOT/'reports/hakar-35-document-qa.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
