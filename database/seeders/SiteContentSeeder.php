<?php

namespace Database\Seeders;

use App\Models\SiteContent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class SiteContentSeeder extends Seeder
{
    /**
     * Seed the default site content (one row per section).
     */
    public function run(): void
    {
        $sections = [
            'header' => [
                'title' => 'Libérez votre créativité !',
                'subtitle' => 'Venez explorer, inventer et vous amuser ensemble !',
                'button1_label' => 'Nous contacter',
                'button2_label' => 'Voir nos ateliers',
                'images' => $this->copyHeaderImages(),
            ],
            'about' => [
                'title' => 'À propos ...',
                'description' => 'Bienvenue chez Mona & Lisa, un studio d’art chaleureux en plein cœur de Mons où l’imagination prend vie. Notre mission est d’offrir un espace d’expression créative unique pour enfants, parents, et adultes. Venez explorer, inventer et vous amuser ensemble ! Vous repartez avec votre œuvre et probablement un peu de peinture sous les ongles.',
            ],
            'workshop' => [
                'title' => 'Nos ateliers',
                'button_label' => 'Réserver un atelier',
            ],
            'schedule' => [
                'title' => 'Horaire & Accès',
                'subtitle' => 'On est juste à côté de la Grand-Place !',
                'button_label' => 'Prendre rendez-vous',
                'schedules' => [
                    ['day' => 'Mercredi', 'hours' => '14h - 18h'],
                    ['day' => 'Samedi & Dimanche', 'hours' => '10h - 18h'],
                    ['day' => 'Vacances scolaires', 'hours' => '9h - 12h30'],
                ],
            ],
            'contact' => [
                'title' => 'Écrivez-nous !',
                'subtitle' => 'On adore lire vos messages.',
                'email' => 'monaetlisa@hotmail.com',
                'address' => "Rue d’Enghien 45\n7000 Mons",
                'phones' => ['0478 74 41 48'],
            ],
            'footer' => [
                'subtitle' => 'À très vite dans l’atelier !',
                'catchphrase' => 'Atelier d\'art créatif à Mons. Pour les enfants, les parents, les adultes, les couples, les solitaires, les groupes. Pour vous, quoi.',
            ],
        ];

        foreach ($sections as $section => $content) {
            SiteContent::updateOrCreate(['section' => $section], ['content' => $content]);
        }
    }

    /**
     * Copy the versioned header photos to the public disk.
     *
     * @return list<string> Public URLs, in display order.
     */
    private function copyHeaderImages(): array
    {
        return collect(['photo1.jpg', 'photo2.jpg', 'photo3.jpg'])
            ->map(function (string $photo): string {
                $targetPath = 'content/header-'.$photo;

                Storage::disk('public')->put(
                    $targetPath,
                    file_get_contents(database_path('seeders/images/contents/'.$photo)),
                );

                return '/storage/'.$targetPath;
            })
            ->all();
    }
}
