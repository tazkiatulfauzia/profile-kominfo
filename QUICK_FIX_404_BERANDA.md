# ⚡ QUICK FIX - 404 /api/berita/beranda (Restored)

## Langkah cepat
1) Pastikan di `routes/api.php`:
```php
Route::prefix('berita')->group(function () {
    Route::get('/', [BeritaController::class, 'index']);
    Route::get('/beranda', [BeritaController::class, 'beranda']); // HARUS di atas /{id}
    Route::get('/{id}', [BeritaController::class, 'show']);
});
```

2) Clear cache:
```bash
php artisan route:clear
php artisan config:clear
php artisan cache:clear
```

3) Cek route:
```bash
php artisan route:list | findstr beranda
```

4) Test URL:
- ✅ `http://localhost:8000/api/berita/beranda`
- ❌ `http://localhost:8000/api/beranda/berita`

Jika masih 404, pastikan route `/beranda` di atas `/{id}` dan cache sudah di-clear.

