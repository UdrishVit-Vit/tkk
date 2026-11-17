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
    BaseDocTemplate, Frame, KeepTogether, PageTemplate, Paragraph,
    Spacer, Table, TableStyle,
)

SOURCE = Path(r"C:\Users\Admin\.codex\attachments\a9f8b71c-068b-4d79-91e2-b6b4e2322e12\Вставленный текст.txt")
OUTPUT = Path(r"C:\Projects\ENOA\tkk\output\pdf\Хакар — подкласс волшебника D&D 2024.pdf")
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

pdfmetrics.registerFont(TTFont("Arial", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", r"C:\Windows\Fonts\arialbd.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Italic", r"C:\Windows\Fonts\ariali.ttf"))
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold", italic="Arial-Italic")

W, H = landscape(A4)
NAVY = colors.HexColor("#23344A")
GOLD = colors.HexColor("#B6863D")
PALE = colors.HexColor("#F5F1E9")

styles = {
    "title": ParagraphStyle("title", fontName="Arial-Bold", fontSize=23, leading=28,
                            textColor=NAVY, spaceAfter=7),
    "subtitle": ParagraphStyle("subtitle", fontName="Arial-Italic", fontSize=10.2,
                               leading=14, textColor=colors.HexColor("#5D6470"), spaceAfter=13),
    "heading": ParagraphStyle("heading", fontName="Arial-Bold", fontSize=13.2, leading=17,
                              textColor=NAVY, spaceBefore=15, spaceAfter=7, keepWithNext=True),
    "body": ParagraphStyle("body", fontName="Arial", fontSize=9.8, leading=14.5,
                           textColor=colors.HexColor("#242B35"), spaceAfter=8),
    "table": ParagraphStyle("table", fontName="Arial", fontSize=7.65, leading=10.4,
                            textColor=colors.HexColor("#242B35")),
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

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(0.8)
    canvas.line(38, 30, W - 38, 30)
    canvas.setFont("Arial", 8)
    canvas.setFillColor(colors.HexColor("#6A6A6A"))
    canvas.drawString(38, 19, "Хакар · Подкласс волшебника · D&D 2024")
    canvas.drawRightString(W - 38, 19, str(doc.page))
    canvas.restoreState()

doc = BaseDocTemplate(str(OUTPUT), pagesize=(W, H), leftMargin=38, rightMargin=38,
                      topMargin=36, bottomMargin=46, title="Хакар — подкласс волшебника",
                      author="Эноа")
frame = Frame(38, 46, W - 76, H - 82, leftPadding=0, rightPadding=0,
              topPadding=0, bottomPadding=0)
doc.addPageTemplates(PageTemplate(id="main", frames=[frame], onPage=footer))

raw_lines = SOURCE.read_text(encoding="utf-8-sig").splitlines()
story = []
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

doc.build(story)
print(OUTPUT)
