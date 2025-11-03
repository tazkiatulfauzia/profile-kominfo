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
      const data = await getBerita(kategoriFilter === "semua" ? "" : kategoriFilter);
      setBerita(data);
    } catch (error) {
      console.error("Gagal memuat berita:", error.message);
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
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* KATEGORI FILTER */}
        <div className="flex justify-center gap-6 mb-8 border-b-2 border-blue-200 pb-4">
          {["semua", "kominfo", "bukittinggi"].map((kat) => (
            <button
              key={kat}
              onClick={() => handleKategoriFilter(kat)}
              className={`font-semibold px-4 py-2 rounded-lg transition ${
                kategoriFilter === kat
                  ? "bg-gradient-to-r from-[#003366] to-[#0055aa] text-white shadow-lg"
                  : "text-[#003366] hover:bg-blue-100"
              }`}
            >
              {kat === "semua" ? "Semua" : kat === "kominfo" ? "Kominfo" : "Kota Bukittinggi"}
            </button>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#003366] to-[#0055aa] bg-clip-text text-transparent">
          {judul}
        </h2>

        {/* BUTTON TAMBAH BERITA - Hanya untuk Admin */}
        {isAdmin && (
          <div className="text-center mb-6">
            <button
              onClick={() => {
                setForm({ id: null, judul: "", deskripsi: "", gambar: "", link: "", kategori: "kominfo" });
                setShowForm(!showForm);
                setMessage({ type: "", text: "" });
              }}
              className="bg-gradient-to-r from-[#003366] to-[#0055aa] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-[#00224d] hover:to-[#004488] transition"
            >
              {showForm ? "Batal" : "Tambah Berita"}
            </button>
          </div>
        )}

        {/* FORM TAMBAH / EDIT - Hanya untuk Admin */}
        {isAdmin && showForm && (
          <form onSubmit={handleSubmit} className="mb-8 border-2 border-blue-200 rounded-2xl p-6 max-w-2xl mx-auto bg-white shadow-lg">
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

      {/* LIST BERITA - Card View untuk User, dengan Edit/Delete untuk Admin */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {berita.length > 0 ? (
          berita.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-white to-blue-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-100"
            >
              {item.gambar && (
                <div className="w-full h-48 overflow-hidden bg-gray-200">
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                    }}
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-bold text-[#003366] text-lg mb-2 line-clamp-2">{item.judul}</h3>
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">{item.deskripsi}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-[#0055aa] hover:text-[#003366] font-semibold text-sm transition"
                  >
                    Baca Selengkapnya →
                  </a>
                )}
                {/* Tombol Edit/Delete hanya untuk Admin */}
                {isAdmin && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded transition"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded transition"
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600 py-10">Tidak ada berita.</p>
        )}
      </div>
      </div>
    </div>
  );
}
