// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AdminLayout from "./components/AdminLayout";
import { useAuth } from "./context/AuthContext";

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
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const isAdminLayout = location.pathname.startsWith("/admin");
  
  // Halaman yang perlu admin layout (sidebar) jika user adalah admin
  const adminPages = ["/aplikasi", "/berita", "/aduan", "/kontak", "/account"];
  const needsAdminLayout = isAdmin && adminPages.includes(location.pathname);

  const menus = [
    { name: "Beranda", path: "/" },
    { name: "Aduan", path: "/aduan" },
    { name: "Aplikasi", path: "/aplikasi" },
    { name: "Berita", path: "/berita" },
    { name: "Kontak", path: "/kontak" },
  ];

  const renderHeader = !isAdminLayout && !needsAdminLayout;
  const renderFooter = !isAdminLayout && !needsAdminLayout;

  return (
    <div className="min-h-screen flex flex-col">
      {renderHeader && <Header />}

      <main className={renderHeader ? "flex-1 pt-[80px]" : "flex-1"}>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/profil" element={<Profil />} />
          <Route 
            path="/aplikasi" 
            element={needsAdminLayout ? <AdminLayout><Aplikasi /></AdminLayout> : <Aplikasi />} 
          />
          <Route 
            path="/berita" 
            element={needsAdminLayout ? <AdminLayout><Berita /></AdminLayout> : <Berita />} 
          />
          <Route 
            path="/aduan" 
            element={needsAdminLayout ? <AdminLayout><Aduan /></AdminLayout> : <Aduan />} 
          />
          <Route 
            path="/kontak" 
            element={needsAdminLayout ? <AdminLayout><Kontak /></AdminLayout> : <Kontak />} 
          />
          <Route 
            path="/account" 
            element={needsAdminLayout ? <AdminLayout><Account /></AdminLayout> : <Account />} 
          />
          {/* Admin area */}
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </main>

      {renderFooter && <Footer />}
    </div>
  );
}

export default App;
