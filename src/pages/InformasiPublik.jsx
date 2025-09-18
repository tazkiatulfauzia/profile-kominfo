import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // sesuaikan path kalau beda

export default function InformasiPublik() {
  const [q, setQ] = useState("");
  const { user } = useAuth(); // ambil user dari AuthContext

  const rows = [
    {
      name: "Perda Keterbukaan Informasi",
      year: 2023,
      type: "PDF",
      file: "/dokumen/perda-keterbukaan.pdf",
    },
    {
      name: "Laporan PPID",
      year: 2024,
      type: "PDF",
      file: "/dokumen/laporan-ppid.pdf",
    },
  ];

  const filtered = rows.filter(
    (r) =>
      r.name.toLowerCase().includes(q.toLowerCase()) ||
      String(r.year).includes(q)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-3xl font-bold text-[#003366] mb-2">
        Dokumen Resmi & Informasi Publik
      </h2>
      <p className="text-[#003366]/80 mb-6">
        Akses dokumen resmi PPID sesuai dengan prinsip keterbukaan informasi publik.
      </p>

      {/* Input Pencarian */}
      <div className="mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari dokumen (nama/tahun)..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-[#003366] focus:ring focus:ring-[#003366]/20"
        />
      </div>

      {/* Table Dokumen */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-[#003366] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Nama Dokumen</th>
              <th className="px-4 py-3 text-left">Tahun</th>
              <th className="px-4 py-3 text-left">Tipe</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.name} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.year}</td>
                <td className="px-4 py-3">{r.type}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  {/* Tombol Download */}
                  <a
                    href={r.file}
                    download
                    className="rounded bg-[#003366] px-3 py-1 text-white hover:bg-[#002244] transition"
                  >
                    Download
                  </a>

                  {/* Kalau login, tampilkan Edit & Hapus */}
                  {user && (
                    <>
                      <button className="rounded bg-yellow-400 px-3 py-1 text-white hover:bg-yellow-500 transition">
                        Edit
                      </button>
                      <button className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 transition">
                        Hapus
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500 italic"
                >
                  Tidak ada dokumen ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
