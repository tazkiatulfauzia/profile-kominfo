import React from "react";
import { IconInstagram, IconFacebook, IconTwitterX } from "../components/icons/Icons";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Kontak() {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-white text-[#002244]">
      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-[#003366] relative inline-block">
            Kontak Kami
            <span className="block w-20 h-1 bg-[#FFB800] mx-auto mt-2 rounded"></span>
          </h2>
          <p className="mt-3 text-[#002244]/80 text-lg max-w-2xl mx-auto">
            Kami siap membantu Anda. Silakan hubungi melalui formulir, telepon, email, atau kunjungi kantor kami.
          </p>
        </div>

        {/* Konten */}
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          {/* Form & Info */}
          <div className="bg-gradient-to-tr from-white to-blue-100/40 rounded-2xl shadow-xl p-8 border border-blue-100">
            {/* Form */}
            <form className="space-y-4">
              <input
                placeholder="Nama"
                className="w-full rounded-lg border px-4 py-3 text-black shadow-sm focus:ring-2 focus:ring-[#003366] focus:outline-none"
              />
              <input
                placeholder="Email"
                className="w-full rounded-lg border px-4 py-3 text-black shadow-sm focus:ring-2 focus:ring-[#003366] focus:outline-none"
              />
              <textarea
                placeholder="Pesan"
                rows={4}
                className="w-full rounded-lg border px-4 py-3 text-black shadow-sm focus:ring-2 focus:ring-[#003366] focus:outline-none"
              />
              <button
                type="button"
                className="w-full rounded-lg bg-gradient-to-r from-[#003366] to-[#0055aa] px-4 py-3 text-white font-semibold shadow-md hover:opacity-90 transition"
              >
                Kirim Pesan
              </button>
            </form>

            {/* Info Kontak */}
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#003366]" />
                <span>Jl. Kusuma Bhakti, Kubu Gulai Bancah, Kec. Mandiangin Koto Selayan, Kota Bukittinggi, Sumatera Barat 26113</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#003366]" />
                <span>0853-5566-4484</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#003366]" />
                <span>diskominfo@bukittinggikota.go.id</span>
              </div>
            </div>

            {/* Ikon Sosial Media */}
            <div className="mt-6 flex gap-4">
              <a
                className="rounded-full bg-[#003366]/10 p-3 hover:bg-[#FFB800] transition"
                href="#"
              >
                <IconInstagram className="h-6 w-6 text-[#003366]" />
              </a>
              <a
                className="rounded-full bg-[#003366]/10 p-3 hover:bg-[#FFB800] transition"
                href="#"
              >
                <IconFacebook className="h-6 w-6 text-[#003366]" />
              </a>
              <a
                className="rounded-full bg-[#003366]/10 p-3 hover:bg-[#FFB800] transition"
                href="#"
              >
                <IconTwitterX className="h-6 w-6 text-[#003366]" />
              </a>
            </div>
          </div>

          {/* Maps */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              title="Google Maps"
              className="w-full h-[450px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.768766518201!2d100.3679122!3d-0.2855617999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd5475cca7b0893%3A0xf9cd23e3ce13fb27!2sDinas%20Kominfo%20Bukittinggi!5e0!3m2!1sen!2sid!4v1757900213128!5m2!1sen!2sid"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
