// Static navigation data for the knot hub, ported from the Claude Design prototype.
export const SYSTEMS = [
  { id:'5e',   name:'D&D 5e',     tag:'2014', groups:[
      { name:'Персонаж',    sections:['Классы','Расы и происхождения','Черты','Особенности классов','Предыстории','Заклинания'] },
      { name:'Предметы',    sections:['Оружие','Доспехи','Снаряжение','Драгоценности','Магические предметы'] },
      { name:'Инструменты', sections:['Знамения','Гнев Ильбеша','Чай'] },
      { name:'Мастерская',  sections:['Бестиарий','Ширма (справочник)'] },
  ] },
  { id:'2024', name:'D&D 5.5e',   tag:'2024', groups:[
      { name:'Персонаж',    sections:['Классы','Виды','Черты','Предыстории','Заклинания'] },
      { name:'Предметы',    sections:['Снаряжение','Магические предметы'] },
      { name:'Инструменты', sections:['Знамения','Гнев Ильбеша','Чай'] },
      { name:'Мастерская',  sections:['Бестиарий','Глоссарий'] },
  ] },
  { id:'pf',   name:'Pathfinder', tag:'2e', sections:['Наследия','Классы','Архетипы','Предыстории','Снаряжение','Заклинания'] },
  { id:'lore', name:'Lore',       tag:'Мир', sections:['Фракции','География','Глоссарий','История'] },
];

export const POOL = {
  races:['Человек','Эльф','Дварф','Полурослик','Полуэльф','Тифлинг','Драконорождённый','Гном','Полуорк','Орк'],
  classes:['Бард','Варвар','Воин','Волшебник','Дрифтер','Друид','Жрец','Изобретатель','Колдун','Монах','Паладин','Плут','Следопыт','Чародей','Шаман'],
  feats:['Меткий стрелок','Мастер дуэли','Знаток','Удачливый','Часовой','Маг-воин','Стойкий','Внимательный'],
  spells:['Огненный шар','Волшебная стрела','Лечение ран','Щит','Невидимость','Цепная молния','Полёт','Замедление'],
  weapons:['Длинный меч','Боевой топор','Короткий лук','Кинжал','Глефа','Рапира','Тяжёлый арбалет','Боевой молот'],
  gear:['Кольчуга','Латы','Кожаный доспех','Щит','Полулаты','Кираса','Набивной доспех','Кольчужная рубаха'],
  backgrounds:['Прислужник','Преступник','Народный герой','Благородный','Отшельник','Солдат','Шарлатан','Мудрец'],
  archetypes:['Чемпион','Снайпер','Боевой маг','Целитель','Дуэлянт','Бестиарий'],
  factions:['Орден Узла','Серебряные нити','Дозор Пустоты','Гильдия картографов','Культ Развязанных'],
  places:['Сплетённые острова','Город Тысячи Нитей','Пустошь Эха','Башня Астролябии','Море Созвездий'],
  terms:['Узел','Нить','Развязывание','Плетение','Эхо','Астральная сеть'],
  eras:['Эпоха Первого Узла','Великое Развязывание','Век Нитей','Тихая Эра','Возвращение'],
  classfeat:['Боевой стиль','Действие всплеска','Незаметная атака','Ярость','Дикий облик','Божественный канал','Чувство опасности','Мистическое восстановление'],
  gems:['Алмаз','Рубин','Сапфир','Изумруд','Опал','Жемчуг','Аметист','Оникс'],
  magic:['Сумка хранения','Плащ эльфов','Жезл молний','Кольцо защиты','Клинок мести','Амулет здоровья','Сапоги скорости','Посох мага'],
  beasts:['Гоблин','Древний дракон','Бехолдер','Тролль','Лич','Мимик','Иллитид','Оборотень'],
  omens:['Кровавая луна','Шёпот в тумане','Падающие звёзды','Разлом неба','Тихий колокол','Тень без тела'],
  wrath:['Пробуждение Ильбеша','Первая печать','Осада Башни Нитей','Голос из Бездны','Разорванный узел','Затмение'],
  species:["Адаад|Adaad|Тел +1, к другой +1","Аджаид|Adzhaid|Лов +1","Борос|Boros|Тел +2, Мдр +1","Бралл|Bralltsy|Инт +1, к другой +1","Вету|Vetu|по разновидности","Дангун|Danguntsy|Хар +1, к другой +1","Джабари|Jabari|Тел +1, Сил +1, Мдр +1","Маракиец|Marakiyets|Тел +1, Лов +1","Морхор|Morhor|Сил +1, Тел +1, Мдр +1","Ойрдуг|Oyrdug|Инт +2, Тел +1","Самагхи|Samaghi|Лов +1, Инт +1, Мдр +1","Удриш|Udrish|Инт +1, Лов +1","Худдулин|Huddulin|Лов +2","Эхор’нур|Ekhornur|Инт +3, Мдр +2, Тел -1"],
  tea:['Чёрный лист','Зелёный туман','Травяной сбор','Улун Башни','Белый иней','Пуэр Эха'],
};

export const IMG = { main:'/assets/knot-main.png', '5e':'/assets/knot-5e.png', '2024':'/assets/knot-2024.png', pf:'/assets/knot-pf.png', lore:'/assets/knot-lore.png' };

export const NODE_IMG = {
  'Персонаж':'persona','Предметы':'predmety','Мастерская':'masterskaya',
  'Классы':'klassy','Расы и происхождения':'rasy','Виды':'rasy','Черты':'cherty',
  'Особенности классов':'osobennosti','Предыстории':'predystorii','Заклинания':'zaklinaniya',
  'Оружие':'oruzhie','Доспехи':'dospehi','Снаряжение':'snaryazhenie',
  'Драгоценности':'dragocennosti','Магические предметы':'magicheskie',
  'Бестиарий':'bestiariy','Знамения':'znameniya','Гнев Ильбеша':'gnev',
  'Инструменты':'instrumenty','Чай':'chay',
  'Ширма (справочник)':'shirma','Глоссарий':'shirma'
};
export function nodeImg(name){ const k = NODE_IMG[name]; return k ? ('/assets/nodes/'+k+'.png') : null; }

export const CLASS_IMG = { 'Бард':'bard','Варвар':'barbarian','Воин':'fighter','Волшебник':'wizard',
  'Дрифтер':'drifter','Друид':'druid','Жрец':'cleric','Изобретатель':'artificer',
  'Колдун':'warlock','Монах':'monk','Паладин':'paladin','Плут':'rogue',
  'Следопыт':'ranger','Чародей':'sorcerer','Шаман':'shaman' };
export function classImg(name){ return CLASS_IMG[name] ? ('/assets/classes/'+CLASS_IMG[name]+'.png') : null; }

export const THEMES = {
  void:  { bg:'radial-gradient(130% 120% at 50% 28%,#0c0e14 0%,#070810 52%,#040406 100%)', ink:'rgba(226,230,244,', glow:'rgba(176,188,232,', thread:'rgba(196,208,240,', ring:'rgba(196,208,240,.5)', hi:'238,243,255', disc:'7,8,12' },
  sepia: { bg:'radial-gradient(130% 120% at 50% 28%,#16110a 0%,#0c0805 52%,#050302 100%)', ink:'rgba(244,234,216,', glow:'rgba(232,196,142,', thread:'rgba(236,210,168,', ring:'rgba(236,210,168,.5)', hi:'255,244,222', disc:'12,8,4' },
};

export function layoutPoints(n){
  if (n<=6){ const a=[]; for (let i=0;i<n;i++){ const t=(-90 + i*(360/n))*Math.PI/180; a.push({ x:Math.cos(t), y:Math.sin(t) }); } return a; }
  const L=[ {x:0,y:-1},{x:0,y:1},{x:1,y:0},{x:-1,y:0},
            {x:0.72,y:-0.72},{x:-0.72,y:0.72},{x:0.72,y:0.72},{x:-0.72,y:-0.72},
            {x:0,y:-0.46},{x:0,y:0.46},{x:0.46,y:0},{x:-0.46,y:0} ];
  return L.slice(0,n);
}

export function entriesFor(sysId, sec){
  const s = sec.toLowerCase();
  if (sysId === 'lore'){
    if (s.indexOf('фракц')>-1) return POOL.factions;
    if (s.indexOf('геогр')>-1) return POOL.places;
    if (s.indexOf('глосс')>-1) return POOL.terms;
    if (s.indexOf('истор')>-1) return POOL.eras;
  }
  if (s.indexOf('знамени')>-1) return POOL.omens;
  if (s.indexOf('гнев')>-1 || s.indexOf('ильбеш')>-1) return POOL.wrath;
  if (s.indexOf('глосс')>-1) return POOL.terms;
  if (s.indexOf('чай')>-1) return POOL.tea;
  if (s.indexOf('особенност')>-1) return POOL.classfeat;
  if (s.indexOf('драгоцен')>-1) return POOL.gems;
  if (s.indexOf('магическ')>-1) return POOL.magic;
  if (s.indexOf('бестиар')>-1) return POOL.beasts;
  if (s.indexOf('рас')>-1 || s.indexOf('вид')>-1) return POOL.species;
  if (s.indexOf('наслед')>-1) return POOL.races;
  if (s.indexOf('класс')>-1) return POOL.classes;
  if (s.indexOf('черт')>-1) return POOL.feats;
  if (s.indexOf('заклин')>-1) return POOL.spells;
  if (s.indexOf('оруж')>-1) return POOL.weapons;
  if (s.indexOf('доспех')>-1 || s.indexOf('снаряж')>-1) return POOL.gear;
  if (s.indexOf('происхожд')>-1 || s.indexOf('предыстор')>-1) return POOL.backgrounds;
  if (s.indexOf('архетип')>-1) return POOL.archetypes;
  return [];
}
