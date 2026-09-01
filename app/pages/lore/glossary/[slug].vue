<script setup>
// Собственный адрес у каждой статьи: /lore/glossary/morhory.
// Заголовок и описание страницы задаёт сам глоссарий — он знает выбранную
// статью, а здесь известен только её слаг.
</script>

<template>
  <HubPage initial-system="lore" initial-section="Глоссарий" :sync-query="false" />
</template>
