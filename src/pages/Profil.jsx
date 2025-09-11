import React, { useState } from "react";
import { IconChat } from "../components/icons/Icons";

export default function Profil(){
  const [open, setOpen] = useState(null);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-[#003366]">Visi</h2>
          <p className="text-[#003366]/80 mt-2">Terwujudnya layanan informasi publik yang transparan, inklusif, dan inovatif.</p>
          <h3 className="mt-6 font-semibold">Misi</h3>
          <ul className="list-disc pl-5 mt-2 text-[#003366]/80">
            <li>Mengembangkan infrastruktur TIK.</li>
            <li>Meningkatkan literasi digital.</li>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <div className="h-56 w-56 rounded-2xl bg-blue-50 p-6 text-center text-blue-700">Ilustrasi</div>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-semibold text-[#003366]">Tugas & Fungsi</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {["Perumusan Kebijakan","Layanan Informasi","Infrastruktur TIK","Keamanan Informasi","Smart City","Kemitraan Publik"].map(item => (
            <div key={item} className="rounded-xl bg-white p-4 shadow text-center">
              <IconChat className="h-6 w-6 text-[#003366] mx-auto"/>
              <div className="mt-2 text-sm font-medium text-[#003366]">{item}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
