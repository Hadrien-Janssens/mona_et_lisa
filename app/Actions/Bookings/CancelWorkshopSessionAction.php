<?php

namespace App\Actions\Bookings;

use App\Mail\EventCancelledMail;
use App\Models\WorkshopSession;
use Illuminate\Support\Facades\Mail;

class CancelWorkshopSessionAction
{
    public function __construct(
        protected RefundBookingAction $refundBookingAction
    ) {}

    public function execute(WorkshopSession $session): void
    {
        // Get all active bookings for this session
        $bookings = $session->bookings()
            ->whereIn('payment_status', ['paid', 'pending'])
            ->with('user')
            ->get();

        foreach ($bookings as $booking) {
            // Process Refund or Cancellation
            $this->refundBookingAction->execute($booking);

            // Send Email to the customer
            if ($booking->user) {
                Mail::to($booking->user)->send(new EventCancelledMail($session, $booking));
            }
        }

        // Finally, delete the session
        $session->delete();
    }
}