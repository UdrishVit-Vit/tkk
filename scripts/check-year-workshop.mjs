import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import {pathToFileURL} from 'node:url'
import {resolve} from 'node:path'
import {createRenderer,reactive,nextTick} from 'vue'
import {parse,compileScript,compileTemplate} from 'vue/compiler-sfc'
const require=createRequire(import.meta.url)
const filename=resolve('app/components/YearNamingWorkshop.vue')
const {descriptor}=parse(readFileSync(filename,'utf8'),{filename})
assert.equal(compileTemplate({source:descriptor.template.content,filename,id:'threads-ui'}).errors.length,0)
let source=compileScript(descriptor,{id:'threads-ui'}).content
source=`import {computed,ref} from '${pathToFileURL(require.resolve('vue')).href}';\n`+source.replace(/from '(~\/data\/[^']+)'/g,(_,path)=>`from '${pathToFileURL(resolve('app',path.slice(2))).href}'`)
const component=(await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)).default
component.render=()=>null
const renderer=createRenderer({createElement:type=>({type}),createText:text=>({text}),createComment:text=>({text}),setText(){},setElementText(){},parentNode:()=>null,nextSibling:()=>null,insert(){},remove(){},patchProp(){}})
const props=reactive({year:1,era:'Жертва Пуруша',yearName:'Пепельный Симург'})
const app=renderer.createApp({render(){return null}})
// Render a reactive parent so calendar date/name changes reach the child.
const {h}=await import('vue')
let instance
const mounted=renderer.createApp({render:()=>h(component,{...props,ref:vm=>{instance=vm}})})
mounted.mount({})
let state=instance.$.setupState
assert.equal(state.reading.image.id,'simurgh')
assert.equal(state.story.narrator,'diviner')
const divinerText=state.story.counsel
state.narrator='sage'
assert.equal(state.story.narrator,'sage')
assert.notEqual(state.story.counsel,divinerText)
state.narrator='astrologer'
assert.equal(state.story.narrator,'astrologer')
props.year=830;props.era='Время Ветров';props.yearName='Кристальный Барс'
await nextTick()
assert.equal(state.reading.image.id,'panther')
assert.equal(state.reading.aspect.id,'crystal')
assert.equal(state.displayName,'Кристальный Барс')
props.yearName='Местное имя'
await nextTick()
assert.equal(state.reading,null)
assert.equal(state.story,null)
assert.equal(state.displayName,'Местное имя')
mounted.unmount()
console.log('Year threads UI checks passed: Vue compilation, selected year updates and local-name fallback.')
