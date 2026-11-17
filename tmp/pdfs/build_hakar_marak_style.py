from pathlib import Path
import html
import re

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, Image, KeepTogether, NextPageTemplate,
    PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle,
)

ROOT = Path(r"C:\Projects\ENOA\tkk")
SOURCE = Path(r"C:\Users\Admin\.codex\attachments\a9f8b71c-068b-4d79-91e2-b6b4e2322e12\Вставленный текст.txt")
ART = ROOT / "output" / "pdf" / "Хакар — иллюстрация по референсам.png"
REFERENCE_VIGNETTE = Path(r"C:\ENOA\Изображения\Маракийцы\Marak4.png")
OUTPUT = ROOT / "output" / "pdf" / "Хакар — в стиле маракийских иллюстраций.pdf"

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
    "small": ParagraphStyle("small", fontName="Arial", fontSize=8.6, leading=12.5,
                            textColor=BLACK, spaceAfter=4),
    "tiny": ParagraphStyle("tiny", fontName="Arial", fontSize=7.85, leading=11.3,
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

def cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0,0,PW,PH,fill=1,stroke=0)
    canvas.drawImage(str(ART), 0, 0, width=PW, height=PH, mask="auto")
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
    canvas.restoreState()

def page_bg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0,0,PW,PH,fill=1,stroke=0)
    if doc.page == 2:
        canvas.drawImage(str(REFERENCE_VIGNETTE), 213, 72, width=170, height=278,
                         mask="auto")
    elif doc.page == 5:
        thread_motif(canvas, 100, 138, 1.7)
    canvas.setStrokeColor(RUST)
    canvas.setLineWidth(0.7)
    canvas.line(59, PH-47, PW-59, PH-47)
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
story += [P("ПРЕДЫСТОРИЯ", "kicker"), heading("Хакары",1)]
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
