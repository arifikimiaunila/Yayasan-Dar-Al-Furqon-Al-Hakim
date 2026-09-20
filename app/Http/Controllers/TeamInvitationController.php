<?php

namespace App\Http\Controllers;

use App\Models\TeamInvitation;
use Illuminate\Http\Request;

class TeamInvitationController extends Controller
{
    /**
     * Simpan undangan baru ke tabel team_invitations.
     */
   public function store(Request $request)
{
    $validated = $request->validate([
        'team_id' => 'required|uuid|exists:teams,team_id',
        'email'   => 'required|email',
        'role'    => 'nullable|string|max:50',
    ]);

    $invitation = TeamInvitation::create([
        'team_id' => $validated['team_id'],
        'email'   => $validated['email'],
        'role'    => $validated['role'] ?? null,
    ]);

    // Kirim email undangan
    Mail::to($validated['email'])->send(new TeamInvitationMail($invitation));

    return response()->json([
        'message' => 'Undangan berhasil dibuat dan dikirim.',
        'data'    => $invitation,
    ], 201);
}


    public function accept($invitationId)
{
    $invitation = TeamInvitation::findOrFail($invitationId);

    // Update status undangan
    $invitation->update([
        'status' => 'accepted',
    ]);

    // Cari tim terkait
    $team = $invitation->team;

    // Cari user berdasarkan email penerima undangan
    $user = User::where('email', $invitation->email)->firstOrFail();

    // Tambahkan user ke tim (misalnya relasi many-to-many)
    $team->members()->attach($user->id, [
        'role' => $invitation->role,
        'team_id' => $team->team_id,
    ]);

    // Update tabel role_user sesuai skema baru
    \DB::table('role_user')->updateOrInsert(
        [
            'user_id'   => $user->id,
            'role_id'   => Role::where('name', $invitation->role)->first()->id ?? null,
            'user_type' => User::class,
            'team_id'   => $team->team_id,
        ],
        []
    );

    // Update tabel permission_user sesuai skema baru
    // (opsional, tergantung permission default tim)
    \DB::table('permission_user')->updateOrInsert(
        [
            'user_id'      => $user->id,
            'permission_id'=> Permission::where('name', 'view-team')->first()->id ?? null,
            'user_type'    => User::class,
            'team_id'      => $team->team_id,
        ],
        []
    );

    return response()->json([
        'message' => 'Undangan berhasil diterima dan user ditambahkan ke tim.',
        'data'    => $invitation,
    ]);
}

public function reject($invitationId)
{
    $invitation = TeamInvitation::findOrFail($invitationId);

    // Update status jadi declined
    $invitation->update([
        'status' => 'declined',
    ]);

    return response()->json([
        'message' => 'Undangan ditolak.',
        'data'    => $invitation,
    ]);
}

}
