import assert from 'node:assert/strict'
import { YEAR_LENGTH, CALENDAR_EVENTS, calendarCell } from '../app/data/loreCalendar.js'
import { initialChronologyDate as start, chronologyEventCycles as cycles, shiftChronologyDate as shift, chronologyDifference as diff, MINUTES_PER_DAY as DAY } from '../app/data/loreChronology.js'

const initial = cycles(start())
assert.deepEqual(initial.map(cycle => cycle.next.days), [27, 25, 158, 12, 180, 197])
assert.equal(initial[0].today, true)
assert.equal(initial[0].progress, 0)
assert.equal(initial[1].previous, null)
assert.equal(initial[1].progress, null)
assert.equal(cycles({ ...start(), hour: 12 })[1].remainingMinutes, 25 * DAY - 720)
assert.equal(cycles({ ...start(), day: 26 })[1].next.days, 12)
assert.equal(cycles({ ...start(), day: 13 })[3].next.days, 1)
assert.equal(cycles({ ...start(), day: 14 })[3].next.days, 197)
const end = cycles({ ...start(), month: 7, day: 22 })
assert.equal(end[4].next.days, 1)
assert.equal(end[5].next.days, 1)
assert.deepEqual(end[5].next.events.map(event => event.id), ['silence', 'darkness'])
const today = cycles({ ...start(), month: 7, day: 23 })
assert.equal(today[4].today, true)
assert.equal(today[5].today, true)
assert.equal(today[5].next.days, 198)
assert.equal(today[0].next.days, 1)
assert.equal(cycles({ ...start(), year: 9999, month: 7, day: 23 })[5].next, null)

// Six short epochs have no hunt; the search must reach the final epoch.
const lengths = [150,150,150,150,150,150]
const acrossEras = cycles(start(), lengths)
assert.equal(acrossEras[2].next.days, 1058)
assert.equal(acrossEras[2].next.date.era, 6)
assert.equal(acrossEras[5].next.days, 1097)

for (let day = 0; day < YEAR_LENGTH; day++) {
  const current = shift({ ...start(), year: 2 }, day * DAY).date
  for (const cycle of cycles(current)) {
    assert(cycle.next.days >= 1 && cycle.next.days <= YEAR_LENGTH)
    assert(calendarCell(cycle.next.date.month, cycle.next.date.day).events.some(event => event.id === cycle.event.id))
    assert.equal(diff(current, cycle.next.date), cycle.remainingMinutes)
    assert(cycle.progress >= 0 && cycle.progress < 100)
    for (let offset = 1; offset < cycle.next.days; offset++) {
      const intermediate = shift(current, offset * DAY).date
      assert(!calendarCell(intermediate.month, intermediate.day).events.some(event => event.id === cycle.event.id))
    }
  }
}
assert.equal(initial.length, CALENDAR_EVENTS.length)
console.log('Event cycle checks passed: each next event, today, intersections, year rollover, minute countdown and short eras.')
