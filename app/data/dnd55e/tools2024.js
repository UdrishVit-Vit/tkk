import { TEAS_5E, TEA_LORE } from '../tea5e.js'
import { OMENS_5E } from '../omens5e.js'
import { WRATHS_5E, WRATH_FACE_SKILLS, WRATH_LORE } from '../wrath5e.js'

const SPELL_REFS_2024 = [
  ['«Бесследное передвижение» (Pass without Trace)', '[Бесследное передвижение [Pass without Trace]](/dnd55e/spells?spell=pass-without-trace-phb)'],
  ['«Огонь фей» (Faerie Fire)', '[Огонь фей [Faerie Fire]](/dnd55e/spells?spell=faerie-fire-phb)'],
  ['«Обнаружение магии» (Detect Magic)', '[Обнаружение магии [Detect Magic]](/dnd55e/spells?spell=detect-magic-phb)'],
  ['«Оживление» (Raise Dead)', '[Воскрешение [Raise Dead]](/dnd55e/spells?spell=raise-dead-phb)'],
  ['«Высшее восстановление» (Greater Restoration)', '[Высшее восстановление [Greater Restoration]](/dnd55e/spells?spell=greater-restoration-phb)'],
  ['«Обнаружение мыслей» (Detect Thoughts)', '[Обнаружение мыслей [Detect Thoughts]](/dnd55e/spells?spell=detect-thoughts-phb)'],
  ['«Волшебная рука» (Mage Hand)', '[Волшебная рука [Mage Hand]](/dnd55e/spells?spell=mage-hand-phb)'],
  ['«Распад» (Disintegrate)', '[Распад [Disintegrate]](/dnd55e/spells?spell=disintegrate-phb)'],
  ['«Преграда магии» (Antimagic Field)', '[Поле антимагии [Antimagic Field]](/dnd55e/spells?spell=antimagic-field-phb)'],
  ['«Огненные ладони» (Burning Hands)', '[Огненные ладони [Burning Hands]](/dnd55e/spells?spell=burning-hands-phb)'],
  ['«Огненные ладони»', '[Огненные ладони [Burning Hands]](/dnd55e/spells?spell=burning-hands-phb)'],
  ['«Изменение памяти» (Modify Memory)', '[Изменение памяти [Modify Memory]](/dnd55e/spells?spell=modify-memory-phb)'],
  ['«Отражения» (Mirror Image)', '[Отражения [Mirror Image]](/dnd55e/spells?spell=mirror-image-phb)'],
  ['«Большую иллюзию» (Major Image)', '[Образ [Major Image]](/dnd55e/spells?spell=major-image-phb)'],
  ['«Туманный шаг» (Misty Step)', '[Туманный шаг [Misty Step]](/dnd55e/spells?spell=misty-step-phb)'],
  ['«Туманный шаг»', '[Туманный шаг [Misty Step]](/dnd55e/spells?spell=misty-step-phb)'],
  ['«Свобода передвижения» (Freedom of Movement)', '[Свобода перемещения [Freedom of Movement]](/dnd55e/spells?spell=freedom-of-movement-phb)'],
  ['Силовая Стена', '[Стена силы [Wall of Force]](/dnd55e/spells?spell=wall-of-force-phb)']
]

const BEFUDDLEMENT_2014 = 'Вы должны совершить спасбросок Интеллекта (СЛ 18). При провале вы попадаете под эффект «Слабоумие» (Feeblemind): не способны произносить речи, читать, колдовать, использовать Интеллект или Харизму.'
const BEFUDDLEMENT_2024 = 'Вы должны совершить спасбросок Интеллекта (СЛ 18). При провале вы получаете 10к12 психического урона и попадаете под эффект [Замешательство [Befuddlement]](/dnd55e/spells?spell=befuddlement-phb): не можете накладывать заклинания или совершать действие Магия. Вы повторяете спасбросок каждые 30 дней, оканчивая эффект при успехе.'

function adaptText2024(value) {
  let text = value.replace(BEFUDDLEMENT_2014, BEFUDDLEMENT_2024)

  for (const [oldText, link] of SPELL_REFS_2024) {
    text = text.replaceAll(oldText, link)
  }

  return text
    .replaceAll('Знание магии', 'Аркана')
    .replaceAll('проверкам навыков', 'проверкам характеристик')
    .replaceAll('использовать вдохновение', 'использовать Героическое вдохновение')
    .replaceAll('использовать Вдохновение', 'использовать Героическое вдохновение')
    .replaceAll('«Помощь», «Обыск», «Использовать предмет»', '«Помощь», «Поиск», «Использование»')
    .replaceAll('длительного отдыха', 'продолжительного отдыха')
    .replaceAll('длительный отдых', 'продолжительный отдых')
    .replaceAll('длительном отдыхе', 'продолжительном отдыхе')
    .replaceAll('Длительного отдыха', 'Продолжительного отдыха')
    .replaceAll('Длительный отдых', 'Продолжительный отдых')
    .replaceAll('Длительном отдыхе', 'Продолжительном отдыхе')
}

function adaptValue2024(value) {
  if (typeof value === 'string') return adaptText2024(value)
  if (Array.isArray(value)) return value.map(adaptValue2024)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      key,
      key === 'linkExcludePaths' ? [] : adaptValue2024(item)
    ]))
  }
  return value
}

function bySignature(entries) {
  return Object.fromEntries(entries.map(entry => [entry.sig.join(','), entry]))
}

export const TEAS_2024 = adaptValue2024(TEAS_5E)
export const OMENS_2024 = adaptValue2024(OMENS_5E)
export const WRATHS_2024 = adaptValue2024(WRATHS_5E)
export const TEA_LORE_2024 = adaptValue2024(TEA_LORE)
export const WRATH_LORE_2024 = adaptValue2024(WRATH_LORE)
export const WRATH_FACE_SKILLS_2024 = adaptValue2024(WRATH_FACE_SKILLS)

export const TEA_2024_BY_SIG = bySignature(TEAS_2024)
export const OMEN_2024_BY_SIG = bySignature(OMENS_2024)
export const WRATH_2024_BY_SIG = bySignature(WRATHS_2024)
