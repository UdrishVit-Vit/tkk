// Weapon tables from the Pathfinder 2e core rules, adapted to Russian.
// Damage codes: Д — дробящий, К — колющий, Р — режущий.
// Bulk: «Л» — лёгкий, «—» — незначительный.

export const PF2E_WEAPONS = [
  // ---- простое оружие ближнего боя ----
  { id: 'club', title: 'Дубина', en: 'Club', cat: 'simple-melee', price: '—', damage: '1к6 Д', bulk: '1', hands: 1, group: 'Дубина', traits: ['метательное 10 футов'] },
  { id: 'dagger', title: 'Кинжал', en: 'Dagger', cat: 'simple-melee', price: '2 см', damage: '1к4 К', bulk: 'Л', hands: 1, group: 'Нож', traits: ['ловкое', 'изящное', 'метательное 10 футов', 'универсальное Р'] },
  { id: 'gauntlet', title: 'Латная перчатка', en: 'Gauntlet', cat: 'simple-melee', price: '2 см', damage: '1к4 Д', bulk: 'Л', hands: 1, group: 'Кулачное', traits: ['ловкое', 'свободная рука'] },
  { id: 'light-mace', title: 'Лёгкая булава', en: 'Light mace', cat: 'simple-melee', price: '4 см', damage: '1к4 Д', bulk: 'Л', hands: 1, group: 'Дубина', traits: ['ловкое', 'изящное', 'толчок'] },
  { id: 'longspear', title: 'Длинное копьё', en: 'Longspear', cat: 'simple-melee', price: '5 см', damage: '1к8 К', bulk: '2', hands: 2, group: 'Копьё', traits: ['досягаемость'] },
  { id: 'mace', title: 'Булава', en: 'Mace', cat: 'simple-melee', price: '1 зм', damage: '1к6 Д', bulk: '1', hands: 1, group: 'Дубина', traits: ['толчок'] },
  { id: 'morningstar', title: 'Моргенштерн', en: 'Morningstar', cat: 'simple-melee', price: '1 зм', damage: '1к6 Д', bulk: '1', hands: 1, group: 'Дубина', traits: ['универсальное К'] },
  { id: 'sickle', title: 'Серп', en: 'Sickle', cat: 'simple-melee', price: '2 см', damage: '1к4 Р', bulk: 'Л', hands: 1, group: 'Нож', traits: ['ловкое', 'изящное', 'подсечка'] },
  { id: 'spear', title: 'Копьё', en: 'Spear', cat: 'simple-melee', price: '1 см', damage: '1к6 К', bulk: '1', hands: 1, group: 'Копьё', traits: ['метательное 20 футов'] },
  { id: 'spiked-gauntlet', title: 'Шипованная перчатка', en: 'Spiked gauntlet', cat: 'simple-melee', price: '3 см', damage: '1к4 К', bulk: 'Л', hands: 1, group: 'Кулачное', traits: ['ловкое', 'свободная рука'] },
  { id: 'staff', title: 'Посох', en: 'Staff', cat: 'simple-melee', price: '—', damage: '1к4 Д', bulk: '1', hands: 1, group: 'Дубина', traits: ['двуручное к8'] },
  { id: 'clan-dagger', title: 'Клановый кинжал', en: 'Clan dagger', cat: 'simple-melee', price: '2 см', damage: '1к4 К', bulk: 'Л', hands: 1, group: 'Нож', traits: ['ловкое', 'дварф', 'парирование', 'необычное', 'универсальное Д'] },
  { id: 'katar', title: 'Катар', en: 'Katar', cat: 'simple-melee', price: '3 см', damage: '1к4 К', bulk: 'Л', hands: 1, group: 'Нож', traits: ['ловкое', 'смертельное к6', 'монах', 'необычное'] },

  // ---- боевое оружие ближнего боя ----
  { id: 'bastard-sword', title: 'Полуторный меч', en: 'Bastard sword', cat: 'martial-melee', price: '4 зм', damage: '1к8 Р', bulk: '1', hands: 1, group: 'Меч', traits: ['двуручное к12'] },
  { id: 'battle-axe', title: 'Боевой топор', en: 'Battle axe', cat: 'martial-melee', price: '1 зм', damage: '1к8 Р', bulk: '1', hands: 1, group: 'Топор', traits: ['размах'] },
  { id: 'bo-staff', title: 'Боевой шест', en: 'Bo staff', cat: 'martial-melee', price: '2 см', damage: '1к8 Д', bulk: '2', hands: 2, group: 'Дубина', traits: ['монах', 'парирование', 'досягаемость', 'подсечка'] },
  { id: 'falchion', title: 'Фальшион', en: 'Falchion', cat: 'martial-melee', price: '3 зм', damage: '1к10 Р', bulk: '2', hands: 2, group: 'Меч', traits: ['мощное', 'размах'] },
  { id: 'flail', title: 'Цеп', en: 'Flail', cat: 'martial-melee', price: '8 см', damage: '1к6 Д', bulk: '1', hands: 1, group: 'Цеп', traits: ['обезоруживание', 'размах', 'подсечка'] },
  { id: 'glaive', title: 'Глефа', en: 'Glaive', cat: 'martial-melee', price: '1 зм', damage: '1к8 Р', bulk: '2', hands: 2, group: 'Древковое', traits: ['смертельное к8', 'мощное', 'досягаемость'] },
  { id: 'greataxe', title: 'Секира', en: 'Greataxe', cat: 'martial-melee', price: '2 зм', damage: '1к12 Р', bulk: '2', hands: 2, group: 'Топор', traits: ['размах'] },
  { id: 'greatclub', title: 'Палица', en: 'Greatclub', cat: 'martial-melee', price: '1 зм', damage: '1к10 Д', bulk: '2', hands: 2, group: 'Дубина', traits: ['замах', 'толчок'] },
  { id: 'greatpick', title: 'Большая кирка', en: 'Greatpick', cat: 'martial-melee', price: '1 зм', damage: '1к10 К', bulk: '2', hands: 2, group: 'Кирка', traits: ['роковое к12'] },
  { id: 'greatsword', title: 'Двуручный меч', en: 'Greatsword', cat: 'martial-melee', price: '2 зм', damage: '1к12 Р', bulk: '2', hands: 2, group: 'Меч', traits: ['универсальное К'] },
  { id: 'guisarme', title: 'Гизарма', en: 'Guisarme', cat: 'martial-melee', price: '2 зм', damage: '1к10 Р', bulk: '2', hands: 2, group: 'Древковое', traits: ['досягаемость', 'подсечка'] },
  { id: 'halberd', title: 'Алебарда', en: 'Halberd', cat: 'martial-melee', price: '2 зм', damage: '1к10 К', bulk: '2', hands: 2, group: 'Древковое', traits: ['досягаемость', 'универсальное Р'] },
  { id: 'hatchet', title: 'Топорик', en: 'Hatchet', cat: 'martial-melee', price: '1 зм', damage: '1к6 Р', bulk: 'Л', hands: 1, group: 'Топор', traits: ['ловкое', 'размах', 'метательное 10 футов'] },
  { id: 'lance', title: 'Пика', en: 'Lance', cat: 'martial-melee', price: '1 зм', damage: '1к8 К', bulk: '2', hands: 2, group: 'Копьё', traits: ['смертельное к8', 'скачка к6', 'досягаемость'] },
  { id: 'light-hammer', title: 'Лёгкий молот', en: 'Light hammer', cat: 'martial-melee', price: '3 см', damage: '1к6 Д', bulk: 'Л', hands: 1, group: 'Молот', traits: ['ловкое', 'метательное 20 футов'] },
  { id: 'light-pick', title: 'Лёгкая кирка', en: 'Light pick', cat: 'martial-melee', price: '4 см', damage: '1к4 К', bulk: 'Л', hands: 1, group: 'Кирка', traits: ['ловкое', 'роковое к8'] },
  { id: 'longsword', title: 'Длинный меч', en: 'Longsword', cat: 'martial-melee', price: '1 зм', damage: '1к8 Р', bulk: '1', hands: 1, group: 'Меч', traits: ['универсальное К'] },
  { id: 'main-gauche', title: 'Дага', en: 'Main-gauche', cat: 'martial-melee', price: '5 см', damage: '1к4 К', bulk: 'Л', hands: 1, group: 'Нож', traits: ['ловкое', 'обезоруживание', 'изящное', 'парирование', 'универсальное Р'] },
  { id: 'maul', title: 'Молот-кувалда', en: 'Maul', cat: 'martial-melee', price: '3 зм', damage: '1к12 Д', bulk: '2', hands: 2, group: 'Молот', traits: ['толчок'] },
  { id: 'pick', title: 'Кирка', en: 'Pick', cat: 'martial-melee', price: '7 см', damage: '1к6 К', bulk: '1', hands: 1, group: 'Кирка', traits: ['роковое к10'] },
  { id: 'ranseur', title: 'Рансер', en: 'Ranseur', cat: 'martial-melee', price: '2 зм', damage: '1к10 К', bulk: '2', hands: 2, group: 'Древковое', traits: ['обезоруживание', 'досягаемость'] },
  { id: 'rapier', title: 'Рапира', en: 'Rapier', cat: 'martial-melee', price: '2 зм', damage: '1к6 К', bulk: '1', hands: 1, group: 'Меч', traits: ['смертельное к8', 'обезоруживание', 'изящное'] },
  { id: 'sap', title: 'Дубинка', en: 'Sap', cat: 'martial-melee', price: '1 см', damage: '1к6 Д', bulk: 'Л', hands: 1, group: 'Дубина', traits: ['ловкое', 'нелетальное'] },
  { id: 'scimitar', title: 'Скимитар', en: 'Scimitar', cat: 'martial-melee', price: '1 зм', damage: '1к6 Р', bulk: '1', hands: 1, group: 'Меч', traits: ['мощное', 'размах'] },
  { id: 'scythe', title: 'Коса', en: 'Scythe', cat: 'martial-melee', price: '2 зм', damage: '1к10 Р', bulk: '2', hands: 2, group: 'Древковое', traits: ['смертельное к10', 'подсечка'] },
  { id: 'shield-bash', title: 'Удар щитом', en: 'Shield bash', cat: 'martial-melee', price: '—', damage: '1к4 Д', bulk: '—', hands: 1, group: 'Щит', traits: [] },
  { id: 'shield-boss', title: 'Умбон щита', en: 'Shield boss', cat: 'martial-melee', price: '5 см', damage: '1к6 Д', bulk: 'Л', hands: 1, group: 'Щит', traits: [] },
  { id: 'shield-spikes', title: 'Шипы щита', en: 'Shield spikes', cat: 'martial-melee', price: '5 см', damage: '1к6 К', bulk: 'Л', hands: 1, group: 'Щит', traits: [] },
  { id: 'shortsword', title: 'Короткий меч', en: 'Shortsword', cat: 'martial-melee', price: '9 см', damage: '1к6 К', bulk: 'Л', hands: 1, group: 'Меч', traits: ['ловкое', 'изящное', 'универсальное Р'] },
  { id: 'starknife', title: 'Звёздный нож', en: 'Starknife', cat: 'martial-melee', price: '2 зм', damage: '1к4 К', bulk: 'Л', hands: 1, group: 'Нож', traits: ['ловкое', 'смертельное к6', 'изящное', 'метательное 20 футов', 'универсальное Р'] },
  { id: 'trident', title: 'Трезубец', en: 'Trident', cat: 'martial-melee', price: '1 зм', damage: '1к8 К', bulk: '1', hands: 1, group: 'Копьё', traits: ['метательное 20 футов'] },
  { id: 'war-flail', title: 'Боевой цеп', en: 'War flail', cat: 'martial-melee', price: '2 зм', damage: '1к10 Д', bulk: '2', hands: 2, group: 'Цеп', traits: ['обезоруживание', 'размах', 'подсечка'] },
  { id: 'warhammer', title: 'Боевой молот', en: 'Warhammer', cat: 'martial-melee', price: '1 зм', damage: '1к8 Д', bulk: '1', hands: 1, group: 'Молот', traits: ['толчок'] },
  { id: 'whip', title: 'Кнут', en: 'Whip', cat: 'martial-melee', price: '1 см', damage: '1к4 Р', bulk: '1', hands: 1, group: 'Цеп', traits: ['обезоруживание', 'изящное', 'нелетальное', 'досягаемость', 'подсечка'] },

  // ---- продвинутое оружие ближнего боя ----
  { id: 'dwarven-waraxe', title: 'Дварфийский боевой топор', en: 'Dwarven waraxe', cat: 'advanced-melee', price: '3 зм', damage: '1к8 Р', bulk: '2', hands: 1, group: 'Топор', traits: ['дварф', 'размах', 'двуручное к12'] },
  { id: 'elven-curve-blade', title: 'Эльфийский изогнутый клинок', en: 'Elven curve blade', cat: 'advanced-melee', price: '4 зм', damage: '1к8 Р', bulk: '2', hands: 2, group: 'Меч', traits: ['эльф', 'изящное', 'мощное'] },
  { id: 'filchers-fork', title: 'Воровская вилка', en: "Filcher's fork", cat: 'advanced-melee', price: '1 зм', damage: '1к4 К', bulk: 'Л', hands: 1, group: 'Нож', traits: ['ловкое', 'удар в спину', 'смертельное к6', 'изящное', 'полурослик', 'метательное 20 футов'] },
  { id: 'gnome-hooked-hammer', title: 'Гномий крюкомолот', en: 'Gnome hooked hammer', cat: 'advanced-melee', price: '2 зм', damage: '1к6 Д', bulk: '1', hands: 1, group: 'Молот', traits: ['гном', 'подсечка', 'двуручное к10', 'универсальное К'] },
  { id: 'orc-knuckle-dagger', title: 'Орочий кастет-кинжал', en: 'Orc knuckle dagger', cat: 'advanced-melee', price: '7 см', damage: '1к6 К', bulk: 'Л', hands: 1, group: 'Нож', traits: ['ловкое', 'обезоруживание', 'орк'] },
  { id: 'sawtooth-saber', title: 'Пилозубая сабля', en: 'Sawtooth saber', cat: 'advanced-melee', price: '5 зм', damage: '1к6 Р', bulk: 'Л', hands: 1, group: 'Меч', traits: ['ловкое', 'изящное', 'спаренное'] },

  // ---- простое дальнобойное оружие ----
  { id: 'blowgun', title: 'Духовая трубка', en: 'Blowgun', cat: 'simple-ranged', price: '1 см', damage: '1 К', bulk: 'Л', hands: 1, group: 'Дротик', traits: ['ловкое', 'нелетальное', 'толчковое', 'дальность 20 футов', 'перезарядка 1'] },
  { id: 'crossbow', title: 'Арбалет', en: 'Crossbow', cat: 'simple-ranged', price: '3 зм', damage: '1к8 К', bulk: '1', hands: 2, group: 'Лук', traits: ['дальность 120 футов', 'перезарядка 1'] },
  { id: 'dart', title: 'Дротик', en: 'Dart', cat: 'simple-ranged', price: '1 мм', damage: '1к4 К', bulk: 'Л', hands: 1, group: 'Дротик', traits: ['ловкое', 'метательное 20 футов'] },
  { id: 'hand-crossbow', title: 'Ручной арбалет', en: 'Hand crossbow', cat: 'simple-ranged', price: '3 зм', damage: '1к6 К', bulk: 'Л', hands: 1, group: 'Лук', traits: ['дальность 60 футов', 'перезарядка 1'] },
  { id: 'heavy-crossbow', title: 'Тяжёлый арбалет', en: 'Heavy crossbow', cat: 'simple-ranged', price: '4 зм', damage: '1к10 К', bulk: '2', hands: 2, group: 'Лук', traits: ['дальность 120 футов', 'перезарядка 2'] },
  { id: 'javelin', title: 'Джавелин', en: 'Javelin', cat: 'simple-ranged', price: '1 см', damage: '1к6 К', bulk: 'Л', hands: 1, group: 'Дротик', traits: ['метательное 30 футов'] },
  { id: 'sling', title: 'Праща', en: 'Sling', cat: 'simple-ranged', price: '—', damage: '1к6 Д', bulk: 'Л', hands: 1, group: 'Праща', traits: ['толчковое', 'дальность 50 футов', 'перезарядка 1'] },

  // ---- боевое дальнобойное оружие ----
  { id: 'composite-longbow', title: 'Составной длинный лук', en: 'Composite longbow', cat: 'martial-ranged', price: '20 зм', damage: '1к8 К', bulk: '2', hands: '1+', group: 'Лук', traits: ['смертельное к10', 'толчковое', 'дальность 100 футов', 'залп 30 футов'] },
  { id: 'composite-shortbow', title: 'Составной короткий лук', en: 'Composite shortbow', cat: 'martial-ranged', price: '14 зм', damage: '1к6 К', bulk: '1', hands: '1+', group: 'Лук', traits: ['смертельное к10', 'толчковое', 'дальность 60 футов'] },
  { id: 'longbow', title: 'Длинный лук', en: 'Longbow', cat: 'martial-ranged', price: '6 зм', damage: '1к8 К', bulk: '2', hands: '1+', group: 'Лук', traits: ['смертельное к10', 'дальность 100 футов', 'залп 30 футов'] },
  { id: 'shortbow', title: 'Короткий лук', en: 'Shortbow', cat: 'martial-ranged', price: '3 зм', damage: '1к6 К', bulk: '1', hands: '1+', group: 'Лук', traits: ['смертельное к10', 'дальность 60 футов'] },

  // ---- продвинутое дальнобойное оружие ----
  { id: 'halfling-sling-staff', title: 'Пращевой посох полуросликов', en: 'Halfling sling staff', cat: 'advanced-ranged', price: '5 зм', damage: '1к10 Д', bulk: '1', hands: 2, group: 'Праща', traits: ['полурослик', 'толчковое', 'дальность 80 футов', 'перезарядка 1'] },
  { id: 'shuriken', title: 'Сюрикен', en: 'Shuriken', cat: 'advanced-ranged', price: '1 мм', damage: '1к4 К', bulk: '—', hands: 1, group: 'Дротик', traits: ['ловкое', 'монах', 'метательное 20 футов'] },

  // ---- боеприпасы ----
  { id: 'arrows', title: 'Стрелы (10)', en: 'Arrows (10)', cat: 'ammo', price: '1 см', damage: '—', bulk: 'Л', hands: '—', group: 'Лук', traits: [] },
  { id: 'blowgun-darts', title: 'Иглы для трубки (10)', en: 'Blowgun darts (10)', cat: 'ammo', price: '5 мм', damage: '—', bulk: '—', hands: '—', group: 'Дротик', traits: [] },
  { id: 'bolts', title: 'Болты (10)', en: 'Crossbow bolts (10)', cat: 'ammo', price: '1 см', damage: '—', bulk: 'Л', hands: '—', group: 'Лук', traits: [] },
  { id: 'sling-bullets', title: 'Пращевые снаряды (10)', en: 'Sling bullets (10)', cat: 'ammo', price: '1 см', damage: '—', bulk: 'Л', hands: '—', group: 'Праща', traits: [] }
]

export const PF2E_WEAPON_CATEGORIES = {
  'simple-melee': 'Простое оружие ближнего боя',
  'martial-melee': 'Боевое оружие ближнего боя',
  'advanced-melee': 'Продвинутое оружие ближнего боя',
  'simple-ranged': 'Простое дальнобойное оружие',
  'martial-ranged': 'Боевое дальнобойное оружие',
  'advanced-ranged': 'Продвинутое дальнобойное оружие',
  ammo: 'Боеприпасы'
}

// Critical specialization: the extra effect a weapon group grants on a crit to
// anyone whose class gives them weapon specialization for that group.
export const PF2E_WEAPON_GROUP_CRIT = {
  'Топор': 'Выберите одно существо, смежное с целью и в пределах досягаемости. Оно получает урон, равный вашему модификатору Силы (базовый спасбросок Рефлексов).',
  'Дубина': 'Вы отбрасываете цель на 10 футов.',
  'Цеп': 'Цель сбита с ног.',
  'Молот': 'Цель сбита с ног.',
  'Нож': 'Цель получает 1к6 продолжительного урона кровотечением (или больше по знаку мастерства).',
  'Кирка': 'Цель получает дополнительный урон, равный удвоенному числу кубиков оружия.',
  'Древковое': 'Цель перемещается на 5 футов в любом направлении по вашему выбору.',
  'Копьё': 'Цель получает состояние «Уязвимый» до конца вашего следующего хода.',
  'Меч': 'Цель получает состояние «Уязвимый» до начала вашего следующего хода.',
  'Лук': 'Если цель на земле, она пришпилена к ней и «Обездвижена»; освободиться можно проверкой Атлетики против Сл вашего оружия.',
  'Праща': 'Цель получает состояние «Оглушённый 1».',
  'Дротик': 'Цель получает 1к6 продолжительного урона кровотечением.',
  'Кулачное': 'Цель должна преуспеть в спасброске Стойкости или получить «Замедленный 1» до конца вашего следующего хода.',
  'Щит': 'Вы отбрасываете цель на 5 футов.'
}
