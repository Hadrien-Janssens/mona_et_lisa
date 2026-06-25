<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\Booking;
use App\Models\User;
use App\Models\WorkshopSession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Refund;
use Stripe\Stripe;

class CheckoutController extends Controller
{
    /**
     * Show the checkout form.
     */
    public function show(WorkshopSession $session): Response
    {
        $session->load('workshop');

        return Inertia::render('site/checkout', [
            'session' => $session,
        ]);
    }

    public function store(CheckoutRequest $request, WorkshopSession $session): \Symfony\Component\HttpFoundation\Response
    {
        $validated = $request->validated();

        try {
            $checkoutSessionUrl = DB::transaction(function () use ($validated, $session) {
                // 1. Transaction & Verrou Pessimiste
                $lockedSession = WorkshopSession::lockForUpdate()->find($session->id);

                // 2. Vérification
                if (! $lockedSession->hasPlacesLeft((int) $validated['seats'])) {
                    throw ValidationException::withMessages([
                        'seats' => 'Il n\'y a pas assez de places disponibles pour cette session.',
                    ]);
                }

                $workshop = $lockedSession->workshop;

                // Création ou récupération de l'utilisateur (compte invité avec mot de passe null)
                $user = User::firstOrCreate(
                    ['email' => $validated['email']],
                    [
                        'first_name' => $validated['first_name'],
                        'last_name' => $validated['last_name'],
                        'name' => trim($validated['first_name'] . ' ' . $validated['last_name']),
                        'phone' => $validated['phone'] ?? null,
                        'birthdate' => $validated['birthdate'] ?? null,
                        'password' => null,
                    ]
                );

                // 3. Verrou Temporaire (Booking)
                $booking = Booking::create([
                    'user_id' => $user->id,
                    'workshop_session_id' => $lockedSession->id,
                    'seats' => (int) $validated['seats'],
                    'total_price' => $workshop->price * (int) $validated['seats'],
                    'payment_status' => 'pending',
                    'expires_at' => now()->addMinutes(30),
                ]);

                // 4. Session Stripe Checkout
                Stripe::setApiKey(config('services.stripe.secret'));

                $checkoutSession = StripeSession::create([
                    'line_items' => [[
                        'price_data' => [
                            'currency' => 'eur',
                            'product_data' => [
                                'name' => $workshop->title . ' - ' . $lockedSession->start_at->translatedFormat('d F Y à H:i'),
                            ],
                            'unit_amount' => $workshop->price,
                        ],
                        'quantity' => (int) $validated['seats'],
                    ]],
                    'mode' => 'payment',
                    'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
                    'cancel_url' => route('workshops.show', $workshop->slug),
                    'customer_email' => $validated['email'],
                    'expires_at' => now()->addMinutes(30)->timestamp,
                    'metadata' => [
                        'booking_id' => $booking->id,
                        'session_id' => $lockedSession->id,
                        'first_name' => $validated['first_name'],
                        'last_name' => $validated['last_name'],
                        'phone' => $validated['phone'] ?? '',
                        'birthdate' => $validated['birthdate'],
                        'seats' => $validated['seats'],
                    ],
                ]);

                // 5. Enregistrement stripe_session_id
                $booking->update([
                    'stripe_session_id' => $checkoutSession->id,
                ]);

                return $checkoutSession->url;
            });
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors());
        }

        return Inertia::location($checkoutSessionUrl);
    }

    /**
     * Show success page after Stripe checkout.
     */
    public function success(Request $request): Response
    {
        $sessionId = $request->query('session_id');
        $booking = Booking::where('stripe_session_id', $sessionId)->with('user')->first();

        return Inertia::render('site/checkout-success', [
            'session_id' => $sessionId,
            'needs_password' => $booking && $booking->user && $booking->user->password === null,
            'email' => $booking && $booking->user ? $booking->user->email : null,
        ]);
    }

    /**
     * Activate account from checkout success page.
     */
    public function activateAccount(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::where('email', $validated['email'])->firstOrFail();

        if ($user->password !== null) {
            return redirect()->route('booking');
        }

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        Auth::login($user);

        return redirect()->route('booking');
    }

    /**
     * Cancel a booking and refund.
     */
    public function cancel(Request $request, Booking $booking): \Symfony\Component\HttpFoundation\Response
    {
        // 1. Contrôle d'accès
        // dd($booking->user_id);
        if ($booking->user_id != $request->user()->id) {
            abort(403);
        }

        // 2. Statut
        if ($booking->payment_status !== 'paid') {
            return back()->withErrors(['error' => 'Cette réservation ne peut pas être annulée car elle n\'est pas payée.']);
        }

        // 3. Délai
        if (now()->addHours(48)->greaterThan($booking->session->start_at)) {
            return back()->withErrors(['error' => 'Les annulations sont possibles jusqu\'à 48h avant le début de l\'atelier.']);
        }

        // 4. Action
        try {
            DB::transaction(function () use ($booking) {
                if ($booking->stripe_payment_intent_id) {
                    Stripe::setApiKey(config('services.stripe.secret'));
                    Refund::create([
                        'payment_intent' => $booking->stripe_payment_intent_id,
                    ]);
                }


                $booking->update([
                    'payment_status' => 'cancelled',
                ]);


                // TODO: Email confirmation
            });
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Une erreur est survenue lors du remboursement : ' . $e->getMessage()]);
        }

        return back()->with('success', 'Votre réservation a été annulée et remboursée avec succès.');
    }
}