import React from "react";
import { ThemeContextProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./component/Navbar";
import HeroSection from "./component/HeroSection";

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <LanguageProvider>
        <div className="App">
          <Navbar />
          <HeroSection />
        </div>
      </LanguageProvider>
    </ThemeContextProvider>
  );
};

export default App;
