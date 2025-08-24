import React from "react";
import { useTheme } from "./ThemeContext";

const ThemeToggleButton = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "10px 20px",
        borderRadius: "6px",
        border: "1px solid gray",
        cursor: "pointer",
        background: isDark ? "#333" : "#eee",
        color: isDark ? "#fff" : "#000"
      }}
    >
      {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggleButton;
