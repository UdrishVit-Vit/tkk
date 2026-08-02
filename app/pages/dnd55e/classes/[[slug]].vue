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

if (slug.value && !initialClass.value) {
  throw createError({ statusCode: 404, statusMessage: 'Класс D&D 5.5e не найден' })
}

useHead(() => ({
  title: initialClass.value
    ? `${initialClass.value} — D&D 5.5e 2024 — TKK.club`
    : 'Классы — D&D 5.5e 2024 — TKK.club'
}))
</script>

<template>
  <HubPage
    initial-system="2024"
    initial-section="Классы"
    :initial-class="initialClass"
    class-route-base="/dnd55e/classes"
    :sync-query="false"
  />
</template>
