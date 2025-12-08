// src/components/Footer/Footer.jsx
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    // 🧩 DIUBAH: pastikan tidak ada margin-top, hapus mt-auto jika ada, pakai "mt-0"
    <footer className="bg-gradient-to-b from-[#003366] to-[#002244] text-white border-t-4 border-[#0055aa] shadow-lg">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Logo + Info */}
          <div className="flex items-start gap-3 md:justify-start">
            <img src="/logo-kominfo.png" alt="Logo Kominfo" className="h-12 w-auto" />
            <div className="flex flex-col space-y-2">
              <p className="font-bold text-sm uppercase text-white">DISKOMINFO</p>
              <p className="text-xs text-blue-100 leading-relaxed">
                Dinas Komunikasi dan Informatika
              </p>
              <p className="text-xs text-blue-200">Kota Bukittinggi</p>
            </div>
          </div>

          {/* Alamat */}
          <div className="md:text-center">
            <h3 className="font-bold text-sm mb-3 text-blue-200">Alamat Kantor</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Jl. Kusuma Bhakti, Kubu Gulai Bancah<br />
              Kec. Mandiangin Koto Selayan<br />
              Kota Bukittinggi, Sumatera Barat 26113
            </p>
          </div>

          {/* Kontak */}
          <div className="md:text-right md:ml-auto">
            <h3 className="font-bold text-sm mb-3 text-blue-200">Kontak Kami</h3>
            <div className="space-y-2 text-xs md:items-end md:flex md:flex-col">
              <div className="flex items-center gap-2 text-blue-100 md:justify-end">
                <Phone size={14} />
                <span>0853-5566-4484</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100 md:justify-end">
                <Mail size={14} />
                <span className="break-all">diskominfo@bukittinggikota.go.id</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-800 pt-4 text-center">
          <p className="text-xs text-blue-200">
            © {new Date().getFullYear()} Dinas Komunikasi dan Informatika Kota Bukittinggi. 
            <span className="block mt-1">Hak Cipta Dilindungi</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
