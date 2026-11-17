import ast
from pathlib import Path
import numpy as np
from PIL import Image,ImageFilter,ImageDraw
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.colors import HexColor

R=Path('C:/Projects/ENOA/tkk')
t=ast.parse((R/'tmp/pdfs/build_manual.py').read_text(encoding='utf-8-sig'))
pages=next(ast.literal_eval(n.value) for n in t.body if isinstance(n,ast.Assign) and any(isinstance(k,ast.Name) and k.id=='pages' for k in n.targets))
pages[2][1][-1]='<b>Подписи к рисункам:</b><br/>1 - полотно из вспомогательной нити;<br/>2 - лицевая гладь.'
for j in range(5):pages[0][1][j]=f'<b>{j+1}.</b> '+pages[0][1][j]
pdfmetrics.registerFont(TTFont('AR','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ARB','C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('AR',normal='AR',bold='ARB')
OUT=R/'output/pdf/AF11_RU_Original_Illustrations.pdf'
c=canvas.Canvas(str(OUT),pagesize=landscape(A4));W,H=landscape(A4)
c.setTitle('AF11 - Русская инструкция с оригинальными рисунками')
c.setAuthor('Перевод на русский; рисунки из предоставленной инструкции')
body=ParagraphStyle('b',fontName='AR',fontSize=11.5,leading=16,textColor=HexColor('#24343e'))
head=ParagraphStyle('h',fontName='ARB',fontSize=20,leading=24,textColor=HexColor('#24343e'))
small=ParagraphStyle('s',fontName='AR',fontSize=8.5,leading=12,textColor=HexColor('#647680'))
# Bounding boxes select only original printed diagrams. No redrawing or generative edits.
boxes={2:(185,110,625,780),3:(165,250,620,665),4:(20,155,580,785),5:(110,125,690,740),6:(75,105,670,800),7:(175,530,580,770),8:(140,140,650,710),9:(55,115,520,750)}
def clean(im):
 gray=im.convert('L')
 bg=gray.filter(ImageFilter.GaussianBlur(18))
 a=np.asarray(gray,dtype=float);b=np.asarray(bg,dtype=float)
 ratio=a/np.maximum(b,1)*255
 # Remove paper shading; retain antialiased original ink outlines.
 return Image.fromarray(np.uint8(np.clip((ratio-90)*255/115,0,255)))
def label(x,y,s,size=11):
 c.setFillColor(HexColor('#24343e'));c.setFont('ARB',size);c.drawString(x,y,s)
def paragraph(txt,style,x,y,width):
 p=Paragraph(txt,style);_,h=p.wrap(width,H);p.drawOn(c,x,y-h);return y-h
for page,(title,items) in enumerate(pages,2):
 label(36,H-30,'AF11  /  ИНТАРСИОННАЯ КАРЕТКА',10)
 c.setStrokeColor(HexColor('#ced9de'));c.line(36,H-42,W-36,H-42)
 paragraph(title,head,36,H-58,W-72)
 y=H-110
 if page==2:
  y=paragraph('Перевод предоставленных страниц 2–9. Рисунки сохранены из оригинала; фон фотографий удалён. Страница 1 не предоставлена.',small,420,y,W-456)-12
 for item in items:y=paragraph(item,body,420,y,W-456)-10
 assert y>48,(page,y)
 src=Image.open(R/f'tmp/pdfs/source_{page}.png')
 if page==7:
  # Keep both original crossing diagrams with their original A/B markers.
  top=clean(src.crop((145,255,590,480)))
  bottom=clean(src.crop((145,530,590,775)))
  im=Image.new('L',(445,510),255);im.paste(top,(0,0));im.paste(bottom,(0,265))
 else:im=clean(src.crop(boxes[page]))
 if page==4:
  d=ImageDraw.Draw(im)
  for b in [(423,270,560,305),(403,515,510,570),(400,587,520,625)]:d.rectangle(b,fill=255)
 out=R/f'tmp/pdfs/original_diagram_{page}.png';im.save(out)
 maxw,maxh=345,420
 scale=min(maxw/im.width,maxh/im.height)
 iw,ih=im.width*scale,im.height*scale
 xx=36+(345-iw)/2;yy=56+(420-ih)/2
 c.drawImage(str(out),xx,yy,width=iw,height=ih)
 def source_label(sx,sy,txt):
  label(xx+sx*scale,yy+ih-sy*scale-3,txt,11)
 if page==2:
  for sx,sy,tx in [(418,20,'1'),(418,100,'2'),(418,210,'3'),(418,490,'4'),(418,610,'5')]:source_label(sx,sy,tx)
 if page==4:
  source_label(430,287,'1');source_label(410,540,'1');source_label(405,603,'2')
 if page==7:
  source_label(13,282,'B')
 c.setStrokeColor(HexColor('#ced9de'));c.line(36,37,W-36,37)
 c.setFillColor(HexColor('#647680'));c.setFont('AR',8)
 c.drawString(36,22,'Оригинальные рисунки · Русский перевод')
 c.drawRightString(W-36,22,f'Страница оригинала {page}  |  {page-1} / 8')
 c.showPage()
c.save();print(OUT)
