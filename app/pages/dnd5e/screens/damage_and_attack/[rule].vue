<script setup>
import { DAMAGE_ATTACK_SCREEN_5E, DAMAGE_ATTACK_GROUPS_WITH_RULES_5E, DAMAGE_ATTACK_RULE_BY_SLUG_5E, DAMAGE_ATTACK_ICON_SVG_5E, damageAttackRulePath } from '~/data/damageAttackRules5e.js'

const route = useRoute()
const rule = computed(() => DAMAGE_ATTACK_RULE_BY_SLUG_5E[String(route.params.rule || '')])

if (!rule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Правило урона и атаки не найдено' })
}

useSeoMeta({
  title: () => `${rule.value.title} — урон и атака D&D 5e — TKK.club`,
  description: () => rule.value.summary
})
</script>

<template>
  <RuleScreenDetailPage
    :screen="DAMAGE_ATTACK_SCREEN_5E"
    :groups="DAMAGE_ATTACK_GROUPS_WITH_RULES_5E"
    :icons="DAMAGE_ATTACK_ICON_SVG_5E"
    :rule="rule"
    :rule-path="damageAttackRulePath"
    section-path="/dnd5e/screens/damage_and_attack"
  />
</template>
