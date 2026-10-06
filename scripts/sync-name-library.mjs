import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { RACE_NAME_GENERATORS, VETU_NAME_PARTS, NAME_ROLLS } from '../app/data/raceNameGenerators.js'
import vetuCycleRules from '../app/data/vetuCycleNames.json' with { type: 'json' }

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
mkdirSync(resolve(root, 'content/lore/names'), { recursive: true })
mkdirSync(resolve(root, 'public/name-library'), { recursive: true })
for (const [slug, title, description, file] of guides) {
  const original = readFileSync(resolve(root, file), 'utf8')
  let body = original
  for (const [linkedSlug, , , linkedFile] of guides) {
    body = body.replaceAll(`](${linkedFile})`, `](/lore/names/${linkedSlug})`)
    body = body.replaceAll(`](C:/Projects/ENOA/tkk/${linkedFile})`, `](/lore/names/${linkedSlug})`)
  }
  body = body.replaceAll('](C:/Projects/ENOA/tkk/NAME_REVIEW.md)', '](/lore/names/review)')
  writeFileSync(resolve(root, `content/lore/names/${slug}.md`), `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\nstatus: published\naccess: public\n---\n\n${body}`)
  writeFileSync(resolve(root, `public/name-library/${slug}.md`), original)
}
const bundle = { ...knowledge, tables: RACE_NAME_GENERATORS, rolls: NAME_ROLLS, vetuCycle: VETU_NAME_PARTS, vetuCycleRules }
writeFileSync(resolve(root, 'public/name-library/names.json'), JSON.stringify(bundle, null, 2) + '\n')
console.log(`Name library synced: ${knowledge.profiles.length} profiles, ${knowledge.realNames.length} real names, ${guides.length} guides.`)
