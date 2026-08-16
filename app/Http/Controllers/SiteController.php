<?php

namespace App\Http\Controllers;

use App\Models\Workshop;
use App\Models\WorkshopSession;
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

        return Inertia::render('site/App', [
            'workshops' => $workshops,
        ]);
    }

    public function show(Workshop $workshop): Response
    {
        abort_if(! $workshop->is_active, 404);

        $workshop->load(['images' => function ($query) {
            $query->orderBy('sort_order');
        }, 'sessions' => function ($query) {
            $query->where('start_at', '>=', now())->orderBy('start_at');
        }]);

        $sessions = WorkshopSession::with('workshop')
            ->where('start_at', '>', now())
            ->orderBy('date', 'asc')
            ->get();

        return Inertia::render('site/atelier', [
            'workshop' => $workshop,
            'sessions' => $sessions,
        ]);
    }
}
