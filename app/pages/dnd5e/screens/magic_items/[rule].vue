<script setup>
import { MAGIC_ITEMS_SCREEN_5E, MAGIC_ITEM_GROUPS_WITH_RULES_5E, MAGIC_ITEM_RULE_BY_SLUG_5E, MAGIC_ITEM_ICON_SVG_5E, magicItemRulePath } from '~/data/magicItemRules5e.js'

const route = useRoute()
const rule = computed(() => MAGIC_ITEM_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Magic item rule not found' })
}

useSeoMeta({
  title: () => `${rule.value.title} - ${MAGIC_ITEMS_SCREEN_5E.title} D&D 5e - TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="MAGIC_ITEMS_SCREEN_5E"
    :groups="MAGIC_ITEM_GROUPS_WITH_RULES_5E"
    :icons="MAGIC_ITEM_ICON_SVG_5E"
    :rule="rule"
    :rule-path="magicItemRulePath"
    section-path="/dnd5e/screens/magic_items"
  />
</template>
