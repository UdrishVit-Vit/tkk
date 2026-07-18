<script setup>
import { TEA_TIER_LABEL } from '~/data/tea5e.js'
import { shagaiCombo } from '~/utils/shagai5e.js'

const props = defineProps({
  tea: { type: Object, required: true },
  framed: { type: Boolean, default: false }
})

const combo = computed(() => shagaiCombo(props.tea.sig || []))

function tableFor(slot) {
  const t = props.tea.table
  return t && t.slot === slot ? t : null
}
</script>

<template>
  <div class="tea-card" :class="{ framed }">
    <template v-if="framed">
      <span class="rt-corner rt-corner-tl" aria-hidden="true" /><span class="rt-corner rt-corner-tr" aria-hidden="true" />
      <span class="rt-corner rt-corner-bl" aria-hidden="true" /><span class="rt-corner rt-corner-br" aria-hidden="true" />
    </template>

    <div class="tea-badges">
      <span class="tea-pill"><span>Заваривание</span><b>СЛ {{ tea.dc }}</b></span>
      <span class="tea-tag">{{ TEA_TIER_LABEL[tea.tier] }}</span>
      <span v-if="combo" class="tea-tag tea-combo">4к4: {{ combo }}</span>
    </div>

    <p class="tea-flavor">{{ tea.flavor }}</p>

    <template v-if="tableFor('effect')">
      <div class="tea-table">
        <div class="tea-table-label">{{ tableFor('effect').label }}</div>
        <div class="tea-table-grid" :style="{ '--cols': tableFor('effect').head.length }">
          <template v-for="(h, hi) in tableFor('effect').head" :key="'h' + hi">
            <span class="tea-th">{{ h }}</span>
          </template>
          <template v-for="(row, ri) in tableFor('effect').rows" :key="'r' + ri">
            <span
              v-for="(cell, ci) in row"
              :key="'c' + ri + '-' + ci"
              class="tea-td"
              :class="{ first: ci === 0 }"
            ><RuleRichText :text="cell" /></span>
          </template>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="tea-block tea-effect">
        <h3>Эффект</h3>
        <p><RuleRichText :text="tea.effect" /></p>
      </div>

      <div class="tea-block tea-success">
        <h3>Успех</h3>
        <p><RuleRichText :text="tea.success" /></p>
      </div>

      <div class="tea-block tea-fail">
        <h3>Провал</h3>
        <p><RuleRichText :text="tea.fail" /></p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.tea-card.framed{
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

.tea-badges{ display:flex; flex-wrap:wrap; align-items:center; gap:10px; margin-bottom:14px; }
.tea-pill{ display:inline-flex; align-items:baseline; gap:8px; border:1px solid rgba(var(--theme-accent-rgb),.32); border-radius:999px; background:rgba(var(--theme-accent-rgb),.08); padding:5px 13px; }
.tea-pill span{ font-size:9px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:rgba(var(--theme-accent-rgb),.7); }
.tea-pill b{ font-size:13px; font-weight:700; color:rgba(var(--theme-accent-strong-rgb),.9); }
.tea-tag{ border:1px solid rgba(var(--theme-text-rgb),.12); border-radius:999px; padding:4px 10px; font-size:10px; font-weight:700; color:rgba(var(--theme-text-rgb),.55); }
.tea-combo{ border-color:rgba(var(--theme-accent-rgb),.28); color:rgba(var(--theme-accent-rgb),.8); }

.tea-flavor{ margin:0 0 16px; font-family:'Cormorant Garamond',serif; font-style:italic; font-size:19px; line-height:1.55; color:rgba(var(--theme-accent-rgb),.78); white-space:pre-line; }

.tea-block{ margin-top:14px; padding:12px 16px; border:1px solid rgba(var(--theme-text-rgb),.09); border-left-width:2px; border-radius:8px; background:rgba(var(--theme-contrast-rgb),.012); }
.tea-block h3{ margin:0 0 6px; font-size:10px; font-weight:850; letter-spacing:.18em; text-transform:uppercase; color:rgba(var(--theme-text-rgb),.5); }
.tea-block p{ margin:0; font-family:'Cormorant Garamond',serif; font-size:18px; line-height:1.55; color:rgba(var(--theme-text-rgb),.84); white-space:pre-line; }
.tea-effect{ border-left-color:rgba(var(--theme-accent-rgb),.55); }
.tea-effect h3{ color:rgba(var(--theme-accent-rgb),.8); }
.tea-success{ border-left-color:rgba(143,190,154,.6); }
.tea-success h3{ color:#8fbe9a; }
.tea-fail{ border-left-color:rgba(207,125,114,.6); }
.tea-fail h3{ color:#cf7d72; }

.tea-table{ margin-top:14px; padding:12px 16px; border:1px solid rgba(var(--theme-accent-rgb),.18); border-radius:8px; background:rgba(var(--theme-accent-rgb),.04); overflow-x:auto; }
.tea-table-label{ margin-bottom:10px; font-size:11px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; color:rgba(var(--theme-accent-rgb),.75); }
.tea-table-grid{ display:grid; grid-template-columns:minmax(56px,auto) repeat(calc(var(--cols) - 1),minmax(0,1fr)); gap:1px; background:rgba(var(--theme-text-rgb),.07); border-radius:6px; overflow:hidden; }
.tea-th{ padding:8px 12px; background:rgba(20,22,30,.96); font-size:10px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:rgba(var(--theme-accent-rgb),.75); }
.tea-td{ padding:9px 12px; background:rgba(14,16,23,.96); font-size:13.5px; line-height:1.5; color:rgba(var(--theme-text-rgb),.78); }
.tea-td.first{ font-weight:800; color:rgba(var(--theme-accent-rgb),.75); font-variant-numeric:tabular-nums; }
</style>
