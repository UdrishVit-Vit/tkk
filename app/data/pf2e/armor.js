// Armor and shields from the Pathfinder 2e core rules.
// «Сила» — the Strength score at which the check and speed penalties stop applying.

export const PF2E_ARMOR = [
  // ---- без брони ----
  { id: 'explorers-clothing', title: 'Одежда путешественника', en: "Explorer's clothing", cat: 'unarmored', price: '1 см', ac: '+0', dexCap: '+5', check: '—', speed: '—', str: '—', bulk: 'Л', group: 'Ткань', traits: ['удобная'] },

  // ---- лёгкая броня ----
  { id: 'padded-armor', title: 'Стёганый доспех', en: 'Padded armor', cat: 'light', price: '2 см', ac: '+1', dexCap: '+3', check: '—', speed: '—', str: '10', bulk: 'Л', group: 'Ткань', traits: ['удобная'] },
  { id: 'leather', title: 'Кожаный доспех', en: 'Leather armor', cat: 'light', price: '2 зм', ac: '+1', dexCap: '+4', check: '−1', speed: '—', str: '10', bulk: '1', group: 'Кожа', traits: [] },
  { id: 'studded-leather', title: 'Клёпаная кожа', en: 'Studded leather armor', cat: 'light', price: '3 зм', ac: '+2', dexCap: '+3', check: '−1', speed: '—', str: '12', bulk: '1', group: 'Кожа', traits: [] },
  { id: 'chain-shirt', title: 'Кольчужная рубаха', en: 'Chain shirt', cat: 'light', price: '5 зм', ac: '+2', dexCap: '+3', check: '−1', speed: '—', str: '12', bulk: '1', group: 'Кольчуга', traits: ['гибкая', 'шумная'] },

  // ---- средняя броня ----
  { id: 'hide', title: 'Шкурный доспех', en: 'Hide armor', cat: 'medium', price: '2 зм', ac: '+3', dexCap: '+2', check: '−2', speed: '−5 футов', str: '14', bulk: '2', group: 'Кожа', traits: [] },
  { id: 'scale-mail', title: 'Чешуйчатый доспех', en: 'Scale mail', cat: 'medium', price: '4 зм', ac: '+3', dexCap: '+2', check: '−2', speed: '−5 футов', str: '14', bulk: '2', group: 'Составной', traits: [] },
  { id: 'chain-mail', title: 'Кольчуга', en: 'Chain mail', cat: 'medium', price: '6 зм', ac: '+4', dexCap: '+1', check: '−2', speed: '−5 футов', str: '16', bulk: '2', group: 'Кольчуга', traits: ['гибкая', 'шумная'] },
  { id: 'breastplate', title: 'Кираса', en: 'Breastplate', cat: 'medium', price: '8 зм', ac: '+4', dexCap: '+1', check: '−2', speed: '−5 футов', str: '16', bulk: '2', group: 'Латы', traits: [] },

  // ---- тяжёлая броня ----
  { id: 'splint-mail', title: 'Пластинчатый доспех', en: 'Splint mail', cat: 'heavy', price: '13 зм', ac: '+5', dexCap: '+1', check: '−3', speed: '−10 футов', str: '16', bulk: '3', group: 'Составной', traits: [] },
  { id: 'half-plate', title: 'Полулаты', en: 'Half plate', cat: 'heavy', price: '18 зм', ac: '+5', dexCap: '+1', check: '−3', speed: '−10 футов', str: '16', bulk: '3', group: 'Латы', traits: [] },
  { id: 'full-plate', title: 'Полный латный доспех', en: 'Full plate', cat: 'heavy', price: '30 зм', ac: '+6', dexCap: '+0', check: '−3', speed: '−10 футов', str: '18', bulk: '4', group: 'Латы', traits: ['бастион'] },

  // ---- необычная броня ----
  { id: 'sanctified-plate', title: 'Освящённые латы', en: 'Sanctified plate', cat: 'heavy', price: '35 зм', ac: '+6', dexCap: '+0', check: '−3', speed: '−10 футов', str: '18', bulk: '4', group: 'Латы', traits: ['бастион', 'необычное'], note: 'Латы храмового ордена: считаются серебряными или холодным железом по выбору при изготовлении.' }
]

export const PF2E_ARMOR_CATEGORIES = {
  unarmored: 'Без брони',
  light: 'Лёгкая броня',
  medium: 'Средняя броня',
  heavy: 'Тяжёлая броня'
}

export const PF2E_SHIELDS = [
  { id: 'buckler', title: 'Баклер', en: 'Buckler', price: '1 зм', ac: '+1', hardness: 3, hp: 6, bt: 3, bulk: 'Л', note: 'Пристёгнут к предплечью: занимает руку, но ею можно держать предметы. Нельзя использовать «Удар щитом».' },
  { id: 'wooden-shield', title: 'Деревянный щит', en: 'Wooden shield', price: '1 зм', ac: '+2', hardness: 3, hp: 12, bt: 6, bulk: '1', note: 'Дёшев и ломается первым, но своё дело делает.' },
  { id: 'steel-shield', title: 'Стальной щит', en: 'Steel shield', price: '2 зм', ac: '+2', hardness: 5, hp: 20, bt: 10, bulk: '1', note: 'Стандартный выбор строя: держит вдвое больше урона, чем деревянный.' },
  { id: 'tower-shield', title: 'Ростовой щит', en: 'Tower shield', price: '10 зм', ac: '+2', hardness: 5, hp: 20, bt: 10, bulk: '4', note: 'Одним действием можно «Укрыться» за ним, получив бонус обстоятельств +4 к КБ вместо +2.' },
  { id: 'reinforcing-rune-note', title: 'Укрепляющая руна', en: 'Reinforcing rune', price: 'от 75 зм', ac: '—', hardness: '+', hp: '+', bt: '+', bulk: '—', note: 'Не щит, а руна на него: повышает твёрдость, Хиты и порог поломки. Самый ходовой способ продлить жизнь щиту.' }
]

// Armor specialization: what the armour group does once your class grants it.
export const PF2E_ARMOR_GROUP_SPEC = {
  'Ткань': 'Вы получаете сопротивление физическому урону, равное значению вашего мастерства брони (1 за обучен, 2 за эксперт и так далее) против критических попаданий.',
  'Кожа': 'Вы получаете сопротивление 1 дробящему урону и 1 колющему, значение растёт со ступенью мастерства.',
  'Кольчуга': 'Вы получаете сопротивление режущему урону и уменьшаете урон от критических попаданий режущим оружием.',
  'Латы': 'Вы получаете сопротивление колющему урону; латы плохо пробиваются остриём.',
  'Составной': 'Вы получаете сопротивление дробящему урону: пластины гасят удар, а не режут его.'
}
