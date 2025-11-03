import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Shield, Lock, Mail, Eye, EyeOff, CheckCircle, Home } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await login(email.trim(), password);
    
    if (res.ok) {
      // Tampilkan success message dengan button ke beranda
      setLoginSuccess(true);
      setLoading(false);
    } else {
      setError(res.message || "Login gagal");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] via-white to-[#f0f7ff] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header - Simpel dan profesional */}
          <div className="bg-gradient-to-r from-[#003366] to-[#004488] p-8 text-white text-center border-b-4 border-[#0055aa]">
            <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto mb-5 flex items-center justify-center shadow-lg">
              <Shield className="text-[#003366]" size={40} />
            </div>
            <h1 className="text-2xl font-bold mb-2 tracking-tight">Portal Administrator</h1>
            <p className="text-blue-100 text-sm font-medium">Dinas Komunikasi dan Informatika</p>
            <p className="text-blue-200 text-xs mt-1">Kota Bukittinggi</p>
          </div>

          {/* Success Message */}
          {loginSuccess && (
            <div className="p-8">
              <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6 text-center">
                <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-green-800 mb-2">Login Berhasil!</h3>
                <p className="text-green-700 mb-6">Anda telah berhasil login sebagai administrator.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#003366] to-[#004488] hover:from-[#002244] hover:to-[#003366] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Home size={20} />
                    Ke Beranda
                  </Link>
                  <Link
                    to="/account"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#003366] text-[#003366] rounded-lg font-semibold hover:bg-[#003366] hover:text-white transition-all duration-200"
                  >
                    <Shield size={20} />
                    Panel Admin
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Form - Bersih dan formal */}
          {!loginSuccess && (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-r-lg text-sm font-medium">
                  <strong>Error:</strong> {error}
                </div>
              )}

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Email Administrator
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="text-[#003366]" size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@kominfo.go.id"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none transition text-gray-800 font-medium placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-[#003366]" size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan password"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none transition text-gray-800 font-medium placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#003366] transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#003366] to-[#004488] hover:from-[#002244] hover:to-[#003366] text-white py-4 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
            </form>
          )}

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600 font-medium">
              Halaman ini khusus untuk administrator yang berwenang
            </p>
            <p className="text-xs text-gray-500 mt-1">
              © {new Date().getFullYear()} Diskominfo Kota Bukittinggi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

