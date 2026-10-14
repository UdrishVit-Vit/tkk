import assert from 'node:assert/strict'
import { YEAR_IMAGES,YEAR_ASPECTS,YEAR_NAME_PERIOD,workingYearName } from '../app/data/yearNaming.js'
import { YEAR_IMAGE_TALES,YEAR_ASPECT_TALES,yearThread } from '../app/data/yearThreads.js'
for(const image of YEAR_IMAGES) assert(YEAR_IMAGE_TALES[image.id],image.id)
for(const aspect of YEAR_ASPECTS) assert(YEAR_ASPECT_TALES[aspect.id],aspect.id)
for(let year=1;year<=YEAR_NAME_PERIOD;year++) {
  const symbols=workingYearName(year-1),reading=yearThread(year,symbols.name)
  assert.equal(reading.name,symbols.name)
  assert.equal(reading.image.id,symbols.image.id)
  assert.equal(reading.aspect.id,symbols.aspect.id)
  assert(reading.promise&&reading.warning&&reading.custom)
  assert.equal(reading.voices.length,3)
  assert(!JSON.stringify(reading).includes('undefined'))
}
assert.equal(yearThread(1).name,'Пепельный Симург')
assert.equal(yearThread(1,'Рубиновая Лягушка').image.id,'toad')
assert.equal(yearThread(1,'Синий Перепелятник').aspect.id,'azure')
assert.equal(yearThread(1,'Летящий Бук').aspect.id,'flying')
assert.equal(yearThread(1,'Кристальный Барс').name,'Кристальный Барс')
assert.equal(yearThread(1,'Особое местное имя'),null)
console.log('Year folklore checks passed: all 1225 names, 70 symbols, historical aliases and unknown local names.')
