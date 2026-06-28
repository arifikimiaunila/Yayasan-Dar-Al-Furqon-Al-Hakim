<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePengurusYayasanRequest;
use App\Models\pengurus_yayasans;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class PengurusYayasanController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(pengurus_yayasans::query()->latest('id_pengurus')->paginate(20));
    }

    public function show(string $kategori): JsonResponse
    {
        $data = pengurus_yayasans::query()->where('kategori', $kategori)->get();

        return response()->json($data);
    }

    public function choose_one(int $id_pengurus): JsonResponse
    {
        $data = pengurus_yayasans::query()->where('id_pengurus', $id_pengurus)->firstOrFail();

        return response()->json($data);
    }

    public function create(): RedirectResponse
    {
        return redirect()->route('home');
    }

    public function store(StorePengurusYayasanRequest $request): RedirectResponse
    {
        pengurus_yayasans::create($request->validated());

        return redirect()->route('home')->with('message', 'Pengurus yayasan berhasil dibuat.');
    }

    public function edit(): JsonResponse
    {
        return response()->json(
            pengurus_yayasans::query()->select(['id_pengurus', 'nama'])->latest('id_pengurus')->get()
        );
    }

    public function update(StorePengurusYayasanRequest $request, int $id_pengurus): RedirectResponse
    {
        $data = pengurus_yayasans::query()->where('id_pengurus', $id_pengurus)->firstOrFail();
        $data->update($request->validated());

        return redirect()->route('home')->with('message', 'Pengurus yayasan berhasil diupdate.');
    }

    public function destroy(int $id_pengurus): RedirectResponse
    {
        $data = pengurus_yayasans::query()->where('id_pengurus', $id_pengurus)->firstOrFail();
        $data->delete();

        return redirect()->route('home')->with('message', 'Pengurus yayasan berhasil dihapus.');
    }
}
