<template>
    <nav v-if="isAdmin" class="flex items-center justify-between w-full">
        <!-- Bagian Kiri: Menu Navigasi Admin -->
        <div class="flex items-center space-x-6">
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

            <!-- Dropdown 1: Manajemen Pengurus Yayasan -->
            <div class="relative" ref="pengurusDropdown">
                <button 
                    @click="toggleMenu('pengurus')"
                    class="flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none"
                    :class="{'text-blue-600 font-bold': route().current('pengurus_yayasan.*')}"
                >
                    <span class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Pengurus Yayasan
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200" :class="{'rotate-180': openMenu === 'pengurus'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <div v-if="openMenu === 'pengurus'" class="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div class="py-1">
                            <Link :href="route('pengurus_yayasan.index')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">📋 Daftar Pengurus</Link>
                            <Link :href="route('pengurus_yayasan.create')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">➕ Tambah Pengurus Baru</Link>
                        </div>
                    </div>
                </Transition>
            </div>

            <!-- Dropdown 2: Manajemen Postingan / Artikel -->
            <div class="relative" ref="postDropdown">
                <button 
                    @click="toggleMenu('post')"
                    class="flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none"
                    :class="{'text-blue-600 font-bold': route().current('post.*')}"
                >
                    <span class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        Artikel & Berita
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200" :class="{'rotate-180': openMenu === 'post'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <div v-if="openMenu === 'post'" class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div class="py-1">
                            <Link :href="route('post.create')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">✍️ Buat Postingan</Link>
                            <!-- Pastikan nama route ini benar di web.php Anda (post.edit/post.index) -->
                            <Link :href="route('post.edit')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">📑 Kelola Artikel</Link>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>

        <!-- Bagian Kanan: Profil Admin & Logout (Penghancur Token/Sesi) -->
        <div class="flex items-center space-x-4 pl-6 border-l border-gray-200 ml-6">
            <div class="text-right hidden md:block">
                <p class="text-sm font-bold text-gray-800">{{ currentUser?.name || 'Admin' }}</p>
                <p class="text-xs text-gray-500 uppercase tracking-wider">{{ userRoles[0] || 'Staff' }}</p>
            </div>
            
            <!-- Tombol Keluar (Destroy Session/Token) -->
            <button 
                @click="logout"
                class="flex items-center bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-700 px-3 py-1.5 rounded transition-colors focus:outline-none"
                title="Keluar dari sistem"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span class="text-sm font-medium">Keluar</span>
            </button>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';

const page = usePage();

// State Management untuk Menu
const openMenu = ref(null);
const isSecretVisible = ref(false);

// Template Refs
const pengurusDropdown = ref(null);
const postDropdown = ref(null);

// === INTEGRASI AUTENTIKASI & TOKEN FILTERING ===

// Mengambil data user yang sedang login dari props Inertia
const currentUser = computed(() => page.props.auth.user);

// Mengambil daftar role (misal: ['Admin1', 'superadministration'])
const userRoles = computed(() => page.props.auth.roles || []);

// Filter: Pastikan komponen ini hanya berfungsi/tampil untuk Admin1 atau Superadmin
const isAdmin = computed(() => {
    return userRoles.value.includes('Admin1') || userRoles.value.includes('superadministration');
});

// Fungsi Logout (Menghapus Token/Sesi di Server)
const logout = () => {
    // router.post akan menembak endpoint /logout milik Jetstream/Fortify.
    // Ini secara otomatis akan menghancurkan cookie sesi dan token Sanctum di server,
    // lalu mengarahkan user kembali ke halaman '/' (Home Publik).
    router.post(route('logout'));
};

// === FUNGSI INTERAKSI UI ===

const toggleMenu = (menu) => {
    openMenu.value = openMenu.value === menu ? null : menu;
};

const handleShortcut = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'Y') {
        e.preventDefault();
        isSecretVisible.value = !isSecretVisible.value;
    }
};

const handleClickOutside = (event) => {
    if (
        (pengurusDropdown.value && !pengurusDropdown.value.contains(event.target)) &&
        (postDropdown.value && !postDropdown.value.contains(event.target))
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
