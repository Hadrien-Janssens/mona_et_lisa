<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmed;
use App\Mail\BookingOverbooked;
use App\Models\Booking;
use App\Models\WorkshopSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Stripe\Event;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Refund;
use Stripe\Stripe;
use Stripe\Webhook;

class StripeWebhookController extends Controller
{
    public function handle(Request $request)
    {

        $payload = $request->getContent();
        $sigHeader = $request->header('stripe-signature');

        $adminUser = \App\Models\User::where('is_admin', true)->first();

        $endpointSecret =  app()->isLocal() ||  ! $adminUser ||  empty($adminUser->stripe_webhook_secret)
            ? config('services.stripe.webhook_secret')
            : $adminUser->stripe_webhook_secret;

        $stripeSecret = app()->isLocal() || ! $adminUser || empty($adminUser->stripe_secret_key)
            ? config('services.stripe.secret')
            : $adminUser->stripe_secret_key;

        try {
            if ($endpointSecret) {
                $event = Webhook::constructEvent(
                    $payload,
                    $sigHeader,
                    $endpointSecret
                );
            } else {
                $event = Event::constructFrom(json_decode($payload, true));
            }
        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (SignatureVerificationException $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $bookingId = $session->metadata->booking_id ?? null;
            $paymentIntentId = $session->payment_intent;

            if ($bookingId) {
                try {
                    DB::transaction(function () use ($bookingId, $paymentIntentId, $stripeSecret) {
                        $booking = Booking::findOrFail($bookingId);

                        if ($booking->payment_status !== 'pending') {
                            return;
                        }

                        $workshopSession = WorkshopSession::lockForUpdate()->findOrFail($booking->workshop_session_id);

                        if (! $workshopSession->hasPlacesLeft($booking->seats)) {
                            // Surbooking
                            $booking->update([
                                'payment_status' => 'failed_overbooked',
                                'stripe_payment_intent_id' => $paymentIntentId,
                            ]);

                            Stripe::setApiKey($stripeSecret);
                            Refund::create([
                                'payment_intent' => $paymentIntentId,
                            ]);

                            Mail::to($booking->user->email)
                                ->send(new BookingOverbooked($booking));
                        } else {
                            // Cas normal
                            $booking->update([
                                'payment_status' => 'paid',
                                'stripe_payment_intent_id' => $paymentIntentId,
                                'expires_at' => null,
                            ]);

                            Mail::to($booking->user->email)
                                ->send(new BookingConfirmed($booking));
                        }
                    });
                } catch (\Exception $e) {
                    Log::error('Erreur webhook Stripe: ' . $e->getMessage());

                    return response()->json(['error' => $e->getMessage()], 400);
                }
            }
        } elseif ($event->type === 'checkout.session.expired') {
            $session = $event->data->object;
            $bookingId = $session->metadata->booking_id ?? null;

            if ($bookingId) {
                $booking = Booking::find($bookingId);
                if ($booking && $booking->payment_status === 'pending') {
                    $booking->update(['payment_status' => 'cancelled']);
                }
            }
        }

        return response()->json(['status' => 'success']);
    }
}
