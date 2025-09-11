// src/components/Header/Sidebar.jsx
import { NavLink } from "react-router-dom";
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

export default function Sidebar({ open = false, onClose = () => {}, menus = [] }) {
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

  const menuItems = menus.length ? menus : defaultMenuItems;

  return (
    <>
      {/* --------------------------
          Mobile overlay sidebar ONLY
          (tidak ada static sidebar di desktop)
      -------------------------- */}
      <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}>
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />

        {/* panel */}
        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-[#003366] text-white shadow-lg transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header panel */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-[#002a4d]">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-8" />
              <span className="font-semibold">Menu</span>
            </div>
            <button onClick={onClose} aria-label="Tutup menu" className="p-1">
              <X size={20} />
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
                  `flex items-center gap-3 px-3 py-3 rounded hover:bg-[#002a5a] transition-colors ${
                    isActive
                      ? "bg-[#002b59] font-semibold border-l-4 border-[#FFB800]"
                      : ""
                  }`
                }
              >
                {icon}
                <span>{name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer social */}
          <div className="mt-auto p-6 border-t border-[#002a4d] flex justify-center space-x-4">
            <a href="#" className="p-2 rounded-full hover:bg-[#FFB800]" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-[#FFB800]" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-[#FFB800]" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
