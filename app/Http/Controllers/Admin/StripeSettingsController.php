<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StripeSettingsController extends Controller
{
    public function edit(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('admin/stripe/StripeSettings', [
            'stripe_public_key' => $user->stripe_public_key,
            'has_secret_key' => ! empty($user->stripe_secret_key),
            'has_webhook_secret' => ! empty($user->stripe_webhook_secret),
            'webhook_url' => url('/stripe/webhook'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'stripe_public_key' => 'nullable|string',
            'stripe_secret_key' => 'nullable|string',
            'stripe_webhook_secret' => 'nullable|string',
        ]);

        $user = $request->user();

        $data = [
            'stripe_public_key' => $validated['stripe_public_key'] ?? null,
        ];

        if (! empty($validated['stripe_secret_key'])) {
            $data['stripe_secret_key'] = $validated['stripe_secret_key'];
        }

        if (! empty($validated['stripe_webhook_secret'])) {
            $data['stripe_webhook_secret'] = $validated['stripe_webhook_secret'];
        }

        $user->update($data);

        return back()->with('success', 'Paramètres Stripe mis à jour avec succès.');
    }
}
