import apiClient from "./apiClient";

// Ambil semua berita, dukung kategori/search/pagination
export async function getBerita({ kategori = "", per_page = 100, page = 1, search = "" } = {}) {
  try {
    const params = { per_page, page };
    if (kategori) params.kategori = kategori;
    if (search) params.search = search;

    const response = await apiClient.get("/berita", { params });
    const payload = response.data?.data || response.data || [];

    if (Array.isArray(payload)) return payload;
    if (payload?.data) return payload.data; // jika paginate
    return [];
  } catch (error) {
    console.error("Error fetching berita:", error);
    throw new Error(error.response?.data?.message || "Gagal mengambil data berita");
  }
}

// Ambil berita untuk beranda (maks 3 atau sesuai backend)
export async function getBeritaBeranda() {
  try {
    const response = await apiClient.get("/berita/beranda");
    const payload = response.data?.data || response.data || [];
    return Array.isArray(payload) ? payload : [];
  } catch (error) {
    console.error("Error fetching berita beranda:", error);
    throw new Error(error.response?.data?.message || "Gagal mengambil data beranda");
  }
}

// Tambah berita baru
export async function tambahBerita(judul, deskripsi, gambar, link, kategori = "") {
  try {
    const response = await apiClient.post("/berita", {
      judul,
      deskripsi,
      gambar,
      link,
      kategori,
    });
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error adding berita:", error);
    throw new Error(error.response?.data?.message || "Gagal menambahkan berita");
  }
}

// Update berita
export async function updateBerita(id, fields) {
  try {
    const response = await apiClient.put(`/berita/${id}`, fields);
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error updating berita:", error);
    throw new Error(error.response?.data?.message || "Gagal memperbarui berita");
  }
}

// Hapus berita
export async function hapusBerita(id) {
  try {
    const response = await apiClient.delete(`/berita/${id}`);
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error deleting berita:", error);
    throw new Error(error.response?.data?.message || "Gagal menghapus berita");
  }
}