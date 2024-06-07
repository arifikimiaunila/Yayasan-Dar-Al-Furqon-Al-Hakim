<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use App\Models\pengurus_yayasans;
use Illuminate\Http\Request;
use App\Http\Requests\StorePengurusYayasanRequest;
use Inertia\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PengurusYayasanController extends Controller implements HasMiddleware
{

  /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
    $pengurus_yayasans=pengurus_yayasans::all()->paginate(20);
    return inertia('pengurus_yayasan/index', [
    'pengurus_yayasans'=>$pengurus_yayasans
        ]);
    }

    public function show(string $kategori)
    {
        $pengurus_yayasans = pengurus_yayasans::select(['id_pengurus', 'nama', 'dapukan', 'alamat', 'no_telp', 'kategori', 'published'])->where('kategori', $kategori)->get();

		return inertia('pengurus_yayasan/show', [
           'pengurus_yayasans'=>$pengurus_yayasans
        ]);
    }

    public function choose_one(int $id_pengurus)
    {
        $pengurus_yayasan = pengurus_yayasans::select(['id_pengurus', 'nama', 'dapukan', 'alamat', 'no_telp', 'kategori', 'published'])->where('id_pengurus', $id_pengurus)->get();
		return inertia('pengurus_yayasan/choose_one', [
           'pengurus_yayasan'=>$pengurus_yayasan
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
   return inertia('pengurus_yayasan/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePengurusYayasanRequest $request): RedirectResponse
    {
    $validated=$request->validated();
      $pengurus_yayasans = pengurus_yayasans::create($validated);
      return redirect()->route('pengurus_yayasan.edit')->with('message', 'Pengurus yayasan berhasil dibuat.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(pengurus_yayasans $pengurus_yayasans)
    {
        $pengurusyayasansdata = pengurus_yayasans::select('id_pengurus', 'nama')->get();
        $pengurusyayasanstable = $pengurusyayasansdata->pluck('nama', 'id_pengurus');
        return inertia('pengurus_yayasan/edit', [
            'pengurus_yayasans' => $pengurusyayasanstable
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePengurusYayasanRequest $request, pengurus_yayasans $pengurus_yayasans, int $id_pengurus, bool $terbit): RedirectResponse
    {
if($terbit = true){
$validated=$request->safe()->only(['published'=> $terbit]);
} else {
$validated=$request->safe()->except('published');
}
   $pengurus_yayasans->save($validated);
 if($pengurus_yayasans) {
    return redirect()->route('pengurus_yayasan.edit')->with('message', 'Pengurus_yayasan berhasil diupdate.');
}
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(pengurus_yayasans $pengurus_yayasans, int $id_pengurus): RedirectResponse
    {
     $pengurus_yayasans = pengurus_yayasans::find($id_pengurus);
        $pengurus_yayasans->delete();
        return redirect()->route('pengurus_yayasan.edit')->with('message', 'Pengurus_yayasan berhasil dihapus.');
}
}
