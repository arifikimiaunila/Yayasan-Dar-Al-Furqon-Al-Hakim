<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDataYayasanRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\data_yayasan;
use Inertia\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class DataYayasanController extends Controller
{
   public function index(): Response
    {
		$datayayasanall =  data_yayasan::all()->paginate(20);
        return inertia('data_yayasan/edit', [
        'data_yayasan' =>$datayayasanall
        ]);
    }
 public function create()
    {
   return inertia('data_yayasan/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDataYayasanRequest $request): RedirectResponse
    {
    $validated=$request->validated();
      $data_yayasans = data_yayasan::create($validated);
      return redirect()->route('data_yayasan.edit')->with('message', 'Data yayasan berhasil dibuat.');
    }
    /**
     * Display a listing of the resource.
     */
    public function show(int $yayasan_id): Response
    {
        $data_yayasan = data_yayasan::select(['yayasan_id', 'alamat', 'email', 'garis_lintang', 'garis_bujur', 'no_tep1', 'no_tep2', 'no_wa', 'youtube', 'facebook'])->where('yayasan_id', $yayasan_id)->get();
		return inertia('data_yayasan/index', [
           'data_yayasan'=>$data_yayasan
        ]);
    }
public function choose_one(int $yayasan_id)
    {
        $data_yayasan = data_yayasans::select(['yayasan_id', 'alamat', 'email', 'garis_lintang', 'garis_bujur', 'no_tep1', 'no_tep2', 'no_wa', 'youtube', 'facebook'])->where('yayasan_id', $yayasan_id)->get();
		return inertia('data_yayasan/choose_one', [
           'data_yayasan'=>$data_yayasan
        ]);
    }
public function update(StoreDataYayasanRequest $request, data_yayasan $data_yayasan, int $yayasan_id): RedirectResponse
    {

$validated=$request->validated();
   $data_yayasan->save($validated);
 if($data_yayasan) {
    return redirect()->route('data_yayasan.edit')->with('message', 'Data_yayasan berhasil diupdate.');
}
   }}
