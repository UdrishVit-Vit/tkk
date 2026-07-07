<script setup>
import { EQUIPMENT_SCREEN_5E, EQUIPMENT_GROUPS_WITH_RULES_5E, EQUIPMENT_RULE_BY_SLUG_5E, EQUIPMENT_ICON_SVG_5E, equipmentRulePath } from '~/data/equipmentRules5e.js'

const route = useRoute()
const rule = computed(() => EQUIPMENT_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило снаряжения не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — снаряжение D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="EQUIPMENT_SCREEN_5E"
    :groups="EQUIPMENT_GROUPS_WITH_RULES_5E"
    :icons="EQUIPMENT_ICON_SVG_5E"
    :rule="rule"
    :rule-path="equipmentRulePath"
    section-path="/dnd5e/screens/equipment"
  />
</template>
