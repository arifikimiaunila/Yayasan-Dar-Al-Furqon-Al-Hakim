<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RecoveryCodesMail extends Mailable
{
    use Queueable, SerializesModels;

    public $recoveryCodes;

    /**
     * Create a new message instance.
     *
     * @param array $recoveryCodes
     */
    public function __construct(array $recoveryCodes)
    {
        $this->recoveryCodes = $recoveryCodes;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Kode Pemulihan Akun Anda')
                    ->view('emails.recovery_codes')
                    ->with([
                        'recoveryCodes' => $this->recoveryCodes,
                    ]);
    }
}
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RecoveryCodesMail extends Mailable
{
    use Queueable, SerializesModels;

    public $recoveryCodes;

    /**
     * Create a new message instance.
     *
     * @param array $recoveryCodes
     */
    public function __construct(array $recoveryCodes)
    {
        $this->recoveryCodes = $recoveryCodes;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Kode Pemulihan Akun Anda')
                    ->view('emails.recovery_codes')
                    ->with([
                        'recoveryCodes' => $this->recoveryCodes,
                    ]);
    }
}
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RecoveryCodesMail extends Mailable
{
    use Queueable, SerializesModels;

    public $recoveryCodes;

    /**
     * Create a new message instance.
     *
     * @param array $recoveryCodes
     */
    public function __construct(array $recoveryCodes)
    {
        $this->recoveryCodes = $recoveryCodes;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Kode Pemulihan Akun Anda')
                    ->view('emails.recovery_codes')
                    ->with([
                        'recoveryCodes' => $this->recoveryCodes,
                    ]);
    }
}
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RecoveryCodesMail extends Mailable
{
    use Queueable, SerializesModels;

    public $recoveryCodes;

    /**
     * Create a new message instance.
     *
     * @param array $recoveryCodes
     */
    public function __construct(array $recoveryCodes)
    {
        $this->recoveryCodes = $recoveryCodes;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Kode Pemulihan Akun Anda')
                    ->view('emails.recovery_codes')
                    ->with([
                        'recoveryCodes' => $this->recoveryCodes,
                    ]);
    }
}
