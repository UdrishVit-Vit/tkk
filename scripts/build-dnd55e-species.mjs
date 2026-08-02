import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

const sourceDir = new URL('../content/dnd5e/races/', import.meta.url)
const targetDir = new URL('../content/dnd55e/species/', import.meta.url)

const CHARACTER_ORIGIN_NOTE = 'В редакции 2024 года вид не изменяет характеристики. Используйте увеличение характеристик, указанное в выбранной предыстории.'
const LANGUAGE_NOTE = 'В редакции 2024 года вид не предоставляет языки. При создании персонажа вы знаете Общий и выбираете ещё два языка из доступных в кампании; особые способы общения, предоставленные чертами вида, сохраняются.'

function replaceRuleBlocks(source, replacements) {
  const lines = source.split(/\r?\n/)
  const result = []

  for (let index = 0; index < lines.length; index += 1) {
    const titleMatch = lines[index].match(/^(\s*)- title:\s*(.+?)\s*$/)
    const replacement = titleMatch ? replacements.get(titleMatch[2]) : null
    if (!replacement) {
      result.push(lines[index])
      continue
    }

    const indent = titleMatch[1]
    result.push(`${indent}- title: ${replacement.title}`)

    const textLine = lines[index + 1] || ''
    if (!textLine.startsWith(`${indent}  text:`)) continue

    result.push(`${indent}  text: |-`)
    result.push(`${indent}    ${replacement.text}`)
    index += 2

    while (index < lines.length) {
      const line = lines[index]
      if (!line.trim()) {
        index += 1
        continue
      }
      const lineIndent = line.match(/^\s*/)?.[0].length || 0
      if (lineIndent <= indent.length + 2) {
        index -= 1
        break
      }
      index += 1
    }
  }

  return result.join('\n')
}

function adaptRules(source) {
  let result = source
    .replace(/^type:\s*race\s*$/m, 'type: species\nrulesEdition: "2024"')
    .replace(/^(\s*)abilityScore:\s*.*$/gm, '$1abilityScore: Определяется предысторией')
    .replace(/^\s*Увеличение характеристик:\s*.*(?:\r?\n)?/gm, '')
    .replace(/^\s*Языки:\s*.*(?:\r?\n)?/gm, '')
    .replace(/^(\s*)- title: Мировоззрение\s*$/gm, '$1- title: Культурные склонности')
    .replace(/умение «Увеличение характеристик»/g, 'черту «Улучшение характеристик»')
    .replace(/бонус умения/g, 'бонус мастерства')
    .replace(/двойным бонусом умения/g, 'удвоенным бонусом мастерства')
    .replace(/Сл\s/g, 'СЛ ')
    .replace(/длительного отдыха/g, 'продолжительного отдыха')
    .replace(/длительный отдых/g, 'продолжительный отдых')
    .replace(/длинного отдыха/g, 'продолжительного отдыха')
    .replace(/длинном отдыхе/g, 'продолжительном отдыхе')
    .replace('Ваш хвост обладает собственной волей. Вы знаете один дополнительный язык.', 'Ваш хвост обладает собственной волей.')
    .replace('Язык матери: Вы владеете одним дополнительным языком.', 'Язык матери: при создании персонажа одним из двух выбранных языков может быть язык Матери, если он доступен в кампании.')
    .replace('Язык Тингира: Вы говорите и читаете на Тингире.', 'Язык Тингира: при создании персонажа одним из двух выбранных языков может быть Тингир, если он доступен в кампании.')

  return replaceRuleBlocks(result, new Map([
    ['Увеличение характеристик', {
      title: 'Характеристики и предыстория',
      text: CHARACTER_ORIGIN_NOTE
    }],
    ['Языки', {
      title: 'Языки персонажа',
      text: LANGUAGE_NOTE
    }]
  ]))
}

await mkdir(targetDir, { recursive: true })

const files = (await readdir(sourceDir)).filter(file => file.endsWith('.md')).sort()
for (const file of files) {
  const source = await readFile(new URL(file, sourceDir), 'utf8')
  const adapted = adaptRules(source)
  await writeFile(new URL(basename(file), targetDir), adapted, 'utf8')
}

console.log(`Создано досье видов D&D 5.5e: ${files.length} (${join('content', 'dnd55e', 'species')})`)
