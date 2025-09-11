import React from "react";
import { IconInstagram, IconFacebook, IconTwitterX } from "../components/icons/Icons";

export default function Kontak(){
  return (
    <div style={{backgroundColor:"#003366"}} className="text-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Kontak Kami</h2>
          <p className="mt-2 text-white/80">Alamat, nomor telepon, email, peta lokasi, dan formulir kontak.</p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div>
            <div>Alamat: Jl. Contoh No. 1, Bukittinggi</div>
            <div>Telepon: (0752) 123456</div>
            <div>Email: diskominfo@bukittinggikota.go.id</div>
            <div className="mt-3 flex gap-2">
              <a className="rounded-full bg-white p-2 hover:bg-[#FFB800]" href="#"><IconInstagram className="h-4 w-4 text-[#002244]"/></a>
              <a className="rounded-full bg-white p-2 hover:bg-[#FFB800]" href="#"><IconFacebook className="h-4 w-4 text-[#002244]"/></a>
              <a className="rounded-full bg-white p-2 hover:bg-[#FFB800]" href="#"><IconTwitterX className="h-4 w-4 text-[#002244]"/></a>
            </div>

            <form className="mt-4 space-y-3">
              <input placeholder="Nama" className="w-full rounded border px-3 py-2 text-black"/>
              <input placeholder="Email" className="w-full rounded border px-3 py-2 text-black"/>
              <textarea placeholder="Pesan" rows={4} className="w-full rounded border px-3 py-2 text-black"/>
              <button type="button" className="w-full rounded-xl bg-[#FFB800] px-4 py-3 text-white font-semibold">Kirim</button>
            </form>
          </div>

          <div className="rounded-2xl overflow-hidden shadow">
            <iframe title="Google Maps" className="w-full h-[380px]" src="https://www.google.com/maps/embed?pb=!1m18..." />
          </div>
        </div>
      </div>
    </div>
  );
}
