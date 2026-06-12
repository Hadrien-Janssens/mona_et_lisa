<?php

use App\Models\User;
use App\Models\Workshop;

test('guests cannot access workshops index', function () {
    $this->get(route('admin.workshops.index'))
        ->assertRedirect(route('login'));
});

test('standard authenticated users cannot access workshops index', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)
        ->get(route('admin.workshops.index'))
        ->assertForbidden();
});

test('administrators can access workshops index', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get(route('admin.workshops.index'))
        ->assertSuccessful();
});

test('an administrator can create a workshop', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post(route('admin.workshops.store'), [
            'title' => 'Test Poterie',
            'description' => 'Description de test',
            'summary' => 'Résumé de test',
            'price' => 45.50,
            'duration_minutes' => 120,
            'is_active' => true,
        ])
        ->assertRedirect(route('admin.workshops.index'))
        ->assertSessionHas('toast');

    $this->assertDatabaseHas('workshops', [
        'title' => 'Test Poterie',
        'slug' => 'test-poterie',
        'price' => 4550, // Price in cents
        'duration_minutes' => 120,
        'is_active' => 1,
    ]);
});

test('an administrator can update a workshop', function () {
    $admin = User::factory()->admin()->create();
    $workshop = Workshop::factory()->create([
        'title' => 'Old Title',
        'price' => 3000,
    ]);

    $this->actingAs($admin)
        ->put(route('admin.workshops.update', $workshop), [
            'title' => 'New Title',
            'description' => 'Updated description',
            'summary' => 'Updated summary',
            'price' => 35.00,
            'duration_minutes' => 90,
            'is_active' => false,
        ])
        ->assertRedirect(route('admin.workshops.index'))
        ->assertSessionHas('toast');

    $this->assertDatabaseHas('workshops', [
        'id' => $workshop->id,
        'title' => 'New Title',
        'slug' => 'new-title',
        'price' => 3500,
        'is_active' => 0,
    ]);
});

test('an administrator can delete a workshop', function () {
    $admin = User::factory()->admin()->create();
    $workshop = Workshop::factory()->create();

    $this->actingAs($admin)
        ->delete(route('admin.workshops.destroy', $workshop))
        ->assertRedirect(route('admin.workshops.index'))
        ->assertSessionHas('toast');

    $this->assertDatabaseMissing('workshops', [
        'id' => $workshop->id,
    ]);
});
