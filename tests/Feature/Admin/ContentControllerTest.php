<?php

use App\Models\User;
use App\Models\SiteContent;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

beforeEach(function () {
    $this->admin = User::factory()->create(['is_admin' => true]);
});

it('can view the content management page', function () {
    actingAs($this->admin)
        ->get(route('admin.content.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/content/index')
            ->has('contents.header')
            ->has('contents.about')
        );
});

it('can update json content for a section', function () {
    $data = [
        'content' => [
            'title' => 'Nouveau Titre',
            'subtitle' => 'Nouveau sous-titre',
        ]
    ];

    actingAs($this->admin)
        ->post(route('admin.content.update', ['section' => 'header']), $data)
        ->assertRedirect()
        ->assertSessionHas('success');

    $siteContent = SiteContent::where('section', 'header')->first();
    expect($siteContent)->not->toBeNull();
    expect($siteContent->content['title'])->toBe('Nouveau Titre');
});

it('can upload images when updating content', function () {
    Storage::fake('public');

    $file = UploadedFile::fake()->image('photo.jpg');

    $data = [
        'content' => [
            'title' => 'Titre avec image',
        ],
        'images' => [
            '0' => $file,
        ],
    ];

    actingAs($this->admin)
        ->post(route('admin.content.update', ['section' => 'header']), $data)
        ->assertRedirect();

    $siteContent = SiteContent::where('section', 'header')->first();
    
    expect($siteContent->content['images'])->toHaveCount(1);
    
    $imagePath = str_replace('/storage/', '', $siteContent->content['images'][0]);
    Storage::disk('public')->assertExists($imagePath);
});
