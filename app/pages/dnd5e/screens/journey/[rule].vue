<script setup>
import { JOURNEY_SCREEN_5E, JOURNEY_GROUPS_WITH_RULES_5E, JOURNEY_RULE_BY_SLUG_5E, JOURNEY_ICON_SVG_5E, journeyRulePath } from '~/data/journeyRules5e.js'

const route = useRoute()
const rule = computed(() => JOURNEY_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Journey rule not found' })
}

useSeoMeta({
  title: () => `${rule.value.title} - ${JOURNEY_SCREEN_5E.title} D&D 5e - TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="JOURNEY_SCREEN_5E"
    :groups="JOURNEY_GROUPS_WITH_RULES_5E"
    :icons="JOURNEY_ICON_SVG_5E"
    :rule="rule"
    :rule-path="journeyRulePath"
    section-path="/dnd5e/screens/journey"
  />
</template>
