<?php

use App\Models\User;
use App\Models\Workshop;
use App\Models\WorkshopImage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('guests cannot manage workshop images', function () {
    $workshop = Workshop::factory()->create();
    $image = WorkshopImage::factory()->create(['workshop_id' => $workshop->id]);

    $this->post(route('admin.workshops.images.store', $workshop), [
        'image' => UploadedFile::fake()->image('test.jpg'),
    ])->assertRedirect(route('login'));

    $this->patch(route('admin.workshop-images.update', $image), [
        'is_cover' => true,
    ])->assertRedirect(route('login'));

    $this->delete(route('admin.workshop-images.destroy', $image))
        ->assertRedirect(route('login'));
});

test('non-admin users cannot manage workshop images', function () {
    $user = User::factory()->create(['is_admin' => false]);
    $workshop = Workshop::factory()->create();
    $image = WorkshopImage::factory()->create(['workshop_id' => $workshop->id]);

    $this->actingAs($user);

    $this->post(route('admin.workshops.images.store', $workshop), [
        'image' => UploadedFile::fake()->image('test.jpg'),
    ])->assertForbidden();

    $this->patch(route('admin.workshop-images.update', $image), [
        'is_cover' => true,
    ])->assertForbidden();

    $this->delete(route('admin.workshop-images.destroy', $image))
        ->assertForbidden();
});

test('an admin can upload a workshop image with tags', function () {
    Storage::fake('public');
    $admin = User::factory()->admin()->create();
    $workshop = Workshop::factory()->create();

    $file = UploadedFile::fake()->image('workshop_photo.jpg');

    $this->actingAs($admin)
        ->post(route('admin.workshops.images.store', $workshop), [
            'image' => $file,
            'tags' => ['ambiance', 'poterie'],
        ])
        ->assertRedirect();

    $image = $workshop->images()->first();
    expect($image)->not->toBeNull();
    expect($image->is_cover)->toBeTrue(); // First image should automatically be cover
    expect($image->sort_order)->toBe(0);
    expect($image->tags)->toBe(['ambiance', 'poterie']);

    Storage::disk('public')->assertExists($image->path);
});

test('an admin can update tags and cover status of an image', function () {
    Storage::fake('public');
    $admin = User::factory()->admin()->create();
    $workshop = Workshop::factory()->create();

    $image1 = WorkshopImage::factory()->create([
        'workshop_id' => $workshop->id,
        'is_cover' => true,
        'tags' => ['old'],
    ]);

    $image2 = WorkshopImage::factory()->create([
        'workshop_id' => $workshop->id,
        'is_cover' => false,
        'tags' => [],
    ]);

    // Update tags on image1
    $this->actingAs($admin)
        ->patch(route('admin.workshop-images.update', $image1), [
            'tags' => ['new', 'cool'],
        ])
        ->assertRedirect();

    expect($image1->fresh()->tags)->toBe(['new', 'cool']);

    // Set image2 as cover
    $this->actingAs($admin)
        ->patch(route('admin.workshop-images.update', $image2), [
            'is_cover' => true,
        ])
        ->assertRedirect();

    expect($image2->fresh()->is_cover)->toBeTrue();
    expect($image1->fresh()->is_cover)->toBeFalse(); // Should have been unset
});

test('an admin can delete an image and cover gets promoted', function () {
    Storage::fake('public');
    $admin = User::factory()->admin()->create();
    $workshop = Workshop::factory()->create();

    $image1 = WorkshopImage::factory()->create([
        'workshop_id' => $workshop->id,
        'is_cover' => true,
        'path' => 'workshops/images/img1.jpg',
        'sort_order' => 0,
    ]);

    $image2 = WorkshopImage::factory()->create([
        'workshop_id' => $workshop->id,
        'is_cover' => false,
        'path' => 'workshops/images/img2.jpg',
        'sort_order' => 1,
    ]);

    // Put mock files
    Storage::disk('public')->put($image1->path, 'contents');
    Storage::disk('public')->put($image2->path, 'contents');

    // Delete cover image
    $this->actingAs($admin)
        ->delete(route('admin.workshop-images.destroy', $image1))
        ->assertRedirect();

    // Verify image1 is deleted
    $this->assertDatabaseMissing('workshop_images', ['id' => $image1->id]);
    Storage::disk('public')->assertMissing($image1->path);

    // Verify image2 is now cover
    expect($image2->fresh()->is_cover)->toBeTrue();
});

test('an admin can reorder workshop images', function () {
    $admin = User::factory()->admin()->create();
    $workshop = Workshop::factory()->create();

    $image1 = WorkshopImage::factory()->create([
        'workshop_id' => $workshop->id,
        'sort_order' => 0,
    ]);

    $image2 = WorkshopImage::factory()->create([
        'workshop_id' => $workshop->id,
        'sort_order' => 1,
    ]);

    $this->actingAs($admin)
        ->post(route('admin.workshops.images.reorder', $workshop), [
            'images' => [
                ['id' => $image1->id, 'sort_order' => 1],
                ['id' => $image2->id, 'sort_order' => 0],
            ],
        ])
        ->assertRedirect();

    expect($image1->fresh()->sort_order)->toBe(1);
    expect($image2->fresh()->sort_order)->toBe(0);
});
