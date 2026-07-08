<script setup>
import { OMEN_TIER_LABEL, OMEN_FACES } from '~/data/omens5e.js'

const props = defineProps({
  omen: { type: Object, required: true },
  framed: { type: Boolean, default: false }
})

// Компактная запись комбинации 4к4: «3× Бунти · 1× Аюр».
const combo = computed(() => (props.omen.sig || [])
  .map((count, i) => count ? `${count}× ${OMEN_FACES[i]}` : null)
  .filter(Boolean)
  .join(' · '))
</script>

<template>
  <div class="omen-card" :class="{ framed }">
    <template v-if="framed">
      <span class="rt-corner rt-corner-tl" aria-hidden="true" /><span class="rt-corner rt-corner-tr" aria-hidden="true" />
      <span class="rt-corner rt-corner-bl" aria-hidden="true" /><span class="rt-corner rt-corner-br" aria-hidden="true" />
    </template>

    <div class="omen-badges">
      <span class="omen-pill"><span>Сложность</span><b>СЛ {{ omen.dc }}</b></span>
      <span class="omen-tag">{{ OMEN_TIER_LABEL[omen.dc] }}</span>
      <span v-if="combo" class="omen-tag omen-combo">4к4: {{ combo }}</span>
    </div>

    <p class="omen-flavor">{{ omen.flavor }}</p>

    <div class="omen-block omen-effect">
      <h3>Эффект</h3>
      <p><RuleRichText :text="omen.effect" /></p>
    </div>

    <div v-if="omen.table" class="omen-table">
      <div class="omen-table-label">{{ omen.table.label }}</div>
      <ol>
        <li v-for="row in omen.table.entries" :key="row.roll">
          <span class="omen-roll-num">{{ row.roll }}</span>
          <span><RuleRichText :text="row.text" /></span>
        </li>
      </ol>
    </div>

    <div class="omen-block omen-success">
      <h3>Успех</h3>
      <p><RuleRichText :text="omen.success" /></p>
    </div>

    <div class="omen-block omen-fail">
      <h3>Провал</h3>
      <p><RuleRichText :text="omen.fail" /></p>
    </div>
  </div>
</template>

<style scoped>
.omen-card.framed{
  position:relative;
  padding:22px 24px 20px;
  border:1px solid rgba(214,170,96,.22);
  border-radius:10px;
  background:linear-gradient(180deg,rgba(214,170,96,.05),rgba(255,255,255,.008));
}

.rt-corner{ position:absolute; width:14px; height:14px; pointer-events:none; }
.rt-corner-tl{ top:6px; left:6px; border-top:1.5px solid rgba(214,170,96,.5); border-left:1.5px solid rgba(214,170,96,.5); border-radius:5px 0 0 0; }
.rt-corner-tr{ top:6px; right:6px; border-top:1.5px solid rgba(214,170,96,.5); border-right:1.5px solid rgba(214,170,96,.5); border-radius:0 5px 0 0; }
.rt-corner-bl{ bottom:6px; left:6px; border-bottom:1.5px solid rgba(214,170,96,.5); border-left:1.5px solid rgba(214,170,96,.5); border-radius:0 0 0 5px; }
.rt-corner-br{ bottom:6px; right:6px; border-bottom:1.5px solid rgba(214,170,96,.5); border-right:1.5px solid rgba(214,170,96,.5); border-radius:0 0 5px 0; }

.omen-badges{ display:flex; flex-wrap:wrap; align-items:center; gap:10px; margin-bottom:14px; }
.omen-pill{ display:inline-flex; align-items:baseline; gap:8px; border:1px solid rgba(214,170,96,.32); border-radius:999px; background:rgba(214,170,96,.08); padding:5px 13px; }
.omen-pill span{ font-size:9px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:rgba(214,170,96,.7); }
.omen-pill b{ font-size:13px; font-weight:700; color:rgba(244,224,170,.9); }
.omen-tag{ border:1px solid rgba(232,236,248,.12); border-radius:999px; padding:4px 10px; font-size:10px; font-weight:700; color:rgba(232,236,248,.55); }
.omen-combo{ border-color:rgba(214,170,96,.28); color:rgba(214,170,96,.8); }

.omen-flavor{ margin:0 0 16px; font-family:'Cormorant Garamond',serif; font-style:italic; font-size:19px; line-height:1.55; color:rgba(214,170,96,.78); }

.omen-block{ margin-top:14px; padding:12px 16px; border:1px solid rgba(232,236,248,.09); border-left-width:2px; border-radius:8px; background:rgba(255,255,255,.012); }
.omen-block h3{ margin:0 0 6px; font-size:10px; font-weight:850; letter-spacing:.18em; text-transform:uppercase; color:rgba(232,236,248,.5); }
.omen-block p{ margin:0; font-family:'Cormorant Garamond',serif; font-size:18px; line-height:1.55; color:rgba(224,232,242,.84); }
.omen-effect{ border-left-color:rgba(214,170,96,.55); }
.omen-effect h3{ color:rgba(214,170,96,.8); }
.omen-success{ border-left-color:rgba(143,190,154,.6); }
.omen-success h3{ color:#8fbe9a; }
.omen-fail{ border-left-color:rgba(207,125,114,.6); }
.omen-fail h3{ color:#cf7d72; }

.omen-table{ margin-top:14px; padding:12px 16px; border:1px solid rgba(214,170,96,.18); border-radius:8px; background:rgba(214,170,96,.04); }
.omen-table-label{ margin-bottom:8px; font-size:11px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; color:rgba(214,170,96,.75); }
.omen-table ol{ display:flex; flex-direction:column; gap:7px; margin:0; padding:0; list-style:none; }
.omen-table li{ display:flex; gap:12px; font-size:14px; line-height:1.5; color:rgba(224,232,242,.78); }
.omen-roll-num{ flex:0 0 auto; width:20px; font-weight:800; color:rgba(214,170,96,.7); font-variant-numeric:tabular-nums; }
</style>
