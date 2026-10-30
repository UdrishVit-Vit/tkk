// Draft proposals are editorial material; only explicit approval admits them to the catalog.
import { ENOA_AUTHORED_ORIGINS_V4 } from '../enoa-authored-feats-v4.js'
import { MLAH_FEAT } from './mlah-diver.js'
import { COHORT_FEAT } from './cohort-renegade.js'
import { HOUSE_ORIGIN_FEAT } from '../house-of-knots.js'
export const DND55E_HOMEBREW_ORIGIN_FEATS = [MLAH_FEAT, COHORT_FEAT, HOUSE_ORIGIN_FEAT, ...ENOA_AUTHORED_ORIGINS_V4.filter(feat => feat.relatedBackgrounds.length)]
export const DND55E_BACKGROUND_FEAT_PROPOSALS = Object.fromEntries(DND55E_HOMEBREW_ORIGIN_FEATS.map(f => [f.relatedBackgrounds[0], [f.id]]))
export const isPublishableHomebrew = feat => feat.contentKind === 'Homebrew' && feat.status === 'Approved'
