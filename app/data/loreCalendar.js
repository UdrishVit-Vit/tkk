export const MAX_CALENDAR_YEAR = 1000000
export const CALENDAR_MONTHS = [
  { id: 'eor', name: 'Эор', days: 26 },
  { id: 'mulgur', name: 'Мулгур', days: 25 },
  { id: 'kazar', name: 'Казар', days: 26 },
  { id: 'sumdar', name: 'Сумдар', days: 26 },
  { id: 'shamdy', name: 'Шамды', days: 25 },
  { id: 'manar', name: 'Манар', days: 24 },
  { id: 'chokas', name: 'Чокас', days: 23 },
  { id: 'zalar', name: 'Залар', days: 23 },
]

export const CALENDAR_EVENTS = [
  { id: 'shamas', symbol: '🌞', name: 'День Шамаса', dates: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]] },
  { id: 'manu', symbol: '☾', name: 'Ночь Ману', dates: [[0,26],[1,12],[1,25],[2,11],[2,24],[3,10],[3,23],[4,9],[4,22],[5,8],[5,21]] },
  { id: 'hunt', symbol: '🏹', name: 'День Охоты', dates: [[6,7],[6,20]] },
  { id: 'eri', symbol: '🩸', name: 'Праздник Эри', dates: [[0,13],[0,14]] },
  { id: 'silence', symbol: '◍', name: 'День Молчания', dates: [[7,6],[7,7],[7,8],[7,21],[7,23]] },
  { id: 'darkness', symbol: '⬛', name: 'День Тьмы', dates: [[7,23]] },
]

export const YEAR_LENGTH = CALENDAR_MONTHS.reduce((sum, month) => sum + month.days, 0)

export function calendarCell(month, day) {
  const item = CALENDAR_MONTHS[month]
  if (!item || !Number.isInteger(day) || day < 1 || day > 26) return { kind: 'absent', events: [] }
  if (day > item.days) return { kind: month >= 4 ? 'eaten' : 'absent', events: [] }
  return { kind: 'day', events: CALENDAR_EVENTS.filter(event => event.dates.some(([m,d]) => m === month && d === day)) }
}

export function validCalendarDate(date) {
  return Number.isSafeInteger(date?.year) && date.year >= 1 && date.year <= MAX_CALENDAR_YEAR
    && Number.isInteger(date.month) && date.month >= 0 && date.month < 8
    && Number.isInteger(date.day) && date.day >= 1 && date.day <= CALENDAR_MONTHS[date.month].days
}

export function dayOfYear(date) {
  return CALENDAR_MONTHS.slice(0, date.month).reduce((sum, month) => sum + month.days, 0) + date.day
}

export function shiftCalendarDate(date, offset) {
  if (!validCalendarDate(date) || !Number.isSafeInteger(offset)) return null
  let ordinal = (date.year - 1) * YEAR_LENGTH + dayOfYear(date) - 1 + offset
  if (ordinal < 0 || ordinal >= MAX_CALENDAR_YEAR * YEAR_LENGTH) return null
  const year = Math.floor(ordinal / YEAR_LENGTH) + 1
  ordinal %= YEAR_LENGTH
  let month = 0
  while (ordinal >= CALENDAR_MONTHS[month].days) ordinal -= CALENDAR_MONTHS[month++].days
  return { year, month, day: ordinal + 1 }
}

export function nextCalendarEvent(date) {
  for (let offset = 1; offset <= YEAR_LENGTH; offset++) {
    const next = shiftCalendarDate(date, offset)
    if (!next) return null
    const events = calendarCell(next.month, next.day).events
    if (events.length) return { date: next, offset, events }
  }
  return null
}

export const calendarDateLabel = date => `${date.day} ${CALENDAR_MONTHS[date.month].name} · год ${date.year}`
