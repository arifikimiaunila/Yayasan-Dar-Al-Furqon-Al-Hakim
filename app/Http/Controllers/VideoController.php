<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Models\videos;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class VideoController extends Controller
{
    public function index(): Response
    {
        $videos = videos::query()
            ->select(['no_video', 'title', 'link', 'published', 'upload_tanggal', 'created_at'])
            ->latest('no_video')
            ->get()
            ->map(fn (videos $video) => [
                'no_video' => $video->no_video,
                'judul' => $video->title,
                'youtube_id' => $this->extractYoutubeId($video->link),
                'is_published' => (bool) $video->published,
                'created_at' => $video->created_at,
            ])
            ->values();

        return inertia('Video/Index', ['videos' => $videos]);
    }

    public function create(): Response
    {
        return inertia('Video/Create');
    }

    public function store(StoreVideoRequest $request): RedirectResponse
    {
        videos::create($request->validated());

        return redirect()->route('video.edit')->with('message', 'Video berhasil dibuat.');
    }

    public function show(int $no_video): Response
    {
        $video = videos::query()->where('no_video', $no_video)->firstOrFail();

        return inertia('Video/Show', [
            'video' => [
                'no_video' => $video->no_video,
                'judul' => $video->title,
                'youtube_id' => $this->extractYoutubeId($video->link),
                'deskripsi' => null,
                'created_at' => $video->upload_tanggal ?? $video->created_at,
            ],
        ]);
    }

    public function edit(): Response
    {
        $videos = videos::query()
            ->select(['no_video', 'title', 'link', 'published', 'upload_tanggal', 'created_at'])
            ->latest('no_video')
            ->get()
            ->map(fn (videos $video) => [
                'id' => $video->no_video,
                'no_video' => $video->no_video,
                'judul' => $video->title,
                'youtube_id' => $this->extractYoutubeId($video->link),
                'is_published' => (bool) $video->published,
                'uploader_name' => 'Admin',
                'created_at' => $video->upload_tanggal ?? $video->created_at,
            ])
            ->values();

        return inertia('Video/Edit', ['videos' => $videos]);
    }

    public function choose_one(int $no_video): Response
    {
        $video = videos::query()->where('no_video', $no_video)->firstOrFail();

        return inertia('Video/Choose', [
            'video' => [
                'no_video' => $video->no_video,
                'judul' => $video->title,
                'youtube_id' => $this->extractYoutubeId($video->link),
                'deskripsi' => null,
                'is_published' => (bool) $video->published,
                'tanggal_upload' => optional($video->upload_tanggal)->format('Y-m-d') ?? now()->toDateString(),
            ],
        ]);
    }

    public function update(StoreVideoRequest $request, int $no_video): RedirectResponse
    {
        $video = videos::query()->where('no_video', $no_video)->firstOrFail();
        $video->update($request->validated());

        return redirect()->route('video.edit')->with('message', 'Video berhasil diupdate.');
    }

    public function destroy(int $no_video): RedirectResponse
    {
        $video = videos::query()->where('no_video', $no_video)->firstOrFail();
        $video->delete();

        return redirect()->route('video.edit')->with('message', 'Video berhasil dihapus.');
    }

    private function extractYoutubeId(string $value): string
    {
        if (preg_match('/^[a-zA-Z0-9_-]{11}$/', $value) === 1) {
            return $value;
        }

        if (preg_match('/(?:v=|\/)([a-zA-Z0-9_-]{11})/', $value, $matches) === 1) {
            return $matches[1];
        }

        return $value;
    }
}
