<script setup>
defineProps(['vm', 'state'])
defineEmits(['up'])
</script>

<template>
  <div class="cls-page" :style="{ background: vm.th.bg }">
    <div class="cls-wrap">
      <div class="cls-head">
        <div class="cls-emblem-box">
          <div class="cls-emblem-frame" :style="{ borderColor: vm.th.thread+'0.6)', boxShadow: '0 0 22px '+vm.th.glow+'0.25)' }" />
          <div class="cls-emblem" :style="{ backgroundImage: `url(${vm.classEmblemUrl})`, filter: 'drop-shadow(0 0 16px '+vm.th.glow+'0.4))' }" />
        </div>
        <div style="flex:1">
          <div class="cls-eyebrow">{{ vm.classSub }}</div>
          <div class="cls-title">{{ vm.className }}</div>
          <div class="cls-en">{{ vm.classEn }}</div>
        </div>
        <span class="cls-back" @click="$emit('up')">← к классам</span>
      </div>

      <div class="cls-grid2">
        <div class="cls-card">
          <div class="cls-card-title">Хиты</div>
          <div class="cls-card-body">
            <div><span class="dim">Кость хитов: </span>1к{{ vm.classHd }} за уровень</div>
            <div><span class="dim">На 1 уровне: </span>{{ vm.classHpFirst }}</div>
            <div><span class="dim">Далее: </span>{{ vm.classHpNext }} (мин. 1)</div>
          </div>
        </div>
        <div class="cls-card">
          <div class="cls-card-title">Владение</div>
          <div class="cls-card-body">
            <div><span class="dim">Доспехи: </span>{{ vm.classArmor }}</div>
            <div><span class="dim">Оружие: </span>{{ vm.classWeapons }}</div>
            <div><span class="dim">Инструменты: </span>{{ vm.classTools }}</div>
            <div><span class="dim">Спасброски: </span>{{ vm.classSaves }}</div>
            <div><span class="dim">Навыки: </span>{{ vm.classSkills }}</div>
          </div>
        </div>
      </div>

      <template v-if="vm.classHasRules">
        <div class="cls-h2">Таблица класса</div>
        <div class="cls-table-wrap">
          <div class="cls-table" :style="{ gridTemplateColumns: vm.classTableGrid }">
            <div v-for="(col, i) in vm.classTableCols" :key="'col'+i" class="cls-table-head">{{ col }}</div>
            <template v-for="(r, ri) in vm.classTableRows" :key="'row'+ri">
              <div v-for="(c, ci) in r.cells" :key="'cell'+ri+'-'+ci" :style="c.style">{{ c.v }}</div>
            </template>
          </div>
        </div>

        <template v-if="vm.classHasEquip">
          <div class="cls-h2">Снаряжение</div>
          <div class="cls-card">
            <div style="display:flex;flex-direction:column;gap:10px">
              <div v-for="(e, i) in vm.classEquip" :key="i" class="cls-equip-row">
                <span style="color:rgba(214,170,96,.7);font-size:13px">◇</span><span>{{ e }}</span>
              </div>
            </div>
            <div class="cls-equip-note">{{ vm.classEquipNote }}</div>
          </div>
        </template>

        <div class="cls-h2">Умения класса</div>
        <div style="display:flex;flex-direction:column;gap:16px">
          <div v-for="(f, i) in vm.classFeatures" :key="i" class="cls-card">
            <div class="cls-feature-head">
              <span class="cls-feature-name">{{ f.name }}</span>
              <span class="cls-badge">{{ f.src }}</span>
              <span class="cls-feature-lvl">{{ f.lvl }}</span>
            </div>
            <div class="cls-feature-text">{{ f.text }}</div>
            <div v-if="f.hasSpellTable" class="cls-spell-table">
              <div class="cls-spell-table-head">
                <div style="padding:9px 14px">Уровень</div>
                <div style="padding:9px 14px;border-left:1px solid rgba(214,170,96,.18)">Заклинание</div>
              </div>
              <div v-for="(sr, sri) in f.spellTable" :key="sri" class="cls-spell-table-row">
                <div style="padding:8px 14px;color:rgba(244,224,170,.85)">{{ sr.lvl }}</div>
                <div style="padding:8px 14px;border-left:1px solid rgba(255,255,255,.05)">{{ sr.spell }}</div>
              </div>
            </div>
          </div>
        </div>

        <template v-if="vm.classHasInfusions">
          <div class="cls-collapsible" @click="state.infOpen = !state.infOpen">
            <span class="cls-chevron">{{ state.infOpen ? '▾' : '▸' }}</span>
            <span class="cls-collapsible-title">Список инфузий</span>
            <span class="cls-collapsible-hint">{{ state.infOpen ? '▾' : '▸' }} развернуть</span>
          </div>
          <div v-if="state.infOpen" style="display:flex;flex-direction:column;gap:14px;margin-top:16px">
            <div v-for="(inf, i) in vm.classInfusions" :key="i" class="cls-card">
              <div class="cls-feature-head">
                <span class="cls-feature-name" style="font-size:21px">{{ inf.name }}</span>
                <span v-if="inf.hasReq" class="cls-badge">{{ inf.req }}</span>
                <span class="cls-feature-lvl" style="letter-spacing:.05em;text-transform:none">{{ inf.item }}</span>
              </div>
              <div class="cls-feature-text" style="font-size:16.5px">{{ inf.text }}</div>
            </div>
          </div>
        </template>

        <template v-if="vm.classHasInvocations">
          <div class="cls-collapsible" @click="state.invOpen = !state.invOpen">
            <span class="cls-chevron">{{ state.invOpen ? '▾' : '▸' }}</span>
            <span class="cls-collapsible-title">Список таинственных воззваний</span>
            <span class="cls-collapsible-hint">{{ state.invOpen ? '▾' : '▸' }} развернуть</span>
          </div>
          <div v-if="state.invOpen" style="display:flex;flex-direction:column;gap:14px;margin-top:16px">
            <div v-for="(inv, i) in vm.classInvocations" :key="i" class="cls-card">
              <div class="cls-feature-head">
                <span class="cls-feature-name" style="font-size:21px">{{ inv.name }}</span>
                <span v-if="inv.hasReq" class="cls-badge">{{ inv.req }}</span>
              </div>
              <div class="cls-feature-text" style="font-size:16.5px">{{ inv.text }}</div>
            </div>
          </div>
        </template>
      </template>
      <div v-else class="cls-stub">Полная таблица уровней и умения для класса «{{ vm.className }}» в подготовке.</div>
    </div>
  </div>
</template>

<style scoped>
.cls-page{position:absolute;top:0;right:0;bottom:0;left:68px;z-index:58;overflow-y:auto}
.cls-wrap{max-width:1080px;margin:0 auto;padding:56px 56px 100px}
.cls-head{display:flex;align-items:center;gap:30px}
.cls-emblem-box{position:relative;flex:none;display:flex;align-items:center;justify-content:center;width:150px;height:150px}
.cls-emblem-frame{position:absolute;width:120px;height:120px;transform:rotate(45deg);border:1px solid;border-radius:9px}
.cls-emblem{width:120px;height:120px;background-size:contain;background-repeat:no-repeat;background-position:center}
.cls-eyebrow{font-family:'Hanken Grotesk',sans-serif;font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:rgba(226,230,244,.42)}
.cls-title{font-family:'Cormorant Garamond',serif;font-size:58px;letter-spacing:.04em;text-transform:uppercase;color:rgba(236,240,252,.97);line-height:1.02}
.cls-en{font-family:'Hanken Grotesk',sans-serif;font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:rgba(214,170,96,.85);margin-top:2px}
.cls-back{flex:none;align-self:flex-start;font-family:'Hanken Grotesk',sans-serif;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(226,230,244,.55);border:1px solid rgba(255,255,255,.16);border-radius:22px;padding:10px 18px;cursor:pointer}
.cls-back:hover{background:rgba(255,255,255,.05)}
.cls-grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:38px}
.cls-card{border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.018);padding:22px 24px}
.cls-card-title{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.08em;text-transform:uppercase;color:rgba(244,224,170,.92);margin-bottom:14px}
.cls-card-body{display:flex;flex-direction:column;gap:9px;font-family:'Cormorant Garamond',serif;font-size:17px;color:rgba(226,230,244,.82);line-height:1.4}
.dim{color:rgba(226,230,244,.45)}
.cls-h2{font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:.1em;text-transform:uppercase;color:rgba(236,240,252,.92);margin:46px 0 18px}
.cls-table-wrap{border:1px solid rgba(255,255,255,.09);border-radius:14px;overflow:hidden}
.cls-table{display:grid;align-items:stretch}
.cls-table-head{padding:11px 6px;background:rgba(214,170,96,.1);font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(244,224,170,.92);text-align:center;border-bottom:1px solid rgba(255,255,255,.1)}
.cls-equip-row{display:flex;gap:12px;align-items:baseline;font-family:'Cormorant Garamond',serif;font-size:18px;color:rgba(226,230,244,.82)}
.cls-equip-note{margin-top:14px;font-family:'Hanken Grotesk',sans-serif;font-size:12.5px;font-style:italic;color:rgba(226,230,244,.5)}
.cls-feature-head{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:8px}
.cls-feature-name{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.02em;color:rgba(244,224,170,.95)}
.cls-badge{font-family:'Hanken Grotesk',sans-serif;font-size:9.5px;font-weight:600;letter-spacing:.1em;color:rgba(20,15,6,.95);background:rgba(214,170,96,.85);border-radius:6px;padding:3px 7px}
.cls-feature-lvl{font-family:'Hanken Grotesk',sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.45)}
.cls-feature-text{font-family:'Cormorant Garamond',serif;font-size:17px;line-height:1.5;color:rgba(226,230,244,.78)}
.cls-spell-table{margin-top:14px;border:1px solid rgba(214,170,96,.22);border-radius:10px;overflow:hidden;max-width:420px}
.cls-spell-table-head{display:grid;grid-template-columns:130px 1fr;background:rgba(214,170,96,.12);font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(244,224,170,.9)}
.cls-spell-table-row{display:grid;grid-template-columns:130px 1fr;border-top:1px solid rgba(255,255,255,.05);font-family:'Cormorant Garamond',serif;font-size:16px;color:rgba(226,230,244,.82)}
.cls-collapsible{display:flex;align-items:center;gap:14px;margin:46px 0 0;padding:18px 22px;border:1px solid rgba(214,170,96,.28);border-radius:14px;background:rgba(214,170,96,.06);cursor:pointer}
.cls-collapsible:hover{background:rgba(255,255,255,.06)}
.cls-chevron{font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(244,224,170,.9)}
.cls-collapsible-title{flex:1;font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:.06em;text-transform:uppercase;color:rgba(236,240,252,.92)}
.cls-collapsible-hint{font-family:'Hanken Grotesk',sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(226,230,244,.45)}
.cls-stub{margin-top:40px;border:1px dashed rgba(255,255,255,.14);border-radius:14px;padding:30px;text-align:center;font-family:'Cormorant Garamond',serif;font-size:19px;color:rgba(226,230,244,.55)}
</style>
