import ast, math
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor, white

ROOT=Path('C:/Projects/ENOA/tkk')
tree=ast.parse((ROOT/'tmp/pdfs/build_manual.py').read_text(encoding='utf-8-sig'))
pages=next(ast.literal_eval(n.value) for n in tree.body if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='pages' for t in n.targets))
pages[2][1].pop()
pdfmetrics.registerFont(TTFont('AR','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ARB','C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('AR',normal='AR',bold='ARB')
OUT=ROOT/'output/pdf/AF11_RU_Illustrated.pdf'
c=canvas.Canvas(str(OUT),pagesize=A4)
W,H=A4
INK='#263e4a'; TEAL='#197c85'; ORANGE='#bc6334'; GRAY='#71828b'; PALE='#eff5f6'
def line(x1,y1,x2,y2,color=INK,width=1.3):
 c.setStrokeColor(HexColor(color)); c.setLineWidth(width); c.line(x1,y1,x2,y2)
def text(x,y,s,size=10,color=INK,bold=False):
 c.setFillColor(HexColor(color)); c.setFont('ARB' if bold else 'AR',size); c.drawString(x,y,s)
def path(points,color=INK,width=1.6):
 p=c.beginPath(); p.moveTo(*points[0])
 for a in points[1:]:
  if len(a)==2:p.lineTo(*a)
  else:p.curveTo(*a)
 c.setStrokeColor(HexColor(color));c.setLineWidth(width);c.drawPath(p)
def rect(x,y,w,h,fill=PALE,r=4):
 c.setFillColor(HexColor(fill));c.setStrokeColor(HexColor(INK));c.setLineWidth(1.2);c.roundRect(x,y,w,h,r,fill=1,stroke=1)
def arrow(x,y,xx,yy,color=TEAL):
 line(x,y,xx,yy,color,2)
 a=math.atan2(yy-y,xx-x)
 for d in [-.45,.45]:line(xx,yy,xx-8*math.cos(a+d),yy-8*math.sin(a+d),color,2)
def dot(x,y,n):
 c.setFillColor(HexColor(TEAL));c.circle(x,y,9,fill=1,stroke=0);text(x-3,y-3,str(n),9,'#ffffff',True)
def needle(x,y,h=50,scale=1):
 c.saveState();c.translate(x,y);c.scale(scale,scale)
 path([(0,0),(0,h),(0,h+10,10,h+10,10,h),(10,h-3)],INK,1.4)
 line(0,h-8,8,h-1,GRAY,1)
 c.restoreState()
def carriage(x,y,s=1):
 c.saveState();c.translate(x,y);c.scale(s,s)
 rect(0,0,94,106,'#e1ebee',12);rect(5,-7,84,15,'#cbd9df',4)
 path([(18,67),(15,94,78,94,76,67)],INK,7)
 path([(18,67),(15,94,78,94,76,67)],'#ffffff',3)
 c.setFillColor(white);c.setStrokeColor(HexColor(INK));c.ellipse(34,55,62,75,fill=1)
 rect(38,104,20,9,'#ffffff',3);line(49,113,49,121)
 c.restoreState()
def ball(x,y,color=TEAL):
 c.setFillColor(HexColor('#ffffff'));c.setStrokeColor(HexColor(color));c.setLineWidth(1.5);c.circle(x,y,13,fill=1)
 for z in [-8,-3,2,7]:path([(x-9,y+z),(x,y+z+8,x+5,y+z+5,x+10,y+z-1)],color,1)
def machine(x,y,w=400,side='left',fabric=True,colors=False):
 rect(x,y,w,58,'#e6eef1',6)
 line(x+9,y+13,x+w-9,y+13,GRAY)
 for k in range(32):
  xx=x+15+k*(w-30)/31
  line(xx,y+5,xx,y+49,'#a2b1b8',.6)
 for k in range(24):needle(x+65+k*(w-130)/23,y+30,35)
 if fabric:
  rect(x+65,y-75,w-130,74,'#f2eee8',1)
  for row in range(8):
   for col in range(23):
    xx=x+69+col*(w-140)/23; yy=y-7-row*8
    clr=TEAL if colors and col<8 else ORANGE if colors and col<16 else '#a0a8a8'
    path([(xx,yy),(xx+3,yy-4),(xx+6,yy)],clr,.7)
 if side: carriage(x-12 if side=='left' else x+w-68,y-5,.8)
def panel(title):
 c.setFillColor(HexColor(PALE));c.roundRect(36,56,W-72,365,12,fill=1,stroke=0)
 text(52,399,title,11,TEAL,True)
def parts():
 panel('01  /  Органы управления')
 carriage(85,180,1.65)
 for x,y,n,tx,ty,label in [(166,380,1,290,363,'Толкатель счётчика рядов'),(164,360,2,290,322,'Рычаг снятия каретки'),(164,288,3,290,278,'Регулятор плотности')]:
  dot(x,y,n);line(x+12,y,tx-12,ty+3,GRAY,.9);text(tx,ty,label,10)
 text(80,124,'Шкала 1–9',12,GRAY,True);text(80,104,'Шаг игл 9,0 мм',10)
 text(305,124,'Шкала R–7',12,TEAL,True);text(305,104,'Шаг игл 6,5 мм',10)
def positions():
 panel('02  /  Четыре положения игл')
 line(75,210,520,210,GRAY,2);line(75,200,520,200,GRAY,2)
 for j,(label,ext) in enumerate([('A',8),('B',45),('C',80),('D',115)]):
  xx=100+j*110
  for k in range(3):needle(xx+k*15,135,76+ext)
  text(xx+8,350,label,18,TEAL,True)
  text(xx-10,106,['Не вяжет','Переход в C','Провязывает','Не вяжет'][j],10)
 text(78,74,'Схема положений; расстояния показаны условно.',9,GRAY)
def preparation():
 panel('03  /  Клубки и подготовленное полотно')
 for i,clr in enumerate([TEAL,ORANGE,GRAY,TEAL,ORANGE]):ball(115+i*85,355,clr)
 machine(90,225,410,'left')
 rect(155,150,280,28,'#d6e3e8',1)
 for xx in [155,420]:rect(xx,130,15,30,'#71828b',2)
 c.setFillColor(HexColor('#f2eee8'));c.rect(183,188,204,17,fill=1,stroke=0)
 text(190,193,'Основная нить: лицевая гладь',10)
 text(191,159,'10 рядов вспомогательной нитью',9)
 text(97,98,'Грузы по краям полотна',10);arrow(165,115,164,131)
 ball(480,123,TEAL);path([(475,137),(475,173,458,190,434,216)],TEAL)
def install():
 panel('04  /  Первый проход без провязывания')
 machine(87,268,410,'right')
 ball(95,170);path([(108,170),(140,175,140,238,153,268)],TEAL)
 arrow(475,365,350,365);text(180,361,'Каретка напротив нити',10)
 text(101,113,'B',23,GRAY,True);arrow(139,120,205,120);text(224,113,'C',23,TEAL,True)
 text(278,122,'Иглы переходят в C.',11);text(278,101,'Петли не провязываются.',11)
def firstrow():
 panel('05  /  Укладка нитей и провязывание')
 machine(87,245,410,'left',True,True)
 for start,stop,clr in [(152,235,TEAL),(242,325,ORANGE),(332,414,GRAY)]:
  line(start,310,stop,310,clr,2.7);path([(stop,310),(stop+5,342,stop+10,349,stop+10,359)],clr,2)
 arrow(82,357,160,357);text(179,354,'Начинайте со стороны каретки',10)
 needle(114,88,49,1.1);line(119,143,149,143,ORANGE,2.5)
 text(170,132,'Язычок открыт.',11,TEAL,True)
 text(170,113,'Нить лежит в крючке иглы.',10)
 text(170,94,'Придерживайте нити, убирая слабину.',10)
def crossing_row(y,reverse=False):
 x=115; step=22
 # Three color areas with two joins; redraw the original mirrored interlocks.
 line(x,y,x+90,y,TEAL,4);line(x+90,y,x+222,y,ORANGE,4);line(x+222,y,x+330,y,TEAL,4)
 for k in range(16):
  xx=x+k*step
  path([(xx,y-5),(xx,y+9,xx+4,y+9,xx+4,y-5)],'#ffffff',4)
  path([(xx,y-5),(xx,y+9,xx+4,y+9,xx+4,y-5)],INK,.9)
 for j,b in enumerate([x+90,x+222]):
  direction=-1 if reverse else 1
  under=TEAL if j==0 else ORANGE;over=ORANGE if j==0 else TEAL
  path([(b,y),(b-14*direction,y-18,b+10*direction,y-17,b+2*direction,y-37),(b+2*direction,y-68)],under,3.5)
  pts=[(b+8*direction,y),(b+20*direction,y-13,b-6*direction,y-20,b-6*direction,y-31),(b-10*direction,y-68)]
  path(pts,'#ffffff',6);path(pts,over,3.5)
def joins():
 panel('06  /  Перекрещивание на границах цветовых участков')
 text(62,354,'A',16,TEAL,True);arrow(465,355,385,355);text(100,354,'Каретка движется влево',11)
 crossing_row(320)
 text(62,211,'B',16,TEAL,True);arrow(385,212,465,212);text(100,211,'Каретка движется вправо',11)
 crossing_row(176,True)
 text(100,78,'Разные цвета линий обозначают соседние нити.',9,GRAY)
def hints():
 panel('07  /  Лицевая гладь и снятие каретки')
 machine(90,298,410,'right',False)
 line(155,363,425,363,TEAL,2.6);arrow(469,377,413,377)
 text(151,271,'Одна нить во всех крючках игл в C',10)
 carriage(129,102,1)
 arrow(175,228,175,216,ORANGE);arrow(105,122,105,190)
 text(269,185,'Нажмите рычаг.',11,TEAL,True)
 text(269,163,'Поднимите каретку с игольницы.',10)
 text(269,141,'Установите её на любом краю.',10)
def recovery():
 panel('08  /  Возврат петли и подготовка игл')
 for j in range(3):
  x=112+j*160
  needle(x,260,71)
  yy=[285,314,334][j]
  c.setStrokeColor(HexColor(ORANGE));c.setLineWidth(2);c.ellipse(x-7,yy-5,x+12,yy+9)
  if j<2:
   path([(x+55,272),(x+6,yy+1)],GRAY,3);c.setStrokeColor(HexColor(GRAY));c.ellipse(x+1,yy-3,x+12,yy+5)
   arrow(x-24,yy-10,x-24,yy+17)
  dot(x,370,j+1)
 for x,t in [(72,'Петля на стержне'),(227,'Поднимите деккером'),(399,'Петля в крючке')]:text(x,240,t,9)
 text(79,186,'После распускания провязанных петель:',11,TEAL,True)
 text(96,132,'B',23,GRAY,True);arrow(135,140,200,140);text(219,132,'C',23,TEAL,True)
 text(278,151,'Выдвиньте иглы в C.',10)
 text(278,132,'Откройте все язычки.',10)
 text(278,113,'Скорректируйте счётчик рядов.',10)

body=ParagraphStyle('body',fontName='AR',fontSize=11,leading=15,textColor=HexColor(INK))
head=ParagraphStyle('head',fontName='ARB',fontSize=19,leading=23,textColor=HexColor(INK))
small=ParagraphStyle('small',fontName='AR',fontSize=8.5,leading=11,textColor=HexColor(GRAY))
def para(s,style,y):
 p=Paragraph(s,style);_,h=p.wrap(W-80,H);p.drawOn(c,40,y-h);return y-h
c.setTitle('AF11: Интарсионная каретка. Иллюстрированная инструкция на русском')
c.setAuthor('Русский перевод и новые векторные схемы по предоставленному оригиналу')
for i,((title,items),draw) in enumerate(zip(pages,[parts,positions,preparation,install,firstrow,joins,hints,recovery]),1):
 text(40,H-30,'AF11',15,TEAL,True);text(99,H-29,'ИНТАРСИОННАЯ КАРЕТКА',9,GRAY,True)
 line(40,H-43,W-40,H-43,'#c9d9df',.8)
 y=para(title,head,H-60)-13
 if i==1:y=para('Инструкция по эксплуатации. Перевод страниц 2–9 предоставленного оригинала. Схемы перерисованы и упрощены; пропорции условные.',small,y)-10
 for item in items:y=para(item,body,y)-6
 assert y>437,(i,y)
 draw()
 line(40,42,W-40,42,'#c9d9df',.8)
 text(40,26,'AF11 · Инструкция на русском языке',8,GRAY)
 text(W-162,26,f'Оригинал: стр. {i+1}   |   {i} / 8',8,GRAY)
 c.showPage()
c.save()
print(OUT)

