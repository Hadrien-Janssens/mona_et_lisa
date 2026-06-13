<?php

namespace App\Http\Controllers;

use App\Models\Workshop;
use Inertia\Inertia;
use Inertia\Response;

class SiteController extends Controller
{
    public function index(): Response
    {
        $workshops = Workshop::query()
            ->where('is_active', true)
            ->with(['coverImage'])
            ->get();

        return Inertia::render('site/app', [
            'workshops' => $workshops,
        ]);
    }

    public function show(Workshop $workshop): Response
    {
        abort_if(! $workshop->is_active, 404);

        $workshop->load(['images', 'sessions' => function ($query) {
            $query->where('start_at', '>=', now())->orderBy('start_at');
        }]);

        return Inertia::render('site/atelier', [
            'workshop' => $workshop,
        ]);
    }
}
