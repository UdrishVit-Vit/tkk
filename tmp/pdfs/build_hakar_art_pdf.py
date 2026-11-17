from pathlib import Path
import html
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, KeepTogether, NextPageTemplate, PageBreak, PageTemplate, Paragraph,
    Spacer, Table, TableStyle,
)

SOURCE = Path(r"C:\Users\Admin\.codex\attachments\a9f8b71c-068b-4d79-91e2-b6b4e2322e12\Вставленный текст.txt")
OUTPUT = Path(r"C:\Projects\ENOA\tkk\output\pdf\Хакар — художественное оформление.pdf")
COVER_ART = Path(r"C:\Projects\ENOA\tkk\output\pdf\Хакар — обложка.png")
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

pdfmetrics.registerFont(TTFont("Arial", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", r"C:\Windows\Fonts\arialbd.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Italic", r"C:\Windows\Fonts\ariali.ttf"))
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold", italic="Arial-Italic")
pdfmetrics.registerFont(TTFont("Georgia", r"C:\Windows\Fonts\georgia.ttf"))
pdfmetrics.registerFont(TTFont("Georgia-Bold", r"C:\Windows\Fonts\georgiab.ttf"))

W, H = landscape(A4)
NAVY = colors.HexColor("#172849")
GOLD = colors.HexColor("#B87835")
PALE = colors.HexColor("#F4E9D7")
PARCHMENT = colors.HexColor("#FBF7EE")
INK = colors.HexColor("#26334A")

styles = {
    "title": ParagraphStyle("title", fontName="Georgia-Bold", fontSize=23, leading=28,
                            textColor=NAVY, spaceAfter=7),
    "subtitle": ParagraphStyle("subtitle", fontName="Arial-Italic", fontSize=10.2,
                               leading=14, textColor=colors.HexColor("#5D6470"), spaceAfter=13),
    "heading": ParagraphStyle("heading", fontName="Georgia-Bold", fontSize=13.2, leading=17,
                              textColor=NAVY, spaceBefore=15, spaceAfter=7, keepWithNext=True),
    "body": ParagraphStyle("body", fontName="Arial", fontSize=9.8, leading=14.5,
                           textColor=INK, spaceAfter=8),
    "table": ParagraphStyle("table", fontName="Arial", fontSize=7.65, leading=10.4,
                            textColor=INK),
    "table_head": ParagraphStyle("table_head", fontName="Arial-Bold", fontSize=7.65,
                                 leading=10.4, textColor=colors.white),
    "small": ParagraphStyle("small", fontName="Arial", fontSize=8.2, leading=11.1),
}

def markup(s):
    s = html.escape(s.strip())
    s = re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"_(.*?)_", r"<i>\1</i>", s)
    s = s.replace("&lt;br&gt;", "<br/>")
    return s

def split_table(line):
    cells = line.strip().strip("|").split("|")
    # The source contains two trailing empty Markdown columns. They carry no content.
    while cells and not cells[-1].strip():
        cells.pop()
    return [c.strip() for c in cells]

def make_table(lines):
    rows = [split_table(line) for line in lines]
    rows = [rows[0]] + rows[2:]
    n = len(rows[0])
    rows = [(r + [""] * n)[:n] for r in rows]
    feature_table = n == 2
    widths = ([65, 265] if feature_table else [29, 225, 92, 92, 92, 159])
    if feature_table:
        widths = [75, 320]
    table_data = []
    for row_i, row in enumerate(rows):
        style = styles["table_head"] if row_i == 0 else (styles["small"] if feature_table else styles["table"])
        table_data.append([Paragraph(markup(c), style) for c in row])
    t = Table(table_data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    ts = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 6 if not feature_table else 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6 if not feature_table else 7),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("LINEBELOW", (0, 0), (-1, 0), 1.2, GOLD),
    ]
    for ri in range(1, len(rows)):
        ts.append(("BACKGROUND", (0, ri), (-1, ri), colors.white if ri % 2 == 0 else PALE))
        ts.append(("LINEBELOW", (0, ri), (-1, ri), 0.35, colors.HexColor("#D8D2C8")))
    t.setStyle(TableStyle(ts))
    return t

def star(canvas, cx, cy, radius, color, stroke=0.7):
    import math
    canvas.saveState()
    canvas.setStrokeColor(color)
    canvas.setLineWidth(stroke)
    pts = []
    for k in range(16):
        angle = math.pi / 2 + k * math.pi / 8
        r = radius if k % 2 == 0 else radius * 0.42
        pts.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    p = canvas.beginPath()
    p.moveTo(*pts[0])
    for point in pts[1:]:
        p.lineTo(*point)
    p.close()
    canvas.drawPath(p, stroke=1, fill=0)
    canvas.circle(cx, cy, radius * 0.2, stroke=1, fill=0)
    canvas.restoreState()

def cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    art_x = 445
    canvas.drawImage(str(COVER_ART), art_x, 0, width=W - art_x, height=H,
                     preserveAspectRatio=False, mask="auto")
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(2)
    canvas.line(art_x - 1, 0, art_x - 1, H)
    canvas.setStrokeColor(colors.HexColor("#E7BD75"))
    canvas.setLineWidth(0.8)
    canvas.rect(25, 25, art_x - 51, H - 50, stroke=1, fill=0)
    canvas.rect(31, 31, art_x - 63, H - 62, stroke=1, fill=0)
    for x in (29, art_x - 29):
        for y in (29, H - 29):
            star(canvas, x, y, 11, colors.HexColor("#E7BD75"))
    for x,y,r in [(102,464,5),(208,498,3),(338,444,4),(154,385,2),(365,535,2)]:
        star(canvas, x, y, r, colors.HexColor("#D6A960"), 0.45)
    canvas.setFillColor(colors.HexColor("#E5BE81"))
    canvas.setFont("Arial-Bold", 10)
    canvas.drawString(65, H - 80, "ЭНОА")
    canvas.setFont("Georgia-Bold", 54)
    canvas.setFillColor(PARCHMENT)
    canvas.drawString(61, 317, "Хакар")
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(1.5)
    canvas.line(62, 295, 293, 295)
    canvas.setFont("Georgia", 16)
    canvas.setFillColor(colors.HexColor("#E6D3B3"))
    canvas.drawString(63, 264, "Подкласс волшебника")
    canvas.drawString(63, 240, "D&D 2024")
    canvas.setFont("Arial", 9)
    canvas.setFillColor(colors.HexColor("#BFAE92"))
    canvas.drawString(63, 74, "Нити Искры  ·  Гнев Ильбеша")
    canvas.restoreState()

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PARCHMENT)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    canvas.setStrokeColor(colors.HexColor("#D6AC74"))
    canvas.setLineWidth(0.65)
    canvas.rect(23, 22, W - 46, H - 44, fill=0, stroke=1)
    canvas.setStrokeColor(colors.HexColor("#E6CDAA"))
    canvas.rect(27, 26, W - 54, H - 52, fill=0, stroke=1)
    for x in (25, W - 25):
        for y in (24, H - 24):
            star(canvas, x, y, 8, GOLD, 0.65)
    for x in (58, 97, 136, W - 136, W - 97, W - 58):
        star(canvas, x, H - 23.5, 2.5, GOLD, 0.4)
    # Faint knotwork rests below the text, outside the reading area.
    if doc.page in (3, 4):
        c = colors.HexColor("#EAD9BF")
        for cx,cy,r in [(450,127,54),(510,138,70),(570,120,52)]:
            canvas.setStrokeColor(c)
            canvas.setLineWidth(0.6)
            canvas.circle(cx,cy,r,stroke=1,fill=0)
            star(canvas,cx,cy,r*.5,c,0.8)
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(0.7)
    canvas.line(46, 38, W - 46, 38)
    canvas.setFont("Arial", 8)
    canvas.setFillColor(NAVY)
    canvas.drawString(48, 27, "Хакар · Подкласс волшебника · D&D 2024")
    canvas.drawRightString(W - 48, 27, str(doc.page - 1))
    canvas.restoreState()

doc = BaseDocTemplate(str(OUTPUT), pagesize=(W, H), leftMargin=48, rightMargin=48,
                      topMargin=45, bottomMargin=52, title="Хакар — художественное оформление",
                      author="Эноа")
frame = Frame(48, 52, W - 96, H - 97, leftPadding=0, rightPadding=0,
              topPadding=0, bottomPadding=0)
doc.addPageTemplates([
    PageTemplate(id="cover", frames=[frame], onPage=cover),
    PageTemplate(id="interior", frames=[frame], onPage=footer),
])

raw_lines = SOURCE.read_text(encoding="utf-8-sig").splitlines()
story = [NextPageTemplate("interior"), Spacer(1, 1), PageBreak()]
i = 0
while i < len(raw_lines):
    line = raw_lines[i].strip()
    if not line:
        i += 1
        continue
    if line.startswith("| "):
        group = []
        while i < len(raw_lines) and raw_lines[i].strip().startswith("|"):
            group.append(raw_lines[i])
            i += 1
        story.append(make_table(group))
        story.append(Spacer(1, 7))
        continue
    if line.startswith("# "):
        story.append(Paragraph(markup(line[2:]), styles["title"]))
    elif line.startswith("## "):
        story.append(Paragraph(markup(line[3:]), styles["heading"]))
    elif line.startswith("_") and line.endswith("_"):
        story.append(Paragraph(markup(line), styles["subtitle"]))
    else:
        story.append(Paragraph(markup(line), styles["body"]))
    i += 1

for idx, item in enumerate(story):
    if isinstance(item, Paragraph) and item.text == "Уровень 6: Переплетенная нить":
        story[idx:idx + 3] = [KeepTogether(story[idx:idx + 3])]
        break

doc.build(story)
print(OUTPUT)
