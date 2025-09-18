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
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          {/* Artikel Singkat */}
          <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3">
            Artikel Singkat
          </h2>
          <article className="mt-4 bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="font-semibold text-[#003366] text-lg">
              Tips Aman Menggunakan Media Sosial
            </h3>
            <ul className="list-disc pl-5 mt-3 text-[#003366]/80 space-y-1">
              <li>Aktifkan 2FA</li>
              <li>Gunakan password kuat</li>
            </ul>
          </article>

          {/* Daftar Artikel */}
          <h2 className="mt-10 text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3">
            Artikel Bukittinggi
          </h2>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            {artikelList.map((a, i) => (
              <a
                key={i}
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition transform p-6 bg-gradient-to-br from-blue-50 to-blue-100"
              >
                <div className="flex items-start gap-3">
                  {a.icon}
                  <div>
                    <h3 className="font-semibold text-[#003366] text-lg leading-snug">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#003366]/70">
                      Klik untuk membaca artikel
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Kutipan Literasi */}
          <h2 className="mt-10 text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3">
            Kutipan Literasi
          </h2>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow">
              <p className="italic text-[#003366]/90 text-lg">
                “Membaca adalah jendela dunia.”
              </p>
              <p className="mt-3 text-sm text-[#003366]/70">— Pepatah Lama</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow">
              <p className="italic text-[#003366]/90 text-lg">
                “Literasi adalah kunci menuju peradaban.”
              </p>
              <p className="mt-3 text-sm text-[#003366]/70">— Anonim</p>
            </div>
          </div>
        </section>

        {/* Video */}
        <aside>
          <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3">
            Video
          </h2>
          <div className="mt-4 aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/HEV1pWyYS1w?si=XefbpPr2no16W8US"
              title="Video"
              allowFullScreen
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
