<template>
    <div class="flex items-center">
        <!-- Jika Superadmin, tampilkan keduanya -->
        <template v-if="isSuperAdmin">
            <NavbarAdmin1 />
            <div class="h-6 w-px bg-gray-300 mx-4"></div> <!-- Garis pembatas -->
            <NavbarAdmin2 />
        </template>

        <!-- Jika Admin biasa, tampilkan salah satu -->
        <component v-else :is="currentNavbar" />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import NavbarGuest from '@/Components/Navbar1.vue';
import NavbarAdmin1 from '@/Components/Navbar2.vue';
import NavbarAdmin2 from '@/Components/Navbar3.vue';

const page = usePage();
const roles = computed(() => page.props.auth.roles || []);
const isSuperAdmin = computed(() => roles.value.includes('superadministration'));

const currentNavbar = computed(() => {
    if (roles.value.includes('Admin1')) return NavbarAdmin1;
    if (roles.value.includes('Admin2')) return NavbarAdmin2;
    return NavbarGuest;
});
</script>
