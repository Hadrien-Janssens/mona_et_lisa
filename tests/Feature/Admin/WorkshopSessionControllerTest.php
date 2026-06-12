<?php

use App\Models\User;
use App\Models\Workshop;
use App\Models\WorkshopSession;
use Illuminate\Support\Carbon;

test('guests cannot manage workshop sessions', function () {
    $workshop = Workshop::factory()->create();
    $session = WorkshopSession::factory()->create(['workshop_id' => $workshop->id]);

    $this->post(route('admin.workshops.sessions.store', $workshop), [
        'start_at' => now()->addDays(5)->toDateTimeString(),
        'max_participants' => 10,
    ])->assertRedirect(route('login'));

    $this->patch(route('admin.workshops.sessions.update', [$workshop, $session]), [
        'start_at' => now()->addDays(6)->toDateTimeString(),
        'max_participants' => 12,
    ])->assertRedirect(route('login'));

    $this->delete(route('admin.workshops.sessions.destroy', [$workshop, $session]))
        ->assertRedirect(route('login'));
});

test('non-admin users cannot manage workshop sessions', function () {
    $user = User::factory()->create(['is_admin' => false]);
    $workshop = Workshop::factory()->create();
    $session = WorkshopSession::factory()->create(['workshop_id' => $workshop->id]);

    $this->actingAs($user);

    $this->post(route('admin.workshops.sessions.store', $workshop), [
        'start_at' => now()->addDays(5)->toDateTimeString(),
        'max_participants' => 10,
    ])->assertForbidden();

    $this->patch(route('admin.workshops.sessions.update', [$workshop, $session]), [
        'start_at' => now()->addDays(6)->toDateTimeString(),
        'max_participants' => 12,
    ])->assertForbidden();

    $this->delete(route('admin.workshops.sessions.destroy', [$workshop, $session]))
        ->assertForbidden();
});

test('an admin can add a new workshop session', function () {
    $admin = User::factory()->admin()->create();
    $workshop = Workshop::factory()->create();
    $startAt = Carbon::now()->addDays(5)->startOfMinute();

    $this->actingAs($admin)
        ->post(route('admin.workshops.sessions.store', $workshop), [
            'start_at' => $startAt->toDateTimeString(),
            'max_participants' => 15,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('workshop_sessions', [
        'workshop_id' => $workshop->id,
        'start_at' => $startAt,
        'max_participants' => 15,
    ]);
});

test('an admin can update a workshop session', function () {
    $admin = User::factory()->admin()->create();
    $workshop = Workshop::factory()->create();
    $session = WorkshopSession::factory()->create([
        'workshop_id' => $workshop->id,
        'start_at' => now()->addDays(5),
        'max_participants' => 10,
    ]);

    $newStartAt = Carbon::now()->addDays(10)->startOfMinute();

    $this->actingAs($admin)
        ->patch(route('admin.workshops.sessions.update', [$workshop, $session]), [
            'start_at' => $newStartAt->toDateTimeString(),
            'max_participants' => 20,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('workshop_sessions', [
        'id' => $session->id,
        'start_at' => $newStartAt,
        'max_participants' => 20,
    ]);
});

test('an admin can delete a workshop session', function () {
    $admin = User::factory()->admin()->create();
    $workshop = Workshop::factory()->create();
    $session = WorkshopSession::factory()->create([
        'workshop_id' => $workshop->id,
    ]);

    $this->actingAs($admin)
        ->delete(route('admin.workshops.sessions.destroy', [$workshop, $session]))
        ->assertRedirect();

    $this->assertSoftDeleted('workshop_sessions', [
        'id' => $session->id,
    ]);
});

test('it validates required fields when storing a session', function () {
    $admin = User::factory()->admin()->create();
    $workshop = Workshop::factory()->create();

    $this->actingAs($admin)
        ->post(route('admin.workshops.sessions.store', $workshop), [])
        ->assertSessionHasErrors(['start_at', 'max_participants']);
});
