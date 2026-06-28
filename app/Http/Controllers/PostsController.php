<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\posts;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class PostsController extends Controller
{
    public function create(): RedirectResponse
    {
        return redirect()->route('post.edit');
    }

    public function store(StorePostRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        posts::create($validated);

        return redirect()->route('post.edit')->with('message', 'Post berhasil dibuat.');
    }

    public function edit(): Response
    {
        $posts = posts::query()
            ->select(['post_id', 'title', 'body', 'published', 'published_at'])
            ->latest('post_id')
            ->get()
            ->map(fn (posts $post) => [
                'id' => $post->post_id,
                'title' => $post->title,
                'body' => $post->body,
                'published' => (bool) $post->published,
                'published_at' => $post->published_at,
            ])
            ->values();

        return inertia('Post/Edit', ['posts' => $posts]);
    }

    public function show(int $post_id): Response
    {
        $post = posts::query()->where('post_id', $post_id)->firstOrFail();

        return inertia('Post/Show', [
            'post' => [
                'id' => $post->post_id,
                'title' => $post->title,
                'body' => $post->body,
                'published' => (bool) $post->published,
                'published_at' => $post->published_at,
                'author_name' => 'Admin',
            ],
        ]);
    }

    public function choose_one(int $post_id): Response
    {
        $post = posts::query()->where('post_id', $post_id)->firstOrFail();

        return inertia('Post/Choose', [
            'post' => [
                'id' => $post->post_id,
                'title' => $post->title,
                'body' => $post->body,
                'published' => (bool) $post->published,
                'published_at' => $post->published_at,
            ],
        ]);
    }

    public function update(StorePostRequest $request, int $post_id): RedirectResponse
    {
        $post = posts::query()->where('post_id', $post_id)->firstOrFail();
        $post->update($request->validated());

        return redirect()->route('post.edit')->with('message', 'Post berhasil diupdate.');
    }

    public function destroy(int $post_id): RedirectResponse
    {
        $post = posts::query()->where('post_id', $post_id)->firstOrFail();
        $post->delete();

        return redirect()->route('post.edit')->with('message', 'Post berhasil dihapus.');
    }
}
