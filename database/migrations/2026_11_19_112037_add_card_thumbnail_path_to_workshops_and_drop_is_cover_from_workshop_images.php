<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('workshops', function (Blueprint $table) {
            $table->string('card_thumbnail_path')->nullable()->after('summary');
        });

        // Les anciennes couvertures deviennent des miniatures indépendantes (fichier copié),
        // les images restent dans la galerie.
        $disk = Storage::disk('public');

        DB::table('workshop_images')->where('is_cover', true)->get()->each(function ($image) use ($disk) {
            $thumbnailPath = $image->path;

            if ($disk->exists($image->path)) {
                $thumbnailPath = 'workshops/thumbnails/'.basename($image->path);
                $disk->copy($image->path, $thumbnailPath);
            }

            DB::table('workshops')
                ->where('id', $image->workshop_id)
                ->update(['card_thumbnail_path' => $thumbnailPath]);
        });

        Schema::table('workshop_images', function (Blueprint $table) {
            $table->dropColumn('is_cover');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('workshop_images', function (Blueprint $table) {
            $table->boolean('is_cover')->default(false);
        });

        Schema::table('workshops', function (Blueprint $table) {
            $table->dropColumn('card_thumbnail_path');
        });
    }
};
