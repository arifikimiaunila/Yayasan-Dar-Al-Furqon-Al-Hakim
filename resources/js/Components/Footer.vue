<script setup lang='ts'>
import {useYear} from '@/ts part/presentYear.ts'
import { storeToRefs } from 'pinia'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const nowYear: object = useYear()
 const { d }: object = storeToRefs(nowYear)
// the increment action can just be destructured
const { presentYear }: object = nowYear
</script>
<template>
<footer class="a354-container a354-blue-ray">
<p>Hak Cipta &copy;
<span v-if="(nowYear.presentYear)=2024">2024</span>
<span v-else>2024-{{nowYear.presentYear}} </span>
 dimiliki oleh Yayasan Dar Al Furqon Al Hakim.</p>
</footer>
</template>