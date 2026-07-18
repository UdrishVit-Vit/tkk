<script setup>
import { WRATH_TIER_LABEL } from '~/data/wrath5e.js'
import { shagaiCombo } from '~/utils/shagai5e.js'

const props = defineProps({
  wrath: { type: Object, required: true },
  framed: { type: Boolean, default: false }
})

const combo = computed(() => shagaiCombo(props.wrath.sig || []))

function blocksFor(slot) {
  return (props.wrath.blocks || []).filter(b => b.slot === slot)
}
function tableFor(slot) {
  const t = props.wrath.table
  return t && t.slot === slot ? t : null
}
function listFor(slot) {
  const l = props.wrath.list
  return l && l.slot === slot ? l : null
}
</script>

<template>
  <div class="wrath-card" :class="{ framed }">
    <template v-if="framed">
      <span class="rt-corner rt-corner-tl" aria-hidden="true" /><span class="rt-corner rt-corner-tr" aria-hidden="true" />
      <span class="rt-corner rt-corner-bl" aria-hidden="true" /><span class="rt-corner rt-corner-br" aria-hidden="true" />
    </template>

    <div class="wrath-badges">
      <span
        v-for="check in wrath.checks"
        :key="check.skill"
        class="wrath-pill"
      ><span>{{ check.skill }}</span><b>СЛ {{ check.dc }}</b></span>
      <span class="wrath-tag">{{ WRATH_TIER_LABEL[wrath.tier] }}</span>
      <span v-if="combo" class="wrath-tag wrath-combo">4к4: {{ combo }}</span>
    </div>

    <p class="wrath-flavor">{{ wrath.flavor }}</p>

    <div class="wrath-block wrath-effect">
      <h3>Эффект</h3>
      <p><RuleRichText :text="wrath.effect" :exclude-paths="wrath.linkExcludePaths" /></p>
    </div>

    <div v-if="listFor('effect')" class="wrath-list">
      <div v-for="item in listFor('effect').items" :key="item.name" class="wrath-list-item">
        <b>{{ item.name }}.</b>
        <span><RuleRichText :text="item.text" :exclude-paths="wrath.linkExcludePaths" /></span>
      </div>
    </div>

    <div v-if="tableFor('effect')" class="wrath-table">
      <div class="wrath-table-label">{{ tableFor('effect').label }}</div>
      <div class="wrath-table-grid" :style="{ '--cols': tableFor('effect').head.length }">
        <template v-for="(h, hi) in tableFor('effect').head" :key="'h' + hi">
          <span class="wrath-th">{{ h }}</span>
        </template>
        <template v-for="(row, ri) in tableFor('effect').rows" :key="'r' + ri">
          <span
            v-for="(cell, ci) in row"
            :key="'c' + ri + '-' + ci"
            class="wrath-td"
            :class="{ first: ci === 0 }"
          ><RuleRichText :text="cell" :exclude-paths="wrath.linkExcludePaths" /></span>
        </template>
      </div>
    </div>

    <div class="wrath-block wrath-success">
      <h3>Успех</h3>
      <p><RuleRichText :text="wrath.success" :exclude-paths="wrath.linkExcludePaths" /></p>
    </div>

    <div v-if="tableFor('success')" class="wrath-table">
      <div class="wrath-table-label">{{ tableFor('success').label }}</div>
      <div class="wrath-table-grid" :style="{ '--cols': tableFor('success').head.length }">
        <template v-for="(h, hi) in tableFor('success').head" :key="'h' + hi">
          <span class="wrath-th">{{ h }}</span>
        </template>
        <template v-for="(row, ri) in tableFor('success').rows" :key="'r' + ri">
          <span
            v-for="(cell, ci) in row"
            :key="'c' + ri + '-' + ci"
            class="wrath-td"
            :class="{ first: ci === 0 }"
          ><RuleRichText :text="cell" :exclude-paths="wrath.linkExcludePaths" /></span>
        </template>
      </div>
    </div>

    <div v-for="block in blocksFor('success')" :key="block.title" class="wrath-extra wrath-extra-success">
      <div class="wrath-extra-title">{{ block.title }}</div>
      <p><RuleRichText :text="block.text" :exclude-paths="wrath.linkExcludePaths" /></p>
    </div>

    <div class="wrath-block wrath-fail">
      <h3>Провал</h3>
      <p><RuleRichText :text="wrath.fail" :exclude-paths="wrath.linkExcludePaths" /></p>
    </div>

    <div v-for="block in blocksFor('fail')" :key="block.title" class="wrath-extra wrath-extra-fail">
      <div class="wrath-extra-title">{{ block.title }}</div>
      <p><RuleRichText :text="block.text" :exclude-paths="wrath.linkExcludePaths" /></p>
    </div>
  </div>
</template>

<style scoped>
.wrath-card.framed{
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

.wrath-badges{ display:flex; flex-wrap:wrap; align-items:center; gap:10px; margin-bottom:14px; }
.wrath-pill{ display:inline-flex; align-items:baseline; gap:8px; border:1px solid rgba(var(--theme-accent-rgb),.32); border-radius:999px; background:rgba(var(--theme-accent-rgb),.08); padding:5px 13px; }
.wrath-pill span{ font-size:9px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:rgba(var(--theme-accent-rgb),.7); }
.wrath-pill b{ font-size:13px; font-weight:700; color:rgba(var(--theme-accent-strong-rgb),.9); }
.wrath-tag{ border:1px solid rgba(var(--theme-text-rgb),.12); border-radius:999px; padding:4px 10px; font-size:10px; font-weight:700; color:rgba(var(--theme-text-rgb),.55); }
.wrath-combo{ border-color:rgba(var(--theme-accent-rgb),.28); color:rgba(var(--theme-accent-rgb),.8); }

.wrath-flavor{ margin:0 0 16px; font-family:'Cormorant Garamond',serif; font-style:italic; font-size:19px; line-height:1.55; color:rgba(var(--theme-accent-rgb),.78); white-space:pre-line; }

.wrath-block{ margin-top:14px; padding:12px 16px; border:1px solid rgba(var(--theme-text-rgb),.09); border-left-width:2px; border-radius:8px; background:rgba(var(--theme-contrast-rgb),.012); }
.wrath-block h3{ margin:0 0 6px; font-size:10px; font-weight:850; letter-spacing:.18em; text-transform:uppercase; color:rgba(var(--theme-text-rgb),.5); }
.wrath-block p{ margin:0; font-family:'Cormorant Garamond',serif; font-size:18px; line-height:1.55; color:rgba(var(--theme-text-rgb),.84); white-space:pre-line; }
.wrath-effect{ border-left-color:rgba(var(--theme-accent-rgb),.55); }
.wrath-effect h3{ color:rgba(var(--theme-accent-rgb),.8); }
.wrath-success{ border-left-color:rgba(143,190,154,.6); }
.wrath-success h3{ color:#8fbe9a; }
.wrath-fail{ border-left-color:rgba(207,125,114,.6); }
.wrath-fail h3{ color:#cf7d72; }

.wrath-list{ margin-top:12px; display:flex; flex-direction:column; gap:9px; padding:12px 16px; border:1px solid rgba(var(--theme-accent-rgb),.18); border-radius:8px; background:rgba(var(--theme-accent-rgb),.04); }
.wrath-list-item{ font-size:14px; line-height:1.55; color:rgba(var(--theme-text-rgb),.78); }
.wrath-list-item b{ color:rgba(var(--theme-accent-strong-rgb),.9); margin-right:6px; }

.wrath-table{ margin-top:12px; padding:12px 16px; border:1px solid rgba(var(--theme-accent-rgb),.18); border-radius:8px; background:rgba(var(--theme-accent-rgb),.04); overflow-x:auto; }
.wrath-table-label{ margin-bottom:10px; font-size:11px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; color:rgba(var(--theme-accent-rgb),.75); }
.wrath-table-grid{ display:grid; grid-template-columns:minmax(70px,auto) repeat(calc(var(--cols) - 1),minmax(0,1fr)); gap:1px; background:rgba(var(--theme-text-rgb),.07); border-radius:6px; overflow:hidden; }
.wrath-th{ padding:8px 12px; background:rgba(20,22,30,.96); font-size:10px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:rgba(var(--theme-accent-rgb),.75); }
.wrath-td{ padding:9px 12px; background:rgba(14,16,23,.96); font-size:13.5px; line-height:1.5; color:rgba(var(--theme-text-rgb),.78); }
.wrath-td.first{ font-weight:800; color:rgba(var(--theme-accent-rgb),.75); font-variant-numeric:tabular-nums; }

.wrath-extra{ margin-top:12px; padding:12px 16px; border:1px dashed rgba(var(--theme-accent-rgb),.32); border-radius:8px; background:rgba(var(--theme-accent-rgb),.05); }
.wrath-extra-title{ margin-bottom:6px; font-size:11px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:rgba(var(--theme-accent-strong-rgb),.85); }
.wrath-extra p{ margin:0; font-size:14px; line-height:1.6; color:rgba(var(--theme-text-rgb),.78); white-space:pre-line; }
.wrath-extra-fail{ border-color:rgba(207,125,114,.35); background:rgba(207,125,114,.05); }
</style>
