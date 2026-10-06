import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { RACE_NAME_GENERATORS, VETU_NAME_PARTS, NAME_ROLLS } from '../app/data/raceNameGenerators.js'
import vetuCycleRules from '../app/data/vetuCycleNames.json' with { type: 'json' }
import { NAME_ENRICHMENT, ENRICHMENT_SOURCES, ENRICHMENT_CANON } from '../app/data/nameEnrichment.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const argument = process.argv.indexOf('--knowledge-base')
const target = resolve(root, 'app/data/nameKnowledge.json')
let knowledge
if (argument >= 0) {
  const folder = resolve(process.argv[argument + 1])
  const source = JSON.parse(readFileSync(resolve(folder, 'constructors.json'), 'utf8'))
  const fields = ['id', 'title', 'canon', 'canonical_genders', 'confidence', 'pools', 'analysis', 'formula', 'avoid', 'exception', 'proposal_status', 'shared_race_author_examples', 'rejected_by_author']
  knowledge = {
    revision: source.revision,
    profiles: source.profiles.map(profile => Object.fromEntries(fields.filter(field => profile[field] !== undefined).map(field => [field, profile[field]]))),
    sources: source.sources,
    realNames: source.real_name_bank,
    excludedProfiles: source.excluded_profiles,
  }
  writeFileSync(target, JSON.stringify(knowledge, null, 2) + '\n')
  writeFileSync(resolve(root, 'NAME_ANALYSIS.md'), readFileSync(resolve(folder, 'АНАЛИЗ_И_КОНСТРУКТОРЫ.md'), 'utf8'))
} else knowledge = JSON.parse(readFileSync(target, 'utf8'))

const guides = [
  ['review', 'Критика и отбор', 'Как отличать авторские формы от настоящих человеческих имён.', 'NAME_REVIEW.md'],
  ['udrishi', 'Конструктор удришей', 'Разные ритмы и формы мужских и женских имён Урма и Эрил.', 'UDRISH_NAMES.md'],
  ['chotgory', 'Конструктор чотгоров', 'Тхуч и звуковые обращения без обряда наречения.', 'CHOTGOR_NAMES.md'],
  ['tables', 'Полные таблицы', 'Актуальные мужские и женские списки для всех включённых рас.', 'NAME_GENERATORS.md'],
  ['canon', 'Имена в источниках', 'Именник «Огней» и «Времени Королей», варианты записи и принадлежность.', 'NAMES_OGNI_KINGS.md'],
  ['analysis', 'Исследование именников', '29 культурных профилей, свидетельства и источники реальных имён.', 'NAME_ANALYSIS.md'],
]
const enrichmentReport = `# Обогащение именников по книгам ЭНОА\n\nРедакция 2026-10-06. Источники: ${Object.values(ENRICHMENT_SOURCES).join('; ')}. Ссылки на абзацы используют порядковые номера текстовых блоков в извлечении OOXML, начиная с нуля; это не номера страниц.\n\nНовые формы — предложения для игровых персонажей. Книги подтверждают культурные опоры, но не этимологию придуманных имён. Значения слогов, новые обязательные обряды и связь с конкретным земным этносом не устанавливаются.\n\nИз свободного пула убраны Бразан (Спираль), Мак’а, Меток и Чулуга (персонажи книг). Вместо них предложены Бразим, Маир’а, Мэтхар и Тэмлига. Авторские ориентиры и Тхуч сохранены.\n\nПроверка дополнений: 168 форм и короткие обращения Джабари сопоставлены с прежними именниками, реестром занятых имён и 7200 текстовыми блоками трёх сезонов «Огней», базы знаний и двух DOCX. После устранения совпадений новых точных совпадений не найдено; это проверка известного корпуса, не гарантия мировой уникальности.\n\nНа сайте к 35 основным строкам каждой из 21 таблицы добавлены четыре пары. Дополнения выбираются без фиктивного броска 4к4, с весом средней строки основной таблицы. Ойрдуги получают расширенный общий пул; имена Цикла Вету сохраняют свою схему. Генерация циклична.\n\n${Object.entries(NAME_ENRICHMENT).map(([label, data]) => `## ${label}\n\n${data.culture}\n\nМужские: ${data.m.join('; ')}.\n\nЖенские: ${data.f.join('; ')}.\n\nОпоры: ${data.evidence.join('; ')}.`).join('\n\n')}\n`
const canonReport = `\n## Имена и принадлежность в новых источниках\n\n${ENRICHMENT_CANON.map(item => `- ${item.name}: ${item.kind || item.race + ', ' + (item.gender === 'f' ? 'женское' : 'мужское')}; ${item.evidence}.`).join('\n')}\n\nПодраса Азур, Мермера, Метока и Джамаара здесь не установлена. Не выводить её из одного имени.\n`
writeFileSync(resolve(root, 'NAME_ENRICHMENT.md'), enrichmentReport + canonReport)
mkdirSync(resolve(root, 'content/lore/names'), { recursive: true })
mkdirSync(resolve(root, 'public/name-library'), { recursive: true })
for (const [slug, title, description, file] of guides) {
  const original = readFileSync(resolve(root, file), 'utf8') + (file === 'NAME_ANALYSIS.md' ? `\n\n${enrichmentReport}${canonReport}` : '')
  let body = original
  for (const [linkedSlug, , , linkedFile] of guides) {
    body = body.replaceAll(`](${linkedFile})`, `](/lore/names/${linkedSlug})`)
    body = body.replaceAll(`](C:/Projects/ENOA/tkk/${linkedFile})`, `](/lore/names/${linkedSlug})`)
  }
  body = body.replaceAll('](C:/Projects/ENOA/tkk/NAME_REVIEW.md)', '](/lore/names/review)')
  writeFileSync(resolve(root, `content/lore/names/${slug}.md`), `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\nstatus: published\naccess: public\n---\n\n${body}`)
  writeFileSync(resolve(root, `public/name-library/${slug}.md`), original)
}
writeFileSync(resolve(root, 'public/name-library/enrichment.md'), enrichmentReport + canonReport)
const bundle = { ...knowledge, tables: RACE_NAME_GENERATORS, additions: NAME_ENRICHMENT, enrichmentSources: ENRICHMENT_SOURCES, enrichmentCanon: ENRICHMENT_CANON, rolls: NAME_ROLLS, vetuCycle: VETU_NAME_PARTS, vetuCycleRules }
writeFileSync(resolve(root, 'public/name-library/names.json'), JSON.stringify(bundle, null, 2) + '\n')
console.log(`Name library synced: ${knowledge.profiles.length} profiles, ${knowledge.realNames.length} real names, ${guides.length} guides.`)
