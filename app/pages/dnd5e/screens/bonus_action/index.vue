<script setup>
import { BONUS_ACTION_SCREEN_5E, BONUS_ACTION_RULES_5E, BONUS_ACTION_ICON_SVG_5E, bonusActionRulePath } from '~/data/bonusActionRules5e.js'

const groups = [{ id: 'all', rules: BONUS_ACTION_RULES_5E }]

useSeoMeta({
  title: 'Бонусное действие — правила D&D 5e 2014 — TKK.club',
  description: 'Правила бонусных действий D&D 5e 2014: атака второй рукой, заклинание бонусным действием и классовые способности.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="BONUS_ACTION_SCREEN_5E"
    :groups="groups"
    :icons="BONUS_ACTION_ICON_SVG_5E"
    :rule-path="bonusActionRulePath"
  />
</template>
