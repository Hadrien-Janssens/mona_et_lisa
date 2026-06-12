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

        $isCover = ! $workshop->images()->exists();
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
            'is_cover' => $isCover,
            'sort_order' => $maxOrder + 1,
            'tags' => $tags,
        ]);

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Image ajoutée avec succès.',
        ]);
    }

    /**
     * Update the specified image in storage.
     */
    public function update(Request $request, WorkshopImage $image): RedirectResponse
    {
        $request->validate([
            'tags' => 'nullable',
            'is_cover' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        if ($request->has('is_cover') && $request->input('is_cover')) {
            $image->workshop->images()->where('id', '!=', $image->id)->update(['is_cover' => false]);
            $image->is_cover = true;
        }

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

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Image mise à jour avec succès.',
        ]);
    }

    /**
     * Remove the specified image from storage.
     */
    public function destroy(WorkshopImage $image): RedirectResponse
    {
        $workshop = $image->workshop;
        $wasCover = $image->is_cover;

        if (Storage::disk('public')->exists($image->path)) {
            Storage::disk('public')->delete($image->path);
        }

        $image->delete();

        if ($wasCover) {
            $nextCover = $workshop->images()->orderBy('sort_order')->first();
            if ($nextCover) {
                $nextCover->update(['is_cover' => true]);
            }
        }

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Image supprimée avec succès.',
        ]);
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

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Ordre des images mis à jour.',
        ]);
    }
}
