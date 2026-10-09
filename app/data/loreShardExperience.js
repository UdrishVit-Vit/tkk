import { SHARD_ERAS } from './loreShardEras.js'
import { SHARD_NODE_STORIES } from './loreShardStories.js'

export const SHARD_ERA_CHANGES = {
  'zhertva-purusha': { text: 'Ноа окружает Искру. К новому миру приходят три солнца и три луны.', nodes: ['spark', 'noa', 'shamas', 'azrak', 'ula', 'manu', 'eri', 'dayya'] },
  'epoha-rassveta': { text: 'Вокруг Ноа появляется Святилище. На схеме Эри скрывается за Ману.', nodes: ['sanctuary', 'manu', 'eri'] },
  'epoha-pererozhdeniya': { text: 'Рядом с Искрой появляется Тингир, а за Ноа — Лабиринт.', nodes: ['tingir', 'labyrinth', 'noa'] },
  'epoha-sveta': { text: 'Внешний мир показан как Эноа. Отдельно обозначены карманы мира духов.', nodes: ['enoa', 'spirit-pockets'] },
  'epoha-lyudey': { text: 'После Раскола земли отделяются от Эноа. Азрак и Ула выходят из-за Шамаса.', nodes: ['daskar', 'azar', 'ish-kashim', 'var-elor', 'azrak', 'ula'] },
  'epoha-vosstanovleniya': { text: 'Лето Трёх Солнц заканчивается. Над осколками остаётся Шамас.', nodes: ['shamas'] },
  'vremya-vetrov': { text: 'Расположение осколков сохраняется, но древние врата Лабиринтов открываются вновь.', nodes: ['labyrinth'] },
}

export function eraHasNode(era, id) {
  if (id === 'spark' || id === 'choku') return true
  if (id === 'dalnie-chertogi') return era.id !== 'zhertva-purusha'
  if (id === 'spirit-pockets') return Boolean(era.spiritPockets)
  if (['daskar', 'azar', 'var-elor'].includes(id)) return era.split
  return [...era.suns, ...era.moons, ...(era.hiddenSuns || []), ...(era.hiddenMoons || []), ...(era.minorShards || []), ...era.centerLayers.map(node => node.id)].includes(id)
}

// Describe the selected snapshot first; the complete story stays under “Об узле”.
export function shardEraReading(id, era) {
  const moment = SHARD_NODE_STORIES[id]?.moments?.[era.id]
  if (moment) return moment
  const origin = era.id === 'zhertva-purusha'
  const layer = era.centerLayers.find(node => node.id === id)
  if (id === 'spark') return origin ? 'Пуруш создаёт Ноа из собственного тела, чтобы сохранить Искру. Её сияние привлекает первые светила нового мира.' : 'Искра остаётся общим центром мира. Вложенные границы показывают окружающие её миры, а нити — связи с другими узлами.'
  if (id === 'noa') return era.centerLayers.some(node => node.id === 'tingir') ? 'Ноа, Колыбель Искры, теперь показана между Тингиром и Лабиринтом. Она сохраняет своё место в устройстве мира, хотя вокруг неё возникают новые границы.' : 'Ноа — Колыбель, созданная из тела Пуруша. Она окружает Искру; в её сердце находятся Стражи, а над ней — Наблюдатели.'
  if (id === 'sanctuary') return 'Садхияры устроили Святилище вокруг Кузни Судьбы и оплели мир защитой от внешней тьмы. На схеме это внешняя граница вокруг Ноа.'
  if (id === 'enoa') return 'Эноа — новое Святилище смертных, охваченное Вечным Змеем. Народы строят города и учатся у звёзд; мир ещё един.'
  if (id === 'tingir') return era.id === 'epoha-pererozhdeniya' ? 'Ослабевшие после восстания серафимов Улунгуры создают Тингир рядом с Искрой — место отдыха и восстановления сил.' : 'Тингир остаётся ближайшим к Искре миром Улунгуров. Его фиолетовая граница находится внутри Ноа.'
  if (id === 'labyrinth') return era.id === 'epoha-pererozhdeniya' ? 'Восставшие серафимы создают собственные королевства. Так возникает Лабиринт — реальности, воплощающие чувства их правителей.' : 'Лабиринт окружает Ноа и Тингир на этой схеме. Его королевства принадлежат серафимам и воплощают чувства своих владык.'
  if (id === 'shamas') return 'Шамас — золотое солнце силы, гордости и тепла. Здесь за ним показаны Азрак и Ула: три светила совмещены, но у каждого свой узел.'
  if (id === 'azrak' || id === 'ula') return `${id === 'azrak' ? 'Азрак — ледяное солнце.' : 'Ула — красное солнце.'} ${era.suns.includes(id) ? 'В Лето Трёх Солнц светило выходит из-за Шамаса и выжигает расколотые земли.' : 'На схеме этой эпохи светило скрыто за Шамасом; совмещение ромбов показывает это положение.'}`
  if (id === 'eri') return 'Эри показана багровой луной, скрытой за Ману. Предание связывает её цвет с гибелью Дайи; точная эпоха этого события не установлена.'
  if (id === 'manu') return origin ? 'Ману — белая луна, Око Ночи и привратник снов Чоку. В раннем небе он показан отдельно от Эри и Дайи.' : 'Ману — белая луна и привратник снов Чоку. Здесь его ромб находится перед Эри, а отдельная нить ведёт к Царству Чоку.'
  if (id === 'dayya') return 'Дайя — старшая из трёх лун. В раннем небе она показана ближе других лун к Ноа. Время её гибели не установлено: схема не датирует это событие.'
  if (id === 'daskar') return 'Крупнейший осколок Эноа связан с Искрой собственной нитью. Название земли следует отличать от имени героя Даскара, о котором рассказывает предание.'
  if (id === 'azar') return era.id === 'epoha-lyudey' ? 'Азар показан как одна из отделившихся земель. Источник не устанавливает, когда и почему осколок покрылся льдом.' : 'Азар — замёрзший осколок Эноа. Время и причина его обледенения остаются неизвестными; нить обозначает связь с Искрой.'
  if (id === 'var-elor') return 'Вар’Элор — тёмный осколок под Даскаром, где поселились элорцы. Его отдельная нить ведёт к общему центру — Искре.'
  return SHARD_NODE_STORIES[id]?.text || layer?.title || ''
}

export function shardNodeTimeline(id) {
  let previous = ''
  return SHARD_ERAS.filter(era => eraHasNode(era, id)).flatMap(era => {
    const text = shardEraReading(id, era)
    if (text === previous) return []
    previous = text
    return [{ id: era.id, title: era.title, text }]
  })
}
