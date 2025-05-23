import { useContext } from "react";
import { ThemeContext } from "../context/themeContext/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function ThemeBtn() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const location = useLocation();

  const toggleTheme = () => setIsDark(!isDark);

  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const bottomClass = isAuthPage ? "bottom-4" : "bottom-20";

  return (
    <div
      onClick={toggleTheme}
      className={`fixed ${bottomClass} left-4 p-4 rounded-full shadow-xl cursor-pointer transition-all duration-500
        ${isDark ? "bg-[#00a8e8] text-yellow-300" : "bg-black text-white hover:scale-105"}
      `}
    >
      {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </div>
  );
}
