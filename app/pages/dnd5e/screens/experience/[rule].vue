<script setup>
import { EXPERIENCE_SCREEN_5E, EXPERIENCE_GROUPS_WITH_RULES_5E, EXPERIENCE_RULE_BY_SLUG_5E, EXPERIENCE_ICON_SVG_5E, experienceRulePath } from '~/data/experienceRules5e.js'

const route = useRoute()
const rule = computed(() => EXPERIENCE_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Experience rule not found' })
}

useSeoMeta({
  title: () => `${rule.value.title} - ${EXPERIENCE_SCREEN_5E.title} D&D 5e - TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="EXPERIENCE_SCREEN_5E"
    :groups="EXPERIENCE_GROUPS_WITH_RULES_5E"
    :icons="EXPERIENCE_ICON_SVG_5E"
    :rule="rule"
    :rule-path="experienceRulePath"
    section-path="/dnd5e/screens/experience"
  />
</template>
