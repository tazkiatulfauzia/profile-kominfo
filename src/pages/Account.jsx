// src/pages/Account.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, User } from "lucide-react";

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  const maskPassword = (pwd) => "•".repeat(pwd?.length || 8);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-[#d9e6ff] rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header dengan avatar */}
        <div className="bg-[#003366] h-20 flex items-center justify-center relative">
          <div className="absolute -bottom-8 flex justify-center w-full">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <User className="text-[#003366]" size={44} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 pt-12 pb-8">
          <h2 className="text-2xl font-bold text-center text-[#003366] mb-6">
            Akun Saya
          </h2>

          <div className="space-y-5">
            <div>
              <div className="text-sm text-gray-500">Nama</div>
              <div className="font-medium text-[#002244] bg-gray-50 p-2 rounded-lg">
                {user.name}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Role</div>
              <div className="font-medium text-[#002244] bg-gray-50 p-2 rounded-lg">
                {user.role}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium text-[#002244] bg-gray-50 p-2 rounded-lg">
                {user.email}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Password</div>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <span className="font-medium text-[#002244]">
                  {showPassword ? user.password : maskPassword(user.password)}
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-600 hover:text-[#003366] transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Tombol Logout */}
          <div className="mt-8">
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="w-full bg-[#003366] hover:bg-[#002244] text-white py-3 rounded-xl font-semibold transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
