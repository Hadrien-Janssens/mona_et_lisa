<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $totalBookings = Booking::count();
        $totalRevenue = Booking::where('payment_status', 'paid')->sum('total_price');
        $recentBookings = Booking::with(['user', 'session.workshop'])
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('admin/dashboard/index', [
            'totalBookings' => $totalBookings,
            'totalRevenue' => $totalRevenue,
            'recentBookings' => $recentBookings,
        ]);
    }
}
