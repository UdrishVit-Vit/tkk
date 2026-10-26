import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import assert from 'node:assert/strict'
import { parse, compileScript } from 'vue/compiler-sfc'
import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { DND55E_EQUIPMENT } from '../app/data/dnd55e/equipment2024.js'
import { TOOL_GUIDES, toolTasks } from '../app/data/dnd55e/toolGuides.js'
import { TOOL_APPLICATIONS } from '../app/data/dnd55e/toolApplications.js'

await fs.mkdir('.tmpwork/tool-check', { recursive: true })
const filename = 'app/components/EquipmentToolDetails.vue'
const { descriptor } = parse(await fs.readFile(filename, 'utf8'))
const code = compileScript(descriptor, { id: 'tools', inlineTemplate: true }).content.replace(/(['"])~\/([^'"]+)\1/g, (_, q, relative) => JSON.stringify(pathToFileURL(path.resolve('app', relative)).href))
const compiled = path.resolve('.tmpwork/tool-check/component.mjs')
await fs.writeFile(compiled, code)
const { default: component } = await import(pathToFileURL(compiled))
const tools = DND55E_EQUIPMENT.filter(item => item.kind === 'tool' && !item.kit)
assert.equal(tools.length, 27)
for (const item of tools) {
  assert.ok(TOOL_GUIDES[item.id]?.every(Boolean), item.id)
  const tasks = toolTasks(item)
  if (!item.details?.length) {
    assert.equal(TOOL_APPLICATIONS[item.id]?.length, tasks.length, item.id + ': missing individual application')
    for (const entry of TOOL_APPLICATIONS[item.id]) assert.ok(entry.length === 2 && entry.every(Boolean), item.id)
  }
  assert.deepEqual(tasks.map(t => t.dc), [...item.utilize.matchAll(/\(Сл (\d+)\)/g)].map(m => m[1]), item.id + ': DC changed')
  const app = createSSRApp(component, { item, equipment: DND55E_EQUIPMENT })
  app.component('NuxtLink', defineComponent({ props: ['to'], setup: (p, { slots }) => () => h('a', { href: p.to }, slots.default?.()) }))
  const html = await renderToString(app)
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1])
  assert.equal(new Set(ids).size, ids.length)
  for (const m of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(m[1]), item.id + ': target')
  for (const m of html.matchAll(/href="\/dnd55e\/equipment\?item=([^"]+)"/g)) assert.ok(DND55E_EQUIPMENT.some(e => e.id === m[1]), item.id + ': item link')
  const plain = html.replace(/<[^>]*>/g, ' ').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ')
  for (const detail of item.details || []) {
    assert.ok(plain.includes(detail.text.replace(/\s+/g, ' ')), item.id + ': lost special rule')
    for (const row of detail.table?.rows || []) for (const cell of row) assert.ok(plain.includes(cell), item.id + ': lost table cell')
  }
  assert.ok(!html.includes('undefined'), item.id)
  for (const entry of TOOL_APPLICATIONS[item.id] || []) {
    assert.ok(plain.includes(entry[0]) && plain.includes(entry[1]), item.id + ': missing application text')
  }
  await fs.writeFile(`.tmpwork/tool-check/${item.id}.html`, html)
}
console.log('27 tool cards: guide coverage, unchanged DCs, special rules/tables, anchors and item links passed.')
