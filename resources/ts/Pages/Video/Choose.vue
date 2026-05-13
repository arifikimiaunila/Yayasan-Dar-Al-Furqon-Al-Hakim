<template>
    <div class="max-w-4xl mx-auto py-8">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-end">
            <div>
                <h2 class="text-2xl font-bold text-gray-800">Kelola Video #{{ video.no_video }}</h2>
                <p class="text-sm text-gray-500 mt-1">Perbarui informasi video atau hapus dari sistem.</p>
            </div>
            <!-- Status Badge -->
            <span v-if="form.is_published" class="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                Status: TAYANG
            </span>
            <span v-else class="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full border border-gray-200">
                Status: DRAFT
            </span>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <form @submit.prevent="updateVideo" class="p-6 md:p-8">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Kolom Kiri: Input Data -->
                    <div class="space-y-6">
                        
                        <!-- Input: Judul -->
                        <div>
                            <label for="judul" class="block text-sm font-medium text-gray-700">Judul Video <span class="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                id="judul" 
                                v-model="form.judul" 
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                required
                            >
                            <p v-if="form.errors.judul" class="mt-1 text-xs text-red-600">{{ form.errors.judul }}</p>
                        </div>

                        <!-- Input: Link YouTube -->
                        <div>
                            <label for="youtube_link" class="block text-sm font-medium text-gray-700">Link YouTube <span class="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                id="youtube_link" 
                                v-model="rawYoutubeLink" 
                                @input="extractYoutubeId"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                required
                            >
                            <p class="mt-1 text-xs text-gray-500">Ubah link jika ingin mengganti video.</p>
                            <p v-if="form.errors.youtube_id" class="mt-1 text-xs text-red-600">{{ form.errors.youtube_id }}</p>
                        </div>

                        <!-- Input: Tanggal Upload -->
                        <div>
                            <label for="tanggal_upload" class="block text-sm font-medium text-gray-700">Tanggal Upload <span class="text-red-500">*</span></label>
                            <input 
                                type="date" 
                                id="tanggal_upload" 
                                v-model="form.tanggal_upload" 
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                required
                            >
                            <p class="mt-1 text-xs text-gray-500">Tanggal rilis asli di YouTube.</p>
                            <p v-if="form.errors.tanggal_upload" class="mt-1 text-xs text-red-600">{{ form.errors.tanggal_upload }}</p>
                        </div>

                        <!-- Input: Status Publikasi (Toggle On/Off) -->
                        <div>
                            <span class="block text-sm font-medium text-gray-700 mb-2">Publikasi (Tayang di Website)</span>
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" v-model="form.is_published" class="sr-only peer">
                                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                                <span class="ml-3 text-sm font-bold" :class="form.is_published ? 'text-amber-600' : 'text-gray-500'">
                                    {{ form.is_published ? 'ON (Publik)' : 'OFF (Draft)' }}
                                </span>
                            </label>
                        </div>

                    </div>

                    <!-- Kolom Kanan: Preview & Deskripsi -->
                    <div class="space-y-6">
                        
                        <!-- Preview Video -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Preview Video Saat Ini</label>
                            <div class="w-full aspect-video bg-black rounded-lg border border-gray-800 flex items-center justify-center overflow-hidden shadow-md">
                                <iframe 
                                    v-if="form.youtube_id"
                                    class="w-full h-full"
                                    :src="`https://www.youtube.com/embed/${form.youtube_id}?rel=0`" 
                                    frameborder="0" 
                                    allowfullscreen
                                ></iframe>
                                <div v-else class="text-red-400 text-sm flex flex-col items-center">
                                    Link Video Tidak Valid
                                </div>
                            </div>
                        </div>

                        <!-- Input: Deskripsi -->
                        <div>
                            <label for="deskripsi" class="block text-sm font-medium text-gray-700">Deskripsi Singkat (Opsional)</label>
                            <textarea 
                                id="deskripsi" 
                                v-model="form.deskripsi" 
                                rows="3" 
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                            ></textarea>
                            <p v-if="form.errors.deskripsi" class="mt-1 text-xs text-red-600">{{ form.errors.deskripsi }}</p>
                        </div>

                    </div>
                </div>

                <!-- Bagian Bawah: Tombol Aksi -->
                <div class="mt-8 pt-5 border-t border-gray-200 flex flex-col-reverse md:flex-row items-center justify-between">
                    
                    <!-- Tombol Hapus (Delete) -->
                    <button 
                        type="button" 
                        @click="hapusVideo"
                        class="w-full md:w-auto mt-3 md:mt-0 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Hapus Permanen
                    </button>

                    <div class="flex items-center space-x-3 w-full md:w-auto">
                        <!-- Tombol Batal -->
                        <Link 
                            :href="route('video.edit')" 
                            class="flex-1 md:flex-none text-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
                        >
                            Batal
                        </Link>
                        
                        <!-- Tombol Update -->
                        <button 
                            type="submit" 
                            :disabled="form.processing"
                            class="flex-1 md:flex-none flex items-center justify-center px-6 py-2 text-sm font-bold text-white bg-amber-500 border border-transparent rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            <svg v-if="form.processing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {{ form.processing ? 'Menyimpan...' : 'Update Data' }}
                        </button>
                    </div>
                </div>
                
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useForm, Link, router } from '@inertiajs/vue3';

// Definisi properti data video yang dikirim dari controller
interface Video {
    no_video: number;
    judul: string;
    youtube_id: string;
    deskripsi?: string;
    is_published: boolean;
    tanggal_upload: string;
}

const props = defineProps<{
    video: Video;
}>();

// State form diisi dengan data video saat ini
const form = useForm({
    judul: props.video.judul,
    youtube_id: props.video.youtube_id,
    deskripsi: props.video.deskripsi || '',
    is_published: Boolean(props.video.is_published),
    tanggal_upload: props.video.tanggal_upload,
});

// Menampilkan format link utuh di input teks
const rawYoutubeLink = ref(`https://www.youtube.com/watch?v=${props.video.youtube_id}`);

// Mengekstrak ID YouTube jika admin mengganti link
const extractYoutubeId = () => {
    const url = rawYoutubeLink.value;
    let videoId = '';

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        videoId = match[2];
    } else if (url.length === 11) {
        videoId = url;
    }

    form.youtube_id = videoId;
};

// Fungsi Update
const updateVideo = () => {
    if (!form.youtube_id) {
        alert("Link YouTube tidak valid. Harap periksa kembali.");
        return;
    }

    // Mengirim PUT request ke route video.update
    form.put(route('video.update', { no_video: props.video.no_video }), {
        preserveScroll: true,
        onSuccess: () => {
            // Berhasil update, inertia akan me-redirect berdasarkan controller
        }
    });
};

// Fungsi Delete
const hapusVideo = () => {
    if (confirm(`Peringatan: Apakah Anda yakin ingin menghapus video "${props.video.judul}" secara permanen? Data yang dihapus tidak bisa dikembalikan.`)) {
        // Mengirim DELETE request ke route video.delete
        router.delete(route('video.delete', { no_video: props.video.no_video }), {
            onSuccess: () => {
                // Di-redirect kembali ke video.edit oleh controller
            }
        });
    }
};
</script>
