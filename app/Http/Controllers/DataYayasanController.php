<?php

namespace App\Http\Controllers;

use App\Models\data_yayasan;
use Inertia\Inertia;
use Inertia\Response;

class DataYayasanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $data_yayasan = data_yayasan::find(1)->get();
		return Inertia::render('data_yayasan/index', [
           'data_yayasan'=>$data_yayasan
        ]); 
    }
   }
