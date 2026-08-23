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

        $contentData = $siteContent->content;

        foreach ($request->allFiles() as $fileKey => $files) {
            if (is_array($files)) {
                $uploadedFiles = [];
                foreach ($files as $key => $file) {
                    $path = $file->store('content', 'public');
                    $uploadedFiles[$key] = '/storage/'.$path;
                }
                $contentData[$fileKey] = array_merge($contentData[$fileKey] ?? [], $uploadedFiles);
            } else {
                $path = $files->store('content', 'public');
                $contentData[$fileKey] = '/storage/'.$path;
            }
        }

        $siteContent->update(['content' => $contentData]);

        return redirect()->back()->with('success', 'Contenu mis à jour avec succès.');
    }
}
