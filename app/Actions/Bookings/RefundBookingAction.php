<?php

namespace App\Actions\Bookings;

use App\Models\Booking;
use App\Services\StripeConfigService;
use Exception;
use Illuminate\Support\Facades\Log;

class RefundBookingAction
{
    public function __construct(
        protected StripeConfigService $stripeService
    ) {}

    public function execute(Booking $booking): bool
    {
        if ($booking->payment_status !== 'paid') {
            $booking->update(['payment_status' => 'cancelled']);

            return true;
        }

        if (! $booking->stripe_payment_intent_id) {
            Log::error("Impossible de rembourser la réservation #{$booking->id} : aucun Payment Intent Stripe associé.");

            return false;
        }

        try {
            $stripe = $this->stripeService->getClient();

            $stripe->refunds->create([
                'payment_intent' => $booking->stripe_payment_intent_id,
                'reason' => 'requested_by_customer',
            ]);

            $booking->update(['payment_status' => 'cancelled']);

            return true;
        } catch (Exception $e) {
            Log::error("Erreur Stripe lors du remboursement de la réservation #{$booking->id} : ".$e->getMessage());

            return false;
        }
    }
}
