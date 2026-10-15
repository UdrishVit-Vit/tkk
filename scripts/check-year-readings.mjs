import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { workingYearName, YEAR_NAME_PERIOD } from '../app/data/yearNaming.js'
import { yearThread } from '../app/data/yearThreads.js'
import { yearReading, YEAR_NARRATORS } from '../app/data/yearStories.js'

const stories = new Set(), forecasts = new Set()
const noWriting = /письм|перепис|рукопис|книг|конверт|чернил|пергам|надпис|запис|свит(?:ок|ка)|строк[ауеи]/iu
let maxWords = 0
for (let year = 1; year <= YEAR_NAME_PERIOD; year++) {
  const reading = yearThread(year, workingYearName(year - 1).name)
  const voices = []
  for (const voice of YEAR_NARRATORS) {
    const story = yearReading(reading, voice.id)
    assert(story && story.title && story.forecast && story.omen)
    assert.equal(story.narrator, voice.id)
    assert(!/Мне снился|Мой брат вернулся|Я однажды/u.test(story.forecast), 'A past anecdote has replaced the forecast')
    assert(!('parable' in story), 'The visible model should expose the forecast')
    assert(!/неповреждённая ноша|порвавшейся лямк|равное число узлов|петли, ослабевшие|камень упадёт вверх/u.test(story.forecast + story.omen), 'An opaque mechanical omen has returned')
    const text = story.forecast + ' ' + story.omen
    const count = text.split(/\s+/u).length
    assert(count <= 120, `${reading.name}/${voice.id}: too long (${count})`)
    maxWords = Math.max(maxWords, count)
    assert(!noWriting.test(text), `${reading.name}/${voice.id}: writing in setting`)
    assert(!stories.has(text), `${reading.name}/${voice.id}: repeated complete reading`)
    assert.deepEqual(story, yearReading(reading, voice.id))
    stories.add(text); forecasts.add(story.forecast); voices.push(story.forecast)
  }
  assert.equal(new Set(voices).size, 3)
}
assert.equal(stories.size, 3675)
assert.equal(forecasts.size, 105)
assert.equal(yearReading(null), null)
assert.equal(yearReading(yearThread(1), 'unknown').narrator, 'shaman')
for (const name of ['Летящий Бук', 'Рубиновая Лягушка', 'Синий Перепелятник']) assert(yearReading(yearThread(1, name)))
const ui = readFileSync('app/components/YearNamingWorkshop.vue', 'utf8')
assert(!/Дослушать толкование|История для отыгрыша|<details/u.test(ui))
console.log(`Compact readings passed: ${stories.size} distinct readings, ${forecasts.size} forecasts, three voices; maximum ${maxWords} words; no alphabetic writing.`)
for (const voice of YEAR_NARRATORS) {
  const story = yearReading(yearThread(1, 'Пепельный Симург'), voice.id)
  console.log(`${voice.label}: ${story.title}\n${story.forecast}\n${story.omen}\n`)
}
