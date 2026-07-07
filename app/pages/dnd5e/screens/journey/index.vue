<script setup>
import { JOURNEY_SCREEN_5E, JOURNEY_GROUPS_WITH_RULES_5E, JOURNEY_ICON_SVG_5E, journeyRulePath } from '~/data/journeyRules5e.js'

useSeoMeta({
  title: `${JOURNEY_SCREEN_5E.title} - D&D 5e - TKK.club`,
  description: JOURNEY_SCREEN_5E.intro
})
</script>

<template>
  <RuleScreenListPage
    :screen="JOURNEY_SCREEN_5E"
    :groups="JOURNEY_GROUPS_WITH_RULES_5E"
    :icons="JOURNEY_ICON_SVG_5E"
    :rule-path="journeyRulePath"
  />
</template>
