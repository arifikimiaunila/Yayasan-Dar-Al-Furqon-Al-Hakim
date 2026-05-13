<template>
    <div class="flex items-center">
        <!-- KHUSUS SUPERADMIN -->
        <template v-if="isSuperAdmin">
            
            <!-- 1. Menu Konfigurasi Sistem (Laratrust & User) -->
            <div class="relative mr-4" ref="systemDropdown">
                <button 
                    @click="activeMenu = activeMenu === 'system' ? null : 'system'"
                    class="flex items-center space-x-1 text-red-700 font-bold hover:text-red-900 focus:outline-none"
                    :class="{'text-red-900': route().current('user.*') || route().current('laratrust.*')}"
                >
                    <span>🛠️ Sistem</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform" :class="{'rotate-180': activeMenu === 'system'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <div v-if="activeMenu === 'system'" class="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div class="py-1">
                            <div class="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">User Management</div>
                            <Link :href="route('user.index')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50">👥 Daftar Pengguna</Link>
                            
                            <div class="border-t border-gray-100 my-1"></div>
                            <div class="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Laratrust Roles</div>
                            <Link :href="route('roles.index')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50">🛡️ Kelola Roles</Link>
                            <Link :href="route('permissions.list')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50">🔑 Permissions</Link>
                            <Link :href="route('role-as.list')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50">🔗 Assignment</Link>
                        </div>
                    </div>
                </Transition>
            </div>

            <!-- 2. Menu Data Yayasan -->
            <div class="relative mr-4" ref="yayasanDropdown">
                <button 
                    @click="activeMenu = activeMenu === 'yayasan' ? null : 'yayasan'"
                    class="flex items-center space-x-1 text-purple-700 font-bold hover:text-purple-900 focus:outline-none"
                >
                    <span>🏢 Yayasan</span>
                </button>

                <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <div v-if="activeMenu === 'yayasan'" class="absolute left-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div class="py-1">
                            <Link :href="route('data_yayasan.create')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">➕ Input Baru</Link>
                            <Link :href="route('data_yayasan.edit')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">✏️ Konfigurasi</Link>
                            <Link :href="route('datayayasan.showcookies')" class="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 italic text-xs">🍪 Debug Cookies</Link>
                        </div>
                    </div>
                </Transition>
            </div>

            <div class="h-6 w-px bg-gray-300 mx-2"></div>

            <!-- Navbar Gabungan untuk Superadmin -->
            <NavbarAdmin1 />
            <div class="h-6 w-px bg-gray-300 mx-4"></div>
            <NavbarAdmin2 />

            <!-- 3. Profile & Jetstream (Kanan) -->
            <div class="ml-auto flex items-center space-x-3 pl-4 border-l border-gray-200">
                <Link :href="route('profile.show')" class="text-xs text-gray-500 hover:text-blue-600 uppercase font-bold tracking-tighter">Profile</Link>
                <Link v-if="$page.props.jetstream.hasApiFeatures" :href="route('api-tokens.index')" class="text-xs text-gray-500 hover:text-blue-600 uppercase font-bold tracking-tighter">API</Link>
            </div>
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
const activeMenu = ref(null); // 'system' | 'yayasan' | null
const systemDropdown = ref(null);
const yayasanDropdown = ref(null);

const roles = computed(() => page.props.auth.roles || []);
const isSuperAdmin = computed(() => roles.value.includes('superadministration'));

const currentNavbar = computed(() => {
    if (roles.value.includes('Admin1')) return NavbarAdmin1;
    if (roles.value.includes('Admin2')) return NavbarAdmin2;
    return NavbarGuest;
});

const handleClickOutside = (event) => {
    if (
        (systemDropdown.value && !systemDropdown.value.contains(event.target)) &&
        (yayasanDropdown.value && !yayasanDropdown.value.contains(event.target))
    ) {
        activeMenu.value = null;
    }
};

onMounted(() => window.addEventListener('click', handleClickOutside));
onUnmounted(() => window.removeEventListener('click', handleClickOutside));
</script>
