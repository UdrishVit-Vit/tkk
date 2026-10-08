// Each boundary owns its animation; colour is supplied by that world's data.
export function boundaryAnimation(id, color) {
  const glow = radius => `drop-shadow(0 0 ${radius}px ${color})`
  const frame = (transform, radius, offset) => ({ transform, filter: glow(radius), offset })
  const effects = {
    noa: { duration: 1100, easing: 'ease-out', frames: [frame('scale(1)',0,0),frame('scale(1.055)',14,.4),frame('scale(1.02)',7,.7),frame('scale(1)',8,1)] },
    tingir: { duration: 950, easing: 'ease-in-out', frames: [frame('rotate(0deg) scale(1)',0,0),frame('rotate(-3deg) scale(1.025)',10,.3),frame('rotate(2deg) scale(1.025)',6,.65),frame('rotate(0deg) scale(1)',8,1)] },
    labyrinth: { duration: 1400, easing: 'ease-in-out', frames: [frame('scale(1)',8,0),frame('scale(1)',14,.25),frame('scale(1)',3,.5),frame('scale(1)',14,.75),frame('scale(1)',8,1)] },
    enoa: { duration: 1300, easing: 'ease-out', frames: [frame('scale(1)',0,0),frame('scale(1.03)',12,.3),frame('scale(1)',5,.6),frame('scale(1.015)',9,.8),frame('scale(1)',8,1)] },
    sanctuary: { duration: 1200, easing: 'ease-in-out', frames: [frame('scale(.985)',0,0),frame('scale(1)',15,.5),frame('scale(1)',8,1)] },
    spark: { duration: 800, easing: 'ease-out', frames: [frame('scale(1)',0,0),frame('scale(1.07)',16,.3),frame('scale(1)',8,1)] },
  }
  return effects[id] || { duration:900, easing:'ease-out', frames:[frame('scale(1)',0,0),frame('scale(1.045)',12,.35),frame('scale(1)',8,1)] }
}
