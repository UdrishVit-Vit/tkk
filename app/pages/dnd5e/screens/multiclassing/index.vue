<script setup>
import { MULTICLASSING_SCREEN_5E, MULTICLASSING_GROUPS_WITH_RULES_5E, MULTICLASSING_ICON_SVG_5E, multiclassingRulePath } from '~/data/multiclassingRules5e.js'

useSeoMeta({
  title: 'Мультиклассирование — правила D&D 5e 2014 — TKK.club',
  description: 'Правила мультиклассирования D&D 5e 2014: требования характеристик, владения, хиты, умения классов, знание заклинаний, ячейки, таблица заклинателя и Магия договора.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="MULTICLASSING_SCREEN_5E"
    :groups="MULTICLASSING_GROUPS_WITH_RULES_5E"
    :icons="MULTICLASSING_ICON_SVG_5E"
    :rule-path="multiclassingRulePath"
  />
</template>
