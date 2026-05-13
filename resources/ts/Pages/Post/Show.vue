<template>
    <div class="min-h-screen bg-white py-12">
        <!-- Progress Bar Membaca -->
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
                <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
                    <span class="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
                        {{ post.category || 'Berita Yayasan' }}
                    </span>
                    <span class="text-gray-300">•</span>
                    <!-- Menampilkan Published At -->
                    <div class="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Terbit: {{ formatDate(post.published_at || post.created_at) }}
                    </div>
                </div>

                <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                    {{ post.title }}
                </h1>

                <!-- Info Penulis -->
                <div class="flex items-center justify-center md:justify-start space-x-3 border-y border-gray-100 py-6">
                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold overflow-hidden">
                        <span v-if="!post.author_avatar">{{ post.author_name?.charAt(0) || 'A' }}</span>
                        <img v-else :src="post.author_avatar" class="w-full h-full object-cover">
                    </div>
                    <div class="text-left">
                        <p class="text-sm font-bold text-gray-900">{{ post.author_name || 'Admin Yayasan' }}</p>
                        <p class="text-xs text-gray-500 italic">Kontributor Dar Al Furqon Al Hakim</p>
                    </div>
                </div>
            </header>

            <!-- Gambar Utama -->
            <div v-if="post.image_url" class="mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img :src="post.image_url" :alt="post.title" class="w-full h-auto object-cover" />
            </div>

            <!-- Isi Artikel -->
            <section class="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed antialiased">
                <div v-html="post.content"></div>
            </section>

            <!-- Footer Artikel -->
            <footer class="mt-12 pt-8 border-t border-gray-100">
                <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mb-8">
                    <span v-for="tag in post.tags" :key="tag" class="text-xs bg-gray-50 text-gray-500 border border-gray-200 px-3 py-1 rounded-md">
                        #{{ tag }}
                    </span>
                </div>

                <!-- Box CTA Donasi -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 text-center border border-blue-100">
                    <h3 class="text-lg font-bold text-blue-900 mb-2">Mari Berbagi Kebaikan</h3>
                    <p class="text-sm text-blue-700 mb-6 max-w-md mx-auto">Zakat, Infaq, dan Sedekah Anda membantu operasional pendidikan santri penghafal Al-Qur'an.</p>
                    <Link :href="route('datayayasan.show', 1)" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-md shadow-blue-200">
                        Informasi Rekening
                    </Link>
                </div>
            </footer>
        </article>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Link } from '@inertiajs/vue3';

// Update Interface untuk menyertakan published_at
interface Post {
    id: number;
    title: string;
    content: string;
    author_name?: string;
    author_avatar?: string;
    category?: string;
    image_url?: string;
    tags?: string[];
    created_at: string;
    published_at: string; // Tambahkan ini
}

const props = defineProps<{
    post: Post;
}>();

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

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
</script>

<style>
/* Memastikan konten HTML dari editor terlihat rapi */
.prose h2 { @apply text-2xl font-bold text-gray-900 mt-10 mb-4; }
.prose h3 { @apply text-xl font-bold text-gray-800 mt-8 mb-3; }
.prose p { @apply mb-6 text-gray-700 leading-8; }
.prose blockquote { @apply border-l-4 border-blue-600 pl-6 italic text-gray-700 bg-blue-50/50 py-2 my-8 rounded-r-lg; }
.prose ul { @apply list-disc list-inside mb-6 space-y-2; }
.prose ol { @apply list-decimal list-inside mb-6 space-y-2; }
.prose img { @apply rounded-xl my-8; }
</style>
