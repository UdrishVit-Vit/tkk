// Обратная сторона поля `usedBy` у предмета.
//
// Предмет знает, каким чертам он нужен: «Инструменты татуировщика» называют
// аджаидов, вету и джабари. Досье народа должно вести обратно — но держать
// этот список в двух местах значит однажды их рассинхронизировать. Поэтому
// связь объявляется один раз, у предмета, а здесь читается наоборот.

import { EQUIPMENT_5E } from '~/data/equipment5e.js'
import { DND55E_EQUIPMENT } from '~/data/dnd55e/equipment2024.js'

const CATALOGUES = [
  { items: EQUIPMENT_5E, path: item => `/dnd5e/equipment?e=${item.id}` },
  { items: DND55E_EQUIPMENT, path: item => `/dnd55e/equipment?item=${item.id}` },
]

let index = null

function getIndex() {
  if (index) return index
  index = new Map()
  for (const catalogue of CATALOGUES) {
    for (const item of catalogue.items) {
      for (const use of item.usedBy || []) {
        const list = index.get(use.path) || []
        list.push({ title: item.title, path: catalogue.path(item) })
        index.set(use.path, list)
      }
    }
  }
  return index
}

/** Предметы, объявившие, что они нужны на этой странице. */
export function equipmentUsedOn(path) {
  return getIndex().get(path) || []
}
