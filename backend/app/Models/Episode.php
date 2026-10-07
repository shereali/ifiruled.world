<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'episode_number',
        'title',
        'guest_name',
        'guest_role',
        'guest_photo',
        'air_date',
        'duration',
        'topic',
        'executive_summary',
        'key_decrees',
        'youtube_id',
        'views_count',
        'featured',
        'quote',
    ];

    protected $casts = [
        'key_decrees' => 'array',
        'featured' => 'boolean',
        'episode_number' => 'integer',
        'views_count' => 'integer',
    ];
}
