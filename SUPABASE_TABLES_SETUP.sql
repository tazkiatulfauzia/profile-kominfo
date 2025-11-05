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
  status TEXT DEFAULT 'baru',
  dinas_tujuan TEXT,
  keterangan_tindak_lanjut TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tambahkan kolom tindak lanjut jika tabel sudah ada
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='aduan' AND column_name='status') THEN
    ALTER TABLE aduan ADD COLUMN status TEXT DEFAULT 'baru';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='aduan' AND column_name='dinas_tujuan') THEN
    ALTER TABLE aduan ADD COLUMN dinas_tujuan TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='aduan' AND column_name='keterangan_tindak_lanjut') THEN
    ALTER TABLE aduan ADD COLUMN keterangan_tindak_lanjut TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='aduan' AND column_name='updated_at') THEN
    ALTER TABLE aduan ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

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

-- 9. Policy untuk tabel ADUAN - UPDATE (mengupdate)
CREATE POLICY IF NOT EXISTS "Allow public update access on aduan"
ON aduan FOR UPDATE
USING (true)
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




