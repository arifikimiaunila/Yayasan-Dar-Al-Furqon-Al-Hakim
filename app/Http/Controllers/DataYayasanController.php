<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDataYayasanRequest;
use App\Models\data_yayasan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class DataYayasanController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(data_yayasan::query()->latest('yayasan_id')->paginate(20));
    }

    public function create(): RedirectResponse
    {
        return redirect()->route('home');
    }

    public function store(StoreDataYayasanRequest $request): RedirectResponse
    {
        data_yayasan::create($request->validated());

        return redirect()->route('home')->with('message', 'Data yayasan berhasil dibuat.');
    }

    public function show(int $yayasan_id): JsonResponse
    {
        $data = data_yayasan::query()->where('yayasan_id', $yayasan_id)->firstOrFail();

        return response()->json($data);
    }

    public function choose_one(int $yayasan_id): JsonResponse
    {
        $data = data_yayasan::query()->where('yayasan_id', $yayasan_id)->firstOrFail();

        return response()->json($data);
    }

    public function update(StoreDataYayasanRequest $request, int $yayasan_id): RedirectResponse
    {
        $data = data_yayasan::query()->where('yayasan_id', $yayasan_id)->firstOrFail();
        $data->update($request->validated());

        return redirect()->route('home')->with('message', 'Data yayasan berhasil diupdate.');
    }

    public function showcookies(): JsonResponse
    {
        $data = data_yayasan::query()->where('yayasan_id', 1)->first();

        return response()->json($data);
    }
}
