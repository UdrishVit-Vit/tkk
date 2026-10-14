// A new author-defined campaign system, separate from attested Lore names.
export const YEAR_IMAGES = [
  {id:'simurgh',name:'Симург',genitive:'Симурга',gender:'m',meaning:'Возрождение и защита.'},
  {id:'serpent',name:'Змей',genitive:'Змея',gender:'m',meaning:'Память и перемена.'},
  {id:'ayur',name:'Аюр',genitive:'Аюра',gender:'m',meaning:'Авторский образ Аюра; его свойства пока не определены.'},
  {id:'crab',name:'Краб',genitive:'Краба',gender:'m',meaning:'Защита, терпение и скрытая решимость.'},
  {id:'hawk',name:'Ястреб',genitive:'Ястреба',gender:'m',meaning:'Зоркость, стремление и решительный поступок.'},
  {id:'wyrm',name:'Вирм',genitive:'Вирма',gender:'m',meaning:'Глубина и скрытая сила.'},
  {id:'scarab',name:'Скарабей',genitive:'Скарабея',gender:'m',meaning:'Созидание, упорство и возвращение света.'},
  {id:'cedar',name:'Кедр',genitive:'Кедра',gender:'m',meaning:'Долговечность и укоренение.'},
  {id:'bird',name:'Птица',genitive:'Птицы',gender:'f',source:'Lore 0.31',meaning:'Образ из имени Огненной Птицы.'},
  {id:'kash',name:'Каш',genitive:'Каша',gender:'m',source:'Lore 0.31',meaning:'Образ из имени Лазурного Каша; его природа не установлена.'},
  {id:'owl',name:'Сова',genitive:'Совы',gender:'f',source:'Lore 0.31',meaning:'Образ из имени Кристальной Совы.'},
  {id:'beech',name:'Бук',genitive:'Бука',gender:'m',source:'Lore 0.31',meaning:'Образ из имени Летящего Бука; написание сохранено буквально.'},
  {id:'sparrowhawk',name:'Перепелятник',genitive:'Перепелятника',gender:'m',source:'Lore 0.31',meaning:'Образ из имени Синего Перепелятника.'},
  {id:'bull',name:'Бык',genitive:'Быка',gender:'m',source:'Lore 0.31',meaning:'Образ из имени Лазуритового Быка; допускает также Лазурный облик.'},
  {id:'toad',name:'Жаба',genitive:'Жабы',gender:'f',source:'Авторский вариант',meaning:'Образ Жабы заменяет Лягушку в рабочем круге; историческое имя Рубиновой Лягушки сохранено в Lore.'},
  {"id": "tahar", "name": "Тахар", "genitive": "Тахара", "gender": "m", "meaning": "Авторский образ Тахара; его природа и свойства пока не определены."},
  {"id": "peacock", "name": "Павлин", "genitive": "Павлина", "gender": "m", "meaning": "Раскрытие, великолепие и наблюдение."},
  {id:'tortoise',name:'Черепаха',genitive:'Черепахи',gender:'f',meaning:'Терпение, стойкость и долгая память.'},
  {id:'cypress',name:'Кипарис',genitive:'Кипариса',gender:'m',meaning:'Преемственность, память об ушедших и устремление ввысь.'},
  {"id": "panther", "name": "Барс", "genitive": "Барса", "gender": "m", "meaning": "Независимость, ловкость и тихая сила."},
  {"id": "argali", "name": "Архар", "genitive": "Архара", "gender": "m", "meaning": "Упорство, восхождение и сила гор."},
  {"id": "lion", "name": "Лев", "genitive": "Льва", "gender": "m", "meaning": "Бесстрашие, достоинство и защитная сила."},
  {"id": "jackal", "name": "Шакал", "genitive": "Шакала", "gender": "m", "meaning": "Выживание, чуткость и поиск среди руин."},
  {"id": "ray", "name": "Скат", "genitive": "Ската", "gender": "m", "meaning": "Плавность, скрытое движение и глубина."},
  {"id": "salamander", "name": "Саламандра", "genitive": "Саламандры", "gender": "f", "meaning": "Скрытый огонь, обновление и преображение."},
  {"id": "scorpion", "name": "Скорпион", "genitive": "Скорпиона", "gender": "m", "meaning": "Выдержка, тайна и решающий удар."},
  {"id": "monitor", "name": "Варан", "genitive": "Варана", "gender": "m", "meaning": "Выжидание, настороженность и резкий переход к действию."},
  {"id": "raven", "name": "Ворон", "genitive": "Ворона", "gender": "m", "meaning": "Наблюдение, весть и память."},
  {"id": "pangolin", "name": "Панголин", "genitive": "Панголина", "gender": "m", "meaning": "Защита и сохранение внутреннего."},
  {"id": "yak", "name": "Як", "genitive": "Яка", "gender": "m", "meaning": "Выносливость, сохранение тепла и прохождение трудного пути."},
  {"id": "almond", "name": "Миндаль", "genitive": "Миндаля", "gender": "m", "meaning": "Пробуждение, цветение и обещание плода."},
  {"id": "ibix", "name": "Ибикс", "genitive": "Ибикса", "gender": "m", "meaning": "Внимательность, мера и созерцание."},
  {"id": "lotus", "name": "Лотос", "genitive": "Лотоса", "gender": "m", "meaning": "Раскрытие, ясность и рост из глубины."},
  {"id": "mongoose", "name": "Мангуст", "genitive": "Мангуста", "gender": "m", "meaning": "Проворство, зоркость и отвага."},
  {"id": "hyena", "name": "Гиена", "genitive": "Гиены", "gender": "f", "meaning": "Выживание, сплочённость и настойчивость."},
]
export const YEAR_ASPECTS = [
  {id:'ash',f:'Пепельная',fg:'Пепельной',label:'Пепел',m:'Пепельный',mg:'Пепельного',meaning:'Завершение и почва для нового.'},
  {id:'amber',f:'Янтарная',fg:'Янтарной',label:'Янтарь',m:'Янтарный',mg:'Янтарного',meaning:'Тепло и сохранение памяти.'},
  {id:'silver',f:'Серебряная',fg:'Серебряной',label:'Серебро',m:'Серебряный',mg:'Серебряного',meaning:'Ясность, отражение и внимание.'},
  {id:'obsidian',f:'Обсидиановая',fg:'Обсидиановой',label:'Обсидиан',m:'Обсидиановый',mg:'Обсидианового',meaning:'Граница, испытание и решимость.'},
  {id:'pearl',f:'Жемчужная',fg:'Жемчужной',label:'Жемчуг',m:'Жемчужный',mg:'Жемчужного',meaning:'Созревание и обретение ценности.'},
  {id:'fire',label:'Огонь',m:'Огненный',f:'Огненная',mg:'Огненного',fg:'Огненной',source:'Lore 0.31',meaning:'Облик Огненной Птицы.'},
  {id:'azure',label:'Лазурь',m:'Лазурный',f:'Лазурная',mg:'Лазурного',fg:'Лазурной',source:'Lore 0.31',meaning:'Облик Лазурного Каша; также сочетается с Быком.'},
  {id:'crystal',label:'Кристалл',m:'Кристальный',f:'Кристальная',mg:'Кристального',fg:'Кристальной',source:'Lore 0.31',meaning:'Облик Кристальной Совы.'},
  {"id": "topaz", "label": "Топаз", "m": "Топазовый", "f": "Топазовая", "mg": "Топазового", "fg": "Топазовой", "source": "Авторский вариант", "meaning": "Ясность, тепло и раскрытие возможностей."},
  {id:'coral',label:'Коралл',m:'Коралловый',f:'Коралловая',mg:'Кораллового',fg:'Коралловой',source:'Авторский вариант',meaning:'Жизнь, ветвление и рост; заменяет простой Синий облик в рабочем круге.'},
  {id:'lapis',label:'Лазурит',m:'Лазуритовый',f:'Лазуритовая',mg:'Лазуритового',fg:'Лазуритовой',source:'Lore 0.31',meaning:'Облик Лазуритового Быка.'},
  {id:'ruby',label:'Рубин',m:'Рубиновый',f:'Рубиновая',mg:'Рубинового',fg:'Рубиновой',source:'Lore 0.31',meaning:'Облик Рубиновой Лягушки.'},
  {"id": "jasper", "label": "Яшма", "m": "Яшмовый", "f": "Яшмовая", "mg": "Яшмового", "fg": "Яшмовой", "source": "Авторский вариант", "meaning": "Многообразие узоров, память и цельность."},
  {"id": "beryl", "label": "Берилл", "m": "Берилловый", "f": "Берилловая", "mg": "Бериллового", "fg": "Берилловой", "source": "Авторский вариант", "meaning": "Ясность, равновесие и спокойная сила."},
  {"id": "chalcedony", "label": "Халцедон", "m": "Халцедоновый", "f": "Халцедоновая", "mg": "Халцедонового", "fg": "Халцедоновой", "source": "Авторский вариант", "meaning": "Спокойствие, мягкость и постепенное раскрытие."},
  {id:'copper',label:'Медь',m:'Медный',f:'Медная',mg:'Медного',fg:'Медной',meaning:'Мастерство, тепло и воплощение замысла.'},
  {"id": "jade", "label": "Нефрит", "m": "Нефритовый", "f": "Нефритовая", "mg": "Нефритового", "fg": "Нефритовой", "meaning": "Равновесие и бережная сила."},
  {"id": "malachite", "label": "Малахит", "m": "Малахитовый", "f": "Малахитовая", "mg": "Малахитового", "fg": "Малахитовой", "meaning": "Узор, рост и многослойность."},
  {"id": "turquoise", "label": "Бирюза", "m": "Бирюзовый", "f": "Бирюзовая", "mg": "Бирюзового", "fg": "Бирюзовой", "meaning": "Открытый простор и встреча путей."},
  {"id": "sapphire", "label": "Сапфир", "m": "Сапфировый", "f": "Сапфировая", "mg": "Сапфирового", "fg": "Сапфировой", "meaning": "Глубина взгляда и ясная мысль."},
  {"id": "amethyst", "label": "Аметист", "m": "Аметистовый", "f": "Аметистовая", "mg": "Аметистового", "fg": "Аметистовой", "meaning": "Сон, созерцание и внутренняя тишина."},
  {"id": "opal", "label": "Опал", "m": "Опаловый", "f": "Опаловая", "mg": "Опалового", "fg": "Опаловой", "meaning": "Многообразие и переменчивое сияние."},
  {"id": "onyx", "label": "Оникс", "m": "Ониксовый", "f": "Ониксовая", "mg": "Ониксового", "fg": "Ониксовой", "meaning": "Собранность и удержание границы."},
  {"id": "gold", "label": "Золото", "m": "Золотой", "f": "Золотая", "mg": "Золотого", "fg": "Золотой", "meaning": "Зрелость, щедрость и полнота."},
  {"id": "iron", "label": "Железо", "m": "Железный", "f": "Железная", "mg": "Железного", "fg": "Железной", "meaning": "Стойкость, труд и обязательство."},
  {"id": "quartz", "label": "Кварц", "m": "Кварцевый", "f": "Кварцевая", "mg": "Кварцевого", "fg": "Кварцевой", "meaning": "Ясность, собранность и устойчивая основа."},
  {"id": "carnelian", "label": "Сердолик", "m": "Сердоликовый", "f": "Сердоликовая", "mg": "Сердоликового", "fg": "Сердоликовой", "source": "Авторский вариант", "meaning": "Жизненность, созревание и внутреннее тепло."},
  {"id": "bone", "label": "Кость", "m": "Костяной", "f": "Костяная", "mg": "Костяного", "fg": "Костяной", "meaning": "Основа, наследие и память тела."},
  {"id": "sand", "label": "Песок", "m": "Песчаный", "f": "Песчаная", "mg": "Песчаного", "fg": "Песчаной", "meaning": "Течение времени и меняющийся путь."},
  {"id": "garnet", "label": "Гранат", "m": "Гранатовый", "f": "Гранатовая", "mg": "Гранатового", "fg": "Гранатовой", "meaning": "Насыщенность, зрелость и скрытый жар."},
  {"id": "jadeite", "label": "Жадеит", "m": "Жадеитовый", "f": "Жадеитовая", "mg": "Жадеитового", "fg": "Жадеитовой", "meaning": "Цельность, бережность и спокойная сила."},
  {"id": "tourmaline", "label": "Турмалин", "m": "Турмалиновый", "f": "Турмалиновая", "mg": "Турмалинового", "fg": "Турмалиновой", "meaning": "Многообразие оттенков, перемена и внутренний узор."},
  {"id": "citrine", "label": "Цитрин", "m": "Цитриновый", "f": "Цитриновая", "mg": "Цитринового", "fg": "Цитриновой", "meaning": "Тёплая ясность, достаток и щедрость."},
  {"id": "agate", "label": "Агат", "m": "Агатовый", "f": "Агатовая", "mg": "Агатового", "fg": "Агатовой", "meaning": "Наслоение, память и постепенное раскрытие."},
  {"id": "nacre", "label": "Перламутр", "m": "Перламутровый", "f": "Перламутровая", "mg": "Перламутрового", "fg": "Перламутровой", "meaning": "Мягкое сияние, созревание и глубина отражений."},
]
export const YEAR_NAME_PERIOD = YEAR_IMAGES.length * YEAR_ASPECTS.length
export const HISTORY_REFERENCE = { afterSplit:829, afterEmbrace:138, embraceAfterSplit:691 }
export function workingYearName(elapsedYears) {
  if (!Number.isSafeInteger(elapsedYears) || elapsedYears < 0 || elapsedYears > 1000000) return null
  // Two interwoven permutations: every adjacent year changes both symbols.
  const position = elapsedYears % YEAR_NAME_PERIOD
  const step = position % 35
  const turn = Math.floor(position / 35)
  const image = YEAR_IMAGES[(11 * step) % 35]
  const aspect = YEAR_ASPECTS[(17 * step + 13 * turn) % 35]
  return { name:`${aspect[image.gender]} ${image.name}`,yearLabel:`${aspect[image.gender+'g']} ${image.genitive}`,image,aspect,
    elapsedYears,year:elapsedYears+1,round:Math.floor(elapsedYears/YEAR_NAME_PERIOD)+1,position:elapsedYears%YEAR_NAME_PERIOD+1,period:YEAR_NAME_PERIOD }
}

// Sorted outcomes of four d4; multiplicities account for all 256 ordered rolls.
export const YEAR_DICE_TABLE = []
for (let a=1;a<=4;a++) for (let b=a;b<=4;b++) for (let c=b;c<=4;c++) for (let d=c;d<=4;d++) {
  const dice=[a,b,c,d]
  const factorial=[1,1,2,6,24]
  const multiplicity=24 / [1,2,3,4].reduce((product,face)=>product*factorial[dice.filter(x=>x===face).length],1)
  const index=YEAR_DICE_TABLE.length
  YEAR_DICE_TABLE.push({code:dice.join(''),index,multiplicity,image:YEAR_IMAGES[index],aspect:YEAR_ASPECTS[index]})
}
function diceEntry(dice) {
  if (!Array.isArray(dice) || dice.length!==4 || !dice.every(x=>Number.isInteger(x) && x>=1 && x<=4)) return null
  const code=[...dice].sort((a,b)=>a-b).join('')
  return YEAR_DICE_TABLE.find(row=>row.code===code)
}
export function diceYearName(imageDice,aspectDice) {
  const imageRoll=diceEntry(imageDice), aspectRoll=diceEntry(aspectDice)
  if (!imageRoll || !aspectRoll) return null
  const image=imageRoll.image, aspect=aspectRoll.aspect
  return {name:`${aspect[image.gender]} ${image.name}`,yearLabel:`${aspect[image.gender+'g']} ${image.genitive}`,image,aspect,imageCode:imageRoll.code,aspectCode:aspectRoll.code}
}
