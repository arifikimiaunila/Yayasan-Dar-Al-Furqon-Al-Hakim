<script setup lang='ts'>
import GuestHeader from '@/Components/GuestHeader.vue'
import GuestNavLink from '@/Components/GuestNavLink.vue'
</script>

<template>
<GuestHeader/>
<GuestNavLink/>
<slot></slot>
 <Footer/>
</template>
