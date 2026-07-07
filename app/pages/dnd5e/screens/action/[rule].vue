<script setup>
import { ACTION_SCREEN_5E, ACTION_RULE_GROUPS_5E, ACTION_RULE_BY_SLUG_5E, ACTION_ICON_SVG_5E, actionRulePath, actionRulesForGroup } from '~/data/actionRules5e.js'

const route = useRoute()

const rule = computed(() => {
  const base = ACTION_RULE_BY_SLUG_5E[String(route.params.rule || '')]
  if (!base) return undefined
  const optional = base.source === 'DMG'
  return {
    ...base,
    sourceUrl: optional ? ACTION_SCREEN_5E.optionalSourceUrl : ACTION_SCREEN_5E.sourceUrl,
    sourceName: optional ? ACTION_SCREEN_5E.optionalSourceName : ACTION_SCREEN_5E.sourceName
  }
})

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило действия не найдено' })
}

const groups = ACTION_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: actionRulesForGroup(group)
}))

useSeoMeta({
  title: () => `${rule.value.title} — действие D&D 5e 2014 — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="ACTION_SCREEN_5E"
    :groups="groups"
    :icons="ACTION_ICON_SVG_5E"
    :rule="rule"
    :rule-path="actionRulePath"
    section-path="/dnd5e/screens/action"
  />
</template>
