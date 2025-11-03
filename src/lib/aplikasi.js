import { supabase } from "./supabaseClient";

// Ambil semua aplikasi
export async function getAplikasi() {
  const { data, error } = await supabase
    .from("aplikasi")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// Tambah aplikasi baru
export async function tambahAplikasi(nama, deskripsi, link, logo_url = null) {
  const { data, error } = await supabase
    .from("aplikasi")
    .insert([{ nama, deskripsi, link, logo_url }])
    .select();
  if (error) throw error;
  return data;
}

// Update aplikasi
export async function updateAplikasi(id, fields) {
  const { data, error } = await supabase
    .from("aplikasi")
    .update(fields)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Hapus aplikasi
export async function deleteAplikasi(id) {
  const { data, error } = await supabase
    .from("aplikasi")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

