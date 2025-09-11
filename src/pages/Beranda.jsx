// src/pages/Beranda.jsx
import { Link } from "react-router-dom";
import {
  Newspaper,
  Box,
  MessageCircle,
  Server,
  FileText,
  BookOpen,
  Phone,
} from "lucide-react";

export default function Beranda() {
  const menus = [
    { name: "Berita", path: "/berita", icon: <Newspaper size={28} /> },
    { name: "Aplikasi", path: "/aplikasi", icon: <Box size={28} /> },
    { name: "Aduan", path: "/aduan", icon: <MessageCircle size={28} /> },
    { name: "Infrastruktur", path: "/infrastruktur", icon: <Server size={28} /> },
    { name: "Informasi Publik", path: "/informasi-publik", icon: <FileText size={28} /> },
    { name: "Literasi", path: "/literasi", icon: <BookOpen size={28} /> },
    { name: "Kontak", path: "/kontak", icon: <Phone size={28} /> },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#003366] to-[#004080] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Selamat Datang di Portal Resmi <br />
            <span className="text-[#FFB800]">Dinas Kominfo Kota Bukittinggi</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-200 max-w-2xl mx-auto mb-6">
            Akses informasi publik, layanan digital, berita terbaru, dan berbagai
            inovasi smart city di Kota Bukittinggi.
          </p>
          <Link
            to="/informasi-publik"
            className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#e6a700] transition"
          >
            Lihat Selengkapnya
          </Link>
        </div>
      </section>

      {/* Quick Menu Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Akses Cepat
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {menus.map((menu, i) => (
            <Link
              key={i}
              to={menu.path}
              className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:bg-gray-50 transition"
            >
              <div className="p-3 rounded-full bg-[#003366] text-white mb-3">
                {menu.icon}
              </div>
              <span className="font-medium text-gray-800">{menu.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Highlight Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Berita & Informasi Terbaru
          </h2>
          <p className="text-gray-600 mb-8">
            Update seputar kegiatan dan perkembangan Kota Bukittinggi
          </p>
          <Link
            to="/berita"
            className="inline-block bg-[#003366] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#002244] transition"
          >
            Lihat Berita
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003366] text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Dinas Komunikasi dan Informatika Kota Bukittinggi.
            All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
