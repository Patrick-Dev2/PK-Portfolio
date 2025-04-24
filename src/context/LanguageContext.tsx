import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "ES" | "EN";

interface LanguageContextType {
  language: Language;
  toggleLanguage: (forcedLang?: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem("language") as Language) || "ES"
  );

  const toggleLanguage = (forcedLang?: Language) => {
    const newLang = forcedLang ? forcedLang : language === "ES" ? "EN" : "ES";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
