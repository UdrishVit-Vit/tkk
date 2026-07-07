<script setup>
import { CONDITIONS_DISEASE_SCREEN_5E, CONDITIONS_DISEASE_GROUPS_WITH_RULES_5E, CONDITIONS_DISEASE_ICON_SVG_5E, conditionsDiseaseRulePath } from '~/data/conditionsDiseaseRules5e.js'

useSeoMeta({
  title: 'Состояния и болезни — правила D&D 5e — TKK.club',
  description: 'Состояния, болезни, проклятия и прочие эффекты D&D 5e: иммунитеты, болезни, вампиризм, ликантропия, ослепление, отравление, паралич и другие состояния.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="CONDITIONS_DISEASE_SCREEN_5E"
    :groups="CONDITIONS_DISEASE_GROUPS_WITH_RULES_5E"
    :icons="CONDITIONS_DISEASE_ICON_SVG_5E"
    :rule-path="conditionsDiseaseRulePath"
  />
</template>
