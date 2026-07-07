<script setup>
import { DEMONIC_BOONS_SCREEN_5E, DEMONIC_BOON_GROUPS_WITH_RULES_5E, DEMONIC_BOON_ICON_SVG_5E, demonicBoonRulePath } from '~/data/demonicBoonRules5e.js'

useSeoMeta({
  title: 'Демонические дары — правила D&D 5e — TKK.club',
  description: 'Демонические дары D&D 5e: дары Бафомета, Граз’зта, Демогоргона, Джуиблекса, Заггтмой, Йеногу, Оркуса, Фраз-Урб’лу и прочих демонов.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="DEMONIC_BOONS_SCREEN_5E"
    :groups="DEMONIC_BOON_GROUPS_WITH_RULES_5E"
    :icons="DEMONIC_BOON_ICON_SVG_5E"
    :rule-path="demonicBoonRulePath"
  />
</template>
