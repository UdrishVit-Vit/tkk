import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { createRenderer, nextTick, reactive } from 'vue'
import { parse, compileScript, compileTemplate } from 'vue/compiler-sfc'

const require = createRequire(import.meta.url)
const route = reactive({ query: {} })
const saved = new Map([['enoa-calendar-v1', JSON.stringify({ date: { year: 2, month: 0, day: 1 }, note: 'Старая заметка' })]])
globalThis.useRoute = () => route
globalThis.useHead = () => {}
globalThis.localStorage = { getItem: key => saved.get(key) || null, setItem: (key, value) => saved.set(key, value) }
const filename = resolve('app/components/LoreCalendarPage.vue')
const { descriptor } = parse(readFileSync(filename, 'utf8'), { filename })
assert.equal(compileTemplate({source:descriptor.template.content,filename,id:'calendar-runtime-check'}).errors.length,0)
let source = compileScript(descriptor, { id: 'calendar-runtime-check' }).content
source = `import {ref,computed,onMounted,watch} from '${pathToFileURL(require.resolve('vue')).href}';\n` + source.replace(/from '(~\/data\/[^']+)'/g, (_, path) => `from '${pathToFileURL(resolve('app', path.slice(2))).href}'`)
const component = (await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)).default
component.render = () => null
const renderer = createRenderer({
  createElement: type => ({ type }), createText: text => ({ text }), createComment: text => ({ text }),
  setText() {}, setElementText() {}, parentNode: () => null, nextSibling: () => null,
  insert() {}, remove() {}, patchProp() {},
})
const app = renderer.createApp(component, { theme: {} })
const vm = app.mount({})
const state = vm.$.setupState
await nextTick()
assert.equal(state.date.year, 2)
assert.equal(state.note, 'Старая заметка')
state.selectEra(1)
assert.deepEqual(state.date, { era: 1, year: 1, month: 0, day: 1, hour: 0, minute: 0 })
state.yearSign = 'ruby-frog'
await nextTick()
assert.equal(state.chosenSign.name, 'Рубиновая Лягушка')
state.setYear(2)
assert.equal(state.yearSign, '')
state.setYear(1)
assert.equal(state.yearSign, 'ruby-frog')
state.setDuration(0, '198')
state.setDuration(1, '1')
state.advance(24, 'hours')
assert.deepEqual(state.date, { era: 2, year: 1, month: 0, day: 1, hour: 0, minute: 0 })
assert.equal(state.absoluteTime, 199 * 1440)
state.target = { ...state.date, hour: 2 }
assert.equal(state.remaining, 120)
state.advance(30, 'minutes')
assert.equal(state.remaining, 90)
state.baseline = { ...state.date }
state.advance(2, 'hours')
assert.equal(state.campaignTime, 120)
state.yearSign = 'custom'
state.customSign = 'Белый Вирм'
await nextTick()
const restored = JSON.parse(saved.get('enoa-calendar-v2'))
assert.equal(restored.yearNames['2:1'].custom, 'Белый Вирм')
assert.equal(restored.date.hour, 2)
assert.equal(restored.note, 'Старая заметка')
state.setDuration(2, '0')
assert.equal(state.durations[2], null)
assert(state.message.includes('Длительность'))
state.durations = [null, null, null, null, null, null]
state.date = { era: 0, year: 1, month: 0, day: 1, hour: 0, minute: 0 }
const manu = state.eventCycles.find(cycle => cycle.event.id === 'manu')
assert.equal(manu.next.days, 25)
assert(state.upcomingCells.has('0:26'))
state.countToCycle(manu)
assert.equal(state.remaining, 25 * 1440)
assert(state.cycleIsTarget(manu))
state.advance(1)
assert.equal(state.remaining, 24 * 1440)
state.date = { era: 0, year: 1, month: 7, day: 23, hour: 0, minute: 0 }
assert(!state.upcomingCells.has('7:23'))
state.date = { era: 0, year: 100000, month: 0, day: 1, hour: 0, minute: 0 }
state.advance(1)
assert.equal(state.date.year,100000)
assert.equal(state.date.day,2)
state.durations = [null, null, null, null, null, null]
state.date = { era: 0, year: 1, month: 0, day: 26, hour: 0, minute: 0 }
state.choose(7,state.date.day)
assert.equal(state.date.month,7)
assert.equal(state.date.day,23)
state.setDay('6')
assert.equal(state.date.day,6)
state.setDay('24')
assert.equal(state.date.day,6)
state.selectEra(1)
assert.equal(state.date.year,1)
assert.equal(state.date.month,0)
assert.equal(state.date.day,1)
state.durations = [null, null, null, null, null, null]
state.yearNames = {}
state.date = { era: 0, year: 1, month: 0, day: 1, hour: 0, minute: 0 }
assert.equal(state.selectedYearName,'Пепельный Симург')
assert.equal(state.yearNameIsSuggested,true)
assert(state.selectedDateText.includes('Жертва Пуруша'))
assert(state.selectedDateText.includes('месяц Эор · день 1'))
assert(state.selectedDateText.includes('🌞 День Шамаса'))
state.yearSign = 'ruby-frog'
assert.equal(state.selectedYearName,'Рубиновая Лягушка')
assert.equal(state.yearNameIsSuggested,false)
state.yearSign = 'custom'
state.customSign = 'Коралловый Аюр'
assert.equal(state.selectedYearName,'Коралловый Аюр')
state.date = { ...state.date, month:7,day:23 }
assert(state.selectedDateText.includes('День Молчания'))
assert(state.selectedDateText.includes('День Тьмы'))
state.resetGeneration()
assert.equal(state.showFilters,false)
assert.equal(state.generation.yearMax,1225)
state.generation={era:2,yearMin:7,yearMax:7,month:7,day:23,event:'darkness'}
state.generateDate()
assert.deepEqual(state.date,{era:2,year:7,month:7,day:23,hour:0,minute:0})
assert.equal(state.selectedYearName,state.suggestedYear.name)
state.generation.day=26
state.generateDate()
assert(state.generationStatus.includes('нет существующей даты'))
assert.equal(state.date.day,23)
app.unmount()
console.log('Calendar page runtime checks passed: migration, signs per year, era reset, durations, countdown and persistence.')
