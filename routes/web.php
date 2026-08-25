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
use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\StripeSettingsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserBookingController;


// ROUTE CONFIG
// lien symbolique
// Route::get('/creer-lien-relatif', function () {
//     $link = public_path('storage');
//     $target = '../storage/app/public';
//     if (file_exists($link)) {
//         unlink($link);
//     }
//     symlink($target, $link);

//     return 'Lien relatif créé avec succès !';
// });

Route::get('/fresh-db', function () {
    try {
        // Le paramètre --force est OBLIGATOIRE en production,
        // sinon Laravel bloque la commande par sécurité.
        \Illuminate\Support\Facades\Artisan::call('migrate:fresh', [
            '--force' => true
        ]);

        $output = \Illuminate\Support\Facades\Artisan::output();
        return 'Base de données réinitialisée avec succès !<br><br><pre>' . $output . '</pre>';
    } catch (\Exception $e) {
        return 'Une erreur est survenue : ' . $e->getMessage();
    }
});

Route::get('/optimize', function () {
    // 1. On vide tous les anciens caches
    \Illuminate\Support\Facades\Artisan::call('optimize:clear');

    // 2. On recrée le cache avec le nouveau .env
    \Illuminate\Support\Facades\Artisan::call('optimize');

    $output = \Illuminate\Support\Facades\Artisan::output();
    return 'Le cache est à jour !<br><br><pre>' . $output . '</pre>';
});


// FIN DES ROUTES DE CONFIG

Route::get('/', [SiteController::class, 'index'])->name('home');
Route::get('/ateliers/{workshop:slug}', [SiteController::class, 'show'])->name('workshops.show');
Route::get('/reserver/{session}', [CheckoutController::class, 'show'])->name('checkout.show');
Route::post('/reserver/{session}', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/paiement-valide', [CheckoutController::class, 'success'])->name('checkout.success');
Route::post('/paiement-valide/activer', [CheckoutController::class, 'activateAccount'])->name('checkout.activate');
Route::post('/stripe/webhook', [StripeWebhookController::class, 'handle'])->name('stripe.webhook');

//MAIL CONTACT
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('booking', [UserBookingController::class, 'index'])->name('booking');
    Route::post('/bookings/{booking}/cancel', [CheckoutController::class, 'cancel'])->name('bookings.cancel');

    Route::middleware(['admin'])->group(function () {
        Route::get('admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');




        // STRIPE
        Route::get('admin/stripe', [StripeSettingsController::class, 'edit'])->name('admin.stripe.edit');
        Route::put('admin/stripe', [StripeSettingsController::class, 'update'])->name('admin.stripe.update');
        // ---------------
        Route::resource('admin/events', EventController::class)->names('admin.events')->except(['show']);
        Route::resource('admin/workshops', WorkshopController::class)->names('admin.workshops');

        // Content Management
        Route::get('admin/content', [ContentController::class, 'index'])->name('admin.content.index');
        Route::post('admin/content/{section}', [ContentController::class, 'update'])->name('admin.content.update');

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
