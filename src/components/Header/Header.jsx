// src/components/Header/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, User } from "lucide-react";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const menus = [
    { name: "Beranda", path: "/" },
    { name: "Aduan", path: "/aduan" },
    { name: "Aplikasi", path: "/aplikasi" },
    { name: "Berita", path: "/berita" },
    { name: "Informasi Publik", path: "/informasi-publik" },
    { name: "Infrastruktur", path: "/infrastruktur" },
    { name: "Kontak", path: "/kontak" },
    { name: "Literasi", path: "/literasi" },
  ];

  return (
    <>
      <header className="w-full bg-[#d9e6ff] fixed top-0 left-0 right-0 z-40 shadow">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo + Text */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 md:h-12 w-auto" />
            <div className="flex flex-col text-left leading-tight">
              <p className="text-sm md:text-base font-semibold text-[#003366]">
                Pemerintah Kota Bukittinggi
              </p>
              <p className="text-[11px] md:text-sm text-[#002244]">
                Dinas Komunikasi dan Informatika
              </p>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Search (hanya tampil di desktop) */}
            <div className="hidden md:flex items-center rounded border border-gray-300 px-2 py-1 bg-white">
              <input
                type="text"
                placeholder="Cari di sini..."
                className="w-32 md:w-40 text-xs md:text-sm outline-none placeholder-gray-400 text-[#003366]"
              />
              <Search size={16} className="text-gray-500" />
            </div>

            {/* Mobile: jika user ada, tampilkan icon akun (block di mobile) */}
            {user ? (
              <Link to="/account" className="block md:hidden p-2 text-[#003366]" title="Akun saya">
                <User size={20} />
              </Link>
            ) : null}

            {/* Login / Akun (desktop) */}
            {user ? (
              <Link
                to="/account"
                className="hidden md:flex items-center gap-2 rounded-lg bg-white border px-3 py-1.5 text-sm font-medium text-[#003366] hover:bg-[#f0f6ff] transition"
              >
                <User size={18} />
                <span>{user?.name ? user.name.split(" ")[0] : "Akun"}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden md:block rounded-lg bg-[#003366] px-4 py-1.5 text-xs md:text-sm font-medium text-white hover:bg-[#002244] transition"
              >
                Login
              </Link>
            )}

            {/* Logo Indonesia */}
            <img
              src="/logo-indonesia.jpeg"
              alt="Smart City"
              className="hidden md:block h-8 md:h-10 w-auto"
            />

            {/* Sidebar toggle (mobile only) */}
            <button
              aria-label="Buka menu"
              onClick={() => setSidebarOpen(true)}
              className="block md:hidden text-[#003366] p-2"
              type="button"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} menus={menus} />
    </>
  );
}
