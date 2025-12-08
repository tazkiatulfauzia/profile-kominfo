<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AduanController;
use App\Http\Controllers\AplikasiController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\KontakController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Semua endpoint API disimpan di sini.
| Otomatis prefix `/api`
|--------------------------------------------------------------------------
*/

// Health Check
Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'API Profile Kominfo berjalan dengan baik',
        'timestamp' => now()->toDateTimeString(),
    ]);
});

/*
|--------------------------------------------------------------------------
| BERITA - Public Routes
|--------------------------------------------------------------------------
*/
Route::prefix('berita')->group(function () {
    Route::get('/', [BeritaController::class, 'index']);
    // ✅ route beranda harus di atas /{id}
    Route::get('/beranda', [BeritaController::class, 'beranda']);
    Route::get('/{id}', [BeritaController::class, 'show']);
    // Protected routes (dapat ditambahkan middleware auth nanti)
    Route::post('/', [BeritaController::class, 'store']);
    Route::put('/{id}', [BeritaController::class, 'update']);
    Route::delete('/{id}', [BeritaController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| ADUAN - Public Routes
|--------------------------------------------------------------------------
*/
Route::prefix('aduan')->group(function () {
    Route::get('/', [AduanController::class, 'index']);
    Route::get('/status', [AduanController::class, 'status']); // cek status aduan berdasarkan nama
    Route::get('/{id}', [AduanController::class, 'show']);
    Route::post('/', [AduanController::class, 'store']);
    // Protected routes (dapat ditambahkan middleware auth nanti)
    Route::put('/{id}', [AduanController::class, 'update']);
    Route::put('/{id}/tindak-lanjut', [AduanController::class, 'tindakLanjut']);
    Route::delete('/{id}', [AduanController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| KONTAK - Public Routes
|--------------------------------------------------------------------------
*/
Route::prefix('kontak')->group(function () {
    Route::get('/', [KontakController::class, 'index']);
    Route::get('/{id}', [KontakController::class, 'show']);
    Route::post('/', [KontakController::class, 'store']);
    // Protected routes (dapat ditambahkan middleware auth nanti)
    Route::put('/{id}', [KontakController::class, 'update']);
    Route::delete('/{id}', [KontakController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| APLIKASI - Public Routes
|--------------------------------------------------------------------------
*/
Route::prefix('aplikasi')->group(function () {
    Route::get('/', [AplikasiController::class, 'index']);
    Route::get('/{id}', [AplikasiController::class, 'show']);
    // Protected routes (dapat ditambahkan middleware auth nanti)
    Route::post('/', [AplikasiController::class, 'store']);
    Route::put('/{id}', [AplikasiController::class, 'update']);
    Route::delete('/{id}', [AplikasiController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| ADMIN - Authentication Routes
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminController::class, 'login']);
    // Protected routes (dapat ditambahkan middleware auth nanti)
    Route::get('/', [AdminController::class, 'index']);
    Route::get('/{id}', [AdminController::class, 'show']);
    Route::post('/register', [AdminController::class, 'store']);
    Route::put('/{id}', [AdminController::class, 'update']);
    Route::delete('/{id}', [AdminController::class, 'destroy']);
});

