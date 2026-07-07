<script setup>
import { ARTIFACTS_SCREEN_5E, ARTIFACT_GROUPS_WITH_RULES_5E, ARTIFACT_RULE_BY_SLUG_5E, ARTIFACT_ICON_SVG_5E, artifactRulePath } from '~/data/artifactRules5e.js'

const route = useRoute()
const rule = computed(() => ARTIFACT_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило артефакта не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — артефакты D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="ARTIFACTS_SCREEN_5E"
    :groups="ARTIFACT_GROUPS_WITH_RULES_5E"
    :icons="ARTIFACT_ICON_SVG_5E"
    :rule="rule"
    :rule-path="artifactRulePath"
    section-path="/dnd5e/screens/artifacts"
  />
</template>
