import { Link, useLocation } from "react-router-dom";

export default function Navbar({ menus }) {
  const location = useLocation();

  return (
    <nav className="hidden md:block w-full bg-[#d9e6ff] text-[#003366] fixed top-[64px] left-0 right-0 z-40 shadow">
      <ul className="flex justify-center gap-8 py-3">
        {menus.map((menu, index) => {
          const isActive = location.pathname === menu.path;

          return (
            <li key={index}>
              <Link
                to={menu.path}
                className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-[#c7d9ff] text-[#002244] shadow-sm"
                    : "hover:bg-[#e6f0ff] hover:text-[#002244]"
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
