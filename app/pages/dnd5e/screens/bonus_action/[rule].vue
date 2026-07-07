<script setup>
import { BONUS_ACTION_SCREEN_5E, BONUS_ACTION_RULES_5E, BONUS_ACTION_RULE_BY_SLUG_5E, BONUS_ACTION_ICON_SVG_5E, bonusActionRulePath } from '~/data/bonusActionRules5e.js'

const route = useRoute()
const rule = computed(() => BONUS_ACTION_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило бонусного действия не найдено' })
}

const groups = [{ id: 'all', rules: BONUS_ACTION_RULES_5E }]

useSeoMeta({
  title: () => `${rule.value.title} — бонусное действие D&D 5e 2014 — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="BONUS_ACTION_SCREEN_5E"
    :groups="groups"
    :icons="BONUS_ACTION_ICON_SVG_5E"
    :rule="rule"
    :rule-path="bonusActionRulePath"
    section-path="/dnd5e/screens/bonus_action"
  />
</template>
