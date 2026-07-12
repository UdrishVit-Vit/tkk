import fs from 'node:fs'
import path from 'node:path'

const sources = [
  { id: 'large', size: 'Большой', file: '.data/familiar-1.docx.txt', level: 10, slot: 5 },
  { id: 'small', size: 'Малый', file: '.data/familiar-2.docx.txt', level: 2, slot: 1 },
  { id: 'medium', size: 'Средний', file: '.data/familiar-3.docx.txt', level: 6, slot: 3 }
]

const rolls = [
  [4,0,0,0],[0,0,0,4],[0,0,4,0],[0,4,0,0],[3,1,0,0],[3,0,1,0],[3,0,0,1],
  [2,1,1,0],[2,0,1,1],[2,1,0,1],[2,2,0,0],[2,0,2,0],[2,0,0,2],[1,3,0,0],
  [1,0,3,0],[1,0,0,3],[1,2,1,0],[1,1,2,0],[1,1,0,2],[1,2,0,1],[1,1,1,1],
  [0,2,1,1],[0,2,2,0],[0,2,0,2],[0,1,2,1],[0,1,1,2],[0,1,3,0],[0,1,0,3],
  [0,0,3,1],[0,0,2,2],[0,0,1,3],[0,3,1,0],[0,3,0,1],[1,0,1,2],[1,0,2,1]
]

function parse(source) {
  const lines = fs.readFileSync(source.file, 'utf8').split(/\r?\n/).map(line => line.trim())
  const listStart = lines.findIndex(line => /^Список\s+/i.test(line))
  const intro = lines.slice(0, 5)
  const entries = []
  let current = null
  for (const line of lines.slice(listStart + 1)) {
    const match = line.match(/^(\d{1,2})[.,]\s*(.+)$/)
    if (match && Number(match[1]) >= 1 && Number(match[1]) <= 35) {
      if (current) entries.push(current)
      current = { number: Number(match[1]), name: match[2].trim(), lines: [] }
    } else if (current && line) current.lines.push(line)
  }
  if (current) entries.push(current)
  return {
    ...source,
    ritual: {
      duration: intro[1]?.replace(/^Длительность:\s*/i, '') || '',
      cost: intro[2]?.replace(/^Стоимость:\s*/i, '') || '',
      composition: intro[3]?.replace(/^Композиция:\s*/i, '') || '',
      difficulty: intro[4]?.replace(/^Сложность создания:\s*/i, '') || ''
    },
    familiars: entries.slice(0, 35).map((entry, index) => ({
      ...entry,
      roll: { bunti: rolls[index][0], ayur: rolls[index][1], dodor: rolls[index][2], tahar: rolls[index][3] }
    }))
  }
}

const data = Object.fromEntries(sources.map(source => [source.id, parse(source)]))
const output = `// Generated from the three Сошид-е-Мута familiar DOCX files.\nexport const WIZARD_FANGS_FAMILIARS = ${JSON.stringify(data, null, 2)}\n`
fs.writeFileSync(path.resolve('app/data/wizardFangsFamiliars.js'), output)
console.log(Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.familiars.length])))
