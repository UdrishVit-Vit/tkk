<script setup>
import { MAGIC_ITEMS_SCREEN_5E, MAGIC_ITEM_GROUPS_WITH_RULES_5E, MAGIC_ITEM_ICON_SVG_5E, magicItemRulePath } from '~/data/magicItemRules5e.js'

useSeoMeta({
  title: `${MAGIC_ITEMS_SCREEN_5E.title} - D&D 5e - TKK.club`,
  description: MAGIC_ITEMS_SCREEN_5E.description
})
</script>

<template>
  <RuleScreenListPage
    :screen="MAGIC_ITEMS_SCREEN_5E"
    :groups="MAGIC_ITEM_GROUPS_WITH_RULES_5E"
    :icons="MAGIC_ITEM_ICON_SVG_5E"
    :rule-path="magicItemRulePath"
  />
</template>
