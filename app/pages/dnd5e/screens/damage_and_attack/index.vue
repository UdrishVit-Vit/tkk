<script setup>
import { DAMAGE_ATTACK_SCREEN_5E, DAMAGE_ATTACK_GROUPS_WITH_RULES_5E, DAMAGE_ATTACK_ICON_SVG_5E, damageAttackRulePath } from '~/data/damageAttackRules5e.js'

useSeoMeta({
  title: 'Урон и атака — правила D&D 5e 2014 — TKK.club',
  description: 'Правила урона и атаки D&D 5e 2014: критические попадания, преимущество, сопротивление, уязвимость, иммунитет и типы урона.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="DAMAGE_ATTACK_SCREEN_5E"
    :groups="DAMAGE_ATTACK_GROUPS_WITH_RULES_5E"
    :icons="DAMAGE_ATTACK_ICON_SVG_5E"
    :rule-path="damageAttackRulePath"
  />
</template>
