"use client";
const { createContext, useState } = require("react");

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");
  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <body className={`${mode}`}>{children}</body>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
