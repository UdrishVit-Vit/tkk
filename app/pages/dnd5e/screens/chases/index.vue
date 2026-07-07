<script setup>
import { CHASES_SCREEN_5E, CHASE_GROUPS_WITH_RULES_5E, CHASE_ICON_SVG_5E, chaseRulePath } from '~/data/chaseRules5e.js'

useSeoMeta({
  title: `${CHASES_SCREEN_5E.title} - D&D 5e - TKK.club`,
  description: CHASES_SCREEN_5E.intro
})
</script>

<template>
  <RuleScreenListPage
    :screen="CHASES_SCREEN_5E"
    :groups="CHASE_GROUPS_WITH_RULES_5E"
    :icons="CHASE_ICON_SVG_5E"
    :rule-path="chaseRulePath"
  />
</template>
