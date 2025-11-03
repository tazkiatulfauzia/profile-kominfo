import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, Shield } from "lucide-react";
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
    { name: "Infrastruktur", path: "/infrastruktur" },
    { name: "PPID", path: "/ppid" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    <>
      <header className="w-full bg-white fixed top-0 left-0 right-0 z-40 shadow-md border-b border-[#003366]/20">
        {/* Compact Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-2.5 max-w-7xl mx-auto bg-white">
          {/* Logo + Text - Compact */}
          {user ? (
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <img src="/logo.png" alt="Logo Kota Bukittinggi" className="h-10 w-auto" />
              <div className="flex flex-col text-left leading-tight">
                <h1 className="text-sm md:text-base font-bold text-[#003366] uppercase tracking-tight">
                  Dinas Komunikasi dan Informatika
                </h1>
                <p className="text-[10px] md:text-xs text-[#555] font-medium">
                  Pemerintah Kota Bukittinggi
                </p>
              </div>
            </Link>
          ) : (
            <Link 
              to="/admin/login" 
              className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer"
              title="Login Admin"
            >
              <img src="/logo.png" alt="Logo Kota Bukittinggi" className="h-10 w-auto" />
              <div className="flex flex-col text-left leading-tight">
                <h1 className="text-sm md:text-base font-bold text-[#003366] uppercase tracking-tight">
                  Dinas Komunikasi dan Informatika
                </h1>
                <p className="text-[10px] md:text-xs text-[#555] font-medium">
                  Pemerintah Kota Bukittinggi
                </p>
              </div>
            </Link>
          )}

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Link ke Account - untuk admin */}
            {user && (
              <>
                <Link 
                  to="/account" 
                  className="hidden md:flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#003366] to-[#0055aa] hover:from-[#00224d] hover:to-[#004488] text-white rounded text-xs font-semibold shadow-sm hover:shadow transition-all duration-200"
                  title="Pengaturan Akun Admin"
                >
                  <User size={16} />
                  <span>Panel Admin</span>
                </Link>
                <Link 
                  to="/account" 
                  className="block md:hidden p-2 bg-[#003366] text-white rounded hover:bg-[#00224d] transition" 
                  title="Pengaturan Akun"
                >
                  <User size={18} />
                </Link>
              </>
            )}

            <button
              aria-label="Buka menu"
              onClick={() => setSidebarOpen(true)}
              className="block md:hidden text-[#003366] p-2 hover:bg-gray-100 rounded transition"
              type="button"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} menus={menus} />
    </>
  );
}
