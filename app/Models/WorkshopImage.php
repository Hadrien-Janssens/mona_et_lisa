<?php

namespace App\Models;

use Database\Factories\WorkshopImageFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['workshop_id', 'path', 'sort_order', 'is_cover', 'tags'])]
class WorkshopImage extends Model
{
    /** @use HasFactory<WorkshopImageFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'is_cover' => 'boolean',
            'tags' => 'array',
        ];
    }

    /**
     * Get the workshop that owns the image.
     *
     * @return BelongsTo<Workshop, $this>
     */
    public function workshop(): BelongsTo
    {
        return $this->belongsTo(Workshop::class);
    }
}
