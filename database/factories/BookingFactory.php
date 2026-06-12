<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\User;
use App\Models\WorkshopSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'workshop_session_id' => WorkshopSession::factory(),
            'seats' => $this->faker->numberBetween(1, 3),
            'total_price' => function (array $attributes) {
                $session = WorkshopSession::find($attributes['workshop_session_id']);
                $price = $session ? $session->workshop->price : 4500;

                return $price * $attributes['seats'];
            },
            'payment_status' => $this->faker->randomElement(['pending', 'paid', 'failed']),
            'stripe_session_id' => 'cs_test_'.str()->random(24),
        ];
    }
}
