<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFlesRequest;
use App\Models\fles;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class FlesController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(fles::query()->latest('file_id')->paginate(20));
    }

    public function create(): RedirectResponse
    {
        return redirect()->route('home');
    }

    public function store(StoreFlesRequest $request): RedirectResponse
    {
        fles::create($request->validated());

        return redirect()->route('home')->with('message', 'File berhasil dibuat.');
    }

    public function show(int $file_id): JsonResponse
    {
        $file = fles::query()->where('file_id', $file_id)->firstOrFail();

        return response()->json($file);
    }

    public function download(int $file_id): JsonResponse
    {
        $file = fles::query()->where('file_id', $file_id)->firstOrFail();

        return response()->json([
            'message' => 'Download file belum diaktifkan pada endpoint ini.',
            'file' => $file,
        ], 501);
    }

    public function edit(): JsonResponse
    {
        return response()->json(fles::query()->select(['file_id', 'nama_file'])->latest('file_id')->get());
    }

    public function update(StoreFlesRequest $request, int $file_id): RedirectResponse
    {
        $file = fles::query()->where('file_id', $file_id)->firstOrFail();
        $file->update($request->validated());

        return redirect()->route('home')->with('message', 'File berhasil diupdate.');
    }

    public function destroy(int $file_id): RedirectResponse
    {
        $file = fles::query()->where('file_id', $file_id)->firstOrFail();
        $file->delete();

        return redirect()->route('home')->with('message', 'File berhasil dihapus.');
    }
}
