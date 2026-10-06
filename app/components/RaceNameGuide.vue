<script setup>
import { NAME_ROLLS } from '~/data/raceNameGenerators.js'
import { profileForTable, evidenceForName } from '~/data/nameLibrary.js'
const props = defineProps({ table: { type: Object, required: true } })
const search = ref('')
const page = ref(1)
const pageSize = 35
const profile = computed(() => profileForTable(props.table))
const prototypes = computed(() => [...new Set([...(props.table.examples || []), ...(profile.value?.canon || [])])])
const matches = computed(() => {
  const t = props.table
  const values = t.names ? t.names.map(name => ({ name })) : t.m.map((m, i) => ({ m, f: t.f[i] }))
  const query = search.value.toLocaleLowerCase('ru').trim()
  return values.map((row, index) => ({ ...row, index })).filter(row => !query || [row.name, row.m, row.f].some(name => name?.toLocaleLowerCase('ru').includes(query)))
})
const rows = computed(() => matches.value.slice((page.value - 1) * pageSize, page.value * pageSize))
const pageCount = computed(() => Math.max(1, Math.ceil(matches.value.length / pageSize)))
const sourceFor = name => evidenceForName(name).source
function status(name) {
  if (props.table.cyclePool) return props.table.isLostName(name) ? 'Утерянное сочетание: безымянный' : 'Имя Цикла'
  if (Object.values(props.table.canonicalNames || {}).flat().includes(name)) return 'Подтверждено автором'
  if (sourceFor(name)) return 'Реальное имя'
  if (profile.value?.canon?.includes(name)) return 'Имя из источников'
  return evidenceForName(name).status
}
watch(() => props.table.label, () => { search.value = ''; page.value = 1 })
watch(search, () => { page.value = 1 })
</script>

<template>
  <details class="name-guide">
    <summary>Образцы, конструктор и полный список</summary>
    <div class="name-guide-body">
      <section v-if="prototypes.length">
        <h3>Имена в источниках и авторские образцы</h3>
        <p>{{ prototypes.join(' · ') }}</p>
        <p v-if="table.exampleGenders" class="name-guide-note">Шида — женское; Саф'Харул и Тцафах — мужские. Маракийская подраса не уточнена.</p>
      </section>
      <section v-if="table.recommended">
        <h3>Предпочтительный отбор</h3>
        <template v-if="Array.isArray(table.recommended)"><p>{{ table.recommended.join(' · ') }}</p></template>
        <template v-else>
          <p><strong>{{ table.columnLabels?.m || 'Мужские' }}:</strong> {{ table.recommended.m?.join(' · ') }}</p>
          <p><strong>{{ table.columnLabels?.f || 'Женские' }}:</strong> {{ table.recommended.f?.join(' · ') }}</p>
        </template>
      </section>
      <section v-if="profile">
        <h3>Конструктор</h3>
        <p>{{ profile.formula.replace('name = null', 'Личного обрядового имени нет').replace('null', 'отсутствующим') }}</p>
        <details><summary>Культурный разбор</summary><p>{{ profile.analysis }}</p><p v-if="profile.exception">{{ profile.exception }}</p></details>
      </section>
      <p class="name-guide-note">Авторские образцы и предложения имеют разный статус. Показанные имена не повторяются в открытом генераторе; после перезагрузки история сбрасывается. Для постоянной уникальности ведите реестр персонажей.</p>
      <label class="name-guide-search">Найти в списке<input v-model="search" type="search" placeholder="Имя или часть имени"></label>
      <div class="name-guide-scroll">
        <table>
          <thead><tr><th>{{ table.worldPool ? '№' : table.cyclePool ? '1к13 + 4к4' : '4к4' }}</th><template v-if="table.names"><th>Имя</th></template><template v-else><th>{{ table.columnLabels?.m || 'Мужское' }}</th><th>{{ table.columnLabels?.f || 'Женское' }}</th></template></tr></thead>
          <tbody><tr v-for="row in rows" :key="row.index">
            <td>{{ table.worldPool ? row.index + 1 : table.cyclePool ? `${Math.floor(row.index / 35) + 1} / ${table.rolls[row.index % 35]}` : NAME_ROLLS[row.index] }}</td>
            <td v-for="name in (row.name ? [row.name] : [row.m, row.f])" :key="name">
              <span>{{ name }}</span><small>{{ status(name) }}</small>
              <a v-if="sourceFor(name)" :href="sourceFor(name).source" target="_blank" rel="noopener noreferrer">Источник · {{ sourceFor(name).original }}</a>
            </td>
          </tr></tbody>
        </table>
      </div>
      <p v-if="!rows.length">Совпадений нет.</p>
      <div v-if="pageCount > 1" class="name-guide-pages">
        <button type="button" :disabled="page === 1" @click="page--">← Назад</button>
        <span>{{ page }} / {{ pageCount }} · {{ matches.length }} имён</span>
        <button type="button" :disabled="page === pageCount" @click="page++">Далее →</button>
      </div>
      <NuxtLink to="/lore/names">Весь именник ЭНОА →</NuxtLink>
    </div>
  </details>
</template>

<style scoped>
.name-guide{margin-top:18px;color:rgba(var(--theme-text-rgb),.88);font:16px/1.65 'Cormorant Garamond',serif;border-top:1px solid rgba(var(--theme-accent-rgb),.25);padding-top:12px}.name-guide summary{cursor:pointer;color:var(--theme-accent-strong);font-weight:600}.name-guide-body{padding-top:12px}.name-guide h3{font-size:19px;margin:14px 0 4px}.name-guide p{margin:6px 0}.name-guide-note{font-size:14px;opacity:.75}.name-guide-search{display:block;margin:20px 0 12px;font:12px 'Hanken Grotesk',sans-serif}.name-guide input{display:block;width:100%;margin-top:8px;background:var(--theme-surface);color:inherit;padding:10px 12px;border:1px solid rgba(var(--theme-accent-rgb),.35);border-radius:8px;font-size:16px}.name-guide-scroll{overflow-x:auto;max-height:420px;overflow-y:auto}.name-guide table{width:100%;border-collapse:collapse;min-width:360px}.name-guide th,.name-guide td{text-align:left;border-bottom:1px solid rgba(var(--theme-accent-rgb),.15);padding:10px;vertical-align:top}.name-guide th{position:sticky;top:0;background:var(--theme-surface);font:12px 'Hanken Grotesk',sans-serif}.name-guide td:first-child{white-space:nowrap;font-size:13px}.name-guide small,.name-guide td a{display:block;font:10px/1.6 'Hanken Grotesk',sans-serif;opacity:.7}.name-guide a{color:var(--theme-accent-strong)}
.name-guide-pages{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:14px 0;font-size:13px}.name-guide-pages button{color:var(--theme-accent-strong);background:transparent;border:1px solid rgba(var(--theme-accent-rgb),.3);border-radius:6px;padding:8px 12px;cursor:pointer}.name-guide-pages button:disabled{opacity:.4;cursor:default}
</style>
