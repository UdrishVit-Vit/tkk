<script setup>
import { DEMONIC_BOONS_SCREEN_5E, DEMONIC_BOON_GROUPS_WITH_RULES_5E, DEMONIC_BOON_RULE_BY_SLUG_5E, DEMONIC_BOON_ICON_SVG_5E, demonicBoonRulePath } from '~/data/demonicBoonRules5e.js'

const route = useRoute()
const rule = computed(() => DEMONIC_BOON_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Демонический дар не найден' })
}

useSeoMeta({
  title: () => `${rule.value.title} — демонические дары D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="DEMONIC_BOONS_SCREEN_5E"
    :groups="DEMONIC_BOON_GROUPS_WITH_RULES_5E"
    :icons="DEMONIC_BOON_ICON_SVG_5E"
    :rule="rule"
    :rule-path="demonicBoonRulePath"
    section-path="/dnd5e/screens/demonic_boons"
  />
</template>
