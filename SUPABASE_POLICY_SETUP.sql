-- ============================================
-- Setup Row Level Security Policy untuk tabel berita
-- ============================================
-- Jalankan script SQL ini di Supabase Dashboard > SQL Editor
-- untuk mengizinkan insert, update, delete, dan select untuk semua user

-- 1. Pastikan RLS sudah diaktifkan (biasanya sudah aktif secara default)
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;

-- 2. Policy untuk SELECT (membaca berita) - Izinkan semua user membaca
CREATE POLICY "Allow public read access"
ON berita
FOR SELECT
USING (true);

-- 3. Policy untuk INSERT (menambah berita) - Izinkan semua user menambah
CREATE POLICY "Allow public insert access"
ON berita
FOR INSERT
WITH CHECK (true);

-- 4. Policy untuk UPDATE (mengupdate berita) - Izinkan semua user mengupdate
CREATE POLICY "Allow public update access"
ON berita
FOR UPDATE
USING (true)
WITH CHECK (true);

-- 5. Policy untuk DELETE (menghapus berita) - Izinkan semua user menghapus
CREATE POLICY "Allow public delete access"
ON berita
FOR DELETE
USING (true);

-- ============================================
-- CATATAN:
-- - Policy ini mengizinkan SEMUA operasi untuk SEMUA user (termasuk anonymous)
-- - Untuk production, sebaiknya batasi dengan authentication atau role
-- - Jika ingin lebih aman, tambahkan kondisi seperti: USING (auth.role() = 'authenticated')
-- ============================================


