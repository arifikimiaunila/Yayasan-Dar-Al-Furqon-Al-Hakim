<?php
 namespace App\Http\Controllers; 
use Illuminate\Http\Request; 
use App\Http\Requests;
 use App\Http\Controllers\Controller; 

class SessionController extends Controller { 
public function accessSessionData(Request $request) { 
if($request->session()->has('my_name'))
{
 echo $request->session()->get('my_name'); 
}else{
 echo 'Tidak ada data dalam sesi.';
 }}
 public function storeSessionData(Request $request) {
 $request->session()->put('my_name','Virat Gandhi');
 echo "Data telah ditambahkan ke sesi.";
 }
 public function deleteSessionData(Request $request) { 
$request->session()->forget('my_name'); 
echo "Daya berhasil dihapus dari sesi.";
 }
 }

