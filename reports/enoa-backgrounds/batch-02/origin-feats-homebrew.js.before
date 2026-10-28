// Draft proposals are editorial material; only explicit approval admits them to the catalog.
import { ENOA_ORIGIN_DRAFTS } from './origin-feats-enoa-drafts.js'
import { MLAH_FEAT } from './mlah-diver.js'
import { COHORT_FEAT } from './cohort-renegade.js'
const individualFeats = new Map([MLAH_FEAT, COHORT_FEAT].map(feat => [feat.id, feat]))
// Its background was removed by the author; retain the original draft in the
// editorial source, but exclude its obsolete background assignment from active data.
const activeDrafts = ENOA_ORIGIN_DRAFTS.filter(feat => !feat.relatedBackgrounds.includes('nameless'))
export const DND55E_HOMEBREW_ORIGIN_FEATS = activeDrafts.map(feat => individualFeats.get(feat.id) ?? feat)
export const DND55E_BACKGROUND_FEAT_PROPOSALS = Object.fromEntries(activeDrafts.map(f => [f.relatedBackgrounds[0], [f.id]]))
export const isPublishableHomebrew = feat => feat.contentKind === 'Homebrew' && feat.status === 'Approved'
