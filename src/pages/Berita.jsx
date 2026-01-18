import React, { useEffect, useState } from "react";
import { Edit2, Trash2, ArrowRight } from "lucide-react";
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

  const CACHE_KEY_BERITA = "beritaCache";
  const CACHE_TTL = 2 * 60 * 1000;

  // Load berita sesuai kategori filter
  useEffect(() => {
    let usedCache = false;
    try {
      const cached = sessionStorage.getItem(CACHE_KEY_BERITA);
      if (cached) {
        const parsed = JSON.parse(cached);
        const key = kategoriFilter || "semua";
        if (parsed[key] && Date.now() - parsed[key].timestamp < CACHE_TTL) {
          setBerita(parsed[key].data || []);
          usedCache = true;
        }
      }
    } catch (e) {
      console.warn("Cache berita error:", e);
    }
    loadBerita({ silent: usedCache });
  }, [kategoriFilter]);

  async function loadBerita({ silent = false } = {}) {
    try {
      const data = await getBerita({ kategori: kategoriFilter === "semua" ? "" : kategoriFilter, per_page: 100 });
      let filteredData = Array.isArray(data) ? data : [];
      
      // Filter di frontend juga sebagai backup jika API tidak memfilter dengan benar
      if (kategoriFilter !== "semua") {
        filteredData = filteredData.filter((item) => item.kategori === kategoriFilter);
      }
      
      setBerita(filteredData);
      try {
        const cached = sessionStorage.getItem(CACHE_KEY_BERITA);
        const parsed = cached ? JSON.parse(cached) : {};
        parsed[kategoriFilter || "semua"] = { timestamp: Date.now(), data: filteredData };
        sessionStorage.setItem(CACHE_KEY_BERITA, JSON.stringify(parsed));
      } catch (e) {
        console.warn("Cache berita write error:", e);
      }
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
                Dinas Komunikasi & Informatika
              </h1>
              <p className="text-lg md:text-xl mb-4 text-blue-100 drop-shadow-md">
                Kota Bukittinggi Sumatera Barat
              </p>
              <p className="text-base md:text-lg text-blue-50 mb-6 max-w-2xl drop-shadow-sm">
                Portal informasi resmi untuk update terbaru seputar layanan publik, regulasi, dan program pemerintah Kota Bukittinggi.
              </p>
              <button
                onClick={() => window.scrollTo({ top: document.getElementById('berita-section')?.offsetTop - 100, behavior: 'smooth' })}
                className="bg-white text-[#003366] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Baca Semua Berita
              </button>
            </div>
            <div className="flex-1 flex justify-center items-center relative">
              <div className="relative w-full max-w-md">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                
                <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 border border-white/30 backdrop-blur-sm bg-white/5">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Kantor_Walikota_Bukit_Tinggi.jpg" 
                    alt="Kantor Walikota Bukit Tinggi"
                    className="w-full h-56 md:h-64 object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=Kantor+Walikota";
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

      <div className="max-w-7xl mx-auto px-4 py-12">
        {isAdmin && (
          <h1 className="text-3xl font-bold text-[#003366] text-center mb-10">
            Manajemen Berita
          </h1>
        )}

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          <div className="mx-4 w-2 h-2 rounded-full bg-[#003366]"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
        </div>

        {/* KATEGORI FILTER */}
        <div className="flex justify-center gap-4 mb-12">
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

        {/* Berita Section */}
        <div id="berita-section" className="mb-16">
          {/* LIST BERITA - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {berita.length > 0 ? (
              berita.map((item) => (
                <article
                  key={item.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col border border-gray-100 hover:border-blue-200"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-48 overflow-hidden bg-white">
                    {item.gambar ? (
                      <img
                        src={item.gambar}
                        alt={item.judul}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200"></div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-[#003366] text-white text-xs font-semibold rounded">
                        {item.kategori === "kominfo" ? "Kominfo" : "Kota Bukittinggi"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-[#003366] text-lg mb-2 line-clamp-2 group-hover:text-[#0055aa] transition-colors">
                      {item.judul}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1 leading-relaxed">
                      {item.deskripsi}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200">
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#003366] hover:text-[#0055aa] font-semibold text-sm transition-colors"
                        >
                          Baca Selengkapnya
                          <ArrowRight size={16} />
                        </a>
                      )}
                      
                      {/* Admin Actions */}
                      {isAdmin && (
                        <div className="flex gap-2 ml-auto">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-all"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-all"
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="inline-block p-8 bg-gray-50 rounded-lg shadow-md">
                  <p className="text-gray-600 text-lg">Memuat Berita...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="relative mt-20 mb-12">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 rounded-3xl -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - Transparansi */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative">
                <div className="text-5xl font-bold bg-gradient-to-r from-[#003366] to-[#0055aa] bg-clip-text text-transparent mb-3">100%</div>
                <div className="text-xl font-semibold text-[#003366] mb-2">Transparansi</div>
                <div className="text-sm text-gray-600 leading-relaxed">Informasi terbuka untuk publik</div>
              </div>
            </div>

            {/* Feature 2 - Akses Mudah */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative">
                <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mb-3">24/7</div>
                <div className="text-xl font-semibold text-green-700 mb-2">Akses Mudah</div>
                <div className="text-sm text-gray-600 leading-relaxed">Informasi tersedia kapan saja</div>
              </div>
            </div>

            {/* Feature 3 - Real-Time Update */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent mb-3">Real</div>
                <div className="text-xl font-semibold text-purple-700 mb-2">-Time Update</div>
                <div className="text-sm text-gray-600 leading-relaxed">Berita terbaru setiap saat</div>
              </div>
            </div>
          </div>
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
