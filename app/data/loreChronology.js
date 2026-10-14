import { HISTORY_THREAD } from './loreHistory.js'
import { YEAR_LENGTH, CALENDAR_MONTHS, CALENDAR_EVENTS, validCalendarDate, dayOfYear, calendarCell } from './loreCalendar.js'

export const CALENDAR_ERAS = HISTORY_THREAD.sections.map(({ slug, title, summary }) => ({ id: slug, title, summary }))
export const YEAR_SIGNS = [
  { id: 'fire-bird', name: 'Огненная Птица', yearLabel: 'Огненной Птицы', source: 'Lore 0.31', context: 'Конец Эпохи Света и появление людей.', history: 'epoha-lyudey' },
  { id: 'azure-kash', name: 'Лазурный Каш', yearLabel: 'Лазурного Каша', source: 'Lore 0.31', context: 'Основание Братства Золотого Симурга.', history: 'epoha-lyudey' },
  { id: 'crystal-owl', name: 'Кристальная Сова', yearLabel: 'Кристальной Совы', source: 'Lore 0.31', context: 'Мел Озар казнит Драгмира.', history: 'epoha-lyudey' },
  { id: 'flying-beech', name: 'Летящий Бук', yearLabel: 'Летящего Бука', source: 'Lore 0.31', context: 'Священный поход против Дальних Чертогов. Название сохранено как в тексте.', history: 'epoha-lyudey' },
  { id: 'blue-sparrowhawk', name: 'Синий Перепелятник', yearLabel: 'Синего Перепелятника', source: 'Lore 0.31', context: 'Рождение героя во время Лета Трёх Солнц.', history: 'epoha-lyudey' },
  { id: 'lapis-bull', name: 'Лазуритовый Бык', yearLabel: 'Лазуритового Быка', source: 'Lore 0.31', context: '1240 П.Р.: первое собрание Высокого Круга. П.Р. — отдельный отсчёт после Раскола.', history: 'epoha-vosstanovleniya' },
  { id: 'ruby-frog', name: 'Рубиновая Лягушка', yearLabel: 'Рубиновой Лягушки', source: 'Lore 0.31', context: 'Видение Граару, через 50 лет после Объятия.', history: 'vremya-vetrov' },
  { id: 'azure-bull', name: 'Лазурный Бык', yearLabel: 'Лазурного Быка', source: 'Пример автора', context: 'Дополнительный знак из описания календаря.' },
  { id: 'red-monitor', name: 'Красный Варан', yearLabel: 'Красного Варана', source: 'Пример автора', context: 'Дополнительный знак из описания календаря.' },
]
export const MINUTES_PER_DAY = 1440
export const MAX_ERA_DAYS = 9999 * YEAR_LENGTH
export const initialChronologyDate = (era = 0) => ({ era, year: 1, month: 0, day: 1, hour: 0, minute: 0 })
export const emptyEraDurations = () => Array(CALENDAR_ERAS.length - 1).fill(null)
export const validEraDurations = durations => Array.isArray(durations) && durations.length === CALENDAR_ERAS.length - 1 && durations.every(days => days === null || (Number.isSafeInteger(days) && days > 0 && days <= MAX_ERA_DAYS))
export const eraDayIndex = date => (date.year - 1) * YEAR_LENGTH + dayOfYear(date) - 1
export function validChronologyDate(date, durations = emptyEraDurations()) {
  return validCalendarDate(date) && Number.isInteger(date.era) && date.era >= 0 && date.era < CALENDAR_ERAS.length
    && Number.isInteger(date.hour) && date.hour >= 0 && date.hour < 24
    && Number.isInteger(date.minute) && date.minute >= 0 && date.minute < 60
    && validEraDurations(durations) && (durations[date.era] == null || eraDayIndex(date) < durations[date.era])
}
function fromEraMinutes(era, minutes) {
  let days = Math.floor(minutes / MINUTES_PER_DAY)
  const year = Math.floor(days / YEAR_LENGTH) + 1
  days %= YEAR_LENGTH
  let month = 0
  while (days >= CALENDAR_MONTHS[month].days) days -= CALENDAR_MONTHS[month++].days
  return { era, year, month, day: days + 1, hour: Math.floor((minutes % MINUTES_PER_DAY) / 60), minute: minutes % 60 }
}
const eraMinutes = date => eraDayIndex(date) * MINUTES_PER_DAY + date.hour * 60 + date.minute

export function shiftChronologyDate(date, minutes, durations = emptyEraDurations()) {
  if (!validChronologyDate(date, durations) || !Number.isSafeInteger(minutes)) return { error: 'Укажите целое число времени и допустимую дату.' }
  let era = date.era
  let position = eraMinutes(date) + minutes
  if (!Number.isSafeInteger(position)) return { error: 'Слишком большой интервал времени.' }
  while (position < 0) {
    if (era === 0) return { error: 'Нельзя перейти раньше первого дня Жертвы Пуруша.' }
    if (durations[era - 1] == null) return { error: `Задайте длительность эпохи «${CALENDAR_ERAS[era - 1].title}», чтобы перейти в неё назад.` }
    position += durations[--era] * MINUTES_PER_DAY
  }
  while (durations[era] != null && position >= durations[era] * MINUTES_PER_DAY) {
    position -= durations[era++] * MINUTES_PER_DAY
  }
  if (position >= MAX_ERA_DAYS * MINUTES_PER_DAY) return { error: 'Превышен предел 9999 лет в одной эпохе.' }
  return { date: fromEraMinutes(era, position) }
}
export function minutesFromPurusha(date, durations = emptyEraDurations()) {
  if (!validChronologyDate(date, durations)) return null
  let total = eraMinutes(date)
  for (let era = 0; era < date.era; era++) {
    if (durations[era] == null) return null
    total += durations[era] * MINUTES_PER_DAY
  }
  return total
}
export function chronologyDifference(from, to, durations = emptyEraDurations()) {
  if (!validChronologyDate(from, durations) || !validChronologyDate(to, durations)) return null
  if (from.era === to.era) return eraMinutes(to) - eraMinutes(from)
  const earlier = from.era < to.era ? from : to
  const later = from.era < to.era ? to : from
  let total = eraMinutes(later) - eraMinutes(earlier)
  for (let era = earlier.era; era < later.era; era++) {
    if (durations[era] == null) return null
    total += durations[era] * MINUTES_PER_DAY
  }
  return from.era < to.era ? total : -total
}
export function nextChronologyEvent(date, durations = emptyEraDurations()) {
  for (let offset = 1; offset <= YEAR_LENGTH * CALENDAR_ERAS.length; offset++) {
    const result = shiftChronologyDate({ ...date, hour: 0, minute: 0 }, offset * MINUTES_PER_DAY, durations)
    if (!result.date) return null
    const events = calendarCell(result.date.month, result.date.day).events
    if (events.length) return { date: result.date, offset, events }
  }
  return null
}
export const chronologyTimeLabel = date => `${String(date.hour).padStart(2, '0')}:${String(date.minute).padStart(2, '0')}`
export function elapsedTimeLabel(minutes) {
  const value = Math.abs(minutes)
  return `${Math.floor(value / MINUTES_PER_DAY)} дн. ${Math.floor((value % MINUTES_PER_DAY) / 60)} ч. ${value % 60} мин.`
}

// Calendar markers describe the supplied dates, not inferred orbital phases.
// Short configured eras can restart the calendar several times before a marker.
export function chronologyEventCycles(date, durations = emptyEraDurations()) {
  if (!validChronologyDate(date, durations)) return []
  const anchor = { ...date, hour: 0, minute: 0 }
  const previous = new Map()
  const upcoming = new Map()
  const horizon = YEAR_LENGTH * CALENDAR_ERAS.length
  for (let days = 0; days <= horizon; days++) {
    const result = shiftChronologyDate(anchor, -days * MINUTES_PER_DAY, durations)
    if (!result.date) break
    for (const event of calendarCell(result.date.month, result.date.day).events) {
      if (!previous.has(event.id)) previous.set(event.id, { date: result.date, days })
    }
    if (previous.size === CALENDAR_EVENTS.length) break
  }
  for (let days = 1; days <= horizon; days++) {
    const result = shiftChronologyDate(anchor, days * MINUTES_PER_DAY, durations)
    if (!result.date) break
    const events = calendarCell(result.date.month, result.date.day).events
    for (const event of events) {
      if (!upcoming.has(event.id)) upcoming.set(event.id, { date: result.date, days, events })
    }
    if (upcoming.size === CALENDAR_EVENTS.length) break
  }
  const today = calendarCell(date.month, date.day).events
  return CALENDAR_EVENTS.map(event => {
    const before = previous.get(event.id) || null
    const next = upcoming.get(event.id) || null
    const spanMinutes = before && next ? chronologyDifference(before.date, next.date, durations) : null
    const elapsedMinutes = before ? chronologyDifference(before.date, date, durations) : null
    return {
      event, today: today.some(item => item.id === event.id), previous: before, next,
      remainingMinutes: next ? chronologyDifference(date, next.date, durations) : null,
      spanDays: spanMinutes === null ? null : spanMinutes / MINUTES_PER_DAY,
      progress: spanMinutes > 0 ? Math.min(100, elapsedMinutes / spanMinutes * 100) : null,
    }
  })
}
