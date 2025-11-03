import React, { useState, useEffect } from "react";
import {
  Send,
  Phone,
  Mail,
  User,
  Smartphone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Edit2,
  Trash2,
} from "lucide-react";
import { tambahAduan, getAduan, updateAduan, deleteAduan } from "../lib/aduan";
import { useAuth } from "../context/AuthContext";

export default function Aduan() {
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [aduanList, setAduanList] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    isi_aduan: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    isi_aduan: "",
  });

  useEffect(() => {
    if (isAdmin) {
      loadAduan();
    }
  }, [isAdmin]);

  async function loadAduan() {
    try {
      const data = await getAduan();
      setAduanList(data || []);
    } catch (error) {
      console.error("Gagal memuat aduan:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await tambahAduan(form.nama, form.email, form.no_hp, form.isi_aduan);
      setMessage({ type: "success", text: "Aduan berhasil dikirim!" });
      setSubmitted(true);
      setForm({ nama: "", email: "", no_hp: "", isi_aduan: "" });
      if (isAdmin) {
        await loadAduan();
      }
    } catch (error) {
      console.error("Gagal mengirim aduan:", error);
      setMessage({
        type: "error",
        text: error.message || "Gagal mengirim aduan. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 py-10 px-4">
      {isAdmin ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
            {message.text && (
              <div className={`mb-4 p-3 rounded-lg ${
                message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
              }`}>
                {message.text}
              </div>
            )}
            <h2 className="text-3xl font-bold text-[#003366] mb-6">
              Daftar Aduan Masuk
            </h2>
            {aduanList.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#003366] to-[#0055aa] text-white">
                      <th className="px-4 py-3 text-left rounded-tl-lg">No</th>
                      <th className="px-4 py-3 text-left">Nama</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">No. HP</th>
                      <th className="px-4 py-3 text-left">Isi Aduan</th>
                      <th className="px-4 py-3 text-left">Tanggal</th>
                      <th className="px-4 py-3 text-left rounded-tr-lg">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aduanList.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-b border-blue-100 hover:bg-blue-50 transition"
                      >
                        {editingId === item.id ? (
                          <td colSpan={7} className="px-4 py-4 bg-blue-50">
                            <form onSubmit={async (e) => {
                              e.preventDefault();
                              try {
                                await updateAduan(item.id, editForm);
                                await loadAduan();
                                setEditingId(null);
                                setMessage({ type: "success", text: "Aduan berhasil diupdate!" });
                              } catch (error) {
                                setMessage({ type: "error", text: error.message || "Gagal update aduan" });
                              }
                            }} className="space-y-3">
                              <div className="grid md:grid-cols-3 gap-3">
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
                                <input
                                  type="text"
                                  value={editForm.no_hp}
                                  onChange={(e) => setEditForm({...editForm, no_hp: e.target.value})}
                                  placeholder="No. HP"
                                  className="px-3 py-2 border rounded-lg"
                                  required
                                />
                              </div>
                              <textarea
                                value={editForm.isi_aduan}
                                onChange={(e) => setEditForm({...editForm, isi_aduan: e.target.value})}
                                placeholder="Isi Aduan"
                                rows={4}
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
                            <td className="px-4 py-3 text-gray-700">{item.no_hp}</td>
                            <td className="px-4 py-3 text-gray-700 max-w-md">
                              <div className="truncate" title={item.isi_aduan}>
                                {item.isi_aduan}
                              </div>
                            </td>
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
                                      no_hp: item.no_hp,
                                      isi_aduan: item.isi_aduan,
                                    });
                                  }}
                                  className="p-2 text-blue-600 hover:bg-blue-100 rounded transition"
                                  title="Edit"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={async () => {
                                    if (confirm(`Hapus aduan dari ${item.nama}?`)) {
                                      try {
                                        await deleteAduan(item.id);
                                        await loadAduan();
                                        setMessage({ type: "success", text: "Aduan berhasil dihapus!" });
                                      } catch (error) {
                                        setMessage({ type: "error", text: error.message || "Gagal hapus aduan" });
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
              <p className="text-center py-8 text-gray-600">Belum ada aduan masuk.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
            <div className="bg-gradient-to-r from-[#003366] to-[#0055aa] text-white py-10 px-6 text-center">
              <h2 className="text-3xl font-bold mb-2">Layanan Aduan</h2>
              <p className="text-white/90 text-lg">
                Sampaikan aduan Anda dengan mudah, cepat, dan responsif.
              </p>
            </div>
            <div className="p-10 bg-gradient-to-br from-blue-50 to-white">
              {message.text && (
                <div
                  className={`mb-6 rounded-xl p-4 flex items-center gap-3 ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <AlertCircle size={20} className="text-red-600" />
                  )}
                  <span className="text-sm font-medium">{message.text}</span>
                </div>
              )}

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Input Nama */}
                  <div className="flex items-center gap-3 border-2 border-blue-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366] focus-within:border-[#003366] transition">
                    <User size={18} className="text-[#003366]" />
                    <input
                      required
                      value={form.nama}
                      onChange={(e) =>
                        setForm({ ...form, nama: e.target.value })
                      }
                      placeholder="Nama Lengkap"
                      className="w-full text-sm outline-none text-gray-700"
                      disabled={loading}
                    />
                  </div>

                  {/* Input Email */}
                  <div className="flex items-center gap-3 border-2 border-blue-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366] focus-within:border-[#003366] transition">
                    <Mail size={18} className="text-[#003366]" />
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="Email"
                      className="w-full text-sm outline-none text-gray-700"
                      disabled={loading}
                    />
                  </div>

                  {/* Input No HP */}
                  <div className="flex items-center gap-3 border-2 border-blue-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366] focus-within:border-[#003366] transition">
                    <Smartphone size={18} className="text-[#003366]" />
                    <input
                      required
                      value={form.no_hp}
                      onChange={(e) =>
                        setForm({ ...form, no_hp: e.target.value })
                      }
                      placeholder="Nomor HP"
                      className="w-full text-sm outline-none text-gray-700"
                      disabled={loading}
                    />
                  </div>

                  {/* Textarea Aduan */}
                  <div className="flex items-start gap-3 border-2 border-blue-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366] focus-within:border-[#003366] transition">
                    <MessageSquare size={18} className="text-[#003366] mt-1" />
                    <textarea
                      required
                      value={form.isi_aduan}
                      onChange={(e) =>
                        setForm({ ...form, isi_aduan: e.target.value })
                      }
                      placeholder="Isi Aduan"
                      rows={5}
                      className="w-full text-sm outline-none resize-none text-gray-700"
                      disabled={loading}
                    />
                  </div>

                  {/* Button Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-[#003366] to-[#0055aa] px-4 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:from-[#00224d] hover:to-[#004488] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                    {loading ? "Mengirim..." : "Kirim Aduan"}
                  </button>
                </form>
              ) : (
                <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-8 text-center text-green-800 shadow-inner">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <p className="font-semibold text-xl mb-2">
                    Aduan Anda telah dikirim ✅
                  </p>
                  <p className="text-sm text-green-700">
                    Terima kasih atas partisipasi Anda, kami akan segera
                    menindaklanjuti.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage({ type: "", text: "" });
                    }}
                    className="mt-4 px-6 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#00224d] transition"
                  >
                    Kirim Aduan Lagi
                  </button>
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
      )}
    </div>
  );
}
