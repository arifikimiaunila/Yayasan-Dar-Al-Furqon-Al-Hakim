<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            mode="out-in"
        >
            <!-- Render komponen berdasarkan route name aktif -->
            <component :is="activeContent" />
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// --- 1. IMPORT KOMPONEN PUBLIK & KONTEN ---
import Beranda from '../Pages/Beranda.vue';
import Dashboard from '../Pages/Dashboard.vue';
import VideoIndex from '../Pages/Video/Index.vue';
import VideoForm from '../Pages/Video/Form.vue'; // Digunakan untuk Create/Edit
import PostIndex from '../Pages/Post/Index.vue';
import PostForm from '../Pages/Post/Form.vue';
import FileIndex from '../Pages/File/Index.vue';
import FileForm from '../Pages/File/Form.vue';
import PengurusIndex from '../Pages/Pengurus/Index.vue';
import PengurusForm from '../Pages/Pengurus/Form.vue';
import DataYayasanShow from '../Pages/DataYayasan/Show.vue';
import DataYayasanForm from '../Pages/DataYayasan/Form.vue';

// --- 2. IMPORT KOMPONEN ADMINISTRASI (USER & ROLE) ---
import UserIndex from '../Pages/User/Index.vue';
import UserShow from '../Pages/User/Show.vue';
import RoleIndex from '../Pages/Laratrust/Roles/Index.vue';
import PermissionIndex from '../Pages/Laratrust/Permissions/Index.vue';
import RoleAssignment from '../Pages/Laratrust/Assignment/Index.vue';

// --- 3. IMPORT KOMPONEN JETSTREAM/PROFILE ---
import ProfileShow from '../Pages/Profile/Show.vue';
import ApiTokenIndex from '../Pages/API/Index.vue';
import TeamShow from '../Pages/Teams/Show.vue';
import TeamCreate from '../Pages/Teams/Create.vue';

const activeContent = computed(() => {
    const routeName = route().current();

    const routesMap: Record<string, any> = {
        // --- Publik & Core ---
        'home': Beranda,
        'dashboard': Dashboard,

        // --- Konten Video ---
        'video.index': VideoIndex,
        'video.show': VideoIndex, // Atau komponen Show khusus
        'video.create': VideoForm,
        'video.edit': VideoForm,
        'video.choose': VideoIndex,

        // --- Konten Artikel (Posts) ---
        'posts.show': PostIndex,
        'post.create': PostForm,
        'post.edit': PostForm,
        'post.choose': PostIndex,

        // --- Konten File ---
        'fles.index': FileIndex,
        'file.show': FileIndex,
        'file.create': FileForm,
        'file.edit': FileForm,
        'file.choose': FileIndex,

        // --- Pengurus Yayasan ---
        'pengurus_yayasan.index': PengurusIndex,
        'pengurus_yayasan.create': PengurusForm,
        'pengurus_yayasan.edit': PengurusForm,
        'pengurus_yayasan.choose': PengurusIndex,

        // --- Data Yayasan ---
        'datayayasan.show': DataYayasanShow,
        'datayayasan.showcookies': DataYayasanShow,
        'data_yayasan.create': DataYayasanForm,
        'data_yayasan.edit': DataYayasanForm,
        'data_yayasan.choose': DataYayasanShow,

        // --- User Management ---
        'user.index': UserIndex,
        'user.show': UserShow,

        // --- Laratrust (Roles & Permissions) ---
        'roles.index': RoleIndex,
        'permissions.list': PermissionIndex,
        'role-as.list': RoleAssignment,

        // --- Jetstream Profile & Teams ---
        'profile.show': ProfileShow,
        'api-tokens.index': ApiTokenIndex,
        'teams.show': TeamShow,
        'teams.create': TeamCreate,
        'terms.show': Beranda, // Bisa diganti halaman Terms
        'policy.show': Beranda, // Bisa diganti halaman Policy
    };

    // Logika pengembalian komponen
    if (routeName && routesMap[routeName]) {
        return routesMap[routeName];
    }

    // Fallback: Jika tidak terdaftar, tampilkan Beranda
    return Beranda;
});
</script>
