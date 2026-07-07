<script setup>
import { REACTION_SCREEN_5E, REACTION_RULES_5E, REACTION_RULE_BY_SLUG_5E, REACTION_ICON_SVG_5E, reactionRulePath } from '~/data/reactionRules5e.js'

const route = useRoute()
const rule = computed(() => REACTION_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило реакции не найдено' })
}

const groups = [{ id: 'all', rules: REACTION_RULES_5E }]

useSeoMeta({
  title: () => `${rule.value.title} — реакция D&D 5e 2014 — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="REACTION_SCREEN_5E"
    :groups="groups"
    :icons="REACTION_ICON_SVG_5E"
    :rule="rule"
    :rule-path="reactionRulePath"
    section-path="/dnd5e/screens/reaction"
  />
</template>
