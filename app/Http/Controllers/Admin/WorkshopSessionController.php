<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\WorkshopSessionRequest;
use App\Models\Workshop;
use App\Models\WorkshopSession;
use Illuminate\Http\RedirectResponse;

class WorkshopSessionController extends Controller
{
    /**
     * Store a newly created session for the workshop.
     */
    public function store(WorkshopSessionRequest $request, Workshop $workshop): RedirectResponse
    {
        $workshop->sessions()->create($request->validated());

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Créneau ajouté avec succès.',
        ]);
    }

    /**
     * Update the specified session.
     */
    public function update(WorkshopSessionRequest $request, Workshop $workshop, WorkshopSession $session): RedirectResponse
    {
        $session->update($request->validated());

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Créneau mis à jour avec succès.',
        ]);
    }

    /**
     * Remove the specified session.
     */
    public function destroy(Workshop $workshop, WorkshopSession $session): RedirectResponse
    {
        $session->delete();

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Créneau supprimé avec succès.',
        ]);
    }
}
