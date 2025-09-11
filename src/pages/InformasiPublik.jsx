import React, { useState } from "react";

export default function InformasiPublik(){
  const [q,setQ] = useState("");
  const rows = [
    {name:"Perda Keterbukaan Informasi", year:2023, type:"PDF"},
    {name:"Laporan PPID", year:2024, type:"PDF"},
  ];
  const filtered = rows.filter(r => r.name.toLowerCase().includes(q.toLowerCase()) || String(r.year).includes(q));
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="text-2xl font-bold text-[#003366]">Dokumen Resmi & Informasi Publik</h2>
      <p className="text-[#003366]/80 mt-2">Profil singkat PPID.</p>
      <div className="mt-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari dokumen (nama/tahun)..." className="w-full rounded-lg border px-4 py-2"/>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-[#003366]">
            <tr><th className="px-4 py-3 text-left">Nama Dokumen</th><th className="px-4 py-3 text-left">Tahun</th><th className="px-4 py-3">Tipe</th><th className="px-4 py-3">Aksi</th></tr>
          </thead>
          <tbody>
            {filtered.map(r=>(
              <tr key={r.name} className="border-t">
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.year}</td>
                <td className="px-4 py-3">{r.type}</td>
                <td className="px-4 py-3"><button className="rounded bg-gray-100 px-3 py-1">Download</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
