<script setup>
import { emphasizeFeatRule } from '~/utils/featEmphasis.js'
defineProps({ feat: { type: Object, required: true }, compact: Boolean })
// Выделяем только явно сформулированное заключительное правило восстановления.
// Текст сохраняется дословно; остальные ограничения остаются рядом с эффектом.
function parts(text) {
  const match = text.match(/^(.*?)(Воспользовавшись этим свойством,[\s\S]*|Вы восстанавливаете все потраченные[\s\S]*)$/u)
  return match ? { effect: match[1].trim(), recovery: match[2] } : { effect: text }
}
</script>

<template>
  <div class="origin-effects" :class="{ 'origin-effects-compact': compact }">
    <p v-if="feat.intro" class="origin-intro"><RuleRichText :text="feat.intro" edition="2024" /></p>
    <article v-for="entry in feat.benefits" :key="entry.title" class="origin-effect">
      <h4><NuxtLink v-if="entry.path" :to="entry.path">{{ entry.title }}</NuxtLink><template v-else>{{ entry.title }}</template></h4>
      <p><RuleRichText :text="emphasizeFeatRule(parts(entry.text).effect)" edition="2024" /></p>
      <div v-if="parts(entry.text).recovery" class="origin-recovery">
        <h5>Использование и восстановление</h5>
        <p><RuleRichText :text="emphasizeFeatRule(parts(entry.text).recovery)" edition="2024" /></p>
      </div>
    </article>
    <RelatedContentLinks :links="feat.relatedItems" />
  </div>
</template>

<style scoped>
.origin-effects{display:grid;gap:14px}
.origin-intro{margin:0;color:rgba(var(--theme-text-rgb),.84);font-size:15px;line-height:1.8}
.origin-effect{padding:16px 18px;border:1px solid rgba(var(--theme-accent-rgb),.16);border-left:3px solid rgba(var(--theme-accent-rgb),.5);border-radius:0 10px 10px 0;background:rgba(var(--theme-accent-rgb),.035)}
.origin-effect h4{margin:0 0 8px;color:rgba(var(--theme-heading-rgb),.96);font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600}
.origin-effect p{margin:0;color:rgba(var(--theme-text-rgb),.84);font-size:15px;line-height:1.8;overflow-wrap:anywhere}
.origin-recovery{border-top:1px solid rgba(var(--theme-accent-rgb),.18);margin-top:14px;padding-top:12px}
.origin-recovery h5{margin:0 0 5px;font-size:12px;color:rgba(var(--theme-accent-strong-rgb),.95)}
.origin-recovery p{font-size:13px;line-height:1.65}
.origin-effects-compact{gap:0}
.origin-effects-compact .origin-effect{padding:16px 0;border:0;border-radius:0;background:none}
.origin-effects-compact .origin-effect + .origin-effect{border-top:1px solid rgba(var(--theme-text-rgb),.1)}
.origin-effects-compact .origin-effect h4{font-family:inherit;font-size:14px;font-weight:650;margin-bottom:6px;color:rgba(var(--theme-accent-strong-rgb),.92)}
.origin-effects-compact .origin-effect p{font-size:14px;line-height:1.75}
.origin-effects-compact .origin-recovery{border:0;border-left:2px solid rgba(var(--theme-accent-rgb),.3);padding:0 0 0 12px;margin-top:12px}
</style>
