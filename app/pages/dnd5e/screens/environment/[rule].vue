<script setup>
import { ENVIRONMENT_SCREEN_5E, ENVIRONMENT_GROUPS_WITH_RULES_5E, ENVIRONMENT_RULE_BY_SLUG_5E, ENVIRONMENT_ICON_SVG_5E, environmentRulePath } from '~/data/environmentRules5e.js'

const route = useRoute()
const rule = computed(() => ENVIRONMENT_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило окружающей среды не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — окружающая среда D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="ENVIRONMENT_SCREEN_5E"
    :groups="ENVIRONMENT_GROUPS_WITH_RULES_5E"
    :icons="ENVIRONMENT_ICON_SVG_5E"
    :rule="rule"
    :rule-path="environmentRulePath"
    section-path="/dnd5e/screens/environment"
  />
</template>
