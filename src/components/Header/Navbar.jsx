import { Link, useLocation } from "react-router-dom";

export default function Navbar({ menus }) {
  const location = useLocation();

  return (
    <nav className="hidden md:block w-full bg-gradient-to-r from-[#003366] to-[#004488] text-white fixed top-[56px] left-0 right-0 z-30 shadow-md border-b border-[#0055aa]/30">
      <ul className="flex justify-center gap-1 py-2 max-w-7xl mx-auto">
        {menus.map((menu, index) => {
          const isActive = location.pathname === menu.path;

          return (
            <li key={index}>
              <Link
                to={menu.path}
                className={`px-5 py-2 rounded-md font-medium text-xs transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#003366] shadow-md font-semibold"
                    : "hover:bg-[#0055aa] hover:text-white text-blue-100"
                }`}
              >
                {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
