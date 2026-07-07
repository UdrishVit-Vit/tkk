<script setup>
import { STATS_SKILLS_SCREEN_5E, STATS_SKILLS_GROUPS_WITH_RULES_5E, STATS_SKILLS_ICON_SVG_5E, statsSkillsRulePath } from '~/data/statsSkillsRules5e.js'

useSeoMeta({
  title: 'Характеристики и Навыки — правила D&D 5e 2014 — TKK.club',
  description: 'Правила характеристик и навыков D&D 5e 2014: проверки, спасброски, пассивные проверки, навыки, Сила, Ловкость, Телосложение, Интеллект, Мудрость и Харизма.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="STATS_SKILLS_SCREEN_5E"
    :groups="STATS_SKILLS_GROUPS_WITH_RULES_5E"
    :icons="STATS_SKILLS_ICON_SVG_5E"
    :rule-path="statsSkillsRulePath"
  />
</template>
