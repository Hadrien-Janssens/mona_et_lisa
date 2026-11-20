<?php

use App\Models\SiteContent;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\actingAs;

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
        ],
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

it('preserves existing images when only updating text content', function () {
    $siteContent = SiteContent::create([
        'section' => 'about',
        'content' => [
            'title' => 'Ancien Titre',
            'description' => 'Description',
            'default_images' => ['/storage/content/img1.jpg', '/storage/content/img2.jpg'],
            'hover_images' => ['/storage/content/hover1.jpg'],
        ],
    ]);

    actingAs($this->admin)
        ->post(route('admin.content.update', ['section' => 'about']), [
            'content' => [
                'title' => 'Nouveau Titre',
                'description' => 'Nouvelle description',
            ],
        ])
        ->assertRedirect();

    $siteContent->refresh();
    expect($siteContent->content['title'])->toBe('Nouveau Titre');
    expect($siteContent->content['default_images'])->toBe(['/storage/content/img1.jpg', '/storage/content/img2.jpg']);
    expect($siteContent->content['hover_images'])->toBe(['/storage/content/hover1.jpg']);
});

it('replaces a specific indexed image in an array without appending extra items', function () {
    Storage::fake('public');

    $siteContent = SiteContent::create([
        'section' => 'about',
        'content' => [
            'title' => 'Titre',
            'description' => 'Description',
            'default_images' => ['/storage/content/existing0.jpg', '/storage/content/existing1.jpg'],
        ],
    ]);

    $newFile = UploadedFile::fake()->image('new_second.jpg');

    actingAs($this->admin)
        ->post(route('admin.content.update', ['section' => 'about']), [
            'content' => [
                'title' => 'Titre',
                'description' => 'Description',
            ],
            'default_images' => [
                '1' => $newFile,
            ],
        ])
        ->assertRedirect();

    $siteContent->refresh();
    $images = $siteContent->content['default_images'];
    expect($images)->toHaveCount(2);
    expect($images[0])->toBe('/storage/content/existing0.jpg');
    expect($images[1])->not->toBe('/storage/content/existing1.jpg');

    $storedPath = str_replace('/storage/', '', $images[1]);
    Storage::disk('public')->assertExists($storedPath);
});

it('can update specific indices of default_images and hover_images simultaneously', function () {
    Storage::fake('public');

    $siteContent = SiteContent::create([
        'section' => 'about',
        'content' => [
            'title' => 'Titre',
            'description' => 'Description',
            'default_images' => ['/storage/content/m_def.jpg', '/storage/content/l_def.jpg'],
            'hover_images' => ['/storage/content/m_hov.jpg', '/storage/content/l_hov.jpg'],
        ],
    ]);

    $newMonaHover = UploadedFile::fake()->image('new_m_hov.jpg');
    $newLisaDefault = UploadedFile::fake()->image('new_l_def.jpg');

    actingAs($this->admin)
        ->post(route('admin.content.update', ['section' => 'about']), [
            'content' => [
                'title' => 'Titre mis à jour',
                'description' => 'Description',
            ],
            'default_images' => [
                '1' => $newLisaDefault,
            ],
            'hover_images' => [
                '0' => $newMonaHover,
            ],
        ])
        ->assertRedirect();

    $siteContent->refresh();

    // Mona default should be untouched
    expect($siteContent->content['default_images'][0])->toBe('/storage/content/m_def.jpg');
    // Lisa default should be updated
    expect($siteContent->content['default_images'][1])->not->toBe('/storage/content/l_def.jpg');
    // Mona hover should be updated
    expect($siteContent->content['hover_images'][0])->not->toBe('/storage/content/m_hov.jpg');
    // Lisa hover should be untouched
    expect($siteContent->content['hover_images'][1])->toBe('/storage/content/l_hov.jpg');
});
