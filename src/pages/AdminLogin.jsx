import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.ok) {
        // Login berhasil, redirect ke admin dashboard
        navigate("/admin/dashboard");
      } else {
        setError("login gagal!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("login gagal!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-blue-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#003366] to-[#0055aa] text-white mb-4">
            <LogIn size={24} />
          </div>
          <h2 className="text-3xl font-bold text-[#003366] mb-2">Login Admin</h2>
          <p className="text-gray-600 text-sm">Masuk sebagai administrator</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border-2 border-blue-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none transition"
              placeholder="admin@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border-2 border-blue-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none transition"
              placeholder="Masukkan password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#003366] to-[#0055aa] hover:from-[#00224d] hover:to-[#004488] text-white font-semibold py-3 px-4 rounded-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Masuk</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Pastikan email dan password sudah terdaftar di Supabase Auth</p>
        </div>
      </div>
    </div>
  );
}
