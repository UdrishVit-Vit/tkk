import assert from 'node:assert/strict'
import { CALENDAR_MONTHS, CALENDAR_EVENTS, YEAR_LENGTH, calendarCell, dayOfYear, shiftCalendarDate, nextCalendarEvent, validCalendarDate } from '../app/data/loreCalendar.js'

assert.equal(YEAR_LENGTH, 198)
const counts = { day: 0, eaten: 0, absent: 0 }
for (let month = 0; month < 8; month++) {
  for (let day = 1; day <= 26; day++) counts[calendarCell(month, day).kind]++
}
assert.deepEqual(counts, { day: 198, eaten: 9, absent: 1 })
assert.equal(calendarCell(1, 26).kind, 'absent')
assert.deepEqual(calendarCell(7, 23).events.map(event => event.id), ['silence', 'darkness'])
assert.deepEqual(CALENDAR_EVENTS.map(event => event.dates.length), [6, 11, 2, 2, 5, 1])
for (const event of CALENDAR_EVENTS) {
  for (const [month, day] of event.dates) {
    assert.equal(calendarCell(month, day).kind, 'day')
    assert(calendarCell(month, day).events.includes(event))
  }
}

// Every real day advances continuously and survives a full-year round trip.
for (let month = 0; month < 8; month++) {
  for (let day = 1; day <= CALENDAR_MONTHS[month].days; day++) {
    const date = { year: 2, month, day }
    assert(validCalendarDate(date))
    assert.deepEqual(shiftCalendarDate(shiftCalendarDate(date, YEAR_LENGTH), -YEAR_LENGTH), date)
    const tomorrow = shiftCalendarDate(date, 1)
    assert.equal((tomorrow.year - 2) * YEAR_LENGTH + dayOfYear(tomorrow), dayOfYear(date) + 1)
    const next = nextCalendarEvent(date)
    assert(next.offset > 0 && next.offset <= YEAR_LENGTH)
    assert(next.events.length > 0)
    assert.deepEqual(shiftCalendarDate(date, next.offset), next.date)
    for (let offset = 1; offset < next.offset; offset++) {
      const intermediate = shiftCalendarDate(date, offset)
      assert.equal(calendarCell(intermediate.month, intermediate.day).events.length, 0)
    }
  }
}
assert.deepEqual(shiftCalendarDate({ year: 1, month: 4, day: 25 }, 1), { year: 1, month: 5, day: 1 })
assert.deepEqual(shiftCalendarDate({ year: 1, month: 7, day: 23 }, 1), { year: 2, month: 0, day: 1 })
assert.equal(shiftCalendarDate({ year: 1, month: 0, day: 1 }, -1), null)
assert.equal(shiftCalendarDate({ year: 9999, month: 7, day: 23 }, 1), null)
assert.equal(shiftCalendarDate({ year: 1, month: 0, day: 1 }, 1.5), null)
assert.equal(validCalendarDate({ year: 1, month: 5, day: 25 }), false)
assert.equal(validCalendarDate({ year: 1, month: 8, day: 1 }), false)
console.log('Calendar checks passed: dates, holidays, absent days, year boundaries and next events.')
