
import React, { createContext, useState, useEffect } from "react";


export const ThemeContext = createContext();


const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const ThemeContextProvider = ThemeContext.Provider;
  return (
    <>
      <ThemeContextProvider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContextProvider>
    </>
  );
};
export default ThemeProvider;
