// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    const res = login(email.trim(), password);
    if (res.ok) {
      navigate("/account");
    } else {
      setErr(res.message || "Login gagal");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#d9e6ff] px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-[#003366] mb-6">Login</h2>

        {err && <div className="mb-4 text-sm text-red-600">{err}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#003366] focus:outline-none"
              placeholder="Masukkan email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#003366] focus:outline-none"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#003366] hover:bg-[#002244] text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-[#003366] font-semibold underline ml-1"
          >
            Buat akun
          </button>
        </div>
      </div>
    </div>
  );
}
