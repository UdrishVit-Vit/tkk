<script setup>
import { EPIC_BOONS_SCREEN_5E, EPIC_BOON_GROUPS_WITH_RULES_5E, EPIC_BOON_RULE_BY_SLUG_5E, EPIC_BOON_ICON_SVG_5E, epicBoonRulePath } from '~/data/epicBoonRules5e.js'

const route = useRoute()
const rule = computed(() => EPIC_BOON_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Эпический дар не найден' })
}

useSeoMeta({
  title: () => `${rule.value.title} — эпические дары D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="EPIC_BOONS_SCREEN_5E"
    :groups="EPIC_BOON_GROUPS_WITH_RULES_5E"
    :icons="EPIC_BOON_ICON_SVG_5E"
    :rule="rule"
    :rule-path="epicBoonRulePath"
    section-path="/dnd5e/screens/epic_boons"
  />
</template>
