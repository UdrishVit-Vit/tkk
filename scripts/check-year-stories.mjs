import assert from 'node:assert/strict'
import {workingYearName,YEAR_NAME_PERIOD} from '../app/data/yearNaming.js'
import {yearThread} from '../app/data/yearThreads.js'
import {yearStory,YEAR_NARRATORS} from '../app/data/yearStories.js'
const bodies=new Set()
const distinctParables=new Set()
const noWriting=/письм|перепис|рукопис|книг|конверт|чернил|пергам|надпис|запис|свит(?:ок|ка)|строк[ауеи]/iu
for(let year=1;year<=YEAR_NAME_PERIOD;year++) {
  const reading=yearThread(year,workingYearName(year-1).name)
  const voices=[]
  const parables=[]
  const interpretations=[]
  for(const narrator of YEAR_NARRATORS) {
    const story=yearStory(reading,narrator.id)
    assert.equal(story.narrator,narrator.id)
    assert(story.title.length>0)
    for(const field of ['opening','introduction','parable','crossroads','influence','counsel','omen','custom','calendarOmen','hook']) assert(typeof story[field]==='string'&&story[field].length>10,`${reading.name}: ${field}`)
    assert(!JSON.stringify(story).includes('undefined'))
    assert.deepEqual(story,yearStory(reading,narrator.id))
    voices.push(story.counsel)
    parables.push(story.parable)
    interpretations.push(story.crossroads)
    distinctParables.add(story.parable)
    assert(!noWriting.test(Object.values(story).join(' ')),`${reading.name}/${narrator.id}: alphabetic writing in fiction`)
    if(narrator.id==='shaman') bodies.add(story.parable+'\n'+story.crossroads)
  }
  assert.equal(new Set(voices).size,3)
  assert.equal(new Set(parables).size,3)
  assert.equal(new Set(interpretations).size,3)
}
assert.equal(bodies.size,1225)
assert.equal(distinctParables.size,105)
for(const name of ['Летящий Бук','Рубиновая Лягушка','Синий Перепелятник']) assert(yearStory(yearThread(1,name)))
assert.equal(yearStory(null),null)
assert.equal(yearStory(yearThread(1),'invalid').narrator,'shaman')
const crystal=yearStory(yearThread(1,'Кристальный Барс'))
const obsidian=yearStory(yearThread(1,'Обсидиановый Барс'))
assert.notEqual(crystal.crossroads,obsidian.crossroads)
assert(crystal.crossroads.includes('прозрачный след'))
console.log('Year story checks passed: 1225 distinct bodies, 105 independent parables, 3675 narrator readings, no alphabetic writing, historical aliases and unknown names.')
