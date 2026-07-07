<script setup>
import { EPIC_BOONS_SCREEN_5E, EPIC_BOON_GROUPS_WITH_RULES_5E, EPIC_BOON_ICON_SVG_5E, epicBoonRulePath } from '~/data/epicBoonRules5e.js'

useSeoMeta({
  title: 'Эпические дары — правила D&D 5e — TKK.club',
  description: 'Эпические дары D&D 5e: бессмертие, боевая удаль, буря, быстрая магия, истинное зрение, неуязвимость, судьба, удача и другие награды героев высшего уровня.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="EPIC_BOONS_SCREEN_5E"
    :groups="EPIC_BOON_GROUPS_WITH_RULES_5E"
    :icons="EPIC_BOON_ICON_SVG_5E"
    :rule-path="epicBoonRulePath"
  />
</template>
