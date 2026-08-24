import { PF2E_FUNDAMENTAL_RUNES, PF2E_WEAPON_RUNES, PF2E_ARMOR_RUNES } from './magicRunes.js'

// Magic items other than runes: consumables, wands and staves, and the worn and
// held items a party actually fights over. Rarity follows PF2e: обычное,
// необычное, редкое, уникальное.

const CONSUMABLES = [
  // ---- зелья и масла ----
  { id: 'potion-of-healing-minor', title: 'Зелье лечения (малое)', en: 'Minor potion of healing', cat: 'potions', level: 1, price: '4 зм', rarity: 'common', traits: ['расходник', 'лечение', 'зелье'], desc: 'Восстанавливает 1к8 Хитов. Младшее (3 ур., 12 зм) — 2к8+5, среднее (6 ур., 50 зм) — 3к8+10, большое (9 ур., 400 зм) — 6к8+20, великое (12 ур., 1 000 зм) — 8к8+30.' },
  { id: 'potion-of-resistance', title: 'Зелье сопротивления', en: 'Potion of resistance', cat: 'potions', level: 3, price: '12 зм', rarity: 'common', traits: ['расходник', 'зелье'], desc: 'На 1 час даёт сопротивление 5 выбранному типу энергии. Средняя ступень (9 ур.) — 10, большая (13 ур.) — 15.' },
  { id: 'potion-of-flying', title: 'Зелье полёта', en: 'Potion of flying', cat: 'potions', level: 16, price: '3 000 зм', rarity: 'common', traits: ['расходник', 'зелье'], desc: 'Даёт скорость полёта, равную вашей скорости ходьбы, на 5 минут.' },
  { id: 'barkskin-potion', title: 'Зелье древесной кожи', en: 'Barkskin potion', cat: 'potions', level: 5, price: '30 зм', rarity: 'common', traits: ['расходник', 'зелье'], desc: 'На 10 минут даёт сопротивление 2 физическому урону, но добавляет слабость 3 к огню.' },
  { id: 'bravos-brew', title: 'Брага бретёра', en: "Bravo's brew", cat: 'potions', level: 3, price: '10 зм', rarity: 'common', traits: ['расходник', 'зелье'], desc: 'Даёт бонус предмета +1 к спасброскам против страха и временные Хиты на 10 минут.' },
  { id: 'potion-of-water-breathing', title: 'Зелье водного дыхания', en: 'Potion of water breathing', cat: 'potions', level: 7, price: '60 зм', rarity: 'common', traits: ['расходник', 'зелье'], desc: 'Позволяет дышать под водой 1 час. В кяризах Бралла продаётся дороже прейскуранта.' },
  { id: 'silversheen', title: 'Серебряный лоск', en: 'Silversheen', cat: 'potions', level: 5, price: '30 зм', rarity: 'common', traits: ['расходник', 'масло'], desc: 'Оружие на 1 минуту считается серебряным и пробивает соответствующее сопротивление.' },
  { id: 'oil-of-weightlessness', title: 'Масло невесомости', en: 'Oil of weightlessness', cat: 'potions', level: 6, price: '55 зм', rarity: 'common', traits: ['расходник', 'масло'], desc: 'Уменьшает Груз предмета вдвое на 1 час.' },
  { id: 'oil-of-animation', title: 'Масло оживления', en: 'Oil of animation', cat: 'potions', level: 11, price: '1 300 зм', rarity: 'common', traits: ['расходник', 'масло'], desc: 'На 1 минуту оружие оживает и сражается само, как под руной танца.' },
  { id: 'oil-of-mending', title: 'Масло починки', en: 'Oil of mending', cat: 'potions', level: 3, price: '10 зм', rarity: 'common', traits: ['расходник', 'масло'], desc: 'Восстанавливает предмету Хиты, как удачная «Починка», без проверки.' },

  // ---- талисманы ----
  { id: 'feather-step-stone', title: 'Камень лёгкого шага', en: 'Feather step stone', cat: 'talismans', level: 1, price: '4 зм', rarity: 'common', traits: ['расходник', 'талисман'], desc: 'Активируется реакцией: на 1 минуту вы игнорируете труднопроходимую местность.' },
  { id: 'owlbear-claw', title: 'Коготь совомедведя', en: 'Owlbear claw', cat: 'talismans', level: 1, price: '4 зм', rarity: 'common', traits: ['расходник', 'талисман'], desc: 'Ваша следующая безоружная атака в этом ходу наносит дополнительно 1к6 урона и 1к4 продолжительного кровотечения.' },
  { id: 'jade-bauble', title: 'Нефритовая безделушка', en: 'Jade bauble', cat: 'talismans', level: 2, price: '7 зм', rarity: 'common', traits: ['расходник', 'талисман'], desc: 'Активируется свободным действием: следующий бросок атаки получает бонус предмета +1.' },
  { id: 'monkey-pin', title: 'Обезьянья булавка', en: 'Monkey pin', cat: 'talismans', level: 2, price: '7 зм', rarity: 'common', traits: ['расходник', 'талисман'], desc: 'Реакцией при падении вы цепляетесь за поверхность и не падаете.' },
  { id: 'potency-crystal', title: 'Кристалл мощи', en: 'Potency crystal', cat: 'talismans', level: 3, price: '12 зм', rarity: 'common', traits: ['расходник', 'талисман'], desc: 'На 1 минуту оружие получает бонус предмета +1 к атаке и бросает два кубика урона.' },
  { id: 'effervescent-ampoule', title: 'Шипучая ампула', en: 'Effervescent ampoule', cat: 'talismans', level: 3, price: '12 зм', rarity: 'common', traits: ['расходник', 'талисман'], desc: 'Реакцией на урон кислотой даёт сопротивление 5 кислоте до конца хода.' },
  { id: 'emerald-grasshopper', title: 'Изумрудный кузнечик', en: 'Emerald grasshopper', cat: 'talismans', level: 4, price: '20 зм', rarity: 'common', traits: ['расходник', 'талисман'], desc: 'Одним действием вы прыгаете на 30 футов в любом направлении, не провоцируя реакций.' },
  { id: 'savior-spike', title: 'Спасительный шип', en: 'Savior spike', cat: 'talismans', level: 4, price: '20 зм', rarity: 'common', traits: ['расходник', 'талисман'], desc: 'Брошенный в землю шип телепортирует вас к нему с расстояния до 60 футов.' },
  { id: 'crying-angel-pendant', title: 'Подвеска плачущего ангела', en: 'Crying angel pendant', cat: 'talismans', level: 5, price: '130 зм', rarity: 'common', traits: ['расходник', 'талисман'], desc: 'Активируется, когда вы «Лечите раны»: цель восстанавливает дополнительно 2к6 Хитов.' },
  { id: 'iron-cube', title: 'Железный куб', en: 'Iron cube', cat: 'talismans', level: 5, price: '130 зм', rarity: 'common', traits: ['расходник', 'талисман'], desc: 'Реакцией вы получаете сопротивление 5 физическому урону до начала следующего хода.' },
  { id: 'mesmerizing-opal', title: 'Завораживающий опал', en: 'Mesmerizing opal', cat: 'talismans', level: 5, price: '130 зм', rarity: 'common', traits: ['расходник', 'талисман'], desc: 'Следующая проверка Обмана, чтобы «Отвлечь», получает бонус предмета +2 и работает на всех, кто вас видит.' },
  { id: 'wolf-fang', title: 'Волчий клык', en: 'Wolf fang', cat: 'talismans', level: 5, price: '130 зм', rarity: 'common', traits: ['расходник', 'талисман'], desc: 'Следующая попытка «Сбить с ног» автоматически преуспевает при обычном успехе и становится критической.' },

  // ---- свитки ----
  { id: 'scroll-1', title: 'Свиток 1 круга', en: 'Scroll of 1st-rank spell', cat: 'scrolls', level: 1, price: '4 зм', rarity: 'common', traits: ['расходник', 'свиток', 'магический'], desc: 'Содержит одно заклинание 1 круга своей традиции. Прочитать свиток может тот, у кого это заклинание есть в списке традиции.' },
  { id: 'scroll-2', title: 'Свиток 2 круга', en: 'Scroll of 2nd-rank spell', cat: 'scrolls', level: 3, price: '12 зм', rarity: 'common', traits: ['расходник', 'свиток', 'магический'], desc: 'Одно заклинание 2 круга. Свитки — самый дешёвый способ носить с собой то, что нужно раз в поход.' },
  { id: 'scroll-3', title: 'Свиток 3 круга', en: 'Scroll of 3rd-rank spell', cat: 'scrolls', level: 5, price: '30 зм', rarity: 'common', traits: ['расходник', 'свиток', 'магический'], desc: 'Одно заклинание 3 круга.' },
  { id: 'scroll-4', title: 'Свиток 4 круга', en: 'Scroll of 4th-rank spell', cat: 'scrolls', level: 7, price: '70 зм', rarity: 'common', traits: ['расходник', 'свиток', 'магический'], desc: 'Одно заклинание 4 круга.' },
  { id: 'scroll-5', title: 'Свиток 5 круга', en: 'Scroll of 5th-rank spell', cat: 'scrolls', level: 9, price: '150 зм', rarity: 'common', traits: ['расходник', 'свиток', 'магический'], desc: 'Одно заклинание 5 круга.' },
  { id: 'scroll-6', title: 'Свиток 6 круга', en: 'Scroll of 6th-rank spell', cat: 'scrolls', level: 11, price: '300 зм', rarity: 'common', traits: ['расходник', 'свиток', 'магический'], desc: 'Одно заклинание 6 круга.' },
  { id: 'scroll-7', title: 'Свиток 7 круга', en: 'Scroll of 7th-rank spell', cat: 'scrolls', level: 13, price: '700 зм', rarity: 'common', traits: ['расходник', 'свиток', 'магический'], desc: 'Одно заклинание 7 круга.' },
  { id: 'scroll-8', title: 'Свиток 8 круга', en: 'Scroll of 8th-rank spell', cat: 'scrolls', level: 15, price: '1 500 зм', rarity: 'common', traits: ['расходник', 'свиток', 'магический'], desc: 'Одно заклинание 8 круга.' },
  { id: 'scroll-9', title: 'Свиток 9 круга', en: 'Scroll of 9th-rank spell', cat: 'scrolls', level: 17, price: '3 000 зм', rarity: 'common', traits: ['расходник', 'свиток', 'магический'], desc: 'Одно заклинание 9 круга.' },
  { id: 'scroll-10', title: 'Свиток 10 круга', en: 'Scroll of 10th-rank spell', cat: 'scrolls', level: 19, price: '8 000 зм', rarity: 'rare', traits: ['расходник', 'свиток', 'магический'], desc: 'Одно заклинание 10 круга. Такие свитки в Даскаре считаются не товаром, а событием.' }
]

const WANDS_STAVES = [
  { id: 'magic-wand', title: 'Волшебная палочка', en: 'Magic wand', cat: 'wands', level: 3, price: '60 зм', rarity: 'common', traits: ['вложение', 'магический', 'палочка'], desc: 'Хранит одно заклинание, которое можно наложить один раз в день. Уровень и цена растут с кругом: 1 круг — 3 ур. (60 зм), 2 — 5 (160), 3 — 7 (360), 4 — 9 (700), 5 — 11 (1 500), 6 — 13 (3 000), 7 — 15 (6 500), 8 — 17 (15 000), 9 — 19 (40 000). Можно рискнуть и наложить второй раз — палочка сломается.' },
  { id: 'wand-manifold-missiles', title: 'Палочка множащихся стрел', en: 'Wand of manifold missiles', cat: 'wands', level: 3, price: '60 зм', rarity: 'common', traits: ['вложение', 'магический', 'палочка'], desc: 'Накладывает «Волшебную стрелу» с дополнительными снарядами.' },
  { id: 'wand-widening', title: 'Палочка расширения', en: 'Wand of widening', cat: 'wands', level: 5, price: '160 зм', rarity: 'common', traits: ['вложение', 'магический', 'палочка'], desc: 'Заклинание из палочки поражает увеличенную область.' },
  { id: 'wand-mercy', title: 'Палочка милости', en: 'Wand of mercy', cat: 'wands', level: 3, price: '60 зм', rarity: 'common', traits: ['вложение', 'магический', 'палочка'], desc: 'Хранит «Лечение ран» и дополнительно снимает одно состояние при применении.' },
  { id: 'staff-of-healing', title: 'Посох исцеления', en: 'Staff of healing', cat: 'staves', level: 4, price: '230 зм', rarity: 'common', traits: ['вложение', 'магический', 'посох'], desc: 'Содержит «Лечение ран» и родственные заклинания. Заряды считаются по вашему высшему кругу заклинаний.' },
  { id: 'staff-of-fire', title: 'Посох огня', en: 'Staff of fire', cat: 'staves', level: 3, price: '90 зм', rarity: 'common', traits: ['вложение', 'магический', 'посох'], desc: 'Содержит заклинания огня, от «Возгорания» до «Огненного шара» на старших ступенях.' },
  { id: 'staff-of-divination', title: 'Посох прорицания', en: 'Staff of divination', cat: 'staves', level: 4, price: '160 зм', rarity: 'common', traits: ['вложение', 'магический', 'посох'], desc: 'Содержит заклинания, которые ищут, находят и подсказывают. Любимый посох эхор’нуров.' },
  { id: 'staff-of-illumination', title: 'Посох озарения', en: 'Staff of illumination', cat: 'staves', level: 4, price: '150 зм', rarity: 'common', traits: ['вложение', 'магический', 'посох'], desc: 'Содержит заклинания света и рассеивания тьмы.' },
  { id: 'staff-of-protection', title: 'Посох защиты', en: 'Staff of protection', cat: 'staves', level: 6, price: '250 зм', rarity: 'common', traits: ['вложение', 'магический', 'посох'], desc: 'Содержит защитные заклинания и один раз в день даёт бонус к КБ.' },
  { id: 'staff-of-natures-vengeance', title: 'Посох мести природы', en: "Staff of nature's vengeance", cat: 'staves', level: 8, price: '450 зм', rarity: 'common', traits: ['вложение', 'магический', 'посох'], desc: 'Содержит первозданные заклинания зверя, лозы и бури.' },
  { id: 'staff-of-power', title: 'Посох силы', en: 'Staff of power', cat: 'staves', level: 16, price: '10 000 зм', rarity: 'rare', traits: ['вложение', 'магический', 'посох'], desc: 'Мощный набор боевых заклинаний. Посох можно сломать, высвободив всю запасённую силу разом.' },
  { id: 'staff-of-the-magi', title: 'Посох магов', en: 'Staff of the magi', cat: 'staves', level: 20, price: '90 000 зм', rarity: 'rare', traits: ['вложение', 'магический', 'посох'], desc: 'Вершина посохов: обширный список заклинаний, поглощение чужой магии и разрушительный разлом при поломке.' }
]

const WORN = [
  { id: 'handwraps-of-mighty-blows', title: 'Наручи могучих ударов', en: 'Handwraps of mighty blows', cat: 'worn', level: 2, price: '35 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Позволяют наносить руны оружия на безоружные атаки. Обязательная покупка для монаха и любого, кто дерётся руками.' },
  { id: 'bag-of-holding-1', title: 'Сумка хранения I', en: 'Bag of holding (Type I)', cat: 'worn', level: 4, price: '75 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Вмещает 25 Груза, весит 1. Типы II (7 ур., 300 зм), III (11 ур., 1 200 зм) и IV (13 ур., 2 400 зм) вмещают больше.' },
  { id: 'boots-of-elvenkind', title: 'Сапоги эльфов', en: 'Boots of elvenkind', cat: 'worn', level: 4, price: '145 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Бонус предмета +1 к Акробатике для «Балансирования» и увеличение скорости на 5 футов раз в день.' },
  { id: 'cloak-of-elvenkind', title: 'Плащ эльфов', en: 'Cloak of elvenkind', cat: 'worn', level: 4, price: '150 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Бонус предмета +1 к Скрытности; раз в день накидывает на вас лёгкую иллюзию, скрывающую очертания.' },
  { id: 'hat-of-the-magi', title: 'Шляпа магов', en: 'Hat of the magi', cat: 'worn', level: 3, price: '65 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Бонус предмета +1 к Магии и один арканный заговор на выбор.' },
  { id: 'goggles-of-night', title: 'Очки ночи', en: 'Goggles of night', cat: 'worn', level: 5, price: '140 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Дают тёмное зрение. Большая ступень (11 ур.) даёт ещё и видение сквозь магическую тьму.' },
  { id: 'doubling-rings', title: 'Удваивающие кольца', en: 'Doubling rings', cat: 'worn', level: 3, price: '50 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Пара колец: руны с одного оружия распространяются на второе, надетое на партнёрское кольцо.' },
  { id: 'ring-of-climbing', title: 'Кольцо лазания', en: 'Ring of climbing', cat: 'worn', level: 5, price: '150 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Бонус предмета +1 к Атлетике для «Лазания»; раз в день даёт скорость лазания.' },
  { id: 'ring-of-swimming', title: 'Кольцо плавания', en: 'Ring of swimming', cat: 'worn', level: 5, price: '150 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Бонус предмета +1 к Атлетике для «Плавания»; раз в день даёт скорость плавания.' },
  { id: 'bracers-of-armor', title: 'Наручи брони I', en: 'Bracers of armor I', cat: 'worn', level: 8, price: '450 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Дают бонус предмета +1 к КБ и +1 к спасброскам тем, кто не носит броню. Ступени II (10 ур.) и III (12 ур.) сильнее.' },
  { id: 'aeon-stone', title: 'Камень эона', en: 'Aeon stone', cat: 'worn', level: 9, price: '600 зм', rarity: 'uncommon', traits: ['вложение', 'магический'], desc: 'Парящий у головы камень. Разные виды дают разные эффекты: обучение навыку, сопротивление, дополнительное заклинание.' },
  { id: 'winged-boots', title: 'Крылатые сапоги', en: 'Winged boots', cat: 'worn', level: 13, price: '2 600 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Трижды в день дают скорость полёта, равную вашей скорости, на 5 минут.' },
  { id: 'belt-of-giant-strength', title: 'Пояс силы великанов', en: 'Belt of giant strength', cat: 'worn', level: 16, price: '10 000 зм', rarity: 'rare', traits: ['вложение', 'магический'], desc: 'Даёт бонус предмета к проверкам Атлетики и урону ближнего боя и увеличивает предел переносимого Груза.' },
  { id: 'necklace-of-fireballs', title: 'Ожерелье огненных шаров', en: 'Necklace of fireballs', cat: 'worn', level: 5, price: '160 зм', rarity: 'common', traits: ['вложение', 'магический', 'расходник'], desc: 'Набор шариков, каждый из которых можно сорвать и метнуть как «Огненный шар» соответствующего круга.' },
  { id: 'gloves-of-storing', title: 'Перчатки хранения', en: 'Gloves of storing', cat: 'worn', level: 7, price: '320 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Свободным действием прячут в себя предмет до 1 Груза и возвращают его в руку.' },
  { id: 'lifting-belt', title: 'Пояс подъёма', en: 'Lifting belt', cat: 'worn', level: 4, price: '80 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Увеличивает предел переносимого Груза на 2 и даёт бонус +1 к Атлетике для подъёма тяжестей.' },
  { id: 'diplomats-badge', title: 'Знак дипломата', en: "Diplomat's badge", cat: 'worn', level: 8, price: '450 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Бонус предмета +2 к Дипломатии; раз в день позволяет наложить «Внушение» на собеседника.' },
  { id: 'pendant-of-the-occult', title: 'Подвеска оккультного', en: 'Pendant of the occult', cat: 'worn', level: 3, price: '70 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Бонус предмета +1 к Оккультизму и один оккультный заговор на выбор.' }
]

const HELD = [
  { id: 'everburning-torch', title: 'Негасимый факел', en: 'Everburning torch', cat: 'held', level: 1, price: '15 зм', rarity: 'common', traits: ['магический'], desc: 'Горит вечно, освещая ярким светом 20 футов. Не тратится и не гаснет под водой.' },
  { id: 'wayfinder', title: 'Путеводитель', en: 'Wayfinder', cat: 'held', level: 2, price: '28 зм', rarity: 'uncommon', traits: ['вложение', 'магический'], desc: 'Компас-амулет: указывает север и раз в день накладывает «Свет». В гнездо можно вставить камень эона.' },
  { id: 'immovable-rod', title: 'Неподвижный стержень', en: 'Immovable rod', cat: 'held', level: 10, price: '900 зм', rarity: 'common', traits: ['магический'], desc: 'Одним действием замирает в пространстве и держит до 8 Груза, пока его не отключат.' },
  { id: 'rope-of-climbing', title: 'Верёвка лазания', en: 'Rope of climbing', cat: 'held', level: 5, price: '150 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'По команде сама закрепляется, разматывается и втягивается; даёт бонус предмета +2 к «Лазанию» по ней.' },
  { id: 'horn-of-blasting', title: 'Рог разрушения', en: 'Horn of blasting', cat: 'held', level: 9, price: '700 зм', rarity: 'common', traits: ['магический'], desc: 'Издаёт конус звука 30 футов, наносящий урон и оглушающий. Может лопнуть при повторном использовании.' },
  { id: 'marvelous-medicines', title: 'Чудесные снадобья', en: 'Marvelous medicines', cat: 'held', level: 6, price: '250 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Набор лекаря, который сам восполняет содержимое: даёт бонус +2 к Медицине и позволяет лечить без расходников.' },
  { id: 'sturdy-shield', title: 'Прочный щит', en: 'Sturdy shield', cat: 'held', level: 4, price: '100 зм', rarity: 'common', traits: ['магический'], desc: 'Щит с повышенной твёрдостью и Хитами. Ступени растут до 19 уровня и делают щит основным инструментом защитника.' },
  { id: 'spellguard-shield', title: 'Щит-хранитель заклинаний', en: 'Spellguard shield', cat: 'held', level: 6, price: '250 зм', rarity: 'common', traits: ['вложение', 'магический'], desc: 'Даёт бонус обстоятельств +1 к спасброскам против заклинаний, пока щит поднят.' },
  { id: 'feather-token', title: 'Перьевой жетон', en: 'Feather token', cat: 'held', level: 5, price: '50 зм', rarity: 'common', traits: ['расходник', 'магический'], desc: 'Одноразовый жетон, превращающийся в лодку, дерево, лестницу или якорь — в зависимости от вида.' },
  { id: 'bottled-lightning-storm', title: 'Штормовая склянка', en: 'Storm flask', cat: 'held', level: 8, price: '400 зм', rarity: 'uncommon', traits: ['расходник', 'магический'], desc: 'Разбитая склянка вызывает локальную бурю на 1 минуту в радиусе 30 футов.' },
  { id: 'clockwork-key', title: 'Заводной ключ Спиралей', en: 'Clockwork key', cat: 'held', level: 7, price: '300 зм', rarity: 'uncommon', traits: ['вложение', 'магический'], desc: 'Механизм мор’хоров: раз в день заводит любой сломанный механизм на 10 минут работы.' }
]

// Setting-specific relics: not for sale, and usually not for keeping either.
const RELICS = [
  { id: 'heart-of-idzhinan', title: 'Осколок сердца Иджин’Ана', en: 'Shard of the Eternal Serpent', cat: 'relics', level: 15, price: '—', rarity: 'unique', traits: ['реликвия', 'магический', 'божественное'], desc: 'Кусок сердца, вырезанного первыми искателями. Даёт иммунитет к яду и раз в день позволяет отравить целую область. Носитель начинает видеть сны Змея и не может от них отказаться.' },
  { id: 'salbar-gate-fragment', title: 'Обломок Врат сальбара', en: 'Salbar gate fragment', cat: 'relics', level: 17, price: '—', rarity: 'unique', traits: ['реликвия', 'магический', 'телепортация'], desc: 'Живой металл эхор’нуров, помнящий, куда вёл. Раз в день переносит группу к месту, которое обломок уже видел. Каждое перемещение забирает у носителя один день памяти.' },
  { id: 'barascus-ember', title: 'Уголь Огня Бараскуса', en: 'Ember of the Barascus Fire', cat: 'relics', level: 12, price: '—', rarity: 'unique', traits: ['реликвия', 'магический', 'огонь'], desc: 'Уголь со станционного огня. Не гаснет, пока носитель держит слово. Даёт сопротивление огню и раз в день зажигает клинок союзника. Лжец обжигает об него руку.' },
  { id: 'blood-coin', title: 'Монета Крови', en: 'Blood coin', cat: 'relics', level: 10, price: '—', rarity: 'unique', traits: ['реликвия', 'магический'], desc: 'Плата по исполненному Договору алых драгмирцев. Тратится на одну услугу мира: исцеление, оружие, путь. Инурган следит, чтобы монету не подделали.' },
  { id: 'anzu-mask', title: 'Маска Спящего Анзу', en: 'Mask of the Sleeping Anzu', cat: 'relics', level: 14, price: '—', rarity: 'unique', traits: ['реликвия', 'магический', 'превращение'], desc: 'Маска из кости Кузни. Раз в день даёт облик Анзу на 1 минуту со всеми его силами и всей его Яростью. Снять маску можно только чужими руками.' },
  { id: 'void-thread', title: 'Нить Пустоты', en: 'Thread of the Void', cat: 'relics', level: 13, price: '—', rarity: 'unique', traits: ['реликвия', 'магический', 'пустота'], desc: 'Обрывок нити, которую чотгоры видят, но не трогают. Позволяет один раз в день переписать один прошедший раунд. Каждое использование стирает одно имя из памяти носителя.' }
]

export const PF2E_MAGIC_ITEMS = [
  ...PF2E_FUNDAMENTAL_RUNES,
  ...PF2E_WEAPON_RUNES,
  ...PF2E_ARMOR_RUNES,
  ...CONSUMABLES,
  ...WANDS_STAVES,
  ...WORN,
  ...HELD,
  ...RELICS
].map(item => ({
  rarity: 'common',
  traits: ['магический'],
  ...item
}))

export const PF2E_MAGIC_ITEM_CATEGORIES = {
  'runes-fundamental': 'Фундаментальные руны',
  'runes-weapon': 'Руны свойств оружия',
  'runes-armor': 'Руны свойств брони',
  potions: 'Зелья и масла',
  talismans: 'Талисманы',
  scrolls: 'Свитки',
  wands: 'Волшебные палочки',
  staves: 'Посохи',
  worn: 'Носимые предметы',
  held: 'Держимые предметы',
  relics: 'Реликвии Эноа'
}

export const PF2E_MAGIC_ITEM_RARITIES = {
  common: 'Обычные',
  uncommon: 'Необычные',
  rare: 'Редкие',
  unique: 'Уникальные'
}

export const PF2E_MAGIC_ITEM_RARITY_SINGULAR = {
  common: 'Обычное',
  uncommon: 'Необычное',
  rare: 'Редкое',
  unique: 'Уникальное'
}
