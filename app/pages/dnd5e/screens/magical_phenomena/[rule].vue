<script setup>
import { MAGICAL_PHENOMENA_SCREEN_5E, MAGICAL_PHENOMENA_GROUPS_WITH_RULES_5E, MAGICAL_PHENOMENA_RULE_BY_SLUG_5E, MAGICAL_PHENOMENA_ICON_SVG_5E, magicalPhenomenaRulePath } from '~/data/magicalPhenomenaRules5e.js'

const route = useRoute()
const rule = computed(() => MAGICAL_PHENOMENA_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Magical phenomenon rule not found' })
}

useSeoMeta({
  title: () => `${rule.value.title} - ${MAGICAL_PHENOMENA_SCREEN_5E.title} D&D 5e - TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="MAGICAL_PHENOMENA_SCREEN_5E"
    :groups="MAGICAL_PHENOMENA_GROUPS_WITH_RULES_5E"
    :icons="MAGICAL_PHENOMENA_ICON_SVG_5E"
    :rule="rule"
    :rule-path="magicalPhenomenaRulePath"
    section-path="/dnd5e/screens/magical_phenomena"
  />
</template>
