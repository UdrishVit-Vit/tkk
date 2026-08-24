import core from './core.js'
import actions from './actions.js'
import conditions from './conditions.js'
import combat from './combat.js'
import movement from './movement.js'
import magic from './magic.js'
import modes from './modes.js'

export const PF2E_GLOSSARY = [...core, ...actions, ...conditions, ...combat, ...movement, ...magic, ...modes]

export const PF2E_GLOSSARY_BY_ID = Object.fromEntries(PF2E_GLOSSARY.map(entry => [entry.id, entry]))

// Reading order on the page: fundamentals first, then the turn, then everything
// that resolves during it, then the wider world.
export const PF2E_GLOSSARY_CATEGORIES = {
  core: { title: 'Основы', icon: '◇' },
  actions: { title: 'Действия и навыки', icon: '⚔' },
  combat: { title: 'Бой, урон и защита', icon: '✦' },
  conditions: { title: 'Состояния', icon: '☍' },
  movement: { title: 'Движение и чувства', icon: '↗' },
  magic: { title: 'Магия', icon: '✧' },
  modes: { title: 'Режимы игры и мир', icon: '⌛' }
}

export function pf2eGlossaryEntry(id) {
  return PF2E_GLOSSARY_BY_ID[id] || null
}
