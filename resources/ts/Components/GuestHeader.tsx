<script setup lang='ts'>
import Login from '@/Components/Login.vue'
import { computed } from 'vue'

const props = defineProps(['logo'])

const imgSrc = computed(() => {
  return new URL(`@/assets/${props.logo}.png`, import.meta.url).href
})
</script>
<template>
<header class='a354-container'>
<Login/></br>
<div class='a354-row-padding a354-section a354-stretch'>
<div class='a354-col s4'>
<img :src="imgSrc"/>
</div>
<div class='a354-col s8'>
  <h1 class= 'a354-jumbo a354-serif a354-text-indigo'>
    YAYASAN DAR AL FURQON AL HAKIM
    </h1><br/>
    <h2 class='a354-xxlarge a354-serif a354-text-blue'>
      Berakhlakul Karimah, Fakih, & Mandiri
      </h2>
</div>
</div>
</header>
</template>