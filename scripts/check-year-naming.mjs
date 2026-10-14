import assert from 'node:assert/strict'
import {workingYearName as name,YEAR_IMAGES,YEAR_ASPECTS,YEAR_NAME_PERIOD,HISTORY_REFERENCE,YEAR_DICE_TABLE,diceYearName} from '../app/data/yearNaming.js'
assert.equal(YEAR_IMAGES.length,35)
assert.equal(YEAR_ASPECTS.length,35)
assert.equal(YEAR_NAME_PERIOD,1225)
const circle=Array.from({length:YEAR_NAME_PERIOD},(_,i)=>name(i))
assert.equal(new Set(circle.map(x=>x.name)).size,1225)
assert.equal(new Set(circle.map(x=>x.image.id+':'+x.aspect.id)).size,35*35)
for(const expected of ['Огненная Птица','Лазурный Каш','Кристальная Сова','Топазовый Бук','Коралловый Перепелятник','Лазуритовый Бык','Рубиновая Жаба','Лазурный Бык']) assert(circle.some(x=>x.name===expected),expected)
assert.equal(circle.find(x=>x.name==='Огненная Птица').yearLabel,'Огненной Птицы')
assert.equal(circle.find(x=>x.name==='Кристальная Сова').yearLabel,'Кристальной Совы')
assert.equal(circle.find(x=>x.name==='Рубиновая Жаба').yearLabel,'Рубиновой Жабы')
assert.equal(circle.find(x=>x.name==='Коралловый Перепелятник').yearLabel,'Кораллового Перепелятника')
assert.equal(name(0).name,'Пепельный Симург')
assert(!YEAR_IMAGES.some(image=>image.name==='Олень'))
assert(!YEAR_ASPECTS.some(aspect=>aspect.m==='Синий'))
for(let year=0;year<1225;year++) assert.equal(name(year+1225).name,name(year).name)
assert.equal(name(829).name,'Кристальный Барс')
assert.equal(name(829).round,1)
assert.equal(name(829).position,830)
assert.equal(name(829).year,830)
assert.equal(circle.find(x=>x.name==='Медный Павлин').yearLabel,'Медного Павлина')
assert.equal(circle.find(x=>x.name==='Халцедоновая Черепаха').yearLabel,'Халцедоновой Черепахи')
assert.equal(circle.find(x=>x.name==='Берилловый Кипарис').yearLabel,'Бериллового Кипариса')
assert.equal(HISTORY_REFERENCE.afterSplit-HISTORY_REFERENCE.afterEmbrace,HISTORY_REFERENCE.embraceAfterSplit)
assert(name(1000000))
assert.equal(name(-1),null)
assert.equal(name(1.5),null)
assert.equal(name(1000001),null)
assert(!circle.some(x=>x.name==='Красный Варан'))
console.log('Expanded cycle checks passed: all 1225 pairs, eight requested names, feminine grammar, rollover and long chronology.')

assert.equal(YEAR_DICE_TABLE.length,35)
const outcomes = new Map()
for(let a=1;a<=4;a++) for(let b=1;b<=4;b++) for(let c=1;c<=4;c++) for(let d=1;d<=4;d++) {
  const dice=[a,b,c,d], copy=[...dice]
  const result=diceYearName(dice,[1,1,1,1])
  assert(result)
  assert.deepEqual(dice,copy)
  outcomes.set(result.imageCode,(outcomes.get(result.imageCode)||0)+1)
}
assert.equal(outcomes.size,35)
for(const row of YEAR_DICE_TABLE) assert.equal(outcomes.get(row.code),row.multiplicity)
assert.equal(YEAR_DICE_TABLE.reduce((sum,row)=>sum+row.multiplicity,0),256)
assert.equal(diceYearName([4,4,4,4],[4,4,4,4]).yearLabel,'Перламутровой Гиены')
assert.deepEqual(diceYearName([3,1,4,1],[2,4,1,2]),diceYearName([1,1,3,4],[1,2,2,4]))
assert.equal(diceYearName([0,1,1,1],[1,1,1,1]),null)
assert.equal(diceYearName([1,1,1],[1,1,1,1]),null)
assert.equal(diceYearName([1,1,1,1],[1,2,3,5]),null)
console.log('4d4 checks passed: all 256 rolls, 35 sorted codes, grammar and invalid input.')

for (const [name, genitive] of [['Тахар','Тахара'],['Варан','Варана'],['Миндаль','Миндаля']]) {
  assert.equal(circle.find(x=>x.name===`Серебряный ${name}`).yearLabel,`Серебряного ${genitive}`)
}
console.log('Revised image checks passed: three approved replacements and genitive forms.')

for (const [name, genitive] of [['Павлин','Павлина'],['Архар','Архара'],['Лев','Льва'],['Скат','Ската'],['Ворон','Ворона'],['Панголин','Панголина'],['Як','Яка']]) {
  assert.equal(circle.find(x=>x.name===`Серебряный ${name}`).yearLabel,`Серебряного ${genitive}`)
}
assert(!YEAR_IMAGES.some(x=>x.name==='Снежный Лев'))
console.log('Remaining image checks passed: seven approved replacements and genitive forms.')

for(let i=0;i<1225;i++) {
  const next=name((i+1)%1225)
  assert.notEqual(circle[i].image.id,next.image.id)
  assert.notEqual(circle[i].aspect.id,next.aspect.id)
}
console.log('Interwoven cycle checks passed: both symbols change at every boundary.')

for(const label of ['Турмалиновый','Кварцевый','Жадеитовый','Гранатовый','Агатовый','Перламутровый']) {
  assert(circle.some(x=>x.name===`${label} Симург`))
  const stem=label.slice(0,-2)
  assert.equal(circle.find(x=>x.name===`${stem}ая Сова`).yearLabel,`${stem}ой Совы`)
}
console.log('Mineral aspect checks passed: all six replacements and feminine grammar.')

assert.equal(circle.find(x=>x.name==='Серебряный Ибикс').yearLabel,'Серебряного Ибикса')
assert(!YEAR_IMAGES.some(x=>['Лягушка','Ибис'].includes(x.name)))
console.log('Toad and Ibix checks passed: updated images and genitive forms.')

assert.equal(circle.find(x=>x.name==='Яшмовая Гиена').yearLabel,'Яшмовой Гиены')
console.log('Additional mineral aspect checks passed: jasper, beryl and chalcedony.')

assert.equal(circle.find(x=>x.name==='Топазовая Гиена').yearLabel,'Топазовой Гиены')
assert.equal(circle.find(x=>x.name==='Сердоликовый Вирм').yearLabel,'Сердоликового Вирма')
console.log('Topaz and carnelian checks passed.')
