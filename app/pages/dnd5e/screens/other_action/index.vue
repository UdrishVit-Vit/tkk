<script setup>
import { OTHER_ACTION_SCREEN_5E, OTHER_ACTION_RULES_5E, OTHER_ACTION_ICON_SVG_5E, otherActionRulePath } from '~/data/otherActionRules5e.js'

const groups = [{ id: 'all', rules: OTHER_ACTION_RULES_5E }]

useSeoMeta({
  title: 'Прочая деятельность — правила D&D 5e 2014 — TKK.club',
  description: 'Правила прочей деятельности в D&D 5e 2014: взаимодействие с предметами, концентрация и разговор в бою.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="OTHER_ACTION_SCREEN_5E"
    :groups="groups"
    :icons="OTHER_ACTION_ICON_SVG_5E"
    :rule-path="otherActionRulePath"
  />
</template>
