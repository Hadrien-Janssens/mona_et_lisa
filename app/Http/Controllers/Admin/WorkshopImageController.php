<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Workshop;
use App\Models\WorkshopImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WorkshopImageController extends Controller
{
    /**
     * Store a newly created image in storage.
     */
    public function store(Request $request, Workshop $workshop): RedirectResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'tags' => 'nullable',
        ]);

        $path = $request->file('image')->store('workshops/images', 'public');

        $maxOrder = $workshop->images()->max('sort_order') ?? -1;

        $tags = [];
        if ($request->has('tags')) {
            $rawTags = $request->input('tags');
            if (is_array($rawTags)) {
                $tags = array_map('strval', $rawTags);
            } elseif (is_string($rawTags) && ! empty($rawTags)) {
                $decoded = json_decode($rawTags, true);
                if (is_array($decoded)) {
                    $tags = array_map('strval', $decoded);
                } else {
                    $tags = array_filter(array_map('trim', explode(',', $rawTags)));
                }
            }
        }

        // Clean tags list
        $tags = array_values(array_unique(array_filter($tags)));

        $workshop->images()->create([
            'path' => $path,
            'sort_order' => $maxOrder + 1,
            'tags' => $tags,
        ]);

        return redirect()->back()->with('success', 'Image ajoutée avec succès.');
    }

    /**
     * Update the specified image in storage.
     */
    public function update(Request $request, WorkshopImage $image): RedirectResponse
    {
        $request->validate([
            'tags' => 'nullable',
            'sort_order' => 'nullable|integer',
        ]);

        if ($request->has('tags')) {
            $rawTags = $request->input('tags');
            $tags = [];
            if (is_array($rawTags)) {
                $tags = array_map('strval', $rawTags);
            } elseif (is_string($rawTags)) {
                $decoded = json_decode($rawTags, true);
                if (is_array($decoded)) {
                    $tags = array_map('strval', $decoded);
                } else {
                    $tags = array_filter(array_map('trim', explode(',', $rawTags)));
                }
            }
            $image->tags = array_values(array_unique(array_filter($tags)));
        }

        if ($request->has('sort_order')) {
            $image->sort_order = (int) $request->input('sort_order');
        }

        $image->save();

        return redirect()->back()->with('success', 'Image mise à jour avec succès.');
    }

    /**
     * Remove the specified image from storage.
     */
    public function destroy(WorkshopImage $image): RedirectResponse
    {
        if (Storage::disk('public')->exists($image->path)) {
            Storage::disk('public')->delete($image->path);
        }

        $image->delete();

        return redirect()->back()->with('success', 'Image supprimée avec succès.');
    }

    /**
     * Reorder the images of a workshop.
     */
    public function reorder(Request $request, Workshop $workshop): RedirectResponse
    {
        $validated = $request->validate([
            'images' => 'required|array',
            'images.*.id' => 'required|exists:workshop_images,id',
            'images.*.sort_order' => 'required|integer',
        ]);

        foreach ($validated['images'] as $imgData) {
            $workshop->images()->where('id', $imgData['id'])->update([
                'sort_order' => $imgData['sort_order'],
            ]);
        }

        return redirect()->back()->with('success', 'Ordre des images mis à jour.');
    }

    /**
     * Store (or replace) the card thumbnail of a workshop.
     */
    public function storeThumbnail(Request $request, Workshop $workshop): RedirectResponse
    {
        $request->validate([
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $this->deleteThumbnailFile($workshop);

        $workshop->update([
            'card_thumbnail_path' => $request->file('thumbnail')->store('workshops/thumbnails', 'public'),
        ]);

        return redirect()->back()->with('success', 'Miniature de la carte mise à jour.');
    }

    /**
     * Remove the card thumbnail of a workshop.
     */
    public function destroyThumbnail(Workshop $workshop): RedirectResponse
    {
        $this->deleteThumbnailFile($workshop);

        $workshop->update(['card_thumbnail_path' => null]);

        return redirect()->back()->with('success', 'Miniature de la carte supprimée.');
    }

    private function deleteThumbnailFile(Workshop $workshop): void
    {
        if ($workshop->card_thumbnail_path) {
            Storage::disk('public')->delete($workshop->card_thumbnail_path);
        }
    }
}
