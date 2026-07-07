<script setup>
import { ENVIRONMENT_SCREEN_5E, ENVIRONMENT_GROUPS_WITH_RULES_5E, ENVIRONMENT_ICON_SVG_5E, environmentRulePath } from '~/data/environmentRules5e.js'

useSeoMeta({
  title: 'Окружающая среда — правила D&D 5e 2014 — TKK.club',
  description: 'Правила окружающей среды D&D 5e: падение, удушение, зрение, сверхъестественные области, погода, укрытие, свет и природные опасности.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="ENVIRONMENT_SCREEN_5E"
    :groups="ENVIRONMENT_GROUPS_WITH_RULES_5E"
    :icons="ENVIRONMENT_ICON_SVG_5E"
    :rule-path="environmentRulePath"
  />
</template>
