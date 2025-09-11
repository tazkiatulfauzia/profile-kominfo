import React from "react";
import { IconPhone, IconMail } from "../icons/Icons";

export default function Topbar(){
  return (
    <div className="w-full bg-[#003366]">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-white text-xs">
        <div className="flex items-center gap-3">
          <img src="/logo-kominfo.png" alt="Kominfo" className="h-6 w-6 object-contain"/>
          <img src="/logo-bukittinggi.png" alt="Kota Bukittinggi" className="h-6 w-6 object-contain"/>
          <span className="hidden sm:inline">Dinas Komunikasi dan Informatika Kota Bukittinggi</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><IconPhone className="w-4 h-4"/> (0752) 123456</span>
          <span className="hidden sm:flex items-center gap-1"><IconMail className="w-4 h-4"/> diskominfo@bukittinggikota.go.id</span>
          <button className="rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/20">PPID</button>
        </div>
      </div>
    </div>
  );
}
