<?php

namespace Database\Seeders;

use App\Models\Workshop;
use App\Models\WorkshopImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkshopSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 2. Définir des ateliers réalistes
        $workshopsData = [
            [
                'title' => 'Poterie',
                'slug' => 'initiation-a-la-poterie-au-tour',
                'summary' => 'Découvrez les bases du tournage et repartez avec vos propres créations.',
                'description' => "Rejoignez-nous pour un atelier immersif de 2 heures où vous apprendrez à façonner l'argile sur un tour de potier. Notre artisan vous guidera pas à pas depuis le centrage de la terre jusqu'au façonnage de vos premiers bols et tasses.",
                'price' => 4500, // 45.00€
                'duration_minutes' => 120,
                'images' => [
                    ['path' => 'images/workshops/poterie-1.jpg', 'is_cover' => true],
                    ['path' => 'images/workshops/poterie-2.jpg', 'is_cover' => false],
                    ['path' => 'images/workshops/poterie-3.jpg', 'is_cover' => false],
                ],
            ],
            [
                'title' => 'Aquarelle',
                'slug' => 'atelier-aquarelle-moderne-et-botanique',
                'summary' => 'Explorez les techniques de l\'aquarelle à travers l\'illustration végétale.',
                'description' => "Laissez libre cours à votre créativité lors de cet atelier d'aquarelle axé sur les motifs floraux et botaniques. Apprenez à mélanger les couleurs, à maîtriser l'eau sur le papier et à réaliser une composition harmonieuse.",
                'price' => 3500, // 35.00€
                'duration_minutes' => 90,
                'images' => [
                    ['path' => 'images/workshops/aquarelle-1.jpg', 'is_cover' => true],
                    ['path' => 'images/workshops/aquarelle-2.jpg', 'is_cover' => false],
                ],
            ],
            [
                'title' => 'Duo',
                'slug' => 'creation-de-bijoux-en-resine-et-fleurs-sechees',
                'summary' => 'Concevez vos propres boucles d\'oreilles et colliers uniques.',
                'description' => 'Dans cet atelier, vous apprendrez à manipuler la résine UV pour encapsuler de délicates fleurs séchées. Choisissez vos moules, vos fleurs et composez deux parures de bijoux personnalisées à emporter chez vous.',
                'price' => 5500, // 55.00€
                'duration_minutes' => 120,
                'images' => [
                    ['path' => 'images/workshops/bijoux-1.jpg', 'is_cover' => true],
                    ['path' => 'images/workshops/bijoux-2.jpg', 'is_cover' => false],
                ],
            ],
            [
                'title' => 'Peinture sur Céramique',
                'slug' => 'atelier-peinture-sur-ceramique',
                'summary' => 'Personnalisez une tasse ou une assiette selon vos envies.',
                'description' => 'Venez décorer votre propre pièce en céramique (déjà cuite) avec des peintures et glaçures professionnelles. Laissez parler votre imagination ! Vos pièces seront ensuite cuites dans notre four à 1000°C et prêtes à être récupérées une semaine plus tard.',
                'price' => 3000, // 30.00€
                'duration_minutes' => 90,
                'images' => [
                    ['path' => 'images/workshops/ceramique-1.jpg', 'is_cover' => true],
                    ['path' => 'images/workshops/ceramique-2.jpg', 'is_cover' => false],
                ],
            ],
        ];

        // 3. Insérer les ateliers, leurs images et leurs sessions
        foreach ($workshopsData as $data) {
            $images = $data['images'];
            unset($data['images']);

            $workshop = Workshop::create($data);

            // Insérer les images
            foreach ($images as $index => $img) {
                WorkshopImage::create([
                    'workshop_id' => $workshop->id,
                    'path' => $img['path'],
                    'is_cover' => $img['is_cover'],
                    'sort_order' => $index,
                ]);
            }

            // Créer 3 sessions pour chaque atelier
            $workshop->sessions()->create([
                'start_at' => now()->addDays(rand(2, 5))->setHour(14)->setMinute(0)->setSecond(0),
                'max_participants' => 8,
            ]);
            $workshop->sessions()->create([
                'start_at' => now()->addDays(rand(7, 12))->setHour(10)->setMinute(0)->setSecond(0),
                'max_participants' => 10,
            ]);
            $workshop->sessions()->create([
                'start_at' => now()->addDays(rand(14, 20))->setHour(16)->setMinute(30)->setSecond(0),
                'max_participants' => 8,
            ]);
        }
    }
}
