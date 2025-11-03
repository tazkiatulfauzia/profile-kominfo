import { supabase } from "./supabaseClient";

// Login admin dengan email dan password
export async function loginAdmin(email, password) {
  try {
    // Normalisasi input
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    
    // Step 1: Login via Supabase Auth untuk validasi email dan password
    // Email dan password ada di auth.users, bukan di tabel admins
    console.log("=== DEBUG LOGIN ===");
    console.log("Mencoba login dengan email:", normalizedEmail);
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: normalizedPassword,
    });
    
    if (authError) {
      console.error("Auth error:", authError);
      console.error("Error code:", authError.status);
      console.error("Error message:", authError.message);
      
      // Berikan pesan yang lebih informatif
      if (authError.message.includes("Invalid login credentials") || authError.status === 400) {
        throw new Error(
          "Email atau password salah. " +
          "Pastikan:\n" +
          "1. Email sudah diubah menjadi 'tazkiatul.fauzia@gmail.com' di Supabase Auth\n" +
          "2. Password yang dimasukkan benar: 'adminprofilekominfo25'\n" +
          "3. User sudah dibuat di Supabase Authentication"
        );
      }
      throw new Error(authError.message || "Email atau password salah");
    }
    
    if (!authData || !authData.user) {
      throw new Error("Login gagal, user tidak ditemukan");
    }
    
    // Step 2: Cek apakah user_id ada di tabel admins
    // Tabel admins memiliki kolom: id, user_id (UUID), created_at
    const userId = authData.user.id;
    
    console.log("=== DEBUG: Mencari admin ===");
    console.log("User ID dari Auth:", userId);
    console.log("Email dari Auth:", authData.user.email);
    
    let adminData = null;
    let adminError = null;
    
    // Cek apakah user_id ada di tabel admins
    const { data: adminDataResult, error: adminErrorResult } = await supabase
      .from("admins")
      .select("*")
      .eq("user_id", userId)
      .single();
    
    adminData = adminDataResult;
    adminError = adminErrorResult;
    
    // Jika tidak ada, coba auto-create di tabel admins
    if (adminError || !adminData) {
      console.log("User tidak ditemukan di tabel admins, mencoba auto-create...");
      
      // Cek dulu apakah user_id sudah ada (untuk menghindari duplicate)
      const { data: existingAdmin } = await supabase
        .from("admins")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      
      if (existingAdmin) {
        // Jika sudah ada, gunakan data yang ada
        adminData = existingAdmin;
        console.log("✓ Admin sudah ada (ditemukan setelah cek ulang):", adminData);
      } else {
        // Jika belum ada, insert baru
        const { data: newAdminData, error: insertError } = await supabase
          .from("admins")
          .insert({
            user_id: userId
            // created_at akan otomatis diisi oleh database (DEFAULT NOW())
          })
          .select()
          .single();
        
        if (insertError) {
          // Jika insert gagal, mungkin karena constraint atau error lain
          console.error("Gagal auto-create admin:", insertError);
          
          // Cek apakah ada data admin lain untuk referensi
          const { data: allAdmins } = await supabase
            .from("admins")
            .select("*");
          
          console.log("Data admin yang ada:", allAdmins);
          
          // Berikan instruksi manual
          throw new Error(
            `Gagal menambahkan user ke tabel admins. Error: ${insertError.message}. ` +
            `\n\nSilakan tambahkan manual di Supabase Dashboard:\n` +
            `1. Buka Table Editor > admins\n` +
            `2. Klik "Insert row"\n` +
            `3. Masukkan user_id: ${userId}\n` +
            `4. Atau jalankan SQL: INSERT INTO admins (user_id) VALUES ('${userId}');`
          );
        } else {
          // Berhasil auto-create
          adminData = newAdminData;
          console.log("✓ Admin berhasil dibuat:", adminData);
        }
      }
    } else {
      console.log("✓ Admin ditemukan:", adminData);
    }
    
    // Return data admin dengan informasi dari Auth
    return {
      ...adminData,
      email: authData.user.email, // Tambahkan email dari Auth
      user_id: userId
    };
  } catch (err) {
    // Tangkap error dan berikan pesan yang lebih jelas
    if (err.message.includes("schema cache")) {
      throw new Error("Tabel admins belum dibuat di database. Silakan jalankan script SUPABASE_ADMIN_SETUP.sql di Supabase Dashboard.");
    }
    if (err.message.includes("does not exist")) {
      throw err; // Sudah ada pesan yang jelas
    }
    throw err;
  }
}

// Ambil data admin (untuk edit)
export async function getAdmin() {
  try {
    // Query semua dan ambil yang pertama (jika hanya ada satu admin)
    // atau query dengan limit jika ada beberapa
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .limit(1)
      .single();
    
    if (error) {
      if (error.message && error.message.includes("schema cache")) {
        throw new Error("Tabel admins belum dibuat di database. Silakan jalankan script SUPABASE_ADMIN_SETUP.sql di Supabase Dashboard.");
      }
      if (error.message && error.message.includes("does not exist")) {
        throw new Error(`Kolom tidak ditemukan di tabel admins. Error: ${error.message}`);
      }
      throw error;
    }
    return data;
  } catch (err) {
    if (err.message && err.message.includes("schema cache")) {
      throw new Error("Tabel admins belum dibuat di database. Silakan jalankan script SUPABASE_ADMIN_SETUP.sql di Supabase Dashboard.");
    }
    if (err.message && err.message.includes("does not exist")) {
      throw err;
    }
    throw err;
  }
}

// Update admin (email atau password)
export async function updateAdmin(id, fields) {
  try {
    const { data, error } = await supabase
      .from("admins")
      .update(fields)
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      if (error.message && error.message.includes("schema cache")) {
        throw new Error("Tabel admin belum dibuat di database. Silakan jalankan script SUPABASE_ADMIN_SETUP.sql di Supabase Dashboard.");
      }
      throw error;
    }
    return data;
  } catch (err) {
    if (err.message && err.message.includes("schema cache")) {
      throw new Error("Tabel admin belum dibuat di database. Silakan jalankan script SUPABASE_ADMIN_SETUP.sql di Supabase Dashboard.");
    }
    throw err;
  }
}



