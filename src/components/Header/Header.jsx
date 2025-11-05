import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, User } from "lucide-react";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const menus = [
    { name: "Beranda", path: "/" },
    { name: "Aduan", path: "/aduan" },
    { name: "Aplikasi", path: "/aplikasi" },
    { name: "Berita", path: "/berita" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    <>
      <header className="w-full bg-gradient-to-r from-white via-blue-50/30 to-white fixed top-0 left-0 right-0 z-40 shadow-sm border-b border-[#003366]/10 backdrop-blur-sm">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo + Text - Elegant Design */}
            {user ? (
              <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
                <img src="/logo.png" alt="Logo Kota Bukittinggi" className="h-14 w-auto drop-shadow-md" />
                <div className="flex flex-col text-left leading-tight">
                  <h1 className="text-sm md:text-base font-bold text-[#003366] tracking-wide group-hover:text-[#0055aa] transition-colors">
                    Dinas Komunikasi dan Informatika
                  </h1>
                  <p className="text-[10px] md:text-xs text-[#555]/80 font-medium italic">
                    Pemerintah Kota Bukittinggi
                  </p>
                </div>
              </Link>
            ) : (
              <Link 
                to="/admin/login" 
                className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer group"
                title="Login Admin"
              >
                <img src="/logo.png" alt="Logo Kota Bukittinggi" className="h-14 w-auto drop-shadow-md" />
                <div className="flex flex-col text-left leading-tight">
                  <h1 className="text-sm md:text-base font-bold text-[#003366] tracking-wide group-hover:text-[#0055aa] transition-colors">
                    Dinas Komunikasi dan Informatika
                  </h1>
                  <p className="text-[10px] md:text-xs text-[#555]/80 font-medium italic">
                    Pemerintah Kota Bukittinggi
                  </p>
                </div>
              </Link>
            )}

            {/* Menu Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {menus.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <Link
                    key={index}
                    to={menu.path}
                    className={`relative px-4 py-2 text-sm font-semibold text-[#003366] transition-all duration-300 ${
                      isActive
                        ? "text-[#0055aa]"
                        : "hover:text-[#0055aa] text-[#555]"
                    }`}
                  >
                    {menu.name}
                    {/* Animated underline for active menu */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003366] to-[#0055aa] transition-all duration-300 ${
                        isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right section */}
            <div className="flex items-center gap-4">
              {/* Logo Kominfo di kanan */}
              <img src="/logo-kominfo.png" alt="Logo Kominfo" className="hidden lg:block h-10 w-auto opacity-90" />
              
              {/* Link ke Account - untuk admin */}
              {user && (
                <>
                  <Link 
                    to="/account" 
                    className="hidden md:flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#003366] to-[#0055aa] hover:from-[#00224d] hover:to-[#004488] text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    title="Pengaturan Akun Admin"
                  >
                    <User size={16} />
                    <span>Panel Admin</span>
                  </Link>
                  <Link 
                    to="/account" 
                    className="block md:hidden p-2.5 bg-gradient-to-r from-[#003366] to-[#0055aa] text-white rounded-lg hover:from-[#00224d] hover:to-[#004488] transition shadow-md" 
                    title="Pengaturan Akun"
                  >
                    <User size={18} />
                  </Link>
                </>
              )}

              <button
                aria-label="Buka menu"
                onClick={() => setSidebarOpen(true)}
                className="block lg:hidden text-[#003366] p-2.5 hover:bg-[#003366]/10 rounded-lg transition"
                type="button"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} menus={menus} />
    </>
  );
}
