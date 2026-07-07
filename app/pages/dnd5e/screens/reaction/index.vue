<script setup>
import { REACTION_SCREEN_5E, REACTION_RULES_5E, REACTION_ICON_SVG_5E, reactionRulePath } from '~/data/reactionRules5e.js'

const groups = [{ id: 'all', rules: REACTION_RULES_5E }]

useSeoMeta({
  title: 'Реакция — правила D&D 5e 2014 — TKK.club',
  description: 'Правила реакций D&D 5e 2014: реакционные заклинания, подготовленная атака и провоцированная атака.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="REACTION_SCREEN_5E"
    :groups="groups"
    :icons="REACTION_ICON_SVG_5E"
    :rule-path="reactionRulePath"
  />
</template>
