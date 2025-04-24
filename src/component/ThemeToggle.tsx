import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

interface ThemeToggleProps {
  language: "ES" | "EN";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ language }) => {
  const { darkMode, toggleTheme } = useTheme();

  const label = darkMode
    ? language === "ES"
      ? "Noche"
      : "Night"
    : language === "ES"
    ? "Día"
    : "Day";

  return (
    <button
      className={`theme-toggle-btn ${darkMode ? "dark" : "light"}`}
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      <div className="toggle-thumb">{darkMode ? "🌙" : "☀️"}</div>
      <span className="toggle-text">{label}</span>
    </button>
  );
};

export default ThemeToggle;
