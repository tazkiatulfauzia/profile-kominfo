# 🔧 BACKEND FIXES (Restored)

## Error umum & solusi singkat

### 1) Table `admins` tidak ada
**Solusi cepat:**
```bash
php artisan make:migration create_admins_table
php artisan migrate
```
Atau SQL cepat:
```sql
CREATE TABLE IF NOT EXISTS admins (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  nama VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);
```

### 2) Kolom email tidak ditemukan di seeder
Gunakan seeder yang sudah auto-detect kolom (lihat `database/seeders/AdminSeeder.php`):
```bash
php artisan db:seed --class=AdminSeeder
```

### 3) Route `/api/berita/beranda` 404
Pastikan di `routes/api.php`:
```php
Route::prefix('berita')->group(function () {
    Route::get('/', [BeritaController::class, 'index']);
    Route::get('/beranda', [BeritaController::class, 'beranda']); // di atas /{id}
    Route::get('/{id}', [BeritaController::class, 'show']);
    Route::post('/', [BeritaController::class, 'store']);
    Route::put('/{id}', [BeritaController::class, 'update']);
    Route::delete('/{id}', [BeritaController::class, 'destroy']);
});
```
Lalu:
```bash
php artisan route:clear
php artisan route:list | findstr beranda
```

### 4) Call to undefined method BeritaController::beranda()
Tambahkan method `beranda()` dari file `app/Http/Controllers/Controller_FIXES_COMPLETE.php`.

### 5) Call to undefined method AduanController::index()
Tambahkan method `index()` dari file `app/Http/Controllers/Controller_FIXES_COMPLETE.php`.

### 6) Class "App\Http\Controllers\Validator" not found
Perbaiki import di KontakController:
```php
use Illuminate\Support\Facades\Validator; // benar
// hapus: use App\Http\Controllers\Validator;
```

### 7) Column not found (nama) di aduan
Gunakan method `status()` dan `store()` di `Controller_FIXES_COMPLETE.php` (auto-detect kolom `nama`/`name`).

### 8) Error 422 saat buat berita
Pastikan memakai method `store()` di `Controller_FIXES_COMPLETE.php` (validasi sesuai field).

### 9) Clear cache kalau masih error
```bash
php artisan route:clear
php artisan config:clear
php artisan cache:clear
```

## Quick start
1) Copy `api.php` ke `routes/api.php`.
2) Copy method dari `Controller_FIXES_COMPLETE.php` ke controller masing-masing.
3) Pastikan import `Validator` benar.
4) Jalankan seeder admin: `php artisan db:seed --class=AdminSeeder`.
5) Test endpoint:
   - /api/test
   - /api/berita/beranda
   - /api/aduan
   - /api/kontak
   - /api/aplikasi

