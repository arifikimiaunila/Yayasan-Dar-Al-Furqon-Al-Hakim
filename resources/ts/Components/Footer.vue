<template>
    <footer class="bg-slate-900 text-gray-300">
        <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div class="xl:grid xl:grid-cols-3 xl:gap-8">
                <!-- Bagian Kiri: Branding & Deskripsi -->
                <div class="space-y-6 xl:col-span-1">
                    <div class="flex items-center">
                        <img src="/logo.png" alt="Logo" class="h-10 w-auto mr-3 brightness-110" />
                        <span class="text-white text-lg font-bold tracking-wider">
                            Dar Al Furqon Al Hakim
                        </span>
                    </div>
                    <p class="text-sm leading-6 text-gray-400">
                        Membina generasi qur'ani yang berakhlak mulia, berilmu luas, dan bermanfaat bagi sesama berdasarkan nilai-nilai Al-Qur'an dan As-Sunnah.
                    </p>
                    <div class="flex space-x-6">
                        <!-- Link Media Sosial -->
                        <a href="#" class="hover:text-white transition-colors">Facebook</a>
                        <a href="#" class="hover:text-white transition-colors">Instagram</a>
                        <a href="#" class="hover:text-white transition-colors">YouTube</a>
                    </div>
                </div>

                <!-- Bagian Kanan: Navigasi & Kontak -->
                <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                    <div class="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 class="text-sm font-semibold text-white tracking-wider uppercase border-b border-slate-700 pb-2">Yayasan</h3>
                            <ul role="list" class="mt-4 space-y-4">
                                <li><Link :href="route('home')" class="text-sm hover:text-white transition-colors">Beranda</Link></li>
                                <li><Link :href="route('pengurus_yayasan.index')" class="text-sm hover:text-white transition-colors">Daftar Pengurus</Link></li>
                                <li><Link :href="route('datayayasan.show', 1)" class="text-sm hover:text-white transition-colors">Profil Singkat</Link></li>
                            </ul>
                        </div>
                        <div class="mt-10 md:mt-0">
                            <h3 class="text-sm font-semibold text-white tracking-wider uppercase border-b border-slate-700 pb-2">Konten</h3>
                            <ul role="list" class="mt-4 space-y-4">
                                <li><Link :href="route('video.index')" class="text-sm hover:text-white transition-colors">Galeri Video</Link></li>
                                <li><Link :href="route('fles.index')" class="text-sm hover:text-white transition-colors">Unduh Dokumen</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold text-white tracking-wider uppercase border-b border-slate-700 pb-2">Kontak</h3>
                        <ul role="list" class="mt-4 space-y-4">
                            <li class="text-sm text-gray-400">
                                Tangerang, Banten, Indonesia
                            </li>
                            <li class="text-sm text-gray-400 italic">
                                Email: info@daralfurqonalhakim.or.id
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Bagian Bawah: Hak Cipta Saja -->
            <div class="mt-12 border-t border-slate-800 pt-8 text-center md:text-left">
                <p class="text-xs text-gray-500">
                    &copy; {{ currentYear }} Yayasan Dar Al Furqon Al Hakim. Seluruh Hak Cipta Dilindungi.
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

// Tahun otomatis diperbarui berdasarkan server time
const currentYear = computed(() => new Date().getFullYear());
</script>
