import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
};

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedDarkMode = localStorage.getItem("darkMode");

    return storedDarkMode !== null ? storedDarkMode === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    document.body.style.backgroundColor = darkMode ? "#212529" : "#f8f9fa";

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
