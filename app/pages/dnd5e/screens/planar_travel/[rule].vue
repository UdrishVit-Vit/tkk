<script setup>
import { PLANAR_TRAVEL_SCREEN_5E, PLANAR_TRAVEL_GROUPS_WITH_RULES_5E, PLANAR_TRAVEL_RULE_BY_SLUG_5E, PLANAR_TRAVEL_ICON_SVG_5E, planarTravelRulePath } from '~/data/planarTravelRules5e.js'

const route = useRoute()
const rule = computed(() => PLANAR_TRAVEL_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Planar travel rule not found' })
}

useSeoMeta({
  title: () => `${rule.value.title} - ${PLANAR_TRAVEL_SCREEN_5E.title} D&D 5e - TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="PLANAR_TRAVEL_SCREEN_5E"
    :groups="PLANAR_TRAVEL_GROUPS_WITH_RULES_5E"
    :icons="PLANAR_TRAVEL_ICON_SVG_5E"
    :rule="rule"
    :rule-path="planarTravelRulePath"
    section-path="/dnd5e/screens/planar_travel"
  />
</template>
