<script setup>
import { TRAPS_SCREEN_5E, TRAP_GROUPS_WITH_RULES_5E, TRAP_RULE_BY_SLUG_5E, TRAP_ICON_SVG_5E, trapRulePath } from '~/data/trapRules5e.js'

const route = useRoute()
const rule = computed(() => TRAP_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило ловушки не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — ловушки D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="TRAPS_SCREEN_5E"
    :groups="TRAP_GROUPS_WITH_RULES_5E"
    :icons="TRAP_ICON_SVG_5E"
    :rule="rule"
    :rule-path="trapRulePath"
    section-path="/dnd5e/screens/traps"
  />
</template>
