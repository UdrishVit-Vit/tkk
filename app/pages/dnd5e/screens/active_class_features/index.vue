<script setup>
import { ACTIVE_CLASS_FEATURES_SCREEN_5E, ACTIVE_CLASS_FEATURE_GROUPS_WITH_RULES_5E, ACTIVE_CLASS_FEATURES_ICON_SVG_5E, activeClassFeatureRulePath } from '~/data/activeClassFeatureRules5e.js'

useSeoMeta({
  title: 'Активные умения класса — правила D&D 5e — TKK.club',
  description: 'Активные умения классов D&D 5e 2014: вдохновение барда, ярость, всплеск действий, дикий облик, изгнание нежити, ки монаха, божественная кара, скрытая атака и другие.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="ACTIVE_CLASS_FEATURES_SCREEN_5E"
    :groups="ACTIVE_CLASS_FEATURE_GROUPS_WITH_RULES_5E"
    :icons="ACTIVE_CLASS_FEATURES_ICON_SVG_5E"
    :rule-path="activeClassFeatureRulePath"
  />
</template>
