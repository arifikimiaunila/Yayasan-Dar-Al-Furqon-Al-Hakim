<?php

namespace App\Http\Controllers;

use App\Models\fles;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\UploadedFile;

class FlesController extends Controller
{

function __construct() {
 $this->middleware('permission:file.create', ['only' => ['create','store']]); $this->middleware('permission:file.edit', ['only' => ['edit','update','choose_one']]); $this->middleware('permission:file.delete', ['only' => ['destroy']]);
 }

    public function index(Request $request): Response
    {
      	$flesall = fles::all()->paginate(20);

        return Inertia::render('fles/index', [
        'fles'=>$flesall
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
   return Inertia::render('fles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, fles $fles): RedirectResponse
    {
  if ($request->hasFile('gambar')) {
  $nama_foto= time().'.'.$request->file->extension();
$image_path = Storage::disk('onedrive')->putFileAs('gambar', new File('pdf'), $nama_foto);
$validated=$request->validated()->merge([
'gambar'=>$image_path
]);
        }
        fles::create($validated);
        sleep(1);
        return redirect()->route('fles.index')->with('message', 'File berhasil diupload');
    }

public function show(int $file_id)
    {
        $fles_show = fles::select(['file_id', 'nama_file', 'deskripsi', 'nama_pembuat','published','user_id'])->where('file_id', $file_id)->get();

		return Inertia::render('fles/show', [
           'fles'=>$fles_show
        ]);
    }


  /**
     * Display the specified resource.
     */
    public function download(int $file_id)
    {

 $filename=fles::select('nama_file')->where('file_id', $file_id);

Storage::disk('onedrive')->copy('pdf/'.$filename, 'resources/pdf/'.$filename)->get();
$path=Storage::disk('resources/pdf')->assertExists($filename);
        return response()->download($path);
Storage::delete('resources/pdf'.$filename);
    }

public function edit()
    {
$flesdata = fles::select('file_id', 'nama_file')->get();
$flestable = $flesdata->pluck('nama_file', 'file_id');
return Inertia::render('fles/edit', [
            'fles' => $flestable
        ]);
}

public function update(Request $request, fles $fles, bool $terbit): RedirectResponse
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
    return redirect()->route('fles.index')->with('message', 'File berhasil diupdate.');
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
        return redirect()->route('fles.index')->with('message', 'File berhasil dihapus.');
    }
}
