<?php

namespace Database\Factories;

use App\Models\WorkshopSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<WorkshopSession>
 */
class WorkshopSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'workshop_id' => \App\Models\Workshop::factory(),
            'start_at' => $this->faker->dateTimeBetween('+1 week', '+2 months'),
            'max_participants' => $this->faker->randomElement([8, 10, 12, 15]),
        ];
    }
}
