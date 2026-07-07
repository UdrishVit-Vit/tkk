<script setup>
import { LANGUAGE_SCREEN_5E, LANGUAGE_GROUPS_WITH_RULES_5E, LANGUAGE_ICON_SVG_5E, languageRulePath } from '~/data/languageRules5e.js'

useSeoMeta({
  title: `${LANGUAGE_SCREEN_5E.title} - D&D 5e - TKK.club`,
  description: LANGUAGE_SCREEN_5E.intro
})
</script>

<template>
  <RuleScreenListPage
    :screen="LANGUAGE_SCREEN_5E"
    :groups="LANGUAGE_GROUPS_WITH_RULES_5E"
    :icons="LANGUAGE_ICON_SVG_5E"
    :rule-path="languageRulePath"
  />
</template>
