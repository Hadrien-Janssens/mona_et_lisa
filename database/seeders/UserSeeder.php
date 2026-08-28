<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Créer l'utilisateur de test principal
        User::factory()->create([
            'first_name' => 'Mona &',
            'last_name' => 'Lisa',
            'name' => 'Mona & Lisa',
            'email' => 'test@example.com',
            'is_admin' => true,
        ]);

        User::factory()->create([
            'first_name' => 'test',
            'last_name' => 'test',
            'name' => 'test test',
            'email' => 'hadrien.janssens7@gmail.com',
            'is_admin' => false,
        ]);
        // Créer d'autres utilisateurs pour les réservations fictives
        User::factory(10)->create();
    }
}