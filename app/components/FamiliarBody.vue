<script setup>
import { activeFaces, toSig } from '~/utils/shagai5e.js'

const props = defineProps({
  familiar: { type: Object, required: true }
})

const combo = computed(() => activeFaces(toSig(props.familiar.roll)))

const parts = computed(() => {
  const out = { description: [], meta: [], stats: [] }
  let inStats = false
  for (const line of props.familiar.lines || []) {
    if (/^Кости\s*:?$/i.test(line)) continue
    if (/^Характеристики\s*:?$/i.test(line)) { inStats = true; continue }
    if (inStats) { out.stats.push(line); continue }
    if (/^(Композиция|Сложность создания|Бонус|Провал)\s*:/i.test(line)) {
      const idx = line.indexOf(':')
      out.meta.push({ label: line.slice(0, idx), text: line.slice(idx + 1).trim() })
    } else {
      out.description.push(line)
    }
  }
  return out
})
</script>

<template>
  <div class="fam-body">
    <div class="fam-combo">
      <span v-for="f in combo" :key="f.key" class="fam-face">
        <img :src="f.img" :alt="f.label"><b>{{ f.count }}×</b>{{ f.label }}
      </span>
    </div>

    <p v-for="(text, i) in parts.description" :key="'d' + i" class="tref-desc">{{ text }}</p>

    <div v-if="parts.meta.length" class="fam-meta">
      <div
        v-for="row in parts.meta"
        :key="row.label"
        class="fam-meta-row"
        :class="{ danger: /провал/i.test(row.label) }"
      >
        <span class="fam-meta-label">{{ row.label }}</span>
        <span class="fam-meta-text">{{ row.text }}</span>
      </div>
    </div>

    <div v-if="parts.stats.length" class="fam-stats">
      <div class="fam-stats-label">Характеристики</div>
      <p v-for="(text, i) in parts.stats" :key="'s' + i">{{ text }}</p>
    </div>
  </div>
</template>

<style scoped>
.fam-combo{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
.fam-face{
  display:inline-flex; align-items:center; gap:6px;
  border:1px solid rgba(var(--theme-accent-rgb),.28); border-radius:999px;
  background:rgba(var(--theme-accent-rgb),.06); padding:4px 11px 4px 5px;
  font-size:11px; font-weight:700; color:rgba(var(--theme-text-rgb),.72);
}
.fam-face img{ width:20px; height:20px; object-fit:contain; border-radius:50%; background:radial-gradient(120% 120% at 30% 25%, #efe6d2, #cabb9a); padding:2px; }
.fam-face b{ color:rgba(var(--theme-accent-strong-rgb),.9); }

.fam-meta{ display:flex; flex-direction:column; gap:8px; margin-top:16px; }
.fam-meta-row{
  display:grid; grid-template-columns:160px 1fr; gap:0;
  border:1px solid rgba(var(--theme-text-rgb),.08); border-radius:8px; overflow:hidden;
}
.fam-meta-label{
  padding:11px 13px; background:rgba(var(--theme-accent-rgb),.07);
  color:rgba(var(--theme-accent-strong-rgb),.88); font-size:10px; font-weight:800;
  letter-spacing:.1em; text-transform:uppercase;
}
.fam-meta-text{ padding:11px 13px; font-family:'Cormorant Garamond',serif; font-size:15px; line-height:1.5; color:rgba(var(--theme-text-rgb),.8); }
.fam-meta-row.danger .fam-meta-label{ color:#e0a59d; background:rgba(170,55,55,.1); }

.fam-stats{ margin-top:16px; padding:14px 16px; border-left:2px solid rgba(var(--theme-accent-rgb),.5); background:rgba(var(--theme-contrast-rgb),.012); border-radius:0 8px 8px 0; }
.fam-stats-label{ margin-bottom:6px; font-size:10px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:rgba(var(--theme-accent-rgb),.7); }
.fam-stats p{ margin:4px 0; font-family:'Cormorant Garamond',serif; font-size:15px; line-height:1.5; color:rgba(var(--theme-text-rgb),.78); }
</style>
