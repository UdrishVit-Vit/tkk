<script setup>
import { ORIGINS_SCREEN_5E, ORIGINS_GROUPS_WITH_RULES_5E, ORIGINS_RULE_BY_SLUG_5E, ORIGINS_ICON_SVG_5E, originsRulePath } from '~/data/originRules5e.js'

const route = useRoute()
const rule = computed(() => ORIGINS_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило происхождения не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — происхождение D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="ORIGINS_SCREEN_5E"
    :groups="ORIGINS_GROUPS_WITH_RULES_5E"
    :icons="ORIGINS_ICON_SVG_5E"
    :rule="rule"
    :rule-path="originsRulePath"
    section-path="/dnd5e/screens/origins"
  />
</template>
