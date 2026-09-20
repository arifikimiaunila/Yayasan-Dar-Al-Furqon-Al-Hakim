<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(): Response
{
    // Ambil semua data user, diformat dengan UserResource
    $users = UserResource::collection(
        User::query()->latest('id')->get()
    );

    // Render ke komponen React/Vue di resources/js/Pages/User/Index
    return Inertia::render('User/Index', [
        'users' => $users,
    ]);
}

    public function show(int $user_id): Response
{
    $user = User::with(['roles', 'teams'])->findOrFail($user_id);

    return Inertia::render('User/Show', [
        'user' => new UserResource($user),
        'roles' => $user->roles,
        'teams' => $user->teams,
    ]);
}

    public function update(Request $request, int $user_id): JsonResponse
    {
        $user = User::query()->findOrFail($user_id);

        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user_id,
        ]);

        $user->update($validated);

        // Return dengan UserResource agar hasil update tetap difilter
        return (new UserResource($user))->additional([
            'message' => 'User berhasil diupdate.',
        ])->response();
    }

    public function destroy($userId)
{
    // Cari tim berdasarkan user_id
    $team = \DB::table('teams')->where('user_id', $userId)->first();

    if (!$team) {
        return response()->json([
            'message' => 'Tim tidak ditemukan untuk user ini.'
        ], 404);
    }

    $teamId = $team->team_id;

    // Hapus relasi di team_user
    \DB::table('team_user')->where('team_id', $teamId)->delete();

    // Hapus undangan terkait tim
    \DB::table('team_invitations')->where('team_id', $teamId)->delete();

    // Hapus role_user terkait tim
    \DB::table('role_user')->where('team_id', $teamId)->delete();

    // Hapus permission_user terkait tim
    \DB::table('permission_user')->where('team_id', $teamId)->delete();

    // Hapus tim
    \DB::table('teams')->where('team_id', $teamId)->delete();

    return response()->json([
        'message' => 'Tim dan semua relasi berhasil dihapus berdasarkan user_id.',
        'team_id' => $teamId
    ]);
}

}
