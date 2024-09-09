import React from 'react';
import ReactDOM from 'react-dom/client';
import type { SVGProps } from 'react';

<script lang='ts'>
import Headslot from '@/Components/HeadSlot.vue'
import GuestLayout from '@/Layout/GuestLayout.vue'
import { defineComponent } from 'vue'

export default defineComponent({
layout: (h, page) => h(GuestLayout, [page])
})
</script>

<template>
  
<Headslot>Beranda</Headslot>

<GuestLayout>
<main class="a354-container a354-yellow ">
<h1 class="a354-cursive a354-center a354- jumbo a354-text-green">
Assalamualaikum warahmatullahi wabarakaatuh</h1><br>
<h1 class="a354-cursive a354-center a354-jumbo a354-text-green"> Selamat Datang</h1>
</main>
</GuestLayout>

</template>
