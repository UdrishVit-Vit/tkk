<script setup>
import { DOWNTIME_ACTIVITIES_SCREEN_5E, DOWNTIME_ACTIVITY_GROUPS_WITH_RULES_5E, DOWNTIME_ACTIVITY_RULE_BY_SLUG_5E, DOWNTIME_ICON_SVG_5E, downtimeActivityRulePath } from '~/data/downtimeActivityRules5e.js'

const route = useRoute()
const rule = computed(() => DOWNTIME_ACTIVITY_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило деятельности в простое не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — деятельность в простое D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="DOWNTIME_ACTIVITIES_SCREEN_5E"
    :groups="DOWNTIME_ACTIVITY_GROUPS_WITH_RULES_5E"
    :icons="DOWNTIME_ICON_SVG_5E"
    :rule="rule"
    :rule-path="downtimeActivityRulePath"
    section-path="/dnd5e/screens/downtime_activities"
  />
</template>
