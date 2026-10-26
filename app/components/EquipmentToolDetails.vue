<script setup>
import { computed, ref, watch } from 'vue'
import { toolGuide, toolTasks } from '~/data/dnd55e/toolGuides.js'
const props = defineProps({ item: { type: Object, required: true }, equipment: { type: Array, default: () => [] } })
const guide = computed(() => toolGuide(props.item))
const tasks = computed(() => toolTasks(props.item))
const official = computed(() => props.item.source === 'PHB 2024')
const hasCraft = computed(() => props.item.craft && props.item.craft !== '—')
const anchor = section => `tool-${props.item.id}-${section}`
function jump(section) {
  const target = document.getElementById(anchor(section))
  target?.scrollIntoView({ block: 'start', behavior: 'instant' })
  target?.focus({ preventScroll: true })
}
const modifier = ref(0)
const proficiency = ref(2)
const trained = ref(true)
const skill = ref(false)
watch(() => props.item.id, () => { modifier.value = 0; proficiency.value = 2; trained.value = true; skill.value = false })
const bonus = computed(() => Number(modifier.value) + ((trained.value || skill.value) ? Number(proficiency.value) : 0))
const craftItems = computed(() => (props.item.craft || '').split(';').map(title => {
  const label = title.trim()
  const entry = props.equipment.find(row => row.title.toLocaleLowerCase('ru') === label.toLocaleLowerCase('ru'))
  return { label, id: entry?.id }
}))
</script>

<template>
  <div class="tool-guide">
    <nav class="tool-nav" aria-label="Разделы инструмента">
      <a :href="'#' + anchor('actions')" @click.stop.prevent="jump('actions')">Применение</a>
      <a :href="'#' + anchor('check')" @click.stop.prevent="jump('check')">Проверка</a>
      <a v-if="hasCraft" :href="'#' + anchor('craft')" @click.stop.prevent="jump('craft')">Создание</a>
      <a v-if="item.details?.length" :href="'#' + anchor('details')" @click.stop.prevent="jump('details')">Особые правила</a>
    </nav>

    <section :aria-labelledby="anchor('actions')">
      <h3 :id="anchor('actions')" tabindex="-1">Что можно сделать</h3>
      <p v-if="!official">{{ item.description }}</p>
      <p v-if="official" class="tool-muted">Действие «Использование»: выберите одну задачу. Для особого объекта могут действовать его собственные правила.</p>
      <p v-else class="tool-muted">Авторские применения. Время и условия уточняются в особых правилах ниже.</p>
      <ul class="tool-actions">
        <li v-for="task in tasks" :key="task.text"><span>{{ task.text }}</span><strong v-if="task.dc">Сл {{ task.dc }}</strong></li>
      </ul>
      <aside class="tool-example"><h4>Пример за столом</h4><p>{{ guide.example }}</p><p class="tool-muted">{{ guide.note }}</p></aside>
    </section>

    <section class="tool-section" :aria-labelledby="anchor('check')">
      <h3 :id="anchor('check')" tabindex="-1">Как совершить проверку</h3>
      <p>Бросьте к20 и прибавьте модификатор характеристики. Владение инструментом позволяет добавить бонус мастерства. Если к этой же проверке применимо владение навыком, владение обоими даёт Преимущество; бонус мастерства не удваивается.</p>
      <p class="tool-muted">Подходящий навык зависит от задачи. Компетентность, помеха и дополнительные эффекты учитываются по своим правилам.</p>
      <details class="tool-calculator">
        <summary>Подсчитать базовый бонус проверки</summary>
        <div class="tool-inputs">
          <label>Модификатор характеристики<select v-model.number="modifier"><option v-for="n in 16" :key="n" :value="n - 6">{{ n - 6 >= 0 ? '+' : '' }}{{ n - 6 }}</option></select></label>
          <label>Бонус мастерства<select v-model.number="proficiency"><option v-for="n in 5" :key="n" :value="n + 1">+{{ n + 1 }}</option></select></label>
        </div>
        <label class="tool-checkbox"><input v-model="trained" type="checkbox"> Есть владение инструментом</label>
        <label class="tool-checkbox"><input v-model="skill" type="checkbox"> Есть владение навыком, применимым к этой проверке</label>
        <output aria-live="polite">к20 {{ bonus >= 0 ? '+' : '−' }} {{ Math.abs(bonus) }}<span v-if="trained && skill"> · Преимущество от двух владений</span></output>
        <p class="tool-muted">Расчёт без Компетентности, помехи и других эффектов. Он не определяет, подходит ли навык к ситуации.</p>
      </details>
    </section>

    <section v-if="hasCraft" class="tool-section" :aria-labelledby="anchor('craft')">
      <h3 :id="anchor('craft')" tabindex="-1">Что можно создать</h3>
      <ul class="tool-craft"><li v-for="entry in craftItems" :key="entry.label"><NuxtLink v-if="entry.id" :to="'/dnd55e/equipment?item=' + entry.id">{{ entry.label }}</NuxtLink><span v-else>{{ entry.label }}</span></li></ul>
      <p v-if="official">Для обычного немагического предмета нужны инструмент, владение им и подходящее сырьё стоимостью в половину цены предмета с округлением вниз. Число рабочих дней равно цене в зм, делённой на 10 с округлением вверх; рабочий день — 8 часов.</p>
      <p v-if="item.id === 'tool-herbalism-kit'" class="tool-special"><strong>Обычное зелье лечения:</strong> набор травника, владение им, 25 зм сырья и 8 часов работы. Это отдельное правило, а не обычный расчёт изготовления.</p>
      <p v-if="item.id === 'tool-calligraphers-supplies'" class="tool-special"><strong>Запись заклинания:</strong> нужна подготовка заклинания на каждый день работы, необходимые компоненты и владение Магией или этими инструментами. Время и расходы зависят от уровня заклинания — используйте таблицу «Создание снаряжения» в справочнике над каталогом.</p>
      <p v-if="official" class="tool-muted">Наличие инструментов не означает наличие сырья. Возможность работы и доступ к материалам определяет мастер; изготовление не происходит за одно действие.</p>
    </section>

    <section v-if="item.details?.length" class="tool-section" :aria-labelledby="anchor('details')">
      <h3 :id="anchor('details')" tabindex="-1">Особые правила</h3>
      <article v-for="detail in item.details" :key="detail.title" class="tool-detail">
        <h4>{{ detail.title }}</h4><p>{{ detail.text }}</p>
        <div v-if="detail.table" class="tool-table-scroll"><table><caption>{{ detail.title }}</caption><thead><tr><th v-for="column in detail.table.columns" :key="column" scope="col">{{ column }}</th></tr></thead><tbody><tr v-for="(row, i) in detail.table.rows" :key="i"><td v-for="(cell, j) in row" :key="j">{{ cell }}</td></tr></tbody></table></div>
      </article>
    </section>
    <footer class="tool-footer">
      <NuxtLink v-for="use in item.usedBy || []" :key="use.path" :to="use.path">{{ use.title }} →</NuxtLink>
      <a v-if="official" href="https://www.dndbeyond.com/sources/dnd/br-2024/equipment#Tools" target="_blank" rel="noopener">Правила инструментов 2024 ↗</a>
      <span v-else>{{ item.sourceTitle }}</span>
    </footer>
  </div>
</template>

<style scoped>
.tool-guide{margin-top:20px;font-size:14px;line-height:1.7;color:rgba(var(--theme-text-rgb),.87)}
.tool-nav{display:flex;flex-wrap:wrap;gap:8px 22px;padding-bottom:12px;margin-bottom:22px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.22)}
.tool-guide a{color:var(--theme-accent-strong);text-underline-offset:4px}.tool-nav a{text-decoration:none;font-size:13px}.tool-guide a:hover{text-decoration:underline}
.tool-guide :is(a,summary,select,input):focus-visible{outline:2px solid var(--theme-accent-strong);outline-offset:4px}
.tool-guide h3{margin:0 0 10px;font-size:19px;line-height:1.4;color:var(--theme-heading);scroll-margin-top:24px}.tool-guide h4{margin:0 0 6px;font-size:14px;color:var(--theme-heading)}
.tool-guide p{margin:8px 0}.tool-muted{font-size:13px;color:rgba(var(--theme-text-rgb),.65)}
.tool-actions{list-style:none;padding:0;margin:14px 0}.tool-actions li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:16px;padding:14px 0;border-bottom:1px solid rgba(var(--theme-text-rgb),.12)}.tool-actions strong{color:var(--theme-accent-strong);white-space:nowrap}
.tool-example{padding:14px 18px;border-left:2px solid rgba(var(--theme-accent-rgb),.5);background:rgba(var(--theme-accent-rgb),.035);margin-top:18px}.tool-example p:last-child{margin-bottom:0}
.tool-section{margin-top:28px}.tool-calculator{margin-top:16px;border:1px solid rgba(var(--theme-accent-rgb),.2);border-radius:8px;padding:12px 16px}.tool-calculator summary{cursor:pointer;color:var(--theme-accent-strong);font-weight:600;min-height:24px}
.tool-inputs{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0}.tool-inputs label{font-size:12px}.tool-inputs select{display:block;width:100%;margin-top:5px;min-height:40px;border:1px solid rgba(var(--theme-text-rgb),.25);border-radius:5px;background:rgb(var(--theme-surface-rgb));color:var(--theme-heading);padding:6px 10px}
.tool-checkbox{display:flex;align-items:center;gap:10px;margin:10px 0}.tool-checkbox input{width:18px;height:18px;accent-color:var(--theme-accent-strong);flex-shrink:0}.tool-calculator output{display:block;margin-top:16px;color:var(--theme-accent-strong);font-weight:650}
.tool-craft{padding-left:20px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 24px;margin:14px 0}.tool-special{padding:12px 16px;border-left:2px solid rgba(var(--theme-accent-rgb),.45)}
.tool-detail{padding:16px 0;border-bottom:1px solid rgba(var(--theme-text-rgb),.1)}.tool-table-scroll{overflow-x:auto}.tool-detail table{width:100%;border-collapse:collapse;margin-top:12px}.tool-detail caption{text-align:left;font-size:12px;color:rgba(var(--theme-text-rgb),.6)}.tool-detail :is(th,td){padding:9px 12px;text-align:left;border-bottom:1px solid rgba(var(--theme-text-rgb),.13)}.tool-detail th{color:var(--theme-accent-strong);font-size:12px}
.tool-footer{display:flex;flex-wrap:wrap;gap:10px 22px;margin-top:24px;padding-top:16px;border-top:1px solid rgba(var(--theme-text-rgb),.12);font-size:12px}
@media(max-width:520px){.tool-inputs,.tool-craft{grid-template-columns:1fr}.tool-nav{gap:8px 16px}.tool-calculator{padding:12px}.tool-example{padding:12px}}
@media print{.tool-nav,.tool-calculator,.tool-footer{display:none}.tool-actions li,.tool-detail{break-inside:avoid}}
</style>
