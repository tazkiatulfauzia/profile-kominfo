// Di Vite, gunakan import.meta.env, bukan process.env (process tidak tersedia di browser)
const API_BASE_URL =
  import.meta?.env?.VITE_API_BASE_URL ||
  "http://localhost:8000/api";

export const API_ENDPOINTS = {
  // Berita
  BERITA: {
    LIST: `${API_BASE_URL}/berita`,
    DETAIL: (id) => `${API_BASE_URL}/berita/${id}`,
    CREATE: `${API_BASE_URL}/berita`,
    UPDATE: (id) => `${API_BASE_URL}/berita/${id}`,
    DELETE: (id) => `${API_BASE_URL}/berita/${id}`,
  },

  // Aduan
  ADUAN: {
    LIST: `${API_BASE_URL}/aduan`,
    DETAIL: (id) => `${API_BASE_URL}/aduan/${id}`,
    CREATE: `${API_BASE_URL}/aduan`,
    UPDATE: (id) => `${API_BASE_URL}/aduan/${id}`,
    DELETE: (id) => `${API_BASE_URL}/aduan/${id}`,
  },

  // Kontak
  KONTAK: {
    LIST: `${API_BASE_URL}/kontak`,
    DETAIL: (id) => `${API_BASE_URL}/kontak/${id}`,
    CREATE: `${API_BASE_URL}/kontak`,
    DELETE: (id) => `${API_BASE_URL}/kontak/${id}`,
  },

  // Aplikasi
  APLIKASI: {
    LIST: `${API_BASE_URL}/aplikasi`,
    DETAIL: (id) => `${API_BASE_URL}/aplikasi/${id}`,
    CREATE: `${API_BASE_URL}/aplikasi`,
    UPDATE: (id) => `${API_BASE_URL}/aplikasi/${id}`,
    DELETE: (id) => `${API_BASE_URL}/aplikasi/${id}`,
  },

  // Admin
  ADMIN: {
    LOGIN: `${API_BASE_URL}/admin/login`,
    LIST: `${API_BASE_URL}/admin`,
    DETAIL: (id) => `${API_BASE_URL}/admin/${id}`,
    REGISTER: `${API_BASE_URL}/admin/register`,
    UPDATE: (id) => `${API_BASE_URL}/admin/${id}`,
    DELETE: (id) => `${API_BASE_URL}/admin/${id}`,
  },
};

export default API_BASE_URL;