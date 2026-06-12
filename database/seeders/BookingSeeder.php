<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\User;
use App\Models\WorkshopSession;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer les utilisateurs (hors utilisateur test principal si possible, ou tous)
        $users = User::where('email', '!=', 'test@example.com')->get();

        if ($users->isEmpty()) {
            $users = User::all();
        }

        // Récupérer toutes les sessions d'ateliers avec leur atelier associé
        $sessions = WorkshopSession::with('workshop')->get();

        foreach ($sessions as $session) {
            $workshop = $session->workshop;

            // Remplir partiellement la session (ex: 1 à 2 réservations fictives)
            $seats1 = rand(1, 2);
            $status1 = $this->getRandomPaymentStatus();

            Booking::create([
                'user_id' => $users->random()->id,
                'workshop_session_id' => $session->id,
                'seats' => $seats1,
                'total_price' => $workshop->price * $seats1,
                'payment_status' => $status1,
                'stripe_session_id' => $status1 === 'paid' ? 'cs_test_'.str()->random(24) : null,
            ]);

            // Ajouter occasionnellement une autre réservation
            if (rand(0, 1) === 1) {
                $seats2 = rand(1, 2);
                $status2 = $this->getRandomPaymentStatus();

                Booking::create([
                    'user_id' => $users->random()->id,
                    'workshop_session_id' => $session->id,
                    'seats' => $seats2,
                    'total_price' => $workshop->price * $seats2,
                    'payment_status' => $status2,
                    'stripe_session_id' => $status2 === 'paid' ? 'cs_test_'.str()->random(24) : null,
                ]);
            }
        }
    }

    /**
     * Obtenir un statut de paiement aléatoire (payé ou non).
     */
    private function getRandomPaymentStatus(): string
    {
        $statuses = ['paid', 'pending', 'failed'];
        // 80% de chance d'être payé, 10% en attente, 10% échoué
        $rand = rand(1, 10);
        if ($rand <= 8) {
            return 'paid';
        }
        if ($rand === 9) {
            return 'pending';
        }

        return 'failed';
    }
}
