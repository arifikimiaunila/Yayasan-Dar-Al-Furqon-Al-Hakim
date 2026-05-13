<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Header Tabel -->
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Daftar Video Yayasan
            </h3>
            <span class="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                {{ videos.length }} Video Tersedia
            </span>
        </div>

        <!-- Tabel Video -->
        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th scope="col" class="px-6 py-4 font-bold text-center w-20">No. Video</th>
                        <th scope="col" class="px-6 py-4 font-bold">Judul Video</th>
                        <th scope="col" class="px-6 py-4 font-bold">Tanggal Upload</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-for="video in videos" :key="video.no_video" class="hover:bg-blue-50/50 transition-colors group">
                        <td class="px-6 py-4 text-center font-mono text-gray-400">
                            #{{ video.no_video }}
                        </td>
                        <td class="px-6 py-4">
                            <!-- Judul Klikable yang menuju ke halaman Video Show -->
                            <Link 
                                :href="route('video.show', video.no_video)" 
                                class="text-gray-900 font-semibold hover:text-blue-600 transition-colors flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-300 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {{ video.judul }}
                            </Link>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-gray-600">
                            {{ formatDate(video.created_at) }}
                        </td>
                    </tr>

                    <!-- Jika Data Kosong -->
                    <tr v-if="videos.length === 0">
                        <td colspan="3" class="px-6 py-10 text-center text-gray-400 italic">
                            Belum ada video yang diunggah.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

const route = (name: string, params?: unknown) => (window as any).route(name, params);

// Definisi Props (Data dikirim dari VideoController@index)
interface Video {
    no_video: number;
    judul: string;
    created_at: string;
}

const props = defineProps<{
    videos: Video[];
}>();

// Fungsi Format Tanggal (Contoh: 13 Mei 2026)
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};
</script>
