<script setup>
import { CONDITIONS_DISEASE_SCREEN_5E, CONDITIONS_DISEASE_GROUPS_WITH_RULES_5E, CONDITIONS_DISEASE_RULE_BY_SLUG_5E, CONDITIONS_DISEASE_ICON_SVG_5E, conditionsDiseaseRulePath } from '~/data/conditionsDiseaseRules5e.js'

const route = useRoute()
const rule = computed(() => CONDITIONS_DISEASE_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило состояния или болезни не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — состояния и болезни D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="CONDITIONS_DISEASE_SCREEN_5E"
    :groups="CONDITIONS_DISEASE_GROUPS_WITH_RULES_5E"
    :icons="CONDITIONS_DISEASE_ICON_SVG_5E"
    :rule="rule"
    :rule-path="conditionsDiseaseRulePath"
    section-path="/dnd5e/screens/conditions_and_disease"
  />
</template>
