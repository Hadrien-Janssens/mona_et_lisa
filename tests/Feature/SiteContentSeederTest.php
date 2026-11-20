<?php

use App\Models\SiteContent;
use Database\Seeders\SiteContentSeeder;
use Illuminate\Support\Facades\Storage;

it('seeds every site content section idempotently', function () {
    Storage::fake('public');

    $this->seed(SiteContentSeeder::class);
    $this->seed(SiteContentSeeder::class);

    expect(SiteContent::count())->toBe(6);
    expect(SiteContent::where('section', 'schedule')->first()->content['schedules'])->toHaveCount(3);
    expect(SiteContent::where('section', 'header')->first()->content['title'])->toBe('Libérez votre créativité !');
    $images = SiteContent::where('section', 'header')->first()->content['images'];
    expect($images)->toHaveCount(3);
    Storage::disk('public')->assertExists('content/header-photo1.jpg');
});
