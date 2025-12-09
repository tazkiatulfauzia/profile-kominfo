import React, { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { getBerita, tambahBerita, updateBerita, hapusBerita } from "../lib/berita";
import { useAuth } from "../context/AuthContext";

export default function Berita() {
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const [berita, setBerita] = useState([]);
  const [kategoriFilter, setKategoriFilter] = useState("semua");
  const [judul, setJudul] = useState("Semua Berita");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [form, setForm] = useState({
    id: null,
    judul: "",
    deskripsi: "",
    gambar: "",
    link: "",
    kategori: "kominfo",
  });

  // Load berita sesuai kategori filter
  useEffect(() => {
    loadBerita();
  }, [kategoriFilter]);

  async function loadBerita() {
    try {
      const data = await getBerita({ kategori: kategoriFilter === "semua" ? "" : kategoriFilter, per_page: 100 });
      let filteredData = Array.isArray(data) ? data : [];
      
      // Filter di frontend juga sebagai backup jika API tidak memfilter dengan benar
      if (kategoriFilter !== "semua") {
        filteredData = filteredData.filter((item) => item.kategori === kategoriFilter);
      }
      
      setBerita(filteredData);
    } catch (error) {
      console.error("Gagal memuat berita:", error.message);
      setBerita([]);
      setMessage({ type: "error", text: error.message || "Gagal memuat berita" });
    }
  }

  // Pilih kategori untuk filter
  const handleKategoriFilter = (kat) => {
    setKategoriFilter(kat);
    if (kat === "semua") setJudul("Semua Berita");
    else if (kat === "kominfo") setJudul("Berita Kominfo");
    else if (kat === "bukittinggi") setJudul("Berita Kota Bukittinggi");
  };

  // Submit tambah / edit berita
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      if (form.id) {
        await updateBerita(form.id, {
          judul: form.judul,
          deskripsi: form.deskripsi,
          gambar: form.gambar,
          link: form.link,
          kategori: form.kategori,
        });
        setMessage({ type: "success", text: "Berita berhasil diperbarui!" });
      } else {
        await tambahBerita(form.judul, form.deskripsi, form.gambar, form.link, form.kategori);
        setMessage({ type: "success", text: "Berita berhasil disimpan!" });
      }

      // Reload data immediately
      await loadBerita();

      // Reset form setelah 1.5 detik (untuk memberi waktu melihat pesan sukses)
      setTimeout(() => {
        setForm({ id: null, judul: "", deskripsi: "", gambar: "", link: "", kategori: "kominfo" });
        setShowForm(false);
        setMessage({ type: "", text: "" });
      }, 1500);
    } catch (error) {
      console.error("Gagal menyimpan berita:", error);
      setMessage({ 
        type: "error", 
        text: error.message || "Gagal menyimpan berita. Pastikan semua field terisi dan koneksi ke database berjalan." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus berita ini?")) return;
    try {
      await hapusBerita(id);
      loadBerita();
    } catch (error) {
      console.error("Gagal menghapus berita:", error.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#003366] via-[#0055aa] to-[#003366] bg-clip-text text-transparent mb-4">
            Portal Berita
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dapatkan informasi terkini seputar Dinas Komunikasi dan Informatika Kota Bukittinggi
          </p>
        </div>

        {/* KATEGORI FILTER - Professional Design */}
        <div className="flex justify-center gap-4 mb-10">
          {["semua", "kominfo", "bukittinggi"].map((kat) => (
            <button
              key={kat}
              onClick={() => handleKategoriFilter(kat)}
              className={`font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform ${
                kategoriFilter === kat
                  ? "bg-gradient-to-r from-[#003366] to-[#0055aa] text-white shadow-xl scale-105"
                  : "text-[#003366] bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-[#003366] hover:scale-105"
              }`}
            >
              {kat === "semua" ? "Semua Berita" : kat === "kominfo" ? "Kominfo" : "Kota Bukittinggi"}
            </button>
          ))}
        </div>

        {/* FORM TAMBAH / EDIT - Hanya untuk Admin */}
        {isAdmin && showForm && (
          <form onSubmit={handleSubmit} className="mb-10 border-2 border-blue-200 rounded-2xl p-8 max-w-2xl mx-auto bg-white shadow-xl">
          {/* Pesan sukses/error */}
          {message.text && (
            <div
              className={`mb-4 p-4 rounded-xl ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <input 
            type="text" 
            placeholder="Judul" 
            value={form.judul} 
            onChange={(e) => setForm({ ...form, judul: e.target.value })} 
            className="w-full mb-4 p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none disabled:opacity-50"
            required 
            disabled={loading}
          />
          <textarea 
            placeholder="Deskripsi" 
            value={form.deskripsi} 
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} 
            className="w-full mb-4 p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none min-h-[100px] resize-none disabled:opacity-50"
            required 
            disabled={loading}
          />
          <input 
            type="text" 
            placeholder="Link gambar" 
            value={form.gambar} 
            onChange={(e) => setForm({ ...form, gambar: e.target.value })} 
            className="w-full mb-4 p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none disabled:opacity-50"
            required 
            disabled={loading}
          />
          <input 
            type="text" 
            placeholder="Link berita" 
            value={form.link} 
            onChange={(e) => setForm({ ...form, link: e.target.value })} 
            className="w-full mb-4 p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none disabled:opacity-50"
            required 
            disabled={loading}
          />

          {/* DROPDOWN KATEGORI */}
          <select 
            value={form.kategori} 
            onChange={(e) => setForm({ ...form, kategori: e.target.value })} 
            className="w-full mb-4 p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none disabled:opacity-50"
            required 
            disabled={loading}
          >
            <option value="kominfo">Kominfo</option>
            <option value="bukittinggi">Kota Bukittinggi</option>
          </select>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#28a745] to-[#20c997] hover:from-[#218838] hover:to-[#1ea080] shadow-lg"
            }`}
          >
            {loading ? "Menyimpan..." : (form.id ? "Update" : "Simpan")}
          </button>
        </form>
      )}

      {/* LIST BERITA - Professional Card Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {berita.length > 0 ? (
          berita.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 flex flex-col"
            >
              {/* Image Container with Overlay */}
              {item.gambar && (
                <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#003366] text-white text-xs font-semibold rounded-full shadow-lg">
                      {item.kategori === "kominfo" ? "Kominfo" : "Kota Bukittinggi"}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-[#003366] text-xl mb-3 line-clamp-2 group-hover:text-[#0055aa] transition-colors">
                  {item.judul}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1 leading-relaxed">
                  {item.deskripsi}
                </p>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#0055aa] hover:text-[#003366] font-semibold text-sm transition-colors group/link"
                    >
                      Baca Selengkapnya
                      <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                    </a>
                  )}
                  
                  {/* Admin Actions */}
                  {isAdmin && (
                    <div className="flex gap-2 ml-auto">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all hover:scale-110"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="inline-block p-8 bg-white rounded-2xl shadow-md border border-slate-200">
              <p className="text-gray-600 text-lg">Memuat Berita...</p>
            </div>
          </div>
        )}
      </div>

        {/* BUTTON TAMBAH BERITA - Hanya untuk Admin - Dipindah ke bawah */}
        {isAdmin && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setForm({ id: null, judul: "", deskripsi: "", gambar: "", link: "", kategori: "kominfo" });
                setShowForm(!showForm);
                setMessage({ type: "", text: "" });
              }}
              className="bg-gradient-to-r from-[#003366] to-[#0055aa] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-[#00224d] hover:to-[#004488] transition-all transform hover:scale-105"
            >
              {showForm ? "✕ Batal" : "+ Tambah Berita Baru"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
