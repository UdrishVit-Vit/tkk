import { registerHooks } from 'node:module'
import assert from 'node:assert/strict'
import test from 'node:test'

// Nuxt supports bare JSON imports; Node requires the equivalent import attribute.
registerHooks({
  resolve(specifier, context, nextResolve) {
    const result = nextResolve(specifier, context)
    return specifier.endsWith('.generated.json') ? { ...result, importAttributes: { type: 'json' } } : result
  },
})
const { LORE_GLOSSARY_BY_ID: terms } = await import('../app/data/loreGlossary.js')
const { ogniChapterLink, cutOgniPayload } = await import('../app/data/loreOgniGlossary/index.js')
const { glossaryThreadLinks, glossaryTermPath } = await import('../app/data/loreGlossaryThreads.js')

test('only an explicitly selected entry changes the glossary path', () => {
  assert.equal(glossaryTermPath(''), '/lore/glossary')
  assert.equal(glossaryTermPath('azrak'), '/lore/glossary/azrak')
})

test('Shamas has an archive definition, still retains the campaign material', () => {
  const term = terms.shamas
  assert.match(term.definition, /золотой солнечный диск/i)
  assert.match(term.definition, /Всадников Рассвета/)
  assert.ok(term.sources.includes('threads-of-unseen') && term.sources.includes('ogni'))
  assert.ok(terms.azrak.related.includes(term.id))
})

test('Azrak links to an actual campaign chapter; reading progress hides future links', () => {
  const entry = terms.azrak.ogni
  const links = glossaryThreadLinks(cutOgniPayload(entry, { season: 3, chapter: Infinity }))
  assert.ok(links.some(item => item.title === 'Огни · сезон 2, глава 3' && item.to.query.chapter === ogniChapterLink(2, 3).query.chapter))
  assert.deepEqual(glossaryThreadLinks(cutOgniPayload(entry, { season: 2, chapter: 2 })), [])
})
