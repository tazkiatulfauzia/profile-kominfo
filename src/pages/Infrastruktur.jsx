import React from "react";

export default function Infrastruktur(){
  const cards = [
    { title: "Cakupan WiFi Publik", desc: "50 titik di 13 kelurahan" },
    { title: "Data Center", desc: "Backup harian" },
    { title: "Jaringan Fiber", desc: "70% OPD terhubung" },
    { title: "CCTV Kota", desc: "120 unit aktif" },
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <section className="rounded-2xl bg-gray-50 p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(c => (
            <div key={c.title} className="rounded-xl bg-white p-5 shadow">
              <div className="text-base font-semibold text-[#003366]">{c.title}</div>
              <p className="text-sm text-[#003366]/70 mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
