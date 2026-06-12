<?php

namespace Database\Factories;

use App\Models\Workshop;
use App\Models\WorkshopImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<WorkshopImage>
 */
class WorkshopImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'workshop_id' => Workshop::factory(),
            'path' => 'images/workshops/placeholder.jpg',
            'sort_order' => 0,
            'is_cover' => false,
        ];
    }
}
