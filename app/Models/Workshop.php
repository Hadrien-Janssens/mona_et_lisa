<?php

namespace App\Models;

use Database\Factories\WorkshopFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['title', 'slug', 'description', 'summary', 'card_thumbnail_path', 'price', 'duration_minutes', 'is_active'])]
class Workshop extends Model
{
    /** @use HasFactory<WorkshopFactory> */
    use HasFactory, SoftDeletes;

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
     * Get the path of the card thumbnail, falling back to the first gallery image.
     */
    protected function cardThumbnailDisplayPath(): Attribute
    {
        return Attribute::get(fn (): ?string => $this->card_thumbnail_path ?? $this->images->first()?->path);
    }
}
