import assert from 'node:assert/strict'
import { writeFileSync } from 'node:fs'
const slots = {
  3:[4,2], 4:[4,3], 5:[4,3,2], 6:[4,3,3], 10:[4,3,3,3,2], 11:[4,3,3,3,2,1], 14:[4,3,3,3,2,1,1]
}
function payment(pool, circle) {
  const max=pool.length
  if(circle<=max) return pool.some((n,i)=>n>0&&i+1>=circle)
  return pool[max-1]>0 && pool.reduce((n,v,i)=>n+v*(i+1),0)>=circle
}
const chance=(dc,bonus,adv=false)=>{
  const p=Array.from({length:20},(_,i)=>i+1+bonus>=dc).filter(Boolean).length/20
  return adv ? 1-(1-p)**2 : p
}
// Exact enumeration, no Monte Carlo. Heat 0..3, fourth failed risk check kills.
function exposure(bases, start=0) {
  let states=[0,0,0,0,0]; states[start]=1
  for(const base of bases) {
    const next=[0,0,0,0,states[4]]
    for(let heat=0;heat<4;heat++) {
      const p=Math.min(19,base+heat)/20
      next[heat]+=states[heat]*(1-p)
      next[heat+1]+=states[heat]*p
    }
    states=next
  }
  return {alive:states.slice(0,4).reduce((a,b)=>a+b,0), wrath:states[4], states}
}
const checks=[]
function test(name,fn) { fn(); checks.push(name) }
test('3rd-level wizard can pay for circle 5',()=>assert(payment(slots[3],5)))
test('3rd-level wizard cannot pay for circle 9',()=>assert(!payment(slots[3],9)))
test('5th-level wizard can pay for circle 9: design blocker',()=>assert(payment(slots[5],9)))
test('No artificial lowering of native circle when slots depleted',()=>assert(!payment([4,0],3)))
test('Arcana expertise changes circle-3 success to 75% at level 3',()=>assert.equal(chance(13,7),.75))
test('No auto-fail on natural one of a skill check',()=>assert.equal(chance(13,12),1))
test('One isolated risk check cannot invoke terminal Wrath from heat zero',()=>assert.equal(exposure([1]).wrath,0))
test('Fourth consecutive failed baseline check has exact probability',()=>assert(Math.abs(exposure([1,1,1,1]).wrath-.00015)<1e-12))
test('At heat 3 one baseline check has 20% terminal risk',()=>assert.equal(exposure([1],3).wrath,.2))
test('Probability is conserved',()=>assert(Math.abs(exposure(Array(12).fill(1)).alive+exposure(Array(12).fill(1)).wrath-1)<1e-12))
const levels=[{level:3,int:3,pb:2},{level:4,int:4,pb:2},{level:5,int:4,pb:3},{level:6,int:4,pb:3},{level:10,int:5,pb:4},{level:11,int:5,pb:4},{level:14,int:5,pb:5}]
const arcana=levels.flatMap(x=>[3,5,7,9].map(circle=>({
  level:x.level,circle,payable:payment(slots[x.level],circle),
  proficient:chance(10+circle,x.int+x.pb),expertise:chance(10+circle,x.int+2*x.pb),
  expertiseWithAdvantage:chance(10+circle,x.int+2*x.pb,true)
})))
const risks=[
  {name:'8 ordinary casts, heat 0',bases:Array(8).fill(1),start:0},
  {name:'4 native catches and casts, heat 0',bases:Array(8).fill(1),start:0},
  {name:'circle 5 at level 3: catch + cast',bases:[4,4],start:0},
  {name:'circle 9 at level 5: catch + cast',bases:[7,7],start:0},
  {name:'4 high catches only (gap 6), heat 0',bases:[7,7,7,7],start:0},
  {name:'one native catch and cast, heat 3',bases:[1,1],start:3},
  {name:'one circle 9 catch and cast (gap 6), heat 3',bases:[7,7],start:3}
].map(x=>({...x,...exposure(x.bases,x.start)}))
const concentration={
  conBonus:2, dc:10,
  tenChecksSurvival:chance(10,2)**10,
  hundredChecksSurvival:chance(10,2)**100,
  damageFourSomaticCastsMean:10,
  fireballFourFailedSavesMean:112,
  fireballExpectedAreaDamageWithSkillFailure:{proficient:.65*112,expertise:.75*112}
}
const output={scope:'Exact probabilities, resource boundary checks and damage expectations; not a combat engine or human playtest',checks,arcana,risks,concentration}
writeFileSync('reports/hakar-v03-math.json',JSON.stringify(output,null,2)+'\n')
console.log(JSON.stringify(output,null,2))
