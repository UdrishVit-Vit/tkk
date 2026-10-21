<script setup>
import { BEAD_TIER_LABEL } from '~/data/beads5e.js'
import { shagaiCombo } from '~/utils/shagai5e.js'

const props = defineProps({
  bead: { type: Object, required: true },
  framed: { type: Boolean, default: false },
  // '' — D&D 5e 2014, '2024' — D&D 5.5e, 'pf2e' — Pathfinder 2e.
  edition: { type: String, default: '' }
})

const isPf = computed(() => props.edition === 'pf2e')
const combo = computed(() => shagaiCombo(props.bead.sig || []))

// Pathfinder пишет стоимость активации значками действий.
const ACTION_GLYPHS = { 1: '◆', 2: '◆◆', 3: '◆◆◆', reaction: '⤶', free: '◇' }
const ACTION_TITLES = { 1: 'одно действие', 2: 'два действия', 3: 'три действия', reaction: 'реакция', free: 'свободное действие' }

function costLine(p) {
  if (isPf.value) return p.cost || ''
  return [p.cost, p.action].filter(Boolean).join(' · ')
}

function kind(p) {
  if (p.curse) return 'curse'
  return p.cost || p.actions ? 'power' : 'trait'
}

// В текстах Pathfinder нет автоссылок D&D, поэтому для них разбираем только **жирный**.
function plainSegments(text) {
  return String(text || '').split(/(\*\*[^*\n]+\*\*)/g).filter(Boolean).map(s => (
    s.startsWith('**') && s.endsWith('**') ? { bold: true, text: s.slice(2, -2) } : { bold: false, text: s }
  ))
}

const richEdition = computed(() => props.edition === '2024' ? '2024' : '')

// Заклинания в бусинах всегда названы явно, «Названием» (English), поэтому
// обычные слова, совпавшие с заклинаниями 2014, ссылками не делаем:
// «на рассвете», «начинается превращение», «и подобные эффекты», «скорость полёта», «всех языков»,
// «Врата Рузды», «стадии заражения».
const EXCLUDE_2014 = [
  '/dnd5e/spells?s=dawn',
  '/dnd5e/spells?s=gate',
  '/dnd5e/spells?s=contagion',
  '/dnd5e/spells?s=polymorph',
  '/dnd5e/spells?s=simulacrum',
  '/dnd5e/spells?s=fly',
  '/dnd5e/spells?s=tongues'
]
const excludePaths = computed(() => props.edition === '' ? EXCLUDE_2014 : [])
</script>

<template>
  <div class="bead-card" :class="{ framed }">
    <template v-if="framed">
      <span class="rt-corner rt-corner-tl" aria-hidden="true" /><span class="rt-corner rt-corner-tr" aria-hidden="true" />
      <span class="rt-corner rt-corner-bl" aria-hidden="true" /><span class="rt-corner rt-corner-br" aria-hidden="true" />
    </template>

    <div class="bead-badges">
      <span v-if="isPf" class="bead-pill"><span>Уровень</span><b>{{ bead.level }}</b></span>
      <span class="bead-pill"><span>Опознание</span><b>{{ isPf ? 'Сл' : edition === '2024' ? 'Сл' : 'СЛ' }} {{ bead.dc }}</b></span>
      <template v-if="isPf">
        <span v-for="t in bead.traits" :key="t" class="bead-tag">{{ t }}</span>
      </template>
      <template v-else>
        <span class="bead-tag">{{ BEAD_TIER_LABEL[bead.tier] }}</span>
        <span class="bead-tag">требует настройки</span>
      </template>
      <span v-if="combo" class="bead-tag bead-combo">4к4: {{ combo }}</span>
    </div>

    <p class="bead-flavor">{{ bead.flavor }}</p>

    <div class="bead-block bead-charges">
      <h3>Заряды</h3>
      <p>
        <template v-if="isPf">{{ bead.charges }}</template>
        <RuleRichText v-else :text="bead.charges" :edition="richEdition" :exclude-paths="excludePaths" />
      </p>
    </div>

    <div
      v-for="(p, pi) in bead.powers"
      :key="pi"
      class="bead-block"
      :class="'bead-' + kind(p)"
    >
      <div v-if="p.name || costLine(p) || p.actions" class="bead-prop-head">
        <h3 v-if="p.name">{{ p.name }}</h3>
        <span
          v-if="isPf && p.actions"
          class="bead-glyph"
          :title="ACTION_TITLES[p.actions] || p.actions"
        >{{ ACTION_GLYPHS[p.actions] || p.actions }}</span>
        <span v-if="costLine(p)" class="bead-cost">{{ costLine(p) }}</span>
      </div>

      <p v-if="p.trigger" class="bead-trigger"><b>Триггер.</b> {{ p.trigger }}</p>

      <p v-if="p.text">
        <template v-if="isPf">
          <template v-for="(s, si) in plainSegments(p.text)" :key="si"><b v-if="s.bold">{{ s.text }}</b><template v-else>{{ s.text }}</template></template>
        </template>
        <RuleRichText v-else :text="p.text" :edition="richEdition" :exclude-paths="excludePaths" />
      </p>

      <ul v-if="p.list" class="bead-list">
        <li v-for="(row, ri) in p.list" :key="ri">
          <template v-if="isPf">
            <template v-for="(s, si) in plainSegments(row)" :key="si"><b v-if="s.bold">{{ s.text }}</b><template v-else>{{ s.text }}</template></template>
          </template>
          <RuleRichText v-else :text="row" :edition="richEdition" :exclude-paths="excludePaths" />
        </li>
      </ul>

      <div v-if="p.table" class="bead-table">
        <div class="bead-table-grid" :style="{ '--cols': p.table.head.length }">
          <span v-for="(h, hi) in p.table.head" :key="'h' + hi" class="bead-th">{{ h }}</span>
          <template v-for="(row, ri) in p.table.rows" :key="'r' + ri">
            <span
              v-for="(cell, ci) in row"
              :key="'c' + ri + '-' + ci"
              class="bead-td"
              :class="{ first: ci === 0 }"
              :data-label="p.table.head[ci]"
            >
              <template v-if="isPf">{{ cell }}</template>
              <RuleRichText v-else :text="cell" :edition="richEdition" :exclude-paths="excludePaths" />
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bead-card.framed{
  position:relative;
  padding:22px 24px 20px;
  border:1px solid rgba(var(--theme-accent-rgb),.22);
  border-radius:10px;
  background:linear-gradient(180deg,rgba(var(--theme-accent-rgb),.05),rgba(var(--theme-contrast-rgb),.008));
}

.rt-corner{ position:absolute; width:14px; height:14px; pointer-events:none; }
.rt-corner-tl{ top:6px; left:6px; border-top:1.5px solid rgba(var(--theme-accent-rgb),.5); border-left:1.5px solid rgba(var(--theme-accent-rgb),.5); border-radius:5px 0 0 0; }
.rt-corner-tr{ top:6px; right:6px; border-top:1.5px solid rgba(var(--theme-accent-rgb),.5); border-right:1.5px solid rgba(var(--theme-accent-rgb),.5); border-radius:0 5px 0 0; }
.rt-corner-bl{ bottom:6px; left:6px; border-bottom:1.5px solid rgba(var(--theme-accent-rgb),.5); border-left:1.5px solid rgba(var(--theme-accent-rgb),.5); border-radius:0 0 0 5px; }
.rt-corner-br{ bottom:6px; right:6px; border-bottom:1.5px solid rgba(var(--theme-accent-rgb),.5); border-right:1.5px solid rgba(var(--theme-accent-rgb),.5); border-radius:0 0 5px 0; }

.bead-badges{ display:flex; flex-wrap:wrap; align-items:center; gap:10px; margin-bottom:14px; }
.bead-pill{ display:inline-flex; align-items:baseline; gap:8px; border:1px solid rgba(var(--theme-accent-rgb),.32); border-radius:999px; background:rgba(var(--theme-accent-rgb),.08); padding:5px 13px; }
.bead-pill span{ font-size:9px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:rgba(var(--theme-accent-rgb),.7); }
.bead-pill b{ font-size:13px; font-weight:700; color:rgba(var(--theme-accent-strong-rgb),.9); }
.bead-tag{ border:1px solid rgba(var(--theme-text-rgb),.12); border-radius:999px; padding:4px 10px; font-size:10px; font-weight:700; color:rgba(var(--theme-text-rgb),.55); }
.bead-combo{ border-color:rgba(var(--theme-accent-rgb),.28); color:rgba(var(--theme-accent-rgb),.8); }

.bead-flavor{ margin:0 0 16px; font-family:'Cormorant Garamond',serif; font-style:italic; font-size:18px; line-height:1.55; color:rgba(var(--theme-accent-rgb),.78); white-space:pre-line; }

.bead-block{ margin-top:12px; padding:12px 16px; border:1px solid rgba(var(--theme-text-rgb),.09); border-left-width:2px; border-radius:8px; background:rgba(var(--theme-contrast-rgb),.012); }
.bead-block h3{ margin:0; font-size:10px; font-weight:850; letter-spacing:.18em; text-transform:uppercase; color:rgba(var(--theme-text-rgb),.55); }
.bead-block > p{ margin:6px 0 0; font-family:'Cormorant Garamond',serif; font-size:18px; line-height:1.55; color:rgba(var(--theme-text-rgb),.84); }
.bead-block > p:first-child{ margin-top:0; }
.bead-block > h3 + p{ margin-top:6px; }

.bead-prop-head{ display:flex; flex-wrap:wrap; align-items:baseline; gap:6px 10px; }
.bead-cost{ font-size:10px; font-weight:700; letter-spacing:.06em; color:rgba(var(--theme-text-rgb),.5); }
.bead-glyph{ font-size:12px; letter-spacing:.08em; color:rgba(var(--theme-accent-rgb),.85); }
.bead-trigger{ font-size:16px !important; }
.bead-trigger b{ font-weight:700; color:rgba(var(--theme-text-rgb),.7); }

.bead-charges{ border-left-color:rgba(var(--theme-text-rgb),.28); }
.bead-trait{ border-left-color:rgba(var(--theme-accent-rgb),.32); }
.bead-trait h3{ color:rgba(var(--theme-accent-rgb),.72); }
.bead-power{ border-left-color:rgba(var(--theme-accent-rgb),.65); }
.bead-power h3{ color:rgba(var(--theme-accent-strong-rgb),.9); }
.bead-curse{ border-left-color:rgba(207,125,114,.6); }
.bead-curse h3{ color:#cf7d72; }

.bead-list{ margin:8px 0 0; padding-left:20px; font-family:'Cormorant Garamond',serif; font-size:17px; line-height:1.55; color:rgba(var(--theme-text-rgb),.82); }
.bead-list li + li{ margin-top:6px; }

.bead-table{ margin-top:10px; overflow-x:auto; }
.bead-table-grid{ display:grid; grid-template-columns:minmax(44px,auto) repeat(calc(var(--cols) - 1),minmax(0,1fr)); gap:1px; background:rgba(var(--theme-text-rgb),.07); border-radius:6px; overflow:hidden; }
.bead-th{ padding:8px 12px; background:rgba(var(--theme-accent-rgb),.08); font-size:10px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:rgba(var(--theme-accent-rgb),.8); }
.bead-td{ padding:9px 12px; background:rgba(var(--theme-contrast-rgb),.02); font-size:13.5px; line-height:1.5; color:rgba(var(--theme-text-rgb),.8); }
.bead-td.first{ font-weight:800; color:rgba(var(--theme-accent-rgb),.78); font-variant-numeric:tabular-nums; }

/* На узком экране строка таблицы складывается в столбик, а заголовок колонки
   переезжает в подпись над ячейкой. */
@media (max-width: 640px){
  .bead-table-grid{ grid-template-columns:1fr; }
  .bead-th{ display:none; }
  .bead-td.first{ background:rgba(var(--theme-accent-rgb),.08); }
  .bead-td.first::before{ content:attr(data-label) ' '; font-size:10px; letter-spacing:.12em; text-transform:uppercase; }
  .bead-td:not(.first)::before{ content:attr(data-label); display:block; margin-bottom:3px; font-size:9px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:rgba(var(--theme-accent-rgb),.7); }
}
</style>
