import { HISTORY_THREAD } from './loreHistory.js'

// Visual snapshots for the first atlas prototype. Positions are schematic.
// The date of Dayya's death is not established in the chronicle: the early
// three-moon sky is an illustration, not a new dated event in the lore.
const snapshots = [
  { id: 'zhertva-purusha', centerLayers: [{ id: 'cradle', title: 'Колыбель Искры', scale: 1.7, color: '#bca783', labelX: 0, labelY: 113, anchor: 'middle' }], hiddenSuns: ['azrak', 'ula'], summary: 'Пуруш создаёт Колыбель для Искры — начало мира.', suns: ['shamas'], hiddenMoons: ['eri'], moons: ['manu', 'dayya'], split: false, tint: '174, 126, 73', note: 'Пуруш превращает собственное тело в Колыбель для Искры и разделяет себя на восемь первооснов — Садхияров. Это начало нити мира.' },
  { id: 'epoha-rassveta', centerLayers: [{ id: 'sanctuary', title: 'Святилище', scale: 1.7, color: '#bca783', labelX: 0, labelY: 113, anchor: 'middle' }], hiddenSuns: ['azrak', 'ula'], summary: 'Святилище вокруг Кузни Судьбы. Мир ещё един.', suns: ['shamas'], hiddenMoons: ['eri'], moons: ['manu'], split: false, tint: '183, 139, 78', note: 'Святилище вокруг Кузни Судьбы. Мир ещё един, а солнца и луны свидетельствуют о первых нитях.' },
  { id: 'epoha-pererozhdeniya', centerLayers: [{ id: 'sanctuary', title: 'Святилище', scale: 2.15, color: '#bca783', labelX: 0, labelY: 128, anchor: 'middle' }, { id: 'tingir', title: 'Тингир', scale: 1.5, color: '#b5b1d7', labelX: -118, labelY: -86, anchor: 'end' }], hiddenSuns: ['azrak', 'ula'], summary: 'Улунгуры принимают Колыбель. В мире рождаются жизнь и выбор.', suns: ['shamas'], hiddenMoons: ['eri'], moons: ['manu'], split: false, tint: '99, 145, 131', note: 'Улунгуры принимают Колыбель. Небо открывается новому миру, в котором рождаются жизнь и выбор.' },
  { id: 'epoha-sveta', centerLayers: [{ id: 'enoa', title: 'Эноа', scale: 2.15, color: '#bca783', labelX: 0, labelY: 128, anchor: 'middle' }, { id: 'tingir', title: 'Тингир', scale: 1.5, color: '#b5b1d7', labelX: -118, labelY: -86, anchor: 'end' }], hiddenSuns: ['azrak', 'ula'], summary: 'Золотой век единой Эноа. Азрак и Ула скрыты за Шамасом.', suns: ['shamas'], hiddenMoons: ['eri'], moons: ['manu'], split: false, tint: '190, 158, 86', note: 'Единая Эноа в золотой век народов и городов. Азрак и Ула скрыты за Шамасом.' },
  { id: 'epoha-lyudey', minorShards: ['ish-kashim'], summary: 'После Раскола три солнца выжигают разделённые земли.', suns: ['azrak', 'shamas', 'ula'], hiddenMoons: ['eri'], moons: ['manu'], split: true, tint: '191, 92, 65', note: 'Эпоха царств, войны и Раскола. Здесь показан её поздний облик — Лето Трёх Солнц: земли уже разделены, а Шамас, Азрак и Ула вместе выжигают мир.' },
  { id: 'epoha-vosstanovleniya', minorShards: ['ish-kashim'], summary: 'Осколки обретают собственные истории, города и союзы.', suns: ['shamas'], hiddenMoons: ['eri'], moons: ['manu'], split: true, tint: '111, 143, 156', note: 'Одно солнце остаётся над Даскаром. Осколки обретают собственные истории, города и союзы.' },
  { id: 'vremya-vetrov', minorShards: ['ish-kashim'], summary: 'Осколки дрейфуют порознь. Над Эноа сгущается Тёмная Нить.', suns: ['shamas'], hiddenMoons: ['eri'], moons: ['manu'], split: true, tint: '104, 126, 169', note: 'Нынешний облик мира. Даскар, Вар’Элор и Азар дрейфуют порознь, а над Эноа сгущается Тёмная Нить.' },
]

export const SHARD_ERAS = snapshots.map(snapshot => {
  const section = HISTORY_THREAD.sections.find(item => item.slug === (snapshot.history || snapshot.id))
  return { title: section.title, label: section.label, ...snapshot, history: snapshot.history || snapshot.id }
})

export const SHARD_CELESTIAL_BODIES = {
  shamas: { title: 'Шамас', kind: 'Золотое солнце', color: '#e9bd72', x: 500, y: 104, radius: 34, sun: true },
  azrak: { title: 'Азрак', kind: 'Ледяное солнце', color: '#9dcde7', x: 315, y: 145, radius: 25, sun: true },
  ula: { title: 'Ула', kind: 'Красное солнце', color: '#df806c', x: 685, y: 145, radius: 25, sun: true },
  manu: { title: 'Ману', kind: 'Белая луна', color: '#d3dbe4', x: 225, y: 242, radius: 20 },
  eri: { title: 'Эри', kind: 'Кровавая луна', color: '#b87d86', x: 775, y: 242, radius: 17 },
  dayya: { title: 'Дайя', kind: 'Старшая луна', color: '#b5b1d7', x: 500, y: 218, radius: 18 },
}
