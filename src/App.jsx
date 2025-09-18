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
import InformasiPublik from "./pages/InformasiPublik";
import Aduan from "./pages/Aduan";
import Literasi from "./pages/Literasi";
import Kontak from "./pages/Kontak";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Account from "./pages/Account";

function App() {
  const menus = [
    { name: "Beranda", path: "/" },
    { name: "Aduan", path: "/aduan" },
    { name: "Aplikasi", path: "/aplikasi" },
    { name: "Berita", path: "/berita" },
    { name: "Informasi Publik", path: "/informasi-publik" },
    { name: "Infrastruktur", path: "/infrastruktur" },
    { name: "Kontak", path: "/kontak" },
    { name: "Literasi", path: "/literasi" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar menus={menus} />

      {/* ✅ Konten halaman */}
      <main className="flex-1 pt-[136px] pb-[150px]">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/dashboard" element={<Beranda />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/infrastruktur" element={<Infrastruktur />} />
          <Route path="/aplikasi" element={<Aplikasi />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/informasi-publik" element={<InformasiPublik />} />
          <Route path="/aduan" element={<Aduan />} />
          <Route path="/literasi" element={<Literasi />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>

      {/* ✅ Footer selalu tampil */}
      <Footer />
    </div>
  );
}

export default App;
