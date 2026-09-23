<script setup>
import { GEOGRAPHY_REGIONS, GEOGRAPHY_SHARDS } from '~/data/loreGeography.js'
import { LORE_GLOSSARY } from '~/data/loreGlossary.js'

defineProps({ theme: { type: Object, required: true } })
defineEmits(['up'])

const route = useRoute()
const validIds = new Set(GEOGRAPHY_SHARDS.map(item => item.id))
const shardFromHash = () => {
  const id = route.hash.replace(/^#/, '')
  return validIds.has(id) ? id : 'daskar'
}
const selectedId = ref('daskar')
onMounted(() => { selectedId.value = shardFromHash() })
watch(() => route.hash, () => { selectedId.value = shardFromHash() })
const selectedShard = computed(() => GEOGRAPHY_SHARDS.find(item => item.id === selectedId.value))
const selectedEntry = computed(() => LORE_GLOSSARY.find(item => item.id === selectedShard.value?.glossaryId))
const litPath = computed(() => ({
  daskar: 'M500 280V28',
  'var-elor': 'M500 318 245 486',
  azar: 'M500 318 755 486',
})[selectedId.value])
const regions = GEOGRAPHY_REGIONS.map(region => ({
  id: region.id, title: region.title, hasMap: Boolean(region.map), description: region.description,
}))

function selectShard(id) {
  selectedId.value = id
  if (import.meta.client) window.history.replaceState(window.history.state, '', `#${id}`)
}

useHead({
  title: 'Осколки Эноа · Lore',
  meta: [{ name: 'description', content: 'Осколки мира Эноа: Даскар, Вар’Элор и Азар. Обзорная схема и связанные нити Lore.' }],
})
</script>

<template>
  <main class="shards-page" :style="{ background: theme.bg }">
    <div class="shards-scroll">
      <div class="shards-shell">
        <header class="shards-header">
          <button type="button" class="shards-back" aria-label="Вернуться к карте Lore" @click="$emit('up')">↖ <span>LORE</span></button>
          <p class="shards-eyebrow">АРХИВ МИРА ЭНОА · ОБЗОР</p>
          <h1>Осколки</h1>
          <p class="shards-lead">После Раскола история мира разошлась по разным землям. Выберите осколок, чтобы раскрыть его нити.</p>
          <div class="shards-entry-thread" aria-hidden="true"><i /></div>
        </header>

        <div class="shards-layout">
          <section class="shards-field" aria-label="Схема осколков Эноа">
            <div class="shards-field__grain" aria-hidden="true" />
            <svg class="shards-lines" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
              <path class="shards-lines__faint" d="M500 28V280M500 318 245 486M500 318l255 168" />
              <path class="shards-lines__lit" :d="litPath" />
              <path d="m500 278 20 20-20 20-20-20 20-20Z" fill="#17151a" stroke="#d5b589" stroke-width="2" />
              <path d="m500 288 10 10-10 10-10-10 10-10Z" fill="#d5b589" fill-opacity=".45" />
              <circle cx="500" cy="298" r="42" fill="none" stroke="#d5b589" stroke-opacity=".17" stroke-dasharray="2 8" />
            </svg>
            <span class="shards-origin" aria-hidden="true">РАСКОЛ</span>

            <button v-for="(shard, index) in GEOGRAPHY_SHARDS" :key="shard.id" type="button"
              class="shard-node" :class="[`shard-node--${shard.id}`, { 'is-active': selectedId === shard.id }]"
              :aria-pressed="selectedId === shard.id" :aria-label="`Открыть осколок ${shard.title}`"
              @click="selectShard(shard.id)">
              <span class="shard-node__halo"><LoreShardIcon :id="shard.id" /></span>
              <span class="shard-node__number">0{{ index + 1 }} / {{ shard.kind }}</span>
              <strong>{{ shard.title }}</strong>
              <span class="shard-node__action">{{ selectedId === shard.id ? 'ОСКОЛОК ОТКРЫТ' : 'ОТКРЫТЬ НИТЬ ↗' }}</span>
            </button>
            <p class="shards-field__note">Схема связей · расположение условное</p>
          </section>

          <aside v-if="selectedShard" :key="selectedShard.id" class="shard-detail" :class="`shard-detail--${selectedShard.id}`" aria-live="polite">
            <div class="shard-detail__top"><span>ОСКОЛОК ЭНОА</span><span>0{{ GEOGRAPHY_SHARDS.findIndex(item => item.id === selectedId) + 1 }} / 03</span></div>
            <div class="shard-detail__icon"><LoreShardIcon :id="selectedShard.id" /></div>
            <p class="shard-detail__kind">{{ selectedShard.kind }}</p>
            <h2>{{ selectedShard.title }}</h2>
            <p class="shard-detail__lead">{{ selectedShard.description }}</p>
            <div v-if="selectedEntry?.definition" class="shard-detail__text">
              <span>ИЗ СВОДА LORE</span>
              <p>{{ selectedEntry.definition }}</p>
            </div>
            <div v-if="selectedId === 'daskar'" class="shard-detail__links">
              <span>РЕГИОНЫ ДАСКАРА</span>
              <NuxtLink v-for="region in regions" :key="region.id" :to="`/lore/geography?region=${region.id}`">
                <strong>{{ region.title }}</strong><small>{{ region.hasMap ? 'КАРТА И МЕСТА ↗' : 'ОПОРНЫЕ МЕСТА ↗' }}</small>
              </NuxtLink>
            </div>
            <div v-else-if="selectedShard.threads?.length" class="shard-detail__links">
              <span>СВЯЗАННЫЕ НИТИ</span>
              <NuxtLink v-for="thread in selectedShard.threads" :key="thread.glossaryId" :to="`/lore/glossary/${thread.glossaryId}`">
                <strong>{{ thread.title }}</strong><small>{{ thread.note }} ↗</small>
              </NuxtLink>
            </div>
            <div class="shard-detail__footer">
              <NuxtLink :to="`/lore/glossary/${selectedShard.glossaryId}`">Читать статью в Lore <span>↗</span></NuxtLink>
              <NuxtLink :to="`/lore/geography?shard=${selectedShard.id}`">География Эноа <span>↗</span></NuxtLink>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.shards-page{position:fixed;inset:0;z-index:45;color:rgba(var(--theme-text-rgb),.86);overflow:hidden}.shards-scroll{height:100%;overflow-y:auto;background:radial-gradient(ellipse 58% 45% at 50% 12%,rgba(var(--theme-accent-rgb),.09),transparent 80%)}.shards-shell{width:min(1320px,calc(100% - 72px));margin:auto;padding:44px 0 100px}.shards-header{position:relative;text-align:center}.shards-back{position:absolute;left:0;top:4px;border:1px solid rgba(var(--theme-accent-rgb),.3);padding:10px 14px;background:rgba(var(--theme-surface-rgb),.5);color:var(--gold-bright);font:600 11px 'Hanken Grotesk',sans-serif;letter-spacing:.16em;cursor:pointer}.shards-back:hover,.shards-back:focus-visible{border-color:var(--gold-bright)}.shards-eyebrow,.shard-detail__top,.shard-detail__kind,.shard-detail__text>span,.shard-detail__links>span{color:var(--gold-bright);font:600 10px 'Hanken Grotesk',sans-serif;letter-spacing:.2em}.shards-header h1{margin:13px 0 12px;color:rgba(var(--theme-heading-rgb),.98);font:500 clamp(68px,9vw,118px)/.9 'Cormorant Garamond',serif}.shards-lead{max-width:610px;margin:auto;color:rgba(var(--theme-text-rgb),.7);font:22px/1.32 'Cormorant Garamond',serif}.shards-entry-thread{position:relative;height:65px;width:2px;margin:15px auto 0;background:linear-gradient(transparent,rgba(var(--theme-accent-strong-rgb),.8))}.shards-entry-thread i{position:absolute;left:-4px;top:27px;width:10px;height:10px;transform:rotate(45deg);border:1px solid var(--gold-bright);background:rgb(var(--theme-surface-rgb));box-shadow:0 0 15px rgba(var(--theme-accent-rgb),.55)}
.shards-layout{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(320px,.78fr);gap:18px;align-items:stretch}.shards-field{position:relative;isolation:isolate;min-height:650px;overflow:hidden;border:1px solid rgba(var(--theme-accent-rgb),.3);background:radial-gradient(circle at 50% 47%,rgba(var(--theme-accent-rgb),.1),transparent 24%),radial-gradient(circle at 48% 47%,rgba(6,8,13,.38),transparent 67%),linear-gradient(135deg,rgba(var(--theme-surface-rgb),.63),rgba(var(--theme-surface-rgb),.2))}.shards-field::before{content:"";position:absolute;inset:20px;border:1px solid rgba(var(--theme-accent-rgb),.09);pointer-events:none}.shards-field__grain{position:absolute;inset:0;opacity:.6;background-image:radial-gradient(rgba(var(--theme-accent-rgb),.3) .6px,transparent .8px);background-size:23px 23px;mask-image:radial-gradient(circle at center,#000,transparent 85%)}.shards-lines{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.shards-lines__faint{fill:none;stroke:rgba(var(--theme-accent-rgb),.27);stroke-width:1.4;stroke-dasharray:3 7}.shards-lines__lit{fill:none;stroke:rgba(var(--theme-accent-strong-rgb),.7);stroke-width:1.5;stroke-dasharray:5 8;filter:drop-shadow(0 0 6px rgba(var(--theme-accent-rgb),.65))}.shards-origin{position:absolute;left:50%;top:51%;transform:translate(-50%,0);color:rgba(var(--theme-accent-rgb),.65);font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.25em}.shards-field__note{position:absolute;left:24px;bottom:10px;color:rgba(var(--theme-text-rgb),.45);font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.11em;text-transform:uppercase}
.shard-node{position:absolute;display:flex;flex-direction:column;align-items:center;width:230px;min-height:182px;padding:15px 12px 11px;transform:translate(-50%,-50%);border:1px solid rgba(var(--theme-accent-rgb),.22);background:linear-gradient(155deg,rgba(var(--theme-surface-rgb),.96),rgba(12,12,18,.95));color:rgba(var(--theme-heading-rgb),.9);text-align:center;cursor:pointer;box-shadow:0 16px 32px rgba(0,0,0,.36);transition:transform .22s,border-color .22s,box-shadow .22s}.shard-node:hover{transform:translate(-50%,-52%);border-color:rgba(var(--theme-accent-rgb),.55)}.shard-node:focus-visible{outline:2px solid var(--gold-bright);outline-offset:3px}.shard-node.is-active{border-color:var(--node-color);box-shadow:0 0 0 1px var(--node-color),0 0 32px var(--node-glow),0 18px 35px rgba(0,0,0,.42)}.shard-node--daskar{--node-color:#e9c18c;--node-glow:rgba(211,156,91,.22);left:50%;top:19%}.shard-node--var-elor{--node-color:#b8a1d9;--node-glow:rgba(153,114,202,.25);left:24.5%;top:76%}.shard-node--azar{--node-color:#b5d9e5;--node-glow:rgba(128,190,221,.23);left:75.5%;top:76%}.shard-node__halo{display:block;width:75px;height:75px;margin:-5px auto 0;color:var(--node-color)}.shard-node__number,.shard-node__action{font:600 8px 'Hanken Grotesk',sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.6)}.shard-node strong{display:block;margin:2px 0 5px;color:var(--node-color);font:500 34px/1 'Cormorant Garamond',serif}.shard-node__action{color:var(--node-color);opacity:.75}
.shard-detail{--detail-color:#e9c18c;min-height:650px;position:relative;overflow:hidden;padding:26px 31px 30px;border:1px solid rgba(var(--theme-accent-rgb),.32);background:linear-gradient(145deg,rgba(var(--theme-surface-rgb),.91),rgba(var(--theme-surface-rgb),.45));animation:detail-in .28s ease-out}.shard-detail::before{content:"";position:absolute;top:-100px;right:-90px;width:330px;height:330px;border:1px solid color-mix(in srgb,var(--detail-color) 24%,transparent);transform:rotate(45deg);pointer-events:none}.shard-detail--var-elor{--detail-color:#b8a1d9}.shard-detail--azar{--detail-color:#b5d9e5}.shard-detail__top{display:flex;justify-content:space-between;gap:10px;font-size:9px}.shard-detail__icon{width:113px;height:113px;margin:23px 0 9px;color:var(--detail-color)}.shard-detail__kind{margin:0;color:var(--detail-color)}.shard-detail h2{margin:7px 0 13px;color:var(--detail-color);font:500 clamp(54px,5.5vw,76px)/.9 'Cormorant Garamond',serif}.shard-detail__lead{margin:0 0 24px;color:rgba(var(--theme-heading-rgb),.85);font:22px/1.23 'Cormorant Garamond',serif}.shard-detail__text{padding:17px 0;border-top:1px solid rgba(var(--theme-accent-rgb),.24)}.shard-detail__text p{margin:8px 0 0;color:rgba(var(--theme-text-rgb),.73);font:17px/1.45 'Cormorant Garamond',serif}.shard-detail__links{margin-top:7px;padding-top:14px;border-top:1px solid rgba(var(--theme-accent-rgb),.24)}.shard-detail__links>span{display:block;margin-bottom:10px}.shard-detail__links a{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.13);color:rgba(var(--theme-heading-rgb),.83);text-decoration:none}.shard-detail__links a:hover,.shard-detail__links a:focus-visible{color:var(--detail-color)}.shard-detail__links strong{font:500 21px 'Cormorant Garamond',serif}.shard-detail__links small{font:600 8px 'Hanken Grotesk',sans-serif;letter-spacing:.07em;color:var(--detail-color);text-align:right}.shard-detail__footer{display:grid;gap:8px;margin-top:25px}.shard-detail__footer a{display:flex;justify-content:space-between;padding:11px 13px;border:1px solid rgba(var(--theme-accent-rgb),.3);color:var(--detail-color);text-decoration:none;font:600 10px 'Hanken Grotesk',sans-serif;letter-spacing:.08em}.shard-detail__footer a:hover{background:rgba(var(--theme-accent-rgb),.09)}@keyframes detail-in{from{opacity:.35;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(min-width:761px){.shards-shell{position:relative;left:34px;width:min(1250px,calc(100% - 160px))}}
@media(max-width:1050px){.shards-layout{grid-template-columns:1fr}.shards-field{min-height:560px}.shard-detail{min-height:0}.shard-node--daskar{top:20%}.shard-node--var-elor,.shard-node--azar{top:77%}}
@media(max-width:760px){.shards-shell{width:calc(100% - 26px);padding:67px 0 90px}.shards-back{top:-45px}.shards-header h1{font-size:69px}.shards-lead{font-size:18px;padding:0 8px}.shards-entry-thread{height:43px}.shards-field{min-height:580px}.shard-node{width:46%;min-height:168px;padding:10px 5px}.shard-node--daskar{width:52%;top:20%}.shard-node--var-elor{left:26%;top:77%}.shard-node--azar{left:74%;top:77%}.shard-node__halo{width:67px;height:67px}.shard-node strong{font-size:clamp(25px,7vw,32px)}.shard-node__number{font-size:7px}.shard-node__action{font-size:7px}.shards-field__note{left:12px;bottom:5px;font-size:7px}.shard-detail{padding:22px}.shard-detail__icon{width:88px;height:88px;margin-top:18px}.shard-detail h2{font-size:59px}.shard-detail__lead{font-size:20px}}
@media(prefers-reduced-motion:reduce){.shard-node,.shard-detail{transition:none;animation:none}}
</style>
