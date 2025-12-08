import apiClient from "./apiClient";

// Tambah pesan kontak baru
export async function tambahKontak(nama, email, pesan) {
  try {
    const response = await apiClient.post("/kontak", { nama, email, pesan });
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error adding kontak:", error);
    throw new Error(error.response?.data?.message || "Gagal mengirim pesan");
  }
}

// Ambil semua pesan kontak (admin)
export async function getKontak({ per_page = 100, page = 1, search = "" } = {}) {
  try {
    const params = { per_page, page };
    if (search) params.search = search;

    const response = await apiClient.get("/kontak", { params });
    const payload = response.data?.data || response.data || [];

    if (Array.isArray(payload)) return payload;
    if (payload?.data) return payload.data; // pagination
    return [];
  } catch (error) {
    console.error("Error fetching kontak:", error);
    throw new Error(error.response?.data?.message || "Gagal mengambil data kontak");
  }
}

// Update pesan kontak
export async function updateKontak(id, fields) {
  try {
    const response = await apiClient.put(`/kontak/${id}`, fields);
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error updating kontak:", error);
    throw new Error(error.response?.data?.message || "Gagal memperbarui kontak");
  }
}

// Hapus pesan kontak
export async function deleteKontak(id) {
  try {
    const response = await apiClient.delete(`/kontak/${id}`);
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error deleting kontak:", error);
    throw new Error(error.response?.data?.message || "Gagal menghapus kontak");
  }
}