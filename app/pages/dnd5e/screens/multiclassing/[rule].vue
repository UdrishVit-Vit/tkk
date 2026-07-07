<script setup>
import { MULTICLASSING_SCREEN_5E, MULTICLASSING_GROUPS_WITH_RULES_5E, MULTICLASSING_RULE_BY_SLUG_5E, MULTICLASSING_ICON_SVG_5E, multiclassingRulePath } from '~/data/multiclassingRules5e.js'

const route = useRoute()
const rule = computed(() => MULTICLASSING_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило мультиклассирования не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — мультиклассирование D&D 5e 2014 — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="MULTICLASSING_SCREEN_5E"
    :groups="MULTICLASSING_GROUPS_WITH_RULES_5E"
    :icons="MULTICLASSING_ICON_SVG_5E"
    :rule="rule"
    :rule-path="multiclassingRulePath"
    section-path="/dnd5e/screens/multiclassing"
  />
</template>
