import { supabase } from "./supabaseClient";

// Tambah pesan kontak baru
export async function tambahKontak(nama, email, pesan) {
  const { data, error } = await supabase
    .from("kontak")
    .insert([{ nama, email, pesan }])
    .select();
  if (error) throw error;
  return data;
}

// Ambil semua pesan kontak (untuk admin)
export async function getKontak() {
  const { data, error } = await supabase
    .from("kontak")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// Update pesan kontak
export async function updateKontak(id, fields) {
  const { data, error } = await supabase
    .from("kontak")
    .update(fields)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Hapus pesan kontak
export async function deleteKontak(id) {
  const { data, error } = await supabase
    .from("kontak")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}


