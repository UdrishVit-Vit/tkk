<script setup>
import { CREATING_ADVENTURES_SCREEN_5E, CREATING_ADVENTURE_GROUPS_WITH_RULES_5E, CREATING_ADVENTURES_ICON_SVG_5E, creatingAdventureRulePath } from '~/data/creatingAdventureRules5e.js'

useSeoMeta({
  title: 'Создание приключений — правила D&D 5e — TKK.club',
  description: 'Создание приключений D&D 5e: цели группы, важные ПМ, введение, кульминация, злодей, реакции, ключевые локации и планирование сцен.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="CREATING_ADVENTURES_SCREEN_5E"
    :groups="CREATING_ADVENTURE_GROUPS_WITH_RULES_5E"
    :icons="CREATING_ADVENTURES_ICON_SVG_5E"
    :rule-path="creatingAdventureRulePath"
  />
</template>
