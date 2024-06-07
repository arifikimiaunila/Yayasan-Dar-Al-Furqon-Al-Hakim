<?php

namespace App\Http\Controllers;

use Mostafaznv\LaraCache\Facades\LaraCache;
use App\Models\videos;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Requests\StoreVideoRequest;
use Inertia\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;


class VideoController extends Controller implements HasMiddleware
{

    function __construct($name) {
        LaraCache::enable(videos::class);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
		$videoall =  videos::all()->paginate(20);
        return inertia('video/index', [
        'video' =>$videoall
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
   return inertia('video/create');
    }

    /**
     * Store a newly created resource in storage.
     */
 public function store(StoreVideoRequest $request, videos $videos): RedirectResponse
    {
	 $validated=$request->validated();
      $videos = videos::create($validated);
      return redirect()->route('video.edit')->with('message', 'Video berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(int $no_video)
    {
        videos::cache()->update('latest');
        $video_show = videos::select(['no_video', 'title', 'link', 'upload_tanggal'])->where('no_video', $no_video)->get();
		return inertia('video/show', [
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
        return inertia('video/edit', [
            'video' => $videotable
        ]);
    }

    public function choose_one(int $no_video)
    {
        $videodata = videos::select(['no_video ', 'title', 'link', 'published','upload_tanggal'])->where('no_video', $no_video)->get();
		return inertia('video/choose_one', [
           'video'=>$videodata
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreVideoRequest $request, int $no_video, videos $video, bool $terbit): RedirectResponse
    {
        videos::cache()->update('latest');
 if($terbit = true){
$validated=$request->safe()->only([
'published'=>$terbit
]);
} else {
$validated=$request->safe()->except('published');
}
    $video->save($validated);
    if($video) {
    return redirect()->route('video.edit')->with('message', 'Video berhasil diupdate.');
}
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $no_video): RedirectResponse
    {
        videos::cache()->delete('latest', true);
		$video=videos::find($no_video);
        $video->delete();
videos::cache()->delete('latest', true);
        return redirect()->route('video.edit')->with('message', 'Video berhasil dihapus.');
    }
}
