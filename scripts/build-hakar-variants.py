from pathlib import Path
import ast
import html
import io
import math
import re
import runpy

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import BaseDocTemplate, Frame, NextPageTemplate, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parent.parent
DATA = runpy.run_path(str(ROOT / "proposals/hakar-three-variants-content.py"))
OUT = ROOT / "output/pdf/hakar-variants"
OUT.mkdir(parents=True, exist_ok=True)
PREVIEWS = ROOT / "tmp/pdfs/hakar-variants"
PREVIEWS.mkdir(parents=True, exist_ok=True)
ART = ROOT / "output/pdf/Хакар — иллюстрация по референсам.png"
PW, PH = A4
PAPER = colors.HexColor("#F8F0E6")
BLACK = colors.HexColor("#242020")
MUTED = colors.HexColor("#70665E")
RULE = colors.HexColor("#D5C2AE")
CARD = colors.HexColor("#FFF9F2")
RUST = colors.HexColor("#8D3328")

for name, filename in [("Georgia", "georgia.ttf"), ("Georgia-Bold", "georgiab.ttf"),
                       ("Georgia-Italic", "georgiai.ttf"), ("Arial", "arial.ttf"), ("Arial-Bold", "arialbd.ttf")]:
    pdfmetrics.registerFont(TTFont(name, str(Path("C:/Windows/Fonts") / filename)))
pdfmetrics.registerFontFamily("Georgia", normal="Georgia", bold="Georgia-Bold", italic="Georgia-Italic")
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold")

# Reuse the approved vector knot geometry without running the old PDF builder.
old = ast.parse((ROOT / "tmp/pdfs/build_hakar_geometric_knot.py").read_text(encoding="utf-8"))
helpers = [n for n in old.body if isinstance(n, ast.FunctionDef) and n.name in {"curve", "woven_geometry", "woven_knot"}]
exec(compile(ast.Module(body=helpers, type_ignores=[]), "knot_geometry", "exec"))

def markup(text):
    text = html.escape(str(text))
    return re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", text)

def styles(accent, page):
    body_size, body_lead = (9.3, 13.4) if page == 6 else (9.6, 14)
    return {
        "p": ParagraphStyle("body", fontName="Georgia", fontSize=body_size, leading=body_lead, textColor=BLACK, spaceAfter=8),
        "s": ParagraphStyle("small", fontName="Arial", fontSize=8, leading=11.2, textColor=MUTED, spaceAfter=7),
        "h": ParagraphStyle("heading", fontName="Georgia-Bold", fontSize=13.4, leading=17.5, textColor=BLACK, spaceBefore=8, spaceAfter=7, keepWithNext=True),
        "title": ParagraphStyle("title", fontName="Georgia-Bold", fontSize=21, leading=27, textColor=BLACK, spaceAfter=11, keepWithNext=True),
        "cell": ParagraphStyle("cell", fontName="Arial", fontSize=8.2 if page == 4 else 8.5, leading=11.2 if page == 4 else 11.8, textColor=BLACK),
        "thead": ParagraphStyle("thead", fontName="Arial-Bold", fontSize=7.6 if page == 4 else 8, leading=10.5, textColor=accent),
        "link": ParagraphStyle("link", fontName="Arial", fontSize=7.7, leading=10.7, textColor=accent, spaceAfter=2),
    }

def render_blocks(blocks, ss, accent):
    result=[]
    for block in blocks:
        typ=block[0]
        if typ in ("p", "s", "h", "title"):
            result.append(Paragraph(markup(block[1]), ss[typ]))
        elif typ == "table":
            _, heads, rows, widths = block
            if widths is None:
                widths=[PW-120] if len(heads)==1 else [68, PW-188]
            data=[[Paragraph(markup(c),ss["thead"]) for c in heads]]
            data += [[Paragraph(markup(c),ss["cell"]) for c in row] for row in rows]
            t=Table(data,colWidths=widths,repeatRows=1,hAlign="LEFT")
            commands=[("VALIGN",(0,0),(-1,-1),"TOP"),
                      ("BACKGROUND",(0,0),(-1,0),colors.HexColor("#EBDCCD")),
                      ("LINEABOVE",(0,0),(-1,0),1.1,accent),
                      ("LINEBELOW",(0,0),(-1,-1),0.45,RULE),
                      ("TOPPADDING",(0,0),(-1,-1),6),
                      ("BOTTOMPADDING",(0,0),(-1,-1),6),
                      ("LEFTPADDING",(0,0),(-1,-1),6),
                      ("RIGHTPADDING",(0,0),(-1,-1),6)]
            for row in range(1,len(data)):
                commands.append(("BACKGROUND",(0,row),(-1,row),CARD if row%2 else PAPER))
            t.setStyle(TableStyle(commands))
            result += [t, Spacer(1,9)]
        elif typ == "links":
            for label, url in block[1]:
                result.append(Paragraph(f'<link href="{html.escape(url)}" color="{accent.hexval()}">{html.escape(label)}</link>', ss["link"]))
    return result

def cover(canvas, doc):
    v=doc.variant
    accent=colors.HexColor(v["color"])
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0,0,PW,PH,fill=1,stroke=0)
    art=ImageReader(str(ART))
    aw,ah=art.getSize()
    factor=max(PW/aw,PH/ah)
    canvas.drawImage(art,(PW-aw*factor)/2,(PH-ah*factor)/2,width=aw*factor,height=ah*factor)
    canvas.setFillColor(PAPER)
    canvas.rect(25,PH-54,98,25,fill=1,stroke=0)
    canvas.setFillColor(accent)
    canvas.setFont("Arial-Bold",8)
    canvas.drawString(34,PH-45,f'ВАРИАНТ {v["id"]} / 2024')
    canvas.setFont("Arial-Bold",8.4)
    canvas.drawCentredString(PW/2,157,"Э Н О А  /  П О Д К Л А С С  В О Л Ш Е Б Н И К А")
    canvas.setFillColor(BLACK)
    canvas.setFont("Georgia",43)
    canvas.drawCentredString(PW/2,103,"Хакар")
    canvas.setStrokeColor(accent)
    canvas.setLineWidth(1.1)
    canvas.line(175,87,PW-175,87)
    canvas.setFillColor(accent)
    canvas.setFont("Georgia-Bold",13)
    canvas.drawCentredString(PW/2,63,v["name"])
    canvas.setFont("Arial",8.1)
    canvas.drawCentredString(PW/2,39,v["subtitle"])
    canvas.restoreState()

def background(canvas, doc):
    v=doc.variant
    accent=colors.HexColor(v["color"])
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0,0,PW,PH,fill=1,stroke=0)
    if doc.page == 3:
        woven_knot(canvas,PW/2,157,80,accent)
    canvas.setStrokeColor(accent)
    canvas.setLineWidth(.8)
    canvas.line(59,PH-43,PW-59,PH-43)
    canvas.setFillColor(accent)
    canvas.rect(PW-63,PH-47,8,8,fill=1,stroke=0)
    canvas.setFont("Arial-Bold",7)
    canvas.drawString(60,PH-33,f'ХАКАР {v["id"]} / {v["name"].upper()}')
    canvas.setStrokeColor(RULE)
    canvas.line(60,43,PW-60,43)
    canvas.setFont("Arial",7.2)
    canvas.setFillColor(MUTED)
    canvas.drawString(60,29,"ЭНОА · АВТОРСКАЯ ВЕРСИЯ ДЛЯ ПЛЕЙТЕСТА")
    canvas.drawRightString(PW-60,29,f'{doc.page-1:02d}')
    canvas.restoreState()

def pages_for(v):
    p=DATA["p"]; h=DATA["h"]; s=DATA["s"]; table=DATA["table"]
    intro=[("title",v["name"]),p(v["intro"]),
           s("Самостоятельный вариант подкласса волшебника D&D 2024. Выберите одну версию Хакара; это не три одновременно доступные специализации."),
           table(["Уровень","Умения"],v["overview"],[53,422])]
    return [intro+DATA["COMMON_THREAD"],v["features"],v["price"],v["later"],v["notes"]+DATA["COMMON_NOTES"]]

def markdown(blocks):
    parts=[]
    for b in blocks:
        if b[0] in ("h","title"):
            parts.append("## "+b[1])
        elif b[0] in ("p","s"):
            parts.append(b[1])
        elif b[0]=="table":
            parts.append("| "+" | ".join(b[1])+" |\n| "+" | ".join(["---"]*len(b[1]))+" |\n"+"\n".join("| "+" | ".join(row)+" |" for row in b[2]))
        elif b[0]=="links":
            parts.append("\n".join(f'- [{label}]({url})' for label,url in b[1]))
    return "\n\n".join(parts)

measure=Canvas(io.BytesIO(),pagesize=A4)
for v in DATA["VARIANTS"]:
    accent=colors.HexColor(v["color"])
    blocks_by_page=pages_for(v)
    story=[NextPageTemplate("body"),Spacer(1,1),PageBreak()]
    heights=[]
    for page,blocks in enumerate(blocks_by_page,2):
        ss=styles(accent,page)
        flows=render_blocks(blocks,ss,accent)
        height=0
        for f in flows:
            _,fh=f.wrapOn(measure,PW-120,2000)
            height += fh + f.getSpaceBefore() + f.getSpaceAfter()
        heights.append(round(height,1))
        story += flows
        if page<6:
            story.append(PageBreak())
    doc=BaseDocTemplate(str(OUT/v["filename"]),pagesize=A4,title=f'Хакар {v["id"]} — {v["name"]}',
                        author="Эноа · авторская разработка",leftMargin=60,rightMargin=60,topMargin=63,bottomMargin=57)
    doc.variant=v
    frame=Frame(60,57,PW-120,PH-120,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="cover",frames=[frame],onPage=cover),PageTemplate(id="body",frames=[frame],onPage=background)])
    doc.build(story)
    src=ROOT/"proposals"/f'hakar-variant-{v["id"].lower()}.md'
    src.write_text(f'# Хакар: {v["name"]}\n\n'+"\n\n---\n\n".join(markdown(b) for b in blocks_by_page)+"\n",encoding="utf-8")
    print(v["id"],"page_heights",heights,"frame",round(PH-120,1))

