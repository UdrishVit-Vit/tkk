import fs from 'node:fs'
import assert from 'node:assert/strict'
import { DND55E_BACKGROUNDS as backgrounds } from '../app/data/dnd55e/backgrounds.js'
import { revisions, spellNotes } from './lib/enoa-origin-revisions.mjs'
import { concepts } from './lib/enoa-origin-concepts.mjs'

const root = 'docs/backgrounds-2024/revision-3/'
const before = JSON.parse(fs.readFileSync(root + 'before.json', 'utf8'))
const criteria = ['Соответствие предыстории','Правила 2024','Механическая уникальность','Игровая полезность','Баланс','Понятность','Универсальность','Совместимость с классами','Лор Эноа','Удобство за столом']
const narrow = new Set(['knot-scribe','huurch','lifestone-wright','mithras-picker','sarban-drover','crystal-eye','flame-keeper','elixir-warden','titania-returned','dangun-secret','chosen-of-batrina','apprentice-of-the-star','ruzda-apprentice','servant-of-the-meridirs','blue-blooded'])
const complex = new Set(['lifestone-wright','mithras-picker','ruzda-apprentice','dangun-secret','the-winds-game','deep-brother','hakar'])
const movement = new Set(['mlah-diver','cohort-renegade','nameless','silk-mouse-catcher','baraskus-foot','white-falcon-watcher','white-hunter','word-preacher','brotherhood-debtor','hound-of-the-dune-shah','chosen-of-batrina','the-winds-game'])
const support = new Set(['hakar','mithras-caravaneer','bone-seer','caravanserai-keeper','sarban-drover','spark-shepherd','nagbo','norbu','tower-echo','moon-maiden','word-preacher','ripple-listener','blind-bunti','deep-brother','steppe-tiger','tea-house-keeper','omor-without-obo','who-pleased-chidkur'])
const knowledge = new Set(['knot-scribe','huurch','lifestone-wright','mithras-picker','syndicate-appraiser','urdreg-hunter','great-game-player','spiral-runner','cradle-born','crystal-eye','flame-keeper','elixir-warden','dangun-secret','apprentice-of-the-star','ruzda-apprentice','servant-of-the-meridirs','spiral-dweller'])
const prepared = new Set(['hakar','mithras-caravaneer','bone-seer','caravanserai-keeper','urdreg-hunter','spiral-runner','omen-reader','deep-brother','tea-house-keeper','omor-without-obo','who-pleased-chidkur'])
const roleFor = id => movement.has(id) ? 'Позиционирование и спасение' : support.has(id) ? 'Поддержка и подготовка' : knowledge.has(id) ? 'Исследование и профессиональная работа' : 'Личная защита и устойчивость'
const analoguesFor = id => movement.has(id) ? ['Alert','Tavern Brawler','Lucky'] : support.has(id) ? ['Musician','Healer','Magic Initiate'] : knowledge.has(id) ? ['Skilled','Crafter','Magic Initiate'] : ['Lucky','Tough','Alert']
const levels = [{level:1,pb:2,ability:3},{level:5,pb:3,ability:4},{level:11,pb:4,ability:5},{level:17,pb:6,ability:5}]

function distribution(mode) {
  const values=[]
  for(let a=1;a<=20;a++)for(let b=1;b<=20;b++)values.push(mode==='advantage'?Math.max(a,b):mode==='disadvantage'?Math.min(a,b):a)
  return values
}
function chance(values, modifier, dc, d4=false) {
  let success=0,total=0
  for(const roll of values)for(let die=1;die<=(d4?4:1);die++){total++;if(roll+modifier+(d4?die:0)>=dc)success++}
  return success/total
}
const probability = []
for(const l of levels)for(const expertise of [false,true])for(const mode of ['normal','advantage','disadvantage'])for(const dc of [10,15,20]) {
  const modifier=l.ability+l.pb*(expertise?2:1),p=chance(distribution(mode),modifier,dc)
  probability.push({level:l.level,pb:l.pb,modifier,expertise,mode,dc,base:p,plusD4:chance(distribution(mode),modifier,dc,true),
    // Under advantage/disadvantage a reroll replaces one chosen die, not the whole pair.
    rerollOneOnFailure: (()=>{let wins=0;for(let a=1;a<=20;a++)for(let b=1;b<=20;b++)for(let c=1;c<=20;c++){
      const initial=mode==='advantage'?Math.max(a,b):mode==='disadvantage'?Math.min(a,b):a
      const rerolled=mode==='advantage'?Math.max(Math.max(a,b),c):mode==='disadvantage'?Math.min(Math.max(a,b),c):c
      if(initial+modifier>=dc||rerolled+modifier>=dc)wins++
    }return wins/8000})()})
}
// Attack penalty check respects automatic natural-20 hits and natural-1 misses.
const attackPenalty=[]
for(const ac of [12,16,20,25]){
 let base=0,after=0
 for(let d=1;d<=20;d++)for(let penalty=1;penalty<=4;penalty++){
  if(d===20||(d!==1&&d+5>=ac))base++
  if(d===20||(d!==1&&d+5-penalty>=ac))after++
 }
 attackPenalty.push({ac,attackBonus:5,before:base/80,after:after/80})
}
const math={method:'Exact enumeration, checks/saves; attack auto-results handled separately. No table play performed.',probability,attackPenalty}
fs.writeFileSync(root+'math.json',JSON.stringify(math,null,2)+'\n')
const pct=n=>(n*100).toFixed(2)+'%'

function metric(f, l) {
 const t=f.action,pb=l.pb,uses=f.resourceModel==='PB'?pb:1
 const base=probability.find(x=>x.level===l.level&&!x.expertise&&x.mode==='normal'&&x.dc===15)
 if(/1к10/.test(t)) return `Среднее уменьшение ${5.5+pb}, максимум за ${uses} применений ${(5.5+pb)*uses}; фактически не больше входящего подходящего урона.`
 if(/уменьшите.*1к6|уменьшить.*1к6|уменьшите[^]*на 1к6/.test(t)) return `Среднее уменьшение ${3.5+pb}, верхняя средняя сумма ${(3.5+pb)*uses}; нужны триггеры и свободные реакции.`
 if(f.relatedBackgrounds[0]==='moon-maiden')return `Среднее уменьшение ${pb+2.5}; сумма до ${(pb+2.5)*uses} при достаточном входящем уроне, расход реакции.`
 if(f.relatedBackgrounds[0]==='tower-echo')return 'При атаке +5 против КД16 снижение шанса попадания с 50% до 37,5%; действие Уклонение и реакция. Естественная 20 не отменяется.'
 if(f.relatedBackgrounds[0]==='tea-house-keeper')return `До ${pb} получателей по ${pb} временных хитов: ${pb*pb} за подготовку; требуется Кость хитов, значения не складываются.`
 if(f.relatedBackgrounds[0]==='caravanserai-keeper')return `До 3 × ${pb} = ${3*pb} дополнительных восстановленных хитов за подготовку; у каждой цели свой дневной предел.`
 if(f.relatedBackgrounds[0]==='omor-without-obo')return `До 3 × ${pb} = ${3*pb} временных хитов; одна узкая защита от погоды каждому, без суммирования.`
 if(f.relatedBackgrounds[0]==='spark-shepherd')return 'Одна Кость хитов цели: средние d6/d8/d10/d12 = 3,5/4,5/5,5/6,5; без модификатора, расход Кости и дневной предел цели.'
 if(/1к4/.test(t))return `Сл15, модификатор +${base.modifier}: ${pct(base.base)} → ${pct(base.plusD4)} при 1к4. Средняя прибавка 2,5; это условная модель, не гарантированный успех.`
 if(/повтор|переброс/.test(t))return `Сл15, модификатор +${base.modifier}: ${pct(base.base)} → ${pct(base.rerollOneOnFailure)} при повторе только провала. Для «Последней капли» триггер уже: только единица, прирост без преимущества 0,05 × ${pct(base.base)}.`
 if(/Преимущество/.test(t)){const adv=probability.find(x=>x.level===l.level&&!x.expertise&&x.mode==='advantage'&&x.dc===15);return `Сл15, модификатор +${base.modifier}: ${pct(base.base)} → ${pct(adv.base)}. При уже имеющемся преимуществе прирост 0; при помехе получается обычный бросок.`}
 return `Числовая сила не растёт автоматически; ${uses} применений. Дистанции, грузоподъёмность, длительность и требования из текста сохраняются.`
}

function interactions(f) {
 const id=f.relatedBackgrounds[0],t=f.action+' '+f.benefits[1].text
 return [
  ['Навыки, инструменты, Компетентность', /владение|провер|Преимущество/.test(t)?'Обычный бонус владения добавляется один раз; Компетентность удваивает его, но не кубик черты. Владение инструментом не заменяет требуемое владение навыком. Если сочетание навыка и инструмента уже дало Преимущество, второго нет.':'Черта не меняет бонус владения или Компетентность; автоматический узкий результат не раскрывает больше, чем сказано.'],
  ['Преимущество, помеха, вдохновение', 'Преимущества не складываются. Преимущество и помеха дают обычный бросок. Героическое вдохновение и другие законные источники могут помочь тому же броску, но эта черта не позволяет повторять собственный повтор; при двух к20 перебрасывается один выбранный кубик.'],
  ['Действия и классы', /реакци/i.test(t)?'Реакция конкурирует с Провоцированной атакой, Щитом и Невероятным уклонением плута. Потраченная реакция недоступна до обычного восстановления; черта новой реакции не даёт.': /Бонусным|бонусным/.test(t)?'Бонусное действие конкурирует с Хитрым действием плута и Яростью варвара; второе бонусное действие не появляется.':'Указанное действие или время не сокращается Хитрым действием. Дополнительная атака не превращает Изучение, Использование или Магию в отдельную атаку.'],
  ['Концентрация, Магия, Использование', /Концентраци|заговор|магический эффект|мыслен/.test(t)?'Обычная Концентрация допускает один эффект одновременно. Заговор использует указанный список и обычные компоненты; высокоуровневых заклинаний и бесплатных ячеек нет. Магический приём не является заклинанием, если это прямо не сказано. Ярость ограничивает заклинания и Концентрацию обычным образом.':'Приём немагический, не требует Концентрации. Он не даёт действия Магия или доступа к заклинаниям. Действие Использование применяется только там, где названо; ускорение предметов работает лишь по тексту соответствующей классовой особенности.'],
  ['Отдых и накопление', prepared.has(id)?'Подготовка расходует применение при указанном завершении; неиспользованная подготовка не возвращает ресурс. При завершении Продолжительного отдыха действующие подготовки этого владельца заканчиваются, затем восстанавливается ресурс. При нескольких владельцах одинаковые преимущества не складываются.':'Продолжительный отдых восстанавливает ресурс; Короткий отдых сам по себе этого не делает. Новый день без отдыха ресурса не возвращает.'],
  ['Временные хиты, лечение, состояния', /временные хиты|восстанавл.*хиты|Кост/.test(t)?'Временные хиты не складываются, не лечат и не поднимают существо с 0 хитов. Настоящее лечение ограничено максимумом хитов, расходом Костей и указанным дневным пределом; стабилизация не является лечением.':'Состояния снимаются только при прямом указании. Уменьшение урона применяется до сопротивления и уязвимости; это не лечение и не временные хиты. Скорость 0 не преодолевается перемещением из черты.'],
  ['Повторы, другие бонусы, виды', 'Прибавка 1к4 может сочетаться с Указанием или Благословением, когда подходят оба текста; это расход разных ресурсов, а не два применения одной черты. Видовая Скорость, чувства, размер и грузоподъёмность сохраняются. Сл не снижается автоматически; проверки не создают возможность невозможного действия.'],
 ]
}

const feats=before.map(old=>{
 const id=old.relatedBackgrounds[0],b=backgrounds.find(b=>b.id===id),r=revisions[id]||{},c=concepts[id]
 assert(c?.length===5,id)
 const limit=r.limit||(old.balance.usesAtLevels[0]===2?'PB':'1')
 let active=r.active||old.action,utility=r.utility||old.benefits[1].text
 // General precision corrections, still specific to the corresponding ability.
 if(id==='cohort-renegade') active+=' Это перемещение использует обычные способы движения и дополнительные затраты местности.'
 if(id==='bone-seer'||id==='who-pleased-chidkur')active+=' Применение расходуется по окончании подготовки, а не при последующем броске.'
 if(id==='caravanserai-keeper')active+=' Размещённые гости должны находиться в пределах 30 футов и завершить отдых в течение 8 часов после подготовки.'
 if(id==='baraskus-foot')active+=' Приём применяется без отдельного действия в момент Рывка; передача не позволяет применить предмет.'
 if(id==='word-preacher')active=active.replace('Действием Использование','Особым действием')
 if(id==='tea-house-keeper')active+=' Одно существо может получить временные хиты от этой черты только один раз между своими Долгими отдыхами, независимо от числа хозяев.'
 if(id==='blood-of-the-heshegi')active=active.replace('против Испуга или Очарования','против состояний Испуганный или Очарованный')
 if(id==='apprentice-of-the-star')active=active.replace('предмет также получает временные хиты, равные вашему бонусу мастерства, до вашего следующего Долгого отдыха. Это не повышает цену, КД или урон предмета','до вашего следующего Долгого отдыха вы можете один раз без действия прибавить 1к4 к проверке характеристики, использующей этот предмет по его обычному назначению, объявив это до броска. Это не действует на атаки, спасброски, цену, КД или урон предмета')
 if(spellNotes[id])utility+=' '+spellNotes[id]
 const resource=limit==='PB'?'Число применений равно вашему бонусу мастерства.':'Вы можете применить этот приём один раз.'
 const precision='Применение расходуется при выполнении приёма, независимо от успеха, если выше не указан другой момент. На один бросок или одно событие можно потратить не более одного применения этой черты; повторный бросок нельзя снова перебросить ею. Все применения восстанавливаются по окончании Продолжительного отдыха.'
 const expiry=prepared.has(id)?' Все ваши действующие подготовки этой черты заканчиваются при завершении вами Продолжительного отдыха, до восстановления применений.':''
 const intro=(b.summary+' '+old.summary).trim()
 const scores=[9,9,8,narrow.has(id)?6:8,8,complex.has(id)?8:9,narrow.has(id)?6:8,9,9,complex.has(id)?7:9]
 const total=scores.reduce((a,b)=>a+b,0), status=total>=85&&!narrow.has(id)&&!complex.has(id)?'Playtest':'Draft'
 const f={...old,version:'0.3.0',status,summary:intro,action:active,uses:resource,recovery:'Все применения основного приёма восстанавливаются по окончании Продолжительного отдыха. Вспомогательное свойство не расходует их.',
   resourceModel:limit,role:roleFor(id),benefits:[{title:old.title,text:active+' '+resource+' '+precision+expiry},{title:'Приобретённый опыт',text:utility}],
   balance:{...old.balance,comparator:analoguesFor(id).join('; '),usesAtLevels:levels.map(l=>limit==='PB'?l.pb:1),verdict:status==='Playtest'?'Готова к ограниченному игровому тестированию; не утверждена':'Нужен тест частоты применения и/или дополнительная редактура; не утверждена',score:total,ratings:Object.fromEntries(criteria.map((k,i)=>[k,scores[i]])),
     concern:narrow.has(id)?'Полезность зависит от частоты конкретных профессиональных ситуаций. '+old.balance.concern:complex.has(id)?'Проверить цену ведения дополнительных условий за столом. '+old.balance.concern:old.balance.concern},
   design:{origin:b.summary,activity:b.enoaLead.join(' '),concepts:[],scenarios:[],interactions:[]}}
 f.design.concepts=[{title:f.title,origin:old.summary,effect:active,activation:'Указана в полном тексте приёма.',frequency:resource,application:c[2]+'; '+c[3],analogues:analoguesFor(id),risk:f.balance.concern,selected:true},...c.slice(0,2).map(raw=>{const [title,effect,activation,frequency,analogue,risk]=raw.split('|');return {title,origin:old.summary,effect,activation,frequency,application:c[2]+'; '+c[3],analogues:[analogue],risk,selected:false}})]
 f.design.selection='Выбран вариант «'+f.title+'»: '+(movement.has(id)?'игрок решает, где оказаться и кого вывести из опасности.':support.has(id)?'опыт превращается в подготовку или помощь конкретному спутнику.':knowledge.has(id)?'у персонажа есть воспроизводимая профессиональная процедура с ограниченным результатом.':'защита требует конкретного решения и расхода ресурса.')+' Альтернативы уступают по указанным в таблице рискам; это предварительный выбор для тестирования, а не доказательство превосходства.'
 f.design.interactions=interactions(f)
 const reaction=/реакци/i.test(active), advantage=/Преимущество/.test(active)
 const combination=reaction?'У персонажа также есть заклинание Щит или Невероятное уклонение; оба эффекта требуют реакции.':advantage?'Персонаж владеет подходящим навыком с Компетентностью и уже получает Преимущество от помощи союзника.':movement.has(id)?'У персонажа есть увеличенная видовая Скорость, но на нём состояние Схваченный.':'На ту же допустимую проверку союзник накладывает Указание; если приём не использует проверки, Указание на него не влияет.'
 const comboResult=reaction?'Нужно выбрать один расход реакции; после её траты второй эффект недоступен.':advantage?'Компетентность применяется, но второе Преимущество не даёт третий к20.':movement.has(id)?'Скорость 0 блокирует движение, увеличение Скорости не снимает захват.':'Прибавки применяются только к совпадающей проверке; автоматический результат не получает числового усиления.'
 f.design.scenarios=[
  {type:'Стандартный',circumstances:c[2],decision:'Применить основной приём при выполнении всех условий.',rule:active,result:'Применить только описанный результат, потратить одно применение; остальные последствия ситуации сохраняются.',issue:'Частота такой сцены должна быть измерена в живой игре.'},
  {type:'Нестандартный',circumstances:c[3],decision:'Использовать ту же процедуру вне исходной профессии.',rule:active,result:'Допустимо при совпадении условий: название предыстории, город, членство и класс не являются предпосылками.',issue:'Не расширять эффект на другие цели или способы применения по художественному сходству.'},
  {type:'Пограничный',circumstances:c[4],decision:'Проверить возможность применения до расхода ресурса.',rule:active,result:'Соблюсти указанную границу: черта не отменяет препятствие. Если цель была заведомо недопустима, действие черты не начинается; если условие выясняется только после попытки, действует явно указанная трата.',issue:'Уточнение внесено в механический текст; не давать скрытых сведений через пробные попытки.'},
  {type:'Комбинация',circumstances:combination,decision:'Попытаться совместить преимущества в одной ситуации.',rule:f.design.interactions[1][1]+' '+f.design.interactions[2][1],result:comboResult,issue:'Разрешённое сочетание не означает неограниченную частоту применения.'},
  {type:'Злоупотребление',circumstances:prepared.has(id)?'Игрок заранее подготавливает несколько эффектов, затем отдыхает и пытается сохранить их вместе с восстановленным ресурсом.':'Игрок пытается повторять приём на одном броске или событии до получения нужного результата.',decision:'Повторять процедуру, используя несколько владельцев или несколько применений.',rule:precision+expiry,result:prepared.has(id)?'Подготовки владельца прекращаются до восстановления ресурса; одинаковые эффекты не складываются.':'На один бросок или событие допускается одно применение; повтор не запускает повтор той же черты.',issue:'Самостоятельные разные эффекты других черт могут сочетаться в рамках обычных правил; они не создают ресурс этой черты.'}
 ]
 f.design.levels=levels.map(l=>({...l,uses:limit==='PB'?l.pb:1,analysis:metric(f,l)}))
 return f
})

assert.equal(feats.length,57)
for(const f of feats){assert.equal(f.design.concepts.length,3);assert.equal(f.design.scenarios.length,5)}
fs.writeFileSync(root+'review-data.json',JSON.stringify(feats,null,2)+'\n')
fs.writeFileSync('app/data/dnd55e/origin-feats-enoa-drafts.js','// Generated by scripts/build-enoa-origin-revision3.mjs. Unpublished proposals; approval is external.\n// Detailed concepts and scenarios: docs/backgrounds-2024/revision-3/review-data.json\nexport const ENOA_ORIGIN_DRAFTS = '+JSON.stringify(feats.map(({design,...feat})=>feat),null,2)+'\n')

const table=(headers,rows)=>'| '+headers.join(' | ')+' |\n| '+headers.map(()=>'---').join(' | ')+' |\n'+rows.map(r=>'| '+r.map(v=>String(v).replaceAll('|','/').replaceAll('\n',' ')).join(' | ')+' |').join('\n')
const links=feats.map(f=>`| ${backgrounds.find(b=>b.id===f.relatedBackgrounds[0]).title} | [${f.title}](feats/${f.relatedBackgrounds[0]}.md) | ${f.status} | ${f.balance.score}/100 |`).join('\n')
fs.mkdirSync(root+'feats',{recursive:true})
for(const f of feats){
 const id=f.relatedBackgrounds[0],b=backgrounds.find(b=>b.id===id)
 const comparisons=f.design.concepts[0].analogues.map(a=>[a, a==='Skilled'?'Проект даёт конкретную процедуру; не выдаёт три постоянных владения.':a==='Crafter'?'Проект не предоставляет скидку и не создаёт товар; результат ограничен указанной задачей.':a==='Magic Initiate'?'Проект не выдаёт полный набор заклинаний; магические элементы перечислены прямо.':a==='Alert'?'Проект не усиливает инициативу; польза зависит от позиции и выбранного момента.':a==='Tavern Brawler'?'Проект не увеличивает постоянный урон безоружных атак; перемещение или предметный приём ограничены условиями.':a==='Lucky'?'Проект имеет более узкий триггер и отдельную цену действия; универсальность меньше.':a==='Tough'?'Проект не увеличивает максимум хитов; уменьшение вреда зависит от подходящих событий и ресурса.':a==='Healer'?'Проект не заменяет медицинское лечение; см. отдельные ограничения Костей хитов, отдыха и получателей.':'Проект не раздаёт универсальное вдохновение всей группе после каждого отдыха; помощь привязана к конкретной процедуре.', 'Частота: '+f.uses+' Цена и эффект: см. выбранную механику.'])
 const text=`# ${b.title} — ${f.title}

## А. Опыт персонажа

${b.summary}

${b.enoaLead.join('\n\n')}

**Цепочка:** прежняя деятельность → ${f.summary} → ${f.role.toLowerCase()} → конкретный приём ниже → решение в ситуации «${concepts[id][2]}».

**Повторяемая работа и знания:** ${b.skills.join(', ')}; ${b.toolDisplay||b.tool}. Это описание опыта, а не дополнительные владения от черты. Отличительная проблема: ${concepts[id][4]}. Приключенческое применение вне профессии: ${concepts[id][3]}.

## Б. Три концепции

${table(['Концепция','Происхождение','Преимущество','Активация','Частота','Применение','Аналоги','Риск'],f.design.concepts.map(c=>[c.title,c.origin,c.effect,c.activation,c.frequency,c.application,c.analogues.join(', '),c.risk]))}

${f.design.selection}

## В. Игровой текст

### ${f.title}

*Черта происхождения (Origin Feat)*

${f.summary}

${f.benefits.map(x=>`**${x.title}.** ${x.text}`).join('\n\n')}

## Г. Баланс

${table(['Ориентир','Содержательное различие','Цена проекта'],comparisons)}

Сравнения охватывают разные стороны полезности, а не три идентичных эффекта. На первом уровне уже доступны весь приём и вспомогательное свойство. Класс и связанную предысторию иметь не обязательно; требуемые инструменты и материалы нужно получить обычным способом. Роль: ${f.role}. Польза союзникам: ${support.has(id)||/союзник|согласн|получател/.test(f.action)?'прямо предусмотрена при соблюдении условий':'основной эффект личный; результат исследования можно сообщить другим'}.

**Частота и контроль:** ${narrow.has(id)?'Нужна профессиональная сцена; игрок может искать подходящие задачи, но не гарантирует их появление. Поэтому статус Draft.':'Триггер воспроизводим в описанных сценах; игрок выбирает момент, но не создаёт опасность или успех автоматически.'} Ведущий задаёт обычную Сл и доступные сведения; не назначает произвольный размер бонуса черты. Число применений — ограничитель, а не доказательство баланса.

${table(['Уровень','БМ','Применения','Расчёт / функциональность'],f.design.levels.map(l=>[l.level,l.pb,l.uses,l.analysis]))}

Полный перебор бросков, включая Компетентность, преимущество и помеху: [math.json](../math.json). Числа — аналитическая модель, не результаты партии. Уменьшение урона ограничено входящим уроном; путешествия и получение сведений не переводятся в фиктивный «урон за раунд».

## Д. Взаимодействия

${table(['Правило','Результат разбора'],f.design.interactions)}

## Е. Пять сценариев

${f.design.scenarios.map(s=>`### ${s.type}\n\n**Обстоятельства:** ${s.circumstances}.\n\n**Решение:** ${s.decision}\n\n**Правило:** ${s.rule}\n\n**Ожидаемый результат:** ${s.result}\n\n**Проблема / ограничение проверки:** ${s.issue}`).join('\n\n')}

Это проверка текста на моделируемых ситуациях. Реальные игроки эти сценарии в рамках данной работы не проходили.

## Ж. Предварительная экспертная оценка

${table(['Критерий','Баллы'],Object.entries(f.balance.ratings))}

**Всего: ${f.balance.score}/100.** ${f.balance.verdict}. ${f.balance.concern} Оценки предварительные; особенно нуждаются в проверке частота применения и универсальность. Порог 85 не заменяет разрешение владельца и не означает Approved.

## З. Внутренние метаданные

ID: ${f.id}. Предыстория: ${id}. Версия: ${f.version}. Источник: Эноа / Homebrew. Категория: Origin. Статус: **${f.status}**. Предпосылок нет, повторное получение не разрешено. Предлагается **вместо** «${b.feat.title}», не дополнительно. Публичное назначение не изменено.

Источники: [правила и ограничения доступа](../sources.md); текущая предыстория app/data/dnd55e/backgrounds.js#${id}; [архив предыдущего проекта](../before.json). Новые культурные факты из механики не выводятся.
`
 fs.writeFileSync(root+'feats/'+id+'.md',text)
}
fs.writeFileSync(root+'index.md',`# Уникальные черты происхождения Эноа — редакция 0.3.0

57 авторских предысторий, 57 самостоятельных черт, 171 концепция и 285 сценариев разбора. Для 16 адаптаций PHB новые черты не создавались. Статусы: ${feats.filter(f=>f.status==='Playtest').length} Playtest и ${feats.filter(f=>f.status==='Draft').length} Draft. Approved нет. Публичный каталог и опубликованные назначения сохранены по пункту 14 ТЗ.

Это авторские предложения, а не официальные правила и не отчёт о состоявшихся игровых тестах. В каждой карточке раздел В содержит игровой текст, остальные разделы — материалы разработки.

[Источники](sources.md) · [Математическая модель](math.json) · [Предпросмотр игровых текстов](preview.html)

| Предыстория | Черта | Статус | Оценка |
|---|---|---|---|
${links}
`)
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
fs.writeFileSync(root+'preview.html',`<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Эноа — 57 проектов черт</title><style>body{margin:0;background:#111216;color:#e9e4db;font:16px/1.75 system-ui}main{max-width:900px;margin:auto;padding:40px 24px}h1,h2{font-family:Georgia,serif;line-height:1.25}h2{font-size:30px}a{color:#d9c18b}article{padding:28px 0;border-top:1px solid #514837}small{color:#b4aa97}.benefit{padding:12px 0}.benefit h3{font-size:16px;color:#d9c18b}.benefit p{margin:0}.index{columns:2;column-width:240px}article:target{border-top-color:#e6c986} @media print{body{background:white;color:black}.index{display:none}article{break-before:page}a{color:inherit}}</style><main><h1>Эноа: черты происхождения</h1><p>Редакция 0.3.0 для обсуждения и тестов. Эти проекты ещё не назначены персонажам и не опубликованы в каталоге сайта.</p><nav class="index" aria-label="Черты">${feats.map(f=>`<p><a href="#${f.id}">${escape(f.title)}</a></p>`).join('')}</nav>${feats.map(f=>`<article id="${f.id}"><small>${escape(backgrounds.find(b=>b.id===f.relatedBackgrounds[0]).title)} · ${f.status}</small><h2>${escape(f.title)}</h2><p>${escape(f.summary)}</p>${f.benefits.map(b=>`<section class="benefit"><h3>${escape(b.title)}</h3><p>${escape(b.text)}</p></section>`).join('')}<p><a href="feats/${f.relatedBackgrounds[0]}.md">Разбор концепций, баланс и сценарии</a> · <a href="#">К списку</a></p></article>`).join('')}</main></html>`)
console.log(`Built ${feats.length} proposals, ${feats.filter(f=>f.status==='Playtest').length} Playtest; 57 dossiers, 171 concepts, 285 scenarios, ${probability.length} probability cases.`)
