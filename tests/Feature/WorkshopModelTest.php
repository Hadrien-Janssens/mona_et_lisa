<?php

use App\Models\Booking;
use App\Models\Workshop;
use App\Models\WorkshopImage;
use App\Models\WorkshopSession;

test('a workshop can be created and has properties', function () {
    $workshop = Workshop::factory()->create([
        'title' => 'My Art Workshop',
        'price' => 5000,
    ]);

    expect($workshop->title)->toBe('My Art Workshop');
    expect($workshop->price)->toBe(5000);
    expect($workshop->is_active)->toBeTrue();
});

test('a workshop has ordered images and a card thumbnail with gallery fallback', function () {
    $workshop = Workshop::factory()->create();

    $image1 = WorkshopImage::factory()->create([
        'workshop_id' => $workshop->id,
        'sort_order' => 1,
    ]);

    $image2 = WorkshopImage::factory()->create([
        'workshop_id' => $workshop->id,
        'path' => 'workshops/images/first.jpg',
        'sort_order' => 0,
    ]);

    expect($workshop->images)->toHaveCount(2);
    // Should be ordered by sort_order
    expect($workshop->images->first()->id)->toBe($image2->id);

    // Without a thumbnail, the first gallery image is used
    expect($workshop->card_thumbnail_display_path)->toBe('workshops/images/first.jpg');

    $workshop->update(['card_thumbnail_path' => 'workshops/thumbnails/thumb.jpg']);
    expect($workshop->card_thumbnail_display_path)->toBe('workshops/thumbnails/thumb.jpg');
});

test('a workshop has sessions and calculates spots left', function () {
    $workshop = Workshop::factory()->create();

    $session = WorkshopSession::factory()->create([
        'workshop_id' => $workshop->id,
        'max_participants' => 10,
    ]);

    expect($session->workshop->id)->toBe($workshop->id);
    expect($session->spots_left)->toBe(10);
    expect($session->hasPlacesLeft(2))->toBeTrue();

    // Create a paid booking
    Booking::factory()->create([
        'workshop_session_id' => $session->id,
        'seats' => 3,
        'payment_status' => 'paid',
    ]);

    // Create a pending booking (should not affect spots left)
    Booking::factory()->create([
        'workshop_session_id' => $session->id,
        'seats' => 2,
        'payment_status' => 'pending',
    ]);

    expect($session->fresh()->spots_left)->toBe(7);
    expect($session->hasPlacesLeft(8))->toBeFalse();
    expect($session->hasPlacesLeft(7))->toBeTrue();
});

test('a workshop can be soft deleted and restored', function () {
    $workshop = Workshop::factory()->create();

    $workshop->delete();

    expect(Workshop::find($workshop->id))->toBeNull();
    expect(Workshop::withTrashed()->find($workshop->id))->not->toBeNull();
    expect($workshop->trashed())->toBeTrue();

    $workshop->restore();

    expect(Workshop::find($workshop->id))->not->toBeNull();
    expect($workshop->trashed())->toBeFalse();
});

test('a workshop session can be soft deleted and restored', function () {
    $session = WorkshopSession::factory()->create();

    $session->delete();

    expect(WorkshopSession::find($session->id))->toBeNull();
    expect(WorkshopSession::withTrashed()->find($session->id))->not->toBeNull();
    expect($session->trashed())->toBeTrue();

    $session->restore();

    expect(WorkshopSession::find($session->id))->not->toBeNull();
    expect($session->trashed())->toBeFalse();
});
