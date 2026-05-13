<template>
  <!-- Komponen Head untuk mengubah title di tab browser secara dinamis -->
  <Head>
    <title>{{ pageTitle }}</title>
    <link rel="icon" type="image/x-icon" href="./assets/favicon.ico" />
  </Head>

  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Bagian Kiri: Judul Halaman Dinamis -->
        <div class="flex items-center">
          <img 
        src="./assets/Logo.png" 
        alt="Logo Yayasan" 
        class="h-10 w-auto mr-3"
    />
          <h1 class="text-xl font-bold text-gray-800">
            Yayasan Dar Al Furqon Al Hakim
          </h1>
        </div>

        <!-- Bagian Kanan: Navigasi Sederhana -->
        <Navigasi/>
  </div>
</div>
    </header >
</template >

<script setup>
import { computed } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import Navigasi from './Navigasi.vue';

// Definisikan pemetaan nama route ke Judul Halaman
const titleMap = {
    'home': 'Beranda - Yayasan',
    'dashboard': 'Dashboard Admin',
    'video.index': 'Daftar Video',
    'video.create': 'Tambah Video',
    'video.edit': 'Edit Video',
    'video.show': 'Detail Video',
    'fles.index': 'Manajemen File',
    'file.show': 'Detail File',
    'pengurus_yayasan.index': 'Daftar Pengurus',
    'pengurus_yayasan.create': 'Tambah Pengurus',
    'post.create': 'Buat Artikel Baru',
    'post.edit': 'Edit Artikel',
    'posts.show': 'Baca Artikel',
    'datayayasan.show': 'Profil Yayasan',
    'datayayasan.create': 'Input Data Yayasan',
};

const pageTitle = computed(() => {
    // Mengambil nama route saat ini dari Ziggy (route().current())
    const currentRoute = route().current();
    
    // Mencari di map, jika tidak ada, lakukan format string otomatis atau fallback
    if (titleMap[currentRoute]) {
        return titleMap[currentRoute];
    }

    // Fallback: Mengubah 'video.index' menjadi 'Video Index' secara otomatis
    return currentRoute 
        ? currentRoute.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Halaman Yayasan';
});
</script>
