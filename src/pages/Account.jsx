// src/pages/Account.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Shield, LogOut, Edit2, Mail, Lock, AppWindow, MessageCircle, Phone, Newspaper } from "lucide-react";
import { getAdmin, updateAdmin } from "../lib/admin";

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "Admin";
  const [adminData, setAdminData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Load admin data
  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  async function loadAdminData() {
    try {
      const data = await getAdmin();
      setAdminData(data);
      setForm({ email: data.email, password: "", confirmPassword: "" });
    } catch (error) {
      console.error("Gagal memuat data admin:", error);
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Validasi password
    if (form.password && form.password !== form.confirmPassword) {
      setMessage({ type: "error", text: "Password tidak cocok!" });
      setLoading(false);
      return;
    }

    try {
      const updateData = { email: form.email };
      if (form.password) {
        updateData.password = form.password;
      }

      await updateAdmin(user.id, updateData);
      setMessage({ type: "success", text: "Data admin berhasil diperbarui!" });
      setShowEditForm(false);
      await loadAdminData();
      
      // Reset password fields
      setForm({ ...form, password: "", confirmPassword: "" });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Gagal memperbarui data admin" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#003366] to-[#0055aa] rounded-t-2xl p-8 text-white text-center shadow-xl">
          <div className="bg-white p-4 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center shadow-lg">
            {isAdmin ? (
              <Shield className="text-[#003366]" size={48} />
            ) : (
              <User className="text-[#003366]" size={48} />
            )}
          </div>
          <h2 className="text-3xl font-bold mb-2">Pengaturan Akun</h2>
          <p className="text-blue-100">
            {isAdmin ? "Mode Administrator Aktif" : "Mode Pengunjung"}
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-b-2xl shadow-xl p-8 border-t-0">
          {isAdmin ? (
            <>
              {/* Admin Info */}
              <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-[#003366]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Shield className="text-[#003366]" size={24} />
                    <h3 className="text-xl font-bold text-[#003366]">Mode Administrator</h3>
                  </div>
                  <button
                    onClick={() => setShowEditForm(!showEditForm)}
                    className="p-2 text-[#003366] hover:bg-blue-200 rounded-lg transition"
                    title="Edit Data Admin"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>

                {!showEditForm ? (
                  <>
                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-[#003366]" />
                        <span><span className="font-semibold">Email:</span> {adminData?.email || user.email}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Role:</span>{" "}
                        <span className="bg-[#003366] text-white px-3 py-1 rounded-lg text-sm font-semibold">
                          {user.role}
                        </span>
                      </div>
                      {adminData?.created_at && (
                        <div className="text-xs text-gray-600 mt-3 pt-3 border-t border-blue-200">
                          Akun dibuat: {new Date(adminData.created_at).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Perhatian:</strong> Sebagai admin, Anda dapat mengelola berita, melihat aduan dan kontak yang masuk.
                      </p>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    {message.text && (
                      <div className={`p-3 rounded-lg text-sm ${
                        message.type === "success"
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}>
                        {message.text}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Admin
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password Baru (kosongkan jika tidak ingin mengubah)
                      </label>
                      <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="Masukkan password baru"
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none"
                      />
                    </div>

                    {form.password && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Konfirmasi Password Baru
                        </label>
                        <input
                          type="password"
                          value={form.confirmPassword}
                          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                          placeholder="Konfirmasi password baru"
                          className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none"
                        />
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-[#003366] to-[#0055aa] hover:from-[#00224d] hover:to-[#004488] text-white py-3 rounded-lg font-semibold shadow transition disabled:opacity-50"
                      >
                        {loading ? "Menyimpan..." : "Simpan Perubahan"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowEditForm(false);
                          setMessage({ type: "", text: "" });
                          loadAdminData();
                        }}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
                      >
                        Batal
                      </button>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-800">
                        <strong>Catatan:</strong> Akun admin tidak dapat dihapus. Anda hanya dapat mengubah email dan password.
                      </p>
                    </div>
                  </form>
                )}
              </div>

              {/* Admin Quick Links */}
              <div className="mb-6 p-6 bg-gradient-to-r from-[#003366]/5 to-[#0055aa]/5 rounded-xl border border-[#003366]/20">
                <h3 className="text-lg font-bold text-[#003366] mb-4">Menu Admin</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/aplikasi"
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-blue-200 hover:border-[#003366] hover:shadow-md transition text-center"
                  >
                    <AppWindow className="text-[#003366] mb-2" size={24} />
                    <span className="text-sm font-semibold text-[#003366]">Aplikasi</span>
                  </Link>
                  <Link
                    to="/aduan"
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-blue-200 hover:border-[#003366] hover:shadow-md transition text-center"
                  >
                    <MessageCircle className="text-[#003366] mb-2" size={24} />
                    <span className="text-sm font-semibold text-[#003366]">Aduan</span>
                  </Link>
                  <Link
                    to="/kontak"
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-blue-200 hover:border-[#003366] hover:shadow-md transition text-center"
                  >
                    <Phone className="text-[#003366] mb-2" size={24} />
                    <span className="text-sm font-semibold text-[#003366]">Kontak</span>
                  </Link>
                  <Link
                    to="/berita"
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-blue-200 hover:border-[#003366] hover:shadow-md transition text-center"
                  >
                    <Newspaper className="text-[#003366] mb-2" size={24} />
                    <span className="text-sm font-semibold text-[#003366]">Berita</span>
                  </Link>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
                >
                  <LogOut size={20} />
                  Keluar dari Akun Admin
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Visitor Mode */}
              <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <User className="text-gray-600" size={24} />
                  <h3 className="text-xl font-bold text-gray-800">Mode Pengunjung</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Anda sedang dalam mode pengunjung. Untuk mengakses fitur admin, silakan login menggunakan kredensial administrator.
                </p>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 mb-3">
                    <strong>Info:</strong> Halaman login admin tersembunyi dan hanya dapat diakses oleh administrator yang berwenang.
                  </p>
                  <p className="text-xs text-blue-700">
                    Hubungi administrator sistem untuk mendapatkan akses login.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
