<?php

use App\Models\Workshop;
use Database\Seeders\WorkshopSeeder;
use Illuminate\Support\Facades\Storage;

it('seeds workshops with the same four gallery photos and a thumbnail', function () {
    Storage::fake('public');

    $this->seed(WorkshopSeeder::class);

    expect(Workshop::count())->toBe(4);

    Workshop::with('images')->get()->each(function (Workshop $workshop) {
        expect($workshop->images)->toHaveCount(4);
        Storage::disk('public')->assertExists($workshop->card_thumbnail_path);
        $workshop->images->each(fn ($image) => Storage::disk('public')->assertExists($image->path));
    });
});
