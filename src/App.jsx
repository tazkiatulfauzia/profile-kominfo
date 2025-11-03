// src/App.jsx
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";

// Import semua halaman
import Beranda from "./pages/Beranda";
import Profil from "./pages/Profil";
import Infrastruktur from "./pages/Infrastruktur";
import Aplikasi from "./pages/Aplikasi";
import Berita from "./pages/Berita";
import Aduan from "./pages/Aduan";
import Kontak from "./pages/Kontak";
import Account from "./pages/Account";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const menus = [
    { name: "Beranda", path: "/" },
    { name: "Aduan", path: "/aduan" },
    { name: "Aplikasi", path: "/aplikasi" },
    { name: "Berita", path: "/berita" },
    { name: "Infrastruktur", path: "/infrastruktur" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar menus={menus} />

      {/* ✅ Konten halaman */}
      <main className="flex-1 pt-[100px] pb-[150px]">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/dashboard" element={<Beranda />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/aplikasi" element={<Aplikasi />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/aduan" element={<Aduan />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/account" element={<Account />} />
          {/* Route login admin tersembunyi - tidak muncul di menu */}
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </main>

      {/* ✅ Footer selalu tampil */}
      <Footer />
    </div>
  );
}

export default App;
