import React, { useState, useEffect } from "react";
import { IconInstagram, IconFacebook, IconTwitterX } from "../components/icons/Icons";
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Edit2, Trash2, X } from "lucide-react";
import { tambahKontak, getKontak, updateKontak, deleteKontak } from "../lib/kontak";
import { useAuth } from "../context/AuthContext";

export default function Kontak() {
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [kontakList, setKontakList] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    pesan: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  // Load kontak untuk admin
  useEffect(() => {
    if (isAdmin) {
      loadKontak();
    }
  }, [isAdmin]);

  async function loadKontak() {
    try {
      const data = await getKontak();
      setKontakList(data || []);
    } catch (error) {
      console.error("Gagal memuat kontak:", error);
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
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 text-[#002244] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#003366] to-[#0055aa] bg-clip-text text-transparent relative inline-block">
            Kontak Kami
            <span className="block w-24 h-1 bg-gradient-to-r from-[#003366] to-[#0055aa] mx-auto mt-3 rounded"></span>
          </h2>
          <p className="mt-4 text-[#002244]/80 text-lg max-w-2xl mx-auto">
            Kami siap membantu Anda. Silakan hubungi melalui formulir, telepon, email, atau kunjungi kantor kami.
          </p>
        </div>

        {/* Konten - Jika Admin, tampilkan tabel. Jika User, tampilkan form */}
        {isAdmin ? (
          <div className="mt-12">
            {/* Tabel Kontak untuk Admin */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-200">
              {message.text && (
                <div className={`mb-4 p-3 rounded-lg ${
                  message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}>
                  {message.text}
                </div>
              )}
              <h3 className="text-2xl font-bold text-[#003366] mb-6">Daftar Pesan Kontak</h3>
              {kontakList.length > 0 ? (
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
                          {editingId === item.id ? (
                            <td colSpan={6} className="px-4 py-4 bg-blue-50">
                              <form onSubmit={async (e) => {
                                e.preventDefault();
                                try {
                                  await updateKontak(item.id, editForm);
                                  await loadKontak();
                                  setEditingId(null);
                                  setMessage({ type: "success", text: "Pesan berhasil diupdate!" });
                                } catch (error) {
                                  setMessage({ type: "error", text: error.message || "Gagal update pesan" });
                                }
                              }} className="space-y-3">
                                <div className="grid md:grid-cols-2 gap-3">
                                  <input
                                    type="text"
                                    value={editForm.nama}
                                    onChange={(e) => setEditForm({...editForm, nama: e.target.value})}
                                    placeholder="Nama"
                                    className="px-3 py-2 border rounded-lg"
                                    required
                                  />
                                  <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                    placeholder="Email"
                                    className="px-3 py-2 border rounded-lg"
                                    required
                                  />
                                </div>
                                <textarea
                                  value={editForm.pesan}
                                  onChange={(e) => setEditForm({...editForm, pesan: e.target.value})}
                                  placeholder="Pesan"
                                  rows={3}
                                  className="w-full px-3 py-2 border rounded-lg"
                                  required
                                />
                                <div className="flex gap-2">
                                  <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                  >
                                    Simpan
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingId(null)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                  >
                                    Batal
                                  </button>
                                </div>
                              </form>
                            </td>
                          ) : (
                            <>
                              <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                              <td className="px-4 py-3 font-medium text-[#003366]">{item.nama}</td>
                              <td className="px-4 py-3 text-gray-700">{item.email}</td>
                              <td className="px-4 py-3 text-gray-700 max-w-md truncate">{item.pesan}</td>
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
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingId(item.id);
                                      setEditForm({
                                        nama: item.nama,
                                        email: item.email,
                                        pesan: item.pesan,
                                      });
                                    }}
                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded transition"
                                    title="Edit"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (confirm(`Hapus pesan dari ${item.nama}?`)) {
                                        try {
                                          await deleteKontak(item.id);
                                          await loadKontak();
                                          setMessage({ type: "success", text: "Pesan berhasil dihapus!" });
                                        } catch (error) {
                                          setMessage({ type: "error", text: error.message || "Gagal hapus pesan" });
                                        }
                                      }
                                    }}
                                    className="p-2 text-red-600 hover:bg-red-100 rounded transition"
                                    title="Hapus"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </>
                          )}
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
            <div className="bg-gradient-to-tr from-white to-blue-100/40 rounded-2xl shadow-xl p-8 border border-blue-200">
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
        )}
      </div>
    </div>
  );
}
