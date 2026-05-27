<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\StorePostRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PostsController extends Controller 
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('posts/Create');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        // Mengambil semua judul post untuk kebutuhan list
        $titles = Post::select('post_id', 'title')->get();
        
        return Inertia::render('posts/Index', [
            'files' => $titles
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): Response
    {
        return Inertia::render('posts/Show', [
            'post' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post): Response
    {
        // Mengambil semua list post untuk drop-down/sidebar jika dibutuhkan di halaman edit
        $postList = Post::pluck('title', 'post_id');

        return Inertia::render('posts/Edit', [
            'currentPost' => $post, // Data post yang sedang diedit
            'postList'    => $postList // Daftar post lainnya
        ]);
    }

    /**
     * Custom route to choose one post.
     */
    public function choose_one(Post $post): Response
    {
        // Laravel 11/12 modern menggunakan select() atau hanya passing array via only()
        return Inertia::render('posts/ChooseOne', [
            'post' => $post->only(['post_id', 'title', 'body', 'nama_pembuat', 'published_at', 'user_id'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePostRequest $request, Post $post): RedirectResponse
    {
        // Di Laravel 12, disarankan mengecek kondisi boolean langsung dari request query/body
        // Contoh URL: /posts/1?terbit=true atau dikirim via body form data
        $isTerbit = $request->boolean('terbit');

        if ($isTerbit) {
            $validated = $request->safe()->only([
                'published'
            ]);
        } else {
            $validated = $request->safe()->only([
                'title',
                'body',
                'published_at'
            ]);
        }

        // Update data langsung pada instance model yang sudah ter-bind
        $post->update($validated);

        return redirect()->route('posts.index')->with('message', 'Post berhasil diupdate.');
    }
}
