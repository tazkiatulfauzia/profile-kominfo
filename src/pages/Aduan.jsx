import React, { useState } from "react";
import {
  Send,
  Phone,
  Mail,
  User,
  Smartphone,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

export default function Aduan() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#003366] text-white py-8 px-6 text-center">
          <h2 className="text-3xl font-bold">Layanan Aduan</h2>
          <p className="mt-2 text-white/80">
            Sampaikan aduan Anda dengan mudah, cepat, dan responsif.
          </p>
        </div>

        <div className="p-10 bg-[#d9e6ff]">
          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366]">
                <User size={18} className="text-[#003366]/70" />
                <input
                  required
                  placeholder="Nama Lengkap"
                  className="w-full text-sm outline-none"
                />
              </div>
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366]">
                <Mail size={18} className="text-[#003366]/70" />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full text-sm outline-none"
                />
              </div>
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366]">
                <Smartphone size={18} className="text-[#003366]/70" />
                <input
                  required
                  placeholder="Nomor HP"
                  className="w-full text-sm outline-none"
                />
              </div>
              <div className="flex items-start gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366]">
                <MessageSquare size={18} className="text-[#003366]/70 mt-1" />
                <textarea
                  required
                  placeholder="Isi Aduan"
                  rows={5}
                  className="w-full text-sm outline-none resize-none"
                ></textarea>
              </div>
              <button className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#003366] px-4 py-3 text-white font-semibold shadow hover:bg-[#00224d] transition">
                <Send size={18} /> Kirim Aduan
              </button>
            </form>
          ) : (
            <div className="rounded-2xl bg-green-50 p-8 text-center text-green-800 shadow-inner">
              <CheckCircle className="w-10 h-10 mx-auto mb-3 text-green-600" />
              <p className="font-semibold text-lg">
                Aduan Anda telah dikirim ✅
              </p>
              <p className="text-sm mt-1">
                Terima kasih atas partisipasi Anda, kami akan segera menindaklanjuti.
              </p>
            </div>
          )}

          {/* Info Kontak Alternatif */}
          <div className="mt-10 text-center">
            <h3 className="font-semibold text-[#003366] mb-3 text-lg">
              Kontak Alternatif
            </h3>
            <div className="flex flex-col items-center space-y-2 text-sm text-[#003366]/80">
              <div className="flex items-center gap-2">
                <Phone size={16} /> Telepon: (0752) 123456
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} /> Email: diskominfo@bukittinggikota.go.id
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
