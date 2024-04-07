<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use App\Models\pengurus_yayasans;
use Illuminate\Http\Request;
use App\Http\Requests\StorePengurusYayasanRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Cache;

class PengurusYayasanController extends Controller
{
function __construct()
 {
 	$this->middleware('permission:pengurus-yayasan.create', ['only' => ['create','store']]);
	$this->middleware('permission:pengurus-yayasan.edit', ['only' => ['edit','update', 'choose_one']]);
	$this->middleware('permission:pengurus-yayasan.delete', ['only' => ['destroy']]);
 }
  /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
$pengurus_yayasans=pengurus_yayasans::all()->paginate(20);


      return Inertia::render('pengurus_yayasan/index', [
'pengurus_yayasans'=>$pengurus_yayasans
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
   return Inertia::render('pengurus_yayasan/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, pengurus_yayasans $pengurus_yayasans): RedirectResponse
    {
$validated=$request->safe();
      $pengurus_yayasans = pengurus_yayasans::create($validated);
      return redirect()->route('pengurus_yayasan.index')->with('message', 'Pengurus yayasan berhasil dibuat.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(pengurus_yayasans $pengurus_yayasans)
    {
        $pengurusyayasansdata = pengurus_yayasans::select('id_pengurus', 'nama')->get();
        $pengurusyayasanstable = $pengurusyayasansdata->pluck('nama', 'id_pengurus');
        return Inertia::render('pengurus_yayasan/edit', [
            'pengurus_yayasans' => $pengurusyayasanstable
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, pengurus_yayasans $pengurus_yayasans, bool $terbit): RedirectResponse
    {
if($terbit = true){
$validated=$request->safe()->only(['published'=> $terbit]);
} else {
$validated=$request->safe()->except('published');
}
   $pengurus_yayasans->save($validated);
 if($pengurus_yayasans) {
    return redirect()->route('pengurus_yayasan.index')->with('message', 'Pengurus_yayasan berhasil diupdate.');
}
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(pengurus_yayasans $pengurus_yayasans, $id_pengurus): RedirectResponse
    {
     $pengurus_yayasans = pengurus_yayasans::find($id_pengurus);
        $pengurus_yayasans->delete();
        return redirect()->route('pengurus_yayasan.index')->with('message', 'Pengurus_yayasan berhasil dihapus.');
}
}
