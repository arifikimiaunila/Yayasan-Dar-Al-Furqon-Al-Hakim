<?php

namespace App\Http\Controllers;

use App\Models\video;
use App\Models\videos;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Requests\StoreVideoRequest;
use Inertia\Inertia;
use Inertia\Response; 
use Illuminate\Support\Facades\Cache;
use Mostafaznv\LaraCache\Facades\LaraCache;

class VideoController extends Controller
{

function __construct() {
 $this->middleware('permission:video.create', ['only' => ['create','store']]); 
 $this->middleware('permission:video.edit', ['only' => ['edit','update', 'choose_one']]); 
 $this->middleware('permission:video.delete', ['only' => ['destroy']]);
videos::cache()->enable();
 }
 
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $videoall =  videos::all()->paginate(20);

      return Inertia::render('video/index', [
        'video' =>$videoall
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
   return Inertia::render('video/create');
    }

    /**
     * Store a newly created resource in storage.
     */
 public function store(Request $request, videos $videos): RedirectResponse
    {
$validated=$request->safe();
      $videos = videos::create($validated);
      return redirect()->route('video.index')->with('message', 'Video berhasil dibuat.'); 
    }

    /**
     * Display the specified resource.
     */
    public function show(int $video_id)
    {
      videos::cache()->update('latest');
  $video_show = videos::select(['no_video', 'title', 'link', 'upload_tanggal'])->where('no_video', $video_id)->get();

		return Inertia::render('video/show', [
           'video'=>$video_show
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        $videodata = videos::select('no_video', 'title')->get();
        $videotable = $videodata->pluck('title', 'no_video');
        return Inertia::render('video/edit', [
            'video' => $videotable
        ]);
    }

    public function choose_one(int $no_video)
    {
        $videodata = videos::select(['no_video ', 'title', 'link', 'published','upload_tanggal','user_id'])->where('no_video', $no_video)->get();
videos::cache()->update('latest');
		return Inertia::render('video/choose_one', [
           'video'=>$videodata
        ]);
    } 

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, videos $video, bool $terbit): RedirectResponse
    {
 if($terbit = true){
$validated=$request->safe()->only(
'published'=>$terbit
);
} else {  
$validated=$request->safe()->except('published');
}
    $video->save($validated);
    if($video) { 
    return redirect()->route('video.index')->with('message', 'Video berhasil diupdate.'); 
}
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $no_video): RedirectResponse
    {
     $video=videos::find($no_video);
        $video->delete();
videos::cache()->delete('latest', true);
        return redirect()->route('video.index')->with('message', 'Video berhasil dihapus.');
    }
}
