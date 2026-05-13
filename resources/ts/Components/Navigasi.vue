<template>
    <div class="flex items-center">
        <!-- KHUSUS SUPERADMIN -->
        <template v-if="isSuperAdmin">
            <!-- Menu Khusus Data Yayasan (Hanya Superadmin) -->
            <div class="relative mr-4" ref="yayasanDropdown">
                <button 
                    @click="showYayasan = !showYayasan"
                    class="flex items-center space-x-1 text-purple-700 font-bold hover:text-purple-900 focus:outline-none"
                    :class="{'text-purple-900': route().current('data_yayasan.*')}"
                >
                    <span>🏢 Data Yayasan</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform" :class="{'rotate-180': showYayasan}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <div v-if="showYayasan" class="absolute left-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div class="py-1">
                            <Link :href="route('data_yayasan.create')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">➕ Input Data Baru</Link>
                            <Link :href="route('data_yayasan.edit')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">✏️ Edit Konfigurasi</Link>
                            <Link :href="route('datayayasan.showcookies')" class="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 italic">🍪 Cek Cookies</Link>
                        </div>
                    </div>
                </Transition>
            </div>

            <div class="h-6 w-px bg-gray-300 mx-2"></div> <!-- Pembatas -->

            <!-- Menampilkan Navigasi Admin 1 & 2 Sekaligus -->
            <NavbarAdmin1 />
            <div class="h-6 w-px bg-gray-300 mx-4"></div>
            <NavbarAdmin2 />
        </template>

        <!-- UNTUK ADMIN BIASA -->
        <component v-else :is="currentNavbar" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import NavbarGuest from '@/Components/Navbar1.vue';
import NavbarAdmin1 from '@/Components/Navbar2.vue';
import NavbarAdmin2 from '@/Components/Navbar3.vue';

const page = usePage();
const showYayasan = ref(false);
const yayasanDropdown = ref(null);

const roles = computed(() => page.props.auth.roles || []);
const isSuperAdmin = computed(() => roles.value.includes('superadministration'));

const currentNavbar = computed(() => {
    if (roles.value.includes('Admin1')) return NavbarAdmin1;
    if (roles.value.includes('Admin2')) return NavbarAdmin2;
    return NavbarGuest;
});

// Click Outside Logic
const handleClickOutside = (event) => {
    if (yayasanDropdown.value && !yayasanDropdown.value.contains(event.target)) {
        showYayasan.value = false;
    }
};

onMounted(() => window.addEventListener('click', handleClickOutside));
onUnmounted(() => window.removeEventListener('click', handleClickOutside));
</script>
