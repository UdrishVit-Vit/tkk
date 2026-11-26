import test from 'node:test'
import assert from 'node:assert/strict'
import { findReferenceSections } from '../app/data/sectionRoutes.js'
import { SYSTEMS } from '../app/data/hub.js'

test('search keeps both editions distinct and prefers the current guide', () => {
  const results = findReferenceSections(SYSTEMS, ' Заклинания ', '2024')
  assert.deepEqual(results.slice(0, 2).map(item => [item.to, item.edition]), [
    ['/dnd55e/spells', '2024'], ['/dnd5e/spells', '2014']
  ])
})

test('search returns real Lore destinations and no invented hits', () => {
  assert.equal(findReferenceSections(SYSTEMS, 'Пантеон', '5e')[0].to, '/lore/pantheon')
  assert.deepEqual(findReferenceSections(SYSTEMS, 'qzxwv', '2024'), [])
})
