<script setup>
const props = defineProps(['vm', 'query'])
defineEmits(['up', 'addBookmark', 'update:query'])
</script>

<template>
  <div class="cards-page" :style="{ background: vm.th.bg }">
    <div class="cards-wrap">
      <div class="cards-head">
        <div>
          <div class="cards-eyebrow">{{ vm.sectionEyebrow }}</div>
          <div class="cards-title">{{ vm.sectionTitle }}</div>
        </div>
        <span class="cards-back" @click="$emit('up')">← к карте</span>
      </div>
      <div class="cards-toolbar">
        <input
          :value="query"
          placeholder="Поиск..."
          class="cards-search"
          @input="$emit('update:query', $event.target.value)"
        >
        <div class="cards-filter">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M3 5h18M6 12h12M10 19h4"/></svg>
          Фильтр
        </div>
      </div>
      <div class="cards-grid">
        <div v-for="(c, i) in vm.sectionCards" :key="i" class="card-tile">
          <div class="card-glow" />
          <div class="card-diamond" />
          <svg viewBox="-50 -50 100 100" class="card-knot" fill="none" stroke="rgba(232,226,208,.8)" stroke-width="1.4"><ellipse rx="34" ry="13"/><ellipse rx="34" ry="13" transform="rotate(60)"/><ellipse rx="34" ry="13" transform="rotate(120)"/><circle r="6"/></svg>
          <svg viewBox="0 0 40 40" class="card-corner" fill="none" stroke="rgba(214,170,96,.4)" stroke-width="1"><path d="M3 22 L3 3 L22 3"/></svg>
          <div class="card-body">
            <div>
              <div class="card-name">{{ c.name }}</div>
              <div v-if="c.hasSub" class="card-sub">{{ c.sub }}</div>
            </div>
            <div class="card-badges">
              <span v-for="(b, bi) in c.badges" :key="bi" class="card-badge">{{ b }}</span>
              <span v-if="c.hasTag" class="card-tag">ED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards-page{position:absolute;top:0;right:0;bottom:0;left:68px;z-index:55;overflow-y:auto}
.cards-wrap{max-width:1200px;margin:0 auto;padding:52px 48px 90px}
.cards-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px}
.cards-eyebrow{font-family:'Hanken Grotesk',sans-serif;font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:rgba(226,230,244,.42)}
.cards-title{font-family:'Cormorant Garamond',serif;font-size:48px;letter-spacing:.01em;color:rgba(236,240,252,.96);margin-top:8px;line-height:1.04}
.cards-back{flex:none;margin-top:8px;font-family:'Hanken Grotesk',sans-serif;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(226,230,244,.55);border:1px solid rgba(255,255,255,.16);border-radius:22px;padding:9px 16px;cursor:pointer}
.cards-back:hover{background:rgba(255,255,255,.05)}
.cards-toolbar{display:flex;gap:12px;margin:30px 0}
.cards-search{flex:1;padding:14px 18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:13px;outline:none;color:rgba(236,240,252,.95);font-family:'Cormorant Garamond',serif;font-size:18px}
.cards-filter{flex:none;display:flex;align-items:center;gap:9px;padding:0 22px;background:rgba(214,170,96,.14);border:1px solid rgba(214,170,96,.34);border-radius:13px;cursor:pointer;font-family:'Hanken Grotesk',sans-serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(244,214,150,.95)}
.cards-filter:hover{background:rgba(255,255,255,.06)}
.cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(286px,1fr));gap:18px}
.card-tile{position:relative;overflow:hidden;height:130px;border:1px solid rgba(255,255,255,.09);border-radius:14px;background:linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.012));cursor:pointer;transition:all .28s}
.card-tile:hover{background:rgba(255,255,255,.06);border-color:rgba(214,170,96,.4);transform:translateY(-3px)}
.card-glow{position:absolute;top:0;right:0;bottom:0;width:46%;background:radial-gradient(120% 120% at 90% 30%,rgba(214,170,96,.16),rgba(214,170,96,0) 62%);-webkit-mask-image:linear-gradient(90deg,transparent,#000 60%);mask-image:linear-gradient(90deg,transparent,#000 60%)}
.card-diamond{position:absolute;top:14px;right:16px;width:62px;height:62px;transform:rotate(45deg);border:1px solid rgba(214,170,96,.34);border-radius:6px}
.card-knot{position:absolute;top:24px;right:26px;width:42px;height:42px;opacity:.6}
.card-corner{position:absolute;left:-2px;top:-2px;width:30px;height:30px}
.card-body{position:absolute;inset:0;padding:18px 20px;display:flex;flex-direction:column;justify-content:space-between}
.card-name{font-family:'Cormorant Garamond',serif;font-size:23px;font-weight:600;letter-spacing:.01em;color:rgba(238,242,252,.97);line-height:1.05}
.card-sub{font-family:'Hanken Grotesk',sans-serif;font-size:11px;letter-spacing:.14em;color:rgba(214,170,96,.85);margin-top:3px}
.card-badges{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.card-badge{font-family:'Hanken Grotesk',sans-serif;font-size:10.5px;letter-spacing:.03em;color:rgba(244,224,170,.96);background:rgba(40,32,16,.72);border:1px solid rgba(214,170,96,.3);border-radius:999px;padding:4px 11px;white-space:nowrap}
.card-tag{font-family:'Hanken Grotesk',sans-serif;font-size:9.5px;font-weight:600;letter-spacing:.12em;color:rgba(20,15,6,.95);background:rgba(214,170,96,.9);border-radius:7px;padding:4px 8px}
</style>
