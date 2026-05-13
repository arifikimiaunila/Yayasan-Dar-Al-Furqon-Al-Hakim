<template>
    <div class="min-h-screen bg-white py-12 antialiased">
        <!-- Progress Bar Membaca -->
        <div class="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
            <div 
                class="h-full bg-blue-600 transition-all duration-150" 
                :style="{ width: readingProgress + '%' }"
            ></div>
        </div>

        <article class="max-w-3xl mx-auto px-4 sm:px-6">
            <!-- Navigasi Kembali -->
            <div class="mb-8">
                <Link 
                    :href="route('home')" 
                    class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Beranda
                </Link>
            </div>

            <!-- Header Artikel -->
            <header class="mb-10 text-center md:text-left">
                <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                    <span class="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-md border border-blue-100">
                        {{ post.category || 'Artikel' }}
                    </span>
                    <span class="text-gray-300">|</span>
                    <div class="flex items-center text-sm text-gray-500 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Terbit: {{ formatDate(post.published_at) }}
                    </div>
                </div>

                <!-- Judul Utama (title) -->
                <h1 class="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                    {{ post.title }}
                </h1>

                <!-- Info Penulis -->
                <div class="flex items-center justify-center md:justify-start space-x-4 border-t border-gray-100 pt-8">
                    <div class="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold shadow-sm">
                        {{ post.author_name?.charAt(0) || 'A' }}
                    </div>
                    <div class="text-left">
                        <p class="text-base font-bold text-gray-900 leading-none mb-1">{{ post.author_name || 'Admin' }}</p>
                        <p class="text-xs text-gray-500">Penulis di Dar Al Furqon Al Hakim</p>
                    </div>
                </div>
            </header>

            <!-- Gambar Utama -->
            <div v-if="post.image_url" class="mb-12 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <img :src="post.image_url" :alt="post.title" class="w-full h-auto object-cover" />
            </div>

            <!-- Isi Artikel (body) -->
            <section class="prose prose-lg prose-blue max-w-none text-gray-800">
                <div v-html="post.body"></div>
            </section>

            <!-- Footer & Tag -->
            <footer class="mt-16 pt-10 border-t border-gray-100">
                <div v-if="post.tags" class="flex flex-wrap gap-2 mb-10">
                    <span v-for="tag in post.tags" :key="tag" class="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200">
                        #{{ tag }}
                    </span>
                </div>

                <!-- Call to Action -->
                <div class="bg-gray-900 rounded-3xl p-8 text-center text-white shadow-2xl">
                    <h3 class="text-xl font-bold mb-3 text-blue-400">Dukung Dakwah Kami</h3>
                    <p class="text-gray-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                        Kontribusi Anda sangat berarti bagi kelangsungan program Tahfidz Al-Qur'an di Yayasan kami.
                    </p>
                    <Link :href="route('datayayasan.show', 1)" class="inline-block bg-white text-gray-900 px-8 py-3 rounded-xl font-black text-sm hover:bg-blue-400 transition-colors uppercase tracking-widest">
                        Donasi Sekarang
                    </Link>
                </div>
            </footer>
        </article>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Link } from '@inertiajs/vue3';

// Sinkronisasi Interface dengan Database
interface Post {
    id: number;
    title: string;      // Menggunakan title
    body: string;       // Menggunakan body
    author_name?: string;
    category?: string;
    image_url?: string;
    tags?: string[];
    published_at: string; // Menggunakan published_at
}

const props = defineProps<{
    post: Post;
}>();

// Logic Progress Bar
const readingProgress = ref(0);
const updateScroll = () => {
    const pixels = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = (pixels / (docHeight - winHeight)) * 100;
    readingProgress.value = scrollPercent;
};

onMounted(() => window.addEventListener('scroll', updateScroll));
onUnmounted(() => window.removeEventListener('scroll', updateScroll));

// Format Tanggal Terbit
const formatDate = (dateString: string) => {
    if (!dateString) return 'Belum diterbitkan';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) + ' WIB';
};
</script>

<style>
/* Kustomisasi Tipografi Prose */
.prose h2 { @apply text-3xl font-black text-gray-900 mt-12 mb-6 tracking-tight; }
.prose h3 { @apply text-2xl font-bold text-gray-800 mt-10 mb-4; }
.prose p { @apply mb-8 text-gray-700 leading-8 text-[1.125rem]; }
.prose blockquote { @apply border-l-8 border-blue-600 pl-8 italic text-gray-800 bg-blue-50 py-6 my-10 rounded-r-2xl; }
.prose ul { @apply list-disc list-outside ml-6 mb-8 space-y-3 text-gray-700; }
.prose ol { @apply list-decimal list-outside ml-6 mb-8 space-y-3 text-gray-700; }
.prose strong { @apply font-black text-gray-900; }
.prose img { @apply rounded-2xl shadow-lg my-12; }
</style>
