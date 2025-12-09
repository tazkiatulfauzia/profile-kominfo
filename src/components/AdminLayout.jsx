import { useNavigate, NavLink } from "react-router-dom";
import { Home, User, Box, Newspaper, MessageCircle, Phone } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Beranda", path: "/admin/dashboard", icon: <Home size={20} /> },
    { name: "Akun", path: "/account", icon: <User size={20} /> },
    { name: "Aplikasi", path: "/aplikasi", icon: <Box size={20} /> },
    { name: "Berita", path: "/berita", icon: <Newspaper size={20} /> },
    { name: "Aduan", path: "/aduan", icon: <MessageCircle size={20} /> },
    { name: "Kontak", path: "/kontak", icon: <Phone size={20} /> },
  ];

  const handleLogout = () => {
    logout?.();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-[#e6f0ff] text-[#003366] min-h-screen shadow-xl">
        <div className="flex items-center justify-between px-4 h-20 border-b border-[#cfdff5]">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="text-left text-sm leading-tight font-semibold text-[#003366]">
              Dinas Komunikasi dan Informatika
              <br />
              Kota Bukittinggi
            </span>
          </div>
        </div>

        <nav className="p-4">
          {navItems.map(({ name, path, icon }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded transition-colors text-sm ${
                  isActive
                    ? "bg-[#ccd9f5] font-semibold border-l-4 border-[#FFB800] text-[#003366]"
                    : "hover:bg-[#d9e6ff] text-[#003366]"
                }`
              }
            >
              <span className="text-[#003366]">{icon}</span>
              <span className="text-[#003366]">{name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-6 border-t border-[#cfdff5]">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded hover:bg-[#ffd] transition bg-white border text-[#003366]"
          >
            Logout
          </button>
        </div>
      </aside>
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}

