<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PresidentialApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'age',
        'email',
        'phone',
        'location',
        'topic',
        'first_decree_title',
        'manifesto',
        'pitch_url',
        'linkedin',
        'social_handle',
        'status',
    ];
}
