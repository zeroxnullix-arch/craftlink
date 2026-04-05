import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    const allElements = document.querySelectorAll("*");
    allElements.forEach((el) => {
      el.classList.add("transition");
      setTimeout(() => el.classList.remove("transition"), 500);
    });
  }, [darkMode]);
  useEffect(() => {
    const syncTheme = (e) => {
      if (e.key === "theme") {
        setDarkMode(e.newValue === "dark");
      }
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
