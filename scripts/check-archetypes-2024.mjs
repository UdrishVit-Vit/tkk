import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { CLASSDATA } from '../app/data/classdata.js'
import { DND55E_CLASS_DETAILS } from '../app/data/dnd55e/classdata2024.js'
import { DND55E_SPELLS } from '../app/data/dnd55e/spells.js'
import { CLASS_FEATURES_2024 } from '../app/data/dnd55e/classFeatures2024.js'
import { mergeArchetypes2024 } from '../app/data/dnd55e/classArchetypes2024.js'

const norm = s => String(s).toLowerCase().replaceAll('ё', 'е').replace(/[^a-zа-я0-9]/g, '')
const spells = new Map(DND55E_SPELLS.map(s => [norm(s.title), s]))
const grids = {
  Варвар: [3,6,10,14], Бард: [3,6,14], Воин: [3,7,10,15,18],
  Волшебник: [3,6,10,14], Дрифтер: [3,6,10,18], Друид: [3,6,10,14],
  Жрец: [3,6,17], Изобретатель: [3,5,9,15], Колдун: [3,6,10,14],
  Монах: [3,6,11,17], Плут: [3,9,13,17], Паладин: [3,7,15,20],
  Следопыт: [3,7,11,15], Чародей: [3,6,14,18], Шаман: [3,6,10,14]
}
const errors = [], inventory = []
let references = 0
const check = (ok, message) => { if (!ok) errors.push(message) }
// A new legacy record must never silently enter either 2024 catalogue.
const legacy = [{ id: 'unconverted', name: 'Неперенесённый' }]
assert.deepEqual(mergeArchetypes2024(undefined, legacy), [])
assert.deepEqual(mergeArchetypes2024([], legacy), [])
const own = [{ id: 'converted', name: 'Перенесённый' }]
assert.deepEqual(mergeArchetypes2024(own, legacy), own)

for (const [className, details] of Object.entries(DND55E_CLASS_DETAILS)) {
  const list = details.archetypes || [], ids = new Set(), names = new Set()
  for (const old of CLASSDATA[className]?.archetypes || []) {
    // Старый общий источник ENOA у мудр уточнён до TL в адаптации.
    const expectedSource = className === 'Шаман' && old.source === 'ENOA' ? 'TL' : old.source
    check(list.some(a => norm(a.name) === norm(old.name) && a.source === expectedSource), `${className}: нет адаптации ${old.name} (${old.source})`)
  }
  for (const a of list) {
    const label = `${className} / ${a.name}`
    check(a.id && !ids.has(a.id), `${label}: повтор/отсутствие id`)
    const identity = `${norm(a.name)}:${a.source}`
    check(a.name && !names.has(identity), `${label}: повтор названия в одном источнике`)
    ids.add(a.id); names.add(identity)
    const levels = [...new Set(a.features.map(f => parseInt(f.level)))].sort((a,b) => a-b)
    check(JSON.stringify(levels) === JSON.stringify(grids[className]), `${label}: сетка ${levels}`)
    check(parseInt(a.level) === 3, `${label}: начало раньше 3-го уровня`)
    for (const f of a.features) {
      check(f.name && f.text?.trim(), `${label}: пустое умение`)
      for (const item of f.items || []) check(Array.isArray(item) ? item[0] && item[1] : item.name && item.text, `${label}: пустой вложенный эффект`)
      check(CLASS_FEATURES_2024.some(r => r.className === className && r.subclassId === a.id && r.name === f.name), `${label}: умение отсутствует в каталоге ${f.name}`)
      if (!/Заклинания|Напевы/.test(f.name)) continue
      let tableHeader = []
      for (const line of f.text.split('\n')) {
        if (!line.startsWith('|')) continue
        const cells = line.split('|').slice(1,-1).map(x => x.trim())
        if (/Уровень|2к8/.test(cells[0])) { tableHeader = cells; continue }
        if (!/^\d+$/.test(cells[0])) continue
        const deity = tableHeader[0] === '2к8'
        check(deity || /Уровень (жреца|паладина|колдуна|друида|следопыта|шамана|барда|волшебника|чародея|изобретателя)/i.test(tableHeader[0]), `${label}: неоднозначная шкала таблицы ${tableHeader[0]}`)
        for (let i = deity ? 2 : 1; i < cells.length; i++) {
          const level = Number(deity ? tableHeader[i] : cells[0])
          const max = ['Паладин','Следопыт','Изобретатель'].includes(className) ? Math.ceil(level/4) : Math.min(9, Math.ceil(level/2))
          for (const title of cells[i].split(',')) {
            const clean = title.replace(/\([^)]*\)/g, '').replace(/[\\*]/g, '').trim()
            const spell = spells.get(norm(clean))
            check(spell, `${label}: неизвестное заклинание ${clean}`)
            if (!spell) continue
            references++
            check(spell.level <= max, `${label}: ${spell.title} (${spell.level}) недоступно на уровне ${level} (макс. ${max})`)
          }
        }
      }
    }
    inventory.push({ className, id: a.id, name: a.name, levels, features: a.features.length, nested: a.features.reduce((n,f) => n + (f.items?.length || 0),0) })
  }
}
const keys = CLASS_FEATURES_2024.map(r => r.id)
check(new Set(keys).size === keys.length, 'Повтор id в каталоге умений')
if (process.argv.includes('--report')) {
  mkdirSync('reports', { recursive: true })
  writeFileSync('reports/archetypes-2024-inventory.json', JSON.stringify({ scope: 'Structure, catalogue coverage and spell accessibility; not a balance approval', subclasses: inventory.length, spellReferences: references, errors, inventory }, null, 2) + '\n')
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1 }
else console.log(`OK: ${inventory.length} подкласса, ${inventory.reduce((n,a)=>n+a.features,0)} умений, ${references} ссылок таблиц заклинаний. Баланс требует отдельной проверки.`)
