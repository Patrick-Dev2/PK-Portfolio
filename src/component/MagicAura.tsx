import React from "react";
import "./MagicAura.css";

const glowPositions = [
  { top: "10%", left: "10%" },
  { top: "10%", left: "85%" },
  { top: "35%", left: "40%" },
  { top: "60%", left: "85%" },
  { top: "80%", left: "20%" },
  { top: "90%", left: "60%" },
  { top: "60%", left: "55%" },
  { top: "70%", left: "10%" },
];

const MagicAura: React.FC = () => {
  return (
    <div className="magic-aura-root pointer-events-none fixed inset-0 overflow-visible z-10">
      {glowPositions.map((pos, i) => (
        <img
          key={i}
          src="/brillonobg.png"
          style={{ position: "absolute", top: pos.top, left: pos.left }}
          className={`aura-glow animate-float-${i % 4}`}
          alt={`Magic Glow ${i}`}
        />
      ))}
    </div>
  );
};

export default MagicAura;
