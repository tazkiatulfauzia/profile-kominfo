// src/pages/Aduan.jsx
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
  X,
  Building2,
} from "lucide-react";
import {
  tambahAduan,
  getAduan,
  updateAduan,
  deleteAduan,
} from "../lib/aduan";
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
    status: "diajukan",
    dinas_tujuan: "",
    keterangan_tindak_lanjut: "",
    website: "",
  });
  // fitur cek status dihapus sesuai permintaan, tidak ada state tambahan

  // contoh mapping dinas -> website (ganti sesuai data asli nanti)
  const dinasWebsites = {
    "Dinas Komunikasi dan Informatika": "https://diskominfo.bukittinggikota.go.id",
    "Dinas Pendidikan": "https://dindik.bukittinggikota.go.id",
    "Dinas Kesehatan": "https://dinkes.bukittinggikota.go.id",
    "Dinas Pekerjaan Umum": "https://dpu.bukittinggikota.go.id",
    "Dinas Perhubungan": "https://dishub.bukittinggikota.go.id",
    "Dinas Sosial": "https://dinsos.bukittinggikota.go.id",
    "Dinas Pariwisata": "https://pariwisata.bukittinggikota.go.id",
    "Dinas Lingkungan Hidup": "https://dlh.bukittinggikota.go.id",
    "Dinas Perdagangan": "https://disdag.bukittinggikota.go.id",
    "Dinas Pertanian": "https://dinaspertanian.bukittinggikota.go.id",
    "Dinas lainnya": "",
  };

  const daftarDinas = [
    "Dinas Pendidikan",
    "Dinas Kesehatan",
    "Dinas Pekerjaan Umum",
    "Dinas Perhubungan",
    "Dinas Sosial",
    "Dinas Pariwisata",
    "Dinas Lingkungan Hidup",
    "Dinas Perdagangan",
    "Dinas Pertanian",
    "Dinas Perpajakan",
    "Dinas Kependudukan dan Catatan Sipil",
    "Dinas Perumahan dan Permukiman",
    "Badan Kesatuan Bangsa dan Politik",
    "Dinas Pemberdayaan Masyarakat",
    "Dinas Komunikasi dan Informatika",
    "Dinas lainnya",
  ];

  const statusOptions = [
    { value: "diajukan", label: "Diajukan", color: "bg-gray-500" },
    { value: "diproses", label: "Diproses", color: "bg-yellow-500" },
    { value: "diteruskan", label: "Diteruskan", color: "bg-blue-500" },
    { value: "selesai", label: "Selesai", color: "bg-green-500" },
  ];

  useEffect(() => {
    if (isAdmin) {
      loadAduan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  async function loadAduan() {
    try {
      const data = await getAduan();
      setAduanList(data || []);
    } catch (error) {
      console.error("Gagal memuat aduan:", error);
      setMessage({ type: "error", text: "Gagal memuat data aduan" });
    }
  }

  // fitur tindak lanjut dan cek status dihapus sesuai permintaan

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
        text: error?.response?.data?.message || error.message || "Gagal mengirim aduan. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  }

  // — NEW: buka edit form yang bisa ubah semua field —
  function openEdit(item) {
    setEditingId(item.id);
    setEditForm({
      nama: item.nama || "",
      email: item.email || "",
      no_hp: item.no_hp || "",
      isi_aduan: item.isi_aduan || "",
      status: item.status || "diajukan",
      dinas_tujuan: item.dinas_tujuan || "",
      keterangan_tindak_lanjut: item.keterangan_tindak_lanjut || "",
      website: item.website || dinasWebsites[item.dinas_tujuan] || "",
    });
  }

  function handleDinasChangeInEdit(value) {
    const website = dinasWebsites[value] || "";
    setEditForm((p) => ({ ...p, dinas_tujuan: value, website }));
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 py-10 px-4">
      {isAdmin ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
            {message.text && (
              <div
                className={`mb-4 p-3 rounded-lg ${
                  message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}
            <h2 className="text-3xl font-bold text-[#003366] mb-6">Daftar Aduan Masuk</h2>

            {aduanList.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  {!editingId && (
                    <thead>
                      <tr className="bg-gradient-to-r from-[#003366] to-[#0055aa] text-white">
                        <th className="px-4 py-3 text-left rounded-tl-lg">No</th>
                        <th className="px-4 py-3 text-left">Nama</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">No. HP</th>
                        <th className="px-4 py-3 text-left">Isi Aduan</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Dinas Tujuan</th>
                        <th className="px-4 py-3 text-left">Website</th>
                        <th className="px-4 py-3 text-left">Keterangan</th>
                        <th className="px-4 py-3 text-left">Tanggal</th>
                        <th className="px-4 py-3 text-left rounded-tr-lg">Aksi</th>
                      </tr>
                    </thead>
                  )}

                  <tbody>
                    {aduanList.map((item, index) => (
                      <tr key={item.id} className="border-b border-blue-100 hover:bg-blue-50 transition">
                        {editingId === item.id ? (
                          // EDIT MODE (sekarang edit semua field)
                          <td colSpan={11} className="px-4 py-4 bg-blue-50">
                            <form
                              onSubmit={async (e) => {
                                e.preventDefault();
                                try {
                                  // kirim hanya field yang ada di editForm
                                  const payload = { ...editForm };
                                  await updateAduan(item.id, payload);
                                  await loadAduan();
                                  setEditingId(null);
                                  setMessage({ type: "success", text: "Aduan berhasil diupdate!" });
                                } catch (error) {
                                  console.error("Error update aduan:", error);
                                  setMessage({ type: "error", text: error?.response?.data?.message || error.message || "Gagal update aduan" });
                                }
                              }}
                              className="space-y-3"
                            >
                              <div className="grid md:grid-cols-3 gap-3">
                                <input
                                  type="text"
                                  value={editForm.nama}
                                  onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                                  placeholder="Nama"
                                  className="px-3 py-2 border rounded-lg"
                                  required
                                />
                                <input
                                  type="email"
                                  value={editForm.email}
                                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                  placeholder="Email"
                                  className="px-3 py-2 border rounded-lg"
                                  required
                                />
                                <input
                                  type="text"
                                  value={editForm.no_hp}
                                  onChange={(e) => setEditForm({ ...editForm, no_hp: e.target.value })}
                                  placeholder="No. HP"
                                  className="px-3 py-2 border rounded-lg"
                                  required
                                />
                              </div>

                              <div>
                                <textarea
                                  value={editForm.isi_aduan}
                                  onChange={(e) => setEditForm({ ...editForm, isi_aduan: e.target.value })}
                                  placeholder="Isi Aduan"
                                  rows={4}
                                  className="w-full px-3 py-2 border rounded-lg"
                                  required
                                />
                              </div>

                              <div className="grid md:grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-sm font-semibold mb-1">Status</label>
                                  <select
                                    value={editForm.status}
                                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                  >
                                    {statusOptions.map((s) => (
                                      <option key={s.value} value={s.value}>
                                        {s.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-sm font-semibold mb-1">Dinas Tujuan</label>
                                  <select
                                    value={editForm.dinas_tujuan}
                                    onChange={(e) => handleDinasChangeInEdit(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                  >
                                    <option value="">Pilih Dinas...</option>
                                    {daftarDinas.map((d) => (
                                      <option key={d} value={d}>
                                        {d}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-sm font-semibold mb-1">Website</label>
                                  <input
                                    type="text"
                                    value={editForm.website}
                                    onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                                    placeholder="Website dinas / referensi"
                                    className="w-full px-3 py-2 border rounded-lg"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-semibold mb-1">Keterangan Tindak Lanjut</label>
                                <textarea
                                  value={editForm.keterangan_tindak_lanjut}
                                  onChange={(e) => setEditForm({ ...editForm, keterangan_tindak_lanjut: e.target.value })}
                                  placeholder="Keterangan tindak lanjut"
                                  rows={3}
                                  className="w-full px-3 py-2 border rounded-lg"
                                />
                              </div>

                              <div className="flex gap-2">
                                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                  Simpan
                                </button>
                                <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
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

                            <td className="px-4 py-3">
                              {item.status ? (
                                <span
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${
                                    statusOptions.find((s) => s.value === item.status)?.color || "bg-gray-500"
                                  }`}
                                >
                                  {statusOptions.find((s) => s.value === item.status)?.label || item.status}
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white">
                                  Diajukan
                                </span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-gray-700 text-sm">
                              {item.dinas_tujuan ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                                  <Building2 size={12} />
                                  {item.dinas_tujuan}
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs">-</span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-sm">
                              {item.website ? (
                                <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-[#003366] underline text-sm">
                                  Website Dinas
                                </a>
                              ) : (
                                <span className="text-gray-400 text-xs">-</span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-gray-700 text-sm">{item.keterangan_tindak_lanjut || "-"}</td>

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
                              <div className="flex gap-2 flex-wrap">
                                <button
                                  onClick={() => openEdit(item)}
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
                                        console.error("Error delete aduan:", error);
                                        setMessage({ type: "error", text: error?.response?.data?.message || error.message || "Gagal hapus aduan" });
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
        // VIEW PUBLIC (form pengaduan saja, tanpa cek status)
        <div className="flex items-center justify-center">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
            <div className="bg-gradient-to-r from-[#003366] to-[#0055aa] text-white py-10 px-6 text-center">
              <h2 className="text-3xl font-bold mb-2">Layanan Aduan</h2>
              <p className="text-white/90 text-lg">Sampaikan aduan Anda dengan mudah, cepat, dan responsif.</p>
            </div>

            <div className="p-10 bg-gradient-to-br from-blue-50 to-white">
              {message.text && (
                <div
                  className={`mb-6 rounded-xl p-4 flex items-center gap-3 ${
                    message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message.type === "success" ? <CheckCircle size={20} className="text-green-600" /> : <AlertCircle size={20} className="text-red-600" />}
                  <span className="text-sm font-medium">{message.text}</span>
                </div>
              )}

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Input Nama */}
                  <div className="flex items-center gap-3 border-2 border-blue-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366] focus-within:border-[#003366] transition">
                    <User size={18} className="text-[#003366]" />
                    <input required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama Lengkap" className="w-full text-sm outline-none text-gray-700" disabled={loading} />
                  </div>

                  {/* Input Email */}
                  <div className="flex items-center gap-3 border-2 border-blue-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366] focus-within:border-[#003366] transition">
                    <Mail size={18} className="text-[#003366]" />
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full text-sm outline-none text-gray-700" disabled={loading} />
                  </div>

                  {/* Input No HP */}
                  <div className="flex items-center gap-3 border-2 border-blue-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366] focus-within:border-[#003366] transition">
                    <Smartphone size={18} className="text-[#003366]" />
                    <input required value={form.no_hp} onChange={(e) => setForm({ ...form, no_hp: e.target.value })} placeholder="Nomor HP" className="w-full text-sm outline-none text-gray-700" disabled={loading} />
                  </div>

                  {/* Textarea Aduan */}
                  <div className="flex items-start gap-3 border-2 border-blue-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366] focus-within:border-[#003366] transition">
                    <MessageSquare size={18} className="text-[#003366] mt-1" />
                    <textarea required value={form.isi_aduan} onChange={(e) => setForm({ ...form, isi_aduan: e.target.value })} placeholder="Isi Aduan" rows={5} className="w-full text-sm outline-none resize-none text-gray-700" disabled={loading} />
                  </div>

                  {/* Button Submit */}
                  <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-[#003366] to-[#0055aa] px-4 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:from-[#00224d] hover:to-[#004488] transition disabled:opacity-50 disabled:cursor-not-allowed">
                    <Send size={18} /> {loading ? "Mengirim..." : "Kirim Aduan"}
                  </button>
                </form>
              ) : (
                <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-8 text-center text-green-800 shadow-inner">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <p className="font-semibold text-xl mb-2">Aduan Anda telah dikirim ✅</p>
                  <p className="text-sm text-green-700">Terima kasih atas partisipasi Anda, kami akan segera menindaklanjuti.</p>
                  <button onClick={() => { setSubmitted(false); setMessage({ type: "", text: "" }); }} className="mt-4 px-6 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#00224d] transition">Kirim Aduan Lagi</button>
                </div>
              )}

              {/* Info Kontak Alternatif */}
              <div className="mt-10 text-center">
                <h3 className="font-semibold text-[#003366] mb-3 text-lg">Kontak Alternatif</h3>
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
