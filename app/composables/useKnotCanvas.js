// Ambient gold-thread particle background, ported from the Claude Design prototype's canvas loop.
export function useKnotCanvas(canvasRef, density = 46, themeRef = null) {
  let raf = null, onResize = null
  let W = 0, H = 0, arcs = [], orbits = [], stars = []

  function spawnOrbit(dirHint) {
    const R = Math.random
    const DASHES = [[10,9],[4,6],[1,7],[18,12],[11,7,1,7],[3,4],[22,11],[6,3,1,3],[14,5,2,5]]
    const KINDS = ['solid','dash','dash','dot','chain','broken','broken','dash']
    const SHAPES = ['round','round','star','diamond','spark4']
    const GLOWS = [
      { core:'rgba(255,236,196,', halo:'rgba(216,178,108,' },
      { core:'rgba(255,210,150,', halo:'rgba(208,140,70,'  },
      { core:'rgba(255,250,235,', halo:'rgba(232,206,150,' },
      { core:'rgba(214,230,255,', halo:'rgba(150,178,232,' },
      { core:'rgba(255,224,236,', halo:'rgba(216,150,168,' },
      { core:'rgba(226,255,236,', halo:'rgba(150,210,170,' }
    ]
    const span = Math.max(W, H)
    const kind = KINDS[(R()*KINDS.length)|0]
    const r = span*(0.7 + R()*1.4)
    const dir = (dirHint!=null ? dirHint : 0) + R()*0.8
    const dist = r * (0.78 + R()*0.34)
    const cx = W/2 + Math.cos(dir)*dist
    const cy = H/2 + Math.sin(dir)*dist
    const spans = []
    if (kind==='broken'){
      let a = R()*6.283; const segs = 2 + (R()*3|0)
      for (let s=0;s<segs;s++){ const len = 0.35 + R()*0.7; spans.push([a, a+len]); a += len + (0.25 + R()*0.6) }
    }
    return {
      cx, cy, r, kind, spans,
      alpha:0.065+R()*0.085, ang0:R()*6.283,
      dash: DASHES[(R()*DASHES.length)|0], dashOff:R()*40, dashDrift:(R()-0.5)*3.2,
      lw:0.7+R()*0.8, bead:2.4+R()*2.2, beadGap:13+R()*12,
      cyc:240+R()*240, ph0:R(), dirn:(R()<0.5?1:-1),
      sz:0.9+R()*2.6, shape:SHAPES[(R()*SHAPES.length)|0], glow:GLOWS[(R()*GLOWS.length)|0], rot:R()*6.283,
      born:0, life:34+R()*46, fade:9+R()*7
    }
  }

  function drawSpark(ctx, shape, x, y, s, rot){
    if (shape==='round'){ ctx.beginPath(); ctx.arc(x,y,s*0.7,0,6.283); ctx.fill(); return }
    ctx.save(); ctx.translate(x,y); ctx.rotate(rot||0)
    if (shape==='diamond'){
      const d=s*1.0; ctx.beginPath(); ctx.moveTo(0,-d); ctx.lineTo(d*0.66,0); ctx.lineTo(0,d); ctx.lineTo(-d*0.66,0); ctx.closePath(); ctx.fill()
    } else {
      const pts = shape==='spark4' ? 4 : 5
      const ro = s*1.25, ri = s*0.42
      ctx.beginPath()
      for (let i=0;i<pts*2;i++){
        const rr = i%2 ? ri : ro, a = (i/(pts*2))*6.283 - Math.PI/2
        const px=Math.cos(a)*rr, py=Math.sin(a)*rr
        i?ctx.lineTo(px,py):ctx.moveTo(px,py)
      }
      ctx.closePath(); ctx.fill()
    }
    ctx.restore()
  }

  function build() {
    const N = Math.round(density)
    const R = () => Math.random()
    arcs = Array.from({length:N+14}, () => {
      const big = R()<0.34
      return {
        cx:R()*W*1.4-W*0.2, cy:R()*H*1.4-H*0.2,
        r: big ? (320+R()*920) : (40+R()*360),
        a0:R()*6.283, len:0.3+R()*(big?3.4:1.7), rot:(R()-0.5)*0.00016,
        base:(big?0.016:0.04)+R()*0.05, sh:R()*6.283, shsp:0.1+R()*0.3,
        w:0.55+R()*(big?1.1:0.5)
      }
    })
    orbits = Array.from({length:16}, (_, i) => {
      const o = spawnOrbit(i/16*6.283)
      o.born = -Math.random()*o.life
      return o
    })
    stars = Array.from({length:48}, () => ({ x:R()*W, y:R()*H, r:0.3+R()*0.9, ph:R()*6.283, sp:0.3+R()*0.8 }))
  }

  function start() {
    const cv = canvasRef.value
    if (!cv) return
    const ctx = cv.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      cv.width = W*dpr; cv.height = H*dpr
      ctx.setTransform(dpr,0,0,dpr,0,0)
    }
    onResize = resize
    window.addEventListener('resize', resize)
    resize()
    build()
    const loop = (now) => {
      const t = now/1000
      const theme = themeRef?.value || 'void'
      const gold = theme === 'manu'
        ? 'rgba(148,169,196,'
        : theme === 'madness'
          ? 'rgba(164,121,245,'
          : 'rgba(216,178,108,'
      const starTone = theme === 'madness' ? 'rgba(211,174,255,' : gold
      const orbitTone = theme === 'madness' ? 'rgba(116,119,232,' : gold
      ctx.clearRect(0,0,W,H)
      for (const s of stars){
        const a = 0.10 + 0.4*(0.5+0.5*Math.sin(t*s.sp + s.ph))
        ctx.fillStyle = (theme === 'madness' && Math.sin(s.ph) > 0 ? starTone : gold) + (a*0.6).toFixed(3) + ')'
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill()
      }
      ctx.setLineDash([])
      for (const a of arcs){
        a.a0 += a.rot
        const al = a.base * (0.55 + 0.45*Math.sin(t*a.shsp + a.sh))
        ctx.strokeStyle = gold + Math.max(0,al).toFixed(3) + ')'
        ctx.lineWidth = a.w || 0.8
        ctx.beginPath(); ctx.arc(a.cx, a.cy, a.r, a.a0, a.a0+a.len); ctx.stroke()
      }
      for (let oi=0; oi<orbits.length; oi++){
        const o = orbits[oi]
        const age = t - o.born
        if (age >= o.life){
          const fresh = spawnOrbit(Math.random()*6.283)
          fresh.born = t
          orbits[oi] = fresh
          continue
        }
        let env = 1
        if (age < o.fade) env = age/o.fade
        else if (age > o.life - o.fade) env = Math.max(0, (o.life - age)/o.fade)
        env = env*env*(3-2*env)
        const p = ((t/o.cyc + o.ph0) % 1 + 1) % 1
        const TR = 0.42
        let lit, sparkOn = false, sparkProg = 0
        if (p < TR){ sparkOn = true; sparkProg = p/TR; lit = Math.pow(sparkProg, 0.7) }
        else { lit = Math.pow(1 - (p-TR)/(1-TR), 2.2) }
        const al = (o.alpha * (0.4 + 2.9*lit) * env).toFixed(3)
        ctx.strokeStyle = orbitTone + al + ')'
        ctx.fillStyle = starTone + al + ')'
        ctx.lineWidth = o.lw + 0.8*lit
        ctx.lineCap = 'round'
        if (o.kind==='chain'){
          const n = Math.min(220, Math.max(10, Math.round((6.283*o.r)/o.beadGap)))
          for (let i=0;i<n;i++){
            const a = o.ang0 + (i/n)*6.283 + t*0.04*o.dashDrift*0.2
            const px = o.cx + Math.cos(a)*o.r, py = o.cy + Math.sin(a)*o.r
            ctx.beginPath(); ctx.arc(px, py, (i%2?o.bead*0.45:o.bead*0.9), 0, 6.283); ctx.fill()
          }
        } else if (o.kind==='broken'){
          ctx.setLineDash([])
          for (const sp of o.spans){
            ctx.beginPath(); ctx.arc(o.cx, o.cy, o.r, sp[0], sp[1]); ctx.stroke()
          }
        } else {
          if (o.kind==='dot') ctx.setLineDash([1, Math.max(5,o.beadGap*0.5)])
          else if (o.kind==='dash') ctx.setLineDash(o.dash)
          else ctx.setLineDash([])
          ctx.lineDashOffset = o.dashOff + t * o.dashDrift
          ctx.beginPath(); ctx.arc(o.cx, o.cy, o.r, 0, 6.283); ctx.stroke()
        }
        ctx.setLineDash([])
        if (sparkOn){
          const ang = o.ang0 + o.dirn * sparkProg * 6.283
          const px = o.cx + Math.cos(ang)*o.r, py = o.cy + Math.sin(ang)*o.r
          const core = theme === 'manu' ? 'rgba(246,247,248,' : o.glow.core
          const halo = theme === 'manu' ? 'rgba(54,64,82,' : o.glow.halo
          const rad = o.sz + 3.0
          const g = ctx.createRadialGradient(px,py,0,px,py,rad)
          g.addColorStop(0, core + (0.98*env).toFixed(3) + ')')
          g.addColorStop(0.5, halo + (0.4*env).toFixed(3) + ')')
          g.addColorStop(1, halo + '0)')
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px,py,rad,0,6.283); ctx.fill()
          ctx.fillStyle = core + (0.97*env).toFixed(3) + ')'
          drawSpark(ctx, o.shape, px, py, o.sz, o.rot + t*0.3*o.dirn)
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf)
    if (onResize) window.removeEventListener('resize', onResize)
  }

  return { start, stop }
}
