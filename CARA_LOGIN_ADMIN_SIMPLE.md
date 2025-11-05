# 🔐 Cara Login Sebagai Admin

## 🎯 Cara Login Admin (Sangat Mudah)

### Langkah Login:

1. **Klik Logo Kota Bukittinggi** di header (kiri atas website)
   - Logo tersebut adalah tombol login admin yang tersembunyi
   - Jika sudah login sebagai admin, logo akan mengarah ke beranda

2. **Masukkan Kredensial:**
   - **Email:** Email admin yang tersimpan di Supabase
   - **Password:** Password admin yang tersimpan di Supabase

3. **Klik tombol "Masuk"**

4. **Setelah login berhasil**, Anda akan diarahkan ke halaman Account dan dapat mengakses fitur admin.

---

## 🗄️ Setup Database Admin di Supabase

### 1. Pastikan Tabel Admin Sudah Dibuat

Tabel `admin` harus memiliki kolom:
- `id` (BIGSERIAL PRIMARY KEY)
- `email` (TEXT)
- `password` (TEXT)
- `created_at` (TIMESTAMP WITH TIME ZONE DEFAULT NOW())

### 2. Buat Akun Admin Pertama

Jalankan SQL berikut di Supabase Dashboard > SQL Editor:

```sql
-- Insert admin pertama (GANTI EMAIL DAN PASSWORD!)
INSERT INTO admin (email, password)
VALUES ('admin@kominfo.go.id', 'admin123');
```

⚠️ **PENTING:** Ganti email dan password dengan data yang aman!

### 3. Setup Row Level Security (RLS)

Jalankan SQL berikut:

```sql
-- Enable RLS
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;

-- Policy untuk SELECT
CREATE POLICY "Allow admin read access"
ON admin FOR SELECT
USING (true);

-- Policy untuk UPDATE
CREATE POLICY "Allow admin update access"
ON admin FOR UPDATE
USING (true)
WITH CHECK (true);
```

---

## ✏️ Edit Data Admin

### Melalui Halaman Account

1. **Login sebagai admin** (klik logo di header)

2. **Buka halaman Account** (tombol "Admin" di header)

3. **Klik tombol Edit** (ikon pensil) di card "Mode Administrator"

4. **Edit data:**
   - **Email:** Ubah email admin jika perlu
   - **Password:** Masukkan password baru (kosongkan jika tidak ingin mengubah)
   - **Konfirmasi Password:** Masukkan ulang password baru jika mengubah password

5. **Klik "Simpan Perubahan"**

⚠️ **Catatan:** 
- Admin tidak dapat dihapus
- Password hanya akan diupdate jika diisi
- Email harus dalam format email yang valid

---

## 🚪 Cara Logout

1. **Buka halaman Account** (klik tombol "Admin" di header)
2. **Klik tombol "Keluar dari Akun Admin"**
3. Anda akan logout dan kembali ke mode pengunjung

---

## ✅ Fitur Admin yang Tersedia

Setelah login sebagai admin:

### Halaman Berita (`/berita`)
- ✅ Tombol "Tambah Berita" muncul
- ✅ Form tambah/edit berita
- ✅ Tombol Edit dan Hapus di setiap card

### Halaman Aduan (`/aduan`)
- ✅ Tabel semua aduan yang masuk
- ✅ Kolom: No, Nama, Email, No. HP, Isi Aduan, Tanggal

### Halaman Kontak (`/kontak`)
- ✅ Tabel semua pesan kontak yang masuk
- ✅ Kolom: No, Nama, Email, Pesan, Tanggal

---

## 🔒 Keamanan

**Tips Keamanan:**
1. Ganti password default setelah pertama kali login
2. Gunakan password yang kuat (minimal 8 karakter)
3. Jangan share cara login dengan orang yang tidak berwenang
4. Logout setelah selesai menggunakan fitur admin
5. Logo sebagai tombol login sengaja dibuat sederhana agar tidak mencurigakan

---

**Terakhir diupdate:** 2024







