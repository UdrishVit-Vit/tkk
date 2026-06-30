<script setup>
const props = defineProps(['vm', 'state'])
const emit = defineEmits(['close', 'stop'])

function stop(e) { e?.stopPropagation?.() }
</script>

<template>
  <div v-if="state.overlay && state.overlay !== 'search'" class="overlay-backdrop" @click="emit('close')" />

  <div v-if="state.overlay === 'search'" class="search-backdrop" @click="emit('close')">
    <div class="search-modal" @click="stop">
      <div class="search-head">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="color:rgba(200,210,240,.6)"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
        <input
          :value="state.query"
          placeholder="искать нить, узел, фракцию…"
          class="search-input"
          autofocus
          @input="state.query = $event.target.value"
        >
        <span class="search-esc">esc</span>
      </div>
      <div class="search-results">
        <div v-for="(r, i) in vm.results" :key="i" class="search-row" @click="r.onClick()">
          <svg viewBox="-50 -50 100 100" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.8" style="color:rgba(200,210,240,.5);flex:none"><ellipse rx="36" ry="15"/><ellipse rx="36" ry="15" transform="rotate(90)"/></svg>
          <span class="search-label">{{ r.label }}</span>
          <span class="search-sys">{{ r.sys }}</span>
        </div>
        <div v-if="vm.noResults" class="search-empty">нить не найдена</div>
      </div>
    </div>
  </div>

  <div v-if="state.overlay === 'bookmarks'" class="pop" style="top:130px" @click="stop">
    <div class="pop-title">Сохранённые нити</div>
    <div v-if="vm.hasBookmarks" class="pop-list">
      <div v-for="(b, i) in vm.bookmarks" :key="i" class="pop-row"><span style="color:rgba(200,210,240,.5)">◦</span>{{ b }}</div>
    </div>
    <div v-if="vm.noBookmarks" class="pop-empty">пока нет сохранённых нитей</div>
  </div>

  <div v-if="state.overlay === 'social'" class="pop" style="top:176px" @click="stop">
    <div class="pop-title">Сообщество</div>
    <div class="pop-list" style="gap:2px">
      <a v-for="(s, i) in vm.socials" :key="i" href="#" class="pop-social-row" @click="stop">
        <span class="pop-dot" :style="{ background: s.dot, boxShadow: '0 0 8px '+s.dot }" />
        <span style="font-family:'Cormorant Garamond',serif;font-size:18px">{{ s.name }}</span>
        <span class="pop-handle">{{ s.handle }}</span>
      </a>
    </div>
  </div>

  <div v-if="state.overlay === 'theme'" class="pop" style="top:222px" @click="stop">
    <div class="pop-title">Оформление</div>
    <div style="display:flex;gap:10px;margin-top:10px">
      <div class="swatch" @click="state.theme = 'void'">
        <div class="swatch-preview" style="background:radial-gradient(120% 120% at 50% 30%,#0c0e14,#040406);border:1px solid rgba(255,255,255,.08)" :class="{ active: state.theme === 'void' }" />
        <div class="swatch-label">Пустота</div>
      </div>
      <div class="swatch" @click="state.theme = 'sepia'">
        <div class="swatch-preview" style="background:radial-gradient(120% 120% at 50% 30%,#171208,#070402);border:1px solid rgba(255,210,150,.14)" :class="{ active: state.theme === 'sepia' }" />
        <div class="swatch-label">Янтарь</div>
      </div>
    </div>
  </div>

  <div v-if="state.overlay === 'systems'" class="pop" style="top:268px" @click="stop">
    <div class="pop-title">Сменить систему</div>
    <div class="pop-list" style="gap:2px">
      <div v-for="(s, i) in vm.systemList" :key="i" class="pop-social-row" style="cursor:pointer" @click="s.onClick()">
        <svg viewBox="-50 -50 100 100" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.8" style="color:rgba(200,210,240,.55);flex:none"><ellipse rx="36" ry="15"/><ellipse rx="36" ry="15" transform="rotate(45)"/><ellipse rx="36" ry="15" transform="rotate(90)"/></svg>
        <span style="font-family:'Cormorant Garamond',serif;font-size:18px;color:rgba(232,236,250,.9)">{{ s.name }}</span>
        <span class="pop-handle" style="letter-spacing:.24em">{{ s.tag }}</span>
      </div>
    </div>
  </div>

  <div v-if="state.overlay === 'auth'" class="pop" style="bottom:20px;top:auto;width:280px" @click="stop">
    <div v-if="state.authed" style="text-align:center;padding:6px 0">
      <div style="font-family:'Cormorant Garamond',serif;font-size:24px;color:rgba(234,238,252,.95)">Вплетён</div>
      <div style="font-family:'Hanken Grotesk';font-size:11px;color:rgba(226,230,244,.5);margin-top:6px">странник@tkk.club</div>
      <div class="auth-btn" @click="state.authed = false">выйти</div>
    </div>
    <div v-else>
      <div class="pop-title">Войти в плетение</div>
      <input placeholder="имя странника" class="auth-input">
      <input type="password" placeholder="ключ" class="auth-input">
      <div class="auth-submit" @click="state.authed = true">войти</div>
      <div class="auth-new">завязать новый узел →</div>
    </div>
  </div>
</template>

<style scoped>
.overlay-backdrop{position:absolute;inset:0;z-index:65}
.search-backdrop{position:absolute;inset:0;z-index:80;background:rgba(4,5,8,.6);backdrop-filter:blur(6px);display:flex;justify-content:center;padding-top:16vh;animation:riseIn .3s ease both}
.search-modal{width:560px;max-width:90vw;height:fit-content;background:rgba(11,12,17,.92);border:1px solid rgba(255,255,255,.1);border-radius:18px;overflow:hidden;animation:popIn .35s cubic-bezier(.2,.8,.2,1) both}
.search-head{display:flex;align-items:center;gap:14px;padding:20px 24px;border-bottom:1px solid rgba(255,255,255,.07)}
.search-input{flex:1;background:none;border:none;outline:none;color:rgba(234,238,252,.95);font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.02em}
.search-esc{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(226,230,244,.35);border:1px solid rgba(255,255,255,.12);border-radius:6px;padding:4px 7px}
.search-results{max-height:46vh;overflow-y:auto;padding:8px}
.search-row{display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:11px;cursor:pointer;transition:background .2s}
.search-row:hover{background:rgba(255,255,255,.05)}
.search-label{font-family:'Cormorant Garamond',serif;font-size:18px;color:rgba(232,236,250,.92)}
.search-sys{margin-left:auto;font-family:'Hanken Grotesk';font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:rgba(226,230,244,.4)}
.search-empty{text-align:center;padding:34px;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:17px;color:rgba(226,230,244,.4)}

.pop{position:absolute;left:84px;z-index:70;width:248px;background:rgba(11,12,17,.94);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:18px;backdrop-filter:blur(16px);box-shadow:0 24px 60px rgba(0,0,0,.5);animation:popIn .3s cubic-bezier(.2,.8,.2,1) both}
.pop-title{font-family:'Hanken Grotesk';font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:rgba(226,230,244,.5);margin-bottom:4px}
.pop-list{display:flex;flex-direction:column;gap:4px;margin-top:6px}
.pop-row{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:9px;font-family:'Cormorant Garamond',serif;font-size:17px;color:rgba(232,236,250,.88)}
.pop-row:hover{background:rgba(255,255,255,.05)}
.pop-empty{padding:22px 8px;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;color:rgba(226,230,244,.42);text-align:center;line-height:1.5}
.pop-social-row{display:flex;align-items:center;gap:13px;padding:11px 12px;border-radius:9px;text-decoration:none;color:rgba(232,236,250,.85)}
.pop-social-row:hover{background:rgba(255,255,255,.05)}
.pop-dot{width:7px;height:7px;border-radius:50%}
.pop-handle{margin-left:auto;font-family:'Hanken Grotesk';font-size:11px;color:rgba(226,230,244,.4)}

.swatch{flex:1;cursor:pointer;padding:7px;border-radius:11px;transition:all .2s;border:1px solid rgba(255,255,255,.08)}
.swatch-preview{height:42px;border-radius:8px}
.swatch-preview.active{outline:2px solid rgba(196,208,240,.5)}
.swatch-label{font-family:'Hanken Grotesk';font-size:10px;letter-spacing:.22em;text-transform:uppercase;margin-top:8px;text-align:center;color:rgba(226,230,244,.8)}

.auth-input{width:100%;margin-top:9px;padding:12px 14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:10px;outline:none;color:rgba(234,238,252,.95);font-family:'Cormorant Garamond',serif;font-size:17px}
.auth-btn{margin-top:16px;padding:11px;border:1px solid rgba(255,255,255,.12);border-radius:10px;cursor:pointer;font-family:'Hanken Grotesk';font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(226,230,244,.7)}
.auth-btn:hover{background:rgba(255,255,255,.05)}
.auth-submit{margin-top:12px;padding:13px;border-radius:11px;text-align:center;cursor:pointer;background:rgba(230,235,252,.92);color:#0a0b10;font-family:'Hanken Grotesk';font-size:11px;letter-spacing:.22em;text-transform:uppercase;font-weight:600}
.auth-submit:hover{background:rgba(255,255,255,1)}
.auth-new{text-align:center;margin-top:12px;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;color:rgba(226,230,244,.5);cursor:pointer}
</style>
