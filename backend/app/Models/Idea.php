<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idea extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_name',
        'author_role',
        'location',
        'topic',
        'title',
        'content',
        'upvotes',
        'is_approved',
    ];

    protected $casts = [
        'upvotes' => 'integer',
        'is_approved' => 'boolean',
    ];
}
