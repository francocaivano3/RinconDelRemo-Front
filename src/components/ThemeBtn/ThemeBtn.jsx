import { useContext } from "react";
//import { Sun, Moon } from "lucide-react";
//import { ThemeContext } from "../../context/themeContext/ThemeContext";

const ThemeBtn = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className={
        isDark
          ? "p-4 rounded-full bg-[#00a8e8] text-yellow-300 fixed bottom-4 left-4 transition-all duration-500 shadow-xl hover:scale-105 cursor-pointer"
          : "transition-all duration-500 fixed bottom-4 left-4 p-4 rounded-full bg-black text-white shadow-xl hover:scale-105 cursor-pointer"
      }
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeBtn;
