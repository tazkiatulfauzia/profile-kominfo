import { Link, useLocation } from "react-router-dom";

export default function Navbar({ menus }) {
  const location = useLocation();

  return (
    <nav className="hidden md:block w-full bg-white/95 backdrop-blur-sm fixed top-[72px] left-0 right-0 z-30 shadow-sm border-b border-[#003366]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ul className="flex justify-center gap-8 py-3">
          {menus.map((menu, index) => {
            const isActive = location.pathname === menu.path;

            return (
              <li key={index} className="relative group">
                <Link
                  to={menu.path}
                  className={`relative inline-block px-1 py-2 text-sm font-semibold text-[#003366] transition-all duration-300 ${
                    isActive
                      ? "text-[#0055aa]"
                      : "hover:text-[#0055aa] text-[#555]"
                  }`}
                >
                  {menu.name}
                  {/* Animated underline for active menu */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003366] to-[#0055aa] transition-all duration-300 ${
                      isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                    }`}
                  />
                  {/* Hover effect */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0055aa]/50 to-[#003366]/50 transition-all duration-300 ${
                      !isActive ? "group-hover:scale-x-100 group-hover:opacity-100 scale-x-0 opacity-0" : ""
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
