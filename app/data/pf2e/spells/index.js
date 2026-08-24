import cantrips from './cantrips.js'
import low from './low.js'
import high from './high.js'
import enoa from './enoa.js'

export { PF2E_TRADITIONS, PF2E_SPELL_ACTION_GLYPHS } from './spell.js'

export const PF2E_SPELLS = [...cantrips, ...low, ...high, ...enoa]

export const PF2E_SPELL_CATEGORIES = {
  cantrips: 'Заговоры',
  'rank-1': '1 круг',
  'rank-2': '2 круг',
  'rank-3': '3 круг',
  'rank-4': '4 круг',
  'rank-5': '5 круг',
  'rank-6': '6 круг',
  'rank-7': '7 круг',
  'rank-8': '8 круг',
  'rank-9': '9 круг',
  'rank-10': '10 круг',
  enoa: 'Заклинания Эноа'
}

export const PF2E_SPELL_RARITIES = ['Обычное', 'Необычное', 'Редкое']
