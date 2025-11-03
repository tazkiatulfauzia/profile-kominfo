-- ============================================
-- Setup Tabel Admin di Supabase
-- ============================================
-- Jalankan script SQL ini di Supabase Dashboard > SQL Editor

-- 1. Buat tabel ADMIN (jika belum ada) di schema public
CREATE TABLE IF NOT EXISTS public.admin (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Insert admin pertama (ganti email dan password sesuai kebutuhan)
-- ⚠️ PENTING: Ganti email dan password dengan data yang aman!
INSERT INTO public.admin (email, password)
VALUES ('admin@kominfo.go.id', 'admin123')
ON CONFLICT (email) DO NOTHING;

-- 3. Enable RLS untuk tabel ADMIN
ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;

-- 4. Policy untuk SELECT (membaca data admin)
CREATE POLICY IF NOT EXISTS "Allow admin read access"
ON public.admin FOR SELECT
USING (true);

-- 5. Policy untuk UPDATE (mengupdate data admin)
CREATE POLICY IF NOT EXISTS "Allow admin update access"
ON public.admin FOR UPDATE
USING (true)
WITH CHECK (true);

-- 6. Policy untuk INSERT (untuk backup jika perlu)
CREATE POLICY IF NOT EXISTS "Allow admin insert access"
ON public.admin FOR INSERT
WITH CHECK (true);

-- CATATAN:
-- - Admin hanya bisa ada satu (atau beberapa jika perlu)
-- - Admin tidak bisa dihapus dari aplikasi (hanya bisa dari database langsung)
-- - Email harus UNIQUE
-- - Password disimpan sebagai plain text (untuk keamanan lebih baik, gunakan hashing)
-- - Ganti password default setelah pertama kali login!



