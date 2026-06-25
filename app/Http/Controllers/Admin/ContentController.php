<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentController extends Controller
{
    public function index()
    {
        $contents = SiteContent::all()->keyBy('section')->map(fn ($content) => $content->content);

        // Ensure default structure if empty
        return Inertia::render('admin/content/index', [
            'contents' => [
                'header' => $contents->get('header', []),
                'about' => $contents->get('about', []),
                'workshop' => $contents->get('workshop', []),
                'schedule' => $contents->get('schedule', []),
                'contact' => $contents->get('contact', []),
                'footer' => $contents->get('footer', []),
            ],
        ]);
    }

    public function update(Request $request, string $section)
    {
        $validated = $request->validate([
            'content' => ['required', 'array'],
        ]);

        $siteContent = SiteContent::firstOrCreate(
            ['section' => $section],
            ['content' => []]
        );

        $siteContent->update([
            'content' => $validated['content'],
        ]);

        // Handle image uploads if they exist in the request
        // This is a basic implementation. It can be enhanced to save image paths.
        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $key => $file) {
                $path = $file->store('content', 'public');
                $images[$key] = '/storage/' . $path;
            }
            
            $contentData = $siteContent->content;
            $contentData['images'] = array_merge($contentData['images'] ?? [], $images);
            $siteContent->update(['content' => $contentData]);
        }

        return redirect()->back()->with('success', 'Contenu mis à jour avec succès.');
    }
}
