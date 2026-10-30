import assert from 'node:assert/strict'
import { DND55E_BACKGROUNDS as backgrounds } from '../app/data/dnd55e/backgrounds.js'
import { DND55E_HOMEBREW_ORIGIN_FEATS as drafts, DND55E_BACKGROUND_FEAT_PROPOSALS as links } from '../app/data/dnd55e/origin-feats-homebrew.js'
import { DND55E_FEATS as published } from '../app/data/dnd55e/feats.js'

export function checkEnoaOrigins(bs, fs, mapping) {
  const errors = []
  const author = bs.filter(b => b.source === 'TVV')
  // The original Nameless draft remains in the editorial source, outside active assignments.
  if(author.length !== 54 || fs.length !== 54 || author.some(b=>['nameless','lifestone-wright','knot-scribe','sarban-drover'].includes(b.id))) errors.push('coverage-count')
  const mapped = new Set()
  for(const b of author) {
    const ids = mapping[b.id] || []
    if(ids.length !== 1) errors.push(`coverage:${b.id}`)
    const f = fs.find(f => f.id === ids[0])
    if(!f || f.relatedBackgrounds.length !== 1 || f.relatedBackgrounds[0] !== b.id) errors.push(`reverse:${b.id}`)
    if(mapped.has(ids[0])) errors.push(`shared:${b.id}`)
    mapped.add(ids[0])
    if(!Array.isArray(b.enoaLead) || b.enoaLead.length < 2) errors.push(`depth:${b.id}`)
  }
  for(const b of bs.filter(b => b.source !== 'TVV')) if(mapping[b.id]) errors.push(`scope:${b.id}`)
  const prohibited = /книг[а-яё]*|бумаг[а-яё]*|пергамент[а-яё]*|чернил[а-яё]*|почерк[а-яё]*|страниц[а-яё]*|писчее перо/iu
  for(const b of bs) if(prohibited.test(JSON.stringify(b))) errors.push(`writing:${b.id}`)
  for(const f of fs) {
    if(prohibited.test(JSON.stringify(f))) errors.push(`writing:${f.id}`)
    if(!f.balance?.comparator || !f.balance?.concern || f.balance.usesAtLevels.length !== 4) errors.push(`balance:${f.id}`)
  }
  const mechanics = fs.map(f => f.benefits.map(b => b.text).join(' '))
  if(new Set(mechanics).size !== mechanics.length) errors.push('duplicate-mechanics')
  return errors
}
assert.deepEqual(checkEnoaOrigins(backgrounds,drafts,links), [])
for(const f of drafts.filter(f => f.status !== 'Approved')) assert.ok(!published.some(p => p.id === f.id), f.id)
for(const [name,mutate] of [
  ['missing', (b,f,l)=>{delete l[b.find(x=>x.source==='TVV').id]}],
  ['paper', b=>{b[0].enoaLead[0]+=' Вы переписывали книги.'}],
  ['official-scope', (b,f,l)=>{b.push({...b[0],id:'phb-scope-probe',source:'PHB'});l['phb-scope-probe']=[f[0].id]}],
  ['duplicate', (b,f)=>{f[1].benefits=structuredClone(f[0].benefits)}]
]){
 const b=structuredClone(backgrounds), f=structuredClone(drafts), l=structuredClone(links)
 mutate(b,f,l)
 assert.ok(checkEnoaOrigins(b,f,l).length,name)
}
console.log(`${drafts.length} active individual proposals; no PHB assignments; ${backgrounds.length} knot-writing audits; 4 regression cases passed. Mechanical uniqueness is not proof of balance.`)
