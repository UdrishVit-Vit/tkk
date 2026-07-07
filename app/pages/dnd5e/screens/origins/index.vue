<script setup>
import { ORIGINS_SCREEN_5E, ORIGINS_GROUPS_WITH_RULES_5E, ORIGINS_ICON_SVG_5E, originsRulePath } from '~/data/originRules5e.js'

useSeoMeta({
  title: 'Происхождение — правила D&D 5e — TKK.club',
  description: 'Таблицы происхождения персонажа из D&D 5e: место рождения, события жизни, семья, друзья, трагедии, приключения и дополнительные таблицы.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="ORIGINS_SCREEN_5E"
    :groups="ORIGINS_GROUPS_WITH_RULES_5E"
    :icons="ORIGINS_ICON_SVG_5E"
    :rule-path="originsRulePath"
  />
</template>
