// src/lib/aduan.js
import { supabase } from "./supabaseClient";

// Tambah aduan baru
export async function tambahAduan(nama, email, no_hp, isi_aduan) {
  const { data, error } = await supabase
    .from("aduan")
    .insert([{ nama, email, no_hp, isi_aduan }])
    .select();
  if (error) throw error;
  return data;
}

// Ambil semua aduan (untuk admin)
export async function getAduan() {
  const { data, error } = await supabase
    .from("aduan")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// Update aduan
export async function updateAduan(id, fields) {
  const { data, error } = await supabase
    .from("aduan")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Update tindak lanjut aduan (status, dinas_tujuan, keterangan, website)
export async function updateTindakLanjut(id, status, dinas_tujuan, keterangan, website) {
  const { data, error } = await supabase
    .from("aduan")
    .update({
      status: status || "diproses",
      dinas_tujuan: dinas_tujuan || null,
      keterangan_tindak_lanjut: keterangan || null,
      website: website || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Hapus aduan
export async function deleteAduan(id) {
  const { data, error } = await supabase
    .from("aduan")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}
