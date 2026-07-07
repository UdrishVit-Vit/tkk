<script setup>
import { EQUIPMENT_SCREEN_5E, EQUIPMENT_GROUPS_WITH_RULES_5E, EQUIPMENT_ICON_SVG_5E, equipmentRulePath } from '~/data/equipmentRules5e.js'

useSeoMeta({
  title: 'Снаряжение — правила D&D 5e — TKK.club',
  description: 'Снаряжение D&D 5e 2014: доспехи, оружие, яды, инструменты, наборы, осадное снаряжение, свойства оружия, фокусировки и характеристики предметов.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="EQUIPMENT_SCREEN_5E"
    :groups="EQUIPMENT_GROUPS_WITH_RULES_5E"
    :icons="EQUIPMENT_ICON_SVG_5E"
    :rule-path="equipmentRulePath"
  />
</template>
