-- ============================================
-- Setup Tabel Aduan dan Kontak di Supabase
-- ============================================
-- Jalankan script SQL ini di Supabase Dashboard > SQL Editor

-- 1. Buat tabel ADUAN
CREATE TABLE IF NOT EXISTS aduan (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  no_hp TEXT NOT NULL,
  isi_aduan TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Buat tabel KONTAK
CREATE TABLE IF NOT EXISTS kontak (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  pesan TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable RLS untuk tabel ADUAN
ALTER TABLE aduan ENABLE ROW LEVEL SECURITY;

-- 4. Enable RLS untuk tabel KONTAK
ALTER TABLE kontak ENABLE ROW LEVEL SECURITY;

-- 5. Policy untuk tabel ADUAN - SELECT (membaca)
CREATE POLICY "Allow public read access on aduan"
ON aduan FOR SELECT
USING (true);

-- 6. Policy untuk tabel ADUAN - INSERT (menambah)
CREATE POLICY "Allow public insert access on aduan"
ON aduan FOR INSERT
WITH CHECK (true);

-- 7. Policy untuk tabel KONTAK - SELECT (membaca)
CREATE POLICY "Allow public read access on kontak"
ON kontak FOR SELECT
USING (true);

-- 8. Policy untuk tabel KONTAK - INSERT (menambah)
CREATE POLICY "Allow public insert access on kontak"
ON kontak FOR INSERT
WITH CHECK (true);

-- ============================================
-- CATATAN:
-- - Tabel akan dibuat dengan kolom sesuai kebutuhan
-- - RLS diaktifkan dengan policy yang mengizinkan semua operasi
-- - Untuk production, pertimbangkan untuk membatasi SELECT hanya untuk admin
-- ============================================



