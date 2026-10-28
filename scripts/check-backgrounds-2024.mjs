import { DND55E_BACKGROUNDS as backgrounds } from '../app/data/dnd55e/backgrounds.js'
import { DND55E_FEATS as feats } from '../app/data/dnd55e/feats.js'
import { DND55E_HOMEBREW_ORIGIN_FEATS as homebrew, DND55E_BACKGROUND_FEAT_PROPOSALS as proposals } from '../app/data/dnd55e/origin-feats-homebrew.js'
import { DND55E_EQUIPMENT as equipment } from '../app/data/dnd55e/equipment2024.js'
import { DND55E_GLOSSARY as glossary } from '../app/data/dnd55e/glossary.js'
import { validateBackgrounds } from './lib/validate-backgrounds-2024.mjs'

export const currentData = { backgrounds, feats, homebrew, proposals, equipment, glossary }
// Explicitly retained published exceptions, not waivers for new records.
const known = new Map([
  ['blood-of-the-heshegi', 'curse-of-airun: free']
])
const issues = validateBackgrounds(currentData)
const pending = issues.filter(i => i.code === 'feat-category' && known.get(i.id) === i.detail)
const errors = issues.filter(i => !pending.includes(i))
for (const i of pending) console.warn(`PENDING APPROVAL ${i.id}: ${i.detail}`)
for (const i of errors) console.error(`${i.code} ${i.id}: ${i.detail}`)
console.log(`${backgrounds.length} backgrounds; ${homebrew.length} authored origin feats; ${errors.length} new errors; ${pending.length} retained category exceptions.`)
if (errors.length || (process.argv.includes('--strict') && pending.length)) process.exitCode = 1
