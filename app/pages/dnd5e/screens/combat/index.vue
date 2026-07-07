<script setup>
import { COMBAT_SCREEN_5E, COMBAT_RULES_5E, COMBAT_ICON_SVG_5E, combatRulePath } from '~/data/combatRules5e.js'

const groups = [{ id: 'all', rules: COMBAT_RULES_5E }]

useSeoMeta({
  title: 'Сражение — правила D&D 5e 2014 — TKK.club',
  description: 'Правила сражения D&D 5e 2014: порядок боя, инициатива, ход, атаки, пространство, подводный бой и сражение верхом.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="COMBAT_SCREEN_5E"
    :groups="groups"
    :icons="COMBAT_ICON_SVG_5E"
    :rule-path="combatRulePath"
  />
</template>
