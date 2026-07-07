<script setup>
import { CHASES_SCREEN_5E, CHASE_GROUPS_WITH_RULES_5E, CHASE_RULE_BY_SLUG_5E, CHASE_ICON_SVG_5E, chaseRulePath } from '~/data/chaseRules5e.js'

const route = useRoute()
const rule = computed(() => CHASE_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Chase rule not found' })
}

useSeoMeta({
  title: () => `${rule.value.title} - ${CHASES_SCREEN_5E.title} D&D 5e - TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="CHASES_SCREEN_5E"
    :groups="CHASE_GROUPS_WITH_RULES_5E"
    :icons="CHASE_ICON_SVG_5E"
    :rule="rule"
    :rule-path="chaseRulePath"
    section-path="/dnd5e/screens/chases"
  />
</template>
