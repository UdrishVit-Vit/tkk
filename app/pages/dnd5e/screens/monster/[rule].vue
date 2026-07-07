<script setup>
import { MONSTER_SCREEN_5E, MONSTER_GROUPS_WITH_RULES_5E, MONSTER_RULE_BY_SLUG_5E, MONSTER_ICON_SVG_5E, monsterRulePath } from '~/data/monsterRules5e.js'

const route = useRoute()
const rule = computed(() => MONSTER_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Monster rule not found' })
}

useSeoMeta({
  title: () => `${rule.value.title} - ${MONSTER_SCREEN_5E.title} D&D 5e - TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="MONSTER_SCREEN_5E"
    :groups="MONSTER_GROUPS_WITH_RULES_5E"
    :icons="MONSTER_ICON_SVG_5E"
    :rule="rule"
    :rule-path="monsterRulePath"
    section-path="/dnd5e/screens/monster"
  />
</template>
