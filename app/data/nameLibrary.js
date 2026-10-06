import knowledge from './nameKnowledge.json' with { type: 'json' }
import { RACE_NAME_GENERATORS, VETU_NAME_PARTS } from './raceNameGenerators.js'
import { isLostVetuName } from './raceNameRoll.js'
import vetuCycleRules from './vetuCycleNames.json' with { type: 'json' }

export { knowledge }
export const NAME_RACES = [
  ['lyudi', 'Люди'], ['hudduliny', 'Худдулины'], ['marakiytsy', 'Маракийцы'],
  ['oyrdugi', 'Ойрдуги'], ['udrishi', 'Удриши'], ['virmorozhdennye', 'Вирморождённые'],
  ['koboldy', 'Кобольды'], ['chotgory', 'Чотгоры'], ['morhory', 'Морхоры'],
  ['adzhaidy', 'Аджаиды'], ['borosy', 'Боросы'], ['jabari', 'Джабари'],
  ['samaghi', 'Самагхи'], ['ehornur', 'Эхор’нуры'], ['vetu', 'Вету Цикла'],
].map(([slug, title]) => ({ slug, title }))
export const NAME_GUIDES = [
  ['review', 'Критика и отбор'], ['udrishi', 'Конструктор удришей'], ['chotgory', 'Конструктор чотгоров'],
  ['tables', 'Полные таблицы'], ['canon', 'Имена в источниках'], ['analysis', 'Исследование именников'],
].map(([slug, title]) => ({ slug, title }))
const profileIds = {
  'Дангунцы': 'dangun', 'Бралльцы': 'brall', 'Адаады': 'adaad', 'Эрх': 'hudd_erh', 'Сар': 'hudd_sar', 'Омор': 'hudd_omor',
  'Пепельные': 'mara_ash', 'Янтарные': 'mara_amber', 'Драгмирцы': 'dragmir', 'Ойрдуги': 'oyrdug',
  'Урма': 'udr_urma', 'Эрил': 'udr_eril', 'Пйюр-Пйюр': 'udr_pyy', 'Вирморождённые': 'virmborn',
  'Кобольды': 'kobold', 'Чотгоры': 'chotgor', 'Морхоры': 'morhor', 'Аджаиды': 'adj', 'Боросы': 'boros',
  'Джабари': 'jabari', 'Самагхи': 'samagh', 'Эхор’нуры': 'ehor', 'Вету Цикла': 'vetu_cycle',
}
export const profileForTable = table => knowledge.profiles.find(profile => profile.id === profileIds[table.label])
export const VETU_CYCLE_TABLE = {
  label: 'Вету Цикла', cyclePool: true,
  hint: 'Цветовой префикс и знак Цикла образуют имя. Девять утерянных сочетаний оставляют рождённого безымянным. Это форма ЭНОА; не заявляется её употребление как современного человеческого имени.',
  isLostName: isLostVetuName,
  rolls: vetuCycleRules.d4x4.entries.map(entry => entry.roll),
  names: VETU_NAME_PARTS.prefixes.flatMap(prefix => VETU_NAME_PARTS.signs.map(sign => prefix + sign)),
}
export const tablesForRace = slug => slug === 'vetu' ? [VETU_CYCLE_TABLE] : RACE_NAME_GENERATORS[slug] || []
export function evidenceForName(name) {
  for (const table of Object.values(RACE_NAME_GENERATORS).flat()) {
    if (Object.values(table.canonicalNames || {}).flat().includes(name)) return { status: 'Подтверждено автором' }
    if (table.nameSources?.[name]) return { status: 'Реальное имя', source: table.nameSources[name] }
  }
  if (knowledge.profiles.some(profile => profile.canon?.includes(name))) return { status: 'Имя из источников' }
  return { status: 'Предложение' }
}
