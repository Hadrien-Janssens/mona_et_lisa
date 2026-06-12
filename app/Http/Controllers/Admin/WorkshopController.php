<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Workshop;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkshopController extends Controller
{
    /**
     * Display a listing of the workshops.
     */
    public function index(): Response
    {
        $workshops = Workshop::query()
            ->latest()
            ->get()
            ->map(function (Workshop $workshop) {
                return [
                    'id' => $workshop->id,
                    'title' => $workshop->title,
                    'slug' => $workshop->slug,
                    'summary' => $workshop->summary,
                    'price' => $workshop->price / 100,
                    'duration_minutes' => $workshop->duration_minutes,
                    'is_active' => $workshop->is_active,
                ];
            });

        return Inertia::render('admin/workshops/index', [
            'workshops' => $workshops,
        ]);
    }

    /**
     * Show the form for creating a new workshop.
     */
    public function create(): Response
    {
        return Inertia::render('admin/workshops/create');
    }

    /**
     * Store a newly created workshop in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'summary' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'duration_minutes' => 'required|integer|min:1',
            'is_active' => 'required|boolean',
        ]);

        $validated['price'] = (int) (round($validated['price'] * 100));
        $validated['slug'] = str($validated['title'])->slug()->value();

        Workshop::create($validated);

        return redirect()->route('admin.workshops.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Atelier créé avec succès.',
            ]);
    }

    /**
     * Show the form for editing the specified workshop.
     */
    public function edit(Workshop $workshop): Response
    {
        return Inertia::render('admin/workshops/edit', [
            'workshop' => [
                'id' => $workshop->id,
                'title' => $workshop->title,
                'description' => $workshop->description,
                'summary' => $workshop->summary,
                'price' => $workshop->price / 100,
                'duration_minutes' => $workshop->duration_minutes,
                'is_active' => $workshop->is_active,
            ],
        ]);
    }

    /**
     * Update the specified workshop in storage.
     */
    public function update(Request $request, Workshop $workshop): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'summary' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'duration_minutes' => 'required|integer|min:1',
            'is_active' => 'required|boolean',
        ]);

        $validated['price'] = (int) (round($validated['price'] * 100));
        $validated['slug'] = str($validated['title'])->slug()->value();

        $workshop->update($validated);

        return redirect()->route('admin.workshops.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Atelier mis à jour avec succès.',
            ]);
    }

    /**
     * Remove the specified workshop from storage.
     */
    public function destroy(Workshop $workshop): RedirectResponse
    {
        $workshop->delete();

        return redirect()->route('admin.workshops.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Atelier supprimé avec succès.',
            ]);
    }
}
