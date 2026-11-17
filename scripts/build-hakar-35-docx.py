from pathlib import Path
from zipfile import ZipFile
from copy import deepcopy
from lxml import etree
import hashlib
import json
import re

ROOT=Path(__file__).resolve().parent.parent
SOURCE=Path(r"C:\Users\Admin\Downloads\Эноа_4D4_шаблон_35_событий_только_эффекты.docx")
TARGET=ROOT/"output/docx/Хакар — 35 событий Натяжения нитей 4к4.docx"
TMP=ROOT/"tmp/hakar-35"
DATA=json.loads((ROOT/"proposals/hakar-35-events-v1.json").read_text(encoding="utf-8"))
METRICS=json.loads((ROOT/"reports/hakar-35-probabilities.json").read_text(encoding="utf-8"))
PROBS={e["id"]:e for e in METRICS["probabilities"]}
W="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
NS={"w":W}
def tag(name): return f'{{{W}}}{name}'
def text(p): return ''.join(p.xpath('.//w:t/text()',namespaces=NS))
def ppr(p):
    pr=p.find('w:pPr',NS)
    if pr is None:
        pr=etree.Element(tag('pPr'))
        p.insert(0,pr)
    return pr
def flag(p,name,value=True):
    pr=ppr(p)
    n=pr.find('w:'+name,NS)
    if n is None: n=etree.SubElement(pr,tag(name))
    n.set(tag('val'),'1' if value else '0')

with ZipFile(SOURCE) as z:
    infos=z.infolist()
    parts={i.filename:z.read(i.filename) for i in infos}
root=etree.fromstring(parts['word/document.xml'])
body=root.find('w:body',NS)
original_drawings=[etree.tostring(n) for n in root.xpath('.//w:drawing',namespaces=NS)]
original_section=etree.tostring(body.find('w:sectPr',NS))
paragraphs=body.findall('w:p',NS)
old_effect=next(p for p in paragraphs if text(p).strip().startswith('Эффект:'))
normal_example=paragraphs[2]

def clean_text(p):
    for n in p.xpath('.//w:t | .//w:br',namespaces=NS):
        n.getparent().remove(n)

def first_rpr(p):
    rp=p.find('.//w:r/w:rPr',NS)
    return deepcopy(rp) if rp is not None else etree.Element(tag('rPr'))

def add_run(p,value,base=None,bold=None):
    r=etree.SubElement(p,tag('r'))
    rp=deepcopy(base) if base is not None else first_rpr(p)
    if bold is False:
        for key in ('b','bCs'):
            for n in rp.findall('w:'+key,NS): rp.remove(n)
    elif bold is True:
        for key in ('b','bCs'):
            if rp.find('w:'+key,NS) is None: etree.SubElement(rp,tag(key))
    r.append(rp)
    t=etree.SubElement(r,tag('t'))
    t.set('{http://www.w3.org/XML/1998/namespace}space','preserve')
    t.text=value
    return r

def replace_plain(p,value):
    rp=first_rpr(p)
    clean_text(p)
    add_run(p,value,rp)

def replace_label(p,label,value):
    rp=first_rpr(p)
    clean_text(p)
    add_run(p,label+' ',rp,True)
    add_run(p,value,rp,False)

def fresh_p(example):
    p=etree.Element(tag('p'))
    pr=example.find('w:pPr',NS)
    if pr is not None: p.append(deepcopy(pr))
    r=etree.SubElement(p,tag('r'))
    r.append(first_rpr(example))
    return p

replace_plain(paragraphs[0],DATA['title']+' 4к4')
# Fill the original metadata labels, then use the source's spare opening space.
for p,value in zip(paragraphs[1:6],DATA['intro'][:5]):
    if ':' in value:
        label,content=value.split(':',1)
        replace_label(p,label+':',content.strip())
    else:
        replace_plain(p,value)
    flag(p,'keepLines')
extras=DATA['intro'][5:]
cursor=paragraphs[5]
for i,value in enumerate(extras):
    if i<3 and not paragraphs[6+i].xpath('.//w:drawing',namespaces=NS) and not paragraphs[6+i].findall('w:pPr/w:pBdr',NS):
        p=paragraphs[6+i]
        oldpr=p.find('w:pPr',NS)
        if oldpr is not None: p.remove(oldpr)
        pr=normal_example.find('w:pPr',NS)
        if pr is not None: p.insert(0,deepcopy(pr))
    else:
        p=fresh_p(normal_example)
        cursor.addnext(p)
    if ':' in value:
        label,content=value.split(':',1)
        replace_label(p,label+':',content.strip())
    else:
        replace_plain(p,value)
    flag(p,'keepLines')
    cursor=p

table=body.find('w:tbl',NS)
rows=table.findall('w:tr',NS)
for row in rows:
    trpr=row.find('w:trPr',NS)
    if trpr is None:
        trpr=etree.Element(tag('trPr')); row.insert(0,trpr)
    if trpr.find('w:cantSplit',NS) is None: etree.SubElement(trpr,tag('cantSplit'))
for row in rows[:2]:
    trpr=row.find('w:trPr',NS)
    if trpr.find('w:tblHeader',NS) is None: etree.SubElement(trpr,tag('tblHeader'))
for e,row in zip(DATA['events'],rows[2:]):
    height=row.find('w:trPr/w:trHeight',NS)
    if height is not None:
        height.set(tag('val'),'420')
        height.set(tag('hRule'),'atLeast')
    target_p=row.findall('w:tc',NS)[-1].find('w:p',NS)
    replace_plain(target_p,f'{e["id"]}. {e["name"]}')
    # Preserve type and columns; trim only cell after-spacing to avoid an orphan 35th row.
    for pp in row.xpath('.//w:p',namespaces=NS):
        pr=ppr(pp)
        spacing=pr.find('w:spacing',NS)
        if spacing is None: spacing=etree.SubElement(pr,tag('spacing'))
        spacing.set(tag('after'),'60')

# Locate the original card blocks by the placeholders, including the malformed 26th heading.
blocks=[]
for child in list(body):
    if child.tag==tag('p'):
        match=re.match(r'^\s*(\d+)\.\s*\[Название события\]',text(child))
        if match: blocks.append((int(match.group(1)),child))
assert [n for n,p in blocks]==list(range(1,36))

for i,(eid,header) in enumerate(blocks):
    e=DATA['events'][eid-1]
    end=blocks[i+1][1] if i+1<len(blocks) else body.find('w:sectPr',NS)
    children=list(body)
    start_index=children.index(header)
    end_index=children.index(end)
    group=children[start_index:end_index]
    replace_plain(header,f'{eid}. {e["name"]}')
    if eid==19:
        # The empty template reserved a fresh page for its auxiliary table.
        # A filled, kept-together card can flow naturally without stranding card 18.
        flag(header,'pageBreakBefore',False)
    for p in group:
        if p.tag!=tag('p'): continue
        value=text(p).strip()
        if value.startswith(('Кости:','Тип:')):
            rp=first_rpr(p)
            ts=p.xpath('.//w:t',namespaces=NS)
            if ts:
                ts[0].text='Кости: '
                for t in ts[1:]: t.text=''
            pr=PROBS[eid]
            pc=f'{pr["percent"]:.2f}'.replace('.',',')
            add_run(p,f'  |  {pr["weight"]}/256 ({pc} %)',rp,False)
        elif value.startswith('Описание:'):
            replace_label(p,'Описание:',e['description'])
        elif value.startswith('Эффект:'):
            replace_label(p,'Эффект:',e['effect'])
    desc=next(p for p in group if p.tag==tag('p') and text(p).strip().startswith('Описание:'))
    eff=next((p for p in group if p.tag==tag('p') and text(p).strip().startswith('Эффект:')),None)
    if eff is None:
        eff=fresh_p(old_effect)
        replace_label(eff,'Эффект:',e['effect'])
        desc.addnext(eff)
    # Keep each card's content attached; leave the decorative separator independent.
    relevant=[]
    for p in [header]+[n for n in group[1:] if n.tag==tag('p') and text(n).strip()]+([eff] if eff not in group else []):
        if p not in relevant: relevant.append(p)
    relevant.sort(key=lambda n:list(body).index(n))
    separators=[p for p in group if p.tag==tag('p') and not text(p).strip()]
    for p in relevant:
        flag(p,'keepLines')
        flag(p,'keepNext',p is not relevant[-1] or eid==19 or bool(separators))
    for p in separators:
        flag(p,'keepNext',p is not separators[-1])
    if eid==19:
        aux=next(n for n in group if n.tag==tag('tbl'))
        aux_rows=aux.findall('w:tr',NS)
        for n,label in enumerate(e['subtable'],1):
            pp=aux_rows[n].findall('w:tc',NS)[-1].find('w:p',NS)
            replace_plain(pp,label)
        for ri,row in enumerate(aux_rows):
            pr=row.find('w:trPr',NS)
            if pr is None: pr=etree.SubElement(row,tag('trPr'))
            if pr.find('w:cantSplit',NS) is None: etree.SubElement(pr,tag('cantSplit'))
            for pp in row.xpath('.//w:p',namespaces=NS):
                flag(pp,'keepNext',ri<len(aux_rows)-1 or bool(separators))

for p in body.findall('w:p',NS):
    if text(p).strip() in ('Таблица комбинаций 4D4','Карточки событий'):
        flag(p,'keepNext')

assert [etree.tostring(n) for n in root.xpath('.//w:drawing',namespaces=NS)]==original_drawings
assert etree.tostring(body.find('w:sectPr',NS))==original_section
assert '[Название события]' not in ''.join(root.xpath('.//w:t/text()',namespaces=NS))
new_xml=etree.tostring(root,encoding='UTF-8',xml_declaration=True,standalone=True)
TARGET.parent.mkdir(parents=True,exist_ok=True)
with ZipFile(TARGET,'w') as z:
    for info in infos:
        z.writestr(info,new_xml if info.filename=='word/document.xml' else parts[info.filename])

with ZipFile(TARGET) as z:
    assert z.namelist()==list(parts)
    changed=[p for p in parts if z.read(p)!=parts[p]]
assert changed==['word/document.xml'],changed
inventory=json.loads((TMP/'reference-package-inventory.json').read_text(encoding='utf-8'))
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()=='d5f5ad528255cbe6c3d42f8cce819b36ceff2f265b7881dfe82cdb69fe80b4c9'
with (TMP/'artifact.md').open('a',encoding='utf-8') as f:
    f.write('\n## Applied slot and layout repairs\nOpening spare paragraphs were filled with the additional procedure; one cloned Normal paragraph was inserted. The first two main-table rows repeat across pages, and rows cannot split. Body-cell after-spacing is 3 pt instead of 6 pt and minimum data-row height is 21 pt instead of 23.25 pt to avoid a single orphan index row; fonts and column geometry are unchanged. Trailing separator paragraphs stay with their card. The explicit card-19 page break was removed because it stranded card 18 on a mostly empty page; its auxiliary table stays with the card through keep-with-next rules. Source card images and dice counts are unchanged. Only document.xml changed.\n')

md=['# '+DATA['title']+' 4к4','\n\n'.join(DATA['intro'])]
for e in DATA['events']:
    pr=PROBS[e['id']]
    md.append(f'## {e["id"]}. {e["name"]}\n\nКомбинация: {e["counts"]}; вероятность: {pr["weight"]}/256.\n\n{e["description"]}\n\n**Эффект:** {e["effect"]}')
    if 'subtable' in e:
        md.append('\n'.join(f'{i}. {v}' for i,v in enumerate(e['subtable'],1)))
(ROOT/'proposals/hakar-35-events-v1.md').write_text('\n\n'.join(md)+'\n',encoding='utf-8')
print(json.dumps({'file':str(TARGET),'changed_parts':changed,'preserved_drawings':len(original_drawings),'cards':35},ensure_ascii=False))
