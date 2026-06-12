<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\WorkshopController;
use App\Http\Controllers\Admin\WorkshopImageController;
use App\Http\Controllers\Admin\WorkshopSessionController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::middleware(['admin'])->group(function () {
        Route::get('admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::resource('admin/workshops', WorkshopController::class)->names('admin.workshops');
        Route::post('admin/workshops/{workshop}/images', [WorkshopImageController::class, 'store'])->name('admin.workshops.images.store');
        Route::post('admin/workshops/{workshop}/images/reorder', [WorkshopImageController::class, 'reorder'])->name('admin.workshops.images.reorder');
        Route::patch('admin/workshop-images/{image}', [WorkshopImageController::class, 'update'])->name('admin.workshop-images.update');
        Route::delete('admin/workshop-images/{image}', [WorkshopImageController::class, 'destroy'])->name('admin.workshop-images.destroy');

        Route::post('admin/workshops/{workshop}/sessions', [WorkshopSessionController::class, 'store'])->name('admin.workshops.sessions.store');
        Route::patch('admin/workshops/{workshop}/sessions/{session}', [WorkshopSessionController::class, 'update'])->name('admin.workshops.sessions.update');
        Route::delete('admin/workshops/{workshop}/sessions/{session}', [WorkshopSessionController::class, 'destroy'])->name('admin.workshops.sessions.destroy');
    });
});

require __DIR__.'/settings.php';
