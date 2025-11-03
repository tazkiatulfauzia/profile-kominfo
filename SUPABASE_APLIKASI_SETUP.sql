-- ============================================
-- Setup Tabel Aplikasi di Supabase
-- ============================================
-- Jalankan script SQL ini di Supabase Dashboard > SQL Editor

-- 1. Buat tabel APLIKASI (jika belum ada)
CREATE TABLE IF NOT EXISTS aplikasi (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  link TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS untuk tabel APLIKASI
ALTER TABLE aplikasi ENABLE ROW LEVEL SECURITY;

-- 3. Policy untuk SELECT (membaca)
CREATE POLICY IF NOT EXISTS "Allow public read access on aplikasi"
ON aplikasi FOR SELECT
USING (true);

-- 4. Policy untuk INSERT (menambah)
CREATE POLICY IF NOT EXISTS "Allow public insert access on aplikasi"
ON aplikasi FOR INSERT
WITH CHECK (true);

-- 5. Policy untuk UPDATE (mengupdate)
CREATE POLICY IF NOT EXISTS "Allow public update access on aplikasi"
ON aplikasi FOR UPDATE
USING (true)
WITH CHECK (true);

-- 6. Policy untuk DELETE (menghapus)
CREATE POLICY IF NOT EXISTS "Allow public delete access on aplikasi"
ON aplikasi FOR DELETE
USING (true);

-- ============================================
-- CATATAN:
-- - Tabel aplikasi memiliki kolom: id, nama, deskripsi, link, logo_url, created_at, updated_at
-- - Logo_url bisa diisi dengan URL gambar dari internet atau path gambar
-- - Untuk production, sebaiknya batasi UPDATE dan DELETE hanya untuk admin
-- ============================================

