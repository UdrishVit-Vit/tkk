import assert from 'node:assert/strict'
import {workingYearName,YEAR_NAME_PERIOD} from '../app/data/yearNaming.js'
import {yearThread} from '../app/data/yearThreads.js'
import {yearStory,YEAR_NARRATORS} from '../app/data/yearStories.js'
const bodies=new Set()
for(let year=1;year<=YEAR_NAME_PERIOD;year++) {
  const reading=yearThread(year,workingYearName(year-1).name)
  const voices=[]
  for(const narrator of YEAR_NARRATORS) {
    const story=yearStory(reading,narrator.id)
    assert.equal(story.narrator,narrator.id)
    assert(story.title.length>0)
    for(const field of ['opening','introduction','parable','crossroads','influence','counsel','omen','custom','calendarOmen','hook']) assert(typeof story[field]==='string'&&story[field].length>10,`${reading.name}: ${field}`)
    assert(!JSON.stringify(story).includes('undefined'))
    assert.deepEqual(story,yearStory(reading,narrator.id))
    voices.push(story.counsel)
    if(narrator.id==='shaman') bodies.add(story.parable+'\n'+story.crossroads)
  }
  assert.equal(new Set(voices).size,3)
}
assert.equal(bodies.size,1225)
for(const name of ['Летящий Бук','Рубиновая Лягушка','Синий Перепелятник']) assert(yearStory(yearThread(1,name)))
assert.equal(yearStory(null),null)
assert.equal(yearStory(yearThread(1),'invalid').narrator,'shaman')
const crystal=yearStory(yearThread(1,'Кристальный Барс'))
const obsidian=yearStory(yearThread(1,'Обсидиановый Барс'))
assert.notEqual(crystal.crossroads,obsidian.crossroads)
assert(crystal.crossroads.includes('прозрачный след'))
console.log('Year story checks passed: 1225 distinct bodies, 3675 narrator readings, deterministic text, historical aliases and unknown names.')
