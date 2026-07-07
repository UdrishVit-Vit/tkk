<script setup>
import { OTHER_ACTION_SCREEN_5E, OTHER_ACTION_RULES_5E, OTHER_ACTION_RULE_BY_SLUG_5E, OTHER_ACTION_ICON_SVG_5E, otherActionRulePath } from '~/data/otherActionRules5e.js'

const route = useRoute()
const rule = computed(() => OTHER_ACTION_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило прочей деятельности не найдено' })
}

const groups = [{ id: 'all', rules: OTHER_ACTION_RULES_5E }]

useSeoMeta({
  title: () => `${rule.value.title} — прочая деятельность D&D 5e 2014 — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="OTHER_ACTION_SCREEN_5E"
    :groups="groups"
    :icons="OTHER_ACTION_ICON_SVG_5E"
    :rule="rule"
    :rule-path="otherActionRulePath"
    section-path="/dnd5e/screens/other_action"
  />
</template>
