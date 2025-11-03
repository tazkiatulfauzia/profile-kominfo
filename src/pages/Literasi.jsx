import React from "react";
import { BookOpen, FileText, Landmark } from "lucide-react";

export default function Literasi() {
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
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen">
      <div className="grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          {/* Artikel Singkat */}
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

          {/* Daftar Artikel */}
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

          {/* Kutipan Literasi */}
          <h2 className="mt-10 text-3xl font-bold bg-gradient-to-r from-[#003366] to-[#0055aa] bg-clip-text text-transparent border-l-4 border-[#003366] pl-4 mb-4">
            Kutipan Literasi
          </h2>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100">
              <p className="italic text-[#003366] text-lg font-medium leading-relaxed">
                "Membaca adalah jendela dunia."
              </p>
              <p className="mt-4 text-sm text-[#003366]/80 font-semibold">— Pepatah Lama</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100">
              <p className="italic text-[#003366] text-lg font-medium leading-relaxed">
                "Literasi adalah kunci menuju peradaban."
              </p>
              <p className="mt-4 text-sm text-[#003366]/80 font-semibold">— Anonim</p>
            </div>
          </div>
        </section>

        {/* Video */}
        <aside className="space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#003366] to-[#0055aa] bg-clip-text text-transparent border-l-4 border-[#003366] pl-4 mb-4">
            Video Bukittinggi
          </h2>
          
          {/* Video YouTube Bukittinggi */}
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/a-kmKhnoBpc?si=iUf8L8jGhXkJrMUN"
              title="Video Kota Bukittinggi"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video tambahan jika ada */}
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
    </div>
  );
}
