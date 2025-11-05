// src/pages/Beranda.jsx
import { Link } from "react-router-dom";
import {
  Newspaper,
  Box,
  MessageCircle,
  BookOpen,
  Phone,
  FileText,
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
      name: "PPID",
      desc: "Pejabat Pengelola Informasi & Dokumentasi",
      path: "https://ppid.bukittinggikota.go.id/", // ✅ link PPID
      icon: <FileText size={28} />,
      external: true,
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
      title: "Wako Ramlan Serahkan Perlengkapan Sekolah Gratis",
      desc: "Wawako Ibnu Asis Buka Rapat Koordinasi TPPS Bukittinggi, Tegaskan Komitmen Percepatan Penurunan Stunting.",
      img: "/berita1.jpg",
      link: "https://bukittinggikota.go.id/news_detail/2446/Wawako%20Ibnu%20Asis%20Buka%20Rapat%20Koordinasi%20TPPS%20Bukittinggi,%20Tegaskan%20Komitmen%20Percepatan%20Penurunan%20Stunting",
    },
    {
      title: "Wako Ramlan Buka Pelatihan Advokasi PUG 2025",
      desc: "Wako Ramlan Terima Kunjungan Konjen Tiongkok dari Medan, Bahas Kerja Sama Pariwisata dan Ekonomi",
      img: "/berita2.jpg",
      link: "https://bukittinggikota.go.id/news_detail/2445/Wako%20Ramlan%20Terima%20Kunjungan%20Konjen%20Tiongkok%20dari%20Medan,%20Bahas%20Kerja%20Sama%20Pariwisata%20dan%20Ekonomi",
    },
    {
      title: "Pemko Dukung HI Datangkan Syech Bilal dari Palestina",
      desc: "Pemko Bukittinggi dan BPJS Kesehatan Teken Adendum Nota Kesepakatan Program JKN",
      img: "/berita3.jpg",
      link: "https://bukittinggikota.go.id/news_detail/2443/Pemko%20Bukittinggi%20dan%20BPJS%20Kesehatan%20Teken%20Adendum%20Nota%20Kesepakatan%20Program%20JKN",
    },
  ];

  const literasi = [
    {
      title: "Literasi Digital",
      desc: "Panduan aman bermedia sosial dan etika digital untuk masyarakat.",
    },
    {
      title: "Literasi Informasi",
      desc: "Cara cek kebenaran berita sebelum membagikan di media sosial.",
    },
  ];

  const aplikasiMini = [
    {
      name: "CCTV Bukittinggi",
      desc: "Pantau CCTV Kota Bukittinggi secara langsung.",
      link: "https://cctv.bukittinggikota.go.id/",
    },
    {
      name: "e-Lapor",
      desc: "Layanan aduan masyarakat online.",
      link: "/aduan",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
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
            <span className="text-[#FFB800]">Dinas Kominfo Kota Bukittinggi</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-200 max-w-2xl mx-auto mb-6">
            Akses informasi publik, layanan digital, berita terbaru, dan
            berbagai inovasi smart city di Kota Bukittinggi.
          </p>
        </div>
      </section>

      {/* Berita */}
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
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Literasi */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#003366]">
          Literasi
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {literasi.map((l, i) => (
            <div
              key={i}
              className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-[#003366] mb-2">
                {l.title}
              </h3>
              <p className="text-gray-600 text-sm">{l.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Aplikasi Mini */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#003366]">
          Aplikasi Cepat
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {aplikasiMini.map((app, i) => (
            <a
              key={i}
              href={app.link}
              target={app.link.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-[#003366] mb-2">
                {app.name}
              </h3>
              <p className="text-sm text-gray-600">{app.desc}</p>
            </a>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/aplikasi"
            className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#e6a700] transition"
          >
            Lihat Semua Aplikasi →
          </Link>
        </div>
      </section>

      {/* Akses Cepat */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#003366]">
          Akses Cepat
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {menus.map((menu, i) =>
            menu.external ? (
              <a
                key={i}
                href={menu.path}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
            ) : (
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
            )
          )}
        </div>
      </section>
    </div>
  );
}
