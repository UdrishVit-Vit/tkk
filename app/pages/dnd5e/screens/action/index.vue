<script setup>
import { ACTION_SCREEN_5E, ACTION_RULE_GROUPS_5E, ACTION_ICON_SVG_5E, actionRulePath, actionRulesForGroup } from '~/data/actionRules5e.js'

const groups = ACTION_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: actionRulesForGroup(group)
}))

useSeoMeta({
  title: 'Действие — правила D&D 5e 2014 — TKK.club',
  description: 'Правила действий D&D 5e 2014: атака, рывок, отход, уклонение, помощь, поиск, подготовка, захват, толчок и опциональные действия DMG.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="ACTION_SCREEN_5E"
    :groups="groups"
    :icons="ACTION_ICON_SVG_5E"
    :rule-path="actionRulePath"
  />
</template>
