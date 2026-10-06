const socket = new WebSocket('ws://127.0.0.1:9229/95cccad7-e854-4e98-99dc-ca86a68674a2')
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve); socket.addEventListener('error', reject) })
let next = 0, pausedResolve
const pending = new Map()
const paused = new Promise(resolve => { pausedResolve = resolve })
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data)
  if (message.method === 'Debugger.paused') pausedResolve(message.params)
  if (message.id && pending.has(message.id)) {
    const [resolve, reject] = pending.get(message.id); pending.delete(message.id)
    message.error ? reject(message.error) : resolve(message.result)
  }
})
const call = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++next; pending.set(id, [resolve, reject]); socket.send(JSON.stringify({ id, method, params }))
})
await call('Debugger.enable')
try {
  await call('Debugger.pause')
  const { callFrames } = await paused
  console.log(callFrames.slice(0, 10).map(frame => ({ function: frame.functionName, location: frame.location })))
  for (const frame of callFrames.filter(frame => ['packageResolve', 'resolveId', 'tryResolve'].includes(frame.functionName))) {
    const result = await call('Debugger.evaluateOnCallFrame', { callFrameId: frame.callFrameId, expression: 'JSON.stringify({specifier:typeof specifier!=="undefined"?specifier:null,base:typeof base!=="undefined"?base.href:null,originalId:typeof originalId!=="undefined"?originalId:null,packageJsonPath:typeof packageJsonPath!=="undefined"?packageJsonPath:null,importer:typeof importer!=="undefined"?importer:null,id:typeof id!=="undefined"?id:null})', returnByValue: true })
    console.log(frame.functionName, result.result.value)
  }
} finally { await call('Debugger.resume'); socket.close() }
