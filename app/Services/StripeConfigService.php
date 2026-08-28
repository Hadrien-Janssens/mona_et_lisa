<?php

namespace App\Services;

use App\Models\User;
use Stripe\StripeClient;

class StripeConfigService
{
    /**
     * Get the resolved Stripe Secret Key based on environment and admin user.
     */
    public function getSecretKey(): string
    {
        $adminUser = User::where('is_admin', true)->first();

        return app()->isLocal() || ! $adminUser || empty($adminUser->stripe_secret_key)
            ? config('services.stripe.secret')
            : $adminUser->stripe_secret_key;
    }

    /**
     * Get an initialized StripeClient instance.
     */
    public function getClient(): StripeClient
    {
        return new StripeClient($this->getSecretKey());
    }
}
