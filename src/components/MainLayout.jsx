import React from "react";
import Topbar from "./Header/Topbar";
import Header from "./Header/Header";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
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
      {/* Bagian atas */}
      <Topbar />
      <Header />
      <Navbar menus={menus} />

      {/* Konten halaman */}
      <main className="flex-1 pt-[160px]"> 
        {/* ✅ atur tinggi sesuai total tinggi Topbar+Header+Navbar */}
        <Outlet />
      </main>

      {/* Footer selalu ada */}
      <Footer />
    </div>
  );
}
