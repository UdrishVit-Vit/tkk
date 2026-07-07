<script setup>
import { HITS_DEATH_REST_SCREEN_5E, HITS_DEATH_REST_GROUPS_WITH_RULES_5E, HITS_DEATH_REST_ICON_SVG_5E, hitsDeathRestRulePath } from '~/data/hitsDeathRestRules5e.js'

useSeoMeta({
  title: 'Хиты, Смерть и Отдых — правила D&D 5e 2014 — TKK.club',
  description: 'Правила хитов, смерти и отдыха D&D 5e 2014: временные хиты, исцеление, короткий и продолжительный отдых, спасброски от смерти и сон.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="HITS_DEATH_REST_SCREEN_5E"
    :groups="HITS_DEATH_REST_GROUPS_WITH_RULES_5E"
    :icons="HITS_DEATH_REST_ICON_SVG_5E"
    :rule-path="hitsDeathRestRulePath"
  />
</template>
