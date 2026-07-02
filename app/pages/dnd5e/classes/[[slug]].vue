<script setup>
const route = useRoute()

const CLASS_FROM_SLUG = {
  bard: 'Бард',
  barbarian: 'Варвар',
  fighter: 'Воин',
  wizard: 'Волшебник',
  drifter: 'Дрифтер',
  druid: 'Друид',
  cleric: 'Жрец',
  inventor: 'Изобретатель',
  warlock: 'Колдун',
  monk: 'Монах',
  paladin: 'Паладин',
  rogue: 'Плут',
  ranger: 'Следопыт',
  sorcerer: 'Чародей',
  shaman: 'Шаман'
}

const slug = computed(() => {
  const raw = route.params.slug
  return Array.isArray(raw) ? raw[0] : raw
})
const initialClass = computed(() => CLASS_FROM_SLUG[slug.value] || '')

useHead(() => ({
  title: initialClass.value ? `${initialClass.value} - D&D 5e - TKK.club` : 'Классы D&D 5e - TKK.club'
}))
</script>

<template>
  <HubPage
    initial-system="5e"
    initial-section="Классы"
    :initial-class="initialClass"
    class-route-base="/dnd5e/classes"
    :sync-query="false"
  />
</template>
