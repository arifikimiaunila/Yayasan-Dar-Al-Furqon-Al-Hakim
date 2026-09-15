<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFlesRequest;
use App\Models\fles;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FlesController extends Controller
{
    public function index(): Response
    {
    $files = fles::query()
        ->latest('file_id')
        ->paginate(20);

    return Inertia::render('Files/Index', [
        'files' => $files,
    ]);
    }

    public function create(): Response
    {
    return Inertia::render('Files/Create');
    }

    public function store(StoreFlesRequest $request): RedirectResponse
    {
        fles::create($request->validated());

        return redirect()->route('home')->with('message', 'File berhasil dibuat.');
    }

    public function show(int $file_id): Response
    {
    $file = fles::query()->where('file_id', $file_id)->firstOrFail();

    return Inertia::render('Files/Show', [
        'file' => $file,
    ]);
    }

    public function download(int $file_id)
    {
    // Ambil data file dari database
    $file = fles::query()->where('file_id', $file_id)->firstOrFail();

    // Ambil link eksternal dari kolom database
    $url = $file->link; // <-- kolom di tabel

    // Tentukan nama file (bisa dari kolom lain atau dari URL)
    $filename = $file->nama_file ?? basename(parse_url($url, PHP_URL_PATH));

    // Stream download langsung dari link eksternal
    return response()->streamDownload(function () use ($url) {
        $stream = fopen($url, 'r');
        fpassthru($stream);
        fclose($stream);
    }, $filename);
    }

    public function edit(): Response
    {
    // Ambil semua data file dari tabel
    $files = Fles::query()
        ->select(['file_id', 'nama_file', 'external_url', 'created_at']) // tambahkan kolom lain sesuai kebutuhan
        ->orderBy('file_id', 'desc')
        ->get()
        ->map(function ($file) {
            return [
                'ID' => $file->file_id,
                'Nama File' => $file->nama_file,
                'Link' => $file->external_url,
                'Tanggal Upload' => $file->created_at->format('Y-m-d H:i'),
            ];
        });

    return Inertia::render('Files/Edit', [
        'files' => $files,
    ]);
    }

    public function choose_one(): Response
    {
    $files = Fles::query()
        ->select(['file_id', 'nama_file'])
        ->latest('file_id')
        ->get();

    return Inertia::render('Files/Choose', [
        'files' => $files,
    ]);
    }

    public function update(StoreFlesRequest $request, int $file_id): RedirectResponse
    {
        $file = fles::query()->where('file_id', $file_id)->firstOrFail();
        $file->update($request->validated());

        return redirect()->route('file.show', $file_id)->with('message', 'File berhasil diupdate.');
    }

    public function destroy(int $file_id): RedirectResponse
    {
        $file = fles::query()->where('file_id', $file_id)->firstOrFail();
        $file->delete();

        return redirect()->route('home')->with('message', 'File berhasil dihapus.');
    }
}
