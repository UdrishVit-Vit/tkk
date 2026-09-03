import { CLASSDATA } from '../app/data/classdata.js'
for (const a of CLASSDATA[process.argv[2]].archetypes) {
  console.log(`\n${'='.repeat(70)}\n## ${a.name}  [${a.source}] id=${a.id} type=${a.type||''}`)
  if (a.summary) console.log(`SUMMARY: ${a.summary}`)
  if (a.intro) console.log(`INTRO:\n${a.intro.join('\n')}`)
  for (const f of a.features||[]) {
    console.log(`\n--- [${f.level}] ${f.name}`)
    console.log(f.text)
    for (const i of f.items||[]) console.log(Array.isArray(i) ? `   • ${i[0]} — ${i[1]}` : `   • ${i.name} — ${i.text}`)
  }
  if (a.spells?.length) console.log('SPELLS:', JSON.stringify(a.spells).slice(0,300))
}
