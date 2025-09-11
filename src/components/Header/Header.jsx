// src/components/Header/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Header Utama */}
      <header className="w-full bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Kiri: Logo + Nama Instansi */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            <div className="flex flex-col text-left">
              <p className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
                Pemerintah Kota Bukittinggi
              </p>
              <p className="text-[11px] md:text-sm text-gray-600 leading-tight">
                Dinas Komunikasi dan Informatika
              </p>
            </div>
          </div>

          {/* Kanan: Search + Login + SmartCity + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Search (hanya desktop) */}
            <div className="hidden md:flex items-center rounded border border-gray-300 px-2 py-1">
              <input
                type="text"
                placeholder="Cari di sini..."
                className="w-36 md:w-40 text-xs md:text-sm outline-none placeholder-gray-400"
              />
              <Search size={16} className="text-gray-500" />
            </div>

            {/* Login (desktop) */}
            <Link
              to="/login"
              className="hidden md:block rounded bg-[#003366] px-4 py-1.5 text-xs md:text-sm font-medium text-white hover:bg-[#002244]"
            >
              Login
            </Link>

            {/* Logo SmartCity (desktop) */}
            <img
              src="/logo-smartcity.png"
              alt="Smart City"
              className="hidden md:block h-8 md:h-10 w-auto"
            />

            {/* Hamburger (mobile) */}
            <button
              aria-label="Buka menu"
              onClick={() => setSidebarOpen(true)}
              className="block md:hidden text-gray-700 p-2"
              type="button"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Baris Kedua: Menu Navigasi (desktop only) */}
        <nav className="hidden md:flex justify-center bg-[#003366] text-white">
          <ul className="flex gap-6 py-2">
            {menus.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.path}
                  className="hover:underline hover:text-gray-200 px-2 py-1"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Sidebar component berada di LUAR header supaya overlay tidak "ikut" di dalam header */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} menus={menus} />
    </>
  );
}
