// Draft proposals are editorial material; only explicit approval admits them to the catalog.
import { ENOA_ORIGIN_DRAFTS } from './origin-feats-enoa-drafts.js'
import { MLAH_FEAT } from './mlah-diver.js'
import { COHORT_FEAT } from './cohort-renegade.js'
const individualFeats = new Map([MLAH_FEAT, COHORT_FEAT].map(feat => [feat.id, feat]))
export const DND55E_HOMEBREW_ORIGIN_FEATS = ENOA_ORIGIN_DRAFTS.map(feat => individualFeats.get(feat.id) ?? feat)
export const DND55E_BACKGROUND_FEAT_PROPOSALS = Object.fromEntries(ENOA_ORIGIN_DRAFTS.map(f => [f.relatedBackgrounds[0], [f.id]]))
export const isPublishableHomebrew = feat => feat.contentKind === 'Homebrew' && feat.status === 'Approved'
