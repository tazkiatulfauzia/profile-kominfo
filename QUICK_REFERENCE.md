# ⚡ QUICK REFERENCE (Restored)

## Command penting
### Seeder admin (gunakan seeder auto-detect kolom)
```bash
php artisan db:seed --class=AdminSeeder
```

### Clear cache
```bash
php artisan route:clear
php artisan config:clear
php artisan cache:clear
```

### Cek route beranda
```bash
php artisan route:list | findstr beranda
```

### Buat model (jika belum ada)
```bash
php artisan make:model Berita
php artisan make:model Aduan
php artisan make:model Kontak
php artisan make:model Aplikasi
```

## Lokasi file penting
- `routes/api.php` (route beranda, aduan status, dsb)
- `database/seeders/AdminSeeder.php` (seeder admin)
- `app/Http/Controllers/Controller_FIXES_COMPLETE.php` (semua method lengkap)

## Troubleshooting cepat
- 404 beranda → tambahkan route `/api/berita/beranda`, clear cache
- Undefined method → copy method dari `Controller_FIXES_COMPLETE.php`
- Validator not found → gunakan `use Illuminate\Support\Facades\Validator;`
- Kolom nama tidak ada → pakai method auto-detect kolom di `Controller_FIXES_COMPLETE.php`

