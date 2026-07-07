<script setup>
import { MONSTER_SCREEN_5E, MONSTER_GROUPS_WITH_RULES_5E, MONSTER_ICON_SVG_5E, monsterRulePath } from '~/data/monsterRules5e.js'

useSeoMeta({
  title: `${MONSTER_SCREEN_5E.title} - D&D 5e - TKK.club`,
  description: MONSTER_SCREEN_5E.intro
})
</script>

<template>
  <RuleScreenListPage
    :screen="MONSTER_SCREEN_5E"
    :groups="MONSTER_GROUPS_WITH_RULES_5E"
    :icons="MONSTER_ICON_SVG_5E"
    :rule-path="monsterRulePath"
  />
</template>
