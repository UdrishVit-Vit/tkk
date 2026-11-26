<script setup>
defineProps({
  backTo: { type: String, required: true },
  backLabel: { type: String, required: true },
  chapters: { type: Array, required: true },
  chapterPrefix: { type: Number, required: true },
  hasIntro: { type: Boolean, default: false },
})

const activeSlug = defineModel('activeSlug', { type: String, required: true })
</script>

<template>
  <div class="lore-reader-path">
    <NuxtLink :to="backTo" class="ds-control ds-button">
      <UiActionIcon name="back" /> {{ backLabel }}
    </NuxtLink>
    <slot name="breadcrumbs" />
  </div>

  <slot />

  <label v-if="chapters.length" class="lore-reader-chapters">
    <span>Глава</span>
    <select v-model="activeSlug" class="ds-control">
      <option v-if="hasIntro" value="">Вступление</option>
      <option v-for="(chapter, index) in chapters" :key="chapter.slug" :value="chapter.slug">
        {{ chapterPrefix }}.{{ index + 1 }} · {{ chapter.title }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.lore-reader-path {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 16px;
  width: min(1040px, calc(100% - 32px));
  margin: 0 auto;
  padding-top: 14px;
}

.lore-reader-path .ds-button { background: transparent; }
.lore-reader-path .ds-button:hover { background: rgba(var(--theme-text-rgb), .07); }
.lore-reader-chapters { display: none; }

@media (max-width: 760px) {
  .lore-reader-path { width: auto; margin: 0 16px; gap: 6px 12px; padding-top: 10px; }

  .lore-reader-chapters {
    display: grid;
    gap: 5px;
    margin: 12px 16px 0;
    color: var(--ds-muted-text);
    font: 600 var(--ds-label)/1.25 var(--ds-sans);
  }

  .lore-reader-chapters select {
    width: 100%;
    min-width: 0;
    min-height: var(--ds-control-size);
    padding: 8px 10px;
    border: 1px solid var(--ds-control-border);
    border-radius: var(--ds-control-radius);
    background: var(--theme-surface);
    color: var(--ds-ink);
    font: 500 1rem/1.3 var(--ds-sans);
  }
}
</style>
