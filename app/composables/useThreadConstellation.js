import { useKnotCanvas } from '~/composables/useKnotCanvas.js'

// The catalogue list view every system shares: a ring of portrait nodes wired
// back to a central knot with brutalist right-angle "circuit board" threads,
// warm sparks travelling along them and a procedural mandala for anything that
// has no artwork yet. Extracted so races, ancestries and classes draw the same
// map instead of three near-copies drifting apart.

const RL_TH = {
  ink: 'rgba(var(--theme-text-rgb),',
  glow: 'rgba(176,188,232,',
  thread: 'rgba(196,208,240,',
  hi: '238,243,255',
  disc: '7,8,12'
}

const RL_SPARK_COLORS = ['255,236,196', '255,210,150', '214,230,255', '255,224,236', '226,255,236', '255,250,235']

function rlMarker(x, y, s, faint) {
  return {
    d: 'M ' + x + ' ' + (y - s) + ' L ' + (x + s) + ' ' + y + ' L ' + x + ' ' + (y + s) + ' L ' + (x - s) + ' ' + y + ' Z',
    style: faint
      ? { stroke: RL_TH.thread + '0.4)', strokeWidth: '1', fill: 'rgba(var(--theme-surface-rgb),0.95)' }
      : { stroke: 'rgba(246,208,126,0.9)', strokeWidth: '1.2', fill: 'rgba(238,190,98,0.9)' }
  }
}

// Out from the centre, two right-angle bends instead of one (a little stagger
// on the second leg) plus a short decorative stub ticking off the first bend.
function rlElbow(x, y, i) {
  const horizontal = Math.abs(x) >= Math.abs(y)
  const bx = horizontal ? Math.round(x * 0.42) : Math.round(x * (0.5 + (i % 3) * 0.06))
  const by = horizontal ? Math.round(y * (0.5 + (i % 3) * 0.06)) : Math.round(y * 0.42)
  const cx = horizontal ? Math.round(x * 0.78) : bx
  const cy = horizontal ? by : Math.round(y * 0.78)
  const d = `M0 0 L ${bx} ${by} L ${cx} ${cy} L ${x} ${y}`
  const beads = [[bx, by, 3.4, false], [cx, cy, 3, true]]
  const stubLen = 14
  const stub = horizontal
    ? `M ${bx} ${by} L ${bx} ${by + (by >= 0 ? stubLen : -stubLen)}`
    : `M ${bx} ${by} L ${bx + (bx >= 0 ? stubLen : -stubLen)} ${by}`
  return { d, beads, stub }
}

// Procedural mandala glyph — deterministic per index, so a node keeps the same
// emblem between renders.
export function threadEmblem(i) {
  const st = 'rgba(232,226,208,.92)'
  const r2 = (k) => { const v = Math.sin((i + 1) * (k * 12.9 + 7.3)) * 43758.5; return v - Math.floor(v) }
  const axes = [3, 4, 5, 6, 4, 6, 5, 4][i % 8]
  const ry = 12 + Math.round(r2(1) * 7)
  const step = 180 / axes
  let g = ''
  for (let a = 0; a < axes; a++) g += '<ellipse rx="36" ry="' + ry + '" transform="rotate(' + (a * step).toFixed(1) + ')"/>'
  if (r2(2) > 0.5) { const ir = 20; for (let a = 0; a < axes; a++) g += '<ellipse rx="' + ir + '" ry="' + Math.round(ir * 0.42) + '" transform="rotate(' + (a * step + step / 2).toFixed(1) + ')"/>' }
  const cr = 5 + Math.round(r2(3) * 4)
  g += '<circle r="' + cr + '"/>'
  if (r2(4) > 0.45) g += '<circle r="26" stroke-dasharray="1.5 5" opacity="0.55"/>'
  if (r2(5) > 0.6) g += '<circle r="42" stroke-dasharray="1 7" opacity="0.4"/>'
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><g fill="none" stroke="' + st + '" stroke-width="1.2">' + g + '</g></svg>'
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
}

/**
 * @param items    ref/computed of the catalogue entries to place on the ring
 * @param options  label(item) -> node caption, portrait(item) -> image url,
 *                 isDetail — ref that is truthy while a detail sheet is open
 *                 (the canvas animation pauses instead of burning frames).
 */
export function useThreadConstellation(items, options = {}) {
  const {
    label = (item) => item?.title || '',
    portrait = () => '',
    isDetail = null,
    radiusX = 360,
    radiusY = 312
  } = options

  const canvasEl = ref(null)
  const { start, stop } = useKnotCanvas(canvasEl, 46)
  const center = reactive({ x: 0, y: 0 })
  const fit = ref(1)

  function applyFit() {
    if (!import.meta.client) return
    center.x = window.innerWidth / 2 + 34
    center.y = window.innerHeight / 2
    fit.value = Math.max(0.5, Math.min(1, (window.innerWidth / 2 - 90) / radiusX, (window.innerHeight / 2 - 28) / radiusY))
  }

  onMounted(() => {
    if (!isDetail?.value) start()
    applyFit()
    window.addEventListener('resize', applyFit)
  })
  onUnmounted(() => { stop(); window.removeEventListener('resize', applyFit) })
  if (isDetail) {
    watch(isDetail, (val) => { if (!val) { start(); applyFit() } else { stop() } })
  }

  let linkIndex = 0
  function rlLink(d, open) {
    const idx = linkIndex++
    const a = open ? 0.74 : 0.42
    const bw = open ? 2.1 : 1.6
    const gc = RL_SPARK_COLORS[idx % RL_SPARK_COLORS.length]
    return {
      d,
      base: { stroke: RL_TH.thread + a + ')', strokeWidth: bw, fill: 'none', strokeLinejoin: 'round', strokeLinecap: 'round', transition: 'stroke .45s, stroke-width .45s' },
      glow: { stroke: 'rgba(' + gc + ',0.1)', strokeWidth: '5', fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', animation: 'rlLinePulse ' + (4.5 + (idx % 6) * 0.7) + 's ease-in-out infinite', animationDelay: (idx * 0.5) + 's' },
      flow: { stroke: 'rgba(' + RL_TH.hi + ',' + (open ? 0.5 : 0.26) + ')', strokeWidth: Math.max(1, bw * 0.55), fill: 'none', strokeLinejoin: 'round', strokeLinecap: 'round', strokeDasharray: '2 560', animation: 'rlThreadBead 15s linear infinite', animationDelay: (idx * 0.6) + 's' },
      sparkR: 2.2 + (idx % 3) * 0.6,
      sparkStyle: { fill: 'rgba(' + gc + ',0.98)', filter: 'drop-shadow(0 0 5px rgba(246,208,126,0.85))' },
      sparkDur: (10 + (idx % 7) * 2.2) + 's',
      sparkBegin: (-(idx * 1.7)) + 's'
    }
  }

  const map = computed(() => {
    linkIndex = 0
    const list = unref(items) || []
    const n = list.length
    const nodes = [], connectors = [], markers = [], stubs = []
    list.forEach((item, i) => {
      // Even angular spacing from the top, clockwise, so an already-sorted list
      // reads as one clean sweep around the circle.
      const angle = (-90 + i * (360 / n)) * Math.PI / 180
      const x = Math.round(Math.cos(angle) * radiusX)
      const y = Math.round(Math.sin(angle) * radiusY)
      const { d, beads, stub } = rlElbow(x, y, i)
      connectors.push(rlLink(d, false))
      beads.forEach(([bx, by, s, faint]) => markers.push(rlMarker(bx, by, s, faint)))
      stubs.push(stub)
      nodes.push({
        x, y, item,
        emblem: threadEmblem(i),
        portrait: portrait(item),
        label: label(item),
        labelAbove: y < 0
      })
    })
    return { nodes, connectors, markers, stubs }
  })

  return { canvasEl, center, fit, map, start, stop, applyFit }
}
