import apiClient from "./apiClient";

// Tambah aduan baru
export async function tambahAduan(nama, email, no_hp, isi_aduan, status = null, dinas_tujuan = null, keterangan_tindak_lanjut = null, website = null) {
  const response = await apiClient.post("/aduan", {
    nama,
    email,
    no_hp,
    isi_aduan,
    status,
    dinas_tujuan,
    keterangan_tindak_lanjut,
    website,
  });
  return response.data?.data || response.data;
}

// Ambil semua aduan (admin)
export async function getAduan({ per_page = 100, page = 1, status = "", search = "" } = {}) {
  const params = { per_page, page };
  if (status) params.status = status;
  if (search) params.search = search;

  const response = await apiClient.get("/aduan", { params });
  const payload = response.data?.data || response.data || [];
  if (Array.isArray(payload)) return payload;
  if (payload?.data) return payload.data; // pagination
  return [];
}

// Update aduan
export async function updateAduan(id, fields) {
  const response = await apiClient.put(`/aduan/${id}`, fields);
  return response.data?.data || response.data;
}

// Hapus aduan
export async function deleteAduan(id) {
  const response = await apiClient.delete(`/aduan/${id}`);
  return response.data?.data || response.data;
}

// Cek status aduan berdasarkan nama (untuk public)
export async function cekStatusAduan(nama) {
  try {
    const response = await apiClient.get("/aduan/status", { params: { nama } });
    if (response.data?.success && response.data?.data?.length > 0) {
      return response.data.data;
    }
    throw new Error("Aduan Tidak Ditemukan, Silahkan hubungi pihak Kominfo pada halaman kontak");
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Aduan Tidak Ditemukan, Silahkan hubungi pihak Kominfo pada halaman kontak");
  }
}

// Update tindak lanjut aduan (untuk admin)
export async function updateTindakLanjut(id, status, dinas_tujuan, keterangan_tindak_lanjut, website) {
  const response = await apiClient.put(`/aduan/${id}/tindak-lanjut`, {
    status,
    dinas_tujuan,
    keterangan_tindak_lanjut,
    website,
  });
  return response.data?.data || response.data;
}
