<script setup>
import { CLASSDATA } from '~/data/classdata.js'
import { SYSTEMS, POOL, IMG, THEMES, nodeImg, classImg, layoutPoints, entriesFor } from '~/data/hub.js'
import { useKnotCanvas } from '~/composables/useKnotCanvas.js'

const props = defineProps({
  initialSystem: { type: String, default: '' },
  initialSection: { type: String, default: '' },
  initialClass: { type: String, default: '' },
  classRouteBase: { type: String, default: '' },
  syncQuery: { type: Boolean, default: true }
})

const route = useRoute()
const router = useRouter()

const state = reactive({
  view: 'home', active: null, group: null, section: null, cls: null, overlay: null,
  theme: 'void', authed: false, bookmarks: [], query: '', cardQuery: '', classToolMessage: '', infOpen: false, invOpen: false,
  classMode: 'base', activeArchetype: null, archetypeSource: 'all', classCardTab: 'skills', classHitsOpen: true, classProfOpen: true,
  classEquipOpen: true, classTableOpen: true, classFilterOpen: false, classFilterTouched: false, classFeatureSource: 'all',
  classFeatureLevel: 'all', classFeatureSubclass: 'base', subclassesOpen: false, openSubclass: null
})

const CLASS_QUERY = {
  'Бард': 'bard',
  'Варвар': 'barbarian',
  'Воин': 'fighter',
  'Волшебник': 'wizard',
  'Дрифтер': 'drifter',
  'Друид': 'druid',
  'Жрец': 'cleric',
  'Изобретатель': 'inventor',
  'Колдун': 'warlock',
  'Монах': 'monk',
  'Паладин': 'paladin',
  'Плут': 'rogue',
  'Следопыт': 'ranger',
  'Чародей': 'sorcerer',
  'Шаман': 'shaman'
}
const CLASS_FROM_QUERY = Object.fromEntries(Object.entries(CLASS_QUERY).map(([name, slug]) => [slug, name]))
const classSlug = (name) => CLASS_QUERY[name] || ''
const featureSlug = value => String(value || '')
  .toLowerCase()
  .replace(/ё/g, 'е')
  .replace(/[^a-zа-я0-9]+/giu, '-')
  .replace(/^-+|-+$/g, '')
const classFeatureId = (...parts) => parts.map(featureSlug).filter(Boolean).join('--')
const classFeatureUrl = id => `/dnd5e/class-features?feature=${encodeURIComponent(id)}`

if (!props.initialClass && route.query.section === 'classes' && route.query.class && CLASS_FROM_QUERY[route.query.class]) {
  navigateTo(`/dnd5e/classes/${route.query.class}`, { replace: true })
}
if (!props.initialSystem && route.path === '/' && route.query.system === '5e' && !route.query.section && !route.query.class) {
  navigateTo('/dnd5e', { replace: true })
}

// Allow deep-linking straight into a system map, e.g. /dnd5e (used by the
// races page's central node to jump back to "D&D 5e" instead of the home view).
const initialSystem = props.initialSystem || route.query.system
if (initialSystem && SYSTEMS.some(s => s.id === initialSystem)) {
  state.view = 'system'
  state.active = initialSystem
}
const initialSection = props.initialSection || null
if (initialSection) state.section = initialSection
const initialClass = props.initialClass || null
if (initialClass) {
  if (!state.active) {
    state.view = 'system'
    state.active = '5e'
  }
  state.section = 'Классы'
  state.cls = initialClass
}

watch(() => [props.initialSystem, props.initialSection, props.initialClass], ([system, section, cls]) => {
  if (!system && !section && !cls) return
  if (system && SYSTEMS.some(s => s.id === system)) {
    state.view = 'system'
    state.active = system
  }
  if (section) state.section = section
  if (cls) {
    state.section = 'Классы'
    state.cls = cls
  } else if (section === 'Классы') {
    state.cls = null
  }
  state.classMode = 'base'
  state.activeArchetype = null
  state.classCardTab = 'skills'
  state.classHitsOpen = true
  state.classProfOpen = true
  state.classEquipOpen = true
  state.classTableOpen = true
  state.classFilterOpen = false
  state.classFilterTouched = false
  state.classFeatureSource = 'all'
  state.classFeatureLevel = 'all'
  state.classFeatureSubclass = 'base'
  state.subclassesOpen = false
  state.openSubclass = null
})

// Keep only the selected system in the root map query. Class pages have clean
// routes such as /dnd5e/classes/bard.
watch(() => state.active, (id) => {
  if (!props.syncQuery) return
  const next = { ...route.query }
  if (id) next.system = id
  else delete next.system
  delete next.section
  delete next.class
  router.replace({ query: next })
})

const canvasEl = ref(null)
const { start, stop } = useKnotCanvas(canvasEl, 46)
onMounted(start)
onUnmounted(stop)

function onKeydown(e) { if (e.key === 'Escape') { state.overlay = null; state.section = null } }
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

const fit = ref(1)
const center = reactive({ x: 0, y: 0 })
function applyFit() {
  center.x = window.innerWidth / 2 + 34
  center.y = window.innerHeight / 2
  const sys = state.view === 'system'
  const wide = sys && state.section === 'Классы'
  const HW = wide ? 712 : 645, HH = wide ? 470 : 500
  fit.value = sys ? Math.max(0.5, Math.min(1, (window.innerWidth/2 - 90)/HW, (window.innerHeight/2 - 28)/HH)) : 1
}
onMounted(() => { applyFit(); window.addEventListener('resize', applyFit) })
onUnmounted(() => window.removeEventListener('resize', applyFit))
watch(() => [state.view, state.section], applyFit)

function selectSystem(id) {
  if (id === '5e' && !props.initialSystem) {
    navigateTo('/dnd5e')
    return
  }
  Object.assign(state, { view:'system', active:id, group:null, section:null, overlay:null })
}
function recenter() { Object.assign(state, { view:'home', active:null, group:null, section:null }) }
function goUp() {
  const sys = SYSTEMS.find(x => x.id === state.active)
  if (state.cls) closeClass()
  else if (state.section) state.section = null
  else if (sys?.groups && state.group != null) { state.group = null; state.section = null }
  else recenter()
}
function crumbSystem() {
  const sys = SYSTEMS.find(x => x.id === state.active)
  if (sys?.groups) { state.group = null; state.section = null } else recenter()
}
// "Расы и происхождения" (D&D 5e/2014) and "Виды" (D&D 5.5e/2024) are different
// rulesets with their own terms — each gets its own page branch instead of
// sharing one /races list, the same way Pathfinder will get its own branch.
const RACE_SECTION_ROUTES = { 'Расы и происхождения': '/dnd5e/races', 'Черты': '/dnd5e/feats', 'Особенности классов': '/dnd5e/class-features', 'Предыстории': '/dnd5e/backgrounds', 'Заклинания': '/dnd5e/spells', 'Оружие': '/dnd5e/weapons', 'Доспехи': '/dnd5e/armor', 'Снаряжение': '/dnd5e/equipment', 'Драгоценности': '/dnd5e/jewelry', 'Магические предметы': '/dnd5e/magic-items', 'Бестиарий': '/dnd5e/bestiary', 'Знамения': '/dnd5e/omens', 'Ширма (справочник)': '/dnd5e/screens' }
function openSection(name) {
  if (RACE_SECTION_ROUTES[name]) { navigateTo(RACE_SECTION_ROUTES[name]); return }
  state.section = state.section === name ? null : name; state.cls = null
}
function openClass(name) {
  const nextClass = state.cls === name ? null : name
  const routeBase = props.classRouteBase || (state.active === '5e' ? '/dnd5e/classes' : '')
  if (routeBase) {
    if (nextClass && classSlug(nextClass)) navigateTo(`${routeBase}/${classSlug(nextClass)}`)
    else navigateTo(routeBase)
    return
  }
  state.cls = nextClass
  state.infOpen = false
  state.invOpen = false
  state.classMode = 'base'
  state.activeArchetype = null
  state.archetypeSource = 'all'
  state.classCardTab = 'skills'
  state.classHitsOpen = true
  state.classProfOpen = true
  state.classEquipOpen = true
  state.classTableOpen = true
  state.classFilterOpen = false
  state.classFilterTouched = false
  state.classFeatureSource = 'all'
  state.classFeatureLevel = 'all'
  state.classFeatureSubclass = 'base'
  state.subclassesOpen = false
  state.openSubclass = null
}
function closeClass() {
  const routeBase = props.classRouteBase || (state.active === '5e' ? '/dnd5e/classes' : '')
  if (routeBase) {
    navigateTo(routeBase)
    return
  }
  state.cls = null
}
function toggleOverlay(name) { state.overlay = state.overlay === name ? null : name }
function stopClick(e) { e?.stopPropagation?.() }

// ---- node / connector / marker builders (ported 1:1 from the prototype) ----
function emblem(i) {
  const st = 'rgba(232,226,208,.92)'
  const r2 = (k) => { const v = Math.sin((i+1)*(k*12.9+7.3))*43758.5; return v - Math.floor(v) }
  const axes = [3,4,5,6,4,6,5,4][i%8]
  const ry = 12 + Math.round(r2(1)*7)
  const step = 180/axes
  let g = ''
  for (let a=0;a<axes;a++) g += '<ellipse rx="36" ry="'+ry+'" transform="rotate('+(a*step).toFixed(1)+')"/>'
  if (r2(2)>0.5) { const ir=20; for (let a=0;a<axes;a++) g += '<ellipse rx="'+ir+'" ry="'+Math.round(ir*0.42)+'" transform="rotate('+(a*step+step/2).toFixed(1)+')"/>' }
  const cr = 5 + Math.round(r2(3)*4)
  g += '<circle r="'+cr+'"/>'
  if (r2(4)>0.45) g += '<circle r="26" stroke-dasharray="1.5 5" opacity="0.55"/>'
  if (r2(5)>0.6) g += '<circle r="42" stroke-dasharray="1 7" opacity="0.4"/>'
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><g fill="none" stroke="'+st+'" stroke-width="1.2">'+g+'</g></svg>'
  return 'data:image/svg+xml,'+encodeURIComponent(svg)
}

function mkNode(o, th) {
  const gs = 1
  const src = o.img || o.mask || null
  const hasImg = !!src
  const shimmer = !!o.mask && !o.img
  const blur = (hasImg ? (o.active?12:7) : (o.active?16:8)) * gs
  const ga = o.active ? '0.5' : '0.2'
  const gap = Math.round(o.knot*0.12)+6
  const dc = th.disc || '7,8,12'
  return {
    label: o.label, sub: o.sub || '', onClick: o.onClick || null,
    noImg: !hasImg,
    hasFrame: o.frame === 'diamond',
    frameStyle: { position:'absolute', left:'0', top:'0',
      width:Math.round(o.knot*1.42)+'px', height:Math.round(o.knot*1.42)+'px',
      transform:'translate(-50%,-50%) rotate(45deg)',
      border:'1px solid '+th.thread+(o.active?0.85:0.5)+')', borderRadius:'7px',
      boxShadow:'0 0 14px '+th.glow+(o.active?0.3:0.16)+'), inset 0 0 12px '+th.glow+'0.06)',
      pointerEvents:'none', transition:'border-color .4s, box-shadow .4s' },
    boxStyle: { position:'absolute', left:o.cx, top:'50%', width:'0', height:'0',
      transform:'translate('+o.x+'px,'+o.y+'px) scale('+o.scale+')', transformOrigin:'center', opacity:o.opacity,
      transition:'transform .5s cubic-bezier(.34,1.3,.5,1), opacity .55s ease',
      cursor:(o.opacity && o.onClick)?'pointer':'default', pointerEvents:o.opacity?'auto':'none', color:o.color },
    knotStyle: { position:'absolute', left:'0', top:'0', transform:'translate(-50%,-50%)',
      width:o.knot+'px', height:o.knot+'px', color:o.color,
      filter:'drop-shadow(0 0 '+blur+'px '+th.glow+ga+'))',
      transition:'filter .45s, color .5s, transform .45s cubic-bezier(.34,1.4,.5,1)',
      backgroundImage: hasImg ? ('url("'+src+'")') : 'none',
      backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition:'center',
      animation: hasImg ? (shimmer ? ('knotTwinkle '+(o.active?2.8:4.8)+'s ease-in-out infinite') : 'none') : ('knotSpin '+(o.active?70:150)+'s linear infinite') },
    discStyle: { position:'absolute', left:'0', top:'0', transform:'translate(-50%,-50%)',
      width:Math.round(o.knot*1.16)+'px', height:Math.round(o.knot*1.16)+'px', borderRadius:'50%',
      background:'radial-gradient(circle, rgba('+dc+',1) 44%, rgba('+dc+',0) 74%)', pointerEvents:'none' },
    textStyle: { position:'absolute', left:'0', top:'0', width:'180px',
      display:'flex', flexDirection:'column', alignItems:'center', gap:'2px', pointerEvents:'none',
      transform: o.labelAbove
        ? ('translate(-50%, calc(-100% - '+(Math.round(o.knot/2)+gap)+'px))')
        : ('translate(-50%, '+(Math.round(o.knot/2)+gap)+'px)') },
    labelStyle: { fontFamily:"'Cormorant Garamond',serif", fontSize:(o.lsize||16)+'px', fontWeight:500,
      letterSpacing:o.dense?'.05em':'.2em', textTransform:'uppercase', color:o.color, opacity:o.active?1:0.85,
      whiteSpace:o.wrap?'normal':'nowrap', maxWidth:o.wrap?'160px':'none', textAlign:'center', lineHeight:1.18,
      textShadow:'0 0 7px rgba(5,6,10,.95), 0 0 16px rgba(5,6,10,.85), 0 1px 3px rgba(5,6,10,.95)',
      transition:'opacity .5s' },
    subStyle: { fontFamily:"'Hanken Grotesk',sans-serif", fontSize:'9px', letterSpacing:'.32em',
      textTransform:'uppercase', color:o.color, opacity:o.sub?0.55:0, textAlign:'center',
      textShadow:'0 0 6px rgba(5,6,10,.95), 0 0 13px rgba(5,6,10,.85)' },
  }
}

let _ci = 0
function mkLink(d, kind, open, th) {
  const idx = _ci++
  const a  = kind==='group' ? 0.5 : (kind==='cross' ? 0.16 : (open ? 0.74 : 0.42))
  const bw = kind==='group' ? 1.7 : (kind==='cross' ? 1.1 : (open ? 2.1 : 1.5))
  const base = { stroke: th.thread + a + ')', strokeWidth:bw, fill:'none', strokeLinejoin:'round', strokeLinecap:'round',
    transition:'stroke .45s, stroke-width .45s' }
  if (kind==='cross') base.strokeDasharray = '4 10'
  const flowA = kind==='cross' ? 0 : (open ? 0.5 : 0.26)
  return { d, base, hasGlow:false, hasSpark:false,
    flow:{ stroke:'rgba('+th.hi+','+flowA+')', strokeWidth:Math.max(1, bw*0.55), fill:'none',
      strokeLinejoin:'round', strokeLinecap:'round', strokeDasharray:'2 560',
      animation:'threadBead 15s linear infinite', animationDelay:(idx*0.6)+'s' } }
}
function mkThread(d, open, dash, th) {
  const idx = _ci++
  const glowCols = ['255,236,196','255,210,150','214,230,255','255,224,236','226,255,236']
  const gc = glowCols[idx % glowCols.length]
  const base = { stroke: th.thread + (open?0.7:0.52) + ')', strokeWidth:open?2.2:1.7, fill:'none',
    strokeLinecap:'round', strokeLinejoin:'round', transition:'stroke .45s, stroke-width .45s' }
  if (dash) base.strokeDasharray = dash
  return { d, base,
    hasGlow:true,
    glow:{ stroke:'rgba('+gc+',0.14)', strokeWidth:'6', fill:'none', strokeLinecap:'round', strokeLinejoin:'round',
      animation:'linePulse '+(4.5+(idx%6)*0.6)+'s ease-in-out infinite', animationDelay:(idx*0.4)+'s' },
    flow:{ stroke:'rgba('+th.hi+',0.22)', strokeWidth:'1', fill:'none', strokeLinecap:'round',
      strokeDasharray:'2 560', animation:'threadBead 16s linear infinite', animationDelay:(idx*0.7)+'s' },
    hasSpark:true,
    sparkR: 2.4 + (idx%3)*0.7,
    sparkStyle:{ fill:'rgba('+gc+',0.98)', filter:'drop-shadow(0 0 5px rgba(246,208,126,0.85))' },
    sparkDur: (9 + (idx%7)*1.6) + 's',
    sparkBegin: (-(idx*1.3)) + 's'
  }
}
function mkMarker(x, y, s, open, th) {
  return {
    d: 'M '+x+' '+(y-s)+' L '+(x+s)+' '+y+' L '+x+' '+(y+s)+' L '+(x-s)+' '+y+' Z',
    style: open
      ? { stroke:'rgba(246,208,126,0.95)', strokeWidth:'1.5', fill:'rgba(238,190,98,0.95)', filter:'drop-shadow(0 0 7px rgba(236,196,120,0.9))' }
      : { stroke: th.thread+'0.66)', strokeWidth:'1', fill:'rgba(7,8,12,0.95)' }
  }
}

const CX = 'calc(50% + 34px)'

// ---- view model: mirrors the prototype's renderVals() ----
const vm = computed(() => {
  _ci = 0
  const S = state
  const th = THEMES[S.theme] || THEMES.void
  const ink = th.ink + '0.92)'
  const inkHi = th.ink + '1)'
  const nodes = [], connectors = [], markers = []
  const sysObj = S.active ? SYSTEMS.find(s => s.id === S.active) : null

  if (S.view === 'home') {
    nodes.push(mkNode({ cx:CX, x:0, y:0, scale:1.2, opacity:1, color:inkHi, knot:128,
      img:IMG.main, label:'', sub:'Knot of Knots', lsize:30, onClick:null }, th))
    const R = 212
    SYSTEMS.forEach((s, i) => {
      const ang = (-90 + i*90) * Math.PI/180
      const x = Math.cos(ang)*R, y = Math.sin(ang)*R
      nodes.push(mkNode({ cx:CX, x, y, scale:1, opacity:1, color:ink, knot:96,
        img:IMG[s.id], label:s.name, sub:s.tag, lsize:15, onClick:() => selectSystem(s.id) }, th))
      connectors.push(mkLink('M0 0 L '+Math.round(x)+' '+Math.round(y), 'group', false, th))
    })
  } else if (S.section && S.active && sysObj) {
    const entries = entriesFor(S.active, S.section).map(e => String(e).split('|')[0].split(' · ')[0])
    const n = entries.length
    const squareForm = S.section === 'Классы'
    if (squareForm) {
      const POS = [
        [-486,-286],[-162,-286],[162,-286],[486,-286],
        [-560,-96],[-262,-96],[262,-96],[560,-96],
        [-560, 96],[-262, 96],[262, 96],[560, 96],
        [-440, 300],[0, 320],[440, 300]
      ]
      const P = (i) => POS[i] || [0,0]
      const seg = (d, dash) => connectors.push(mkThread(d, false, dash, th))
      const bead = (x, y, s) => markers.push(mkMarker(Math.round(x), Math.round(y), s||4, false, th))
      ;[5,6,9,10].forEach(i => { seg('M0 0 L '+P(i)[0]+' '+P(i)[1]); bead(P(i)[0]*0.5, P(i)[1]*0.5, 4) })
      const sideLink = (inner, outer) => {
        const a=P(inner), b=P(outer)
        seg('M '+a[0]+' '+a[1]+' L '+b[0]+' '+b[1])
        bead(a[0]+(b[0]-a[0])*0.55, a[1], 4)
      }
      sideLink(5,4); sideLink(9,8); sideLink(6,7); sideLink(10,11)
      seg('M0 0 L 0 -286 L '+P(1)[0]+' -286 L '+P(1)[0]+' '+P(1)[1])
      seg('M0 0 L 0 -286 L '+P(2)[0]+' -286 L '+P(2)[0]+' '+P(2)[1])
      seg('M '+P(1)[0]+' '+P(1)[1]+' L '+P(0)[0]+' '+P(1)[1]+' L '+P(0)[0]+' '+P(0)[1])
      seg('M '+P(2)[0]+' '+P(2)[1]+' L '+P(3)[0]+' '+P(2)[1]+' L '+P(3)[0]+' '+P(3)[1])
      bead(0,-286,4); bead(P(1)[0],-286,4); bead(P(2)[0],-286,4)
      seg('M0 0 L 0 '+P(13)[1])
      seg('M0 0 L 0 300 L '+P(12)[0]+' 300 L '+P(12)[0]+' '+P(12)[1])
      seg('M0 0 L 0 300 L '+P(14)[0]+' 300 L '+P(14)[0]+' '+P(14)[1])
      bead(0,300,4); bead(P(12)[0],300,4); bead(P(14)[0],300,4)
      entries.forEach((nm, i) => {
        const p = P(i)
        const isOpen = S.cls === nm
        const bigOnes = { 'Воин':1.2, 'Монах':1.2 }
        const kSize = Math.round(116 * (bigOnes[nm] || 1))
        nodes.push(mkNode({ cx:CX, x:p[0], y:p[1], scale:isOpen?1.12:1, opacity:1, color:isOpen?inkHi:ink, knot:kSize,
          img:(classImg(nm)||emblem(i)), label:nm, sub:'', lsize:13.5, dense:true, wrap:true, labelAbove:false, active:isOpen, onClick:() => openClass(nm) }, th))
      })
      nodes.unshift(mkNode({ cx:CX, x:0, y:0, scale:1.05, opacity:1, color:inkHi, knot:176,
        mask:nodeImg(S.section), label:S.section, sub:sysObj.name, lsize:25, active:true, onClick:() => openSection(S.section) }, th))
    } else {
      const ringOf = (count, idx, radius, squash, phase) => {
        const a = (-90 + phase + idx*(360/count)) * Math.PI/180
        return { x: Math.round(Math.cos(a)*radius), y: Math.round(Math.sin(a)*radius*squash) }
      }
      entries.forEach((nm, i) => {
        let p
        if (n<=8) p = ringOf(n, i, 360, 0.82, 0)
        else {
          const inner = Math.ceil(n/2), outer = n-inner
          if (i<inner) p = ringOf(inner, i, 250, 0.82, 0)
          else p = ringOf(outer, i-inner, 430, 0.84, (360/outer)/2)
        }
        connectors.push(mkLink('M0 0 L '+p.x+' '+p.y, 'section', false, th))
        markers.push(mkMarker(Math.round(p.x*0.5), Math.round(p.y*0.5), 4, false, th))
        nodes.push(mkNode({ cx:CX, x:p.x, y:p.y, scale:1, opacity:1, color:ink, knot:54,
          label:nm, sub:'', lsize:12.5, dense:true, wrap:true, labelAbove:(p.y<0), onClick:null }, th))
      })
      nodes.unshift(mkNode({ cx:CX, x:0, y:0, scale:1.1, opacity:1, color:inkHi, knot:120,
        mask:nodeImg(S.section), label:S.section, sub:sysObj.name, lsize:23, active:true, onClick:() => openSection(S.section) }, th))
    }
  } else if (sysObj) {
    if (sysObj.groups) {
      const G = sysObj.groups
      const ORI = ['up','right','down','left']
      const secPos = {}
      G.forEach((g, gi) => {
        const o = ORI[gi % 4]
        let hx = 0, hy = 0
        if (o==='up') { hx=0; hy=-158 }
        else if (o==='down') { hx=0; hy=250 }
        else if (o==='right') { hx=250; hy=0 }
        else { hx=-270; hy=0 }
        connectors.push(mkLink('M0 0 L '+hx+' '+hy, 'group', false, th))
        markers.push(mkMarker(Math.round(hx*0.46), Math.round(hy*0.46), 5, false, th))
        nodes.push(mkNode({ cx:CX, x:hx, y:hy, scale:1, opacity:1, color:inkHi, knot:48,
          label:g.name, sub:'', lsize:18, labelAbove:(o==='down'), mask:nodeImg(g.name), onClick:null }, th))
        const m = g.sections.length
        g.sections.forEach((sec, si) => {
          const isOpen = S.section === sec
          let sx, sy, d, mx, my
          if (o==='up') {
            const GX=166; sx=Math.round((si-(m-1)/2)*GX); sy=-300
            const q=Math.round((hy+sy)/2); d='M '+hx+' '+hy+' C '+hx+' '+q+' '+sx+' '+q+' '+sx+' '+sy
            mx=sx; my=sy+48
          } else if (o==='down') {
            const GX=190; sx=Math.round((si-(m-1)/2)*GX); sy=406
            const q=Math.round((hy+sy)/2); d='M '+hx+' '+hy+' C '+hx+' '+q+' '+sx+' '+q+' '+sx+' '+sy
            mx=sx; my=sy-48
          } else if (o==='right') {
            const GY=132; sy=Math.round((si-(m-1)/2)*GY); sx=515
            const q=Math.round((hx+sx)/2); d='M '+hx+' '+hy+' C '+q+' '+hy+' '+q+' '+sy+' '+sx+' '+sy
            mx=sx-48; my=sy
          } else {
            const GY=150; sy=Math.round((si-(m-1)/2)*GY); sx=-470
            const q=Math.round((hx+sx)/2); d='M '+hx+' '+hy+' C '+q+' '+hy+' '+q+' '+sy+' '+sx+' '+sy
            mx=sx+48; my=sy
          }
          connectors.push(mkLink(d, 'section', isOpen, th))
          markers.push(mkMarker(mx, my, isOpen?6:5, isOpen, th))
          secPos[sec] = { x:sx, y:sy }
          nodes.push(mkNode({ cx:CX, x:sx, y:sy, scale:isOpen?1.22:1, opacity:1, color: isOpen?inkHi:ink, knot:74,
            label:sec, sub:'', lsize:12.5, dense:true, wrap:true, labelAbove:(o==='up'), active:isOpen, mask:nodeImg(sec), onClick:() => openSection(sec) }, th))
        })
      })
      ;[['Заклинания','Магические предметы'],['Бестиарий','Гнев Ильбеша']].forEach(pair => {
        const a=secPos[pair[0]], b=secPos[pair[1]]
        if (a && b) {
          const midx=(a.x+b.x)/2, midy=(a.y+b.y)/2, len=Math.hypot(midx,midy)||1
          const cx=Math.round(midx+midx/len*150), cy=Math.round(midy+midy/len*150)
          connectors.unshift(mkLink('M '+a.x+' '+a.y+' Q '+cx+' '+cy+' '+b.x+' '+b.y, 'cross', false, th))
        }
      })
    } else {
      const secs = sysObj.sections, pts = layoutPoints(secs.length), Rx = 360, Ry = 312
      secs.forEach((sec, i) => {
        const p = pts[i], x = Math.round(p.x*Rx), y = Math.round(p.y*Ry), isOpen = S.section === sec
        connectors.push(mkLink('M0 0 L '+x+' '+y, 'section', isOpen, th))
        nodes.push(mkNode({ cx:CX, x, y, scale:isOpen?1.22:1, opacity:1, color: isOpen?inkHi:ink, knot:76,
          label:sec, sub:'', lsize:13, dense:secs.length>6, wrap:true, active:isOpen, mask:nodeImg(sec), onClick:() => openSection(sec) }, th))
      })
    }
    nodes.unshift(mkNode({ cx:CX, x:0, y:0, scale:1.1, opacity:1, color:inkHi, knot:134,
      img:IMG[sysObj.id], label:sysObj.name, sub:sysObj.tag, lsize:25, active:true, onClick:() => recenter() }, th))
  }

  const showSection = !!S.section && !!sysObj
  const cq = (S.cardQuery||'').trim().toLowerCase()
  const sectionCards = (showSection ? entriesFor(S.active, S.section) : []).map(raw => {
    const parts = String(raw).split('|')
    let name, sub='', bon=''
    if (parts.length>=3) { name=parts[0]; sub=parts[1]; bon=parts[2] }
    else { const p2=String(raw).split(' · '); name=p2[0]; bon=p2[1]||'' }
    const badges = bon ? bon.split(',').map(b=>b.trim()).filter(Boolean) : []
    return { name, sub, hasSub:!!sub, badges, hasBadges:badges.length>0, hasTag:!!sub }
  }).filter(c => !cq || c.name.toLowerCase().indexOf(cq)>-1 || (c.sub && c.sub.toLowerCase().indexOf(cq)>-1))

  const idx = []
  SYSTEMS.forEach(s => {
    const secs = s.groups ? s.groups.reduce((a,g)=>a.concat(g.sections),[]) : s.sections
    secs.forEach(sec => idx.push({ label:sec, sys:s.name, sid:s.id }))
  })
  const q = S.query.trim().toLowerCase()
  const results = (q ? idx.filter(r => r.label.toLowerCase().indexOf(q)>-1 || r.sys.toLowerCase().indexOf(q)>-1) : idx).slice(0,8)
    .map(r => ({ label:r.label, sys:r.sys, onClick:() => { Object.assign(state, { view:'system', active:r.sid, section:r.label, overlay:null }) } }))

  const cd = (S.cls && CLASSDATA[S.cls]) || {}
  const has = !!cd.table
  const classIdx = POOL.classes.indexOf(S.cls)
  const featureLevel = value => {
    const match = String(value || '').match(/\d+/)
    return match ? Number(match[0]) : 999
  }
  const classFeatureItems = items => (items || []).map(item => {
    if (Array.isArray(item)) return { name: item[0], text: item[1] }
    return { name: item.name, text: item.text }
  }).filter(item => item.name)
  const classArchetypes = (cd.archetypes || []).map(a => ({
    ...a,
    sourceUrl: `/dnd5e/class-features?source=${encodeURIComponent(a.source || '')}`,
    features: (a.features || []).map(f => {
      const id = classFeatureId(S.cls, a.id, f.name)
      return {
        ...f,
        id,
        featureUrl: classFeatureUrl(id),
        rank: featureLevel(f.level),
        hasItems: !!(f.items && f.items.length),
        itemsTitle: f.itemsTitle || '',
        itemsCollapsed: !!f.itemsCollapsed,
        items: classFeatureItems(f.items)
      }
    }),
    spells: (a.spells || []).map(sp => ({ ...sp, hasHigher: !!sp.higher }))
  }))
  const classArchetypeSources = [...new Set(classArchetypes.map(a => a.source).filter(Boolean))]
  const classSourceFullNames = classArchetypes.reduce((acc, archetype) => {
    if (archetype.source && archetype.sourceFullName) acc[archetype.source] = archetype.sourceFullName
    return acc
  }, {})
  const activeArchetypeSource = S.archetypeSource || 'all'
  const filteredClassArchetypes = classArchetypes.filter(a => activeArchetypeSource === 'all' || a.source === activeArchetypeSource)
  const selectedClassArchetype = classArchetypes.find(a => a.id === S.activeArchetype) || null
  const baseClassFeatures = (cd.features||[]).map((f, order) => {
    const id = classFeatureId(S.cls, f[2], f[0])
    return {
      id,
      featureUrl: classFeatureUrl(id),
      name:f[0],
      src:f[1],
      lvl:f[2],
      text:f[3],
      order,
      rank: featureLevel(f[2]),
      hasSpellTable: !!(f[4] && f[4].length),
      spellTable: (f[4]||[]).map(s=>({ lvl:s[0], spell:s[1] }))
    }
  })
  const archetypeFeatureEntries = (arch, archetypeOrder = 0) => [
    ...arch.features.map((f, order) => ({
      id: f.id,
      featureUrl: f.featureUrl,
      name: f.name,
      src: arch.source,
      sourceFullName: arch.sourceFullName || '',
      lvl: f.level,
      text: f.text,
      order: 1000 + archetypeOrder * 100 + order,
      rank: f.rank || featureLevel(f.level),
      isArchetype: true,
      archetypeId: arch.id,
      archetypeName: arch.name,
      hasItems: !!(f.items && f.items.length),
      hasLongItems: !!(f.items && f.items.length > 3),
      itemsTitle: f.itemsTitle || '',
      itemsCollapsed: !!f.itemsCollapsed,
      items: f.items || []
    })),
    ...((arch.spells && arch.spells.length) ? [{
      id: classFeatureId(S.cls, arch.id, 'Дополнительные заклинания'),
      featureUrl: classFeatureUrl(classFeatureId(S.cls, arch.id, 'Дополнительные заклинания')),
      name: 'Дополнительные заклинания',
      src: arch.source,
      sourceFullName: arch.sourceFullName || '',
      lvl: arch.level,
      text: 'Вы получаете дополнительные заклинания подкласса. Они считаются для вас заклинаниями барда и вплетаются в магическую традицию выбранной коллегии.',
      order: 1000 + archetypeOrder * 100 + 98,
      rank: featureLevel(arch.level),
      isArchetype: true,
      archetypeId: arch.id,
      archetypeName: arch.name,
      hasSpells: true,
      spells: arch.spells
    }] : [])
  ]
  const allArchetypeFeatures = classArchetypes.flatMap((arch, archetypeOrder) => archetypeFeatureEntries(arch, archetypeOrder))
  const selectedArchetypeFeatures = selectedClassArchetype
    ? allArchetypeFeatures.filter(feature => feature.archetypeId === selectedClassArchetype.id)
    : []
  const cleanTableFeatureName = value => String(value || '')
    .replace(/\s*\([^)]*\)/g, '')
    .trim()
  const tableFeatureKey = value => featureSlug(cleanTableFeatureName(value))
  const linkableTableFeatures = [...baseClassFeatures, ...selectedArchetypeFeatures]
  const tableFeatureByName = new Map()
  const tableFeatureByNameLevel = new Map()
  linkableTableFeatures.forEach(feature => {
    const key = tableFeatureKey(feature.name)
    const rank = featureLevel(feature.lvl)
    if (!key) return
    if (!tableFeatureByName.has(key)) tableFeatureByName.set(key, feature)
    tableFeatureByNameLevel.set(`${key}:${rank}`, feature)
  })
  const tableFeatureLink = (name, level) => {
    const key = tableFeatureKey(name)
    if (!key) return null
    return tableFeatureByNameLevel.get(`${key}:${level}`) || tableFeatureByName.get(key) || null
  }
  const selectedTableFeaturesByLevel = selectedArchetypeFeatures.reduce((acc, feature) => {
    const rank = featureLevel(feature.lvl)
    if (!rank || rank === 999) return acc
    if (!acc.has(rank)) acc.set(rank, [])
    acc.get(rank).push(feature.name)
    return acc
  }, new Map())
  const archetypeTypeForms = selectedClassArchetype?.type ? [
    selectedClassArchetype.type,
    selectedClassArchetype.type.replace(/ия(\s|$)/i, 'ии$1')
  ] : []
  const archetypePlaceholderSlugs = new Set(archetypeTypeForms.map(featureSlug).filter(Boolean))
  const tableFeatureParts = (value, level) => {
    const text = String(value || '')
    const archetypeNames = selectedTableFeaturesByLevel.get(level) || []
    const baseParts = text
      .split(',')
      .map(part => part.trim())
      .filter(Boolean)
      .filter(part => part !== '—')
      .filter(part => !archetypeNames.length || !archetypePlaceholderSlugs.has(featureSlug(part)))
      .map((part, index) => {
        const feature = tableFeatureLink(part, level)
        return {
          key: `base-${level}-${index}-${featureSlug(part)}`,
          text: part,
          featureId: feature?.id || '',
          isArchetype: false
        }
      })
    const archetypeParts = archetypeNames.map((part, index) => ({
      key: `arch-${level}-${index}-${featureSlug(part)}`,
      text: part,
      featureId: tableFeatureLink(part, level)?.id || '',
      isArchetype: true
    }))
    return [...archetypeParts, ...baseParts]
  }
  const classTableRows = (cd.table||[]).map(r => {
    const level = Number(r[0])
    return {
      hasArchetypeFeatures: selectedTableFeaturesByLevel.has(level),
      cells: r.map((v, ci) => {
        const feat = ci===2
        const parts = feat ? tableFeatureParts(v, level) : []
        const hasArchetypeParts = parts.some(part => part.isArchetype)
        return {
          v:String(v),
          parts,
          className: [
            feat ? 'feature' : '',
            hasArchetypeParts ? 'has-archetype-parts' : ''
          ].filter(Boolean).join(' '),
          title: hasArchetypeParts ? `Умения подкласса: ${parts.filter(part => part.isArchetype).map(part => part.text).join(', ')}` : '',
          style:{
            padding: feat ? '9px 10px' : '9px 6px',
            textAlign: feat ? 'left' : 'center',
            fontFamily: feat ? "'Hanken Grotesk',sans-serif" : "'Cormorant Garamond',serif",
            fontSize: feat ? '11.5px' : (ci===0 ? '16px' : '15px'),
            lineHeight: feat ? 1.3 : 1.2,
            color: ci===0 ? 'rgba(244,224,170,.9)' : 'rgba(226,230,244,.72)',
            borderBottom:'1px solid rgba(255,255,255,.05)',
            background: hasArchetypeParts ? 'linear-gradient(90deg, rgba(126,196,184,.105), rgba(7,8,12,.02))' : (ci===0 ? 'rgba(255,255,255,.012)' : 'transparent'),
            boxShadow: hasArchetypeParts ? 'inset 2px 0 0 rgba(126,196,184,.7)' : 'none'
          }
        }
      })
    }
  })
  const classFeatures = [...baseClassFeatures, ...selectedArchetypeFeatures]
    .sort((a, b) => a.rank - b.rank || a.order - b.order)
  const classAllFeatures = [...baseClassFeatures, ...allArchetypeFeatures]
    .sort((a, b) => a.rank - b.rank || a.order - b.order)
  const selectedClassArchetypeDescription = selectedClassArchetype ? {
    name: selectedClassArchetype.name,
    source: selectedClassArchetype.source,
    sourceFullName: selectedClassArchetype.sourceFullName || '',
    type: selectedClassArchetype.type,
    level: selectedClassArchetype.level,
    summary: selectedClassArchetype.summary || '',
    quote: selectedClassArchetype.quote || '',
    hasQuote: !!selectedClassArchetype.quote,
    intro: selectedClassArchetype.intro || [],
    hasIntro: !!(selectedClassArchetype.intro && selectedClassArchetype.intro.length)
  } : null

  return {
    th, ink, inkHi,
    nodes, connectors, markers,
    sysObj,
    isSystem: S.view !== 'home',
    activeName: sysObj ? sysObj.name : '',
    showGroup: !!(sysObj?.groups && S.group != null),
    groupName: (sysObj?.groups && S.group != null) ? sysObj.groups[S.group].name : '',
    showSectionCrumb: !!S.section,
    showClassCrumb: !!(S.cls && S.section === 'Классы'),

    showFrame: showSection,
    showClassPage: !!(S.cls && S.section === 'Классы'),
    className: S.cls || '',
    classEn: cd.en || '',
    classSub: (sysObj ? sysObj.name : '') + ' · Класс',
    classDescription: cd.description || null,
    classEmblemUrl: classImg(S.cls) || emblem(classIdx<0?0:classIdx),
    classHasRules: has,
    classHd: cd.hd || 8, classHpFirst: cd.hpFirst || '', classHpNext: cd.hpNext || '',
    classArmor: cd.armor || '—', classWeapons: cd.weapons || '—', classTools: cd.tools || '—',
    classSaves: cd.save || '—', classSkills: cd.skills || '—',
    classEquip: cd.equipment || [], classEquipNote: cd.equipNote || '', classHasEquip: !!(cd.equipment && cd.equipment.length),
    classTableCols: cd.tableCols || [], classTableRows, classTableGrid: cd.tableGrid || '46px 50px 1fr',
    classFeatures,
    classAllFeatures,
    classArchetypes,
    classFilteredArchetypes: filteredClassArchetypes,
    classArchetypeSources,
    classSourceFullNames,
    classHasArchetypes: classArchetypes.length > 0,
    classSelectedArchetype: selectedClassArchetype,
    classHasSelectedArchetype: !!selectedClassArchetype,
    classSelectedArchetypeDescription: selectedClassArchetypeDescription,
    classActiveArchetypeSource: activeArchetypeSource,
    classInfusions: (cd.infusions||[]).map(f => ({ name:f[0], req:f[1]||'', hasReq:!!f[1], item:f[2], text:f[3] })),
    classHasInfusions: !!(cd.infusions && cd.infusions.length),
    classInvocations: (cd.invocations||[]).map(f => ({ name:f[0], req:f[1]||'', hasReq:!!f[1], text:f[2] })),
    classHasInvocations: !!(cd.invocations && cd.invocations.length),

    showCards: showSection && S.section !== 'Классы',
    sectionEyebrow: (sysObj ? sysObj.name : '') + ' · Узел узлов',
    sectionTitle: S.section || '',
    sectionCards,

    query: S.query, results, noResults: results.length===0,
    bookmarks: S.bookmarks, hasBookmarks: S.bookmarks.length>0, noBookmarks: S.bookmarks.length===0,
    socials:[
      { name:'Telegram', handle:'@tkk', dot:'#5bb8e8' },
      { name:'Boosty',   handle:'/tkk', dot:'#e8915b' },
      { name:'Patreon',  handle:'/tkk', dot:'#e85b5b' },
      { name:'Discord',  handle:'invite', dot:'#8b7be8' },
    ],
    systemList: SYSTEMS.map(s => ({ name:s.name, tag:s.tag, onClick:() => selectSystem(s.id) })),
  }
})

function addBookmark() {
  if (vm.value.sectionTitle && !state.bookmarks.includes(vm.value.sectionTitle)) state.bookmarks.push(vm.value.sectionTitle)
}
</script>

<template>
  <div class="tkk" :style="{ background: vm.th.bg }">
    <canvas ref="canvasEl" class="tkk-canvas" />

    <svg class="tkk-rings" :style="{ color: 'rgba(216,178,108,0.5)' }">
      <g :transform="`translate(${center.x},${center.y})`">
        <g style="animation:ringTurn 240s linear infinite">
          <circle r="318" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="1 13" opacity="0.5" />
          <circle r="210" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 22" opacity="0.35" />
        </g>
        <g style="animation:ringTurn 380s linear infinite reverse">
          <circle r="262" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="1 8" opacity="0.4" />
        </g>
      </g>
    </svg>

    <svg class="tkk-conn">
      <g :transform="`translate(${center.x},${center.y}) scale(${fit})`">
        <g v-for="(c, i) in vm.connectors" :key="'c'+i">
          <path v-if="c.hasGlow" :d="c.d" :style="c.glow" />
          <path :d="c.d" :style="c.base" />
          <path :d="c.d" :style="c.flow" />
          <circle v-if="c.hasSpark" :r="c.sparkR" :style="c.sparkStyle">
            <animateMotion :dur="c.sparkDur" :begin="c.sparkBegin" repeatCount="indefinite" :path="c.d" />
          </circle>
        </g>
        <path v-for="(m, i) in vm.markers" :key="'m'+i" :d="m.d" :style="m.style" />
      </g>
    </svg>

    <div class="tkk-nodes" :style="{ transform: `scale(${fit})` }">
      <div v-for="(node, i) in vm.nodes" :key="'n'+i" class="tkk-node" :style="node.boxStyle" @click="node.onClick?.()">
        <div :style="node.discStyle" />
        <div v-if="node.hasFrame" :style="node.frameStyle" />
        <div class="tkk-knot" :style="node.knotStyle">
          <svg v-if="node.noImg" viewBox="-50 -50 100 100" style="width:100%;height:100%;display:block">
            <g fill="none" stroke="currentColor" stroke-width="1.15">
              <ellipse rx="36" ry="15" /><ellipse rx="36" ry="15" transform="rotate(45)" />
              <ellipse rx="36" ry="15" transform="rotate(90)" /><ellipse rx="36" ry="15" transform="rotate(135)" />
              <circle r="6.5" /><circle r="22" stroke-dasharray="1.5 5" opacity="0.6" />
            </g>
          </svg>
        </div>
        <div :style="node.textStyle">
          <div :style="node.labelStyle">{{ node.label }}</div>
          <div :style="node.subStyle">{{ node.sub }}</div>
        </div>
      </div>
    </div>

    <div class="tkk-wordmark">
      <div class="tkk-wordmark-eyebrow">Threads of the Knot of Knots</div>
      <div class="tkk-wordmark-title">TKK<span style="opacity:.5">.club</span></div>
    </div>

    <div v-if="vm.isSystem" class="tkk-crumb">
      <span class="tkk-crumb-link" @click="recenter">Системы</span>
      <span class="tkk-crumb-sep">/</span>
      <span class="tkk-crumb-link tkk-crumb-strong" @click="crumbSystem">{{ vm.activeName }}</span>
      <template v-if="vm.showGroup">
        <span class="tkk-crumb-sep">/</span>
        <span class="tkk-crumb-strong">{{ vm.groupName }}</span>
      </template>
      <template v-if="vm.showSectionCrumb">
        <span class="tkk-crumb-sep">/</span>
        <span class="tkk-crumb-link tkk-crumb-gold" @click="closeClass">{{ state.section }}</span>
      </template>
      <template v-if="vm.showClassCrumb">
        <span class="tkk-crumb-sep">/</span>
        <span class="tkk-crumb-gold">{{ state.cls }}</span>
      </template>
      <span class="tkk-crumb-exit" @click="goUp">← выйти</span>
    </div>

    <div v-if="vm.showFrame" class="tkk-ornate-frame" :style="{ '--tint': vm.th.glow }">
      <div class="tkk-ornate-frame-inner" />
      <svg width="74" height="74" viewBox="0 0 74 74" class="corner corner-tl"><g fill="none" :stroke="vm.th.glow+'0.5)'" stroke-width="1.1"><path d="M2 66 L2 2 L66 2"/><path d="M11 66 L11 11 L66 11"/><path d="M22 38 L22 22 L38 22 L38 30 L30 30 L30 27"/></g></svg>
      <svg width="74" height="74" viewBox="0 0 74 74" class="corner corner-tr"><g fill="none" :stroke="vm.th.glow+'0.5)'" stroke-width="1.1"><path d="M2 66 L2 2 L66 2"/><path d="M11 66 L11 11 L66 11"/><path d="M22 38 L22 22 L38 22 L38 30 L30 30 L30 27"/></g></svg>
      <svg width="74" height="74" viewBox="0 0 74 74" class="corner corner-br"><g fill="none" :stroke="vm.th.glow+'0.5)'" stroke-width="1.1"><path d="M2 66 L2 2 L66 2"/><path d="M11 66 L11 11 L66 11"/><path d="M22 38 L22 22 L38 22 L38 30 L30 30 L30 27"/></g></svg>
      <svg width="74" height="74" viewBox="0 0 74 74" class="corner corner-bl"><g fill="none" :stroke="vm.th.glow+'0.5)'" stroke-width="1.1"><path d="M2 66 L2 2 L66 2"/><path d="M11 66 L11 11 L66 11"/><path d="M22 38 L22 22 L38 22 L38 30 L30 30 L30 27"/></g></svg>
    </div>

    <div class="tkk-sidebar">
      <div class="tkk-sidebar-btn tkk-sidebar-main" title="Главный узел" @click="recenter">
        <img src="/assets/knot-main.png" width="30" height="30" style="display:block;object-fit:contain">
      </div>
      <div class="tkk-sidebar-btn" title="Поиск" @click="toggleOverlay('search')">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
      </div>
      <div class="tkk-sidebar-btn" title="Закладки" @click="toggleOverlay('bookmarks')">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M6 3.5h12v17l-6-4.2-6 4.2z"/></svg>
      </div>
      <div class="tkk-sidebar-btn" title="Сообщество" @click="toggleOverlay('social')">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><line x1="8.1" y1="10.9" x2="15.9" y2="7.1"/><line x1="8.1" y1="13.1" x2="15.9" y2="16.9"/></svg>
      </div>
      <div class="tkk-sidebar-btn" title="Тема" @click="toggleOverlay('theme')">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.7A8.2 8.2 0 1 1 11.3 3a6.4 6.4 0 0 0 9.7 9.7z"/></svg>
      </div>
      <div class="tkk-sidebar-btn" title="Сменить систему" @click="toggleOverlay('systems')">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>
      </div>
      <div style="flex:1" />
      <div class="tkk-sidebar-btn" title="Авторизация" @click="toggleOverlay('auth')">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8.5" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>
      </div>
    </div>

    <ClassPage v-if="vm.showClassPage" :vm="vm" :state="state" @up="closeClass" />
    <SectionCards v-if="vm.showCards" :vm="vm" @up="goUp" @add-bookmark="addBookmark" v-model:query="state.cardQuery" />

    <HubOverlays :vm="vm" :state="state" @close="state.overlay = null" @stop="stopClick" />
  </div>
</template>

<style>
@keyframes knotSpin{to{transform:rotate(360deg)}}
@keyframes threadFlow{to{stroke-dashoffset:-220}}
@keyframes threadBead{to{stroke-dashoffset:-522}}
@keyframes ringTurn{to{transform:rotate(360deg)}}
@keyframes knotTwinkle{0%,100%{opacity:.72;filter:brightness(.92)}50%{opacity:1;filter:brightness(1.34)}}
@keyframes linePulse{0%,100%{opacity:.45}50%{opacity:1}}
@keyframes riseIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes popIn{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}

.tkk{position:fixed;inset:0;overflow:hidden;font-family:'Hanken Grotesk',sans-serif;color:rgba(226,230,244,.92);transition:background .8s ease}
.tkk-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:1}
.tkk-rings{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none}
.tkk-conn{position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none}
.tkk-nodes{position:absolute;inset:0;z-index:4;pointer-events:none;transform-origin:calc(50% + 34px) 50%}
.tkk-node{cursor:default}
.tkk-knot:hover{transform:translate(-50%,-50%) scale(1.2) !important}
.tkk-wordmark{position:absolute;top:24px;left:92px;z-index:30;pointer-events:none}
.tkk-wordmark-eyebrow{font-family:'Hanken Grotesk';font-size:9.5px;letter-spacing:.42em;text-transform:uppercase;color:rgba(226,230,244,.42)}
.tkk-wordmark-title{font-family:'Cormorant Garamond',serif;font-size:21px;letter-spacing:.32em;color:rgba(232,236,250,.92);margin-top:3px}
.tkk-crumb{position:absolute;top:26px;right:34px;z-index:30;display:flex;align-items:center;gap:9px;animation:riseIn .5s ease both}
.tkk-crumb-sep{font-size:11px;color:rgba(226,230,244,.28)}
.tkk-crumb-link{cursor:pointer}
.tkk-crumb-link:not(.tkk-crumb-strong):not(.tkk-crumb-gold){font-family:'Hanken Grotesk';font-size:10px;letter-spacing:.34em;text-transform:uppercase;color:rgba(226,230,244,.4)}
.tkk-crumb-strong{font-family:'Cormorant Garamond',serif;font-size:18px;letter-spacing:.12em;color:rgba(232,236,250,.92)}
.tkk-crumb-gold{font-family:'Cormorant Garamond',serif;font-size:18px;letter-spacing:.12em;color:rgba(244,224,170,.95);cursor:pointer}
.tkk-crumb-exit{margin-left:6px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(226,230,244,.5);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:5px 11px;cursor:pointer}
.tkk-crumb-exit:hover{background:rgba(255,255,255,.05);color:rgba(234,238,252,.95)}

.tkk-ornate-frame{position:absolute;top:18px;right:18px;bottom:18px;left:86px;z-index:60;pointer-events:none;border:1px solid var(--tint, rgba(176,188,232,.22));border-radius:3px}
.tkk-ornate-frame-inner{position:absolute;inset:7px;border:1px solid rgba(176,188,232,.1);border-radius:2px}
.tkk-ornate-frame .corner{position:absolute}
.corner-tl{left:-3px;top:-3px}
.corner-tr{right:-3px;top:-3px;transform:rotate(90deg)}
.corner-br{right:-3px;bottom:-3px;transform:rotate(180deg)}
.corner-bl{left:-3px;bottom:-3px;transform:rotate(270deg)}

.tkk-sidebar{position:absolute;top:0;left:0;bottom:0;width:68px;z-index:50;display:flex;flex-direction:column;align-items:center;padding:16px 0;gap:4px;border-right:1px solid rgba(255,255,255,.06);background:rgba(7,8,12,.5);backdrop-filter:blur(10px)}
.tkk-sidebar-btn{width:44px;height:44px;display:flex;align-items:center;justify-content:center;color:rgba(226,230,244,.55);cursor:pointer;border-radius:11px;transition:all .25s}
.tkk-sidebar-btn:hover{color:rgba(234,238,252,.95);background:rgba(255,255,255,.05)}
.tkk-sidebar-main{margin-bottom:6px;color:rgba(232,236,250,.85)}
</style>
