<script setup>
import { knowledge, NAME_RACES, NAME_GUIDES, tablesForRace } from '~/data/nameLibrary.js'
const route = useRoute()
const router = useRouter()
const race = computed({
  get: () => NAME_RACES.some(item => item.slug === route.query.race) ? route.query.race : 'udrishi',
  set: value => router.replace({ query: { ...route.query, race: value } }),
})
const tables = computed(() => tablesForRace(race.value))
const query = ref('')
const realQuery = ref('')
const gender = ref('any')
const profiles = computed(() => {
  const q = query.value.trim().toLocaleLowerCase('ru')
  return knowledge.profiles.filter(profile => !q || [profile.title, ...(profile.canon || []), profile.analysis].some(value => value?.toLocaleLowerCase('ru').includes(q)))
})
const realNames = computed(() => {
  const q = realQuery.value.trim().toLocaleLowerCase('ru')
  return knowledge.realNames.filter(name => (gender.value === 'any' || name.gender === gender.value) && (!q || [name.name_ru, name.original, name.pool].some(value => value?.toLocaleLowerCase('ru').includes(q))))
})
useHead({ title: 'Имена ЭНОА · Именник и конструкторы', meta: [{ name: 'robots', content: 'noindex, nofollow' }, { name: 'description', content: 'Имена народов ЭНОА: авторские образцы, мужские и женские списки, культурные конструкторы и реальные имена с источниками.' }] })
</script>

<template>
  <main class="nl-page">
    <nav class="nl-nav"><NuxtLink to="/lore">← Мир ЭНОА</NuxtLink><a href="/name-library/names.json" download>Скачать данные</a></nav>
    <header class="nl-header"><p class="nl-eyebrow">Именник · ЭНОА</p><h1>Имя, которому веришь</h1><p>Авторские образцы, имена из источников и новые предложения для народов ЭНОА. Выберите происхождение, найдите подходящее звучание и сохраните имя своего персонажа.</p><div class="nl-stats"><span>22 таблицы</span><span>29 культурных профилей</span><span>101 реальное имя</span></div></header>
    <nav class="nl-jumps"><a href="#constructors">Конструкторы</a><a href="#profiles">Культурные профили</a><a href="#real">Реальные имена</a><a href="#guides">Разборы и источники</a></nav>
    <section id="constructors" class="nl-card">
      <div class="nl-section-heading"><h2>Выбрать имя</h2><label>Народ или происхождение<select v-model="race"><option v-for="item in NAME_RACES" :key="item.slug" :value="item.slug">{{ item.title }}</option></select></label></div>
      <p v-if="race === 'oyrdugi'">Ойрдуг может быть представителем любой расы. Здесь используется общий именник мира, включая формы Вету Цикла.</p>
      <RaceNameGenerator :tables="tables" show-research />
      <p class="nl-note">Меридиры, огры, драконы и вирмы, колоссы и вету-изгнанники исключены из генерации. Исторический справочник сохраняет сведения об уже названных персонажах.</p>
    </section>
    <section id="guides"><h2>Разборы и источники</h2><div class="nl-guide-grid"><NuxtLink v-for="guide in NAME_GUIDES" :key="guide.slug" :to="`/lore/names/${guide.slug}`" class="nl-guide"><span>{{ guide.title }}</span><span aria-hidden="true">↗</span></NuxtLink></div></section>
    <section id="profiles"><h2>Культурные профили</h2><p>Принадлежность к земной традиции часто остаётся гипотезой. Авторский образец, созвучие и имя с подтверждённым реальным носителем имеют разный статус.</p><label class="nl-search">Найти народ или имя<input v-model="query" type="search" placeholder="Урма, Тхуч, Шида…"></label>
      <details v-for="profile in profiles" :key="profile.id" class="nl-profile"><summary>{{ profile.title }}</summary><div><p v-if="profile.canon?.length"><strong>Имена в источниках:</strong> {{ profile.canon.join(' · ') }}</p><p>{{ profile.analysis }}</p><p><strong>Конструктор:</strong> {{ profile.formula.replace('name = null', 'Личного обрядового имени нет').replace('null', 'отсутствующим') }}</p><p v-if="profile.exception" class="nl-note">{{ profile.exception }}</p><p v-if="profile.shared_race_author_examples?.length">Общие маракийские образцы: Шида — женское; Саф'Харул и Тцафах — мужские. Подраса не уточнена.</p></div></details><p v-if="!profiles.length">Совпадений нет.</p>
    </section>
    <section id="real"><h2>Банк реальных имён</h2><p>Подтверждены исходные человеческие имена. Их применение к народам ЭНОА — отдельное творческое решение. Некоторые формы уже заняты в изученном корпусе.</p><div class="nl-real-filters"><label class="nl-search">Поиск<input v-model="realQuery" type="search" placeholder="Имя, оригинальное написание или традиция"></label><label>Пол<select v-model="gender"><option value="any">Все</option><option value="M">Мужские</option><option value="F">Женские</option></select></label></div>
      <div class="nl-table-scroll"><table><thead><tr><th>Имя</th><th>Оригинал</th><th>Пол</th><th>Источник</th></tr></thead><tbody><tr v-for="name in realNames" :key="name.id"><td>{{ name.name_ru }}<small v-if="name.draft_status === 'blocked_existing'">Уже встречается в источниках</small></td><td>{{ name.original }}</td><td>{{ name.gender === 'M' ? 'Мужское' : 'Женское' }}</td><td><a :href="knowledge.sources[name.source_id]?.url" target="_blank" rel="noopener noreferrer">{{ knowledge.sources[name.source_id]?.title }}</a></td></tr></tbody></table></div><p v-if="!realNames.length">Совпадений нет.</p>
    </section>
    <footer class="nl-note">Отсутствие совпадения проверяется в известном корпусе и реестре персонажей. Полной мировой уникальности у реального человеческого имени не бывает. <a href="/name-library/names.json" download>Скачать именники и профили в JSON</a>.</footer>
  </main>
</template>

<style scoped>
.nl-page{max-width:1100px;margin:auto;padding:32px 24px 80px;color:rgba(var(--theme-text-rgb),.9);font:19px/1.65 'Cormorant Garamond',serif}.nl-page a{color:var(--theme-accent-strong)}.nl-nav,.nl-jumps,.nl-stats{display:flex;gap:22px;flex-wrap:wrap;font:12px/1.5 'Hanken Grotesk',sans-serif}.nl-nav{justify-content:space-between}.nl-header{padding:60px 0 32px;max-width:800px}.nl-header h1{font-size:clamp(38px,6vw,68px);line-height:1.1;margin:12px 0}.nl-eyebrow{text-transform:uppercase;letter-spacing:.18em;color:var(--theme-accent);font:11px 'Hanken Grotesk',sans-serif}.nl-stats{margin-top:22px;color:var(--theme-accent)}.nl-jumps{padding:14px 0 28px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.25)}.nl-page section{scroll-margin-top:24px;margin-top:36px}.nl-card{padding:28px;border:1px solid rgba(var(--theme-accent-rgb),.3);border-radius:18px;background:rgba(var(--theme-surface-rgb),.7)}.nl-page h2{font-size:30px;line-height:1.2;margin:0 0 20px}.nl-section-heading{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}.nl-page label{display:block;font:12px 'Hanken Grotesk',sans-serif}.nl-page select,.nl-page input{background:var(--theme-surface);color:rgba(var(--theme-text-rgb),.95);padding:11px 14px;border:1px solid rgba(var(--theme-accent-rgb),.35);border-radius:8px;display:block;margin-top:8px;font-size:16px;max-width:100%}.nl-search input{width:100%}.nl-guide-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.nl-guide{display:flex;justify-content:space-between;gap:12px;border:1px solid rgba(var(--theme-accent-rgb),.25);border-radius:10px;padding:20px;text-decoration:none}.nl-guide:hover{background:rgba(var(--theme-accent-rgb),.08)}.nl-profile{padding:16px 0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.18)}.nl-profile summary{cursor:pointer;font-size:23px;color:var(--theme-accent-strong)}.nl-profile>div{padding:4px 12px}.nl-note{font-size:15px;opacity:.8;line-height:1.6}.nl-real-filters{display:flex;align-items:end;gap:14px}.nl-real-filters .nl-search{flex:1}.nl-table-scroll{overflow:auto;max-height:560px;margin-top:20px}.nl-page table{width:100%;border-collapse:collapse;min-width:560px}.nl-page th,.nl-page td{text-align:left;border-bottom:1px solid rgba(var(--theme-accent-rgb),.15);padding:12px;vertical-align:top}.nl-page th{position:sticky;top:0;background:var(--theme-surface);font:12px 'Hanken Grotesk',sans-serif}.nl-page td small{display:block;font-size:12px;opacity:.7}.nl-page td:last-child{font-size:14px}.nl-page footer{margin-top:42px}.nl-page :focus-visible{outline:2px solid var(--theme-accent);outline-offset:4px}@media(max-width:640px){.nl-page{padding:24px 16px 60px}.nl-card{padding:18px}.nl-header{padding-top:36px}.nl-guide-grid{grid-template-columns:1fr 1fr}.nl-guide{padding:14px}.nl-real-filters{align-items:stretch;flex-direction:column}}
</style>
