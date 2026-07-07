<script setup>
import { HITS_DEATH_REST_SCREEN_5E, HITS_DEATH_REST_GROUPS_WITH_RULES_5E, HITS_DEATH_REST_RULE_BY_SLUG_5E, HITS_DEATH_REST_ICON_SVG_5E, hitsDeathRestRulePath } from '~/data/hitsDeathRestRules5e.js'

const route = useRoute()
const rule = computed(() => HITS_DEATH_REST_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило хитов, смерти и отдыха не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — хиты, смерть и отдых D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="HITS_DEATH_REST_SCREEN_5E"
    :groups="HITS_DEATH_REST_GROUPS_WITH_RULES_5E"
    :icons="HITS_DEATH_REST_ICON_SVG_5E"
    :rule="rule"
    :rule-path="hitsDeathRestRulePath"
    section-path="/dnd5e/screens/hits_death_rest"
  />
</template>
