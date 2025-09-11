import React, { useState } from "react";
export default function Aplikasi(){
  const [tab, setTab] = useState("aktif");
  const apps = [{name:"e-Lapor", desc:"Layanan aduan"}, {name:"SimPel", desc:"Perizinan online"}];
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab("aktif")} className={`px-4 py-2 rounded ${tab==="aktif" ? "bg-[#003366] text-white":"bg-gray-100 text-[#003366]"}`}>Aplikasi Aktif</button>
        <button onClick={() => setTab("buatan")} className={`px-4 py-2 rounded ${tab==="buatan" ? "bg-[#003366] text-white":"bg-gray-100 text-[#003366]"}`}>Aplikasi Buatan</button>
      </div>
      {tab==="aktif" ? (
        <div className="grid md:grid-cols-3 gap-4">
          {apps.map(a => (
            <div key={a.name} className="rounded-xl bg-white p-5 shadow">
              <div className="h-10 w-10 rounded bg-blue-50 mb-3"></div>
              <div className="font-semibold text-[#003366]">{a.name}</div>
              <div className="text-sm text-[#003366]/70">{a.desc}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="text-sm font-semibold text-[#003366]">2021</div>
          <ul className="list-disc pl-5 text-[#003366]/80"><li>Aplikasi Arsip Digital</li></ul>
        </div>
      )}
    </div>
  );
}
