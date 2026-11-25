<script setup>
const props = defineProps({
  current: { type: String, default: '' },
  panelsInHub: { type: Boolean, default: false },
  hubPath: { type: String, default: '/' },
})
const emit = defineEmits(['select'])
const actions = [
  { id: 'home', icon: 'home', label: 'Главная' },
  { id: 'search', icon: 'search', label: 'Поиск' },
  { id: 'bookmarks', icon: 'bookmark', label: 'Закладки' },
  { id: 'systems', icon: 'systems', label: 'Системы' },
  { id: 'more', icon: 'more', label: 'Ещё' },
]

function destination(id) {
  return id === 'home' ? '/' : { path: props.hubPath, query: { panel: id } }
}
</script>

<template>
  <nav class="ds-mobile-nav" aria-label="Основная навигация">
    <template v-for="action in actions" :key="action.id">
      <NuxtLink
        v-if="panelsInHub"
        :to="destination(action.id)"
        class="ds-control ds-mobile-nav__item"
        :aria-current="current === action.id ? 'location' : undefined"
      >
        <UiActionIcon :name="action.icon" /><span>{{ action.label }}</span>
      </NuxtLink>
      <button
        v-else
        type="button"
        class="ds-control ds-mobile-nav__item"
        :aria-current="action.id === 'home' && current === 'home' ? 'page' : undefined"
        :aria-expanded="action.id === 'home' ? undefined : current === action.id"
        @click="emit('select', action.id)"
      >
        <UiActionIcon :name="action.icon" /><span>{{ action.label }}</span>
      </button>
    </template>
  </nav>
</template>
