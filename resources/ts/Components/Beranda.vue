<template>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <!-- Kartu Ucapan Selamat -->
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8 text-center border-b-4 border-blue-600">
                <h1 class="text-3xl font-extrabold text-gray-900 mb-2">
                    {{ islamicGreeting }}
                </h1>
                <p class="text-xl text-blue-600 font-medium">
                    {{ timeGreeting }}, Selamat Datang di Sistem Informasi
                </p>
                <h2 class="text-2xl font-bold text-gray-800 mt-2">
                    Yayasan Dar Al Furqon Al Hakim
                </h2>
                
                <div class="mt-8 flex justify-center">
                    <div class="h-1 w-24 bg-gray-200 rounded"></div>
                </div>
                
                <p class="mt-6 text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    "Membina generasi qur'ani yang berakhlak mulia, berilmu luas, dan bermanfaat bagi sesama."
                </p>
            </div>

            <!-- Statistik Singkat atau Konten Lain -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <!-- Tambahkan konten dashboard atau informasi publik di sini -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// 1. Logika Salam Islami (Tetap)
const islamicGreeting = "Assalamu'alaikum Warahmatullahi Wabarakatuh";

// 2. Logika Salam Berdasarkan Waktu
const timeGreeting = computed(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 11) {
        return "Selamat Pagi";
    } else if (hour >= 11 && hour < 15) {
        return "Selamat Siang";
    } else if (hour >= 15 && hour < 18) {
        return "Selamat Sore";
    } else {
        return "Selamat Malam";
    }
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
