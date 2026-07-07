<script setup>
import { DOWNTIME_ACTIVITIES_SCREEN_5E, DOWNTIME_ACTIVITY_GROUPS_WITH_RULES_5E, DOWNTIME_ICON_SVG_5E, downtimeActivityRulePath } from '~/data/downtimeActivityRules5e.js'

useSeoMeta({
  title: 'Деятельность в простое — правила D&D 5e — TKK.club',
  description: 'Деятельность в простое D&D 5e: азартные игры, исследование, обучение, ремесло, работа, покупка и продажа магических предметов, расходы и услуги.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="DOWNTIME_ACTIVITIES_SCREEN_5E"
    :groups="DOWNTIME_ACTIVITY_GROUPS_WITH_RULES_5E"
    :icons="DOWNTIME_ICON_SVG_5E"
    :rule-path="downtimeActivityRulePath"
  />
</template>
