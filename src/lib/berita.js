import { supabase } from "./supabaseClient";

// Ambil semua berita, optional filter kategori
export async function getBerita(kategori = "") {
  let query = supabase.from("berita").select("*").order("id", { ascending: false });
  if (kategori) query = query.eq("kategori", kategori);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Ambil berita untuk beranda (maks 3). Jika ada kolom 'tampil_di_beranda', prioritaskan yang true
export async function getBeritaBeranda() {
  try {
    // Coba ambil yang ditandai tampil_di_beranda = true (jika kolom tersedia)
    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .eq("tampil_di_beranda", true)
      .order("id", { ascending: false })
      .limit(3);

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (_) {
    // Abaikan error jika kolom tidak ada
  }

  // Fallback: ambil 3 berita terbaru
  const { data: latest, error: latestErr } = await supabase
    .from("berita")
    .select("*")
    .order("id", { ascending: false })
    .limit(3);

  if (latestErr) throw latestErr;
  return latest || [];
}

// Tambah berita baru, return data terbaru
export async function tambahBerita(judul, deskripsi, gambar, link, kategori = "") {
  const { data, error } = await supabase
    .from("berita")
    .insert([{ judul, deskripsi, gambar, link, kategori }])
    .select(); // wajib agar data terbaru muncul
  if (error) throw error;
  return data;
}

// Update berita
export async function updateBerita(id, fields) {
  const { data, error } = await supabase
    .from("berita")
    .update(fields)
    .eq("id", id)
    .select(); // wajib agar data terbaru muncul
  if (error) throw error;
  return data;
}

// Hapus berita
export async function hapusBerita(id) {
  const { data, error } = await supabase
    .from("berita")
    .delete()
    .eq("id", id)
    .select(); // wajib agar data terbaru muncul
  if (error) throw error;
  return data;
}
