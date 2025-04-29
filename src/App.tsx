import React from "react";
import { ThemeContextProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./component/Navbar";
import HeroSection from "./component/HeroSection";
import ThreeDCarousel from "./component/ThreeDCarousel";

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <LanguageProvider>
        <div className="App">
          <Navbar />
          <HeroSection />
          <ThreeDCarousel />
        </div>
      </LanguageProvider>
    </ThemeContextProvider>
  );
};

export default App;
