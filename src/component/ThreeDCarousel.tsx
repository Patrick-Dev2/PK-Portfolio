// ThreeDCarousel.tsx
import React, { useState, useEffect, useCallback, memo } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import "./ThreeDCarousel.css";

const projects = [
  { link: "https://www.termical.cl", bgClass: "project-0" },
  { link: "#", bgClass: "project-1" },
  { link: "#", bgClass: "project-2" },
  { link: "#", bgClass: "project-3" },
  { link: "#", bgClass: "project-4" },
] as const;

const AUTOPLAY_MS = 5000;

const ThreeDCarousel: React.FC = () => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();

  const [step, setStep] = useState(0);
  const total = projects.length;
  const angle = 360 / total;

  // autoplay reiniciable
  useEffect(() => {
    const id = setTimeout(() => setStep((s) => s + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [step]);

  // avanza al volver visible
  useEffect(() => {
    const onVisible = () => !document.hidden && setStep((s) => s + 1);
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  const change = useCallback((d: number) => setStep((s) => s + d), []);

  // clic lateral: ignora tarjetas y botón
  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if ((e.target as HTMLElement).closest(".carousel3d-item")) return;
      const { left, width } = e.currentTarget.getBoundingClientRect();
      setStep((s) => s + (e.clientX - left < width / 2 ? -1 : 1));
    },
    []
  );

  const current = ((step % total) + total) % total;
  const btnText = language === "EN" ? "Visit" : "Visitar";
  const sectionClass = `carousel3d-section ${darkMode ? "dark" : "light"}`;

  return (
    <section className={sectionClass}>
      <h2 className="carousel3d-title">
        {language === "EN" ? "My Projects" : "Mis Proyectos"}
      </h2>

      <div className="carousel3d-wrapper" onClick={handleClick}>
        <div
          className="carousel3d-container"
          style={{ transform: `rotateY(${-step * angle}deg)` }}
        >
          {projects.map(({ link, bgClass }, i) => {
            const depth = i === current ? 0 : 400;
            return (
              <div
                key={bgClass}
                className={[
                  "carousel3d-item",
                  bgClass,
                  i === current ? "active scale" : "",
                  darkMode ? "dark" : "light",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  transform: `translate(-50%, -50%) rotateY(${
                    i * angle
                  }deg) translateZ(${depth}px)`,
                }}
              >
                <button
                  className="btn-cv"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    window.open(link, "_blank");
                  }}
                >
                  {btnText}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="carousel3d-controls">
        <button className="btn-cv carousel-control" onClick={() => change(-1)}>
          &larr;
        </button>
        <button className="btn-cv carousel-control" onClick={() => change(1)}>
          &rarr;
        </button>
      </div>
    </section>
  );
};

export default memo(ThreeDCarousel);
