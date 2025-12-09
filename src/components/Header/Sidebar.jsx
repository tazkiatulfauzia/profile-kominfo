import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  Box,
  Newspaper,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ open = false, onClose = () => {}, menus = [] }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const defaultMenuItems = user && user.role === "Admin"
    ? [
        { name: "Beranda", path: "/admin/dashboard", icon: <Home size={20} /> },
        { name: "Akun", path: "/account", icon: <User size={20} /> },
        { name: "Aplikasi", path: "/aplikasi", icon: <Box size={20} /> },
        { name: "Berita", path: "/berita", icon: <Newspaper size={20} /> },
        { name: "Aduan", path: "/aduan", icon: <MessageCircle size={20} /> },
        { name: "Kontak", path: "/kontak", icon: <Phone size={20} /> },
      ]
    : [
        { name: "Beranda", path: "/", icon: <Home size={20} /> },
        { name: "Akun", path: "/account", icon: <User size={20} /> },
        { name: "Aplikasi", path: "/aplikasi", icon: <Box size={20} /> },
        { name: "Berita", path: "/berita", icon: <Newspaper size={20} /> },
        { name: "Aduan", path: "/aduan", icon: <MessageCircle size={20} /> },
        { name: "Kontak", path: "/kontak", icon: <Phone size={20} /> },
      ];

  const baseMenuItems = menus.length
    ? menus.map((m) => ({ ...m, icon: null }))
    : defaultMenuItems;

  const menuItems = [
    ...baseMenuItems,
    ...(user ? [{ name: "Akun", path: "/account" }] : []),
  ];

  function handleLogoutClick() {
    if (typeof logout === "function") logout();
    onClose();
    navigate("/");
  }

  return (
    <>
      <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-[#e6f0ff] text-[#003366] shadow-lg transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
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
                {icon && <span className="text-[#003366]">{icon}</span>}
                <span className="text-[#003366]">{name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto p-6 border-t border-[#cfdff5]">
            {user ? (
              <>
                <div className="text-sm">Masuk sebagai <strong>{user?.name || user?.email}</strong></div>
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left px-3 py-2 rounded hover:bg-[#ffd] transition bg-white border"
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </aside>
      </div>
    </>
  );
}
