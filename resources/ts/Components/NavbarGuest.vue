<template>
    <nav class="flex items-center space-x-6">
        <!-- Link Publik Biasa -->
        <Link :href="route('home')" 
            :class="[route().current('home') ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600']">
            Beranda
        </Link>

        <!-- Menu Dropdown (Contoh: Media/Video) -->
        <div class="relative group" ref="dropdownRef">
            <button 
                @click="isDropdownOpen = !isDropdownOpen"
                class="flex items-center space-x-1 text-gray-600 hover:text-blue-600 focus:outline-none"
                :class="{'text-blue-600 font-bold': route().current('video.*')}"
            >
                <span>Yayasan</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200" :class="{'rotate-180': isDropdownOpen}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
 <!-- Dropdown Menu -->
            <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
            >
                <div v-if="isDropdownOpen" class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div class="py-1">
                        <Link :href="route('posts.show', 1)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            Visi
                        </Link>
                        <Link :href="route('posts.show', 2)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            Misi
                        </Link>
                        <Link :href="route('posts.show', 3)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            Sejarah
                        </Link>
                        <Link :href="route('pengurus_yayasan.index')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            👥 Pengurus
                        </Link>
                         <Link :href="route('pengurus_yayasan.index')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            👥 Pengurus
                        </Link>
                         <Link :href="route('datayayasan.show', 1)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            Lokasi Kantor
                        </Link>
                    </div>
                </div>
            </Transition>
        </div>

        <div class="relative group">
            <button 
                @click="isDropdownOpen = !isDropdownOpen"
                class="flex items-center space-x-1 text-gray-600 hover:text-blue-600 focus:outline-none"
                :class="{'text-blue-600 font-bold': route().current('video.*')}"
            >
                <span>Konten</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200" :class="{'rotate-180': isDropdownOpen}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <!-- Dropdown Menu -->
            <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
            >
                <div v-if="isDropdownOpen" class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div class="py-1">
                        <Link :href="route('video.index')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            📽️ Galeri Video
                        </Link>
                        <Link :href="route('fles.index')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            📁 Arsip File
                        </Link>
                    </div>
                </div>
            </Transition>
        </div>

        <!-- KOTAK LOGIN INVISIBLE (Shortcut: Ctrl + Shift + Y) -->
        <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 scale-90"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-90"
        >
            <div v-if="isVisible" class="flex items-center">
                <Link 
                    :href="route('login')" 
                    class="bg-slate-800 text-white px-4 py-1.5 rounded-full shadow-xl text-xs font-bold tracking-wider border border-slate-700 hover:bg-red-600 transition-all duration-300 uppercase"
                >
                    🔒 Staff Access
                </Link>
            </div>
        </Transition>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Link } from '@inertiajs/vue3';

// State untuk Hidden Login
const isVisible = ref(false);

// State untuk Dropdown
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

// Fungsi Shortcut Keyboard
const handleShortcut = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'Y') {
        e.preventDefault();
        isVisible.value = !isVisible.value;
    }
};

// Fungsi Klik Luar untuk menutup dropdown
const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isDropdownOpen.value = false;
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleShortcut);
    window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleShortcut);
    window.removeEventListener('click', handleClickOutside);
});
</script>
