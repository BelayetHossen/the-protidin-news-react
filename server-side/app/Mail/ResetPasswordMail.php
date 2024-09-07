<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $mailData;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mailData)
    {
        $this->mailData = $mailData;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $path = parse_url($this->mailData, PHP_URL_PATH);
        $parts = explode('/', $path);
        $emailPart = end($parts);

        return $this->subject('Reset Password Mail')
            ->cc($emailPart)
            ->bcc($emailPart)
            ->html('<div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-header">Welcome!</div>
                                    <div class="card-body">
                                        <p>Your password reset link below:</p>
                                        <p>Click here: <a href="' . $this->mailData . '">' . $this->mailData . '</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>');

    }
}
