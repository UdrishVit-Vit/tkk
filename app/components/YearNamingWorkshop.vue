<script setup>
import { YEAR_IMAGES as images, YEAR_ASPECTS as aspects } from '~/data/yearNaming.js'
import { yearThread, YEAR_IMAGE_TALES as imageTales, YEAR_ASPECT_TALES as aspectTales } from '~/data/yearThreads.js'
const props=defineProps({year:{type:Number,required:true},era:{type:String,required:true},yearName:{type:String,default:''}})
const reading=computed(()=>yearThread(props.year,props.yearName))
const displayName=computed(()=>props.yearName || reading.value?.name || 'Год без имени')
</script>

<template>
  <section class="lore-thread-section year-threads" aria-labelledby="year-threads-title">
    <p class="eyebrow">Поверья · Приметы · Толкования</p>
    <h2 id="year-threads-title">Нити о годах</h2>
    <p class="threads-intro">У года есть образ и облик. Образ подсказывает, о чём будут говорить: о дороге, доме, труде или перемене. Облик придаёт этим разговорам оттенок. Из двух слов рождаются надежды, предостережения и обычаи — в каждом доме свои.</p>
    <div class="year-reading" aria-live="polite" aria-atomic="true">
      <p class="reading-date">{{ era }} · год {{ year }}</p>
      <h3>{{ displayName }}</h3>
      <template v-if="reading">
        <div class="reading-symbols"><p><span>Образ · {{ reading.image.name }}</span><strong>{{ reading.imageTale.theme }}</strong></p><p><span>Облик · {{ reading.aspect[reading.image.gender] }}</span><strong>{{ reading.aspectTale.theme }}</strong></p></div>
        <p><strong>Что сулят этому году.</strong> {{ reading.promise }}</p>
        <p><strong>Чего опасаются.</strong> {{ reading.warning }}</p>
        <details class="reading-customs"><summary>Примета и голоса жителей</summary><p>{{ reading.custom }}</p><blockquote v-for="voice in reading.voices" :key="voice.speaker"><p>{{ voice.text }}</p><cite>{{ voice.speaker }}</cite></blockquote></details>
      </template>
      <p v-else>У этого имени пока нет общего толкования. Одни видят в нём добрый знак, другие — предупреждение. Так начинается местная примета: кто-нибудь рассказывает историю, а соседи запоминают её.</p>
    </div>
    <p class="threads-note">Новые авторские поверья для Эноа. Жители могут верить в них, спорить или продавать уверенные предсказания — год не обязан исполнять обещанное.</p>
    <details class="threads-dictionary"><summary>Образы и облики: словарь поверий</summary><div class="dictionary-columns"><article><h3>Образы</h3><details v-for="image in images" :key="image.id"><summary>{{ image.name }}</summary><p>{{ imageTales[image.id].theme }}. В таком году надеются {{ imageTales[image.id].promise }}.</p><p>Обычай: в некоторых домах {{ imageTales[image.id].custom }}.</p></details></article><article><h3>Облики</h3><details v-for="aspect in aspects" :key="aspect.id"><summary>{{ aspect.m }}</summary><p>{{ aspectTales[aspect.id].theme }}. Считается, что {{ aspectTales[aspect.id].promise }}.</p><p>Предостережение: не стоит {{ aspectTales[aspect.id].warning }}.</p></details></article></div></details>
  </section>
</template>

<style scoped>
.year-threads{margin-bottom:40px;color:rgba(var(--theme-text-rgb),.85);font-size:13px;line-height:1.8}.eyebrow{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--theme-accent);margin:0 0 12px}h2{margin:0 0 18px;font:600 34px/1.1 'Cormorant Garamond',serif;color:rgb(var(--theme-heading-rgb))}.threads-intro{max-width:780px}.year-reading{margin:24px 0 16px;padding:24px;border:1px solid rgba(var(--theme-accent-rgb),.25);border-radius:6px;background:linear-gradient(120deg,rgba(var(--theme-accent-rgb),.055),transparent)}.reading-date{font-size:10px;color:rgba(var(--theme-text-rgb),.6);margin:0 0 8px}.year-reading h3{font:600 34px/1.15 'Cormorant Garamond',serif;margin:0 0 22px;color:var(--theme-accent-strong)}.reading-symbols{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:22px}.reading-symbols p{margin:0;padding-top:14px;border-top:1px solid rgba(var(--theme-accent-rgb),.2)}.reading-symbols span{display:block;font-size:10px;color:rgba(var(--theme-text-rgb),.6);margin-bottom:5px}.reading-symbols strong{font-weight:500;color:rgb(var(--theme-heading-rgb))}.year-reading>p>strong{color:var(--theme-accent-strong);font-weight:500}.threads-note{font-size:10px;line-height:1.7;color:rgba(var(--theme-text-rgb),.55);max-width:740px}summary{cursor:pointer;color:var(--theme-accent-strong);font-size:12px}summary:focus-visible{outline:2px solid var(--theme-accent-strong);outline-offset:4px}.reading-customs{margin-top:20px;padding-top:16px;border-top:1px solid rgba(var(--theme-accent-rgb),.2)}blockquote{margin:20px 0;padding:0 0 0 16px;border-left:2px solid rgba(var(--theme-accent-rgb),.3)}blockquote p{margin:0 0 5px;font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.45}cite{font-size:10px;font-style:normal;color:rgba(var(--theme-text-rgb),.6)}.threads-dictionary{margin-top:24px;border-block:1px solid rgba(var(--theme-accent-rgb),.2);padding:16px 0}.dictionary-columns{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:24px}.dictionary-columns h3{font:600 25px 'Cormorant Garamond',serif;color:rgb(var(--theme-heading-rgb));margin:0 0 14px}.dictionary-columns details{padding:10px 0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.12)}.dictionary-columns p{font-size:12px}@media(max-width:760px){h2{font-size:29px}.year-reading{padding:18px}.year-reading h3{font-size:29px}.reading-symbols,.dictionary-columns{grid-template-columns:1fr;gap:18px}}
</style>
