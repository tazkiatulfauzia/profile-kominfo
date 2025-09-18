import React, { useState } from "react";
import { AppWindow, Archive } from "lucide-react";

export default function Aplikasi() {
  const [tab, setTab] = useState("aktif");

  const apps = [
    { name: "e-Lapor", desc: "Layanan aduan masyarakat" },
    { name: "SimPel", desc: "Sistem Perizinan Online" },
    { name: "SiKomin", desc: "Informasi Komunikasi Kota" },
  ];

  const appsBuatan = [
    { name: "Arsip Digital", desc: "Aplikasi pengarsipan dokumen resmi" },
    { name: "Monitoring Infrastruktur", desc: "Pemantauan jaringan & server" },
    { name: "EduKom", desc: "Aplikasi literasi digital masyarakat" },
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#003366]">Aplikasi Resmi</h2>
          <p className="mt-2 text-[#003366]/80">
            Akses aplikasi resmi Dinas Kominfo untuk pelayanan publik dan inovasi digital.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setTab("aktif")}
            className={`px-6 py-2 font-medium transition ${
              tab === "aktif"
                ? "text-[#003366] border-b-2 border-[#003366]"
                : "text-gray-500 hover:text-[#003366]"
            }`}
          >
            Aplikasi Aktif
          </button>
          <button
            onClick={() => setTab("buatan")}
            className={`px-6 py-2 font-medium transition ${
              tab === "buatan"
                ? "text-[#003366] border-b-2 border-[#003366]"
                : "text-gray-500 hover:text-[#003366]"
            }`}
          >
            Aplikasi Buatan
          </button>
        </div>

        {/* Content */}
        {tab === "aktif" ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {apps.map((a) => (
              <div
                key={a.name}
                className="group rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#d9e6ff] text-[#003366] mb-4">
                  <AppWindow size={24} />
                </div>
                <div className="font-semibold text-[#003366] text-lg mb-1">
                  {a.name}
                </div>
                <div className="text-sm text-gray-600">{a.desc}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {/* Judul Arsip */}
            <div className="flex items-center gap-2 text-[#003366] font-semibold mb-6">
              <Archive size={20} /> Arsip Aplikasi Buatan
            </div>

            {/* Card Buatan */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {appsBuatan.map((a) => (
                <div
                  key={a.name}
                  className="group rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#d9e6ff] text-[#003366] mb-4">
                    <AppWindow size={24} />
                  </div>
                  <div className="font-semibold text-[#003366] text-lg mb-1">
                    {a.name}
                  </div>
                  <div className="text-sm text-gray-600">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
