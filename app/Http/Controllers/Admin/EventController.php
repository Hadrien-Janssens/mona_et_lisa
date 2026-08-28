<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Bookings\CancelWorkshopSessionAction;
use App\Http\Controllers\Controller;
use App\Models\Workshop;
use App\Models\WorkshopSession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(Request $request): Response
    {
        $tab = $request->query('tab', 'upcoming');
        $workshopId = $request->query('workshop_id');

        $query = WorkshopSession::with('workshop')
            ->withCount('bookings')
            ->when($workshopId, fn ($q) => $q->where('workshop_id', $workshopId));

        if ($tab === 'past') {
            $query->where('start_at', '<', now())->orderBy('start_at', 'desc');
        } else {
            $query->where('start_at', '>=', now())->orderBy('start_at', 'asc');
        }

        $events = $query->paginate(20)->withQueryString();
        $workshops = Workshop::select('id', 'title')->get();

        return Inertia::render('admin/events/index', [
            'events' => $events,
            'workshops' => $workshops,
            'filters' => [
                'tab' => $tab,
                'workshop_id' => $workshopId,
            ],
        ]);
    }

    public function create(): Response
    {
        $workshops = Workshop::select('id', 'title')->get();

        return Inertia::render('admin/events/create', [
            'workshops' => $workshops,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'workshop_id' => 'required|exists:workshops,id',
            'start_at' => 'required|date',
            'max_participants' => 'required|integer|min:1',
        ]);

        WorkshopSession::create($validated);

        return redirect()->route('admin.events.index')->with('success', 'Événement créé avec succès.');
    }

    public function edit(WorkshopSession $event): Response
    {
        $event->load(['bookings' => function ($query) {
            $query->with('user')->orderBy('created_at', 'desc');
        }]);
        $workshops = Workshop::select('id', 'title')->get();

        return Inertia::render('admin/events/edit', [
            'event' => $event,
            'workshops' => $workshops,
        ]);
    }

    public function update(Request $request, WorkshopSession $event): RedirectResponse
    {
        $validated = $request->validate([
            'workshop_id' => 'required|exists:workshops,id',
            'start_at' => 'required|date',
            'max_participants' => 'required|integer|min:1',
        ]);

        $event->update($validated);

        return redirect()->route('admin.events.index')->with('success', 'Événement mis à jour avec succès.');
    }

    public function destroy(
        WorkshopSession $event,
        CancelWorkshopSessionAction $cancelSessionAction
    ): RedirectResponse {
        $cancelSessionAction->execute($event);

        return redirect()->route('admin.events.index')->with('success', 'Événement annulé et supprimé avec succès. Les remboursements ont été initiés le cas échéant.');
    }
}
