<script setup>
import { COMBAT_SCREEN_5E, COMBAT_RULES_5E, COMBAT_RULE_BY_SLUG_5E, COMBAT_ICON_SVG_5E, combatRulePath } from '~/data/combatRules5e.js'

const route = useRoute()
const rule = computed(() => COMBAT_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило сражения не найдено' })
}

const groups = [{ id: 'all', rules: COMBAT_RULES_5E }]

useSeoMeta({
  title: () => `${rule.value.title} — сражение D&D 5e 2014 — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="COMBAT_SCREEN_5E"
    :groups="groups"
    :icons="COMBAT_ICON_SVG_5E"
    :rule="rule"
    :rule-path="combatRulePath"
    section-path="/dnd5e/screens/combat"
  />
</template>
