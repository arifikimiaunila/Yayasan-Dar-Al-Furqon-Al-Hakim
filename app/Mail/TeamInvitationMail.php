<?php

namespace App\Mail;

use App\Models\TeamInvitation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TeamInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $invitation;

    /**
     * Create a new message instance.
     */
    public function __construct(TeamInvitation $invitation)
    {
        $this->invitation = $invitation;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $acceptUrl = route('team-invitations.accept', $this->invitation->id);
        $rejectUrl = route('team-invitations.reject', $this->invitation->id);

        return $this->subject('Undangan Bergabung ke Tim')
            ->view('emails.team_invitation')
            ->with([
                'teamName'  => $this->invitation->team->name,
                'role'      => $this->invitation->role,
                'acceptUrl' => $acceptUrl,
                'rejectUrl' => $rejectUrl,
            ]);
    }
}
