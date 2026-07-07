<script setup>
import { ACTIVE_CLASS_FEATURES_SCREEN_5E, ACTIVE_CLASS_FEATURE_GROUPS_WITH_RULES_5E, ACTIVE_CLASS_FEATURE_RULE_BY_SLUG_5E, ACTIVE_CLASS_FEATURES_ICON_SVG_5E, activeClassFeatureRulePath } from '~/data/activeClassFeatureRules5e.js'

const route = useRoute()
const rule = computed(() => ACTIVE_CLASS_FEATURE_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Активное умение класса не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — активные умения класса D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="ACTIVE_CLASS_FEATURES_SCREEN_5E"
    :groups="ACTIVE_CLASS_FEATURE_GROUPS_WITH_RULES_5E"
    :icons="ACTIVE_CLASS_FEATURES_ICON_SVG_5E"
    :rule="rule"
    :rule-path="activeClassFeatureRulePath"
    section-path="/dnd5e/screens/active_class_features"
  />
</template>
