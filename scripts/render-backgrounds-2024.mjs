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
import { DND55E_FEATS } from '../app/data/dnd55e/feats.js'
import { emphasizeFeatRule } from '../app/utils/featEmphasis.js'
import { DND55E_HOMEBREW_ORIGIN_FEATS } from '../app/data/dnd55e/origin-feats-homebrew.js'
import { ENOA_ORIGIN_DRAFTS } from '../app/data/dnd55e/origin-feats-enoa-drafts.js'
import { FEATS_5E } from '../app/data/feats5e.js'
import { ENOA_AUTHORED_FEATS_2014_V4 } from '../app/data/enoa-authored-feats-v4.js'

await fs.mkdir('.tmpwork/backgrounds-render', { recursive: true })
const shell = defineComponent({
  inheritAttrs: false, props: ['groups'],
  setup(props, { slots }) {
    return () => h('main', props.groups.flatMap(g => g.items.map(item => h('article', { 'data-record': item.id }, [slots.item?.({ item }), slots.body?.({ item })]))))
  }
})
async function compile(name, folder = 'dnd55e/') {
  const filename = `app/components/${folder}${name}.vue`
  const { descriptor } = parse(await fs.readFile(filename, 'utf8'), { filename })
  const script = compileScript(descriptor, { id: name, inlineTemplate: true })
  const code = `import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';\nconst useSeoMeta = () => {};\n` + script.content.replace(/(['"])~\/([^'"]+)\1/g, (_, quote, relative) => JSON.stringify(pathToFileURL(path.resolve('app', relative)).href))
  const modulePath = path.resolve('.tmpwork/backgrounds-render', name + '.mjs')
  await fs.writeFile(modulePath, code)
  const { default: component } = await import(pathToFileURL(modulePath).href)
  return component
}
async function render(name, folder = 'dnd55e/') {
  const component = await compile(name, folder)
  const app = createSSRApp(component)
  app.component('CardSectionNav', await compile('CardSectionNav', ''))
  app.component('OriginFeatEffects', await compile('OriginFeatEffects', ''))
  app.component('RelatedContentLinks', await compile('RelatedContentLinks', ''))
  app.component('ThreadRefPage', shell)
  app.component('RuleRichText', defineComponent({ props: ['text'], setup: props => () => h('span', props.text.replace(/\*\*/g, '')) }))
  app.component('NuxtLink', defineComponent({ props: ['to'], setup: (props, { slots }) => () => h('a', { href: props.to }, slots.default?.()) }))
  const html = await renderToString(app)
  await fs.writeFile(path.resolve('.tmpwork/backgrounds-render', name + '.html'), html)
  return html
}
const backgrounds = await render('BackgroundsPage')
assert.equal((backgrounds.match(/data-record=/g) || []).length, DND55E_BACKGROUNDS.length)
assert.equal((backgrounds.match(/<details/g) || []).length, 0)
for (const b of DND55E_BACKGROUNDS) {
  const positions = ['stats', 'equipment', 'feat', 'story', 'event'].map(section => backgrounds.indexOf(`id="bg-${b.id}-${section}"`))
  assert.ok(positions.every((position, index) => position >= 0 && (!index || position > positions[index - 1])), `${b.id}: section order`)
  assert.ok(backgrounds.includes(`data-record="${b.id}"`), b.id)
  assert.ok(backgrounds.includes(`/dnd55e/feats?feat=${b.feat.id}`), `${b.id}: feat link`)
  for (const paragraph of b.enoaLead) assert.ok(backgrounds.includes(paragraph), `${b.id}: description`)
  for (const entry of b.equipment.items.filter(e => e.loreAdaptation)) assert.ok(backgrounds.includes(entry.title), `${b.id}: knot equipment`)
}
assert.ok(backgrounds.includes('не выше 20'))
assert.ok(!backgrounds.includes('свободная черта вместо Origin'))
assert.ok(backgrounds.includes('Не входят в комплект за 50 зм'))
assert.ok(!backgrounds.includes('/dnd55e/equipment?item=gear-book'), 'paper book link returned')
assert.ok(backgrounds.includes('Инструменты узлового писца'))
const feats = await render('FeatsPage')
for (const html of [backgrounds, feats]) {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])
  assert.equal(new Set(ids).size, ids.length, 'duplicate navigation target')
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(target), `missing section: ${target}`)
}
const plain = feats.replace(/<[^>]+>/g, ' ').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ')
for (const feat of DND55E_FEATS) {
  for (const entry of feat.benefits) {
    assert.equal(emphasizeFeatRule(entry.text).replace(/\*\*/g, ''), entry.text.replace(/\*\*/g, ''), `${feat.id}: emphasis changed rule`)
    assert.ok(plain.includes(entry.text.replace(/\*\*/g, '').replace(/\s+/g, ' ').replace(/(Воспользовавшись этим свойством,|Вы восстанавливаете все потраченные)/g, 'Использование и восстановление $1')), `${feat.id}: effect text changed`)
  }
}
assert.ok(!feats.includes('Ранее опубликована; баланс требует проверки'))
assert.ok(!feats.includes('Авторская механика Эноа'))
assert.ok(!backgrounds.includes('Авторская механика Эноа'))
for (const f of DND55E_HOMEBREW_ORIGIN_FEATS.filter(f => f.status !== 'Approved')) {
  assert.ok(!feats.includes(`data-record="${f.id}"`), `${f.id} leaked into catalog`)
  assert.ok(!feats.includes(f.title), `${f.id} draft title leaked`)
}
// Exercise unpublished text through the real effect component without publishing it.
const effectComponent = await compile('OriginFeatEffects', '')
const proposals = ENOA_ORIGIN_DRAFTS.filter(f => !['mlah-diver','cohort-renegade','nameless'].includes(f.relatedBackgrounds[0]))
assert.equal(proposals.length, 54)
const draftApp = createSSRApp({ render: () => h('main', proposals.map(feat => h(effectComponent, { feat }))) })
draftApp.component('RelatedContentLinks', await compile('RelatedContentLinks', ''))
draftApp.component('NuxtLink', defineComponent({ props: ['to'], setup: (props, { slots }) => () => h('a', { href: props.to }, slots.default?.()) }))
draftApp.component('RuleRichText', defineComponent({ props: ['text'], setup: props => () => h('span', props.text.replace(/\*\*/g, '')) }))
const draftHtml = await renderToString(draftApp)
await fs.writeFile('.tmpwork/backgrounds-render/OriginDrafts.html', draftHtml)
const draftPlain = draftHtml.replace(/<[^>]+>/g, ' ').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ')
for (const feat of proposals) for (const benefit of feat.benefits) {
  assert.ok(draftPlain.includes(benefit.text.replace(/\*\*/g, '').replace(/\s+/g, ' ')), `${feat.id}: draft effect text changed`)
}
assert.ok(!backgrounds.includes('bg-kit-details'))
assert.ok(backgrounds.includes('/dnd55e/equipment?item=tool-mlah-diver-kit'))
assert.ok(backgrounds.includes('4 паразита в ёмкости с водой'))
assert.ok(backgrounds.includes('/dnd55e/equipment?item=gear-dulur'))
assert.ok(backgrounds.includes('Стоимость нового набора, дулуров и ловушки пока не установлена'))
assert.ok(backgrounds.includes('Всегда есть выход'))
assert.ok(feats.includes('Всегда есть выход'))
assert.ok(!backgrounds.includes('старшие смотрят на вас как на почти семью'))
const legacyFeats = await render('feats', '../pages/dnd5e/')
assert.equal((legacyFeats.match(/data-record=/g)||[]).length, FEATS_5E.length)
assert.equal(ENOA_AUTHORED_FEATS_2014_V4.length,55)
for(const f of ENOA_AUTHORED_FEATS_2014_V4){
  assert.ok(legacyFeats.includes(`data-record="${f.id}"`),f.id)
  for(const text of f.benefits)assert.ok(legacyFeats.includes(text.replace(/\*\*/g,'')),f.id+': missing 2014 rule')
}
console.log(`Rendered ${DND55E_BACKGROUNDS.length} backgrounds, ${DND55E_FEATS.length} feats 2024, ${FEATS_5E.length} feats 2014 and 54 archived draft effect cards. Text and links passed; browser layout not tested.`)
