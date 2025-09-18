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
    {
      name: "Berita",
      desc: "Update informasi terbaru",
      path: "/berita",
      icon: <Newspaper size={28} />,
    },
    {
      name: "Aplikasi",
      desc: "Layanan digital resmi",
      path: "/aplikasi",
      icon: <Box size={28} />,
    },
    {
      name: "Aduan",
      desc: "Sampaikan laporan Anda",
      path: "/aduan",
      icon: <MessageCircle size={28} />,
    },
    {
      name: "Infrastruktur",
      desc: "Sistem & jaringan kota",
      path: "/infrastruktur",
      icon: <Server size={28} />,
    },
    {
      name: "Informasi Publik",
      desc: "Data dan dokumen terbuka",
      path: "/informasi-publik",
      icon: <FileText size={28} />,
    },
    {
      name: "Literasi",
      desc: "Edukasi & pengetahuan",
      path: "/literasi",
      icon: <BookOpen size={28} />,
    },
    {
      name: "Kontak",
      desc: "Hubungi Kominfo",
      path: "/kontak",
      icon: <Phone size={28} />,
    },
  ];

  const berita = [
    {
      title:
        "Wako Ramlan Serahkan Perlengkapan Sekolah Gratis untuk 1.846 Siswa SD se Bukittinggi",
      desc: "Pemko Bukittinggi kembali menyalurkan bantuan perlengkapan sekolah gratis bagi ribuan siswa SD.",
      img: "/berita1.jpg",
      link: "https://www.bukittinggikota.go.id/news_detail/2406/Wako%20Ramlan%20Serahkan%20Perlengkapan%20Sekolah%20Gratis%20untuk%201.846%20Siswa%20SD%20se%20Bukittinggi",
    },
    {
      title:
        "Wako Ramlan Buka Pelatihan Advokasi dan Evaluasi Pengarusutamaan Gender Kota Bukittinggi 2025",
      desc: "Pelatihan PUG resmi dibuka untuk meningkatkan pemahaman kesetaraan gender di Kota Bukittinggi.",
      img: "/berita2.jpg",
      link: "https://www.bukittinggikota.go.id/news_detail/2405/Wako%20Ramlan%20Buka%20Pelatihan%20Advokasi%20dan%20Evaluasi%20Pengarusutamaan%20Gender%20Kota%20Bukittinggi%202025",
    },
    {
      title:
        "Pemko Dukung HI Datangkan Syech Bilal dari Palestina Motivasi Menghafal Al Quran",
      desc: "Kegiatan ini menjadi ajang inspirasi bagi generasi muda Bukittinggi untuk mencintai Al-Quran.",
      img: "/berita3.jpg",
      link: "https://www.bukittinggikota.go.id/news_detail/2403/Pemko%20Dukung%20HI%20Datangkan%20Syech%20Bilal%20dari%20Palestina%20Motivasi%20Menghafal%20Al%20Quran",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative text-white h-[500px] md:h-[600px]"
        style={{
          backgroundImage: "url('/jamgadang.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Selamat Datang di Portal Resmi <br />
            <span className="text-[#FFB800]">
              Dinas Kominfo Kota Bukittinggi
            </span>
          </h1>
          <p className="text-sm md:text-lg text-gray-200 max-w-2xl mx-auto mb-6">
            Akses informasi publik, layanan digital, berita terbaru, dan
            berbagai inovasi smart city di Kota Bukittinggi.
          </p>
          <Link
            to="/informasi-publik"
            className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#e6a700] transition"
          >
            Lihat Selengkapnya
          </Link>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-10 text-center">
          Berita Terbaru
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {berita.map((b, i) => (
            <a
              href={b.link}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden shadow hover:shadow-lg bg-white transition transform hover:-translate-y-2"
            >
              <img
                src={b.img}
                alt={b.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-5">
                <h3 className="font-semibold text-lg text-[#003366] mb-2 line-clamp-2">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {b.desc}
                </p>
                <span className="text-sm font-medium text-[#003366] group-hover:underline">
                  Baca selengkapnya →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Akses Cepat */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#003366]">
          Akses Cepat
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {menus.map((menu, i) => (
            <Link
              key={i}
              to={menu.path}
              className="group flex flex-col items-center justify-center bg-white shadow-md rounded-2xl p-6 hover:shadow-xl hover:-translate-y-2 transform transition duration-300"
            >
              <div className="p-4 rounded-full bg-[#003366] text-white mb-3 group-hover:scale-110 transform transition duration-300">
                {menu.icon}
              </div>
              <span className="font-semibold text-[#003366] text-lg">
                {menu.name}
              </span>
              <p className="text-sm text-gray-500 text-center mt-1">
                {menu.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
