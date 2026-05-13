<template>
    <div class="min-h-screen bg-white py-12">
        <!-- Progress Bar Membaca (Opsional) -->
        <div class="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
            <div 
                class="h-full bg-blue-600 transition-all duration-150" 
                :style="{ width: readingProgress + '%' }"
            ></div>
        </div>

        <article class="max-w-3xl mx-auto px-4 sm:px-6">
            <!-- Tombol Kembali -->
            <div class="mb-8">
                <Link 
                    :href="route('home')" 
                    class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Beranda
                </Link>
            </div>

            <!-- Header Artikel -->
            <header class="mb-10 text-center md:text-left">
                <div class="flex items-center justify-center md:justify-start space-x-2 mb-4">
                    <span class="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
                        {{ post.category || 'Berita Yayasan' }}
                    </span>
                    <span class="text-gray-300">•</span>
                    <time class="text-sm text-gray-500">{{ formatDate(post.created_at) }}</time>
                </div>

                <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                    {{ post.title }}
                </h1>

                <!-- Info Penulis -->
                <div class="flex items-center justify-center md:justify-start space-x-3 border-y border-gray-100 py-6">
                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                        {{ post.author_name?.charAt(0) || 'A' }}
                    </div>
                    <div class="text-left">
                        <p class="text-sm font-bold text-gray-900">{{ post.author_name || 'Admin Yayasan' }}</p>
                        <p class="text-xs text-gray-500 italic">Ditulis untuk Dar Al Furqon Al Hakim</p>
                    </div>
                </div>
            </header>

            <!-- Gambar Utama (Jika Ada) -->
            <div v-if="post.image_url" class="mb-10 rounded-2xl overflow-hidden shadow-lg">
                <img :src="post.image_url" :alt="post.title" class="w-full h-auto object-cover" />
            </div>

            <!-- Isi Artikel (Konten Utama) -->
            <section class="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed">
                <!-- Gunakan v-html jika konten dikirim dalam bentuk HTML dari editor -->
                <div v-html="post.content"></div>
            </section>

            <!-- Footer Artikel / Tag -->
            <footer class="mt-12 pt-8 border-t border-gray-100">
                <div class="flex flex-wrap gap-2 mb-8">
                    <span v-for="tag in post.tags" :key="tag" class="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded">
                        #{{ tag }}
                    </span>
                </div>

                <!-- Box Donasi / Call to Action -->
                <div class="bg-blue-50 rounded-2xl p-6 md:p-8 text-center">
                    <h3 class="text-lg font-bold text-blue-900 mb-2">Tertarik berbagi kebaikan?</h3>
                    <p class="text-sm text-blue-700 mb-4">Dukung program pendidikan Al-Qur'an kami untuk generasi masa depan.</p>
                    <Link :href="route('datayayasan.show', 1)" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-700 transition">
                        Info Donasi
                    </Link>
                </div>
            </footer>
        </article>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Link } from '@inertiajs/vue3';

// Definisi Props
interface Post {
    id: number;
    title: string;
    content: string; // Bisa berisi HTML
    author_name?: string;
    category?: string;
    image_url?: string;
    tags?: string[];
    created_at: string;
}

const props = defineProps<{
    post: Post;
}>();

// Logika Progress Bar
const readingProgress = ref(0);
const updateScroll = () => {
    const pixels = window.scrollY;
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = (pixels / (docHeight - winHeight)) * 100;
    readingProgress.value = scrollPercent;
};

onMounted(() => window.addEventListener('scroll', updateScroll));
onUnmounted(() => window.removeEventListener('scroll', updateScroll));

// Format Tanggal
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};
</script>

<style>
/* Styling tambahan untuk konten HTML (v-html) */
.prose h2 {
    @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
}
.prose p {
    @apply mb-6 text-gray-700;
}
.prose blockquote {
    @apply border-l-4 border-blue-500 pl-4 italic text-gray-600 my-8;
}
</style>
