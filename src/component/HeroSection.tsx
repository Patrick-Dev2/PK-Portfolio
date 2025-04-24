import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import "./HeroSection.css";
const HeroSection: React.FC = () => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const [boxImage, setBoxImage] = useState("/pedro.jpg");
  const [animationDone, setAnimationDone] = useState(false);
  useEffect(() => {
    const moveTimeout = setTimeout(() => {
      setBoxImage("/hisoka.jpg");
      setAnimationDone(true);
    }, 3100);
    return () => clearTimeout(moveTimeout);
  }, []);
  const texts = {
    ES: {
      intro: "Hola a todos, soy",
      welcome: "Bienvenido a mi portafolio",
      download: "Descarga CV",
      name: "Patricio Contreras",
    },
    EN: {
      intro: "Hello everyone, I am",
      welcome: "Welcome to my portfolio",
      download: "Download CV",
      name: "Patrick Contreras",
    },
  };
  return (
    <section
      className={`hero-section ${darkMode ? "hero-dark" : "hero-light"}`}
      style={{
        backgroundImage: `url(${
          darkMode ? "/escritorio.jpeg" : "/escritoriodia.png"
        })`,
      }}
    >
      <div className="hero-content">
        <div className="content-wrapper">
          <div className="hero-texts">
            <p className="intro text-bubble">{texts[language].intro}</p>
            <p className="profession">
              <span className="highlight-name">
                <span className="typewriter">{texts[language].name}</span>
              </span>
            </p>
            <p className="welcome text-bubble">{texts[language].welcome}</p>
          </div>
          <div className="hero-actions">
            <div className="hero-buttons">
              <button className="btn-cv">{texts[language].download}</button>
            </div>
            <div className="hero-social flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/instaicon.svg" alt="Instagram" className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/linkicon.svg" alt="LinkedIn" className="w-6 h-6" />
              </a>
              <a href="https://github.com/tu-usuario" className="icon-github">
                <img src="giticon.svg" alt="GitHub" />
              </a>
            </div>
          </div>
        </div>
        <div
          className={`moving-box-container ${
            animationDone ? "final-position" : "start-animation"
          }`}
        >
          <div
            className="flip-box"
            style={{
              backgroundImage: `url(${boxImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: animationDone ? "30px" : "50%",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
