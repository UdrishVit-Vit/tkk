<script setup>
import { SUPERNATURAL_GIFTS_SCREEN_5E, SUPERNATURAL_GIFT_GROUPS_WITH_RULES_5E, SUPERNATURAL_GIFT_RULE_BY_SLUG_5E, SUPERNATURAL_GIFT_ICON_SVG_5E, supernaturalGiftRulePath } from '~/data/supernaturalGiftRules5e.js'

const route = useRoute()
const rule = computed(() => SUPERNATURAL_GIFT_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Сверхъестественный дар не найден' })
}

useSeoMeta({
  title: () => `${rule.value.title} — сверхъестественные дары D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="SUPERNATURAL_GIFTS_SCREEN_5E"
    :groups="SUPERNATURAL_GIFT_GROUPS_WITH_RULES_5E"
    :icons="SUPERNATURAL_GIFT_ICON_SVG_5E"
    :rule="rule"
    :rule-path="supernaturalGiftRulePath"
    section-path="/dnd5e/screens/supernatural_gifts"
  />
</template>
