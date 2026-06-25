<?php

namespace App\Models;

use Database\Factories\WorkshopSessionFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['workshop_id', 'start_at', 'max_participants'])]
class WorkshopSession extends Model
{
    /** @use HasFactory<WorkshopSessionFactory> */
    use HasFactory, SoftDeletes;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'start_at' => 'datetime',
            'max_participants' => 'integer',
        ];
    }

    /**
     * Get the workshop that owns the session.
     *
     * @return BelongsTo<Workshop, $this>
     */
    public function workshop(): BelongsTo
    {
        return $this->belongsTo(Workshop::class);
    }

    /**
     * Get the bookings for the session.
     *
     * @return HasMany<Booking, $this>
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Calculate how many seats have been booked and paid for.
     */
    public function getBookedSeatsCountAttribute(): int
    {
        return (int) $this->bookings()
            ->where(function ($query) {
                $query->where('payment_status', 'paid')
                    ->orWhere(function ($q) {
                        $q->where('payment_status', 'pending')
                            ->where('expires_at', '>', now());
                    });
            })
            ->sum('seats');
    }

    /**
     * Calculate how many spots are left in this session.
     */
    public function getSpotsLeftAttribute(): int
    {
        return max(0, $this->max_participants - $this->booked_seats_count);
    }

    /**
     * Check if a specific number of seats can be booked.
     */
    public function hasPlacesLeft(int $seats): bool
    {
        return $this->spots_left >= $seats;
    }
}
