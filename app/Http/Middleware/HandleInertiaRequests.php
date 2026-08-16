<?php

namespace App\Http\Middleware;

use App\Models\SiteContent;
use App\Models\Workshop;
use App\Models\WorkshopSession;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'siteContents' => fn () => ! $request->is('admin*') ? (function () {
                $contents = SiteContent::all()->keyBy('section')->map(fn ($content) => $content->content);

                return [
                    'header' => $contents->get('header', []),
                    'about' => $contents->get('about', []),
                    'workshop' => $contents->get('workshop', []),
                    'schedule' => $contents->get('schedule', []),
                    'contact' => $contents->get('contact', []),
                    'footer' => $contents->get('footer', []),
                ];
            })() : null,
            'globalWorkshops' => fn () => ! $request->is('admin*')
                ? Workshop::where('is_active', true)->select('id', 'title', 'slug')->get()
                : null,
            'globalSessions' => fn () => ! $request->is('admin*')
                ? WorkshopSession::with('workshop')
                    ->where('start_at', '>=', now())
                    ->orderBy('start_at')
                    ->get()
                : null,
        ];
    }
}
