import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#003366] to-[#002244] text-white mt-auto border-t-4 border-[#0055aa]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Logo + Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-2">
              <img src="/logo.png" alt="Logo" className="h-12" />
              <div>
                <p className="font-bold text-sm">Diskominfo</p>
                <p className="text-xs text-blue-200">Kota Bukittinggi</p>
              </div>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed">
              Dinas Komunikasi dan Informatika Kota Bukittinggi
            </p>
          </div>

          {/* Alamat */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-blue-200">Alamat Kantor</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Jl. Kusuma Bhakti, Kubu Gulai Bancah<br />
              Kec. Mandiangin Koto Selayan<br />
              Kota Bukittinggi, Sumatera Barat 26113
            </p>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-blue-200">Kontak Kami</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-blue-100">
                <Phone size={14} />
                <span>0853-5566-4484</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
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
