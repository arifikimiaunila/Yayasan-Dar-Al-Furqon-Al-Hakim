<?php

namespace App\Http\Controllers;

use App\Models\fles;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use App\Http\Requests\StoreFlesRequest;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class FlesController extends Controller implements HasMiddleware
{

    public function index(Request $request): Response
    {
      	$flesall = fles::all()->paginate(20);

        return inertia('fles/index', [
        'fles'=>$flesall
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
   return inertia('fles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFlesRequest $request): RedirectResponse
    {
  if ($request->hasFile('gambar')) {
  $nama_foto= $request->file->getClientOriginalName();
$image_path = Storage::disk('onedrive')->putFileAs('gambar', file('pdf'), $nama_foto);
$validated=$request->merge([
'gambar'=>$image_path
])->validated();
        }
        fles::create($validated);
        sleep(1);
        return  redirect()->route('fles.edit')->with('message', 'File berhasil  diupload');
    }

public function show(int $file_id)
    {
        $fles_show = fles::select(['file_id', 'nama_file', 'deskripsi', 'nama_pembuat','published'])->where('file_id', $file_id)->get();

		return inertia('fles/show', [
           'fles'=>$fles_show
        ]);
    }


  /**
     * Display the specified resource.
     */
    public function download(int $file_id)
    {
 $filename=fles::select('nama_file')->where('file_id', $file_id);

Storage::disk('onedrive')->copy('pdf/{$filename}', 'resources/pdf/{$filename}');
$path=storage_path('resources/pdf/{$filename}');
if (file_exists($path)){
        return response()->download($path, $filename);
Storage::delete('resources/pdf/{$filename}');
    }
    else{
        abort(404, 'File not found');
    }
}

public function edit()
    {
$flesdata = fles::select('file_id', 'nama_file')->get();
$flestable = $flesdata->pluck('nama_file', 'file_id');
return inertia('fles.edit', [
            'fles' => $flestable
        ]);
}

public function update(StoreFlesRequest $request, fles $fles, int $file_id, bool $terbit): RedirectResponse
    {
if($terbit = true){
$validated=$request->safe()->only(['published'=> $terbit]);
}else{
$validated=$request->safe()->only(
       'nama_file',
       'deskripsi',
       'nama_pembuat'
 );
}
   $fles->save($validated);
 if($fles) {
    return redirect()->route('fles.edit')->with('message', 'File berhasil diupdate.');
}
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(fles $fles, $file_id)
    {
$filename=fles::select('nama_file')->where('file_id', $file_id);
Storage::disk('onedrive')->delete('pdf/'.$filename);
$fles=fles::find($file_id);
        $fles->delete();
        return redirect()->route('fles.edit')->with('message', 'File berhasil dihapus.');
    }
}
