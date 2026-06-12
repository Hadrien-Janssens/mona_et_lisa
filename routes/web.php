<?php

use App\Http\Controllers\Admin\WorkshopController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::middleware(['admin'])->group(function () {
        Route::resource('admin/workshops', WorkshopController::class)->names('admin.workshops');
    });
});

require __DIR__.'/settings.php';
