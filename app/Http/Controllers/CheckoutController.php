<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\WorkshopSession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Inertia\ResponseFactory;
use Stripe\Checkout\Session as StripeSession;
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

    /**
     * Store the checkout info and redirect to Stripe.
     */
    public function store(CheckoutRequest $request, WorkshopSession $session): \Symfony\Component\HttpFoundation\Response
    {
        $validated = $request->validated();

        if (! $session->hasPlacesLeft((int) $validated['seats'])) {
            return back()->withErrors(['seats' => 'Il n\'y a pas assez de places disponibles pour cette session.']);
        }

        Stripe::setApiKey(config('services.stripe.secret'));

        $workshop = $session->workshop;

        $checkoutSession = StripeSession::create([
            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $workshop->title.' - '.$session->start_at->translatedFormat('d F Y à H:i'),
                    ],
                    'unit_amount' => $workshop->price,
                ],
                'quantity' => (int) $validated['seats'],
            ]],
            'mode' => 'payment',
            'success_url' => route('checkout.success').'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('workshops.show', $workshop->slug),
            'customer_email' => $validated['email'],
            'metadata' => [
                'session_id' => $session->id,
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'phone' => $validated['phone'] ?? '',
                'birthdate' => $validated['birthdate'],
                'seats' => $validated['seats'],
            ],
        ]);

        return Inertia::location($checkoutSession->url);
    }

    /**
     * Show success page after Stripe checkout.
     */
    public function success(Request $request): Response
    {
        return Inertia::render('site/checkout-success', [
            'session_id' => $request->query('session_id'),
        ]);
    }
}
