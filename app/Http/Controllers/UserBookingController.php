<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserBookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = $request->user()->bookings()
            ->with(['session.workshop.images'])
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('booking', [
            'bookings' => $bookings,
        ]);
    }
}
