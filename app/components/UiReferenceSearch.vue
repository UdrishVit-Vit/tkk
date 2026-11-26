<script setup>
import { SYSTEMS } from '~/data/hub.js'
import { findReferenceSections } from '~/data/sectionRoutes.js'

const props = defineProps({ system: { type: String, required: true } })
const dialog = ref(null)
const search = ref('')
const results = computed(() => findReferenceSections(SYSTEMS, search.value, props.system))
const route = useRoute()

function show() {
  if (dialog.value?.open) return
  search.value = ''
  dialog.value?.showModal()
}

function close() { dialog.value?.close() }
watch(() => route.path, close)
defineExpose({ show })
</script>

<template>
  <dialog ref="dialog" class="reference-search" aria-label="Поиск по Узлу Узлов" @click.self="close">
    <div class="reference-search__body">
      <header>
        <h2>Поиск по Узлу Узлов</h2>
        <button type="button" class="ds-button ds-control" @click="close">Закрыть</button>
      </header>
      <label><UiActionIcon name="search" /><input v-model="search" class="ds-control" type="search" aria-label="Найти раздел" placeholder="Найти раздел…" autofocus></label>
      <ul v-if="results.length">
        <li v-for="result in results" :key="result.to">
          <NuxtLink :to="result.to" class="ds-control" @click="close"><strong>{{ result.title }}</strong><small>{{ result.label }}</small></NuxtLink>
        </li>
      </ul>
      <p v-else class="ds-empty" role="status">Ничего не найдено</p>
    </div>
  </dialog>
</template>

<style scoped>
.reference-search{position:fixed;inset:12dvh 0 auto;margin:0 auto;width:min(560px,calc(100% - 24px));max-height:78dvh;padding:0;border:1px solid var(--ds-control-border);border-radius:16px;background:var(--theme-surface);color:var(--ds-ink);font:500 .875rem/1.4 var(--ds-sans);overflow:auto;box-shadow:0 18px 52px #0008}
.reference-search::backdrop{background:#0009}
.reference-search__body{padding:16px}
header,label{display:flex;align-items:center;gap:12px}
header{justify-content:space-between;margin-bottom:12px}
h2{font:600 clamp(1.2rem,4vw,1.6rem)/1.1 var(--ds-serif)}
label{padding:0 10px;border:1px solid var(--ds-control-border);border-radius:var(--ds-control-radius)}
input{min-width:0;flex:1;min-height:44px;font-size:1rem}
ul{padding-top:10px}
li a{display:flex;min-height:44px;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:4px 12px;padding:6px 8px;border-radius:6px}
li a:hover{background:var(--ds-selected-fill)}
small{color:var(--ds-muted-text);font-size:var(--ds-label)}
</style>
