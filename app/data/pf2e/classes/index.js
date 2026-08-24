import { buildClassTable } from '../progression.js'

import barbarian from './barbarian.js'
import bard from './bard.js'
import cleric from './cleric.js'
import drifter from './drifter.js'
import druid from './druid.js'
import fighter from './fighter.js'
import inventor from './inventor.js'
import monk from './monk.js'
import paladin from './paladin.js'
import ranger from './ranger.js'
import rogue from './rogue.js'
import shaman from './shaman.js'
import sorcerer from './sorcerer.js'
import warlock from './warlock.js'
import wizard from './wizard.js'

// Alphabetical by Russian title, the order the catalogue reads in.
const RAW_CLASSES = [
  bard, barbarian, fighter, wizard, drifter, druid, cleric,
  inventor, warlock, monk, paladin, rogue, ranger, sorcerer, shaman
]

// The 1–20 table is assembled once at module load: the universal spine plus the
// class's own features, so a class file never repeats "класcовый талант" twenty times.
export const PF2E_CLASSES = RAW_CLASSES.map(entry => ({
  ...entry,
  table: buildClassTable(entry.featuresByLevel, { fullCaster: entry.fullCaster })
}))

export const PF2E_CLASS_BY_ID = Object.fromEntries(PF2E_CLASSES.map(c => [c.id, c]))

export function pf2eClass(id) {
  return PF2E_CLASS_BY_ID[id] || null
}

export const PF2E_CLASS_FAMILIES = {
  core: { label: 'Классы Pathfinder 2e', short: 'PF2e' },
  enoa: { label: 'Авторские классы Эноа', short: 'Эноа' }
}
