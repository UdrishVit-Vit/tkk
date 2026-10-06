import { writeFileSync } from 'node:fs'
const socket = new WebSocket('ws://127.0.0.1:9229/95cccad7-e854-4e98-99dc-ca86a68674a2')
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve); socket.addEventListener('error', reject) })
let next = 0
const pending = new Map()
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data)
  if (message.id && pending.has(message.id)) {
    const [resolve, reject] = pending.get(message.id)
    pending.delete(message.id)
    message.error ? reject(message.error) : resolve(message.result)
  }
})
const call = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++next; pending.set(id, [resolve, reject]); socket.send(JSON.stringify({ id, method, params }))
})
const identity = await call('Runtime.evaluate', { expression: 'process.pid', returnByValue: true })
if (identity.result.value !== 17032) throw new Error('Unexpected debugger process')
await call('Profiler.enable')
await call('Profiler.start')
await new Promise(resolve => setTimeout(resolve, 5000))
const { profile } = await call('Profiler.stop')
writeFileSync(new URL('./build.cpuprofile', import.meta.url), JSON.stringify(profile))
console.log(JSON.stringify(profile.nodes.filter(node => node.hitCount).sort((a, b) => b.hitCount - a.hitCount).slice(0, 15).map(node => ({ hits: node.hitCount, function: node.callFrame.functionName, file: node.callFrame.url, line: node.callFrame.lineNumber + 1 })), null, 2))
socket.close()
