import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        
        {/* Kiri: Logo + Nama Instansi */}
        <div className="flex items-center gap-3">
          <img
            src="/logo-bukittinggi.png"
            alt="Logo"
            className="h-12 w-auto"
          />
          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Pemerintah Kota Bukittinggi
            </h1>
            <p className="text-xs text-gray-600">
              Dinas Komunikasi dan Informatika
            </p>
          </div>
        </div>

        {/* Tengah: Kosong / bisa isi menu kecil */}
        <div className="hidden md:flex flex-1 justify-center"></div>

        {/* Kanan: Search, Login, Logo */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center rounded border border-gray-300 px-2 py-1">
            <input
              type="text"
              placeholder="Cari di sini..."
              className="w-40 text-sm outline-none placeholder-gray-400"
            />
            <Search size={16} className="text-gray-500" />
          </div>

          {/* Login */}
          <Link
            to="/login"
            className="rounded bg-[#003366] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#002244]"
          >
            Login
          </Link>

          {/* Logo tambahan */}
          <img
            src="/logo-indonesia.jpeg"
            alt="Smart City"
            className="h-10 w-auto"
          />
        </div>
      </div>
    </header>
  );
}
