import assert from 'node:assert/strict'
import { CALENDAR_ERAS, YEAR_SIGNS, MINUTES_PER_DAY as DAY, initialChronologyDate as start, emptyEraDurations, shiftChronologyDate as shift, chronologyDifference as diff, minutesFromPurusha as total, validChronologyDate as valid, nextChronologyEvent } from '../app/data/loreChronology.js'

const unknown = emptyEraDurations()
assert.equal(CALENDAR_ERAS.length, 7)
assert.equal(YEAR_SIGNS.filter(sign => sign.source === 'Lore 0.31').length, 7)
assert.equal(total(start()), 0)
assert.equal(total(start(1)), null)
assert.equal(diff(start(1), { ...start(1), day: 2 }), DAY)
assert.equal(diff(start(), start(1)), null)
assert.equal(shift(start(), -1).date, undefined)
assert.equal(shift(start(1), -1).date, undefined)
assert.deepEqual(shift({ ...start(), month: 4, day: 25, hour: 23, minute: 59 }, 1).date, { ...start(), month: 5, day: 1 })
assert.deepEqual(shift({ ...start(), month: 7, day: 23, hour: 23, minute: 59 }, 1).date, { ...start(), year: 2 })

const lengths = [198, 25, 396, 1, 40, 198]
const lastMinute = { ...start(), month: 7, day: 23, hour: 23, minute: 59 }
assert.deepEqual(shift(lastMinute, 1, lengths).date, start(1))
assert.deepEqual(shift(start(1), -1, lengths).date, lastMinute)
assert.deepEqual(shift(start(1), 25 * DAY, lengths).date, start(2))
assert.equal(valid({ ...start(1), day: 26 }, lengths), false)
assert.equal(total(start(2), lengths), 223 * DAY)
assert.equal(diff(start(1), start(2), lengths), 25 * DAY)
assert.equal(diff(start(2), start(1), lengths), -25 * DAY)
assert.equal(shift(start(), 1.5, lengths).date, undefined)
assert.equal(shift(start(), Number.MAX_SAFE_INTEGER, lengths).date, undefined)
assert.equal(shift(start(), 0, [0, null, null, null, null, null]).date, undefined)
const partlyKnown = [null, 25, null, null, null, null]
assert.equal(diff(start(1), start(2), partlyKnown), 25 * DAY)
assert.equal(total(start(2), partlyKnown), null)
assert.equal(nextChronologyEvent(lastMinute, lengths).date.era, 1)

const end = lengths.reduce((sum, days) => sum + days, 0) * DAY + 198 * DAY
for (let minutes = 0; minutes < end; minutes += 311) {
  const date = shift(start(), minutes, lengths).date
  assert(valid(date, lengths))
  assert.equal(total(date, lengths), minutes)
  assert.equal(diff(start(), date, lengths), minutes)
  assert.deepEqual(shift(date, -minutes, lengths).date, start())
}
assert.equal(valid({ ...start(), hour: 24 }), false)
assert.equal(valid({ ...start(), minute: 60 }), false)
console.log('Chronology checks passed: era resets, unknown boundaries, elapsed time, reverse travel and minute arithmetic.')
