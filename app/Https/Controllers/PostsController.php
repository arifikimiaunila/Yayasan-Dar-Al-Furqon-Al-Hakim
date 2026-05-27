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
        return Inertia::render('posts/create');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        // Mengambil semua judul post
        $titles = Post::select('title')->get();
        
        return Inertia::render('posts/edit', [
            'files' => $titles
        ]);
    }

    /**
     * Display the specified resource.
     * Menggunakan Route Model Binding (Laravel otomatis mencari berdasarkan ID)
     */
    public function show(Post $post): Response
    {
        return Inertia::render('posts/show', [
            'post' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post): Response
    {
        $postsData = Post::select('post_id', 'title')->get();
        $postList = $postsData->pluck('title', 'post_id');

        return Inertia::render('posts/edit', [
            'post' => $postList
        ]);
    }

    /**
     * Custom route to choose one post.
     */
    public function choose_one(Post $post): Response
    {
        // Membatasi kolom yang dikirim ke frontend menggunakan only() milik Eloquent
        return Inertia::render('posts/choose_one', [
            'post' => $post->only(['post_id', 'title', 'body', 'nama_pembuat', 'published_at', 'user_id'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePostRequest $request, Post $post, bool $terbit): RedirectResponse
    {
        // Validasi kondisi $terbit (menggunakan === untuk boolean check)
        if ($terbit === true) {
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

        // Langsung update melalui data model yang sudah di-bind
        $post->update($validated);

        return redirect()->route('posts.edit')->with('message', 'Post berhasil diupdate.');
    }
}
