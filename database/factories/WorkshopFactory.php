<?php

namespace Database\Factories;

use App\Models\Workshop;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Workshop>
 */
class WorkshopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->words(3, true);

        return [
            'title' => ucfirst($title),
            'slug' => str($title)->slug()->value(),
            'description' => $this->faker->paragraphs(3, true),
            'summary' => $this->faker->sentence(),
            'price' => $this->faker->randomElement([3500, 4500, 5500, 7500]), // Prix en centimes (35€ à 75€)
            'duration_minutes' => $this->faker->randomElement([60, 90, 120, 180]), // 1h à 3h
            'is_active' => true,
        ];
    }
}
