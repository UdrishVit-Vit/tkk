import fs from 'node:fs'
function chance(mod, mode, d4s) {
 let wins=0, count=0
 const extras=d4s===0?[0]:d4s===1?[1,2,3,4]:[1,2,3,4].flatMap(a=>[1,2,3,4].map(b=>a+b))
 for(let a=1;a<=20;a++)for(let b=1;b<=(mode==='normal'?1:20);b++)for(const extra of extras){
  const die=mode==='normal'?a:mode==='advantage'?Math.max(a,b):Math.min(a,b)
  count++;if(die+mod+extra>=15)wins++
 }
 return 100*wins/count
}
const rows=[]
for(const [level,pb,ability]of [[1,2,3],[5,3,4],[11,4,5]])for(const expertise of [false,true])for(const mode of ['normal','advantage','disadvantage']){
 const modifier=ability+pb*(expertise?2:1)
 rows.push({level,pb,modifier,expertise,mode,dc:15,base:chance(modifier,mode,0),plusD4:chance(modifier,mode,1),plusD4AndGuidance:chance(modifier,mode,2)})
}
fs.writeFileSync('docs/backgrounds-2024/revision-2/math.json',JSON.stringify({method:'Exact enumeration, ability checks; no automatic failure on 1 or success on 20.',rows},null,2)+'\n')
console.log('18 level / expertise / dice-mode scenarios enumerated.')
