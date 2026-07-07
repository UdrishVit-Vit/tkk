<script setup>
import { PLANAR_TRAVEL_SCREEN_5E, PLANAR_TRAVEL_GROUPS_WITH_RULES_5E, PLANAR_TRAVEL_ICON_SVG_5E, planarTravelRulePath } from '~/data/planarTravelRules5e.js'

useSeoMeta({
  title: `${PLANAR_TRAVEL_SCREEN_5E.title} - D&D 5e - TKK.club`,
  description: PLANAR_TRAVEL_SCREEN_5E.intro
})
</script>

<template>
  <RuleScreenListPage
    :screen="PLANAR_TRAVEL_SCREEN_5E"
    :groups="PLANAR_TRAVEL_GROUPS_WITH_RULES_5E"
    :icons="PLANAR_TRAVEL_ICON_SVG_5E"
    :rule-path="planarTravelRulePath"
  />
</template>
