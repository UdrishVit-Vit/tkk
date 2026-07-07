<script setup>
import { SUPERNATURAL_GIFTS_SCREEN_5E, SUPERNATURAL_GIFT_GROUPS_WITH_RULES_5E, SUPERNATURAL_GIFT_ICON_SVG_5E, supernaturalGiftRulePath } from '~/data/supernaturalGiftRules5e.js'

useSeoMeta({
  title: 'Сверхъестественные дары — правила D&D 5e — TKK.club',
  description: 'Сверхъестественные дары D&D 5e: благословения, чары, драконьи дары, дары Тероса, тёмные дары, фейские дары и чары гильдий Равники.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="SUPERNATURAL_GIFTS_SCREEN_5E"
    :groups="SUPERNATURAL_GIFT_GROUPS_WITH_RULES_5E"
    :icons="SUPERNATURAL_GIFT_ICON_SVG_5E"
    :rule-path="supernaturalGiftRulePath"
  />
</template>
