import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#003366] text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Kiri: Logo + Alamat */}
        <div className="flex items-center gap-4 pl-2">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <div className="text-left">
            <p className="text-sm font-medium">
              Dinas Komunikasi dan Informatika Kota Bukittinggi
            </p>
            <p className="text-xs text-gray-300">
              Jl. Kusuma Bhakti, Kubu Gulai Bancah, Kec. Mandiangin Koto Selayan, Kota Bukittinggi, Sumatera Barat 26113
            </p>
          </div>
        </div>

        {/* Kanan: Kontak */}
        <div className="flex gap-6 text-sm items-center mt-3 md:mt-0">
          <div className="flex items-center gap-2">
            <Phone size={16} /> <span>0853-5566-4484</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} /> <span>diskominfo@bukittinggikota.go.id</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#002244] text-center py-2 text-xs text-gray-300">
        © {new Date().getFullYear()} Diskominfo Kota Bukittinggi. All rights reserved.
      </div>
    </footer>
  );
}
