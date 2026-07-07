<script setup>
import { SPELLS_SCREEN_5E, SPELL_GROUPS_WITH_RULES_5E, SPELL_RULE_BY_SLUG_5E, SPELLS_ICON_SVG_5E, spellRulePath } from '~/data/spellRules5e.js'

const route = useRoute()
const rule = computed(() => SPELL_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило заклинаний не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — заклинания D&D 5e 2014 — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="SPELLS_SCREEN_5E"
    :groups="SPELL_GROUPS_WITH_RULES_5E"
    :icons="SPELLS_ICON_SVG_5E"
    :rule="rule"
    :rule-path="spellRulePath"
    section-path="/dnd5e/screens/spells"
  />
</template>
