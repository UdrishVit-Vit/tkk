import assert from 'node:assert/strict'
import {defaultGeneration,generateCalendarDate} from '../app/data/calendarGeneration.js'
import {validChronologyDate,emptyEraDurations,CALENDAR_ERAS} from '../app/data/loreChronology.js'
import {calendarCell} from '../app/data/loreCalendar.js'
let seed=5713
const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}
const seenEras=new Set(),seenMonths=new Set()
for(let i=0;i<1000;i++) {
  const result=generateCalendarDate(defaultGeneration(),emptyEraDurations(),random)
  assert(!result.error,result.error)
  assert(validChronologyDate(result.date))
  assert(result.date.year>=1&&result.date.year<=1225)
  assert.equal(calendarCell(result.date.month,result.date.day).kind,'day')
  assert(result.rolls.every(roll=>roll.dice.length%4===0&&roll.dice.every(face=>face>=1&&face<=4)))
  seenEras.add(result.date.era);seenMonths.add(result.date.month)
}
assert.equal(seenEras.size,CALENDAR_ERAS.length)
assert.equal(seenMonths.size,8)
for(const event of ['shamas','manu','hunt','eri','silence','darkness','ordinary']) {
  for(let i=0;i<30;i++) {
    const result=generateCalendarDate({...defaultGeneration(),event},emptyEraDurations(),random)
    assert(!result.error)
    const marks=calendarCell(result.date.month,result.date.day).events
    if(event==='ordinary') assert.equal(marks.length,0)
    else assert(marks.some(e=>e.id===event))
  }
}
const fixed={era:3,yearMin:42,yearMax:42,month:7,day:23,event:'darkness'}
assert.deepEqual(generateCalendarDate(fixed).date,{era:3,year:42,month:7,day:23,hour:0,minute:0})
assert.equal(generateCalendarDate(fixed).rolls.length,0)
for(const [month,day] of [[1,26],[4,26],[5,25],[6,24],[7,24]]) assert(generateCalendarDate({...fixed,month,day,event:'any'}).error)
assert(generateCalendarDate({...fixed,yearMin:43}).error)
assert(generateCalendarDate({...fixed,yearMax:1000001}).error)
assert(generateCalendarDate({...fixed,month:0,event:'darkness'}).error)
const durations=emptyEraDurations();durations[0]=1
const bounded=generateCalendarDate({...defaultGeneration(),era:0},durations,random)
assert.deepEqual(bounded.date,{era:0,year:1,month:0,day:1,hour:0,minute:0})
assert(generateCalendarDate({...defaultGeneration(),era:0,yearMin:2},durations,random).error)
for(let i=0;i<50;i++) {
  const result=generateCalendarDate({...defaultGeneration(),yearMin:900000,yearMax:1000000},emptyEraDurations(),random)
  assert(validChronologyDate(result.date));assert(result.date.year>=900000)
}
let samples=0
const reroll=()=>samples++<4?.999:0
const rejected=generateCalendarDate({...fixed,era:'any'},emptyEraDurations(),reroll)
assert.equal(rejected.rolls[0].accepted,false)
assert.equal(rejected.rolls[1].accepted,true)
console.log('Date generation checks passed: d4 blocks, all eras/months, holidays, impossible dates, fixed dates, short eras, long years and rerolls.')
