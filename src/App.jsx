// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Import semua halaman
import Beranda from "./pages/Beranda";
import Profil from "./pages/Profil";
import Aplikasi from "./pages/Aplikasi";
import Berita from "./pages/Berita";
import Aduan from "./pages/Aduan";
import Kontak from "./pages/Kontak";
import Account from "./pages/Account";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();
  const isAdminLayout = location.pathname.startsWith("/admin");

  const menus = [
    { name: "Beranda", path: "/" },
    { name: "Aduan", path: "/aduan" },
    { name: "Aplikasi", path: "/aplikasi" },
    { name: "Berita", path: "/berita" },
    { name: "Kontak", path: "/kontak" },
  ];

  const renderHeader = !isAdminLayout;
  const renderFooter = !isAdminLayout;

  return (
    <div className="min-h-screen flex flex-col">
      {renderHeader && <Header />}

      <main className={renderHeader ? "flex-1 pt-[80px] pb-6" : "flex-1"}>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/dashboard" element={<Beranda />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/aplikasi" element={<Aplikasi />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/aduan" element={<Aduan />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/account" element={<Account />} />
          {/* Admin area */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      {renderFooter && <Footer />}
    </div>
  );
}

export default App;
