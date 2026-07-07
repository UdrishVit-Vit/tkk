<script setup>
import { MOVEMENT_SCREEN_5E, MOVEMENT_RULES_5E, MOVEMENT_ICON_SVG_5E, movementRulePath } from '~/data/movementRules5e.js'

const groups = [{ id: 'all', rules: MOVEMENT_RULES_5E }]

useSeoMeta({
  title: 'Движение — правила D&D 5e 2014 — TKK.club',
  description: 'Правила движения D&D 5e 2014: перемещение, вставание, лазание, плавание, прыжки, полёт, ползание и труднопроходимая местность.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="MOVEMENT_SCREEN_5E"
    :groups="groups"
    :icons="MOVEMENT_ICON_SVG_5E"
    :rule-path="movementRulePath"
  />
</template>
