import apiClient from "./apiClient";
import { supabase } from "./supabaseClient";

// Login admin dengan email dan password - menggunakan Laravel API
export async function loginAdmin(email, password) {
  try {
    // Normalisasi input
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    
    // Login via Laravel API
    const response = await apiClient.post("/admin/login", { email: normalizedEmail, password: normalizedPassword });      
    
    if (response.data.success && response.data.data) {
      // Simpan token dan data admin
      const { token, admin } = response.data.data;
      localStorage.setItem("api_token", token);
      localStorage.setItem("adminData", JSON.stringify(admin));
      
      // Juga login ke Supabase untuk kompatibilitas (jika masih diperlukan)
      try {
        await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: normalizedPassword,
        });
      } catch (supabaseError) {
        // Abaikan error Supabase jika tidak penting
        console.warn("Supabase auth error (non-critical):", supabaseError);
      }
      
      return {
        ...admin,
        email: admin.email,
        role: "Admin",
      };
    } else {
      throw new Error("Login gagal");
    }
  } catch (error) {
    console.error("Login error:", error);
    
    // Fallback ke Supabase jika API error
    if (error.response?.status === 401 || error.response?.status === 404) {
      throw new Error("Upaya login gagal!");
    }
    
    // Coba fallback ke Supabase
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });
      
      if (authError) {
        throw new Error("Upaya login gagal!");
      }
      
      // Cek apakah user adalah admin
      const userId = authData.user.id;
      const { data: adminData } = await supabase
        .from("admins")
        .select("*")
        .eq("user_id", userId)
        .single();
      
      if (!adminData) {
        throw new Error("Upaya login gagal!");
      }
      
      return {
        ...adminData,
        email: authData.user.email,
        role: "Admin",
      };
    } catch (fallbackError) {
      throw new Error("Upaya login gagal!");
    }
  }
}

// Ambil data admin (untuk edit)
export async function getAdmin() {
  try {
    // Jika menggunakan Laravel API, endpoint bisa dibuat nanti
    // Untuk sekarang, return dari localStorage
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      return JSON.parse(adminData);
    }
    throw new Error("Admin data tidak ditemukan");
  } catch (err) {
    throw err;
  }
}

// Update admin (email atau password)
export async function updateAdmin(id, fields) {
  try {
    // Jika menggunakan Laravel API, endpoint bisa dibuat nanti
    // Untuk sekarang, update via Supabase
    const { data, error } = await supabase
      .from("admins")
      .update(fields)
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    return data;
  } catch (err) {
    throw err;
  }
}
