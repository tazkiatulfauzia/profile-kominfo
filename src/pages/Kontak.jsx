import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Trash2, MessageSquare } from "lucide-react";
import { tambahKontak, getKontak, deleteKontak } from "../lib/kontak";
import { useAuth } from "../context/AuthContext";

export default function Kontak() {
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const [loading, setLoading] = useState(false);
  const [loadingKontak, setLoadingKontak] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [kontakList, setKontakList] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    pesan: "",
  });
  const CACHE_KEY_KONTAK = "adminKontakCache";
  const CACHE_TTL = 2 * 60 * 1000;

  // Load kontak untuk admin
  useEffect(() => {
    if (isAdmin) {
      let usedCache = false;
      try {
        const cached = sessionStorage.getItem(CACHE_KEY_KONTAK);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL) {
            setKontakList(parsed.kontakList || []);
            setLoadingKontak(false);
            usedCache = true;
          }
        }
      } catch (e) {
        console.warn("Cache kontak error:", e);
      }
      loadKontak({ silent: usedCache });
    }
  }, [isAdmin]);

  async function loadKontak({ silent = false } = {}) {
    try {
      if (!silent) setLoadingKontak(true);
      const data = await getKontak();
      setKontakList(data || []);
      try {
        sessionStorage.setItem(
          CACHE_KEY_KONTAK,
          JSON.stringify({ timestamp: Date.now(), kontakList: data || [] })
        );
      } catch (e) {
        console.warn("Cache kontak write error:", e);
      }
    } catch (error) {
      console.error("Gagal memuat kontak:", error);
    } finally {
      if (!silent) setLoadingKontak(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Yakin ingin menghapus pesan kontak ini?")) return;
    try {
      await deleteKontak(id);
      await loadKontak();
      setMessage({ type: "success", text: "Pesan kontak berhasil dihapus!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Gagal menghapus pesan kontak" });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await tambahKontak(form.nama, form.email, form.pesan);
      setMessage({ type: "success", text: "Pesan berhasil dikirim! Terima kasih atas kontribusi Anda." });
      setForm({ nama: "", email: "", pesan: "" });
      if (isAdmin) {
        await loadKontak();
      }
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      setMessage({
        type: "error",
        text: error.message || "Gagal mengirim pesan. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Only for non-admin */}
      {!isAdmin && (
      <div className="relative w-full py-16 md:py-20 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#004488] to-[#0055aa]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#003366]/90 via-transparent to-[#0055aa]/90"></div>
        {/* Animated Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                Hubungi Kami
              </h1>
              <p className="text-lg md:text-xl mb-4 text-blue-100 drop-shadow-md">
                Dinas Komunikasi & Informatika
              </p>
              <p className="text-base md:text-lg text-blue-50 mb-6 max-w-2xl drop-shadow-sm">
                Kami siap membantu Anda. Silakan hubungi melalui formulir, telepon, email, atau kunjungi kantor kami.
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center relative">
              <div className="relative w-full max-w-md">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                
                <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 border border-white/30 backdrop-blur-sm bg-white/5">
                  <img 
                    src="https://admin.bukittinggikota.go.id/storage/berita/T18ZDGrJTrvSmRn6sIxb4j5jQMNUsB-metaMTAwMDQwNjc0OS5qcGc=-.jpg"
                    alt="Hubungi Kami"
                    className="w-full h-56 md:h-64 object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=Hubungi+Kami";
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-12">
        {isAdmin && (
          <h1 className="text-3xl font-bold text-[#003366] text-center mb-10">
            Kontak Masuk
          </h1>
        )}

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          <div className="mx-4 w-2 h-2 rounded-full bg-[#003366]"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
        </div>

        {/* Konten - Jika Admin, tampilkan tabel. Jika User, tampilkan form */}
        {isAdmin ? (
          <div className="mt-12">
            {/* Tabel Kontak untuk Admin */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-200 relative overflow-hidden">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-bl-full -mr-20 -mt-20"></div>
              {message.text && (
                <div className={`mb-4 p-3 rounded-lg ${
                  message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}>
                  {message.text}
                </div>
              )}
              <h3 className="text-2xl font-bold text-[#003366] mb-6">Daftar Pesan Kontak</h3>
              {loadingKontak ? (
                <p className="text-center py-8 text-gray-600">Memuat pesan masuk...</p>
              ) : kontakList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#003366] to-[#0055aa] text-white">
                        <th className="px-4 py-3 text-left rounded-tl-lg">No</th>
                        <th className="px-4 py-3 text-left">Nama</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Pesan</th>
                        <th className="px-4 py-3 text-left">Tanggal</th>
                        <th className="px-4 py-3 text-left rounded-tr-lg">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kontakList.map((item, index) => (
                        <tr key={item.id} className="border-b border-blue-100 hover:bg-blue-50 transition">
                          <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                          <td className="px-4 py-3 font-medium text-[#003366]">{item.nama}</td>
                          <td className="px-4 py-3 text-gray-700">{item.email}</td>
                          <td className="px-4 py-3 text-gray-700 max-w-md whitespace-normal break-words">{item.pesan}</td>
                          <td className="px-4 py-3 text-gray-600 text-sm">
                            {item.created_at
                              ? new Date(item.created_at).toLocaleDateString("id-ID", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "-"}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded transition"
                              title="Hapus"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center py-8 text-gray-600">Belum ada pesan kontak.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-12 grid md:grid-cols-2 gap-10">
            {/* Form & Info untuk User */}
            <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-blue-200 overflow-hidden">
              {/* Decorative Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -mr-32 -mt-32 opacity-50"></div>
              <div className="relative z-10">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pesan sukses/error */}
              {message.text && (
                <div
                  className={`rounded-xl p-4 flex items-start gap-3 ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle size={20} className="text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle size={20} className="text-red-600 mt-0.5" />
                  )}
                  <span className="text-sm font-medium">{message.text}</span>
                </div>
              )}

              <input
                required
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                placeholder="Nama Lengkap"
                className="w-full rounded-lg border-2 border-blue-200 px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-[#003366] focus:border-[#003366] focus:outline-none transition disabled:opacity-50"
                disabled={loading}
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="w-full rounded-lg border-2 border-blue-200 px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-[#003366] focus:border-[#003366] focus:outline-none transition disabled:opacity-50"
                disabled={loading}
              />
              <textarea
                required
                value={form.pesan}
                onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                placeholder="Pesan"
                rows={4}
                className="w-full rounded-lg border-2 border-blue-200 px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-[#003366] focus:border-[#003366] focus:outline-none resize-none transition disabled:opacity-50"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gradient-to-r from-[#003366] to-[#0055aa] px-4 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:from-[#00224d] hover:to-[#004488] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {loading ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>

              {/* Info Kontak */}
              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 space-y-4 text-sm">
                <h3 className="font-semibold text-[#003366] mb-4 text-base flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#003366] rounded-full"></div>
                  Informasi Kontak
                </h3>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#003366] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Jl. Kusuma Bhakti, Kubu Gulai Bancah, Kec. Mandiangin Koto Selayan, Kota Bukittinggi, Sumatera Barat 26113</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#003366] flex-shrink-0" />
                  <span className="text-gray-700">(0752)33369</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#003366] flex-shrink-0" />
                  <span className="text-gray-700">diskominfo@bukittinggikota.go.id</span>
                </div>
              </div>
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
        )}
      </div>
    </div>
  );
}
