<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        // 1. Validation
        $validated = $request->validate([
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        $admin = User::where('is_admin', true)->first();
        if ($admin) {
            // Pas besoin de faire Mail::to($admin->email),
            // Mail::to($admin) fonctionne directement !
            Mail::to($admin)->send(new ContactMessage($validated));
        }

        // 3. Retour à Inertia avec un message de succès
        return redirect()->back()->with('success', 'Votre message a bien été envoyé !');
    }
}
