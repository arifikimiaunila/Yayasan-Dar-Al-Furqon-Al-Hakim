<template>
    <div class="max-w-5xl mx-auto py-10 px-4">
        <!-- Breadcrumb & Header -->
        <div class="mb-8">
            <Link :href="route('post.edit')" class="text-sm text-blue-600 hover:underline flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Kembali ke Daftar Artikel
            </Link>
            <h1 class="text-3xl font-black text-gray-900 tracking-tight">Edit Artikel</h1>
        </div>

        <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <form @submit.prevent="updatePost" class="p-8 md:p-12 space-y-8">
                
                <!-- Section 1: Judul -->
                <div>
                    <label class="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Judul Artikel</label>
                    <input 
                        type="text" 
                        v-model="form.title"
                        class="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-xl font-bold"
                        placeholder="Masukkan judul yang menarik..."
                    >
                    <div v-if="form.errors.title" class="text-red-500 text-xs mt-2 font-bold">{{ form.errors.title }}</div>
                </div>

                <!-- Section 2: Konten (Body) -->
                <div>
                    <label class="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Isi Artikel</label>
                    <textarea 
                        v-model="form.body"
                        rows="12"
                        class="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-serif text-lg leading-relaxed"
                        placeholder="Tuliskan isi artikel Anda di sini..."
                    ></textarea>
                    <div v-if="form.errors.body" class="text-red-500 text-xs mt-2 font-bold">{{ form.errors.body }}</div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-50">
                    <!-- Section 3: Status Publikasi -->
                    <div>
                        <label class="block text-sm font-black text-gray-700 uppercase tracking-widest mb-4">Status Publikasi</label>
                        <div class="flex items-center space-x-4">
                            <button 
                                type="button"
                                @click="form.published = !form.published"
                                :class="form.published ? 'bg-green-500' : 'bg-gray-300'"
                                class="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none"
                            >
                                <span 
                                    :class="form.published ? 'translate-x-7' : 'translate-x-1'"
                                    class="inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md"
                                />
                            </button>
                            <span class="font-bold text-sm" :class="form.published ? 'text-green-600' : 'text-gray-400'">
                                {{ form.published ? 'PUBLISHED (Aktif)' : 'DRAFT (Tersembunyi)' }}
                            </span>
                        </div>
                    </div>

                    <!-- Section 4: Tanggal Terbit -->
                    <div>
                        <label class="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Tanggal Terbit</label>
                        <input 
                            type="datetime-local" 
                            v-model="form.published_at"
                            class="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold"
                        >
                        <div v-if="form.errors.published_at" class="text-red-500 text-xs mt-2 font-bold">{{ form.errors.published_at }}</div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <button 
                        type="button" 
                        @click="deletePost"
                        class="text-red-400 hover:text-red-600 font-bold text-sm transition-colors order-2 md:order-1"
                    >
                        Hapus Artikel Secara Permanen
                    </button>

                    <div class="flex items-center space-x-4 w-full md:w-auto order-1 md:order-2">
                        <Link :href="route('post.edit')" class="px-8 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors">
                            Batal
                        </Link>
                        
                        <!-- TOMBOL UPDATE -->
                        <button 
                            type="submit"
                            :disabled="form.processing"
                            class="flex-1 md:flex-none px-10 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
                        >
                            <svg v-if="form.processing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {{ form.processing ? 'Memperbarui...' : 'Update Artikel' }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Link, useForm, router } from '@inertiajs/vue3';
import { onMounted } from 'vue';

// Definisikan Props yang diterima dari Controller
const props = defineProps<{
    post: {
        id: number;
        title: string;
        body: string;
        published: boolean;
        published_at: string;
    }
}>();

// Inisialisasi Formulir Inertia
const form = useForm({
    title: props.post.title,
    body: props.post.body,
    published: Boolean(props.post.published),
    published_at: props.post.published_at ? props.post.published_at.substring(0, 16) : '', // Format untuk datetime-local
});

// Fungsi untuk Mengirim Data Update
const updatePost = () => {
    form.put(route('post.update', props.post.id), {
        onSuccess: () => {
            // Notifikasi sukses bisa ditangani di sini atau flash message
        },
    });
};

// Fungsi untuk Menghapus Artikel
const deletePost = () => {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.')) {
        router.delete(route('post.destroy', props.post.id));
    }
};
</script>

<style scoped>
/* Menghilangkan border default input untuk tampilan yang lebih modern */
input:focus, textarea:focus {
    outline: none;
}
</style>
