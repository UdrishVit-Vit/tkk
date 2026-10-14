// A new author-defined campaign system, separate from attested Lore names.
export const YEAR_IMAGES = [
  {id:'simurgh',name:'Симург',genitive:'Симурга',gender:'m',meaning:'Возрождение и защита.'},
  {id:'serpent',name:'Змей',genitive:'Змея',gender:'m',meaning:'Память и перемена.'},
  {id:'ayur',name:'Аюр',genitive:'Аюра',gender:'m',meaning:'Авторский образ Аюра; его свойства пока не определены.'},
  {id:'spider',name:'Паук',genitive:'Паука',gender:'m',meaning:'Связи, плетение и замысел.'},
  {id:'crane',name:'Журавль',genitive:'Журавля',gender:'m',meaning:'Переход и возвращение.'},
  {id:'leviathan',name:'Левиафан',genitive:'Левиафана',gender:'m',meaning:'Глубина и скрытая сила.'},
  {id:'moth',name:'Мотылёк',genitive:'Мотылька',gender:'m',meaning:'Свет, влечение и хрупкость.'},
  {id:'cedar',name:'Кедр',genitive:'Кедра',gender:'m',meaning:'Долговечность и укоренение.'},
  {id:'bird',name:'Птица',genitive:'Птицы',gender:'f',source:'Lore 0.31',meaning:'Образ из имени Огненной Птицы.'},
  {id:'kash',name:'Каш',genitive:'Каша',gender:'m',source:'Lore 0.31',meaning:'Образ из имени Лазурного Каша; его природа не установлена.'},
  {id:'owl',name:'Сова',genitive:'Совы',gender:'f',source:'Lore 0.31',meaning:'Образ из имени Кристальной Совы.'},
  {id:'beech',name:'Бук',genitive:'Бука',gender:'m',source:'Lore 0.31',meaning:'Образ из имени Летящего Бука; написание сохранено буквально.'},
  {id:'sparrowhawk',name:'Перепелятник',genitive:'Перепелятника',gender:'m',source:'Lore 0.31',meaning:'Образ из имени Синего Перепелятника.'},
  {id:'bull',name:'Бык',genitive:'Быка',gender:'m',source:'Lore 0.31',meaning:'Образ из имени Лазуритового Быка; допускает также Лазурный облик.'},
  {id:'frog',name:'Лягушка',genitive:'Лягушки',gender:'f',source:'Lore 0.31',meaning:'Образ из имени Рубиновой Лягушки.'},
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
  {id:'flying',label:'Полёт',m:'Летящий',f:'Летящая',mg:'Летящего',fg:'Летящей',source:'Lore 0.31',meaning:'Облик Летящего Бука: движение, а не цвет.'},
  {id:'coral',label:'Коралл',m:'Коралловый',f:'Коралловая',mg:'Кораллового',fg:'Коралловой',source:'Авторский вариант',meaning:'Жизнь, ветвление и рост; заменяет простой Синий облик в рабочем круге.'},
  {id:'lapis',label:'Лазурит',m:'Лазуритовый',f:'Лазуритовая',mg:'Лазуритового',fg:'Лазуритовой',source:'Lore 0.31',meaning:'Облик Лазуритового Быка.'},
  {id:'ruby',label:'Рубин',m:'Рубиновый',f:'Рубиновая',mg:'Рубинового',fg:'Рубиновой',source:'Lore 0.31',meaning:'Облик Рубиновой Лягушки.'},
  {id:'twilight',label:'Сумерки',m:'Сумеречный',f:'Сумеречная',mg:'Сумеречного',fg:'Сумеречной',source:'Авторский вариант',meaning:'Граница света и тени; дополнительный облик рабочего круга.'},
]
export const YEAR_NAME_PERIOD = YEAR_IMAGES.length * YEAR_ASPECTS.length
export const HISTORY_REFERENCE = { afterSplit:829, afterEmbrace:138, embraceAfterSplit:691 }
export function workingYearName(elapsedYears) {
  if (!Number.isSafeInteger(elapsedYears) || elapsedYears < 0 || elapsedYears > 1000000) return null
  const image = YEAR_IMAGES[elapsedYears % YEAR_IMAGES.length]
  const aspect = YEAR_ASPECTS[elapsedYears % YEAR_ASPECTS.length]
  return { name:`${aspect[image.gender]} ${image.name}`,yearLabel:`${aspect[image.gender+'g']} ${image.genitive}`,image,aspect,
    elapsedYears,year:elapsedYears+1,round:Math.floor(elapsedYears/YEAR_NAME_PERIOD)+1,position:elapsedYears%YEAR_NAME_PERIOD+1,period:YEAR_NAME_PERIOD }
}
