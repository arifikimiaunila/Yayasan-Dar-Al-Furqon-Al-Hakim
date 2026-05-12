<template>
  <div id="flex flex-col min-h-screen">
    <!-- Menggunakan komponen yang telah diimpor -->
    <Header />
    
    <main class="flex-1">
      <Body />
    </main>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Mengimpor komponen dengan TypeScript
import Header from './Components/Header.vue';
import Body from './Components/Body.vue';
import Footer from './Components/Footer.vue';
</script>
