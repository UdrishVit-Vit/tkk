from pathlib import Path
import html
import re
import math

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
from reportlab.platypus import (
    BaseDocTemplate, Frame, Image, KeepTogether, NextPageTemplate,
    PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle,
)

ROOT = Path(r"C:\Projects\ENOA\tkk")
SOURCE = Path(r"C:\Users\Admin\.codex\attachments\a9f8b71c-068b-4d79-91e2-b6b4e2322e12\Вставленный текст.txt")
ART = ROOT / "output" / "pdf" / "Хакар — иллюстрация по референсам.png"
OUTPUT = ROOT / "output" / "pdf" / "Хакар — геометрический узел.pdf"

LORE = [
    "Обычно начинающий магус вступает на путь становления, присоединившись к одной из Школ в зрелом возрасте. К этому времени его связь с Линией Силы уже проявляется, и ученик отыскивает свой путь в странствиях, становясь магусом. Во всем Эноа, принадлежать к медресе значит удостоиться высочайшей чести и уважения по всему Даскару. Поэтому очень многие стремятся и мечтают присоединиться к ордену Мафраша.",
    "Но реальность сурова, ибо будущий ученик должен сам найти свой путь к одной из медресе. Многие из Школ не видели в обитаемых землях десятилетиями, а другие так далеко уходят в своих экспедициях, что возвращаются обратно лишь раз в несколько столетий. Поэтому большинство будущих студентов сдаются, сходят с ума или же умирают на своем пути к медресе. Не достигшие своей цели, ставшие отшельниками, они зовутся хакары, недомаги. Многих из них можно встретить в диких областях Даскара, предлагающими свои услуги в обмен на пригоршню солнц.",
    "Многие магусы испытывают сострадание ко всем хакарам, ибо и сами они прошли по этому мучительнейшему из путей и чувствуют жалость к тем, кто не добрался до его завершения. Но есть и те, кто презирает их и считает, что хакары не должны иметь даже саму возможность прикасаться к линиям силы своими нечистыми руками.",
]

pdfmetrics.registerFont(TTFont("Georgia", r"C:\Windows\Fonts\georgia.ttf"))
pdfmetrics.registerFont(TTFont("Georgia-Bold", r"C:\Windows\Fonts\georgiab.ttf"))
pdfmetrics.registerFont(TTFont("Georgia-Italic", r"C:\Windows\Fonts\georgiai.ttf"))
pdfmetrics.registerFontFamily("Georgia", normal="Georgia", bold="Georgia-Bold", italic="Georgia-Italic")
pdfmetrics.registerFont(TTFont("Arial", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", r"C:\Windows\Fonts\arialbd.ttf"))
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold")

PW, PH = A4
PAPER = colors.HexColor("#F8F0E6")
RUST = colors.HexColor("#8D3328")
BLACK = colors.HexColor("#1E1B1B")
GRAY = colors.HexColor("#6F655F")
LINE = colors.HexColor("#D4C0AD")
CARD = colors.HexColor("#FFF9F2")
OCHRE = colors.HexColor("#B38348")
FAINT = colors.HexColor("#DDC7AF")

S = {
    "kicker": ParagraphStyle("kicker", fontName="Arial-Bold", fontSize=8.5, leading=11,
                             textColor=RUST, spaceAfter=9),
    "title": ParagraphStyle("title", fontName="Georgia", fontSize=32, leading=38,
                            textColor=BLACK, spaceAfter=20),
    "h1": ParagraphStyle("h1", fontName="Georgia-Bold", fontSize=18.5, leading=24,
                         textColor=BLACK, spaceBefore=10, spaceAfter=12, keepWithNext=True),
    "h2": ParagraphStyle("h2", fontName="Georgia-Bold", fontSize=14.5, leading=19,
                         textColor=BLACK, spaceBefore=18, spaceAfter=9, keepWithNext=True),
    "body": ParagraphStyle("body", fontName="Georgia", fontSize=10.2, leading=16.4,
                           textColor=BLACK, spaceAfter=12),
    "lore": ParagraphStyle("lore", fontName="Georgia", fontSize=10.8, leading=18.7,
                           textColor=BLACK, spaceAfter=19),
    "small": ParagraphStyle("small", fontName="Arial", fontSize=9, leading=13,
                            textColor=BLACK, spaceAfter=4),
    "tiny": ParagraphStyle("tiny", fontName="Arial", fontSize=8.4, leading=12.1,
                           textColor=BLACK),
    "rank": ParagraphStyle("rank", fontName="Arial-Bold", fontSize=8, leading=11,
                           textColor=RUST, spaceAfter=5),
}

def m(s):
    s = html.escape(s.strip())
    s = re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"_(.*?)_", r"<i>\1</i>", s)
    return s.replace("&lt;br&gt;", "<br/>")

def P(s, style="body"):
    return Paragraph(m(s), S[style])

def lines_between(text, left, right=None):
    a = text.split(left, 1)[1]
    if right:
        a = a.split(right, 1)[0]
    return [x.strip() for x in a.splitlines() if x.strip()]

def split_table_line(line):
    cells = [v.strip() for v in line.strip().strip("|").split("|")]
    while cells and not cells[-1]:
        cells.pop()
    return cells

def rule_lines(lines):
    return [P(x) for x in lines if not x.startswith("|")]

def heading(text, level=2):
    return P(text, "h1" if level == 1 else "h2")

def card(row):
    n, description, a, b, c, d = row[:6]
    top = Table([[P(n, "rank"), P(description, "small")]], colWidths=[24, 451], hAlign="LEFT")
    top.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), CARD),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("TOPPADDING", (0,0), (-1,-1), 9),
        ("BOTTOMPADDING", (0,0), (-1,-1), 7),
        ("LINEABOVE", (0,0), (-1,0), 1.2, RUST),
    ]))
    ranks = [a,b,c,d]
    cells = []
    for i, value in enumerate(ranks, 1):
        cells.append([P(f"УРОВЕНЬ {i}", "rank"), P(value, "tiny")])
    t = Table([[cells[i] for i in range(4)]], colWidths=[118.75]*4, hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), CARD),
        ("BACKGROUND", (3,0), (3,0), colors.HexColor("#EDD6C7")),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("TOPPADDING", (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 11),
        ("LEFTPADDING", (0,0), (-1,-1), 10),
        ("RIGHTPADDING", (0,0), (-1,-1), 8),
        ("LINEBEFORE", (1,0), (-1,-1), 0.45, LINE),
        ("LINEBELOW", (0,0), (-1,-1), 0.6, LINE),
    ]))
    return KeepTogether([top,t,Spacer(1,14)])

def thread_motif(canvas, x, y, scale=1):
    canvas.saveState()
    canvas.setStrokeColor(RUST)
    canvas.setLineWidth(1.3*scale)
    for offset in (0, 10, 20):
        p = canvas.beginPath()
        p.moveTo(x, y+offset*scale)
        p.curveTo(x+40*scale,y+(offset+22)*scale,x+75*scale,y+(offset-18)*scale,x+110*scale,y+offset*scale)
        p.curveTo(x+145*scale,y+(offset+16)*scale,x+180*scale,y+(offset-13)*scale,x+224*scale,y+(offset+4)*scale)
        canvas.drawPath(p, stroke=1)
    canvas.restoreState()

def curve(canvas, coordinates, closed=False):
    p = canvas.beginPath()
    p.moveTo(*coordinates[0])
    for x, y in coordinates[1:]:
        p.lineTo(x, y)
    if closed:
        p.close()
    canvas.drawPath(p, stroke=1, fill=0)

def knot(canvas, x, y, radius, color=RUST, width=1):
    canvas.saveState()
    canvas.setStrokeColor(color)
    canvas.setLineWidth(width)
    pts=[]
    for i in range(361):
        t=2*math.pi*i/360
        pts.append((x+radius*(math.sin(t)+2*math.sin(2*t))/3,
                    y+radius*(math.cos(t)-2*math.cos(2*t))/3))
    curve(canvas,pts,True)
    canvas.restoreState()

def spiral(canvas, x, y, radius, color=RUST, width=0.7):
    canvas.saveState()
    canvas.setStrokeColor(color)
    canvas.setLineWidth(width)
    points=[]
    for i in range(200):
        t=i/199*math.pi*3.6
        r=radius*(0.09+0.91*i/199)
        points.append((x+r*math.cos(t), y+r*math.sin(t)))
    curve(canvas,points)
    canvas.restoreState()

def seal(canvas, x, y, size=1, color=RUST, secondary=OCHRE):
    """Graphic interpretation of the supplied Circle, Horn and magical knot."""
    canvas.saveState()
    canvas.translate(x,y)
    canvas.scale(size,size)
    small = size < 0.3
    canvas.setStrokeColor(color)
    canvas.setLineWidth(4.0 if small else 1.05)
    canvas.circle(0,0,55,stroke=1,fill=0)
    if not small:
        canvas.setStrokeColor(secondary)
        canvas.setLineWidth(0.55)
        canvas.circle(0,0,49,stroke=1,fill=0)
        knot(canvas,0,0,37,color,1.25)
    # A single tapered horn grows upward from the circle.
    horn=canvas.beginPath()
    horn.moveTo(32,44)
    horn.curveTo(61,50,83,73,87,104)
    horn.curveTo(73,80,56,69,37,64)
    horn.curveTo(43,57,40,48,32,44)
    horn.close()
    canvas.setFillColor(color)
    canvas.drawPath(horn,stroke=0,fill=1)
    if not small:
        canvas.setStrokeColor(PAPER)
        canvas.setLineWidth(0.55)
        for a,b,c,d in [(43,54,53,61),(54,65,64,72),(66,78,72,84)]:
            ridge=canvas.beginPath()
            ridge.moveTo(a,b)
            ridge.curveTo(a+2,b+3,c-2,d-1,c,d)
            canvas.drawPath(ridge,stroke=1,fill=0)
        canvas.setStrokeColor(secondary)
        canvas.setLineWidth(0.55)
        canvas.circle(0,0,6.8,stroke=1,fill=0)
        for angle in range(0,360,45):
            t=math.radians(angle)
            canvas.line(9*math.cos(t),9*math.sin(t),13*math.cos(t),13*math.sin(t))
    else:
        canvas.setFillColor(color)
        canvas.circle(0,0,7,stroke=0,fill=1)
    # Three points suggest the star moving through the Lines of Magic.
    for angle, r in [(150,1.6),(230,1.1),(285,1.6)]:
        t=math.radians(angle)
        canvas.setFillColor(color)
        canvas.circle(55*math.cos(t),55*math.sin(t),r,stroke=0,fill=1)
    canvas.restoreState()

def constellation(canvas, y, width=190):
    x=(PW-width)/2
    canvas.saveState()
    canvas.setStrokeColor(FAINT)
    canvas.setLineWidth(0.55)
    path=canvas.beginPath()
    path.moveTo(x,y)
    path.curveTo(x+width*.3,y+10,x+width*.66,y-9,x+width,y+3)
    canvas.drawPath(path,stroke=1,fill=0)
    canvas.setFillColor(OCHRE)
    for px,py,r in [(x+15,y+2,1),(x+width*.42,y+2,1.7),(x+width-12,y+2,1)]:
        canvas.circle(px,py,r,stroke=0,fill=1)
    canvas.restoreState()

def cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0,0,PW,PH,fill=1,stroke=0)
    art = ImageReader(str(ART))
    aw, ah = art.getSize()
    factor = max(PW / aw, PH / ah)
    canvas.drawImage(art, (PW-aw*factor)/2, (PH-ah*factor)/2,
                     width=aw*factor, height=ah*factor, mask="auto")
    canvas.setFillColor(RUST)
    canvas.setFont("Arial-Bold",9)
    canvas.drawCentredString(PW/2, 156, "Э Н О А   /   П О Д К Л А С С   В О Л Ш Е Б Н И К А")
    canvas.setFillColor(BLACK)
    canvas.setFont("Georgia",43)
    canvas.drawCentredString(PW/2, 100, "Хакар")
    canvas.setStrokeColor(RUST)
    canvas.setLineWidth(1)
    canvas.line(210, 84, PW-210, 84)
    canvas.setFont("Georgia-Italic",12)
    canvas.setFillColor(RUST)
    canvas.drawCentredString(PW/2, 58, "Нити Ильбеша")
    canvas.setFont("Arial",7.5)
    canvas.drawCentredString(PW/2, 32, "D&D 2024")
    canvas.restoreState()

def woven_geometry():
    # A closed reflected strand, turned 45 degrees into an orthogonal lattice.
    # The phase keeps all edge turns separate and the route continuous.
    breaks = {0.0, 2.0}
    breaks.update(k/3 for k in range(7))
    breaks.update((k-.5)/4 for k in range(1,9))
    def tri(v):
        return 1 - 2*abs((v % 2)-1)
    vertices=[]
    for t in sorted(breaks):
        u,v=4*tri(3*t),3*tri(4*t+.5)
        vertices.append(((u-v)/math.sqrt(2),(u+v)/math.sqrt(2)))
    crossings=[]
    for i,(a,b) in enumerate(zip(vertices,vertices[1:])):
        horizontal=abs(a[1]-b[1])<1e-7
        if not horizontal:
            continue
        for j,(c,d) in enumerate(zip(vertices,vertices[1:])):
            if abs(c[0]-d[0])>1e-7:
                continue
            px,py=c[0],a[1]
            if min(a[0],b[0])+1e-6<px<max(a[0],b[0])-1e-6 and min(c[1],d[1])+1e-6<py<max(c[1],d[1])-1e-6:
                crossings.append((px,py,i,j))
    return vertices,crossings

def woven_knot(canvas, x, y, size=150, color=RUST):
    vertices,crossings=woven_geometry()
    extent=max(max(abs(px),abs(py)) for px,py in vertices)
    scale=size/(2*extent)
    points=[(x+px*scale,y+py*scale) for px,py in vertices]
    width=size*.047
    canvas.saveState()
    canvas.setLineCap(0)
    canvas.setLineJoin(0)
    canvas.setStrokeColor(color)
    canvas.setLineWidth(width)
    curve(canvas,points,True)
    # Each crossing has a paper gap under a solid overpass.
    # Alternation follows the crossing order along the horizontal runs.
    encounters=[]
    for idx,(px,py,i,j) in enumerate(crossings):
        for seg in (i,j):
            a,b=vertices[seg],vertices[seg+1]
            position=math.hypot(px-a[0],py-a[1])/math.hypot(b[0]-a[0],b[1]-a[1])
            encounters.append((seg+position,idx,seg))
    over={}
    for ordinal,(_,idx,seg) in enumerate(sorted(encounters)):
        if ordinal%2==0:
            over[idx]=seg
    for idx,(px,py,i,j) in enumerate(crossings):
        horizontal=over.get(idx,i)==i
        cx,cy=x+px*scale,y+py*scale
        half=width*.95
        if horizontal:
            a,b=(cx-half,cy),(cx+half,cy)
        else:
            a,b=(cx,cy-half),(cx,cy+half)
        canvas.setStrokeColor(PAPER)
        canvas.setLineWidth(width*1.72)
        canvas.line(*a,*b)
        canvas.setStrokeColor(color)
        canvas.setLineWidth(width)
        canvas.line(*a,*b)
    canvas.restoreState()

def page_bg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0,0,PW,PH,fill=1,stroke=0)
    if doc.page == 2:
        woven_knot(canvas,PW/2,207,145)
    canvas.setStrokeColor(RUST)
    canvas.setLineWidth(0.7)
    canvas.line(59, PH-47, PW-59, PH-47)
    canvas.setFillColor(RUST)
    canvas.rect(PW-63,PH-51,8,8,fill=1,stroke=0)
    canvas.setFont("Arial",7.5)
    canvas.setFillColor(GRAY)
    canvas.drawString(60,31,"ЭНОА · ХАКАР")
    canvas.drawRightString(PW-60,31,str(doc.page-1).zfill(2))
    canvas.setStrokeColor(LINE)
    canvas.line(60,43,PW-60,43)
    canvas.restoreState()

doc = BaseDocTemplate(str(OUTPUT), pagesize=A4, leftMargin=60, rightMargin=60,
                      topMargin=68, bottomMargin=58,
                      title="Хакар — подкласс волшебника D&D 2024", author="Эноа")
frame = Frame(60,58,PW-120,PH-126,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)
doc.addPageTemplates([
    PageTemplate(id="cover",frames=[frame],onPage=cover),
    PageTemplate(id="pages",frames=[frame],onPage=page_bg),
])

raw = SOURCE.read_text(encoding="utf-8-sig")
intro_lines = lines_between(raw,"_Подкласс волшебника · D&D 2024_","| Уровень")
overview = [split_table_line(x) for x in raw.splitlines() if x.startswith("| **") and len(split_table_line(x)) == 2]
foreign = lines_between(raw,"## Уровень 3: Чужая нить","## Уровень 3: Нити Ильбеша")
ilbesh = lines_between(raw,"## Уровень 3: Нити Ильбеша","## Уровень 6: Переплетенная нить")
complications = [split_table_line(x) for x in ilbesh if x.startswith("| **") and len(split_table_line(x)) >= 6]
before_table = [x for x in ilbesh if not x.startswith("|")][:2]
after_table = [x for x in ilbesh if not x.startswith("|")][2:]
level6 = lines_between(raw,"## Уровень 6: Переплетенная нить","## Уровень 10: Оборванная нить")
level10 = lines_between(raw,"## Уровень 10: Оборванная нить","## Уровень 14: Обман Ильбеша")
level14 = lines_between(raw,"## Уровень 14: Обман Ильбеша")

story = [NextPageTemplate("pages"),Spacer(1,1),PageBreak()]

# 1: lore opening, supplied verbatim by the user.
story += [P("МИР ЭНОА", "kicker"), heading("Хакары",1)]
story += [P(par,"lore") for par in LORE]
story += [PageBreak()]

# 2: subclass introduction and the first feature.
story += [P("ПОДКЛАСС ВОЛШЕБНИКА · D&D 2024", "kicker"),heading("Хакар",1)]
story += rule_lines(intro_lines)
overview_data = [[P("УРОВЕНЬ","rank"),P("УМЕНИЕ","rank")]]
overview_data += [[P(a,"small"),P(b,"small")] for a,b in overview]
overview_table = Table(overview_data,colWidths=[80,395],hAlign="LEFT")
overview_table.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,0),colors.HexColor("#E8D6C7")),
    ("LINEBELOW",(0,0),(-1,-1),0.5,LINE),
    ("VALIGN",(0,0),(-1,-1),"TOP"),
    ("TOPPADDING",(0,0),(-1,-1),6),
    ("BOTTOMPADDING",(0,0),(-1,-1),6),
]))
story += [Spacer(1,7),overview_table,Spacer(1,10),heading("Уровень 3: Чужая нить")]
story += rule_lines(foreign)
story += [PageBreak()]

# 3-4: dangers displayed as four large readable panels.
story += [P("ЦЕНА СИЛЫ", "kicker"),heading("Уровень 3: Нити Ильбеша",1)]
story += rule_lines(before_table)
story += [Spacer(1,8),card(complications[0]),card(complications[1]),PageBreak()]
story += [P("НИТИ ИЛЬБЕША · ПРОДОЛЖЕНИЕ", "kicker"),card(complications[2]),card(complications[3])]
story += rule_lines(after_table)
story += [PageBreak()]

# 5: the subclass's later features.
story += [P("ПУТЬ ХАКАРА", "kicker"),heading("Уровень 6: Переплетенная нить",1)]
story += rule_lines(level6)
story += [heading("Уровень 10: Оборванная нить")]
story += rule_lines(level10)
story += [heading("Уровень 14: Обман Ильбеша")]
story += rule_lines(level14)

doc.build(story)
print(OUTPUT)
