<script setup>
import { TRAPS_SCREEN_5E, TRAP_GROUPS_WITH_RULES_5E, TRAP_ICON_SVG_5E, trapRulePath } from '~/data/trapRules5e.js'

useSeoMeta({
  title: 'Ловушки — правила D&D 5e — TKK.club',
  description: 'Ловушки D&D 5e: обнаружение, обезвреживание, срабатывание, эффекты и примеры ловушек из DMG и XGE.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="TRAPS_SCREEN_5E"
    :groups="TRAP_GROUPS_WITH_RULES_5E"
    :icons="TRAP_ICON_SVG_5E"
    :rule-path="trapRulePath"
  />
</template>
