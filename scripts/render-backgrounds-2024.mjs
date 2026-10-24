// Render the actual page slots with a minimal catalog shell. This checks content
// integration, not browser layout, hydration or interactive filtering.
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import assert from 'node:assert/strict'
import { parse, compileScript } from 'vue/compiler-sfc'
import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { DND55E_BACKGROUNDS } from '../app/data/dnd55e/backgrounds.js'
import { DND55E_HOMEBREW_ORIGIN_FEATS } from '../app/data/dnd55e/origin-feats-homebrew.js'

await fs.mkdir('.tmpwork/backgrounds-render', { recursive: true })
const shell = defineComponent({
  inheritAttrs: false, props: ['groups'],
  setup(props, { slots }) {
    return () => h('main', props.groups.flatMap(g => g.items.map(item => h('article', { 'data-record': item.id }, [slots.item?.({ item }), slots.body?.({ item })]))))
  }
})
async function render(name) {
  const filename = `app/components/dnd55e/${name}.vue`
  const { descriptor } = parse(await fs.readFile(filename, 'utf8'), { filename })
  const script = compileScript(descriptor, { id: name, inlineTemplate: true })
  const code = `import { ref, reactive, computed } from 'vue';\nconst useSeoMeta = () => {};\n` + script.content.replace(/(['"])~\/([^'"]+)\1/g, (_, quote, relative) => JSON.stringify(pathToFileURL(path.resolve('app', relative)).href))
  const modulePath = path.resolve('.tmpwork/backgrounds-render', name + '.mjs')
  await fs.writeFile(modulePath, code)
  const { default: component } = await import(pathToFileURL(modulePath).href)
  const app = createSSRApp(component)
  app.component('ThreadRefPage', shell)
  app.component('RuleRichText', defineComponent({ props: ['text'], setup: props => () => h('span', props.text) }))
  app.component('NuxtLink', defineComponent({ props: ['to'], setup: (props, { slots }) => () => h('a', { href: props.to }, slots.default?.()) }))
  const html = await renderToString(app)
  await fs.writeFile(path.resolve('.tmpwork/backgrounds-render', name + '.html'), html)
  return html
}
const backgrounds = await render('BackgroundsPage')
assert.equal((backgrounds.match(/data-record=/g) || []).length, 73)
assert.equal((backgrounds.match(/<details/g) || []).length, 0)
for (const b of DND55E_BACKGROUNDS) {
  assert.ok(backgrounds.includes(`data-record="${b.id}"`), b.id)
  assert.ok(backgrounds.includes(`/dnd55e/feats?feat=${b.feat.id}`), `${b.id}: feat link`)
  for (const paragraph of b.enoaLead) assert.ok(backgrounds.includes(paragraph), `${b.id}: description`)
  for (const entry of b.equipment.items.filter(e => e.loreAdaptation)) assert.ok(backgrounds.includes(entry.title), `${b.id}: knot equipment`)
}
assert.ok(backgrounds.includes('не выше 20'))
assert.ok(backgrounds.includes('свободная черта вместо Origin'))
assert.ok(backgrounds.includes('Не входят в комплект за 50 зм'))
assert.ok(!backgrounds.includes('/dnd55e/equipment?item=gear-book'), 'paper book link returned')
assert.ok(backgrounds.includes('Инструменты узлового писца'))
const feats = await render('FeatsPage')
assert.ok(feats.includes('Ранее опубликована; баланс требует проверки'))
for (const f of DND55E_HOMEBREW_ORIGIN_FEATS.filter(f => f.status === 'Draft')) {
  assert.ok(!feats.includes(`data-record="${f.id}"`), `${f.id} leaked into catalog`)
  assert.ok(!feats.includes(f.title), `${f.id} draft title leaked`)
}
console.log('Rendered 73 background cards without additional story details and feat catalog. Links, text, labels and Draft exclusion passed. Browser layout not tested.')
