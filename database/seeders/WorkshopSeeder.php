<?php

namespace Database\Seeders;

use App\Models\Workshop;
use App\Models\WorkshopImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class WorkshopSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Photos of database/seeders/images/workshops/gallery shared by every seeded workshop.
     *
     * @var list<string>
     */
    private const GALLERY_PHOTOS = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg'];

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
            ],
            [
                'title' => 'Aquarelle',
                'slug' => 'atelier-aquarelle-moderne-et-botanique',
                'summary' => 'Explorez les techniques de l\'aquarelle à travers l\'illustration végétale.',
                'description' => "Laissez libre cours à votre créativité lors de cet atelier d'aquarelle axé sur les motifs floraux et botaniques. Apprenez à mélanger les couleurs, à maîtriser l'eau sur le papier et à réaliser une composition harmonieuse.",
                'price' => 3500, // 35.00€
                'duration_minutes' => 90,
            ],
            [
                'title' => 'Duo',
                'slug' => 'creation-de-bijoux-en-resine-et-fleurs-sechees',
                'summary' => 'Concevez vos propres boucles d\'oreilles et colliers uniques.',
                'description' => 'Dans cet atelier, vous apprendrez à manipuler la résine UV pour encapsuler de délicates fleurs séchées. Choisissez vos moules, vos fleurs et composez deux parures de bijoux personnalisées à emporter chez vous.',
                'price' => 5500, // 55.00€
                'duration_minutes' => 120,
            ],
            [
                'title' => 'Peinture sur Céramique',
                'slug' => 'atelier-peinture-sur-ceramique',
                'summary' => 'Personnalisez une tasse ou une assiette selon vos envies.',
                'description' => 'Venez décorer votre propre pièce en céramique (déjà cuite) avec des peintures et glaçures professionnelles. Laissez parler votre imagination ! Vos pièces seront ensuite cuites dans notre four à 1000°C et prêtes à être récupérées une semaine plus tard.',
                'price' => 3000, // 30.00€
                'duration_minutes' => 90,
            ],
        ];

        // 3. Insérer les ateliers, leurs images et leurs sessions
        foreach ($workshopsData as $data) {
            $workshop = Workshop::create($data);

            $workshop->update([
                'card_thumbnail_path' => $this->copySeedImage(
                    'workshops/thumbnails/photo1.png',
                    'workshops/thumbnails/'.$workshop->slug.'.png',
                ),
            ]);

            // Chaque atelier reçoit sa propre copie des photos de la galerie
            foreach (self::GALLERY_PHOTOS as $index => $photo) {
                WorkshopImage::create([
                    'workshop_id' => $workshop->id,
                    'path' => $this->copySeedImage(
                        'workshops/gallery/'.$photo,
                        'workshops/images/'.$workshop->slug.'-'.$photo,
                    ),
                    'sort_order' => $index,
                    'tags' => [],
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

    /**
     * Copy a versioned image from database/seeders/images to the public disk.
     *
     * @return string Path relative to the public disk.
     */
    private function copySeedImage(string $sourceRelativePath, string $targetPath): string
    {
        Storage::disk('public')->put(
            $targetPath,
            file_get_contents(database_path('seeders/images/'.$sourceRelativePath)),
        );

        return $targetPath;
    }
}
