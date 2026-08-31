<script setup>
import { tokenizeLoreText } from '~/utils/loreText.js'

const props = defineProps({
  text: { type: String, default: '' },
  // Статья, внутри которой идёт текст: сама на себя не ссылается.
  skipId: { type: String, default: '' },
})

const emit = defineEmits(['term'])

const tokens = computed(() => tokenizeLoreText(props.text, props.skipId))
</script>

<template>
  <span class="lore-rich"><template v-for="(token, index) in tokens" :key="index"><button
    v-if="token.type === 'term'"
    type="button"
    class="lore-term"
    :title="`${token.title} — открыть статью`"
    @click="emit('term', token.id)"
  >{{ token.text }}</button><template v-else>{{ token.text }}</template></template></span>
</template>

<style scoped>
.lore-rich{display:inline}
.lore-term{border:0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.38);background:none;padding:0;color:inherit;font:inherit;cursor:pointer;transition:color .16s,border-color .16s}
.lore-term:hover,.lore-term:focus-visible{border-bottom-color:var(--gold-bright);color:var(--gold-bright);outline:0}
</style>
