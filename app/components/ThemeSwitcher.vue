<script setup>
const props = defineProps({ compact: { type: Boolean, default: false } })
const { theme, themes, setTheme } = useKnotTheme()
const open = ref(false)
const root = ref(null)

function closeOnOutside(event) {
  if (!root.value?.contains(event.target)) open.value = false
}

onMounted(() => document.addEventListener('pointerdown', closeOnOutside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeOnOutside))
</script>

<template>
  <div ref="root" class="global-theme" :class="{ compact: props.compact, open }">
    <button
      type="button"
      class="global-theme-trigger"
      :aria-expanded="open"
      aria-label="Выбрать тему оформления"
      title="Тема оформления"
      @click="open = !open"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.7A8.2 8.2 0 1 1 11.3 3a6.4 6.4 0 0 0 9.7 9.7z"/></svg>
      <span v-if="!props.compact">Оформление</span>
    </button>

    <Transition name="theme-pop">
      <div v-if="open" class="global-theme-panel">
        <div class="global-theme-title">Оформление</div>
        <button
          v-for="item in themes"
          :key="item.id"
          type="button"
          class="global-theme-option"
          :class="{ active: theme === item.id }"
          @click="setTheme(item.id); open = false"
        >
          <span class="global-theme-swatch" :style="{ background: item.preview }" />
          <span><b>{{ item.name }}</b><small>{{ item.description }}</small></span>
          <span class="global-theme-check">{{ theme === item.id ? '◆' : '' }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>
