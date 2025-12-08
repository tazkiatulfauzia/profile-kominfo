import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getBerita } from "../lib/berita";
import { getAduan } from "../lib/aduan";
import { getKontak } from "../lib/kontak";
import { getAplikasi } from "../lib/aplikasi";
import { BarChart, MessageSquare, Mail, Globe, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Sidebar sederhana untuk admin
function AdminSidebar({ onLogout }) {
  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <BarChart size={18} /> },
    { label: "Berita", path: "/berita", icon: <Globe size={18} /> },
    { label: "Aduan", path: "/aduan", icon: <MessageSquare size={18} /> },
    { label: "Kontak", path: "/kontak", icon: <Mail size={18} /> },
  ];

  return (
    <aside className="w-64 bg-[#0b1f3a] text-white min-h-screen shadow-xl">
      <div className="p-4 border-b border-white/10">
        <div className="text-lg font-bold">Admin Dashboard</div>
        <div className="text-xs text-white/70">Dinas Kominfo</div>
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

// Kartu statistik
function StatCard({ title, value, icon, accent }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 border border-slate-100 flex items-center gap-4">
      <div className={`p-3 rounded-lg text-white ${accent}`}>{icon}</div>
      <div>
        <div className="text-sm text-slate-500">{title}</div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    berita: 0,
    aduan: 0,
    kontak: 0,
    aplikasi: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "Admin") {
      navigate("/admin/login");
      return;
    }
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function loadStats() {
    try {
      setLoading(true);
      setError("");

      const [beritaData, aduanData, kontakData, aplikasiData] = await Promise.all([
        getBerita({ per_page: 1 }), // ambil total dari array length (fallback)
        getAduan({ per_page: 1 }),
        getKontak({ per_page: 1 }),
        getAplikasi(),
      ]);

      setStats({
        berita: Array.isArray(beritaData) ? beritaData.length : 0,
        aduan: Array.isArray(aduanData) ? aduanData.length : 0,
        kontak: Array.isArray(kontakData) ? kontakData.length : 0,
        aplikasi: Array.isArray(aplikasiData) ? aplikasiData.length : 0,
      });
    } catch (err) {
      console.error("Gagal memuat statistik:", err);
      setError("Gagal memuat statistik. Pastikan backend berjalan dan CORS diizinkan.");
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    logout?.();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Admin</h1>
          <p className="text-sm text-slate-500">Statistik ringkas data portal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-slate-500">Memuat statistik...</div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              title="Berita"
              value={stats.berita}
              icon={<Globe size={20} />}
              accent="bg-blue-600"
            />
            <StatCard
              title="Aduan"
              value={stats.aduan}
              icon={<MessageSquare size={20} />}
              accent="bg-green-600"
            />
            <StatCard
              title="Kontak"
              value={stats.kontak}
              icon={<Mail size={20} />}
              accent="bg-amber-600"
            />
            <StatCard
              title="Aplikasi"
              value={stats.aplikasi}
              icon={<BarChart size={20} />}
              accent="bg-indigo-600"
            />
          </div>
        )}

        <div className="mt-8 bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Catatan</h2>
          <p className="text-sm text-slate-600">
            Jika ada data yang tidak tampil, periksa koneksi backend atau konfigurasi CORS di server Laravel.
          </p>
        </div>
      </div>
    </div>
  );
}
