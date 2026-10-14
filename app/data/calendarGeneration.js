import { CALENDAR_MONTHS as months, CALENDAR_EVENTS as events, YEAR_LENGTH, MAX_CALENDAR_YEAR, dayOfYear } from './loreCalendar.js'
import { CALENDAR_ERAS as eras, emptyEraDurations, validEraDurations } from './loreChronology.js'
export const defaultGeneration = () => ({era:'any',yearMin:1,yearMax:1225,month:'any',day:'any',event:'any'})

// Each block is four independent d4. Rejection avoids modulo bias.
function chooseIndex(size, label, rolls, random) {
  if (size===1) return 0
  let blocks=1
  while (256**blocks<size) blocks++
  const space=256**blocks, limit=space-space%size
  for(let attempt=0;attempt<128;attempt++) {
    let value=0
    const dice=[]
    for(let i=0;i<blocks*4;i++) {
      const sample=random()
      if (!Number.isFinite(sample) || sample<0 || sample>=1) throw new Error('Недопустимый результат броска.')
      const face=1+Math.floor(sample*4)
      dice.push(face)
      value=value*4+face-1
    }
    const accepted=value<limit
    rolls.push({label,dice,accepted})
    if(accepted) return value%size
  }
  throw new Error('Не удалось получить подходящий бросок. Попробуйте ещё раз.')
}
export function generateCalendarDate(options=defaultGeneration(),durations=emptyEraDurations(),random=Math.random) {
  const opts={...defaultGeneration(),...options}, rolls=[]
  const min=Number(opts.yearMin),max=Number(opts.yearMax)
  const validChoice=(value,length)=>value==='any'||(Number.isInteger(Number(value))&&Number(value)>=0&&Number(value)<length)
  if(!Number.isSafeInteger(min)||!Number.isSafeInteger(max)||min<1||max>MAX_CALENDAR_YEAR||min>max||!validEraDurations(durations)
    ||!validChoice(opts.era,eras.length)||!validChoice(opts.month,months.length)
    ||!(opts.day==='any'||(Number.isInteger(Number(opts.day))&&Number(opts.day)>=1&&Number(opts.day)<=26))
    ||!(opts.event==='any'||opts.event==='ordinary'||events.some(e=>e.id===opts.event))) return {error:'Проверьте условия: диапазон годов, эпоху, месяц и день.'}
  const candidates=[]
  for(let era=0;era<eras.length;era++) for(let month=0;month<months.length;month++) for(let day=1;day<=months[month].days;day++) {
    if(opts.era!=='any'&&Number(opts.era)!==era||opts.month!=='any'&&Number(opts.month)!==month||opts.day!=='any'&&Number(opts.day)!==day) continue
    const marked=events.filter(e=>e.dates.some(([m,d])=>m===month&&d===day))
    if(opts.event==='ordinary'&&marked.length||opts.event!=='any'&&opts.event!=='ordinary'&&!marked.some(e=>e.id===opts.event)) continue
    const offset=dayOfYear({month,day})-1
    const lastYear=durations[era]==null?max:Math.min(max,Math.floor((durations[era]-1-offset)/YEAR_LENGTH)+1)
    if(lastYear>=min) candidates.push({era,month,day,lastYear})
  }
  if(!candidates.length) return {error:'Под эти условия нет существующей даты. Измените месяц, день, событие или диапазон годов.'}
  try {
    const eligibleEras=[...new Set(candidates.map(x=>x.era))]
    const era=eligibleEras[chooseIndex(eligibleEras.length,'Эпоха',rolls,random)]
    const eraCandidates=candidates.filter(x=>x.era===era)
    const lastYear=Math.max(...eraCandidates.map(x=>x.lastYear))
    const year=min+chooseIndex(lastYear-min+1,'Год',rolls,random)
    const yearCandidates=eraCandidates.filter(x=>x.lastYear>=year)
    const eligibleMonths=[...new Set(yearCandidates.map(x=>x.month))]
    const month=eligibleMonths[chooseIndex(eligibleMonths.length,'Месяц',rolls,random)]
    const eligibleDays=yearCandidates.filter(x=>x.month===month).map(x=>x.day)
    const day=eligibleDays[chooseIndex(eligibleDays.length,'День',rolls,random)]
    return {date:{era,year,month,day,hour:0,minute:0},rolls}
  } catch(error) {return {error:error.message}}
}
