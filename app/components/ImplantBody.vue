<script setup>
import { activeFaces, toSig } from '~/utils/shagai5e.js'

const props = defineProps({
  implant: { type: Object, required: true }
})

const combo = computed(() => activeFaces(toSig(props.implant.roll?.counts || props.implant.roll)))

const parts = computed(() => {
  const out = { difficulty: null, levels: [], notes: [] }
  for (const raw of String(props.implant.text || '').split('\n')) {
    const line = raw.trim()
    if (!line || /^(Кости|Характеристики|Тип|Бонус|Провал)\s*:?\s*$/i.test(line)) continue
    const diff = line.match(/^(?:Создание|Получение) импланта\s*:\s*(\d+)/i)
    if (diff) { out.difficulty = Number(diff[1]); continue }
    const lvl = line.match(/^Уровень\s+(\d+\+?)\s*:?\s*(.+)$/i)
    if (lvl) out.levels.push({ level: lvl[1], text: lvl[2] })
    else if (!/^(?:Создание|Получение|Вживление) импланта\s*:\s*$/i.test(line)) out.notes.push(line)
  }
  return out
})
</script>

<template>
  <div class="imp-body">
    <div class="imp-combo">
      <span v-for="f in combo" :key="f.key" class="fam-face">
        <img :src="f.img" :alt="f.label"><b>{{ f.count }}×</b>{{ f.label }}
      </span>
      <span v-if="parts.difficulty" class="imp-diff">Создание · Сл {{ parts.difficulty }}</span>
    </div>

    <div v-if="parts.levels.length" class="imp-levels">
      <div v-for="lvl in parts.levels" :key="lvl.level" class="imp-level">
        <span class="imp-level-tag">Ур. {{ lvl.level }}</span>
        <p>{{ lvl.text }}</p>
      </div>
    </div>

    <p v-for="(note, i) in parts.notes" :key="i" class="tref-desc imp-note">{{ note }}</p>
  </div>
</template>

<style scoped>
.imp-combo{ display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-bottom:14px; }
.fam-face{
  display:inline-flex; align-items:center; gap:6px;
  border:1px solid rgba(214,170,96,.28); border-radius:999px;
  background:rgba(214,170,96,.06); padding:4px 11px 4px 5px;
  font-size:11px; font-weight:700; color:rgba(232,236,248,.72);
}
.fam-face img{ width:20px; height:20px; object-fit:contain; border-radius:50%; background:radial-gradient(120% 120% at 30% 25%, #efe6d2, #cabb9a); padding:2px; }
.fam-face b{ color:rgba(244,224,170,.9); }
.imp-diff{ border:1px solid rgba(214,170,96,.32); border-radius:999px; background:rgba(214,170,96,.08); padding:5px 12px; font-size:11px; font-weight:700; color:rgba(244,224,170,.9); }

.imp-levels{ display:flex; flex-direction:column; gap:8px; }
.imp-level{ display:grid; grid-template-columns:74px 1fr; gap:12px; padding:12px 14px; border:1px solid rgba(232,236,248,.08); border-radius:8px; background:rgba(255,255,255,.012); }
.imp-level-tag{ font-size:11px; font-weight:800; letter-spacing:.06em; text-transform:uppercase; color:rgba(214,170,96,.8); }
.imp-level p{ margin:0; font-family:'Cormorant Garamond',serif; font-size:16px; line-height:1.5; color:rgba(224,232,242,.82); }

.imp-note{ margin-top:12px; }

@media (max-width:560px){ .imp-level{ grid-template-columns:1fr; gap:4px; } }
</style>
