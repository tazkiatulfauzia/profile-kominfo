import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";

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

function App() {
  return (
    <>
      <Header />
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
      </Routes>
    </>
  );
}

export default App;
