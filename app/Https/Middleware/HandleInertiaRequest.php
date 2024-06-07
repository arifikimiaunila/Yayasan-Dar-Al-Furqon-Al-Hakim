<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Inertia\Inertia;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
 Inertia::share('user', fn (Request $request) => $request->user()
    ? $request->user()->only('id', 'name', 'email')
    : null
);
Inertia::share('data_yayasan', fn (Request $request) => $request->data_yayasan() ? $request->data_yayasan()->only(   'yayasan_id', 'alamat', 'email', 'garis_lintang', 'garis_bujur', 'no_tep2', 'no_wa', 'youtube', 'facebook') : null );
Inertia::share('fles', fn (Request $request) => $request->fles() ? $request->fles()->only('file_id', 'nama_file', 'deksripsi' , 'gambar', 'nama_pembuat', 'published') : null );
Inertia::share('pengurus_yayasans', fn (Request $request) => $request->pengurus_yayasans() ? $request->pengurus_yayasans()->only('id_pengurus', 'nama', 'dapukan', 'alamat', 'no_telp', 'kategori', 'published') : null );
Inertia::share('posts', fn (Request $request) => $request->posts() ? $request->posts()->only('post_id', 'title', 'body',
'published', 'published_at', 'foto_id', 'nama_foto', 'deksripsi', 'gambar', 'nama_fotografer') : null );
Inertia::share('videos', fn (Request $request) => $request->videos() ? $request->videos()->only( 'no_video', 'title', 'link', 'published', 'upload_tanggal') : null );
        }
}
