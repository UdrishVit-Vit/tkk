<script setup>
import { MOVEMENT_SCREEN_5E, MOVEMENT_RULES_5E, MOVEMENT_RULE_BY_SLUG_5E, MOVEMENT_ICON_SVG_5E, movementRulePath } from '~/data/movementRules5e.js'

const route = useRoute()
const rule = computed(() => MOVEMENT_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило движения не найдено' })
}

const groups = [{ id: 'all', rules: MOVEMENT_RULES_5E }]

useSeoMeta({
  title: () => `${rule.value.title} — движение D&D 5e 2014 — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="MOVEMENT_SCREEN_5E"
    :groups="groups"
    :icons="MOVEMENT_ICON_SVG_5E"
    :rule="rule"
    :rule-path="movementRulePath"
    section-path="/dnd5e/screens/move"
  />
</template>
