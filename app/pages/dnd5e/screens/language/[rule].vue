<script setup>
import { LANGUAGE_SCREEN_5E, LANGUAGE_GROUPS_WITH_RULES_5E, LANGUAGE_RULE_BY_SLUG_5E, LANGUAGE_ICON_SVG_5E, languageRulePath } from '~/data/languageRules5e.js'

const route = useRoute()
const rule = computed(() => LANGUAGE_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Language rule not found' })
}

useSeoMeta({
  title: () => `${rule.value.title} - ${LANGUAGE_SCREEN_5E.title} D&D 5e - TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="LANGUAGE_SCREEN_5E"
    :groups="LANGUAGE_GROUPS_WITH_RULES_5E"
    :icons="LANGUAGE_ICON_SVG_5E"
    :rule="rule"
    :rule-path="languageRulePath"
    section-path="/dnd5e/screens/language"
  />
</template>
