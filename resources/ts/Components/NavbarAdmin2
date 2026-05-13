<template>
    <nav class="flex items-center space-x-6">
        <!-- Pintu Keluar: Kembali ke Beranda Publik -->
        <Link 
            :href="route('home')" 
            class="flex items-center text-red-600 hover:text-red-700 font-medium transition-colors border-r pr-6 border-gray-200"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home Publik
        </Link>

        <!-- Dropdown 1: Manajemen Video -->
        <div class="relative" ref="videoDropdown">
            <button 
                @click="toggleMenu('video')"
                class="flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none"
                :class="{'text-blue-600 font-bold': route().current('video.*')}"
            >
                <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Manajemen Video
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200" :class="{'rotate-180': openMenu === 'video'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <Transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
            >
                <div v-if="openMenu === 'video'" class="absolute left-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div class="py-1">
                        <Link :href="route('video.index')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">📽️ Daftar Video</Link>
                        <Link :href="route('video.create')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">➕ Upload Video</Link>
                        <Link :href="route('video.edit')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">✏️ Mode Edit/Pilih</Link>
                    </div>
                </div>
            </Transition>
        </div>

        <!-- Dropdown 2: Manajemen File (FlesController) -->
        <div class="relative" ref="fileDropdown">
            <button 
                @click="toggleMenu('file')"
                class="flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none"
                :class="{'text-blue-600 font-bold': route().current('file.*') || route().current('fles.*')}"
            >
                <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Pusat File
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200" :class="{'rotate-180': openMenu === 'file'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <Transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
            >
                <div v-if="openMenu === 'file'" class="absolute left-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div class="py-1">
                        <Link :href="route('fles.index')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">📁 Semua File</Link>
                        <Link :href="route('file.create')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">📤 Upload File Baru</Link>
                        <Link :href="route('file.edit')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">🔧 Kelola / Edit File</Link>
                    </div>
                </div>
            </Transition>
        </div>

        <!-- Shortcut Invisible System Override -->
        <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
        >
            <div v-if="isSecretVisible" class="flex items-center">
                <Link 
                    :href="route('login')" 
                    class="bg-yellow-400 text-black px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-yellow-400 transition-all shadow-md"
                >
                    Admin Access
                </Link>
            </div>
        </Transition>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Link } from '@inertiajs/vue3';

// State Management
const openMenu = ref(null);
const isSecretVisible = ref(false);

// Template Refs untuk Click Outside
const videoDropdown = ref(null);
const fileDropdown = ref(null);

// Fungsi Toggle Menu
const toggleMenu = (menu) => {
    openMenu.value = openMenu.value === menu ? null : menu;
};

// Fungsi Shortcut Keyboard (Ctrl + Shift + Y)
const handleShortcut = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'Y') {
        e.preventDefault();
        isSecretVisible.value = !isSecretVisible.value;
    }
};

// Fungsi Tutup Dropdown saat Klik di Luar
const handleClickOutside = (event) => {
    if (
        (videoDropdown.value && !videoDropdown.value.contains(event.target)) &&
        (fileDropdown.value && !fileDropdown.value.contains(event.target))
    ) {
        openMenu.value = null;
    }
};

// Lifecycle Hooks
onMounted(() => {
    window.addEventListener('keydown', handleShortcut);
    window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleShortcut);
    window.removeEventListener('click', handleClickOutside);
});
</script>
