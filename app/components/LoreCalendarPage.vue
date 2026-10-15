<script setup>
import { CALENDAR_MONTHS as months, CALENDAR_EVENTS as holidays, YEAR_LENGTH, MAX_CALENDAR_YEAR, calendarCell, dayOfYear, calendarDateLabel } from '~/data/loreCalendar.js'
import { CALENDAR_ERAS as eras, YEAR_SIGNS as signs, MINUTES_PER_DAY, MAX_ERA_DAYS, initialChronologyDate, emptyEraDurations, validEraDurations, validChronologyDate, eraDayIndex, shiftChronologyDate, minutesFromPurusha, chronologyDifference, nextChronologyEvent, chronologyEventCycles, chronologyTimeLabel, elapsedTimeLabel } from '~/data/loreChronology.js'

import { defaultGeneration, generateCalendarDate } from '~/data/calendarGeneration.js'
import { workingYearName } from '~/data/yearNaming.js'

defineProps({ theme: { type: Object, required: true } })
defineEmits(['up'])
const route = useRoute()
const date = ref(initialChronologyDate())
const durations = ref(emptyEraDurations())
const durationDrafts = ref(emptyEraDurations().map(() => ''))
const yearNames = ref({})
const target = ref({ ...initialChronologyDate(), day: 2 })
const baseline = ref(initialChronologyDate())
const note = ref('')
const offset = ref(1)
const offsetUnit = ref('days')
const filter = ref('all')
const showFilters = ref(false)
const dateDraft = ref({...date.value})
const manualDateError = ref('')
function toggleDateSettings() {
  if(!showFilters.value) {dateDraft.value={...date.value};manualDateError.value=''}
  showFilters.value=!showFilters.value
}
function applyManualDate() {
  const candidate={...dateDraft.value,era:Number(dateDraft.value.era),year:Number(dateDraft.value.year),month:Number(dateDraft.value.month),day:Number(dateDraft.value.day)}
  if(!validChronologyDate(candidate,durations.value)) {
    manualDateError.value='Укажите существующую дату в пределах выбранной эпохи. Год: 1–1 000 000.'
    return
  }
  updateDate(candidate)
  generationStatus.value=''
  manualDateError.value=''
  showFilters.value=false
  message.value='Дата применена.'
}
const generation = ref(defaultGeneration())
const generationRolls = ref([])
const generationStatus = ref('')
function resetGeneration() { generation.value=defaultGeneration(); generationStatus.value=''; generationRolls.value=[] }
function generateDate() {
  const result=generateCalendarDate(generation.value,durations.value)
  if(result.error) { generationStatus.value=result.error; generationRolls.value=[]; return }
  updateDate(result.date)
  generationRolls.value=result.rolls
  generationStatus.value=''
}
const message = ref('')
const storageMessage = ref('')
const ready = ref(false)
const storageKey = 'enoa-calendar-v2'
const currentEvents = computed(() => calendarCell(date.value.month, date.value.day).events)
const next = computed(() => nextChronologyEvent(date.value, durations.value))
const eventCycles = computed(() => chronologyEventCycles(date.value, durations.value))
const upcomingCells = computed(() => new Set(eventCycles.value.filter(cycle => cycle.next && cycle.next.date.era === date.value.era && cycle.next.date.year === date.value.year).map(cycle => `${cycle.next.date.month}:${cycle.next.date.day}`)))
function countToCycle(cycle) {
  if (!cycle.next) return
  target.value = { ...cycle.next.date }
  message.value = `Отсчёт установлен: ${cycle.event.name}, ${calendarDateLabel(cycle.next.date)}.`
}
function cycleIsTarget(cycle) {
  return cycle.next && chronologyDifference(target.value, cycle.next.date, durations.value) === 0
}
const absoluteTime = computed(() => minutesFromPurusha(date.value, durations.value))
const remaining = computed(() => chronologyDifference(date.value, target.value, durations.value))
const campaignTime = computed(() => chronologyDifference(baseline.value, date.value, durations.value))
const yearKey = computed(() => `${date.value.era}:${date.value.year}`)
const yearSign = computed({
  get: () => yearNames.value[yearKey.value]?.sign || '',
  set: sign => { yearNames.value[yearKey.value] = { ...yearNames.value[yearKey.value], sign } },
})
const customSign = computed({
  get: () => yearNames.value[yearKey.value]?.custom || '',
  set: custom => { yearNames.value[yearKey.value] = { ...yearNames.value[yearKey.value], custom: custom.slice(0, 120) } },
})
const chosenSign = computed(() => signs.find(sign => sign.id === yearSign.value))
const suggestedYear = computed(() => workingYearName(date.value.year - 1))
const selectedYearName = computed(() => chosenSign.value?.name || (yearSign.value === 'custom' && customSign.value.trim()) || suggestedYear.value?.name || '')
const yearNameIsSuggested = computed(() => !chosenSign.value && !(yearSign.value === 'custom' && customSign.value.trim()))
const selectedDateText = computed(() => [eras[date.value.era].title, `год ${date.value.year} — ${selectedYearName.value}`, `месяц ${months[date.value.month].name}`, `день ${date.value.day}`, ...currentEvents.value.map(event => `${event.symbol} ${event.name}`)].join(' · '))
const copyDateMessage = ref('')
watch(selectedDateText, () => { copyDateMessage.value = '' })
async function copySelectedDate() {
  try { await navigator.clipboard.writeText(selectedDateText.value); copyDateMessage.value = 'Дата скопирована' }
  catch { copyDateMessage.value = 'Не удалось скопировать автоматически. Можно выделить дату ниже.' }
}

const rows = Array.from({ length: 26 }, (_, i) => i + 1)
const monthSlots = [...rows, null, null]
const cells = months.map((month, index) => rows.map(day => calendarCell(index, day)))
const eventDates = event => event.dates.map(([month, day]) => `${day} ${months[month].name}`).join(' · ')

function readQuery() {
  const candidate = { era: route.query.era ? eras.findIndex(era => era.id === route.query.era) : 0, year: Number(route.query.year), month: months.findIndex(month => month.id === route.query.month), day: Number(route.query.day), hour: Number(route.query.hour || 0), minute: Number(route.query.minute || 0) }
  if (validChronologyDate(candidate, durations.value)) date.value = candidate
}
onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || localStorage.getItem('enoa-calendar-v1') || 'null')
    if (validEraDurations(saved?.durations)) durations.value = saved.durations
    const migrated = saved?.date ? { ...initialChronologyDate(), ...saved.date } : null
    if (validChronologyDate(migrated, durations.value)) date.value = migrated
    if (validChronologyDate(saved?.target, durations.value)) target.value = saved.target
    if (validChronologyDate(saved?.baseline, durations.value)) baseline.value = saved.baseline
    if (saved?.yearNames && typeof saved.yearNames === 'object' && !Array.isArray(saved.yearNames)) {
      for (const [key, value] of Object.entries(saved.yearNames)) {
        if (/^[0-6]:[1-9][0-9]{0,6}$/.test(key) && value && (signs.some(sign => sign.id === value.sign) || value.sign === 'custom' || value.sign === '')) {
          yearNames.value[key] = { sign: value.sign, custom: typeof value.custom === 'string' && !['красный варан'].includes(value.custom.trim().toLowerCase()) ? value.custom.slice(0, 120) : '' }
        }
      }
    }
    if (typeof saved?.note === 'string') note.value = saved.note.slice(0, 4000)
  } catch { storageMessage.value = 'Сохранение в браузере недоступно. Можно сохранить дату ссылкой.' }
  durationDrafts.value = durations.value.map(value => value == null ? '' : String(value))
  readQuery()
  ready.value = true
})
watch(() => [route.query.era, route.query.year, route.query.month, route.query.day, route.query.hour, route.query.minute], readQuery)
watch([date, note, durations, yearNames, target, baseline], () => {
  if (!ready.value) return
  try {
    localStorage.setItem(storageKey, JSON.stringify({ date: date.value, note: note.value, durations: durations.value, yearNames: yearNames.value, target: target.value, baseline: baseline.value }))
    storageMessage.value = 'Календарь, знаки годов и отсчёты сохранены в этом браузере.'
  } catch { storageMessage.value = 'Сохранение в браузере недоступно. Можно сохранить дату ссылкой.' }
}, { deep: true })

function updateDate(candidate) {
  if (validChronologyDate(candidate, durations.value)) { date.value = candidate; message.value = '' }
  else message.value = 'Дата должна попадать в выбранную эпоху. Год: 1–1 000 000; часы: 0–23; минуты: 0–59.'
}
function choose(month, day) { updateDate({ ...date.value, month, day: Math.min(day, months[month].days) }) }
function setYear(value) { updateDate({ ...date.value, year: Number(value) }) }
function setDay(value) { updateDate({ ...date.value, day: Number(value) }) }
function setTime(value) {
  const [hour, minute] = value.split(':').map(Number)
  updateDate({ ...date.value, hour, minute })
}
function selectEra(era) { if (era !== date.value.era) updateDate(initialChronologyDate(era)) }
function advance(amount, unit = 'days') {
  const factor = { days: MINUTES_PER_DAY, hours: 60, minutes: 1 }[unit]
  if (!Number.isSafeInteger(amount)) { message.value = 'Укажите целое число для перемотки.'; return }
  const result = shiftChronologyDate(date.value, amount * factor, durations.value)
  if (result.date) { date.value = result.date; message.value = '' }
  else message.value = result.error
}
function setDuration(index, value) {
  const days = value.trim() === '' ? null : Number(value)
  const candidate = [...durations.value]
  candidate[index] = days
  if (!validEraDurations(candidate)) { message.value = `Длительность должна быть целым числом от 1 до ${MAX_ERA_DAYS} дней. Пустое поле — длительность неизвестна.`; return }
  if (!validChronologyDate(date.value, candidate)) { message.value = 'Текущая дата окажется за концом эпохи. Сначала выберите более раннюю дату.'; return }
  durations.value = candidate
  durationDrafts.value[index] = days == null ? '' : String(days)
  message.value = ''
}
function targetMonth(month) { target.value = { ...target.value, month, day: Math.min(target.value.day, months[month].days) } }
function targetTime(value) { const [hour, minute] = value.split(':').map(Number); target.value = { ...target.value, hour, minute } }
async function share() {
  const query = { era: eras[date.value.era].id, year: String(date.value.year), month: months[date.value.month].id, day: String(date.value.day), hour: String(date.value.hour), minute: String(date.value.minute) }
  await navigateTo({ path: '/lore/calendar', query })
  try { await navigator.clipboard.writeText(window.location.href); message.value = 'Ссылка на дату скопирована.' }
  catch { message.value = 'Дата записана в адрес страницы — скопируйте ссылку из адресной строки.' }
}
function cellLabel(month, day) {
  const cell = cells[month][day - 1]
  if (cell.kind === 'eaten') return `${day} ${months[month].name}: дата сожрана Зверем`
  if (cell.kind === 'absent') return `${day} ${months[month].name}: нет такого дня в месяце`
  return `${day} ${months[month].name}${cell.events.length ? ': ' + cell.events.map(event => event.name).join(', ') : ': обычный день'}${upcomingCells.value.has(`${month}:${day}`) ? '; ближайший особый день этого типа' : ''}`
}
useHead({ title: 'Календарь Эноа · Lore', meta: [{ name: 'description', content: 'Восемь месяцев Эноа, праздники и сожранные дни Зверя. Интерактивный календарь и счётчик времени для игровой кампании.' }] })
</script>

<template>
  <LoreThreadPage class="calendar-page" :theme="theme" title="Календарь" eyebrow="Мир Эноа · Нить времени" icon="/assets/nodes/calendar-lore.svg?v=2" @up="$emit('up')">

    <section class="lore-thread-section calendar-section" aria-label="Календарь по месяцам">
      <div class="selected-date-panel">
        <div :key="selectedDateText" class="selected-date-story" aria-live="polite" aria-atomic="true">
          <div class="selected-date-part selected-date-era"><span>Эпоха</span><strong>{{ eras[date.era].title }}</strong></div>
          <div class="selected-date-part selected-date-year"><span>Год {{ date.year }}</span><strong>{{ selectedYearName }}</strong><small v-if="yearNameIsSuggested" title="Предложенное имя для этого номера года. Привязка эпохи к кругу после Раскола неизвестна; это не историческое соответствие.">Предложенное имя</small></div>
          <div class="selected-date-part"><span>Месяц</span><strong>{{ months[date.month].name }}</strong></div>
          <div class="selected-date-part selected-date-day"><span>День</span><strong>{{ date.day }}</strong></div>
          <div class="selected-date-holidays"><span v-for="event in currentEvents" :key="event.id" :class="['selected-holiday', event.id]">{{ event.symbol }} {{ event.name }}</span><span v-if="!currentEvents.length" class="selected-ordinary">Обычный день</span></div>
        </div>
        <button type="button" class="copy-date-button" aria-label="Скопировать полную дату" title="Скопировать дату для заметки или истории" @click="copySelectedDate"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3"/></svg></button>
        <div class="selected-date-actions">
          <button type="button" class="generate-date-button" @click="generateDate">◇ Бросить 4d4</button>
          <button type="button" class="specify-date-button" :aria-expanded="showFilters" aria-controls="calendar-filters" @click="toggleDateSettings"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h18l-7 8v7l-4 2v-9Z"/></svg>Указать дату</button>
        </div>
        <p v-if="copyDateMessage" class="copy-date-status" role="status">{{ copyDateMessage }}</p>
      </div>
      <div v-if="showFilters" id="calendar-filters" class="calendar-filter-panel">
        <h3>Указать дату</h3>
        <form @submit.prevent="applyManualDate">
      <div class="calendar-toolbar manual-date-toolbar" role="region" aria-label="Параметры календаря">
        <label class="calendar-control calendar-control-era"><span class="calendar-control-heading"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10M7 21h10M8 3v4l4 5-4 5v4m8-18v4l-4 5 4 5v4" /></svg>Эпоха</span><select v-model.number="dateDraft.era"><option v-for="(era, index) in eras" :key="era.id" :value="index">{{ era.title }}</option></select></label>
        <label class="calendar-control calendar-control-year"><span class="calendar-control-heading"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 3-2 18m10-18-2 18M3 9h18M3 15h18" /></svg>Год</span><input type="number" min="1" :max="MAX_CALENDAR_YEAR" step="1" v-model.number="dateDraft.year"></label>
        <label class="calendar-control"><span class="calendar-control-heading"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18" /></svg>Месяц</span><select v-model.number="dateDraft.month" @change="dateDraft.day=Math.min(dateDraft.day,months[dateDraft.month].days)"><option v-for="(month, index) in months" :key="month.id" :value="index">{{ month.name }}</option></select></label>
        <label class="calendar-control calendar-control-day"><span class="calendar-control-heading"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 9 9-9 9-9-9Z"/><circle cx="12" cy="12" r="2"/></svg>День</span><input type="number" min="1" :max="months[dateDraft.month].days" step="1" v-model.number="dateDraft.day"></label>
        <label class="calendar-control calendar-control-events"><span class="calendar-control-heading"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9Z"/></svg>Отметки</span><select v-model="filter"><option value="all">Все события</option><option v-for="event in holidays" :key="event.id" :value="event.id">{{ event.symbol }} {{ event.name }}</option><option value="eaten">■ Сожранные дни</option></select></label>
      </div>
        <p v-if="manualDateError" class="hint" role="alert">{{ manualDateError }}</p>
        <button type="submit" class="apply-date-button">Применить дату</button>
        </form>
        <details class="generation-settings"><summary>Условия случайной генерации</summary>
        <div class="generation-fields">
          <label>Эпоха<select v-model="generation.era"><option value="any">Любая эпоха</option><option v-for="(era,index) in eras" :key="era.id" :value="index">{{ era.title }}</option></select></label>
          <label>Год от<input v-model.number="generation.yearMin" type="number" min="1" :max="MAX_CALENDAR_YEAR" step="1"></label>
          <label>Год до<input v-model.number="generation.yearMax" type="number" min="1" :max="MAX_CALENDAR_YEAR" step="1"></label>
          <label>Месяц<select v-model="generation.month"><option value="any">Любой месяц</option><option v-for="(month,index) in months" :key="month.id" :value="index">{{ month.name }}</option></select></label>
          <label>День<select v-model="generation.day"><option value="any">Любой день</option><option v-for="day in 26" :key="day" :value="day">{{ day }}</option></select></label>
          <label>Событие<select v-model="generation.event"><option value="any">Любой день и праздник</option><option value="ordinary">Обычный день</option><option v-for="event in holidays" :key="event.id" :value="event.id">{{ event.symbol }} {{ event.name }}</option></select></label>
        </div>
        <p class="hint">Одинаковые границы года закрепляют год. Неизвестные длительности эпох не ограничивают генерацию; заданные длительности учитываются. Несуществующие и сожранные дни не выпадают.</p>
        <button type="button" class="generation-reset" @click="resetGeneration">Сбросить условия</button>
        </details>
      </div>
      <p v-if="generationStatus" class="hint" role="alert">{{ generationStatus }}</p>
      <p v-if="message" class="hint" role="status">{{ message }}</p>
      <ul class="legend" aria-label="Легенда календаря"><li v-for="event in holidays" :key="event.id"><span :class="['symbol', event.id]">{{ event.symbol }}</span> {{ event.name }}</li><li>■ Сожранный день</li><li>— Нет такого дня в месяце</li></ul>
      <p class="hint">«—» означает, что у месяца нет такого числа; «■» — дата, сожранная Зверем: особый отсутствующий день. 23 Залар объединяет День Молчания и День Тьмы. Семь колонок — способ размещения дней; длина недели Эноа пока не определена.</p>
      <div class="month-grid">
        <article v-for="(month, index) in months" :key="month.id" class="month-card" :class="{ 'month-card-current': date.month === index }" :aria-labelledby="'month-title-' + month.id">
          <header><h3 :id="'month-title-' + month.id">{{ month.name }}</h3><span>{{ month.days }} дней</span></header>
          <div class="month-days" :aria-label="'Дни месяца ' + month.name">
            <template v-for="(day, slot) in monthSlots" :key="slot">
              <span v-if="day === null" class="month-padding" aria-hidden="true" />
              <button v-else-if="cells[index][day-1].kind === 'day'" type="button" class="month-day" :class="{ 'is-selected': date.month === index && date.day === day, 'is-upcoming': upcomingCells.has(`${index}:${day}`), 'is-special': cells[index][day-1].events.length, 'is-muted': filter !== 'all' && !cells[index][day-1].events.some(event => event.id === filter) }" :aria-label="cellLabel(index, day)" :aria-pressed="date.month === index && date.day === day" :title="cellLabel(index, day)" @click="choose(index, day)"><span class="month-day-number">{{ day }}</span><span class="month-day-events" aria-hidden="true"><span v-for="event in cells[index][day-1].events" :key="event.id" :class="event.id">{{ event.symbol }}</span></span></button>
              <span v-else class="month-day month-day-missing" :class="{ 'is-eaten': cells[index][day-1].kind === 'eaten', 'is-muted': filter !== 'all' && !(filter === 'eaten' && cells[index][day-1].kind === 'eaten') }" :aria-label="cellLabel(index, day)" :title="cellLabel(index, day)"><span class="month-day-number">{{ day }}</span><span class="month-day-events" aria-hidden="true">{{ cells[index][day-1].kind === 'eaten' ? '■' : '—' }}</span></span>
            </template>
          </div>
          <p v-if="date.month === index" class="month-selection">Выбрано: {{ date.day }} {{ month.name }}</p>
        </article>
      </div>
    </section>

    <section class="lore-thread-section celestial-cycles" aria-labelledby="cycles-title">
      <p class="eyebrow">Шамас · Ману · Эри</p><h2 id="cycles-title">Особые даты</h2>
      <p class="hint">Каждый отсчёт идёт от вашей текущей даты до следующего отмеченного дня: солнечного, лунного или праздничного. Сегодняшнее событие показано отдельно. Расчёт использует известные даты календаря; фазы и положения светил между ними пока не заданы.</p>
      <div class="cycle-grid" aria-live="polite">
        <article v-for="cycle in eventCycles" :key="cycle.event.id" :class="['cycle-card', { 'cycle-today': cycle.today }]">
          <header><h3><span :class="cycle.event.id" aria-hidden="true">{{ cycle.event.symbol }}</span> {{ cycle.event.name }}</h3><span v-if="cycle.today" class="today-tag">Сегодня</span></header>
          <template v-if="cycle.next">
            <p class="cycle-distance">Через <strong>{{ cycle.next.days }}</strong> дн.</p>
            <p class="cycle-date">{{ calendarDateLabel(cycle.next.date) }}<small v-if="cycle.next.date.era !== date.era">{{ eras[cycle.next.date.era].title }}</small></p>
            <p class="cycle-exact">До начала дня: {{ elapsedTimeLabel(cycle.remainingMinutes) }}</p>
            <div v-if="cycle.progress !== null" class="cycle-interval"><progress :value="cycle.progress" max="100" :aria-label="'Интервал между отмеченными днями: ' + cycle.event.name" /><span>Между этими датами: {{ cycle.spanDays }} дн.</span></div>
            <p v-if="cycle.next.events.length > 1" class="cycle-conjunction">Совпадает: {{ cycle.next.events.filter(event => event.id !== cycle.event.id).map(event => `${event.symbol} ${event.name}`).join(' · ') }}</p>
            <div class="cycle-actions"><button type="button" :aria-label="'Перейти к событию: ' + cycle.event.name" @click="updateDate({ ...cycle.next.date })">К дате →</button></div>

          </template>
          <p v-else class="hint">Следующая дата находится за пределами доступного отсчёта.</p>
        </article>
      </div>
      <p class="hint">«К дате» выбирает этот день в календаре. Сожранные даты пропускаются. Ближайшие особые дни текущего года отмечены в таблице точкой.</p>
    </section>

    <YearNamingWorkshop :year="date.year" :era="eras[date.era].title" :year-name="selectedYearName" />


    <section class="lore-thread-section day-threads" aria-labelledby="day-threads-title">
      <p class="eyebrow">Особые дни</p><h2 id="day-threads-title">Нити о днях</h2>
      <div class="day-thread-grid">
        <article v-for="event in holidays" :key="event.id" class="day-thread-card" :class="{ 'day-thread-today': currentEvents.some(mark=>mark.id===event.id) }">
          <header><h3><span :class="event.id" aria-hidden="true">{{ event.symbol }}</span> {{ event.name }}</h3><span v-if="currentEvents.some(mark=>mark.id===event.id)" class="today-tag">В выбранную дату</span></header>
          <p class="day-thread-dates">{{ eventDates(event) }}</p>
        </article>
        <article class="day-thread-card"><h3>■ Сожранные Дни Зверя</h3><p class="day-thread-dates">26 Шамды · 25–26 Манар · 24–26 Чокас · 24–26 Залар</p></article>
      </div>
    </section>
  </LoreThreadPage>
</template>

<style scoped>
.calendar-page{--line:rgba(var(--theme-accent-rgb),.22)}
.calendar-page :deep(.lore-thread-canvas){width:min(1320px,100%)}
.calendar-page :deep(.lore-thread-intro){min-height:220px}
section{margin-bottom:46px}h2{margin:0 0 18px;font:600 34px/1.1 'Cormorant Garamond',serif;color:rgb(var(--theme-heading-rgb))}.eyebrow{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--theme-accent);margin:0 0 12px}.section-heading{display:flex;align-items:center;justify-content:space-between;gap:20px}.year-count{font:italic 24px 'Cormorant Garamond',serif;color:var(--theme-accent)}.tracker{border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:26px 0}.date-display{font:500 40px 'Cormorant Garamond',serif;margin:4px 0 22px;color:rgb(var(--theme-heading-rgb))}.date-fields{display:flex;gap:16px;flex-wrap:wrap}label{display:grid;gap:7px;font-size:11px;color:rgba(var(--theme-text-rgb),.8)}input,select,textarea{background:var(--theme-surface);border:1px solid var(--line);border-radius:4px;padding:10px 12px;color:rgb(var(--theme-text-rgb));font:13px 'Hanken Grotesk',sans-serif;max-width:100%}.date-fields input{width:100px}.today-events{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0;font-size:13px}.actions{display:flex;align-items:center;gap:9px;flex-wrap:wrap}button{cursor:pointer}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,.table-scroll:focus-visible{outline:2px solid var(--theme-accent-strong);outline-offset:3px}.actions button,.next-event button{border:1px solid var(--line);border-radius:4px;padding:10px 12px;background:transparent;color:var(--theme-accent-strong);font-size:12px}.actions button:hover,.next-event button:hover{background:rgba(var(--theme-accent-rgb),.12)}.offset-label{display:flex;align-items:center;gap:8px}.offset-label input{width:90px}.next-event{display:grid;gap:9px;margin:24px 0;padding-left:16px;border-left:2px solid var(--theme-accent)}.next-event>span{font-size:10px;color:rgba(var(--theme-text-rgb),.65)}.next-event strong{font-size:14px;font-weight:500}.next-event button{width:fit-content}.note-label{margin-top:20px;max-width:680px}textarea{resize:vertical;width:100%}.hint{font-size:11px;line-height:1.7;color:rgba(var(--theme-text-rgb),.65);margin:14px 0}.table-scroll{overflow-x:auto;border:1px solid var(--line);border-radius:4px}table{width:100%;min-width:660px;border-collapse:collapse;text-align:center;font-size:13px}thead th{padding:14px 5px;color:var(--theme-accent-strong);background:var(--theme-surface);font:600 20px 'Cormorant Garamond',serif}thead small{display:block;font:10px 'Hanken Grotesk',sans-serif;margin-top:5px;color:rgba(var(--theme-text-rgb),.6)}th,td{border-bottom:1px solid var(--line);border-right:1px solid var(--line)}tbody th{width:48px;font-weight:400;color:var(--theme-accent-strong);background:var(--theme-surface);position:sticky;left:0;z-index:1}tbody tr:nth-child(even){background:rgba(var(--theme-accent-rgb),.035)}td button{display:flex;align-items:center;justify-content:center;gap:4px;width:100%;min-height:38px;background:transparent;border:0;color:inherit;font-size:13px}td button:hover{background:rgba(var(--theme-accent-rgb),.13)}td.selected{background:rgba(var(--theme-accent-rgb),.2);box-shadow:inset 0 0 0 1px var(--theme-accent-strong)}td.muted{opacity:.32}.missing{display:block;padding:8px;color:rgba(var(--theme-text-rgb),.4)}.eaten{background:repeating-linear-gradient(135deg,transparent 0 5px,rgba(var(--theme-accent-rgb),.04) 5px 6px)}.eaten .missing{color:var(--theme-accent-strong)}.symbol{font-size:16px}.shamas{color:#f0c461}.manu{color:#a2cafa}.eri{color:#ff8795}.silence{color:#e0ba81}.darkness{filter:drop-shadow(0 0 1px #d6aa60)}.legend{list-style:none;padding:0;margin:20px 0;display:flex;gap:12px 22px;flex-wrap:wrap;font-size:12px}.holiday-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 30px}.holiday-grid article{padding:17px 0;border-top:1px solid var(--line)}h3{font:600 23px 'Cormorant Garamond',serif;margin:0 0 10px;color:rgb(var(--theme-heading-rgb))}.holiday-grid p{font-size:12px;line-height:1.9;margin:0;color:rgba(var(--theme-text-rgb),.75)}
@media(max-width:760px){.calendar-page :deep(.lore-thread-body){padding-left:0}.calendar-page :deep(.lore-thread-section::before),.calendar-page :deep(.lore-thread-section::after){display:none}.calendar-page :deep(.lore-thread-axis){opacity:.25}.section-heading{align-items:flex-start;flex-wrap:wrap;gap:10px}.date-display{font-size:32px}.holiday-grid{grid-template-columns:1fr}h2{font-size:29px}.date-fields{gap:10px}.section-heading select{width:100%}.table-scroll{max-width:100%}}
.current-era{font-size:11px;text-transform:uppercase;letter-spacing:.13em;color:var(--theme-accent);margin:0 0 8px}.date-display small{font:18px 'Hanken Grotesk',sans-serif;color:var(--theme-accent-strong);white-space:nowrap}.sign-display{margin:-12px 0 22px;font:italic 24px 'Cormorant Garamond',serif;color:var(--theme-accent-strong)}.sign-fields{display:flex;flex-wrap:wrap;gap:16px;margin-top:18px}.era-line{list-style:none;padding:0;margin:22px 0;display:flex;flex-wrap:wrap;gap:8px}.era-line button,.campaign-counter button{padding:10px 13px;border:1px solid var(--line);border-radius:4px;background:transparent;color:rgb(var(--theme-text-rgb));font-size:12px;cursor:pointer}.era-line button span{color:var(--theme-accent);margin-right:8px}.era-line .active button{border-color:var(--theme-accent-strong);background:rgba(var(--theme-accent-rgb),.1)}.chronology>p,.campaign-counter p{font-size:12px;line-height:1.8}.chronology a,.year-signs a{display:inline-block;color:var(--theme-accent-strong);font-size:11px;margin-top:12px}.time-totals{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:24px 0}.time-totals article{border-top:1px solid var(--line);padding-top:18px}.time-totals span,.countdown-result>span{display:block;font-size:11px;color:rgba(var(--theme-text-rgb),.65);margin-bottom:12px}.time-totals strong,.countdown-result strong{font:500 29px 'Cormorant Garamond',serif;color:var(--theme-accent-strong)}.time-totals p{font-size:12px;line-height:1.7}.era-settings{padding:18px 0;border-block:1px solid var(--line)}summary{cursor:pointer;color:var(--theme-accent-strong);font-size:13px}.duration-field{display:grid;gap:8px}.duration-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;padding:15px 0}.duration-grid button{padding:8px 12px;border:1px solid var(--line);border-radius:4px;background:transparent;color:var(--theme-accent-strong);font-size:11px;cursor:pointer}.duration-grid button{padding:8px 12px;border:1px solid var(--line);border-radius:4px;background:transparent;color:var(--theme-accent-strong);font-size:11px;cursor:pointer}.duration-grid small{font-size:10px;color:rgba(var(--theme-text-rgb),.6)}.countdown-result{margin:24px 0;border-left:2px solid var(--theme-accent);padding:8px 18px}.campaign-counter{padding-top:20px;border-top:1px solid var(--line);font-size:13px}.year-signs article>small{display:block;font-size:9px;color:var(--theme-accent);margin-bottom:8px;text-transform:uppercase;letter-spacing:.13em}.date-fields{row-gap:18px}.countdown .date-fields input[type=number]{width:100px}.offset-label select{max-width:110px}.chronology a:focus-visible,.year-signs a:focus-visible,summary:focus-visible{outline:2px solid var(--theme-accent-strong);outline-offset:3px}@media(max-width:760px){.time-totals,.duration-grid{grid-template-columns:1fr}.date-fields select{max-width:100%}.date-fields label{max-width:100%}.era-line button{font-size:11px}.date-display{display:flex;gap:12px;align-items:baseline;flex-wrap:wrap}}

.cycle-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:24px}.cycle-card{padding:20px;border:1px solid var(--line);border-radius:6px;background:rgba(var(--theme-surface-rgb),.4);display:flex;flex-direction:column;gap:10px}.cycle-card header{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}.cycle-card h3{font-size:24px;margin:0}.cycle-today{border-color:var(--theme-accent-strong)}.today-tag{font-size:9px;color:var(--theme-accent-strong);border:1px solid var(--line);padding:4px 6px;border-radius:3px;white-space:nowrap}.cycle-distance{font-size:12px;margin:3px 0;color:rgba(var(--theme-text-rgb),.8)}.cycle-distance strong{font:500 46px/1 'Cormorant Garamond',serif;color:var(--theme-accent-strong);margin:0 5px}.cycle-date{margin:0;font-size:12px;color:rgb(var(--theme-text-rgb))}.cycle-date small{display:block;margin-top:6px;color:var(--theme-accent)}.cycle-exact,.cycle-conjunction,.cycle-active{font-size:11px;line-height:1.6;margin:0;color:rgba(var(--theme-text-rgb),.7)}.cycle-interval{margin:3px 0}.cycle-interval progress{display:block;width:100%;height:4px;border:0;border-radius:2px;overflow:hidden;accent-color:var(--theme-accent);background:rgba(var(--theme-accent-rgb),.1)}.cycle-interval progress::-webkit-progress-bar{background:rgba(var(--theme-accent-rgb),.1)}.cycle-interval progress::-webkit-progress-value{background:var(--theme-accent)}.cycle-interval span{display:block;font-size:9px;line-height:1.6;color:rgba(var(--theme-text-rgb),.6);margin-top:8px}.cycle-conjunction{color:var(--theme-accent-strong)}.cycle-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:8px}.cycle-actions button{background:transparent;border:1px solid var(--line);border-radius:4px;padding:8px 10px;color:var(--theme-accent-strong);font-size:11px}.cycle-actions button:hover{background:rgba(var(--theme-accent-rgb),.12)}.cycle-active{color:var(--theme-accent-strong)}td.upcoming button{position:relative}td.upcoming button::after{content:'';position:absolute;bottom:3px;left:50%;width:3px;height:3px;border-radius:50%;background:var(--theme-accent-strong);transform:translateX(-50%)}@media(max-width:1050px){.cycle-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:760px){.cycle-grid{grid-template-columns:1fr}.cycle-card{padding:18px}.cycle-distance strong{font-size:38px}}

.calendar-year-nav{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:22px 0}.calendar-year-nav span{font-size:12px;text-align:center;color:var(--theme-accent-strong)}.calendar-year-nav button{padding:9px 13px;border:1px solid var(--line);border-radius:4px;background:transparent;color:var(--theme-accent-strong);font-size:12px;white-space:nowrap}.calendar-year-nav button:disabled{opacity:.4;cursor:default}.month-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.month-card{border:1px solid var(--line);border-radius:6px;padding:18px;background:rgba(var(--theme-surface-rgb),.45)}.month-card-current{border-color:rgba(var(--theme-accent-strong-rgb),.65)}.month-card header{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:18px}.month-card h3{font-size:30px;margin:0}.month-card header>span{font-size:11px;color:rgba(var(--theme-text-rgb),.6)}.month-days{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:5px}.month-day{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:54px;border:1px solid rgba(var(--theme-accent-rgb),.12);border-radius:4px;padding:5px 2px;background:rgba(var(--theme-surface-rgb),.3);color:rgb(var(--theme-text-rgb));line-height:1}.month-day-number{font-size:14px}.month-day-events{display:flex;justify-content:center;gap:2px;min-height:16px;font-size:13px}.month-day.is-special{background:rgba(var(--theme-accent-rgb),.07)}button.month-day:hover{background:rgba(var(--theme-accent-rgb),.17);border-color:var(--theme-accent)}.month-day.is-selected{border-color:var(--theme-accent-strong);background:rgba(var(--theme-accent-rgb),.2);box-shadow:0 0 0 1px var(--theme-accent-strong)}.month-day.is-upcoming::after{content:'';position:absolute;bottom:3px;left:50%;width:3px;height:3px;border-radius:50%;background:var(--theme-accent-strong);transform:translateX(-50%)}.month-day.is-muted{opacity:.35}.month-day-missing{color:rgba(var(--theme-text-rgb),.4)}.month-day-missing.is-eaten{background:repeating-linear-gradient(135deg,transparent 0 5px,rgba(var(--theme-accent-rgb),.05) 5px 6px);color:var(--theme-accent-strong)}.month-day-missing .month-day-number{text-decoration:line-through;font-size:11px;opacity:.65}.month-selection{font-size:10px;color:var(--theme-accent-strong);margin:14px 0 0}@media(max-width:1000px){.month-card{padding:12px}.month-days{gap:4px}.month-day{min-height:50px}}@media(max-width:760px){.month-grid{grid-template-columns:1fr;gap:18px}.month-card{padding:16px}.calendar-year-nav{gap:8px}.calendar-year-nav span{font-size:11px}.month-day{min-height:52px}.month-card h3{font-size:28px}}
.calendar-selection{font-size:12px;line-height:1.7;color:var(--theme-accent-strong);margin:0 0 20px}

.calendar-page :deep(.lore-thread-intro){min-height:140px;padding-bottom:28px}.calendar-page :deep(.lore-thread-note){display:none}.calendar-toolbar{display:grid;grid-template-columns:minmax(190px,1.5fr) minmax(88px,.6fr) minmax(125px,1fr) minmax(70px,.5fr) minmax(160px,1.2fr);gap:14px;padding:18px;margin:0 0 18px;border:1px solid var(--line);border-radius:6px;background:rgba(var(--theme-surface-rgb),.5)}.calendar-control{min-width:0;gap:9px}.calendar-control-heading{display:flex;align-items:center;gap:8px;color:var(--theme-accent-strong);font-size:10px;letter-spacing:.04em}.calendar-control-heading svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}.calendar-control input,.calendar-control select{width:100%;min-width:0;padding:10px;font-size:12px}.calendar-selection{margin:0 0 20px}@media(max-width:1100px){.calendar-toolbar{grid-template-columns:repeat(4,minmax(0,1fr))}.calendar-control-era{grid-column:span 2}.calendar-control-events{grid-column:span 2}}@media(max-width:760px){.calendar-page :deep(.lore-thread-intro){min-height:110px;padding-bottom:22px}.calendar-toolbar{grid-template-columns:repeat(2,minmax(0,1fr));padding:14px;gap:14px}.calendar-control-era{grid-column:1 / -1}.calendar-control-events{grid-column:1 / -1}}

.selected-date-panel{position:relative;margin:0 0 24px;padding:22px 48px 20px 22px;border-block:1px solid var(--line);background:linear-gradient(110deg,rgba(var(--theme-accent-rgb),.065),transparent 80%)}.selected-date-story{display:grid;grid-template-columns:minmax(160px,1.3fr) minmax(200px,1.8fr) minmax(85px,.7fr) minmax(40px,.4fr);gap:20px;align-items:start;animation:date-story-appear .25s ease-out}.selected-date-part>span{display:block;margin-bottom:7px;color:rgba(var(--theme-text-rgb),.6);font-size:9px;letter-spacing:.12em;text-transform:uppercase}.selected-date-part strong{font:500 26px/1.15 'Cormorant Garamond',serif;color:rgb(var(--theme-heading-rgb))}.selected-date-year strong{color:var(--theme-accent-strong)}.selected-date-part small{display:block;margin-top:7px;color:rgba(var(--theme-text-rgb),.45);font-size:9px}.selected-date-day strong{font-size:35px;line-height:1}.selected-date-holidays{grid-column:1 / -1;display:flex;flex-wrap:wrap;gap:10px}.selected-holiday{padding:6px 10px;border:1px solid var(--line);border-radius:3px;font-size:12px;background:rgba(var(--theme-accent-rgb),.04)}.selected-ordinary{font-size:11px;color:rgba(var(--theme-text-rgb),.5)}.copy-date-button{position:absolute;right:12px;top:18px;display:grid;place-items:center;width:32px;height:32px;border:1px solid var(--line);border-radius:4px;background:transparent;color:var(--theme-accent-strong)}.copy-date-button svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.4;stroke-linejoin:round}.copy-date-button:hover{background:rgba(var(--theme-accent-rgb),.1)}.copy-date-status{margin:12px 0 0;font-size:10px;color:var(--theme-accent-strong)}@keyframes date-story-appear{from{opacity:.55;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}@media(max-width:1100px){.selected-date-story{grid-template-columns:1fr 1fr;gap:18px}.selected-date-part strong{font-size:25px}}@media(max-width:760px){.selected-date-panel{padding:18px 44px 18px 16px}.selected-date-story{gap:18px 14px}.selected-date-part strong{font-size:23px}.selected-date-year strong{overflow-wrap:anywhere}.selected-date-day strong{font-size:30px}}@media(prefers-reduced-motion:reduce){.selected-date-story{animation:none}}
.selected-date-actions{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-top:22px}.generate-date-button,.specify-date-button,.generation-reset{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid var(--line);border-radius:4px;padding:12px 16px;background:rgba(var(--theme-accent-rgb),.1);color:var(--theme-accent-strong);cursor:pointer}.specify-date-button{background:transparent}.specify-date-button svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linejoin:round}.generate-date-button:hover,.specify-date-button:hover{background:rgba(var(--theme-accent-rgb),.18)}.calendar-filter-panel{border:1px solid var(--line);border-radius:6px;padding:22px;margin-bottom:20px}.calendar-filter-panel h3{margin:0 0 16px;font-size:25px}.generation-fields{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.generation-fields label{min-width:0}.generation-fields input,.generation-fields select{width:100%;min-width:0}.generation-reset{margin:0 0 26px}.manual-date-toolbar{margin-bottom:0}@media(max-width:760px){.generation-fields{grid-template-columns:repeat(2,minmax(0,1fr))}.calendar-filter-panel{padding:16px}.selected-date-actions{gap:10px}.generate-date-button,.specify-date-button{padding:11px 13px;font-size:12px}}
.apply-date-button{margin-top:18px;padding:12px 18px;border:1px solid var(--theme-accent-strong);border-radius:4px;background:rgba(var(--theme-accent-rgb),.16);color:var(--theme-accent-strong);cursor:pointer}.generation-settings{margin-top:26px;padding-top:20px;border-top:1px solid var(--line)}.generation-settings summary{margin-bottom:18px}.generation-settings .generation-reset{margin-bottom:0}
.calendar-reference{margin:22px 0;padding:16px 0;border-block:1px solid var(--line)}.calendar-reference>summary{font-size:13px}.calendar-reference>section{margin-top:24px}
.day-thread-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:24px}.day-thread-card{padding:22px;border:1px solid var(--line);border-radius:6px;background:rgba(var(--theme-surface-rgb),.35);font-size:13px;line-height:1.85}.day-thread-card header{display:flex;align-items:start;justify-content:space-between;gap:12px}.day-thread-card h3{font-size:27px;margin:0}.day-thread-card h4{font:500 22px 'Cormorant Garamond',serif;color:var(--theme-accent-strong);margin:20px 0 10px}.day-thread-dates{font-size:10px;color:rgba(var(--theme-text-rgb),.6);margin:10px 0 0}.day-thread-card details{padding-top:16px;margin-top:18px;border-top:1px solid var(--line)}.day-thread-card summary{font-size:11px}.day-thread-card details p{font-size:12px}.day-thread-today{border-color:var(--theme-accent-strong)}.day-threads-note{margin-top:20px;font-size:10px}@media(max-width:760px){.day-thread-grid{grid-template-columns:1fr}.day-thread-card{padding:18px}.day-thread-card header{flex-wrap:wrap}}
</style>
