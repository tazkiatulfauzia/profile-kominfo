// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Sistem sederhana: cek apakah admin sudah login dari localStorage
  const [user, setUser] = useState(() => {
    try {
      const adminData = localStorage.getItem("adminData");
      if (adminData) {
        return JSON.parse(adminData);
      }
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Sync dengan localStorage
    if (user) {
      localStorage.setItem("adminData", JSON.stringify(user));
    } else {
      localStorage.removeItem("adminData");
    }
  }, [user]);

  // Login admin dengan email dan password dari Supabase
  const login = async (email, password) => {
    try {
      const { loginAdmin } = await import("../lib/admin");
      const adminData = await loginAdmin(email, password);
      
      // Cari email dari berbagai kemungkinan kolom
      const emailColumns = ["email", "admin_email", "user_email", "email_address"];
      let adminEmail = email.trim(); // Default ke email yang diinput
      
      for (const col of emailColumns) {
        if (adminData[col]) {
          adminEmail = String(adminData[col]).trim();
          break;
        }
      }
      
      const userData = {
        id: adminData.id,
        email: adminEmail,
        role: "Admin",
      };
      
      setUser(userData);
      return { ok: true };
    } catch (error) {
      console.error("Login error:", error);
      return { ok: false, message: error.message || "Email atau password salah" };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminData");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  try {
  return useContext(AuthContext);
  } catch (error) {
    console.error("Error in useAuth:", error);
    return { user: null, login: async () => ({ ok: false }), logout: () => {} };
  }
}
