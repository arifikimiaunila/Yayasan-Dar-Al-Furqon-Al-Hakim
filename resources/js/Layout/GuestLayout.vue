<script setup lang='ts'>
import GuestHeader from '@/Components/GuestHeader.vue'
import GuestNavLink from '@/Components/GuestNavLink.vue'
import Footer from '@/Components/Footer.vue'
</script>

<template>
<GuestHeader/>
<GuestNavLink/>
<slot></slot>
 <Footer/>
</template>
