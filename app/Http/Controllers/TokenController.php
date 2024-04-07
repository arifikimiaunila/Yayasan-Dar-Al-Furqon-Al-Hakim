<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\PersonalAccessToken;

class TokenController extends Controller
{
function __construct() {
  $this->middleware('permission:token.edit', ['only' => ['revoking_token', 'revoking_part_token']]); 
 } 
    public function revoking_part_token(Request $request, int $tokenId, string $id)
    {
        $user = User::find($id);
     $user->tokens()->where('id', $tokenId)->delete();
        return redirect()->route('users.index')
                        ->with('success','Token berhasil dihapus.');
    }

public function revoking_token(Request $request, string $id)
    {
        $user = User::find($id);
    $user->tokens()->delete();
        return redirect()->route('users.index')
                        ->with('success','Token berhasil dihapus.');
    }
}
