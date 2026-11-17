import assert from 'node:assert/strict'
import {readFileSync,writeFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const file=process.argv[2]
if(!file) throw Error('Pass the author attachment path')
const raw=readFileSync(file)
function risk(n,jump=1,start=[0,0,0,0]) {
  let states=new Map([[start.join(','),1]]),dead=0
  for(let t=0;t<n;t++) {
    const next=new Map()
    for(const [key,p]of states)for(let i=0;i<4;i++) {
      const a=key.split(',').map(Number); a[i]+=jump
      if(a[i]>=4) dead+=p/4
      else {const k=a.join(',');next.set(k,(next.get(k)||0)+p/4)}
    }
    states=next
  }
  return {n,jump,start,death:dead,survival:[...states.values()].reduce((a,b)=>a+b,0)}
}
const checks=[]
function test(name,fn){fn();checks.push(name)}
test('No fatality in first 3 ordinary excess uses from clean state',()=>assert.equal(risk(3).death,0))
test('Fourth excess: 4 matching dice has probability 1/64',()=>assert.equal(risk(4).death,1/64))
test('Thirteenth excess use is necessarily fatal without recovery',()=>assert.equal(risk(13).death,1))
test('One rank-3 complication: 25% next ordinary excess is fatal',()=>assert.equal(risk(1,1,[3,0,0,0]).death,.25))
test('Jump 3: repeat on second cast is fatal at 25%',()=>assert.equal(risk(2,3).death,.25))
test('Jump 4: first attempt necessarily fatal',()=>assert.equal(risk(1,4).death,1))
test('Probability conserved',()=>{for(let n=0;n<=13;n++)assert(Math.abs(risk(n).death+risk(n).survival-1)<1e-12)})
const ordinary=Array.from({length:14},(_,n)=>risk(n))
const expect=ordinary.slice(0,13).reduce((a,x)=>a+x.survival,0)
const casters=[{level:3,pb:2,int:3,hp:20,prepared:6},{level:5,pb:3,int:4,hp:32,prepared:9},{level:14,pb:5,int:5,hp:86,prepared:18},{level:17,pb:6,int:5,hp:104,prepared:22}]
const penalties=casters.map(x=>({
 ...x,dc:8+x.pb+x.int,
 burns:[x.pb+2.5,x.pb+5,x.pb+7.5],
 blockedSpellsMean:[x.pb,x.pb+2.5,x.pb+5],
 unevenPenaltyMean:[x.pb,x.pb+2.5,x.pb+5],
 ownDcMean:[8+x.int,8+x.int-2.5,8+x.int-5]
}))
const save=(dc,b)=>Array.from({length:20},(_,i)=>i+1+b>=dc).filter(Boolean).length/20
const dc14=penalties.find(x=>x.level===14).dc
const enemySaveBefore=save(dc14,5)
const enemySaveRank1=save(dc14-5,5)
let enemySaveRank3=0
for(let a=1;a<=4;a++)for(let b=1;b<=4;b++)enemySaveRank3+=save(dc14-5-a-b,5)/16
const concentrationPass=save(10,2)**2
let rank2=0,rank3=0
for(let a=1;a<=4;a++) {
 rank2+=save(10+a,2)**2/4
 for(let b=1;b<=4;b++)rank3+=save(10+a+b,2)**2/16
}
// Second/third ranks assume Disadvantage is retained: an ambiguity in source table.
const out={
 sourceSha256:createHash('sha256').update(raw).digest('hex'),
 scope:'Exact finite-state enumeration and conditional arithmetic; no live player test',checks,
 assumptions:{hp:'Constitution +2 and fixed average HP; no defensive bonuses',newResult:'starts at level 1',rank4:'any >=4 kills before casting',combiningExcessAndGap:'not defined by author text; NOT modelled',higherConcentrationRanks:'Disadvantage retained for this separate conditional calculation'},
 ordinaryExcess:ordinary,expectedExcessUsesUntilFatal:expect,
 higherMagic:[risk(2,2),risk(2,3),risk(1,4)],penalties,
 concentration:{conBonus:2,damageSaveBase:10,normal:save(10,2),rank1:concentrationPass,rank2,rank3},
 enemy14:{saveBonus:5,dcBefore:dc14,successBefore:enemySaveBefore,successWithUneven1:enemySaveRank1,successWithUneven3:enemySaveRank3},
 slotValues:[{level:3,nativeSlotLevels:8,freeCopyLevelsAtMax:4},{level:5,nativeSlotLevels:16,freeCopyLevelsAtMax:9},{level:14,nativeSlotLevels:54,freeCopyLevelsAtMax:35}],
 oneStepRecovery:{excessDrawsToRemoveAtLeast:1,note:'Every surviving ordinary excess draw adds one level; each long rest removes only one selected level. Four different first-rank complications require four rests if no new levels accrue.'}
}
writeFileSync('reports/hakar-author-final-math-2026-11-05.json',JSON.stringify(out,null,2)+'\n')
console.log(JSON.stringify({checks:checks.length,ordinary:ordinary.filter(x=>[4,5,6,8,10,12,13].includes(x.n)),expected:expect,concentration:out.concentration,enemy14:out.enemy14,penalties},null,2))
