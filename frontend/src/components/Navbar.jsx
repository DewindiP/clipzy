import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiOutlineHome, AiOutlineUpload, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { icon: AiOutlineHome, label: "Home", path: "/" },
  { icon: AiOutlineUpload, label: "Upload", path: "/upload" },
  { icon: AiOutlineUser, label: "Profile", path: "/profile" }
];

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={
        `fixed top-0 left-0 h-screen w-[120px] flex flex-col items-start justify-between z-[1000] py-6 bg-white dark:bg-neutral-900 shadow-[0_0_16px_rgba(0,0,0,0.04)]`
      }
    >
      <div className="w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`group appearance-none border-none w-full flex flex-col items-center text-[2rem] my-6 cursor-pointer transition-colors duration-200 font-montserrat font-medium bg-transparent focus:outline-none ${theme === "dark" ? "text-white" : "text-gray-900"} hover:text-[#e53935]`}
              aria-label={item.path}
              type="button"
            >
              <Icon size={20} />
              <span className="text-[0.75rem] font-medium mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="w-full flex flex-col items-center gap-3">
        <button
          onClick={toggleTheme}
          className={`appearance-none border-none rounded-full p-2.5 mb-3 text-[1.7rem] cursor-pointer transition-colors duration-200 bg-transparent focus:outline-none ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          aria-label="Toggle theme"
          type="button"
        >
          {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        <button
          onClick={handleLogout}
          className={`appearance-none border-none rounded-[12px] px-4 py-2 mb-3 text-[1.7rem] cursor-pointer transition-colors duration-200 w-full flex flex-col items-center font-montserrat font-medium bg-transparent focus:outline-none ${theme === "dark" ? "text-white" : "text-gray-900"} hover:text-[#e53935]`}
          aria-label="Logout"
          type="button"
        >
          <AiOutlineLogout size={20} />
          <span className="text-[1rem] font-small mt-1">Logout</span>
        </button>
      </div>
    </nav>
  );
}
