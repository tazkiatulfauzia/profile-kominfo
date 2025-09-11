import React from "react";
import { Link } from "react-router-dom";
import { IconInstagram, IconFacebook, IconTwitterX } from "../icons/Icons";

const menus = [
  { to: "/", label: "Beranda" },
  { to: "/profil", label: "Profil" },
  { to: "/infrastruktur", label: "Infrastruktur" },
  { to: "/aplikasi", label: "Aplikasi" },
  { to: "/berita", label: "Berita" },
  { to: "/informasi-publik", label: "Informasi Publik" },
  { to: "/aduan", label: "Aduan" },
  { to: "/literasi", label: "Literasi" },
  { to: "/kontak", label: "Kontak" },
];

export default function MobileSidebar({ open, onClose }) {
  return (
    <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose}/>
      <aside className={`absolute left-0 top-0 bottom-0 w-72 p-4 text-white transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`} style={{backgroundColor: "#003366"}}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center">K</div>
            <div className="font-semibold">KOMINFO BKT</div>
          </div>
          <button onClick={onClose} className="rounded bg-white/10 px-2 py-1 text-xs">Tutup</button>
        </div>
        <nav className="flex flex-col gap-2">
          {menus.map(m => (
            <Link key={m.to} to={m.to} onClick={onClose} className="px-3 py-2 rounded hover:bg-white/10">{m.label}</Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/aduan" onClick={onClose} className="block w-full rounded-xl bg-[#FFB800] px-4 py-3 text-center font-semibold text-white">Sampaikan Aduan</Link>
          <div className="mt-3 flex gap-3">
            <a href="#"><IconInstagram className="h-5 w-5"/></a>
            <a href="#"><IconFacebook className="h-5 w-5"/></a>
            <a href="#"><IconTwitterX className="h-5 w-5"/></a>
          </div>
        </div>
      </aside>
    </div>
  );
}
