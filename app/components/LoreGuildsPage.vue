<script setup>
import GuildMark from './GuildMark.vue'
import { GUILDS, GUILD_FILTERS, guildBySlug, guildMatches } from '~/data/loreGuilds.js'

defineProps({ theme: { type: Object, required: true } })
defineEmits(['up'])
const route = useRoute()
const query = ref('')
const category = ref('Все гильдии')
const viewport = ref(null)
const guild = computed(() => guildBySlug(String(route.params.slug || '')))
const visibleGuilds = computed(() => GUILDS.filter(item => guildMatches(item, query.value, category.value)))
function resetFilters() { query.value = ''; category.value = 'Все гильдии' }
watch(() => route.fullPath, async () => {
  await nextTick()
  if (viewport.value) viewport.value.scrollTop = 0
})
</script>

<template>
  <main class="lore-history guild-history" :class="{ 'guild-directory-page': !guild }" :style="{ background: theme.bg }" aria-label="Гильдии Эноа">
    <section ref="viewport" class="lore-viewport">
      <div class="lore-history__texture" aria-hidden="true"/>
      <div class="history-canvas">
        <div class="history-thread" aria-hidden="true"><i/><i/><i/><i/><b/></div>
        <NuxtLink v-if="guild" to="/lore/guilds" class="guild-back">← Все гильдии</NuxtLink>

        <section class="history-intro timeline-row" aria-labelledby="guild-title">
          <div class="history-intro__copy">
            <p>{{ guild ? `Lore · Гильдии · ${guild.location}` : 'Lore · Узы общего дела' }}</p>
            <h1 id="guild-title">{{ guild?.name || 'Гильдии' }}</h1>
            <aside><span>Архив Башни</span><p>{{ guild ? guild.summary : 'Люди, которых связывает общее дело. Гильдии Эноа, их участники, корабли и места встреч — каждая со своей нитью в истории мира.' }}</p></aside>
          </div>
          <NuxtLink v-if="guild" to="/lore/guilds" class="history-intro__sigil" aria-label="Вернуться к гильдиям"><GuildMark :kind="guild.mark"/></NuxtLink>
          <button v-else type="button" class="history-intro__sigil" aria-label="Вернуться к карте Lore" @click="$emit('up')"><img src="/assets/nodes/guilds-lore.webp" width="124" height="124" alt=""></button>
          <div v-if="!guild" class="guild-tools">
            <label><span class="guild-field-label">Поиск по архиву</span><input v-model="query" type="search" aria-label="Поиск по гильдиям, участникам и кораблям" placeholder="Гильдия, участник или корабль…"></label>
            <label><span class="guild-field-label">Место гильдии</span><select v-model="category" aria-label="Место гильдии"><option v-for="filter in GUILD_FILTERS" :key="filter">{{ filter }}</option></select></label>
            <div class="guild-results"><p aria-live="polite">{{ query || category !== 'Все гильдии' ? `Найдено: ${visibleGuilds.length} из ${GUILDS.length}` : `Гильдий в архиве: ${GUILDS.length}` }}</p><button v-if="query || category !== 'Все гильдии'" type="button" @click="resetFilters">Сбросить фильтры <span aria-hidden="true">×</span></button><span v-else class="guild-results-hint">У каждого знака — своя история</span></div>
          </div>
        </section>

        <template v-if="!guild">
          <div v-if="visibleGuilds.length" class="guild-tile-grid" aria-label="Гильдии">
            <NuxtLink v-for="item in visibleGuilds" :key="item.slug" :to="`/lore/guilds/${item.slug}`" class="guild-tile" :aria-label="`Открыть ${item.name}`">
              <i class="guild-branch-root" aria-hidden="true"/>
              <svg class="guild-diamond-frame" viewBox="0 0 200 200" fill="none" aria-hidden="true">
                <path class="guild-diamond-surface" d="M100 9 191 100 100 191 9 100Z"/>
                <path d="M100 9 191 100 100 191 9 100Z" stroke="currentColor" stroke-width="1.2"/>
                <path d="M100 21 179 100 100 179 21 100Z" stroke="currentColor" stroke-opacity=".35" stroke-width=".8"/>
                <path d="M100 30 170 100 100 170 30 100Z" stroke="currentColor" stroke-opacity=".18" stroke-width=".7" stroke-dasharray="2 5"/>
                <path class="guild-frame-tips" d="m83 26 17-17 17 17m57 57 17 17-17 17m-57 57-17 17-17-17m-57-57L9 100l17-17" stroke="currentColor" stroke-width="1.7"/>
              </svg>
              <span class="guild-tile-location">{{ item.location }}</span>
              <span class="guild-tile-number" aria-hidden="true">{{ String(GUILDS.indexOf(item) + 1).padStart(2, '0') }}</span>
              <div class="guild-tile-symbol"><GuildMark :kind="item.mark"/></div>
              <div class="guild-tile-caption"><h2>{{ item.name }}</h2><span>Открыть гильдию <i aria-hidden="true">↗</i></span></div>
            </NuxtLink>
          </div>
          <section v-if="!visibleGuilds.length" class="timeline-row guild-empty-row"><div class="history-entry__node" aria-hidden="true"><i/></div><div class="guild-empty"><h2>Нить пока не найдена</h2><p>Попробуйте другое имя или место.</p><button type="button" @click="resetFilters">Показать все гильдии</button></div></section>
        </template>

        <template v-else>
          <section class="history-era guild-about">
            <div class="history-era__heading timeline-row"><div class="history-era__title"><h2>О гильдии</h2><p>{{ guild.place }}</p></div><div class="history-node history-node--era" aria-hidden="true"><span>01</span></div></div>
            <div class="history-entry timeline-row history-entry--right guild-prose-row"><div class="history-entry__card guild-prose"><p>{{ guild.description }}</p><p v-if="guild.namingNote" class="guild-note">{{ guild.namingNote }}</p></div><div class="history-entry__node" aria-hidden="true"><i/></div></div>
          </section>

          <section class="history-era guild-roster-section">
            <div class="history-era__heading timeline-row"><div class="history-era__title"><h2>Участники</h2><p>{{ guild.incompleteRoster ? 'Имена, сохранившиеся в архиве Башни.' : 'Те, кого связывает общее дело.' }}</p></div><div class="history-node history-node--era" aria-hidden="true"><span>02</span></div></div>
            <div v-if="guild.members.length" class="guild-member-grid">
              <article v-for="(member, index) in guild.members" :key="member.id" class="guild-person-card">
                <div class="guild-person-portrait">
                  <img v-if="member.portrait" :src="member.portrait" :alt="member.portraitAlt || `Портрет: ${member.name}`" width="800" height="1000" loading="lazy">
                  <template v-else><svg viewBox="0 0 240 300" fill="none" aria-hidden="true"><path d="M120 35 210 150 120 265 30 150Z" stroke="currentColor" opacity=".14"/><circle cx="120" cy="112" r="30" fill="currentColor" opacity=".1"/><path d="M56 235v-23c0-39 28-62 64-62s64 23 64 62v23" fill="currentColor" opacity=".08"/><path d="M88 112a32 32 0 0 1 64 0m-94 113c0-37 25-65 62-65s62 28 62 65" stroke="currentColor" opacity=".3"/></svg><span>Портрет ещё не добавлен</span></template>
                  <small class="guild-person-number" aria-hidden="true">{{ String(index+1).padStart(2,'0') }}</small>
                </div>
                <div class="guild-person-copy"><span class="guild-kicker">{{ member.role || 'Участник гильдии' }}</span><h3>{{ member.name }}</h3><p>{{ member.description }}</p></div>
              </article>
            </div>
            <div v-if="guild.incompleteRoster" class="timeline-row guild-footnote-row"><p class="guild-footnote">{{ guild.members.length ? 'Перечислены известные представители. Полный состав гильдии пока не установлен.' : 'Имена участников в известных материалах пока не названы.' }}</p></div>
          </section>

          <section class="history-era guild-news">
            <div class="history-era__heading timeline-row"><div class="history-era__title"><h2>Последние известия о гильдии</h2></div><div class="history-node history-node--era" aria-hidden="true"><span>03</span></div></div>
          </section>
        </template>

        <div class="history-end timeline-row"><i aria-hidden="true"/><NuxtLink v-if="guild" to="/lore/guilds" class="guild-end-link">← Все гильдии</NuxtLink><span v-else>Каждая гильдия — своя нить</span></div>
      </div>
    </section>
  </main>
</template>

<style scoped>

.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.lore-history{position:absolute;inset:0 0 0 68px;z-index:58;overflow:hidden;color:rgba(var(--theme-text-rgb),.9);background:#040406!important;isolation:isolate}
.lore-rail{position:absolute;z-index:15;top:18px;bottom:auto;left:max(18px,calc(50% - 650px));width:158px;height:min(580px,calc(100% - 46px));border:1px solid rgba(var(--theme-contrast-rgb),.08);background:rgba(4,4,7,.9);padding:18px 10px 16px;box-shadow:0 18px 45px rgba(0,0,0,.28);backdrop-filter:blur(12px)}.lore-rail>p{margin:0 0 14px;font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.27em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.26)}.lore-rail nav{position:relative;display:flex;height:calc(100% - 20px);flex-direction:column;justify-content:space-between}.lore-rail button{position:relative;z-index:2;display:grid;width:100%;grid-template-columns:12px 18px minmax(0,1fr);align-items:center;border:0;background:none;padding:5px 0;color:rgba(var(--theme-text-rgb),.32);text-align:left;cursor:pointer;transition:color .2s}.lore-rail button:hover,.lore-rail button.is-active{color:rgba(var(--theme-accent-strong-rgb),.82)}.lore-rail button>i{grid-column:1;width:6px;height:6px;border:1px solid rgba(var(--theme-text-rgb),.25);background:#07080d;transform:rotate(45deg);transition:border-color .2s,background .2s}.lore-rail button.is-active>i{border-color:rgba(var(--theme-accent-strong-rgb),.88);background:rgba(var(--theme-accent-strong-rgb),.9);box-shadow:0 0 12px rgba(var(--theme-accent-rgb),.24)}.lore-rail button small{font:600 5px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.5)}.lore-rail button span{overflow:hidden;font:500 12px/1.1 'Cormorant Garamond',serif;text-overflow:ellipsis;white-space:nowrap}.lore-rail__map{color:rgba(var(--theme-accent-strong-rgb),.62)!important}.lore-rail__map i{border-color:rgba(var(--theme-accent-rgb),.52)!important}.lore-rail__map span{grid-column:2/4;overflow:visible;line-height:1.05;white-space:normal}.lore-rail__line{position:absolute;z-index:0;top:10px;bottom:10px;left:2px;width:1px;background:rgba(var(--theme-text-rgb),.1)}.lore-rail__line i{position:absolute;top:0;left:0;width:1px;background:linear-gradient(rgba(var(--theme-accent-strong-rgb),.85),rgba(var(--theme-accent-rgb),.3));box-shadow:0 0 8px rgba(var(--theme-accent-rgb),.18)}
.lore-viewport{position:absolute;z-index:1;top:0;right:0;bottom:0;left:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:rgba(var(--theme-text-rgb),.36) rgba(var(--theme-surface-rgb),.2);background:radial-gradient(ellipse 58% 35% at 50% 0,rgba(16,18,27,.82),#07080e 70%,#040406)}.lore-viewport::-webkit-scrollbar{width:9px}.lore-viewport::-webkit-scrollbar-track{background:rgba(var(--theme-surface-rgb),.35)}.lore-viewport::-webkit-scrollbar-thumb{border:2px solid rgba(var(--theme-surface-rgb),.35);background:rgba(var(--theme-text-rgb),.34)}.lore-history__texture{position:fixed;inset:0 0 0 68px;z-index:-1;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.014) 0 1px,transparent 1px 5px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.01) 0 1px,transparent 1px 4px);opacity:.68}
.history-canvas{position:relative;width:min(1240px,100%);min-height:100%;margin:0 auto;padding:82px 42px 90px;isolation:isolate}.timeline-row{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 116px minmax(0,1fr);align-items:center}.history-thread{position:absolute;z-index:-1;top:0;bottom:48px;left:50%;width:16px;pointer-events:none;transform:translateX(-50%)}.history-thread>i{position:absolute;top:0;bottom:0;left:50%}.history-thread>i:nth-child(1){width:2px;background:linear-gradient(transparent,rgba(var(--theme-accent-rgb),.48) 2%,rgba(var(--theme-accent-strong-rgb),.66) 50%,rgba(var(--theme-accent-rgb),.42) 98%,transparent);box-shadow:0 0 9px rgba(var(--theme-accent-rgb),.2);transform:translateX(-50%)}.history-thread>i:nth-child(2){width:7px;background:rgba(var(--theme-accent-rgb),.18);filter:blur(5px);transform:translateX(-50%)}.history-thread>i:nth-child(3),.history-thread>i:nth-child(4){width:1px;background:repeating-linear-gradient(to bottom,rgba(var(--theme-accent-strong-rgb),.75) 0 6px,transparent 6px 12px);animation:weaveY 8s linear infinite}.history-thread>i:nth-child(3){margin-left:-3px}.history-thread>i:nth-child(4){margin-left:3px;animation-direction:reverse;animation-duration:11s}.history-thread>b{position:absolute;top:4%;left:50%;width:9px;height:9px;border:1px solid rgba(var(--theme-accent-strong-rgb),.9);background:#07080d;box-shadow:0 0 18px rgba(var(--theme-accent-rgb),.38);transform:translateX(-50%) rotate(45deg);animation:sparkY 26s ease-in-out infinite}
.history-intro{min-height:310px}.history-intro__copy{grid-column:1;text-align:right}.history-intro__copy>p{margin:0 0 17px;font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.62)}.history-intro h1{margin:0;font:600 clamp(51px,5.2vw,76px)/.88 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98);text-wrap:balance}.history-intro aside{max-width:400px;margin:32px 0 0 auto;padding-right:24px;border-right:1px solid rgba(var(--theme-accent-rgb),.42)}.history-intro aside span{font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.25em;text-transform:uppercase;color:rgba(var(--theme-accent-strong-rgb),.86)}.history-intro aside p{margin:10px 0 0;font:italic 16px/1.58 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.7);text-shadow:0 1px 12px rgba(0,0,0,.3)}.history-intro__sigil{position:relative;z-index:3;grid-column:2;display:grid;width:124px;height:124px;place-self:center;place-items:center;background:transparent;border:0;padding:0;color:inherit;cursor:pointer;isolation:isolate;transition:transform .34s cubic-bezier(.2,.8,.2,1),filter .34s ease}.history-intro__sigil::after{content:'';position:absolute;z-index:0;inset:2px;background:url('/assets/nodes/guilds-lore.webp') center/contain no-repeat;filter:brightness(0) drop-shadow(0 0 3px rgba(0,0,0,.96));opacity:.96;transform:scale(1.055);pointer-events:none}.history-intro__sigil img{position:relative;z-index:1;width:115px;height:115px;pointer-events:none;object-fit:contain;animation:historySigilGlow 6s ease-in-out infinite}.history-intro__sigil:hover,.history-intro__sigil:focus-visible{outline:none;filter:drop-shadow(0 0 12px rgba(var(--theme-accent-rgb),.24));transform:scale(1.085)}.history-intro__sigil:active{transform:scale(1.025)}
.history-era{position:relative;padding:46px 0;transition:opacity .3s ease}.history-era.is-dimmed{opacity:.22}.history-era.is-search-dimmed{opacity:.2}.history-era__heading{min-height:185px}.history-era__title{grid-column:1;display:block;text-align:right;text-decoration:none;color:inherit}.history-era__title h2{margin:0;font:600 clamp(38px,4vw,55px)/.95 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.96);text-wrap:balance;transition:color .2s}.history-era__title:hover h2,.history-era__title:focus-visible h2{color:rgba(var(--theme-accent-strong-rgb),.95)}.history-era__title p{max-width:400px;margin:15px 0 0 auto;font:italic 15px/1.48 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.42);display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:3}.history-node--era{position:relative;grid-column:2;display:grid;width:66px;height:66px;place-self:center;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.44);background:#090a10;color:inherit;text-decoration:none;box-shadow:0 0 0 6px rgba(5,6,10,.72),0 0 22px rgba(var(--theme-accent-rgb),.12);transform:rotate(45deg);animation:nodePulse 6s ease-in-out infinite}.history-node--era::before{content:'';position:absolute;inset:9px;border:1px dashed rgba(var(--theme-accent-rgb),.16)}.history-node--era span{transform:rotate(-45deg);font:600 12px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-accent-strong-rgb),.86)}
.history-era__chapters{position:relative}.history-entry{min-height:136px;transition:opacity .25s}.history-entry.is-search-dimmed{opacity:.14}.history-entry__card{position:relative;display:block;min-height:98px;align-self:center;border:1px solid rgba(var(--theme-accent-rgb),.23);background:linear-gradient(145deg,rgba(15,16,24,.96),rgba(8,9,15,.95));padding:24px 28px 20px;color:inherit;text-decoration:none;box-shadow:0 16px 34px rgba(0,0,0,.14);transition:border-color .2s,background .2s,transform .2s}.history-entry__card::after{content:'';position:absolute;inset:7px;border:1px dashed rgba(var(--theme-accent-rgb),.1);pointer-events:none}.history-entry__card:hover,.history-entry__card:focus-visible{border-color:rgba(var(--theme-accent-strong-rgb),.56);background:linear-gradient(145deg,rgba(19,20,29,.98),rgba(9,10,17,.98));transform:translateY(-2px);outline:none}.history-entry--left .history-entry__card{grid-column:1;text-align:right}.history-entry--right .history-entry__card{grid-column:3;text-align:left}.history-entry__card small{position:absolute;top:11px;font:600 6px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.5)}.history-entry--left small{left:12px}.history-entry--right small{right:12px}.history-entry__card strong{display:block;font:600 21px/1.05 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.9)}.history-entry__card p{display:-webkit-box;margin:11px 0 0;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2;font:italic 15px/1.48 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.58)}.history-entry__node{position:relative;grid-column:2;display:grid;width:100%;height:100%;place-items:center}.history-entry__node::before{content:'';position:absolute;top:50%;width:50%;height:1px;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.46),transparent)}.history-entry--left .history-entry__node::before{right:50%;transform:scaleX(-1)}.history-entry--right .history-entry__node::before{left:50%}.history-entry__node i{position:relative;z-index:1;width:13px;height:13px;border:1px solid rgba(var(--theme-accent-rgb),.54);background:#08090f;box-shadow:0 0 0 4px rgba(5,6,10,.7);transform:rotate(45deg)}
.history-end{min-height:100px}.history-end i{grid-column:2;width:13px;height:13px;place-self:start center;border:1px solid rgba(var(--theme-accent-rgb),.5);background:#08090f;transform:rotate(45deg)}.history-end span{position:absolute;top:29px;left:50%;transform:translateX(-50%);white-space:nowrap;font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.26em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.25)}
@media(min-width:1001px){.history-intro aside{max-width:400px}.history-era__title{margin-left:110px}.history-era__title p{max-width:400px}.history-entry--left .history-entry__card{margin-left:110px}}
@keyframes weaveY{to{background-position:0 24px}}@keyframes sparkY{0%,100%{top:4%;opacity:.2}10%,42%{opacity:1}50%{top:48%;opacity:.32}65%,92%{opacity:.9}96%{top:94%;opacity:.15}}@keyframes nodePulse{0%,100%{box-shadow:0 0 0 6px rgba(5,6,10,.72),0 0 16px rgba(var(--theme-accent-rgb),.08)}50%{box-shadow:0 0 0 6px rgba(5,6,10,.72),0 0 29px rgba(var(--theme-accent-rgb),.2)}}@keyframes historySigilGlow{0%,100%{opacity:.86;transform:scale(.97)}50%{opacity:1;transform:scale(1.045)}}
@media(max-width:1000px){.lore-rail{display:none}.lore-viewport{left:0}.lore-history__texture{left:68px}.history-canvas{max-width:780px;padding-inline:24px}.timeline-row{grid-template-columns:0 64px minmax(0,1fr)}.history-thread{left:56px}.history-intro__copy,.history-era__title{grid-column:3;text-align:left}.history-intro aside{margin-left:0;margin-right:auto;padding-right:0;padding-left:18px;border-right:0;border-left:1px solid rgba(var(--theme-accent-rgb),.32)}.history-intro__sigil,.history-node--era{grid-column:2}.history-era__title p{margin-left:0;margin-right:auto}.history-entry--left .history-entry__card,.history-entry--right .history-entry__card{grid-column:3;text-align:left}.history-entry__node{grid-column:2}.history-entry__node::before,.history-entry--left .history-entry__node::before,.history-entry--right .history-entry__node::before{left:50%;right:auto;transform:none}.history-entry--left small{right:12px;left:auto}.history-end i{grid-column:2}.history-end span{left:56px;transform:translateX(-50%)}}
@media(max-width:720px){.lore-history{left:0}.lore-viewport{top:0}.history-canvas{padding:58px 15px 68px}.timeline-row{grid-template-columns:0 48px minmax(0,1fr)}.history-thread{left:39px}.history-intro{min-height:260px}.history-intro h1{font-size:46px}.history-intro aside p{font-size:14px}.history-intro__sigil{width:72px;height:72px}.history-intro__sigil::after{inset:1px}.history-intro__sigil img{width:68px;height:68px}.history-era{padding:30px 0}.history-era__heading{min-height:150px}.history-era__title h2{font-size:36px}.history-era__title p{font-size:14px}.history-node--era{width:46px;height:46px}.history-entry{min-height:122px}.history-entry__card{min-height:90px;padding:22px 18px 18px}.history-entry__card strong{font-size:19px}.history-entry__card p{font-size:13px}.history-end span{left:39px}}
@media(prefers-reduced-motion:reduce){.history-thread>i,.history-thread>b,.history-node--era,.history-intro__sigil img{animation:none}.history-intro__sigil,.history-era,.history-entry,.history-entry__card{transition:none}}

/* Guilds use the same thread, node, typography and card styles as Factions. */
.guild-history{font-family:'Hanken Grotesk',sans-serif}
.guild-history .lore-rail{height:min(510px,calc(100% - 46px))}
.guild-history .history-intro h1{overflow-wrap:anywhere}
.guild-back{position:absolute;right:42px;top:30px;color:rgba(var(--theme-accent-strong-rgb),.66);text-decoration:none;font:9px 'Hanken Grotesk',sans-serif;letter-spacing:.07em}
.guild-tools-row{min-height:115px;margin-bottom:8px}
.guild-tools{grid-column:3;display:grid;gap:12px;min-width:0;max-width:300px;padding:18px 0 18px 12px}
.guild-tools label{display:block;min-width:0}
.guild-tools input,.guild-tools select{display:block;width:100%;min-width:0;border:0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.22);border-radius:0;background:transparent;padding:9px 4px;color:rgba(var(--theme-text-rgb),.7);font:10px 'Hanken Grotesk',sans-serif}
.guild-tools input::placeholder{color:rgba(var(--theme-text-rgb),.37)}
.guild-tools select{cursor:pointer;color:rgba(var(--theme-accent-strong-rgb),.7)}
.guild-tools select option{background:var(--theme-bg,#070810);color:rgb(var(--theme-text-rgb))}
.guild-tools>p{font:9px 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.45);margin:0}
.guild-history .history-entry__card small{font-size:7px;letter-spacing:.08em;text-transform:uppercase}
.guild-history .history-entry__card h3{margin:0;font:600 25px/1.15 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.9);overflow-wrap:anywhere}
.guild-history .guild-prose p{display:block;-webkit-line-clamp:unset;overflow:visible;font-size:17px;line-height:1.7;margin:10px 0 0}
.guild-history .guild-prose p:first-child{margin-top:0}
.guild-history .guild-prose .guild-note{font-size:14px;color:rgba(var(--theme-text-rgb),.42);border-top:1px solid rgba(var(--theme-accent-rgb),.15);padding-top:14px;margin-top:14px}
.guild-prose-row{padding:8px 0 16px}
.guild-member-row{min-height:150px}
.guild-place-row .history-entry__card{padding-top:32px}
.guild-footnote-row{padding:12px 0}
.guild-footnote{grid-column:3;margin:0;padding:8px 12px 8px 0;color:rgba(var(--theme-text-rgb),.4);font:italic 14px/1.6 'Cormorant Garamond',serif}
.guild-source{font:8px/1.8 'Hanken Grotesk',sans-serif}
.guild-empty-row{min-height:240px}
.guild-empty{grid-column:3;color:rgba(var(--theme-text-rgb),.6);padding-left:15px}
.guild-empty h2{font:32px 'Cormorant Garamond',serif;margin:0 0 16px;color:rgb(var(--theme-heading-rgb))}
.guild-empty p{font:italic 16px 'Cormorant Garamond',serif}
.guild-empty button{background:none;border:1px solid rgba(var(--theme-accent-rgb),.35);padding:10px 14px;color:var(--theme-accent-strong);font:9px 'Hanken Grotesk',sans-serif;cursor:pointer;margin-top:12px}
.guild-end-link{position:absolute;top:29px;left:50%;transform:translateX(-50%);white-space:nowrap;color:rgba(var(--theme-accent-strong-rgb),.6);font:9px 'Hanken Grotesk',sans-serif;text-decoration:none}
.guild-history button:focus-visible,.guild-history a:focus-visible,.guild-tools input:focus-visible,.guild-tools select:focus-visible{outline:1px solid rgba(var(--theme-accent-strong-rgb),.8);outline-offset:5px}
@media(min-width:1001px){.guild-history .history-intro__copy,.guild-history .history-era__title,.guild-history .history-entry--left .history-entry__card{margin-left:145px}.guild-history .history-intro aside{padding-right:18px}.guild-history .history-intro aside p{font-size:15px}.guild-history .history-intro h1{font-size:clamp(48px,5vw,70px)}}
@media(max-width:1000px){.guild-history .history-intro__copy,.guild-history .history-intro__sigil{grid-row:1}.guild-tools{grid-row:2;padding-left:0}.guild-back{right:24px;top:22px}.guild-history .history-intro{min-height:290px}}
@media(max-width:760px){.guild-history{left:0}.guild-history .lore-history__texture{left:0}.guild-history .history-canvas{padding:58px 15px 68px}.guild-history .timeline-row{grid-template-columns:0 48px minmax(0,1fr)}.guild-history .history-thread{left:39px}.guild-history .history-intro{min-height:250px}.guild-history .history-intro h1{font-size:44px}.guild-history .history-intro aside p{font-size:15px}.guild-history .history-intro__sigil{width:68px;height:68px}.guild-history .history-intro__sigil img{width:64px;height:64px}.guild-history .history-node--era{width:42px;height:42px}.guild-history .history-era__heading{min-height:145px}.guild-history .history-era__title h2{font-size:34px}.guild-history .history-era__title p{font-size:15px}.guild-history .history-entry__card{padding:26px 17px 18px}.guild-history .history-entry__card h3{font-size:23px}.guild-history .history-entry__card p{font-size:15px}.guild-history .guild-prose p{font-size:16px}.guild-history .history-end span,.guild-end-link{left:39px;transform:none;white-space:normal;margin-left:24px;font-size:8px}.guild-tools-row{min-height:125px}.guild-tools{gap:7px}.guild-back{top:20px;right:18px}.guild-member-row{min-height:140px}}

/* Square guild symbols around the retained vertical Lore thread. */
.guild-history .history-intro__copy,.guild-history .history-era__title,.guild-history .history-entry--left .history-entry__card{margin-left:0}
.guild-directory-page .history-canvas{max-width:1120px;padding-top:54px}
.guild-directory-page .history-intro{min-height:240px}
.guild-tile-grid{position:relative;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:34px 100px;max-width:820px;margin:40px auto 50px}
.guild-tile{position:relative;display:flex;aspect-ratio:1;min-width:0;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(var(--theme-accent-rgb),.28);background:linear-gradient(145deg,rgba(15,16,24,.97),rgba(8,9,15,.97));color:inherit;text-decoration:none;padding:25px;isolation:isolate;transition:border-color .25s,background .25s,transform .25s}
.guild-tile::before{content:'';position:absolute;inset:8px;border:1px dashed rgba(var(--theme-accent-rgb),.12);pointer-events:none}
.guild-tile::after{content:'';position:absolute;top:50%;height:1px;width:50px;background:rgba(var(--theme-accent-rgb),.4);pointer-events:none}
.guild-tile:nth-child(odd)::after{left:100%}.guild-tile:nth-child(even)::after{right:100%}
.guild-tile:hover{border-color:rgba(var(--theme-accent-strong-rgb),.75);background:linear-gradient(145deg,rgba(24,23,29,.98),rgba(10,11,17,.98));transform:translateY(-2px)}
.guild-tile-location,.guild-tile-number{position:absolute;top:22px;font:8px 'Hanken Grotesk',sans-serif;letter-spacing:.13em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.65)}
.guild-tile-location{left:24px}.guild-tile-number{right:24px}
.guild-tile-symbol{width:clamp(120px,12vw,160px);height:clamp(120px,12vw,160px);color:rgba(var(--theme-accent-strong-rgb),.86);filter:drop-shadow(0 0 14px rgba(var(--theme-accent-rgb),.1));margin:6px 0 18px;transition:filter .25s,transform .25s}
.guild-tile:hover .guild-tile-symbol{filter:drop-shadow(0 0 18px rgba(var(--theme-accent-rgb),.24));transform:scale(1.035)}
.guild-tile-caption{text-align:center;max-width:100%}.guild-tile h2{margin:0;font:600 32px/1.05 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.94);overflow-wrap:anywhere}
.guild-tile-caption>span{display:block;margin-top:15px;font:8px 'Hanken Grotesk',sans-serif;letter-spacing:.1em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.6)}.guild-tile-caption i{font-style:normal;margin-left:6px}
@media(max-width:1000px){.guild-tile-grid{max-width:620px;gap:28px 48px}.guild-tile::after{width:24px}.guild-directory-page .history-thread{left:50%}.guild-directory-page .history-intro{grid-template-columns:minmax(0,1fr) 90px minmax(0,1fr)}.guild-directory-page .history-intro__copy{grid-column:1;text-align:right}.guild-directory-page .history-intro__copy aside{margin-left:auto;margin-right:0;padding-left:0;padding-right:18px;border-left:0;border-right:1px solid rgba(var(--theme-accent-rgb),.42)}.guild-directory-page .history-intro__sigil{grid-column:2;width:90px;height:90px}.guild-directory-page .history-intro__sigil img{width:85px;height:85px}.guild-directory-page .guild-tools{grid-row:1;grid-column:3;padding-left:12px}.guild-tile{padding:22px}.guild-tile h2{font-size:29px}.guild-tile-symbol{width:120px;height:120px;margin-bottom:14px}}
@media(max-width:760px){.guild-directory-page .history-canvas{padding-top:38px}.guild-directory-page .history-thread{left:39px}.guild-directory-page .history-intro{grid-template-columns:0 48px minmax(0,1fr)}.guild-directory-page .history-intro__copy{grid-column:3;text-align:left}.guild-directory-page .history-intro__copy aside{margin-left:0;margin-right:auto;padding-left:14px;padding-right:0;border-left:1px solid rgba(var(--theme-accent-rgb),.42);border-right:0}.guild-directory-page .history-intro__sigil{width:68px;height:68px}.guild-directory-page .history-intro__sigil img{width:64px;height:64px}.guild-directory-page .guild-tools{grid-row:2;padding-left:0}.guild-tile-grid{grid-template-columns:minmax(0,1fr);padding-left:48px;max-width:450px;gap:25px;margin-top:28px}.guild-tile:nth-child(n)::after{left:auto;right:100%;width:24px}.guild-tile-symbol{width:140px;height:140px}.guild-tile h2{font-size:30px}.guild-tile{padding:24px}}
@media(prefers-reduced-motion:reduce){.guild-tile,.guild-tile-symbol{transition:none}.guild-tile:hover,.guild-tile:hover .guild-tile-symbol{transform:none}}

/* Standard Lore alignment: thread at the left, compact guild tiles at the right. */
.guild-history .history-canvas{max-width:1240px;padding-top:54px}
.guild-history .history-thread{left:66px}
.guild-history .timeline-row{grid-template-columns:0 48px minmax(0,1fr)}
.guild-history .history-intro{display:block;min-height:230px;padding:20px 0 28px 96px}
.guild-history .history-intro__copy{max-width:650px;text-align:left;margin:0}
.guild-history .history-intro aside{max-width:580px;margin:23px 0 0;padding:0 0 0 20px;border-right:0;border-left:1px solid rgba(var(--theme-accent-rgb),.42)}
.guild-history .history-intro__sigil{position:absolute;left:24px;top:34px;width:100px;height:100px;margin:0;transform:translateX(-50%)}
.guild-history .history-intro__sigil img{width:96px;height:96px}
.guild-history .history-intro__sigil:hover,.guild-history .history-intro__sigil:focus-visible{transform:translateX(-50%) scale(1.05)}
.guild-history .guild-tools{display:flex;gap:22px;max-width:650px;padding:0;margin-top:24px;align-items:center;flex-wrap:wrap}
.guild-tools label:first-child{flex:1;min-width:160px}.guild-tools label:nth-child(2){width:170px}.guild-tools>p{width:100%}
.guild-history .history-era__title,.guild-history .history-entry--left .history-entry__card,.guild-history .history-entry--right .history-entry__card{grid-column:3;text-align:left;margin-left:48px}
.guild-history .history-era__title p{margin-left:0;margin-right:auto}
.guild-history .history-entry__card{max-width:760px}
.guild-history .history-entry__node::before{left:50%;right:auto;transform:none;width:72px;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.46),rgba(var(--theme-accent-rgb),.12))}
.guild-history .guild-footnote{grid-column:3;margin-left:48px}
.guild-history .history-end span,.guild-history .guild-end-link{left:24px;transform:none;margin-left:72px}
.guild-tile-grid{grid-template-columns:repeat(3,minmax(0,1fr));max-width:800px;gap:22px;margin:24px 0 50px 96px;padding:0}
.guild-tile{padding:20px}.guild-tile:nth-child(n)::after{display:none}
.guild-tile-symbol{width:100px;height:100px;margin:5px 0 10px}
.guild-tile h2{font-size:25px}.guild-tile-caption>span{font-size:7px;margin-top:12px}
.guild-tile-location,.guild-tile-number{top:16px;font-size:7px}.guild-tile-location{left:18px}.guild-tile-number{right:18px}
@media(max-width:1000px){.guild-tile-grid{grid-template-columns:repeat(2,minmax(0,1fr));max-width:530px;gap:22px}.guild-history .history-intro__copy{text-align:left}.guild-history .history-intro aside{margin-left:0;margin-right:auto;padding-left:20px;padding-right:0;border-right:0;border-left:1px solid rgba(var(--theme-accent-rgb),.42)}}
@media(max-width:760px){.guild-history .history-canvas{padding:38px 15px 68px}.guild-history .history-thread{left:39px}.guild-history .history-intro{padding:15px 0 24px 48px;min-height:0}.guild-history .history-intro__sigil{left:24px;top:24px;width:64px;height:64px}.guild-history .history-intro__sigil img{width:60px;height:60px}.guild-history .history-intro aside{padding-left:14px}.guild-history .guild-tools{display:grid;gap:8px;margin-top:20px}.guild-tools label:nth-child(2){width:100%}.guild-history .history-era__title,.guild-history .history-entry--left .history-entry__card,.guild-history .history-entry--right .history-entry__card{margin-left:0}.guild-history .history-entry__node::before{width:24px}.guild-history .guild-footnote{margin-left:0}.guild-history .history-end span,.guild-history .guild-end-link{margin-left:24px}.guild-tile-grid{grid-template-columns:repeat(2,minmax(0,220px));max-width:460px;gap:20px;margin:16px 0 40px 48px}.guild-tile{padding:18px}.guild-tile-symbol{width:90px;height:90px}.guild-tile h2{font-size:24px}}
@media(max-width:760px){.guild-history .history-intro__copy{padding-left:12px}}
@media(max-width:520px){.guild-tile-grid{grid-template-columns:minmax(0,220px);max-width:220px}}

/* Compact diamond seals with interlaced Tibetan-knot corners. */
.guild-tile-grid{grid-template-columns:repeat(4,minmax(0,1fr));max-width:850px;gap:20px 26px}
.guild-history .guild-tile{--diamond-size:180px;aspect-ratio:auto;height:240px;border:0;background:none;padding:0;justify-content:flex-start;overflow:visible;transform:none;box-shadow:none}
.guild-tile::before,.guild-tile::after,.guild-tile-location,.guild-tile-number,.guild-tile-caption>span{display:none!important}
.guild-diamond-frame{position:absolute;top:0;left:50%;width:var(--diamond-size);height:var(--diamond-size);max-width:100%;transform:translateX(-50%);color:rgba(var(--theme-accent-rgb),.55);overflow:visible;transition:color .25s,filter .25s}
.guild-diamond-surface{fill:var(--theme-surface,#090a10)}
.guild-tile-symbol{position:absolute;left:50%;top:calc(var(--diamond-size) / 2);width:120px;height:120px;margin:0;transform:translate(-50%,-50%);color:rgba(var(--theme-accent-strong-rgb),.87)}
.guild-tile-symbol :deep(.guild-mark > circle),.guild-tile-symbol :deep(.guild-mark > path){display:none}
.guild-tile-caption{width:100%;margin-top:calc(var(--diamond-size) + 13px);padding:0 2px;text-align:center}
.guild-tile h2{font:500 22px/1.08 'Cormorant Garamond',serif}
.guild-history .guild-tile:hover{background:none;transform:none}
.guild-tile:hover .guild-diamond-frame,.guild-tile:focus-visible .guild-diamond-frame{color:rgba(var(--theme-accent-strong-rgb),.96);filter:drop-shadow(0 0 8px rgba(var(--theme-accent-rgb),.23))}
.guild-tile:hover .guild-tile-symbol{transform:translate(-50%,-50%) scale(1.04)}
.guild-history .guild-tile:focus-visible{outline:none}.guild-tile:focus-visible h2{color:var(--theme-accent-strong);text-decoration:underline;text-underline-offset:5px}
@media(max-width:1100px){.guild-tile-grid{grid-template-columns:repeat(3,minmax(0,1fr));max-width:650px;gap:18px 24px}.guild-history .guild-tile{--diamond-size:160px;height:220px}.guild-tile-symbol{width:110px;height:110px}.guild-tile h2{font-size:21px}}
@media(max-width:760px){.guild-tile-grid{grid-template-columns:repeat(2,minmax(0,1fr));max-width:420px;gap:18px}.guild-history .guild-tile{--diamond-size:160px;height:215px}.guild-tile h2{font-size:21px}}
@media(max-width:520px){.guild-tile-grid{grid-template-columns:repeat(2,minmax(0,1fr));max-width:330px;gap:14px}.guild-history .guild-tile{--diamond-size:128px;height:184px}.guild-tile-symbol{width:94px;height:94px}.guild-tile h2{font-size:19px}.guild-tile-caption{margin-top:140px}}
@media(prefers-reduced-motion:reduce){.guild-diamond-frame{transition:none}}

/* Compact diamond knots with interwoven ribbons. */
.guild-tile-grid{grid-template-columns:repeat(4,minmax(0,1fr));max-width:680px;gap:12px 20px}
.guild-history .guild-tile{--diamond-size:140px;height:190px;padding:0}
.guild-tile-symbol{width:96px;height:96px;margin:0}
.guild-tile h2{font-size:19px;line-height:1.1}
.guild-tile-caption>span{display:none}
.guild-tile-location,.guild-tile-number{top:12px;font-size:6.5px}.guild-tile-location{left:14px}.guild-tile-number{right:14px}
@media(max-width:1000px){.guild-tile-grid{grid-template-columns:repeat(3,minmax(0,1fr));max-width:500px;gap:12px 20px}}
@media(max-width:760px){.guild-tile-grid{grid-template-columns:repeat(2,minmax(0,1fr));max-width:320px;gap:12px}.guild-tile-caption{margin-top:153px}}
@media(max-width:520px){.guild-tile-grid{max-width:280px;gap:10px}.guild-history .guild-tile{--diamond-size:112px;height:165px}.guild-tile-symbol{width:80px;height:80px}.guild-tile h2{font-size:18px}.guild-tile-caption{margin-top:125px}}

/* Each row grows from the Lore spine; the connectors meet diamond vertices. */
.guild-tile-grid{--guild-gap:20px;column-gap:var(--guild-gap);row-gap:20px}
.guild-history .guild-tile{--branch-reach:calc(50% - var(--diamond-size)*.455 + var(--guild-gap))}
.guild-history .guild-tile::before{display:block!important;inset:auto;left:calc(-1*var(--branch-reach));top:calc(var(--diamond-size)/2);width:calc(50% - var(--diamond-size)*.455 + var(--branch-reach));height:1px;border:0;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.5),rgba(var(--theme-accent-strong-rgb),.62));box-shadow:0 4px 0 rgba(var(--theme-accent-rgb),.09);z-index:-1;transition:background .3s,box-shadow .3s}
.guild-history .guild-tile:nth-child(4n+1){--branch-reach:72px}
.guild-branch-root{display:none;position:absolute;left:-75px;top:calc(var(--diamond-size)/2 - 3px);width:7px;height:7px;box-sizing:border-box;border:1px solid rgba(var(--theme-accent-strong-rgb),.75);border-radius:50%;background:var(--theme-bg,#090a10);box-shadow:0 0 8px rgba(var(--theme-accent-rgb),.22)}
.guild-tile:nth-child(4n+1) .guild-branch-root{display:block}
.guild-tile-symbol{width:108px;height:108px;color:rgba(var(--theme-accent-strong-rgb),.89)}
.guild-diamond-frame{color:rgba(var(--theme-accent-rgb),.66)}
.guild-frame-tips{color:rgba(var(--theme-accent-strong-rgb),.76)}
.guild-tile h2{transition:color .25s;text-wrap:balance}
.guild-tile:hover h2,.guild-tile:focus-visible h2{color:var(--theme-accent-strong)}
.guild-history .guild-tile:hover::before,.guild-history .guild-tile:focus-visible::before{background:rgba(var(--theme-accent-strong-rgb),.85);box-shadow:0 0 9px rgba(var(--theme-accent-rgb),.3),0 4px 0 rgba(var(--theme-accent-rgb),.15)}
@media(max-width:1000px){.guild-history .guild-tile:nth-child(n){--branch-reach:calc(50% - var(--diamond-size)*.455 + var(--guild-gap))}.guild-tile:nth-child(n) .guild-branch-root{display:none}.guild-history .guild-tile:nth-child(3n+1){--branch-reach:72px}.guild-tile:nth-child(3n+1) .guild-branch-root{display:block}}
@media(max-width:760px){.guild-tile-grid{--guild-gap:12px}.guild-history .guild-tile:nth-child(n){--branch-reach:calc(50% - var(--diamond-size)*.455 + var(--guild-gap))}.guild-tile:nth-child(n) .guild-branch-root{display:none}.guild-history .guild-tile:nth-child(2n+1){--branch-reach:24px}.guild-tile:nth-child(2n+1) .guild-branch-root{display:block;left:-27px}}
@media(max-width:520px){.guild-tile-grid{--guild-gap:10px;row-gap:14px}.guild-tile-symbol{width:88px;height:88px}}
@media(prefers-reduced-motion:reduce){.guild-history .guild-tile::before,.guild-tile h2{transition:none}}

/* A gentle zoom keeps the connected frame fixed while the guild seal responds. */
.guild-tile-symbol{transform-origin:center;transition:transform .38s cubic-bezier(.2,.8,.25,1),filter .38s ease;will-change:transform}
.guild-tile:hover .guild-tile-symbol,.guild-tile:focus-visible .guild-tile-symbol{transform:translate(-50%,-50%) scale(1.18);filter:drop-shadow(0 0 12px rgba(var(--theme-accent-rgb),.32))}
.guild-tile:active .guild-tile-symbol{transform:translate(-50%,-50%) scale(1.08);transition-duration:.12s}
@media(prefers-reduced-motion:reduce){.guild-tile-symbol{transition:none;will-change:auto}.guild-tile:hover .guild-tile-symbol,.guild-tile:focus-visible .guild-tile-symbol,.guild-tile:active .guild-tile-symbol{transform:translate(-50%,-50%)}}

/* Editorial polish: readable controls, quiet metadata and crisp ornament. */
.guild-history .history-intro aside{margin-top:16px}
.guild-history .history-intro aside p{font-size:17px;line-height:1.65;color:rgba(var(--theme-text-rgb),.72)}
.guild-history .guild-tools{margin-top:22px;gap:15px 24px;align-items:flex-end;max-width:680px}
.guild-field-label{display:block;margin:0 0 7px 4px;font:9px/1.3 'Hanken Grotesk',sans-serif;letter-spacing:.13em;text-transform:uppercase;color:rgba(var(--theme-accent-strong-rgb),.72)}
.guild-tools input,.guild-tools select{min-height:40px;padding:10px 4px;font-size:12px;line-height:1.5;color:rgba(var(--theme-text-rgb),.88);border-bottom-color:rgba(var(--theme-accent-rgb),.4);transition:border-color .2s,background .2s}
.guild-tools input::placeholder{color:rgba(var(--theme-text-rgb),.55)}
.guild-tools input:hover,.guild-tools select:hover,.guild-tools input:focus,.guild-tools select:focus{border-bottom-color:rgba(var(--theme-accent-strong-rgb),.85);background:rgba(var(--theme-accent-rgb),.035)}
.guild-results{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;width:100%;font:10px/1.6 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.6)}
.guild-results p{margin:0;font-variant-numeric:tabular-nums}
.guild-results-hint{font:italic 14px/1.4 'Cormorant Garamond',serif;color:rgba(var(--theme-accent-strong-rgb),.6)}
.guild-results button{border:0;background:transparent;padding:5px 0;color:rgba(var(--theme-accent-strong-rgb),.85);font:10px 'Hanken Grotesk',sans-serif;cursor:pointer;min-height:32px}
.guild-results button span{font-size:17px;vertical-align:-1px;margin-left:7px}.guild-results button:hover{text-decoration:underline;text-underline-offset:4px}
.guild-tile-grid{margin-top:16px}
.guild-tile h2{font-weight:600;letter-spacing:.005em}
.guild-tile:hover .guild-tile-symbol,.guild-tile:focus-visible .guild-tile-symbol{filter:drop-shadow(0 0 6px rgba(var(--theme-accent-rgb),.22))}
.guild-history:not(.guild-directory-page) .history-intro__sigil::after{display:none}
.history-intro__sigil :deep(.guild-mark){position:relative;z-index:1;color:rgba(var(--theme-accent-strong-rgb),.92)}
@media(min-width:761px) and (max-width:1000px){.guild-history .guild-tile:nth-child(3n+1){--branch-reach:54px}.guild-branch-root{left:-57px}.guild-history .history-intro__sigil{left:42px}}
@media(max-width:760px){.guild-history .guild-tools{gap:17px;margin-top:20px}.guild-history .history-intro aside p{font-size:16px}.guild-tools input,.guild-tools select{min-height:44px;font-size:13px}.guild-results{gap:4px 12px}.guild-results button{min-height:44px}.guild-results-hint{font-size:13px}.guild-directory-page .history-intro{padding-bottom:16px}}

/* Guild dossiers: place, shared purpose and a portrait-led introduction. */
.guild-atlas{margin:12px 0 20px 96px;max-width:760px;border-top:1px solid rgba(var(--theme-accent-rgb),.32);border-bottom:1px solid rgba(var(--theme-accent-rgb),.18);padding:24px 0}
.guild-kicker,.guild-location-chain dt{font:9px/1.5 'Hanken Grotesk',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(var(--theme-accent-strong-rgb),.72)}
.guild-bond p{font:500 25px/1.35 'Cormorant Garamond',serif;margin:9px 0 24px;color:rgba(var(--theme-heading-rgb),.92);max-width:680px}
.guild-location-chain{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin:0}
.guild-location-chain>div{position:relative;min-width:0;padding-top:16px;border-top:1px solid rgba(var(--theme-accent-rgb),.27)}
.guild-location-chain>div::before{content:'';position:absolute;top:-3px;left:0;width:5px;height:5px;border-radius:50%;background:var(--theme-accent-strong);opacity:.65}
.guild-location-chain dt{margin-bottom:8px}.guild-location-chain dd{margin:0;font:18px/1.4 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.85)}
.guild-geography-note{font:11px/1.6 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.58);margin:18px 0 0}
.guild-history:not(.guild-directory-page) .history-era{padding:20px 0}
.guild-history:not(.guild-directory-page) .history-era__heading{min-height:128px}
.guild-history:not(.guild-directory-page) .history-era__title h2{font-size:40px}
.guild-history:not(.guild-directory-page) .history-era__title p{max-width:580px;font-size:16px;line-height:1.5}
.guild-history:not(.guild-directory-page) .guild-prose p{font-style:normal;color:rgba(var(--theme-text-rgb),.76)}
.guild-member-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin:10px 0 12px 96px;max-width:760px}
.guild-person-card{min-width:0;overflow:hidden;border:1px solid rgba(var(--theme-accent-rgb),.25);background:linear-gradient(150deg,rgba(var(--theme-accent-rgb),.035),rgba(8,9,15,.8))}
.guild-person-portrait{position:relative;aspect-ratio:4/5;overflow:hidden;background:radial-gradient(ellipse at 50% 35%,rgba(var(--theme-accent-rgb),.075),transparent 70%);color:var(--theme-accent-strong);border-bottom:1px solid rgba(var(--theme-accent-rgb),.2)}
.guild-person-portrait>img,.guild-person-portrait>svg{display:block;width:100%;height:100%;object-fit:cover}
.guild-person-portrait>span{position:absolute;bottom:18px;left:12px;right:12px;text-align:center;font:9px/1.5 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.45)}
.guild-person-number{position:absolute;top:14px;left:16px;font:10px 'Hanken Grotesk',sans-serif;letter-spacing:.1em;color:rgba(var(--theme-accent-strong-rgb),.5)}
.guild-person-copy{padding:20px 18px 22px}.guild-person-copy h3{font:600 27px/1.12 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.95);margin:9px 0 10px;overflow-wrap:anywhere;text-wrap:balance}.guild-person-copy p{font:13px/1.65 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.7);margin:0}
@media(max-width:1000px){.guild-member-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.guild-atlas,.guild-member-grid{max-width:650px}}
@media(max-width:760px){.guild-atlas,.guild-member-grid{margin-left:48px}.guild-atlas{padding:20px 0}.guild-bond p{font-size:23px}.guild-location-chain{grid-template-columns:1fr;gap:18px}.guild-location-chain>div{padding-top:12px}.guild-location-chain dd{font-size:18px}.guild-member-grid{gap:16px}.guild-history:not(.guild-directory-page) .history-era__title h2{font-size:34px}.guild-person-copy{padding:17px 15px 20px}.guild-person-copy h3{font-size:25px}}
@media(max-width:520px){.guild-member-grid{grid-template-columns:1fr;max-width:320px}.guild-person-portrait{aspect-ratio:5/4}.guild-person-portrait>svg{width:78%;margin:0 auto}.guild-person-copy p{font-size:14px}}

</style>
