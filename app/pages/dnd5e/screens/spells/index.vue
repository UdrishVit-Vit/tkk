<script setup>
import { SPELLS_SCREEN_5E, SPELL_GROUPS_WITH_RULES_5E, SPELLS_ICON_SVG_5E, spellRulePath } from '~/data/spellRules5e.js'

useSeoMeta({
  title: 'Заклинания — правила D&D 5e 2014 — TKK.club',
  description: 'Правила заклинаний D&D 5e 2014: заговоры, ритуалы, ячейки, время наложения, дистанция, длительность, компоненты, концентрация, область воздействия и спасброски.'
})
</script>

<template>
  <RuleScreenListPage
    :screen="SPELLS_SCREEN_5E"
    :groups="SPELL_GROUPS_WITH_RULES_5E"
    :icons="SPELLS_ICON_SVG_5E"
    :rule-path="spellRulePath"
  />
</template>
