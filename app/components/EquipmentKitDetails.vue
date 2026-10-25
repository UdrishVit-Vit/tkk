<script setup>
defineProps({ item: { type: Object, required: true } })
const sectionId = (id, section) => `kit-${id}-${section}`
</script>

<template>
  <div class="equipment-kit">
    <nav class="kit-nav" aria-label="Разделы набора">
      <a :href="'#' + sectionId(item.id, 'contents')">Состав</a>
      <a v-if="item.kit.proficiency" :href="'#' + sectionId(item.id, 'use')">Владение</a>
      <a v-if="item.kit.supplies?.length" :href="'#' + sectionId(item.id, 'supplies')">Запас и хранение</a>
    </nav>

    <section :aria-labelledby="sectionId(item.id, 'contents')">
      <h3 :id="sectionId(item.id, 'contents')" tabindex="-1">Что входит в набор</h3>
      <p v-if="item.kit.intro" class="kit-intro">{{ item.kit.intro }}</p>
      <ul class="kit-contents">
        <li v-for="(part, index) in item.kit.contents" :key="part.title">
          <span class="kit-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <h4><NuxtLink v-if="part.path" :to="part.path">{{ part.title }}</NuxtLink><template v-else>{{ part.title }}</template><span v-if="part.quantity" class="kit-quantity"> × {{ part.quantity }}</span></h4>
            <p>{{ part.description }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section v-if="item.kit.proficiency" class="kit-section" :aria-labelledby="sectionId(item.id, 'use')">
      <h3 :id="sectionId(item.id, 'use')" tabindex="-1">Владение набором</h3>
      <p>{{ item.kit.proficiency.rule }}</p>
      <ul class="kit-tasks"><li v-for="task in item.kit.proficiency.tasks" :key="task">{{ task }}</li></ul>
      <p v-if="item.kit.proficiency.limit" class="kit-note">{{ item.kit.proficiency.limit }}</p>
    </section>

    <section v-if="item.kit.supplies?.length" class="kit-section" :aria-labelledby="sectionId(item.id, 'supplies')">
      <h3 :id="sectionId(item.id, 'supplies')" tabindex="-1">Запас и хранение</h3>
      <article v-for="supply in item.kit.supplies" :key="supply.title" class="kit-supply">
        <h4>{{ supply.title }}</h4>
        <p>{{ supply.description }}</p>
        <p v-if="supply.storage" class="kit-storage"><strong>Хранение.</strong> {{ supply.storage }}</p>
        <p v-if="supply.note" class="kit-note">{{ supply.note }}</p>
        <NuxtLink v-if="supply.path" :to="supply.path" class="kit-link">{{ supply.linkLabel || 'Открыть предмет' }} <span aria-hidden="true">→</span></NuxtLink>
      </article>
    </section>

    <footer v-if="item.kit.related?.length" class="kit-related">
      <NuxtLink v-for="link in item.kit.related" :key="link.path" :to="link.path">{{ link.title }} <span aria-hidden="true">→</span></NuxtLink>
    </footer>
  </div>
</template>

<style scoped>
.equipment-kit{margin-top:20px;color:rgba(var(--theme-text-rgb),.88);font-size:14px;line-height:1.7}
.kit-nav{display:flex;flex-wrap:wrap;gap:6px 22px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.24);margin-bottom:24px;padding-bottom:12px}
.kit-nav a,.kit-link,.kit-related a{color:var(--theme-accent-strong);text-decoration:none;font-size:13px}
.equipment-kit a:hover{text-decoration:underline;text-underline-offset:4px}
.equipment-kit a:focus-visible{outline:2px solid var(--theme-accent-strong);outline-offset:5px;border-radius:2px}
.equipment-kit h3{margin:0 0 10px;color:var(--theme-heading);font-size:19px;line-height:1.35;scroll-margin-top:24px}
.equipment-kit h4{margin:0 0 4px;color:var(--theme-heading);font-size:14px;line-height:1.5;font-weight:650}
.equipment-kit p{margin:0}
.kit-intro,.kit-note{color:rgba(var(--theme-text-rgb),.65)}
.kit-contents{list-style:none;padding:0;margin:16px 0 0}
.kit-contents li{display:grid;grid-template-columns:28px minmax(0,1fr);gap:12px;padding:15px 0;border-bottom:1px solid rgba(var(--theme-text-rgb),.1)}
.kit-number{color:rgba(var(--theme-accent-rgb),.7);font-size:11px;font-variant-numeric:tabular-nums;padding-top:3px}
.kit-quantity{font-weight:400;color:rgba(var(--theme-text-rgb),.65)}
.kit-section{margin-top:28px}
.kit-tasks{margin:12px 0;padding-left:20px;display:grid;gap:4px}
.kit-note{font-size:13px}
.kit-supply{padding:17px 20px;border-left:3px solid rgba(var(--theme-accent-rgb),.65);background:rgba(var(--theme-accent-rgb),.045);margin-top:12px}
.kit-supply p + p{margin-top:10px}
.kit-storage strong{color:var(--theme-accent-strong)}
.kit-link{display:inline-block;margin-top:12px}
.kit-related{display:flex;flex-wrap:wrap;gap:12px 24px;border-top:1px solid rgba(var(--theme-text-rgb),.12);padding-top:18px;margin-top:24px}
@media(max-width:520px){.kit-nav{gap:8px 16px}.kit-supply{padding:14px}.kit-contents li{gap:8px;grid-template-columns:24px minmax(0,1fr)}}
@media print{.kit-nav,.kit-related,.kit-link{display:none}.kit-supply{break-inside:avoid}}
</style>
