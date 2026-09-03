// Общий справочник источников для страниц «Особенности классов» (2014 и 2024).
export const CLASS_FEATURE_SOURCE_NAMES = {
  PHB: "Player's Handbook (2014)",
  'PHB 2024': "Player's Handbook (2024)",
  TCE: "Tasha's Cauldron of Everything",
  TJB: 'The Threads of JorasBashu',
  TLDC: 'The Threads of Lost Dice Club',
  TS: 'The Threads of Shkad',
  TU: 'The Threads of Unseen',
  TL: 'The Threads of Largo',
  TM: 'The Threads of Marn',
  TVV: 'The Threads of Vit-Vit',
  TMC: 'The Threads of Magnificent Cringelord',
  TST: 'The Threads of Stekly',
  TLEG: 'The Threads of Legolaisik',
  TA: 'The Threads of Ainur',
  TOMU: 'The Threads of Ob.med.uza',
  TH: 'The Threads of Hekych',
  TMG: 'The Threads of Mogrion',
  TRC: 'The Threads of RandCarter',
  TAX: 'The Threads of Axtimag',
  TLU: 'The Threads of Lui',
  TX: 'The Threads of Xrustalb',
  TKK: 'TKK.club'
}

export const CLASS_FEATURE_SOURCE_URLS = {
  PHB: 'https://www.dndbeyond.com/sources/dnd/phb-2014',
  'PHB 2024': 'https://www.dndbeyond.com/sources/dnd/phb-2024',
  TCE: 'https://www.dndbeyond.com/sources/dnd/tcoe'
}

// В данных 2024 часть источников записана как «TL · The Threads of Largo».
// Для фильтров нужен короткий код, для подсказки — полное название.
export function normalizeFeatureSource(raw) {
  const value = String(raw || '').trim()
  if (!value) return { code: '', name: 'Неизвестный источник' }
  const [code, ...rest] = value.split('·').map(part => part.trim())
  const name = rest.join(' · ')
  return { code, name: name || CLASS_FEATURE_SOURCE_NAMES[code] || code }
}
