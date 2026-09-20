<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDataYayasanRequest;
use App\Models\data_yayasan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Inertia\Inertia;
use Inertia\Response;

class DataYayasanController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Data_Yayasan/Create');
    }
    // Simpan data baru
    public function store(StoreDataYayasanRequest $request): RedirectResponse
    {
        data_yayasan::create($request->validated());

        return redirect()->route('home')->with('message', 'Data yayasan berhasil dibuat.');
    }

    // Form edit data yayasan
    public function edit(int $yayasan_id): Response
    {
    $data = data_yayasan::query()->where('yayasan_id', $yayasan_id)->firstOrFail();

    return Inertia::render('Data_Yayasan/Edit', [
        'yayasan' => $data,
    ]);
    }

    // Update data yayasan
    public function update(StoreDataYayasanRequest $request, int $yayasan_id): RedirectResponse
    {
        $data = data_yayasan::query()->where('yayasan_id', $yayasan_id)->firstOrFail();
        $data->update($request->validated());

        return redirect()->route('data_yayasan.show', 1)->with('message', 'Data yayasan berhasil diupdate.');
    }

    public function showcookies(): JsonResponse
    {
        $data = data_yayasan::query()->where('yayasan_id', 1)->first();

        return response()->json($data);
    }
}
