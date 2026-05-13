<template>
    <div class="max-w-7xl mx-auto py-8">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
            <div>
                <h2 class="text-2xl font-bold text-gray-800">Pilih Video</h2>
                <p class="text-sm text-gray-500 mt-1">Silakan pilih video dari daftar di bawah ini untuk melihat detail, mengupdate, atau menghapusnya.</p>
            </div>
            
            <!-- Tombol Aksi Utama -->
            <div class="flex space-x-3">
                <Link 
                    :href="route('video.create')" 
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Buat Video Baru
                </Link>
            </div>
        </div>

        <!-- Tabel Pemilihan Video -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-600">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th scope="col" class="px-4 py-4 font-bold text-center">ID</th>
                            <th scope="col" class="px-4 py-4 font-bold text-center">No. Video</th>
                            <th scope="col" class="px-4 py-4 font-bold">Judul</th>
                            <th scope="col" class="px-4 py-4 font-bold">Link (YT ID)</th>
                            <th scope="col" class="px-4 py-4 font-bold text-center">Published</th>
                            <th scope="col" class="px-4 py-4 font-bold">Uploader</th>
                            <th scope="col" class="px-4 py-4 font-bold">Tanggal</th>
                            <th scope="col" class="px-4 py-4 font-bold text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="video in videos" :key="video.id" class="hover:bg-amber-50/50 transition-colors">
                            
                            <td class="px-4 py-3 text-center font-mono text-gray-400">
                                {{ video.id }}
                            </td>

                            <td class="px-4 py-3 text-center font-bold text-gray-700">
                                #{{ video.no_video }}
                            </td>

                            <td class="px-4 py-3 font-medium text-gray-900 truncate max-w-xs" :title="video.judul">
                                {{ video.judul }}
                            </td>

                            <td class="px-4 py-3 font-mono text-xs">
                                <a :href="`https://youtube.com/watch?v=${video.youtube_id}`" target="_blank" class="text-blue-500 hover:text-blue-700 hover:underline flex items-center">
                                    {{ video.youtube_id }}
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </td>

                            <td class="px-4 py-3 text-center">
                                <span v-if="video.is_published" class="bg-green-100 text-green-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                    Yes
                                </span>
                                <span v-else class="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                    Draft
                                </span>
                            </td>

                            <td class="px-4 py-3 text-xs font-medium text-gray-500">
                                {{ video.uploader_name || 'Admin' }}
                            </td>

                            <td class="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                                {{ formatDateTime(video.created_at) }}
                            </td>

                            <!-- Aksi: HANYA TOMBOL PILIH (CHOOSE) -->
                            <td class="px-4 py-3 text-center">
                                <Link 
                                    :href="route('video.choose', { no_video: video.no_video })" 
                                    class="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded text-xs font-bold transition shadow-sm whitespace-nowrap"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Pilih Video
                                </Link>
                            </td>
                        </tr>

                        <tr v-if="videos.length === 0">
                            <td colspan="8" class="px-6 py-12 text-center text-gray-400 italic">
                                Belum ada data video. Silakan klik "Buat Video Baru".
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

interface Video {
    id: number;
    no_video: number;
    judul: string;
    youtube_id: string; 
    is_published: boolean; 
    uploader_name: string; 
    created_at: string;
}

const props = defineProps<{
    videos: Video[];
}>();

const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
};
</script>
