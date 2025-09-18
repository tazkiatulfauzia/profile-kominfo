import React from "react";
import { Network, Database, ShoppingCart, Camera } from "lucide-react";

export default function Infrastruktur() {
  const cards = [
    { 
      title: "Sistem Penghubung Layanan Aplikasi (SILA)", 
      desc: "Platform yang mengintegrasikan berbagai layanan aplikasi pemerintah kota, memudahkan akses dan penggunaan layanan oleh masyarakat.",
      link: "https://share.google/udYLuMJa53WUWiKYP",
      icon: <Network className="w-6 h-6 text-white" />
    },
    { 
      title: "Sistem Informasi Harga Pangan (SIHP)", 
      desc: "Menyediakan informasi terkini mengenai harga kebutuhan pangan di pasar, membantu warga merencanakan belanja dan memantau harga.",
      link: "https://share.google/v7XYQD7xvLEvN0RDu",
      icon: <ShoppingCart className="w-6 h-6 text-white" />
    },
    { 
      title: "Program Pedang Tigo (Pede Mangan Tigo)", 
      desc: (
        <ul className="list-disc list-inside text-sm text-white/90 space-y-1 mt-1">
          <li><strong>GO Standard</strong>: Peningkatan kualitas produk sesuai standar nasional dan internasional.</li>
          <li><strong>GO Digital</strong>: Fasilitasi penggunaan platform e-commerce untuk penjualan.</li>
          <li><strong>GO Export</strong>: Membuka akses pasar internasional bagi UMKM.</li>
        </ul>
      ),
      link: "https://share.google/So6Wr6L0DHy5IbBax",
      icon: <Database className="w-6 h-6 text-white" />
    },
    { 
      title: "CCTV Kota", 
      desc: "CCTV Aktif lalu lintas Kota Bukittinggi", 
      link: "https://cctv.bukittinggikota.go.id/",
      icon: <Camera className="w-6 h-6 text-white" />
    },
  ];

  return (
    <div
      className="relative mx-auto max-w-7xl px-4 py-16 rounded-2xl overflow-hidden text-white"
      style={{
        backgroundImage: "url('/infrastruktur.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Tanpa overlay abu-abu */}
      <section className="relative z-10">
        <h2 className="text-3xl font-bold mb-8 text-center drop-shadow-lg">
          Infrastruktur Digital Kota Bukittinggi
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(c => (
            <div
              key={c.title}
              className={`rounded-xl bg-black/40 p-6 shadow-lg transition transform ${
                c.link ? "hover:shadow-xl hover:scale-105 cursor-pointer" : ""
              }`}
            >
              {c.link ? (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {c.icon}
                    <div className="text-lg font-semibold">{c.title}</div>
                  </div>
                  <div className="mt-1 text-sm text-white/90">{c.desc}</div>
                </a>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    {c.icon}
                    <div className="text-lg font-semibold">{c.title}</div>
                  </div>
                  <div className="text-sm text-white/90">{c.desc}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
