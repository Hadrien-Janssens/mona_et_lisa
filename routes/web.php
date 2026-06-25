<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\WorkshopController;
use App\Http\Controllers\Admin\WorkshopImageController;
use App\Http\Controllers\Admin\WorkshopSessionController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\StripeWebhookController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SiteController::class, 'index'])->name('home');
Route::get('/ateliers/{workshop:slug}', [SiteController::class, 'show'])->name('workshops.show');

Route::get('/reserver/{session}', [CheckoutController::class, 'show'])->name('checkout.show');
Route::post('/reserver/{session}', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/paiement-valide', [CheckoutController::class, 'success'])->name('checkout.success');
Route::post('/paiement-valide/activer', [CheckoutController::class, 'activateAccount'])->name('checkout.activate');
Route::post('/stripe/webhook', [StripeWebhookController::class, 'handle'])->name('stripe.webhook');

use App\Http\Controllers\UserBookingController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('booking', [UserBookingController::class, 'index'])->name('booking');
    Route::post('/bookings/{booking}/cancel', [CheckoutController::class, 'cancel'])->name('bookings.cancel');

    Route::middleware(['admin'])->group(function () {
        Route::get('admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::resource('admin/events', EventController::class)->names('admin.events')->except(['show']);
        Route::resource('admin/workshops', WorkshopController::class)->names('admin.workshops');
        
        // Content Management
        Route::get('admin/content', [\App\Http\Controllers\Admin\ContentController::class, 'index'])->name('admin.content.index');
        Route::post('admin/content/{section}', [\App\Http\Controllers\Admin\ContentController::class, 'update'])->name('admin.content.update');

        Route::post('admin/workshops/{workshop}/images', [WorkshopImageController::class, 'store'])->name('admin.workshops.images.store');
        Route::post('admin/workshops/{workshop}/images/reorder', [WorkshopImageController::class, 'reorder'])->name('admin.workshops.images.reorder');
        Route::patch('admin/workshop-images/{image}', [WorkshopImageController::class, 'update'])->name('admin.workshop-images.update');
        Route::delete('admin/workshop-images/{image}', [WorkshopImageController::class, 'destroy'])->name('admin.workshop-images.destroy');

        Route::post('admin/workshops/{workshop}/sessions', [WorkshopSessionController::class, 'store'])->name('admin.workshops.sessions.store');
        Route::patch('admin/workshops/{workshop}/sessions/{session}', [WorkshopSessionController::class, 'update'])->name('admin.workshops.sessions.update');
        Route::delete('admin/workshops/{workshop}/sessions/{session}', [WorkshopSessionController::class, 'destroy'])->name('admin.workshops.sessions.destroy');
    });
});

require __DIR__ . '/settings.php';