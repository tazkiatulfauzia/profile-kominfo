import React, { useState } from "react";

export default function Berita() {
  const [filter, setFilter] = useState("");

  // Semua data berita (tanpa dummy)
  const berita = [
    {
      id: 4,
      title:
        "Wako Ramlan Serahkan Perlengkapan Sekolah Gratis untuk 1.846 Siswa SD se Bukittinggi",
      cat: "Pendidikan",
      desc: "Sebanyak 1.846 siswa SD di Bukittinggi menerima perlengkapan sekolah gratis yang diserahkan langsung oleh Wako Ramlan.",
      img: "/berita1.jpg",
      link: "https://www.bukittinggikota.go.id/news_detail/2406/Wako%20Ramlan%20Serahkan%20Perlengkapan%20Sekolah%20Gratis%20untuk%201.846%20Siswa%20SD%20se%20Bukittinggi",
    },
    {
      id: 5,
      title:
        "Wako Ramlan Buka Pelatihan Advokasi dan Evaluasi Pengarusutamaan Gender Kota Bukittinggi 2025",
      cat: "Pelatihan",
      desc: "Pelatihan advokasi dan evaluasi pengarusutamaan gender resmi dibuka oleh Wako Ramlan sebagai bagian dari program Pemko 2025.",
      img: "/berita2.jpg",
      link: "https://www.bukittinggikota.go.id/news_detail/2405/Wako%20Ramlan%20Buka%20Pelatihan%20Advokasi%20dan%20Evaluasi%20Pengarusutamaan%20Gender%20Kota%20Bukittinggi%202025",
    },
    {
      id: 6,
      title:
        "Pemko Dukung HI Datangkan Syech Bilal dari Palestina Motivasi Menghafal Al Quran",
      cat: "Keagamaan",
      desc: "Pemko Bukittinggi mendukung kegiatan HI yang mendatangkan Syech Bilal dari Palestina untuk memberikan motivasi menghafal Al Quran.",
      img: "/berita3.jpg",
      link: "https://www.bukittinggikota.go.id/news_detail/2403/Pemko%20Dukung%20HI%20Datangkan%20Syech%20Bilal%20dari%20Palestina%20Motivasi%20Menghafal%20Al%20Quran",
    },
    {
      id: 7,
      title:
        "Tiga Atlet dan Wasit Bukittinggi Raih Prestasi Membanggakan di FORNAS VIII 2025",
      cat: "Olahraga",
      desc: "Atlet dan wasit Bukittinggi berhasil menorehkan prestasi membanggakan di ajang FORNAS VIII tahun 2025.",
      img: "/berita4.jpg",
      link: "https://www.bukittinggikota.go.id/news_detail/2395/Tiga%20Atlet%20dan%20Wasit%20Bukittinggi%20Raih%20Prestasi%20Membanggakan%20di%20FORNAS%20VIII%202025",
    },
    {
      id: 8,
      title:
        "Buka RRI Fest 2025 Kota Bukittinggi, Wawako Ibnu Asis : RRI Media Pemersatu Bangsa",
      cat: "Event",
      desc: "Wakil Walikota Ibnu Asis membuka RRI Fest 2025 dan menegaskan peran RRI sebagai media pemersatu bangsa.",
      img: "/berita5.jpg",
      link: "https://www.bukittinggikota.go.id/news_detail/2401/Buka%20RRI%20Fest%202025%20Kota%20Bukittinggi,%20Wawako%20Ibnu%20Asis%20:%20RRI%20Media%20Pemersatu%20Bangsa",
    },
    {
      id: 9,
      title:
        "Pemko dan DPRD Setujui Perda SPBE dan RPPLH, R-APBD Perubahan 2025 Dihantarkan",
      cat: "Pemerintahan",
      desc: "Pemko bersama DPRD menyetujui Perda SPBE dan RPPLH serta menghantarkan R-APBD Perubahan tahun 2025.",
      img: "/berita6.jpg",
      link: "https://www.bukittinggikota.go.id/news_detail/2397/Pemko%20dan%20DPRD%20Setujui%20Perda%20SPBE%20dan%20RPPLH,%20R-APBD%20Perubahan%202025%20Dihantarkan.",
    },
  ];

  // Filter
  const filtered = filter ? berita.filter((n) => n.cat === filter) : berita;

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Filter */}
        <div className="mb-8 flex items-center gap-3">
          <label className="text-sm font-medium text-[#003366]">
            Filter Kategori:
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#003366]"
          >
            <option value="">Semua</option>
            <option>Pendidikan</option>
            <option>Pelatihan</option>
            <option>Keagamaan</option>
            <option>Olahraga</option>
            <option>Event</option>
            <option>Pemerintahan</option>
          </select>
        </div>

        {/* Jika filter kosong tampilkan section Berita Terbaru */}
        {!filter && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003366] mb-12 text-center relative">
              Berita
              <span className="block w-16 h-1 bg-[#003366] mx-auto mt-3 rounded"></span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {berita.map((b) => (
                <a
                  href={b.link}
                  key={b.id}
                  className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl bg-white transition transform hover:-translate-y-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={b.img}
                    alt={b.title}
                    className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-[#003366] mb-2 line-clamp-2 group-hover:text-[#001a33] transition">
                      {b.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {b.desc}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">{b.cat}</p>
                    <span className="text-sm font-medium text-[#003366] group-hover:underline">
                      Baca selengkapnya →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
