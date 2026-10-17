// Immutable modules are shared; a failed import is evicted so later calls can retry.
const requests = new Map()
export function loadRuleTextTools(edition) {
  const key = edition === '2024' ? '2024' : '2014'
  if (!requests.has(key)) {
    const request = (key === '2024'
      ? import('./ruleText55e.js').then(m => ({ tokenize: m.tokenizeRuleText55e, tooltip: m.getRuleTooltip55e }))
      : import('./ruleText5e.js').then(m => ({ tokenize: m.tokenizeRuleText, tooltip: m.getRuleTooltip })))
      .catch(error => { requests.delete(key); throw error })
    requests.set(key, request)
  }
  return requests.get(key)
}
