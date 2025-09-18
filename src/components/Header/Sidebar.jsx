// src/components/Header/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  Server,
  Box,
  Newspaper,
  FileText,
  MessageCircle,
  BookOpen,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ open = false, onClose = () => {}, menus = [] }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const defaultMenuItems = [
    { name: "Beranda", path: "/", icon: <Home size={20} /> },
    { name: "Profil", path: "/profil", icon: <User size={20} /> },
    { name: "Infrastruktur", path: "/infrastruktur", icon: <Server size={20} /> },
    { name: "Aplikasi", path: "/aplikasi", icon: <Box size={20} /> },
    { name: "Berita", path: "/berita", icon: <Newspaper size={20} /> },
    { name: "Informasi Publik", path: "/informasi-publik", icon: <FileText size={20} /> },
    { name: "Aduan", path: "/aduan", icon: <MessageCircle size={20} /> },
    { name: "Literasi", path: "/literasi", icon: <BookOpen size={20} /> },
    { name: "Kontak", path: "/kontak", icon: <Phone size={20} /> },
  ];

  // gunakan menus dari props jika ada, bila tidak gunakan default
  const baseMenuItems = menus.length ? menus.map(m => ({ ...m, icon: null })) : defaultMenuItems;

  // jika user sudah login, tambahkan menu Akun (tanpa icon)
  const menuItems = [
    ...baseMenuItems,
    ...(user ? [{ name: "Akun", path: "/account" }] : []),
  ];

  function handleLogoutClick() {
    if (typeof logout === "function") logout();
    onClose();
    navigate("/"); // arahkan ke beranda setelah logout
  }

  return (
    <>
      <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}>
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        />

        {/* panel */}
        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-[#e6f0ff] text-[#003366] shadow-lg transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header panel */}
          <div className="flex items-center justify-between px-4 h-20 border-b border-[#cfdff5]">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
              <span className="text-left text-sm md:text-base leading-tight font-semibold text-[#003366]">
                Dinas Komunikasi dan Informatika
                <br />
                Kota Bukittinggi
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Tutup menu"
              type="button"
              className="appearance-none bg-transparent border-0 p-1 m-0 focus:outline-none focus:ring-0"
            >
              <X size={22} className="text-[#003366]" />
            </button>
          </div>

          {/* Menu list */}
          <nav className="p-4">
            {menuItems.map(({ name, path, icon }) => (
              <NavLink
                key={name}
                to={path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded transition-colors text-sm ${
                    isActive
                      ? "bg-[#ccd9f5] font-semibold border-l-4 border-[#FFB800] text-[#003366]"
                      : "hover:bg-[#d9e6ff] text-[#003366]"
                  }`
                }
              >
                {/* kalau ada icon tampilkan, kalau tidak hanya teks */}
                {icon && <span className="text-[#003366]">{icon}</span>}
                <span className="text-[#003366]">{name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer: login / logout + social */}
          <div className="mt-auto p-6 border-t border-[#cfdff5]">
            <div className="flex flex-col gap-3">
              {user ? (
                <>
                  <div className="text-sm">
                    Masuk sebagai <strong>{user?.name || user?.email}</strong>
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left px-3 py-2 rounded hover:bg-[#ffd] transition bg-white border"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={onClose}
                  className="block w-full text-center px-3 py-2 rounded bg-[#003366] text-white hover:bg-[#002244]"
                >
                  Login
                </NavLink>
              )}

              <div className="flex justify-center space-x-4 mt-3">
                <a href="#" className="p-2 rounded-full hover:bg-[#FFB800]" aria-label="Instagram">
                  <Instagram size={20} className="text-[#003366]" />
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-[#FFB800]" aria-label="Facebook">
                  <Facebook size={20} className="text-[#003366]" />
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-[#FFB800]" aria-label="Twitter">
                  <Twitter size={20} className="text-[#003366]" />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
