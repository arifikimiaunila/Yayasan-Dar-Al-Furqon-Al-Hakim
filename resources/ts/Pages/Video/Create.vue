<template>
    <div class="max-w-4xl mx-auto py-8">
        <!-- Header -->
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Upload Video Baru</h2>
            <p class="text-sm text-gray-500 mt-1">Masukkan detail video YouTube yang ingin ditampilkan di website yayasan.</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <form @submit.prevent="submit" class="p-6 md:p-8">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Kolom Kiri: Input Form Utama -->
                    <div class="space-y-6">
                        
                        <!-- Input: Judul -->
                        <div>
                            <label for="judul" class="block text-sm font-medium text-gray-700">Judul Video <span class="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                id="judul" 
                                v-model="form.judul" 
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="Masukkan judul video..."
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
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="https://www.youtube.com/watch?v=..."
                                required
                            >
                            <p class="mt-1 text-xs text-gray-500">Paste link YouTube. Sistem otomatis membaca ID-nya.</p>
                            <p v-if="form.errors.youtube_id" class="mt-1 text-xs text-red-600">{{ form.errors.youtube_id }}</p>
                        </div>

                        <!-- Input: Tanggal Upload -->
                        <div>
                            <label for="tanggal_upload" class="block text-sm font-medium text-gray-700">Tanggal Upload Video <span class="text-red-500">*</span></label>
                            <input 
                                type="date" 
                                id="tanggal_upload" 
                                v-model="form.tanggal_upload" 
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                required
                            >
                            <p class="mt-1 text-xs text-gray-500">Sesuaikan dengan tanggal rilis video di YouTube.</p>
                            <p v-if="form.errors.tanggal_upload" class="mt-1 text-xs text-red-600">{{ form.errors.tanggal_upload }}</p>
                        </div>

                        <!-- Input: Status Publikasi (Toggle On/Off) -->
                        <div>
                            <span class="block text-sm font-medium text-gray-700 mb-2">Status Publikasi</span>
                            <label class="flex items-center cursor-pointer">
                                <!-- Hidden Checkbox -->
                                <input type="checkbox" v-model="form.is_published" class="sr-only peer">
                                <!-- Toggle Background -->
                                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <!-- Label Teks -->
                                <span class="ml-3 text-sm font-bold" :class="form.is_published ? 'text-blue-600' : 'text-gray-500'">
                                    {{ form.is_published ? 'ON (Tayang)' : 'OFF (Draft)' }}
                                </span>
                            </label>
                        </div>

                    </div>

                    <!-- Kolom Kanan: Preview Video -->
                    <div class="space-y-6">
                        
                        <!-- Auto-Preview Video -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Preview Video</label>
                            <div class="w-full aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner">
                                <iframe 
                                    v-if="form.youtube_id"
                                    class="w-full h-full"
                                    :src="`https://www.youtube.com/embed/${form.youtube_id}?rel=0`" 
                                    frameborder="0" 
                                    allowfullscreen
                                ></iframe>
                                <div v-else class="text-gray-400 text-sm flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Preview akan muncul setelah link dimasukkan
                                </div>
                            </div>
                        </div>

                        <!-- Input: Deskripsi Opsional -->
                        <div>
                            <label for="deskripsi" class="block text-sm font-medium text-gray-700">Deskripsi Singkat (Opsional)</label>
                            <textarea 
                                id="deskripsi" 
                                v-model="form.deskripsi" 
                                rows="3" 
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="Tambahkan keterangan singkat..."
                            ></textarea>
                            <p v-if="form.errors.deskripsi" class="mt-1 text-xs text-red-600">{{ form.errors.deskripsi }}</p>
                        </div>

                    </div>
                </div>

                <!-- Bagian Bawah: Tombol Aksi Create -->
                <div class="mt-8 pt-5 border-t border-gray-200 flex items-center justify-end space-x-3">
                    <Link 
                        :href="route('video.edit')" 
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                    >
                        Batal
                    </Link>
                    
                    <!-- Tombol Create -->
                    <button 
                        type="submit" 
                        :disabled="form.processing"
                        class="px-6 py-2 text-sm font-bold text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-sm"
                    >
                        <svg v-if="form.processing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        {{ form.processing ? 'Menyimpan Data...' : 'Create Video' }}
                    </button>
                </div>
                
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm, Link } from '@inertiajs/vue3';

// Mengambil tanggal hari ini dalam format YYYY-MM-DD untuk default value
const today = new Date().toISOString().split('T')[0];

const form = useForm({
    judul: '',
    youtube_id: '',
    deskripsi: '',
    is_published: true, // Default tayang (ON)
    tanggal_upload: today, // Default otomatis hari ini
});

const rawYoutubeLink = ref('');

const extractYoutubeId = () => {
    const url = rawYoutubeLink.value;
    let videoId = '';

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        videoId = match[2];
    } else {
        if (url.length === 11) {
            videoId = url;
        }
    }

    form.youtube_id = videoId;
};

const submit = () => {
    if (!form.youtube_id) {
        alert("Link YouTube tidak valid. Harap masukkan link yang benar sebelum mempublikasikan.");
        return;
    }

    form.post(route('video.store'), {
        preserveScroll: true,
        onSuccess: () => {
            // Setelah berhasil, form dikosongkan dan dialihkan ke daftar video
            form.reset();
            rawYoutubeLink.value = '';
        },
    });
};
</script>
