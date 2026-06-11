<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['title', 'slug', 'description', 'summary', 'price', 'duration_minutes', 'is_active'])]
class Workshop extends Model
{
    /** @use HasFactory<\Database\Factories\WorkshopFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'duration_minutes' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get the images for the workshop.
     *
     * @return HasMany<WorkshopImage, $this>
     */
    public function images(): HasMany
    {
        return $this->hasMany(WorkshopImage::class)->orderBy('sort_order');
    }

    /**
     * Get the sessions for the workshop.
     *
     * @return HasMany<WorkshopSession, $this>
     */
    public function sessions(): HasMany
    {
        return $this->hasMany(WorkshopSession::class)->orderBy('start_at');
    }

    /**
     * Get the cover image for the workshop.
     *
     * @return HasOne<WorkshopImage, $this>
     */
    public function coverImage(): HasOne
    {
        return $this->hasOne(WorkshopImage::class)->where('is_cover', true);
    }
}
