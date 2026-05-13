<template>
    <div class="max-w-7xl mx-auto py-8">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
            <div>
                <h2 class="text-2xl font-black text-gray-900 tracking-tight">Manajemen Artikel</h2>
                <p class="text-sm text-gray-500 mt-1">Pilih artikel di bawah ini untuk diperbarui atau dikelola lebih lanjut.</p>
            </div>
            
            <Link 
                :href="route('post.create')" 
                class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all active:scale-95"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Tulis Artikel Baru
            </Link>
        </div>

        <!-- Tabel Konten -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left">
                    <thead class="text-xs text-gray-400 uppercase bg-gray-50/50 border-b border-gray-100 font-black tracking-widest">
                        <tr>
                            <th scope="col" class="px-6 py-5 text-center w-16">No</th>
                            <th scope="col" class="px-6 py-5">Judul & Cuplikan</th>
                            <th scope="col" class="px-6 py-5 w-40 text-center">Status</th>
                            <th scope="col" class="px-6 py-5 w-48">Tanggal Terbit</th>
                            <th scope="col" class="px-6 py-5 text-center w-32">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr v-for="(post, index) in posts" :key="post.id" class="hover:bg-blue-50/30 transition-colors group">
                            <!-- Nomor -->
                            <td class="px-6 py-4 text-center font-mono text-gray-400">
                                {{ index + 1 }}
                            </td>

                            <!-- Title & Body (Snippet) -->
                            <td class="px-6 py-4">
                                <div class="flex flex-col">
                                    <span class="text-gray-900 font-bold text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                                        {{ post.title }}
                                    </span>
                                    <span class="text-gray-400 text-xs mt-1 line-clamp-1 italic" v-html="stripHtml(post.body)"></span>
                                </div>
                            </td>

                            <!-- Published (Boolean Switch Look) -->
                            <td class="px-6 py-4 text-center">
                                <span 
                                    v-if="post.published" 
                                    class="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-tighter border border-green-100"
                                >
                                    <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                                    Published
                                </span>
                                <span 
                                    v-else 
                                    class="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-tighter border border-gray-200"
                                >
                                    Draft
                                </span>
                            </td>

                            <!-- Published At -->
                            <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-medium">
                                {{ formatDate(post.published_at) }}
                            </td>

                            <!-- Tombol Pilih (Choose) -->
                            <td class="px-6 py-4 text-center">
                                <Link 
                                    :href="route('post.choose', post.id)" 
                                    class="inline-flex items-center justify-center bg-gray-900 hover:bg-blue-600 text-white w-10 h-10 rounded-xl transition-all shadow-sm shadow-gray-200 hover:shadow-blue-200"
                                    title="Pilih Artikel ini"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </td>
                        </tr>

                        <!-- Empty State -->
                        <tr v-if="posts.length === 0">
                            <td colspan="5" class="px-6 py-20 text-center">
                                <div class="flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                    <p class="text-gray-400 italic">Belum ada artikel yang ditulis.</p>
                                </div>
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

// Interface Data Post
interface Post {
    id: number;
    title: string;
    body: string;
    published: boolean;
    published_at: string;
}

const props = defineProps<{
    posts: Post[];
}>();

// Fungsi membersihkan tag HTML untuk cuplikan body
const stripHtml = (html: string) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};

// Format Tanggal
const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};
</script>
