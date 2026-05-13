<template>
    <div class="max-w-5xl mx-auto py-8">
        <!-- Tombol Kembali -->
        <div class="mb-6">
            <Link 
                :href="route('video.index')" 
                class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Daftar Video
            </Link>
        </div>

        <!-- Wadah Pemutar Video (16:9 Aspect Ratio) -->
        <div class="bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-800 aspect-video">
            <iframe 
                class="w-full h-full"
                :src="`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0`" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
            ></iframe>
        </div>

        <!-- Informasi Video -->
        <div class="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h1 class="text-2xl font-extrabold text-gray-900 leading-tight">
                {{ video.judul }}
            </h1>
            <div class="mt-4 flex items-center text-sm text-gray-500 border-t pt-4">
                <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Dipublikasikan pada {{ formatDate(video.created_at) }}
                </span>
                <span class="mx-3">•</span>
                <span class="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    ID: #{{ video.no_video }}
                </span>
            </div>
            
            <div class="mt-6 text-gray-700 leading-relaxed">
                <p v-if="video.deskripsi">{{ video.deskripsi }}</p>
                <p v-else class="italic text-gray-400 text-sm">Tidak ada deskripsi untuk video ini.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Hapus impor usePage karena sudah tidak digunakan
import { Link } from '@inertiajs/vue3';

// Props yang dikirim dari VideoController@show
interface Video {
    no_video: number;
    judul: string;
    youtube_id: string; // ID unik YouTube, misal: 'dQw4w9WgXcQ'
    deskripsi?: string;
    created_at: string;
}

const props = defineProps<{
    video: Video;
}>();

// HAPUS bagian ini:
// const page = usePage();
// const route = page.props.route;

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
</script>
