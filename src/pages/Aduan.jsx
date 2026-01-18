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
  const [loadingAduan, setLoadingAduan] = useState(true);
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

  const CACHE_KEY_ADUAN = "adminAduanCache";
  const CACHE_TTL = 2 * 60 * 1000;

  useEffect(() => {
    if (isAdmin) {
      let usedCache = false;
      try {
        const cached = sessionStorage.getItem(CACHE_KEY_ADUAN);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL) {
            setAduanList(parsed.aduanList || []);
            setLoadingAduan(false);
            usedCache = true;
          }
        }
      } catch (e) {
        console.warn("Cache aduan error:", e);
      }
      loadAduan({ silent: usedCache });
    }
  }, [isAdmin]);

  async function loadAduan({ silent = false } = {}) {
    try {
      if (!silent) setLoadingAduan(true);
      const data = await getAduan();
      setAduanList(data || []);
      try {
        sessionStorage.setItem(
          CACHE_KEY_ADUAN,
          JSON.stringify({ timestamp: Date.now(), aduanList: data || [] })
        );
      } catch (e) {
        console.warn("Cache aduan write error:", e);
      }
    } catch (error) {
      console.error("Gagal memuat aduan:", error);
      setMessage({ type: "error", text: "Gagal memuat data aduan" });
    } finally {
      if (!silent) setLoadingAduan(false);
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
      if (isAdmin) await loadAduan();
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
    <div className="min-h-screen bg-white">
      {/* Hero Section - Only for non-admin */}
      {!isAdmin && (
        <div className="relative w-full py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#004488] to-[#0055aa]"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#003366]/90 via-transparent to-[#0055aa]/90"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  Layanan Pengaduan
                </h1>
                <p className="text-lg md:text-xl mb-4 text-blue-100 drop-shadow-md">
                  Dinas Komunikasi & Informatika
                </p>
                <p className="text-base md:text-lg text-blue-50 mb-6 max-w-2xl drop-shadow-sm">
                  Sampaikan aduan Anda dengan mudah, cepat, dan responsif. Kami siap membantu menyelesaikan permasalahan yang Anda hadapi.
                </p>
              </div>
              <div className="flex-1 flex justify-center items-center relative">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 border border-white/30 backdrop-blur-sm bg-white/5">
                    <img 
                      src="https://admin.bukittinggikota.go.id/storage/berita/mcgQWiKeQTJ1Fh4AkedMr2jsgQgyQI-metaMTAwMDM2MDY1NC5qcGc=-.jpg" 
                      alt="Layanan Aduan"
                      className="w-full h-56 md:h-64 object-cover"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Layanan+Aduan"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          <div className="mx-4 w-2 h-2 rounded-full bg-[#003366]"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
        </div>

        {isAdmin ? (
          <div className="max-w-7xl mx-auto">
            {/* Header Title for Admin */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-extrabold text-[#003366]">Layanan Aduan</h1>
              <p className="text-gray-500 mt-2">Manajemen data pengaduan masyarakat</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-bl-full -mr-20 -mt-20"></div>
              {message.text && (
                <div className={`mb-4 p-3 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                  {message.text}
                </div>
              )}
              <h2 className="text-3xl font-bold text-[#003366] mb-6">Daftar Aduan Masuk</h2>

              {loadingAduan ? (
                <p className="text-center py-8 text-gray-600">Memuat aduan masuk...</p>
              ) : aduanList.length > 0 ? (
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
                            <td colSpan={11} className="px-4 py-4 bg-blue-50">
                              <form
                                onSubmit={async (e) => {
                                  e.preventDefault();
                                  try {
                                    await updateAduan(item.id, { ...editForm });
                                    await loadAduan();
                                    setEditingId(null);
                                    setMessage({ type: "success", text: "Aduan berhasil diupdate!" });
                                  } catch (error) {
                                    setMessage({ type: "error", text: error.message || "Gagal update aduan" });
                                  }
                                }}
                                className="space-y-3"
                              >
                                <div className="grid md:grid-cols-3 gap-3">
                                  <input type="text" value={editForm.nama} onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })} placeholder="Nama" className="px-3 py-2 border rounded-lg" required />
                                  <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} placeholder="Email" className="px-3 py-2 border rounded-lg" required />
                                  <input type="text" value={editForm.no_hp} onChange={(e) => setEditForm({ ...editForm, no_hp: e.target.value })} placeholder="No. HP" className="px-3 py-2 border rounded-lg" required />
                                </div>
                                <textarea value={editForm.isi_aduan} onChange={(e) => setEditForm({ ...editForm, isi_aduan: e.target.value })} placeholder="Isi Aduan" rows={4} className="w-full px-3 py-2 border rounded-lg" required />
                                <div className="grid md:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block text-sm font-semibold mb-1">Status</label>
                                    <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                                      {statusOptions.map((s) => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-semibold mb-1">Dinas Tujuan</label>
                                    <select value={editForm.dinas_tujuan} onChange={(e) => handleDinasChangeInEdit(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                                      <option value="">Pilih Dinas...</option>
                                      {daftarDinas.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-semibold mb-1">Website</label>
                                    <input type="text" value={editForm.website} onChange={(e) => setEditForm({ ...editForm, website: e.target.value })} placeholder="Website dinas" className="w-full px-3 py-2 border rounded-lg" />
                                  </div>
                                </div>
                                <textarea value={editForm.keterangan_tindak_lanjut} onChange={(e) => setEditForm({ ...editForm, keterangan_tindak_lanjut: e.target.value })} placeholder="Keterangan tindak lanjut" rows={3} className="w-full px-3 py-2 border rounded-lg" />
                                <div className="flex gap-2">
                                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Simpan</button>
                                  <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Batal</button>
                                </div>
                              </form>
                            </td>
                          ) : (
                            <>
                              <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                              <td className="px-4 py-3 font-medium text-[#003366]">{item.nama}</td>
                              <td className="px-4 py-3 text-gray-700">{item.email}</td>
                              <td className="px-4 py-3 text-gray-700">{item.no_hp}</td>
                              <td className="px-4 py-3 text-gray-700 max-w-md"><div className="truncate" title={item.isi_aduan}>{item.isi_aduan}</div></td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${statusOptions.find((s) => s.value === item.status)?.color || "bg-gray-500"}`}>
                                  {statusOptions.find((s) => s.value === item.status)?.label || item.status || "Diajukan"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-700 text-sm">
                                {item.dinas_tujuan ? <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"><Building2 size={12} />{item.dinas_tujuan}</span> : "-"}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {item.website ? <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-[#003366] underline">Website</a> : "-"}
                              </td>
                              <td className="px-4 py-3 text-gray-700 text-sm">{item.keterangan_tindak_lanjut || "-"}</td>
                              <td className="px-4 py-3 text-gray-600 text-sm">
                                {item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" }) : "-"}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-2">
                                  <button onClick={() => openEdit(item)} className="p-2 text-blue-600 hover:bg-blue-100 rounded"><Edit2 size={16} /></button>
                                  <button onClick={async () => { if (confirm(`Hapus aduan?`)) { await deleteAduan(item.id); loadAduan(); } }} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16} /></button>
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
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#003366] via-[#0055aa] to-[#003366]"></div>
              <div className="relative bg-gradient-to-br from-[#003366] via-[#004488] to-[#0055aa] text-white py-12 px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 via-[#004488]/85 to-[#0055aa]/90"></div>
                <div className="relative z-10 text-center"> {/* Rata Tengah Judul */}
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">Layanan Pengaduan</h2>
                  <p className="text-white/95 text-lg">Sampaikan aduan Anda dengan mudah, cepat, dan responsif</p>
                </div>
              </div>

              <div className="p-8 md:p-10 bg-white">
                {message.text && (
                  <div className={`mb-6 rounded-xl p-4 flex items-center gap-3 ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                    {message.type === "success" ? <CheckCircle size={20} className="text-green-600" /> : <AlertCircle size={20} className="text-red-600" />}
                    <span className="text-sm font-medium">{message.text}</span>
                  </div>
                )}

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center gap-3 border-2 border-blue-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366] transition">
                      <User size={18} className="text-[#003366]" />
                      <input required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama Lengkap" className="w-full text-sm outline-none text-gray-700" disabled={loading} />
                    </div>
                    <div className="flex items-center gap-3 border-2 border-blue-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366] transition">
                      <Mail size={18} className="text-[#003366]" />
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full text-sm outline-none text-gray-700" disabled={loading} />
                    </div>
                    <div className="flex items-center gap-3 border-2 border-blue-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366] transition">
                      <Smartphone size={18} className="text-[#003366]" />
                      <input required value={form.no_hp} onChange={(e) => setForm({ ...form, no_hp: e.target.value })} placeholder="Nomor HP" className="w-full text-sm outline-none text-gray-700" disabled={loading} />
                    </div>
                    <div className="flex items-start gap-3 border-2 border-blue-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#003366] transition">
                      <MessageSquare size={18} className="text-[#003366] mt-1" />
                      <textarea required value={form.isi_aduan} onChange={(e) => setForm({ ...form, isi_aduan: e.target.value })} placeholder="Isi Aduan" rows={5} className="w-full text-sm outline-none resize-none text-gray-700" disabled={loading} />
                    </div>
                    <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-[#003366] to-[#0055aa] px-4 py-3 text-white font-semibold shadow-lg hover:from-[#00224d] transition disabled:opacity-50">
                      <Send size={18} /> {loading ? "Mengirim..." : "Kirim Aduan"}
                    </button>
                  </form>
                ) : (
                  <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-8 text-center text-green-800 shadow-inner">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                    <p className="font-semibold text-xl mb-2">Aduan Anda telah dikirim ✅</p>
                    <p className="text-sm text-green-700">Terima kasih atas partisipasi Anda.</p>
                    <button onClick={() => { setSubmitted(false); setMessage({ type: "", text: "" }); }} className="mt-4 px-6 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#00224d] transition">Kirim Aduan Lagi</button>
                  </div>
                )}

                <div className="mt-10 text-center">
                  <h3 className="font-semibold text-[#003366] mb-3 text-lg">Kontak Alternatif</h3>
                  <div className="flex flex-col items-center space-y-2 text-sm text-[#003366]/80">
                    <div className="flex items-center gap-2"><Phone size={16} /> Telepon: (0752)33369</div>
                    <div className="flex items-center gap-2"><Mail size={16} /> Email: diskominfo@bukittinggikota.go.id</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}