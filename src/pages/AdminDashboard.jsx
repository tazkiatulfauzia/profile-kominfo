import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getBerita } from "../lib/berita";
import { getAduan } from "../lib/aduan";
import { getKontak } from "../lib/kontak";
import { getAplikasi } from "../lib/aplikasi";
import { BarChart, MessageSquare, Mail, Globe, LogOut, Home, User, Box, Newspaper, MessageCircle, Phone, X } from "lucide-react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Sidebar untuk admin - mirip dengan sidebar biasa
function AdminSidebar({ onLogout }) {
  const navItems = [
    { name: "Beranda", path: "/admin/dashboard", icon: <Home size={20} /> },
    { name: "Akun", path: "/account", icon: <User size={20} /> },
    { name: "Aplikasi", path: "/aplikasi", icon: <Box size={20} /> },
    { name: "Berita", path: "/berita", icon: <Newspaper size={20} /> },
    { name: "Aduan", path: "/aduan", icon: <MessageCircle size={20} /> },
    { name: "Kontak", path: "/kontak", icon: <Phone size={20} /> },
  ];

  return (
    <aside className="w-64 bg-[#e6f0ff] text-[#003366] min-h-screen shadow-xl">
      <div className="flex items-center justify-between px-4 h-20 border-b border-[#cfdff5]">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-left text-sm leading-tight font-semibold text-[#003366]">
            Dinas Komunikasi dan Informatika
            <br />
            Kota Bukittinggi
          </span>
        </div>
      </div>

      <nav className="p-4">
        {navItems.map(({ name, path, icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded transition-colors text-sm ${
                isActive
                  ? "bg-[#ccd9f5] font-semibold border-l-4 border-[#FFB800] text-[#003366]"
                  : "hover:bg-[#d9e6ff] text-[#003366]"
              }`
            }
          >
            <span className="text-[#003366]">{icon}</span>
            <span className="text-[#003366]">{name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-6 border-t border-[#cfdff5]">
        <button
          onClick={onLogout}
          className="w-full text-left px-3 py-2 rounded hover:bg-[#ffd] transition bg-white border text-[#003366]"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

// Kartu statistik
function StatCard({ title, value, icon, accent }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 border border-slate-100 flex items-center gap-4 hover:shadow-lg transition-shadow">
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
  const [chartData, setChartData] = useState({
    berita: [],
    aduan: [],
    kontak: [],
    aplikasi: [],
  });
  const [chartLabels, setChartLabels] = useState({
    berita: [],
    aduan: [],
    kontak: [],
    aplikasi: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is admin - handle both localStorage and Supabase auth
    const checkAdmin = () => {
      if (user && user.role === "Admin") {
        return true;
      }
      // Fallback: check localStorage
      try {
        const adminData = localStorage.getItem("adminData");
        if (adminData) {
          const parsed = JSON.parse(adminData);
          return parsed.role === "Admin";
        }
      } catch (e) {
        console.error("Error checking admin:", e);
      }
      return false;
    };

    if (!checkAdmin()) {
      navigate("/");
      return;
    }
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  async function loadStats() {
    try {
      setLoading(true);
      setError("");

      const [beritaData, aduanData, kontakData, aplikasiData] = await Promise.all([
        getBerita({ per_page: 100 }),
        getAduan({ per_page: 100 }),
        getKontak({ per_page: 100 }),
        getAplikasi(),
      ]);

      const beritaArray = Array.isArray(beritaData) ? beritaData : [];
      const aduanArray = Array.isArray(aduanData) ? aduanData : [];
      const kontakArray = Array.isArray(kontakData) ? kontakData : [];
      const aplikasiArray = Array.isArray(aplikasiData) ? aplikasiData : [];

      setStats({
        berita: beritaArray.length,
        aduan: aduanArray.length,
        kontak: kontakArray.length,
        aplikasi: aplikasiArray.length,
      });

      // Prepare chart data - different periods for different charts
      const now = new Date();
      
      // Berita: per hari (7 hari terakhir)
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const dayStart = new Date(now);
        dayStart.setDate(now.getDate() - i);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayStart.getDate() + 1);
        days.push({
          start: dayStart,
          end: dayEnd,
          label: dayStart.toLocaleDateString("id-ID", { weekday: "short", day: "numeric" })
        });
      }

      // Aduan & Kontak: per minggu dalam bulan saat ini (4-5 minggu)
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
      
      // Hitung minggu dalam bulan (dari hari pertama bulan sampai hari terakhir)
      const weeks = [];
      let weekStart = new Date(firstDayOfMonth);
      weekStart.setHours(0, 0, 0, 0);
      let weekNumber = 1;
      
      while (weekStart <= lastDayOfMonth && weekNumber <= 5) {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        
        // Jika akhir minggu melebihi akhir bulan, set ke akhir bulan
        if (weekEnd > lastDayOfMonth) {
          weekEnd.setTime(lastDayOfMonth.getTime());
          weekEnd.setHours(23, 59, 59, 999);
        }
        
        const monthName = firstDayOfMonth.toLocaleDateString("id-ID", { month: "long" });
        weeks.push({
          start: new Date(weekStart),
          end: new Date(weekEnd),
          label: `Minggu ${weekNumber} ${monthName}`
        });
        
        // Pindah ke minggu berikutnya (7 hari setelah weekStart)
        weekStart = new Date(weekStart);
        weekStart.setDate(weekStart.getDate() + 7);
        weekNumber++;
      }

      // Aplikasi: per bulan (6 bulan terakhir)
      const months = [];
      for (let i = 5; i >= 0; i--) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
        months.push({
          start: monthStart,
          end: nextMonth,
          label: monthStart.toLocaleDateString("id-ID", { month: "short", year: "numeric" })
        });
      }

      const groupByDay = (data, dateField = "created_at") => {
        return days.map((day) => {
          return data.filter((item) => {
            if (!item[dateField]) return false;
            const itemDate = new Date(item[dateField]);
            return itemDate >= day.start && itemDate < day.end;
          }).length;
        });
      };

      const groupByWeek = (data, dateField = "created_at") => {
        return weeks.map((week) => {
          return data.filter((item) => {
            if (!item[dateField]) return false;
            const itemDate = new Date(item[dateField]);
            return itemDate >= week.start && itemDate < week.end;
          }).length;
        });
      };

      const groupByMonth = (data, dateField = "created_at") => {
        return months.map((month) => {
          return data.filter((item) => {
            if (!item[dateField]) return false;
            const itemDate = new Date(item[dateField]);
            return itemDate >= month.start && itemDate < month.end;
          }).length;
        });
      };

      setChartData({
        berita: groupByDay(beritaArray),
        aduan: groupByWeek(aduanArray),
        kontak: groupByWeek(kontakArray),
        aplikasi: groupByMonth(aplikasiArray),
      });
      
      setChartLabels({
        berita: days.map(d => d.label),
        aduan: weeks.map(w => w.label),
        kontak: weeks.map(w => w.label),
        aplikasi: months.map(m => m.label),
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
    navigate("/");
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
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              <Link to="/berita" className="cursor-pointer transform transition hover:scale-105">
                <StatCard
                  title="Berita"
                  value={stats.berita}
                  icon={<Globe size={20} />}
                  accent="bg-blue-600"
                />
              </Link>
              <Link to="/aduan" className="cursor-pointer transform transition hover:scale-105">
                <StatCard
                  title="Aduan"
                  value={stats.aduan}
                  icon={<MessageSquare size={20} />}
                  accent="bg-green-600"
                />
              </Link>
              <Link to="/kontak" className="cursor-pointer transform transition hover:scale-105">
                <StatCard
                  title="Kontak"
                  value={stats.kontak}
                  icon={<Mail size={20} />}
                  accent="bg-amber-600"
                />
              </Link>
              <Link to="/aplikasi" className="cursor-pointer transform transition hover:scale-105">
                <StatCard
                  title="Aplikasi"
                  value={stats.aplikasi}
                  icon={<BarChart size={20} />}
                  accent="bg-indigo-600"
                />
              </Link>
            </div>

            {/* Charts Section */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {/* Grafik Aduan */}
              <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Grafik Aduan</h3>
                <Bar
                  data={{
                    labels: chartLabels.aduan,
                    datasets: [
                      {
                        label: "Jumlah Aduan",
                        data: chartData.aduan,
                        backgroundColor: "rgba(16, 185, 129, 0.9)",
                        borderColor: "rgba(5, 150, 105, 1)",
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      y: { 
                        beginAtZero: true,
                        max: 30,
                        ticks: {
                          stepSize: 1
                        }
                      },
                    },
                  }}
                />
              </div>

              {/* Grafik Aplikasi */}
              <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Grafik Aplikasi</h3>
                <Line
                  data={{
                    labels: chartLabels.aplikasi,
                    datasets: [
                      {
                        label: "Jumlah Aplikasi",
                        data: chartData.aplikasi,
                        borderColor: "rgba(99, 102, 241, 1)",
                        backgroundColor: "rgba(99, 102, 241, 0.1)",
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      y: { 
                        beginAtZero: true,
                        max: 30,
                        ticks: {
                          stepSize: 1
                        }
                      },
                    },
                  }}
                />
              </div>

              {/* Grafik Berita */}
              <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Grafik Berita</h3>
                <Bar
                  data={{
                    labels: chartLabels.berita,
                    datasets: [
                      {
                        label: "Jumlah Berita",
                        data: chartData.berita,
                        backgroundColor: "rgba(37, 99, 235, 0.6)",
                        borderColor: "rgba(37, 99, 235, 1)",
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      y: { 
                        beginAtZero: true,
                        max: 30,
                        ticks: {
                          stepSize: 1
                        }
                      },
                    },
                  }}
                />
              </div>

              {/* Grafik Kontak */}
              <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Grafik Kontak</h3>
                <div className="flex justify-center">
                  <div style={{ width: '60%', maxWidth: '250px' }}>
                    <Doughnut
                      data={{
                        labels: chartLabels.kontak,
                        datasets: [
                          {
                            label: "Jumlah Kontak",
                            data: chartData.kontak,
                            backgroundColor: [
                              "rgba(245, 158, 11, 0.9)",
                              "rgba(251, 146, 60, 0.9)",
                              "rgba(252, 211, 77, 0.9)",
                              "rgba(253, 186, 116, 0.9)",
                              "rgba(254, 215, 170, 0.9)",
                              "rgba(255, 237, 213, 0.9)",
                            ],
                            borderColor: [
                              "rgba(245, 158, 11, 1)",
                              "rgba(251, 146, 60, 1)",
                              "rgba(252, 211, 77, 1)",
                              "rgba(253, 186, 116, 1)",
                              "rgba(254, 215, 170, 1)",
                              "rgba(255, 237, 213, 1)",
                            ],
                            borderWidth: 2,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                          legend: {
                            position: "bottom",
                            labels: {
                              font: {
                                size: 11
                              },
                              padding: 8
                            }
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
