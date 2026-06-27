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

        $contents = \App\Models\SiteContent::all()->keyBy('section')->map(fn ($content) => $content->content);

        return Inertia::render('site/app', [
            'workshops' => $workshops,
            'siteContents' => [
                'header' => $contents->get('header', []),
                'about' => $contents->get('about', []),
                'workshop' => $contents->get('workshop', []),
                'schedule' => $contents->get('schedule', []),
                'contact' => $contents->get('contact', []),
                'footer' => $contents->get('footer', []),
            ],
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
