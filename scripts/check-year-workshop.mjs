import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { createRenderer } from 'vue'
import { parse, compileScript, compileTemplate } from 'vue/compiler-sfc'
const require = createRequire(import.meta.url)
const filename = resolve('app/components/YearNamingWorkshop.vue')
const { descriptor } = parse(readFileSync(filename, 'utf8'), {filename})
const template = compileTemplate({source: descriptor.template.content, filename, id:'year-workshop'})
assert.equal(template.errors.length, 0)
let source = compileScript(descriptor, {id:'year-workshop'}).content
source = `import {ref,computed} from '${pathToFileURL(require.resolve('vue')).href}';\n` + source.replace(/from '(~\/data\/[^']+)'/g, (_, path) => `from '${pathToFileURL(resolve('app', path.slice(2))).href}'`)
const component = (await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)).default
component.render = () => null
const renderer = createRenderer({createElement: type=>({type}),createText:text=>({text}),createComment:text=>({text}),setText(){},setElementText(){},parentNode:()=>null,nextSibling:()=>null,insert(){},remove(){},patchProp(){}})
let applied = null
const app = renderer.createApp(component, {year:6,era:'Жертва Пуруша',onApply: name => {applied=name}})
const state = app.mount({}).$.setupState
assert.equal(state.elapsed,829)
assert.equal(state.proposedName,'Золотая Саламандра')
assert.equal(state.preview.length,1225)
assert.equal(state.embraceElapsed,138)
state.emit('apply',state.proposedName)
assert.equal(applied,'Золотая Саламандра')
state.elapsed=830
assert.equal(state.proposedName,'Золотой Скорпион')
assert.equal(state.embraceElapsed,139)
state.elapsed=500000
assert.equal(state.result.round,409)
state.elapsed=-1
assert.equal(state.proposedName,'')
assert.equal(state.preview.length,0)
state.imageRoll='4–4–4–4'
state.aspectRoll='4 4 4 4'
assert.equal(state.diceResult.name,'Венценосная Мандрагора')
state.emit('apply',state.diceResult.name)
assert.equal(applied,'Венценосная Мандрагора')
state.imageRoll='1115'
assert.equal(state.diceResult,null)
state.rollName()
assert(state.diceResult)
app.unmount()
console.log('Working naming UI checks passed: current references, 1225-year preview, long dates and applying a name.')
