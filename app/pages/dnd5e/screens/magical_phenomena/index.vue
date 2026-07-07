<script setup>
import { MAGICAL_PHENOMENA_SCREEN_5E, MAGICAL_PHENOMENA_GROUPS_WITH_RULES_5E, MAGICAL_PHENOMENA_ICON_SVG_5E, magicalPhenomenaRulePath } from '~/data/magicalPhenomenaRules5e.js'

useSeoMeta({
  title: `${MAGICAL_PHENOMENA_SCREEN_5E.title} - D&D 5e - TKK.club`,
  description: MAGICAL_PHENOMENA_SCREEN_5E.intro
})
</script>

<template>
  <RuleScreenListPage
    :screen="MAGICAL_PHENOMENA_SCREEN_5E"
    :groups="MAGICAL_PHENOMENA_GROUPS_WITH_RULES_5E"
    :icons="MAGICAL_PHENOMENA_ICON_SVG_5E"
    :rule-path="magicalPhenomenaRulePath"
  />
</template>
