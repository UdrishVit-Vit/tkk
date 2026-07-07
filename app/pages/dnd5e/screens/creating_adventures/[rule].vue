<script setup>
import { CREATING_ADVENTURES_SCREEN_5E, CREATING_ADVENTURE_GROUPS_WITH_RULES_5E, CREATING_ADVENTURE_RULE_BY_SLUG_5E, CREATING_ADVENTURES_ICON_SVG_5E, creatingAdventureRulePath } from '~/data/creatingAdventureRules5e.js'

const route = useRoute()
const rule = computed(() => CREATING_ADVENTURE_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило создания приключения не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — создание приключений D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="CREATING_ADVENTURES_SCREEN_5E"
    :groups="CREATING_ADVENTURE_GROUPS_WITH_RULES_5E"
    :icons="CREATING_ADVENTURES_ICON_SVG_5E"
    :rule="rule"
    :rule-path="creatingAdventureRulePath"
    section-path="/dnd5e/screens/creating_adventures"
  />
</template>
