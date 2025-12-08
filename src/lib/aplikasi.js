import apiClient from "./apiClient";

// Ambil semua aplikasi (dengan optional search/pagination)
export async function getAplikasi({ per_page = 100, page = 1, search = "" } = {}) {
  try {
    const params = { per_page, page };
    if (search) params.search = search;

    const response = await apiClient.get("/aplikasi", { params });
    const payload = response.data?.data || response.data || [];

    if (Array.isArray(payload)) return payload;
    if (payload?.data) return payload.data; // pagination
    return [];
  } catch (error) {
    console.error("Error fetching aplikasi:", error);
    throw new Error(error.response?.data?.message || "Gagal mengambil data aplikasi");
  }
}

// Tambah aplikasi baru
export async function tambahAplikasi(nama, deskripsi, link, logo_url = null, email = null) {
  try {
    const response = await apiClient.post("/aplikasi", {
      nama,
      deskripsi,
      link,
      logo_url,
      email,
    });
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error adding aplikasi:", error);
    throw new Error(error.response?.data?.message || "Gagal menambahkan aplikasi");
  }
}

// Update aplikasi
export async function updateAplikasi(id, fields) {
  try {
    const response = await apiClient.put(`/aplikasi/${id}`, fields);
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error updating aplikasi:", error);
    throw new Error(error.response?.data?.message || "Gagal memperbarui aplikasi");
  }
}

// Hapus aplikasi
export async function deleteAplikasi(id) {
  try {
    const response = await apiClient.delete(`/aplikasi/${id}`);
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error deleting aplikasi:", error);
    throw new Error(error.response?.data?.message || "Gagal menghapus aplikasi");
  }
}