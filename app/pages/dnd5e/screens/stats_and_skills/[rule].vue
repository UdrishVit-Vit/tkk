<script setup>
import { STATS_SKILLS_SCREEN_5E, STATS_SKILLS_GROUPS_WITH_RULES_5E, STATS_SKILLS_RULE_BY_SLUG_5E, STATS_SKILLS_ICON_SVG_5E, statsSkillsRulePath } from '~/data/statsSkillsRules5e.js'

const route = useRoute()
const rule = computed(() => STATS_SKILLS_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило характеристик и навыков не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — характеристики и навыки D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="STATS_SKILLS_SCREEN_5E"
    :groups="STATS_SKILLS_GROUPS_WITH_RULES_5E"
    :icons="STATS_SKILLS_ICON_SVG_5E"
    :rule="rule"
    :rule-path="statsSkillsRulePath"
    section-path="/dnd5e/screens/stats_and_skills"
  />
</template>
