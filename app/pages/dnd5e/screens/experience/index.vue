<script setup>
import { EXPERIENCE_SCREEN_5E, EXPERIENCE_GROUPS_WITH_RULES_5E, EXPERIENCE_ICON_SVG_5E, experienceRulePath } from '~/data/experienceRules5e.js'

useSeoMeta({
  title: `${EXPERIENCE_SCREEN_5E.title} - D&D 5e - TKK.club`,
  description: EXPERIENCE_SCREEN_5E.intro
})
</script>

<template>
  <RuleScreenListPage
    :screen="EXPERIENCE_SCREEN_5E"
    :groups="EXPERIENCE_GROUPS_WITH_RULES_5E"
    :icons="EXPERIENCE_ICON_SVG_5E"
    :rule-path="experienceRulePath"
  />
</template>
