<script setup>
import { ARTIFACTS_SCREEN_5E, ARTIFACT_GROUPS_WITH_RULES_5E, ARTIFACT_ICON_SVG_5E, artifactRulePath } from '~/data/artifactRules5e.js'

useSeoMeta({
  title: 'Артефакты — правила D&D 5e — TKK.club',
  description: 'Артефакты D&D 5e: уничтожение артефактов, малые и основные отрицательные свойства, малые и основные положительные свойства.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="ARTIFACTS_SCREEN_5E"
    :groups="ARTIFACT_GROUPS_WITH_RULES_5E"
    :icons="ARTIFACT_ICON_SVG_5E"
    :rule-path="artifactRulePath"
  />
</template>
