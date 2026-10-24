import { DND55E_BACKGROUND_ABILITIES, DND55E_SKILL_GLOSSARY, DND55E_TOOL_EQUIPMENT } from '../../app/data/dnd55e/backgrounds.js'

export function validateBackgrounds({ backgrounds, feats, homebrew = [], proposals = {}, equipment, glossary }) {
  const errors = []
  const issue = (code, id, detail) => errors.push({ code, id, detail })
  const unique = (rows, kind) => {
    const ids = new Set()
    for (const row of rows) {
      if (!row.id?.trim()) issue('id-missing', kind, 'Отсутствует ID')
      else if (ids.has(row.id)) issue('id-duplicate', row.id, kind)
      ids.add(row.id)
    }
  }
  unique(backgrounds, 'background'); unique([...feats, ...homebrew.filter(f => !feats.includes(f))], 'feat')
  const featById = new Map(feats.map(f => [f.id, f]))
  const gearById = new Map(equipment.map(e => [e.id, e]))
  const glossaryIds = new Set(glossary.map(g => g.id))
  for (const f of feats) if (f.status === 'Draft' || f.status === 'Testing') issue('unpublished-feat', f.id, 'Черновик попал в публичный каталог')
  for (const b of backgrounds) {
    if (!(Array.isArray(b.enoaLead) ? b.enoaLead.join(' ') : b.enoaLead)?.trim()) issue('description', b.id, 'Нет описания')
    const f = featById.get(b.feat?.id)
    if (!b.feat?.id) issue('feat-missing', b.id, 'Нет ссылки на черту')
    else if (!f) issue('feat-unresolved', b.id, b.feat.id)
    else if (f.category !== 'origin') issue('feat-category', b.id, `${f.id}: ${f.category}`)
    for (const [key, count, allowed] of [['abilities', 3, DND55E_BACKGROUND_ABILITIES], ['skills', 2, Object.keys(DND55E_SKILL_GLOSSARY)]]) {
      const values = b[key] || []
      if (values.length !== count) issue(`${key}-count`, b.id, `Нужно ${count}`)
      if (new Set(values).size !== values.length) issue(`${key}-duplicate`, b.id, 'Повтор')
      if (values.some(v => !allowed.includes(v))) issue(`${key}-unknown`, b.id, 'Неизвестное значение')
    }
    const toolId = DND55E_TOOL_EQUIPMENT[b.tool?.replace(' (на выбор)', '')]
    if (!toolId || !gearById.has(toolId) || ['tool-obo-kit', 'tool-tattooists-tools'].includes(toolId)) issue('tool', b.id, 'Нужен один инструмент 2024')
    if (b.equipment?.alt !== '50 зм' || b.equipment.alternativeCp !== 5000) issue('alternative', b.id, 'Нет альтернативы 50 зм')
    let total = b.equipment?.coinsCp
    if (!Number.isSafeInteger(total) || total < 0) issue('coins', b.id, 'Некорректные монеты')
    const printedCoins = [...(b.equipment?.coins || '').matchAll(/(\d+) (зм|см|мм)/g)].reduce((n, m) => n + Number(m[1]) * {зм:100,см:10,мм:1}[m[2]], 0)
    if (printedCoins !== total) issue('coins-display', b.id, 'Текст монет расходится с числом')
    for (const i of b.equipment?.items || []) {
      const item = gearById.get(i.id)
      if (!item) issue('equipment-reference', b.id, i.id)
      if (item?.category.startsWith('martial') || item?.category === 'armor') issue('equipment-forbidden', b.id, i.title)
      if (!Number.isSafeInteger(i.quantity) || i.quantity < 1 || !Number.isSafeInteger(i.unitCostCp) || i.unitCostCp < 0) issue('equipment-price', b.id, i.title)
      const price = item?.cost.match(/^(\d+(?:\.\d+)?) (зм|см|мм)$/)
      const variantPrices = {
        'tool-gaming-set': { 'кости': 10 },
        'tool-musical-instrument': { 'флейта': 200 },
        'gear-holy-symbol': { 'эмблема': 500 },
        'gear-ammunition': { 'стрелы, 20 шт.': 100, 'болты, 20 шт.': 100 }
      }
      const expectedPrice = price ? Math.round(Number(price[1]) * {зм:100,см:10,мм:1}[price[2]]) : variantPrices[i.id]?.[i.note]
      if (expectedPrice === undefined || i.unitCostCp !== expectedPrice) issue('equipment-catalog-price', b.id, `${i.label}: цена не подтверждена каталогом/вариантом`)
      total += i.quantity * i.unitCostCp
    }
    if (total !== 5000) issue('equipment-total', b.id, `${total} мм вместо 5000`)
    for (const id of b.glossary || []) if (!glossaryIds.has(id)) issue('glossary-reference', b.id, id)
  }
  for (const f of homebrew) {
    for (const key of ['title', 'summary', 'action', 'conditions', 'uses', 'recovery', 'sourceTitle']) if (!f[key]?.trim()) issue('homebrew-field', f.id, key)
    if (f.category !== 'origin' || f.contentKind !== 'Homebrew' || f.source !== 'TVV') issue('homebrew-kind', f.id, 'Неверный источник или категория')
    if (!['Draft', 'Testing', 'Approved'].includes(f.status)) issue('homebrew-status', f.id, f.status)
    if (!Object.hasOwn(f, 'requirement') || typeof f.repeatable !== 'boolean') issue('homebrew-field', f.id, 'requirement/repeatable')
    if (!f.benefits?.length || f.benefits.some(b => !b.title?.trim() || !b.text?.trim())) issue('homebrew-benefits', f.id, 'Неполная механика')
    if (!f.relatedBackgrounds?.length || f.relatedBackgrounds.some(id => !backgrounds.some(b => b.id === id))) issue('homebrew-background', f.id, 'Нет связанной предыстории')
    for (const id of f.relatedBackgrounds || []) if (!proposals[id]?.includes(f.id)) issue('proposal-reverse', f.id, id)
  }
  for (const [id, ids] of Object.entries(proposals)) {
    if (!backgrounds.some(b => b.id === id)) issue('proposal-background', id, 'Нет предыстории')
    if (!Array.isArray(ids) || new Set(ids).size !== ids.length) issue('proposal-list', id, 'Некорректный список')
    for (const featId of ids) if (!homebrew.some(f => f.id === featId && f.relatedBackgrounds.includes(id))) issue('proposal-reference', id, featId)
  }
  return errors
}
