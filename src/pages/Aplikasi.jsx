import React, { useState, useEffect } from "react";
import { AppWindow, Archive, Plus, Edit2, Trash2, X, Save } from "lucide-react";
import { getAplikasi, tambahAplikasi, updateAplikasi, deleteAplikasi } from "../lib/aplikasi";
import { useAuth } from "../context/AuthContext";

export default function Aplikasi() {
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    link: "",
    logo_url: "",
  });

  const CACHE_KEY_APPS = "appsCache";
  const CACHE_TTL = 2 * 60 * 1000;

  useEffect(() => {
    let usedCache = false;
    try {
      const cached = sessionStorage.getItem(CACHE_KEY_APPS);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          setApps(Array.isArray(parsed.apps) ? parsed.apps : []);
          setLoadingData(false);
          usedCache = true;
        }
      }
    } catch (e) {
      console.warn("Cache apps error:", e);
    }
    loadAplikasi({ silent: usedCache });
  }, []);

  async function loadAplikasi({ silent = false } = {}) {
    try {
      if (!silent) setLoadingData(true);
      const data = await getAplikasi();
      setApps(Array.isArray(data) ? data : []);
      try {
        sessionStorage.setItem(
          CACHE_KEY_APPS,
          JSON.stringify({ timestamp: Date.now(), apps: Array.isArray(data) ? data : [] })
        );
      } catch (e) {
        console.warn("Cache apps write error:", e);
      }
    } catch (error) {
      console.error("Gagal memuat aplikasi/website:", error);
      setMessage({ type: "error", text: "Gagal memuat data aplikasi/website. Silakan refresh halaman." });
      setApps([]);
    } finally {
      if (!silent) setLoadingData(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (editingId) {
        await updateAplikasi(editingId, form);
        setMessage({ type: "success", text: "Aplikasi/Website berhasil diupdate!" });
      } else {
        await tambahAplikasi(form.nama, form.deskripsi, form.link, form.logo_url || null);
        setMessage({ type: "success", text: "Aplikasi/Website berhasil ditambahkan!" });
      }
      setForm({ nama: "", deskripsi: "", link: "", logo_url: "" });
      setShowAddForm(false);
      setEditingId(null);
      await loadAplikasi();
    } catch (error) {
      console.error("Error detail:", error);
      const errorMessage = error.response?.data?.message || error.message || "Gagal menyimpan aplikasi/website";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id, nama) {
    if (confirm(`Hapus aplikasi/website "${nama}"?`)) {
      try {
        await deleteAplikasi(id);
        setMessage({ type: "success", text: "Aplikasi/Website berhasil dihapus!" });
        await loadAplikasi();
      } catch (error) {
        setMessage({ type: "error", text: error.message || "Gagal hapus aplikasi/website" });
      }
    }
  }

  function startEdit(app) {
    setEditingId(app.id);
    setForm({
      nama: app.nama,
      deskripsi: app.deskripsi,
      link: app.link || "",
      logo_url: app.logo_url || "",
    });
    setShowAddForm(true);
  }

  function cancelEdit() {
    setEditingId(null);
    setShowAddForm(false);
    setForm({ nama: "", deskripsi: "", link: "", logo_url: "" });
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
                Aplikasi & Website Resmi
              </h1>
              <p className="text-lg md:text-xl mb-4 text-blue-100 drop-shadow-md">
                Dinas Komunikasi & Informatika
              </p>
              <p className="text-base md:text-lg text-blue-50 mb-6 max-w-2xl drop-shadow-sm">
                Akses berbagai aplikasi dan website resmi untuk pelayanan publik dan inovasi digital Kota Bukittinggi.
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center relative">
              <div className="relative w-full max-w-md">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                
                <div className="relative bg-gradient-to-br from-blue-400/30 via-blue-300/40 to-blue-400/30 rounded-xl p-6 shadow-2xl border border-white/30 backdrop-blur-sm">
                  {/* Logo Grid - 6 Aplikasi */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      "https://bukittinggikota.go.id/images/news.jpg",
                      "https://bukittinggikota.go.id/images/logosirubi.png",
                      "https://bukittinggikota.go.id/images/sbh.png",
                      "https://bukittinggikota.go.id/images/logoSbh.png",
                      "https://bukittinggikota.go.id/images/bkt.png",
                      "https://bukittinggikota.go.id/images/jdih.png"
                    ].map((logoUrl, i) => (
                      <div key={i} className="aspect-square bg-white/90 rounded-lg flex items-center justify-center border border-white/40 p-2 hover:bg-white hover:scale-105 transition-transform shadow-sm">
                        <img 
                          src={logoUrl} 
                          alt={`Logo Aplikasi ${i + 1}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/100?text=Logo";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      <div className="mx-auto max-w-7xl px-6 py-12">
        {isAdmin && (
          <h1 className="text-3xl font-bold text-[#003366] text-center mb-10">
            Aplikasi/Website Resmi
          </h1>
        )}
        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          <div className="mx-4 w-2 h-2 rounded-full bg-[#003366]"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          {message.text && (
            <div className={`mt-4 mx-auto max-w-md p-3 rounded-lg ${
              message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
            }`}>
              {message.text}
            </div>
          )}
        </div>

        {/* Form Tambah/Edit */}
        {showAddForm && isAdmin && (
          <div className="mb-8 bg-white rounded-2xl shadow-xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-[#003366] mb-4">
              {editingId ? "Edit Aplikasi/Website" : "Tambah Aplikasi/Website Baru"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Aplikasi/Website</label>
                  <input
                    type="text"
                    value={form.nama}
                    onChange={(e) => setForm({...form, nama: e.target.value})}
                    placeholder="Contoh: e-Lapor"
                    className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Link Aplikasi/Website</label>
                  <input
                    type="url"
                    value={form.link}
                    onChange={(e) => setForm({...form, link: e.target.value})}
                    placeholder="https://..."
                    className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                <textarea
                  value={form.deskripsi}
                  onChange={(e) => setForm({...form, deskripsi: e.target.value})}
                  placeholder="Deskripsi aplikasi/website..."
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">URL Logo (opsional)</label>
                <input
                  type="url"
                  value={form.logo_url}
                  onChange={(e) => setForm({...form, logo_url: e.target.value})}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#003366] to-[#0055aa] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50"
                >
                  <Save size={18} />
                  {loading ? "Menyimpan..." : editingId ? "Update" : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Daftar Aplikasi */}
        {loadingData ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Memuat data aplikasi/website...</p>
          </div>
        ) : apps.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {apps.map((a) => (
              <div
                key={a.id}
                className="group relative rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200 overflow-hidden"
              >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => startEdit(a)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(a.id, a.nama)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
                      title="Hapus"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
                <div className="relative flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-white via-blue-200 to-blue-400 text-[#003366] mb-4 shadow-md border border-blue-200 group-hover:shadow-lg transition-all">
                  {a.logo_url ? (
                    <img 
                      src={a.logo_url} 
                      alt={a.nama} 
                      className="h-10 w-10 object-contain rounded-lg" 
                      onError={(e) => { e.target.src = "https://via.placeholder.com/40?text=App" }}
                    />
                  ) : (
                    <AppWindow size={24} />
                  )}
                </div>
                <div className="font-semibold text-[#003366] text-lg mb-1">
                  {a.nama}
                </div>
                <div className="text-sm text-gray-700 mb-4">{a.deskripsi}</div>
                {a.link && a.link !== "#" ? (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#003366] hover:text-[#0055aa] transition group-hover:underline"
                  >
                    Akses Aplikasi/Website →
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">Segera hadir</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Belum ada aplikasi/website. {isAdmin && "Klik 'Tambah Aplikasi' untuk menambahkan."}</p>
          </div>
        )}

        {/* BUTTON TAMBAH APLIKASI - Hanya untuk Admin - Dipindah ke bawah */}
        {isAdmin && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                if (showAddForm) cancelEdit();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#003366] to-[#0055aa] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition hover:from-[#00224d] hover:to-[#004488]"
            >
              <Plus size={20} />
              {showAddForm ? "Batal" : "Tambah Aplikasi/Website"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
