// Единый стандарт «знаменной кости» Шагай для мира Эноа.
// Бросается 4 кости к4; каждая грань — образ: 1 Бунти, 2 Аюр, 3 Додор, 4 Тахар.
// Результат определяется сигнатурой — сколько каких граней выпало (сумма = 4).

export const SHAGAI_FACES = [
  { value: 1, key: 'bunti', label: 'Бунти', img: '/assets/shagai/bunti.png' },
  { value: 2, key: 'ayur', label: 'Аюр', img: '/assets/shagai/ayur.png' },
  { value: 3, key: 'dodor', label: 'Додор', img: '/assets/shagai/dodor.png' },
  { value: 4, key: 'tahar', label: 'Тахар', img: '/assets/shagai/tahar.png' }
]

export const SHAGAI_KEYS = SHAGAI_FACES.map(f => f.key)

export function faceByValue(value) {
  return SHAGAI_FACES[value - 1] || null
}

// Один бросок 4к4 → подробный результат.
export function rollShagai(count = 4) {
  const dice = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * 4))
  const counts = { bunti: 0, ayur: 0, dodor: 0, tahar: 0 }
  for (const d of dice) counts[SHAGAI_KEYS[d - 1]]++
  const sig = SHAGAI_KEYS.map(k => counts[k])
  return { dice, faces: dice.map(d => SHAGAI_FACES[d - 1].label), counts, sig }
}

// Приведение произвольного объекта счётчиков к [bunti, ayur, dodor, tahar].
export function toSig(counts = {}) {
  return SHAGAI_KEYS.map(k => Number(counts[k] || 0))
}

export function sigKey(sig) {
  return (Array.isArray(sig) ? sig : toSig(sig)).join(',')
}

// «2× Бунти · 2× Аюр» — компактная запись комбинации.
export function shagaiCombo(sig) {
  const arr = Array.isArray(sig) ? sig : toSig(sig)
  return arr.map((n, i) => n ? `${n}× ${SHAGAI_FACES[i].label}` : null).filter(Boolean).join(' · ')
}

// Активные грани комбинации (для тегов): [{ ...face, count }].
export function activeFaces(sig) {
  const arr = Array.isArray(sig) ? sig : toSig(sig)
  return SHAGAI_FACES.map((f, i) => ({ ...f, count: arr[i] })).filter(f => f.count > 0)
}

// Индексация списка по сигнатуре: getSig(item) → [c1,c2,c3,c4] | {bunti,...}.
export function bySignature(list, getSig) {
  const map = {}
  for (const item of list) map[sigKey(getSig(item))] = item
  return map
}
