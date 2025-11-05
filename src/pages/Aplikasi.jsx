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

  useEffect(() => {
    loadAplikasi();
  }, []);

  async function loadAplikasi() {
    try {
      setLoadingData(true);
      const data = await getAplikasi();
      setApps(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gagal memuat aplikasi:", error);
      setMessage({ type: "error", text: "Gagal memuat data aplikasi. Silakan refresh halaman." });
      setApps([]);
    } finally {
      setLoadingData(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (editingId) {
        await updateAplikasi(editingId, form);
        setMessage({ type: "success", text: "Aplikasi berhasil diupdate!" });
      } else {
        await tambahAplikasi(form.nama, form.deskripsi, form.link, form.logo_url || null);
        setMessage({ type: "success", text: "Aplikasi berhasil ditambahkan!" });
      }
      setForm({ nama: "", deskripsi: "", link: "", logo_url: "" });
      setShowAddForm(false);
      setEditingId(null);
      await loadAplikasi();
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Gagal menyimpan aplikasi" });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id, nama) {
    if (confirm(`Hapus aplikasi "${nama}"?`)) {
      try {
        await deleteAplikasi(id);
        setMessage({ type: "success", text: "Aplikasi berhasil dihapus!" });
        await loadAplikasi();
      } catch (error) {
        setMessage({ type: "error", text: error.message || "Gagal hapus aplikasi" });
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
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#003366] to-[#0055aa] bg-clip-text text-transparent">
            Aplikasi Resmi
          </h2>
          <p className="mt-3 text-[#003366]/80 text-lg max-w-2xl mx-auto">
            Akses aplikasi resmi Dinas Kominfo untuk pelayanan publik dan inovasi digital.
          </p>
          {isAdmin && (
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                if (showAddForm) cancelEdit();
              }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#003366] to-[#0055aa] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition hover:from-[#00224d] hover:to-[#004488]"
            >
              <Plus size={20} />
              {showAddForm ? "Batal" : "Tambah Aplikasi"}
            </button>
          )}
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
              {editingId ? "Edit Aplikasi" : "Tambah Aplikasi Baru"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Aplikasi</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Link Aplikasi</label>
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
                  placeholder="Deskripsi aplikasi..."
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
            <p className="text-gray-600">Memuat data aplikasi...</p>
          </div>
        ) : apps.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {apps.map((a) => (
              <div
                key={a.id}
                className="group rounded-2xl bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-100 relative"
              >
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
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#003366] to-[#0055aa] text-white mb-4 shadow-md">
                  {a.logo_url ? (
                    <img src={a.logo_url} alt={a.nama} className="h-12 w-12 rounded-xl object-cover" />
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
                    Akses Aplikasi →
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">Segera hadir</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Belum ada aplikasi. {isAdmin && "Klik 'Tambah Aplikasi' untuk menambahkan."}</p>
          </div>
        )}
      </div>
    </div>
  );
}
