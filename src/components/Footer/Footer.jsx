import React from "react";
import { IconInstagram, IconFacebook, IconTwitterX } from "../icons/Icons";
import { Link } from "react-router-dom";

export default function Footer(){
  return (
    <footer className="mt-16">
      <div className="bg-[#002244] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center">K</div>
              <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center">B</div>
            </div>
            <div className="mt-3 font-semibold">Dinas Komunikasi dan Informatika Kota Bukittinggi</div>
            <p className="text-xs text-white/80 mt-2">Bersinergi mewujudkan Smart City melalui inovasi digital.</p>
          </div>

          <div>
            <div className="font-semibold mb-2">Menu</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link to="/" className="hover:underline">Profil</Link>
              <Link to="/infrastruktur" className="hover:underline">Infrastruktur</Link>
              <Link to="/aplikasi" className="hover:underline">Aplikasi</Link>
              <Link to="/berita" className="hover:underline">Berita</Link>
              <Link to="/aduan" className="hover:underline">Aduan</Link>
              <Link to="/kontak" className="hover:underline">Kontak</Link>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2">Kontak</div>
            <div className="text-sm text-white/90">
              Jl. Contoh No. 1, Bukittinggi<br/>
              Telp: (0752) 123456<br/>
              Email: diskominfo@bukittinggikota.go.id
            </div>
            <div className="mt-4 flex items-center gap-2">
              <a className="rounded-full bg-white p-2 hover:bg-[#FFB800]" href="#"><IconInstagram className="h-4 w-4 text-[#002244]"/></a>
              <a className="rounded-full bg-white p-2 hover:bg-[#FFB800]" href="#"><IconFacebook className="h-4 w-4 text-[#002244]"/></a>
              <a className="rounded-full bg-white p-2 hover:bg-[#FFB800]" href="#"><IconTwitterX className="h-4 w-4 text-[#002244]"/></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between text-sm">
            <div>Mari bersama wujudkan Bukittinggi Smart City dengan inovasi digital.</div>
            <a href="/aduan" className="rounded-full bg-[#FFB800] px-4 py-2 text-sm font-semibold text-white">Sampaikan Aduan</a>
          </div>
        </div>

        <div className="bg-[#001122]">
          <div className="mx-auto max-w-7xl px-4 py-3 text-center text-xs text-white/80">© 2025 Dinas Komunikasi dan Informatika Kota Bukittinggi. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
