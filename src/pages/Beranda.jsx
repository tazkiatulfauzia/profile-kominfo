import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBeritaBeranda } from "../lib/berita";
import { BookOpen, FileText, Landmark, ExternalLink, Globe } from "lucide-react";

export default function Beranda() {
  const [beritaBeranda, setBeritaBeranda] = useState([]);
  const [aplikasi, setAplikasi] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBeritaBeranda();
        setBeritaBeranda(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Gagal memuat berita:", e);
        setBeritaBeranda([]);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchAplikasi = async () => {
      try {
        const { getAplikasi } = await import("../lib/aplikasi");
        const data = await getAplikasi();
        setAplikasi(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Gagal memuat aplikasi:", error);
        setAplikasi([]);
      }
    };
    fetchAplikasi();
  }, []);

  const artikelList = [
    {
      title: "Tentang Kota Bukittinggi",
      link: "https://share.google/u4B1sYyZz3TYeXnvg",
      icon: <Landmark className="w-6 h-6 text-[#003366]" />,
    },
    {
      title: "Sejarah Kota Bukittinggi",
      link: "https://share.google/0WkVxbcZ80fLG2ZoL",
      icon: <BookOpen className="w-6 h-6 text-[#003366]" />,
    },
    {
      title:
        "Kota Bukittinggi: Dari ”Parijs Van Sumatra” Hingga Pusat Perdagangan di Sumatera Barat",
      link: "https://share.google/4qDRYL9JHAGEDgCFw",
      icon: <FileText className="w-6 h-6 text-[#003366]" />,
    },
    {
      title: "Profil Kota Bukittinggi (Wikipedia)",
      link: "https://id.wikipedia.org/wiki/Kota_Bukittinggi",
      icon: <Globe className="w-6 h-6 text-[#003366]" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pb-6">

      {/* HERO SECTION (PARALLAX) */}
      <section
        className="relative text-white h-screen"
        style={{
          backgroundImage: "url('/bukittinggi.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Selamat Datang di{" "}
            <span className="text-[#FFB800]">Portal Dinas Kominfo Bukittinggi</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-200 max-w-2xl mx-auto drop-shadow">
            Akses berita, inovasi digital, serta berbagai layanan publik
            yang mendukung transformasi menuju Smart City Bukittinggi.
          </p>
        </div>
      </section>

      {/* BERITA */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-10 text-center">
          Berita Terbaru
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {(beritaBeranda || []).map((b) => (
            <Link
              to="/berita"
              key={b.id}
              className="group rounded-xl overflow-hidden shadow hover:shadow-lg bg-white transition transform hover:-translate-y-2 cursor-pointer"
            >
              <img
                src={b.gambar || b.img}
                alt={b.judul || b.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-5">
                <h3 className="font-semibold text-lg text-[#003366] mb-2 line-clamp-2">
                  {b.judul || b.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {b.deskripsi || b.desc}
                </p>
                <span className="text-sm text-[#0055aa] hover:text-[#003366] font-semibold">
                  Baca Selengkapnya →
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/berita"
            className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#e6a700] transition"
          >
            Lihat Semua Berita →
          </Link>
        </div>
      </section>

      {/* APLIKASI */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#003366]">
          Aplikasi Kota Bukittinggi
        </h2>

        <div
          className={`grid gap-6 ${
            aplikasi.length === 1
              ? "flex justify-center"
              : "sm:grid-cols-2 md:grid-cols-3"
          }`}
        >
          {aplikasi.length > 0 ? (
            aplikasi.map((app) => (
              <Link
                key={app.id}
                to="/aplikasi"
                className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition flex flex-col items-center text-center w-full max-w-sm cursor-pointer group"
              >
                {app.logo_url && (
                  <img
                    src={app.logo_url}
                    alt={app.nama}
                    className="w-16 h-16 object-contain mb-4 group-hover:scale-110 transition-transform"
                  />
                )}
                <h3 className="font-semibold text-lg text-[#003366] mb-2">
                  {app.nama}
                </h3>
                <p className="text-sm text-gray-600">{app.deskripsi}</p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              Belum ada aplikasi yang ditambahkan.
            </p>
          )}
        </div>

        <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/aplikasi"
            className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#e6a700] transition"
          >
            Lihat Semua Aplikasi →
          </Link>
          <a
            href="https://ppid.bukittinggikota.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#003366] to-[#0055aa] text-white px-6 py-3 rounded-lg font-medium hover:from-[#00224d] hover:to-[#004488] transition shadow-lg hover:shadow-xl"
          >
            <ExternalLink size={18} />
            Portal PPID
          </a>
        </div>
      </section>

      {/* LITERASI DIGITAL */}
      <section className="mx-auto max-w-7xl px-4 pt-16 bg-white">
        <div className="grid lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#003366] to-[#0055aa] bg-clip-text text-transparent border-l-4 border-[#003366] pl-4 mb-4">
              Artikel Singkat
            </h2>
            <article className="mt-4 bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-blue-100">
              <h3 className="font-semibold text-[#003366] text-xl mb-3">
                Tips Aman Menggunakan Media Sosial
              </h3>
              <ul className="list-disc pl-5 mt-3 text-[#003366]/90 space-y-2">
                <li>Aktifkan 2FA (Two-Factor Authentication)</li>
                <li>Gunakan password yang kuat dan unik</li>
                <li>Jangan bagikan informasi pribadi di media sosial</li>
                <li>Hati-hati dengan link yang mencurigakan</li>
              </ul>
            </article>

            <h2 className="mt-10 text-3xl font-bold bg-gradient-to-r from-[#003366] to-[#0055aa] bg-clip-text text-transparent border-l-4 border-[#003366] pl-4 mb-4">
              Artikel Bukittinggi
            </h2>
            <div className="mt-4 grid md:grid-cols-2 gap-6">
              {artikelList.map((a, i) => (
                <a
                  key={i}
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition transform p-6 bg-gradient-to-br from-white to-blue-50 border border-blue-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#003366] to-[#0055aa] text-white">
                      {a.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#003366] text-lg leading-snug mb-2">
                        {a.title}
                      </h3>
                      <p className="text-sm text-[#003366]/70 font-medium">
                        Baca Artikel →
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <h2 className="mt-10 text-3xl font-bold bg-gradient-to-r from-[#003366] to-[#0055aa] bg-clip-text text-transparent border-l-4 border-[#003366] pl-4 mb-4">
              Kutipan Literasi
            </h2>
            <div className="mt-4 grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100">
                <p className="italic text-[#003366] text-lg font-medium leading-relaxed">
                  "Membaca adalah jendela dunia."
                </p>
                <p className="mt-4 text-sm text-[#003366]/80 font-semibold">
                  — Pepatah Lama
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100">
                <p className="italic text-[#003366] text-lg font-medium leading-relaxed">
                  "Literasi adalah kunci menuju peradaban."
                </p>
                <p className="mt-4 text-sm text-[#003366]/80 font-semibold">
                  — Anonim
                </p>
              </div>
            </div>
          </section>

          {/* VIDEO */}
          <aside className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#003366] to-[#0055aa] bg-clip-text text-transparent border-l-4 border-[#003366] pl-4 mb-4">
              Video Bukittinggi
            </h2>

            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/a-kmKhnoBpc?si=iUf8L8jGhXkJrMUN"
                title="Video Kota Bukittinggi"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/HEV1pWyYS1w?si=XefbpPr2no16W8US"
                title="Video Lainnya"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
