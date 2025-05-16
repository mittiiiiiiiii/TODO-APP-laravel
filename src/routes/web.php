<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Task;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return redirect()->route('Login');
});

Route::get('/Preview', function () {
    return Inertia::render('Preview');
});

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('Register');

Route::post('/register', [RegisterController::class, 'store']);

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('Login');

Route::post('/login', [LoginController::class, 'store']);

Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index'])->name('Tasks');

    Route::get('/{id}/edit', [TaskController::class, 'edit'])->name('Tasks.edit');
    Route::post('/{id}/edit', [TaskController::class, 'update'])->name('Tasks.update');

    Route::get('/new', function () {
        return Inertia::render('Tasks/New');
    })->name('Tasks.New');

    Route::post('/new', [TaskController::class, 'store'])->name('Tasks.store');

    Route::post('/{id}', [TaskController::class, 'delete'])->name('Tasks.delete');
});

Route::get('/profile', function () {
    return Inertia::render('Profile');
})->name('Profile');

Route::get('/profile', [ProfileController::class, 'edit'])->name('Profile.edit');
Route::post('/profile', [ProfileController::class, 'update'])->name('Profile.update');
