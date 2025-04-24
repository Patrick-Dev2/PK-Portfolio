import React from "react";
import "./MagicAura.css";

const glowPositions = [
  "top-[10%] left-[10%]",
  "top-[10%] left-[70%]",
  "top-[40%] left-[40%]",
  "top-[60%] left-[80%]",
  "bottom-[20%] left-[20%]",
  "bottom-[10%] left-[60%]",
  "bottom-[40%] left-[75%]",
  "bottom-[30%] left-[10%]",
];

const MagicAura: React.FC = () => {
  return (
    <div className="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      {glowPositions.map((pos, i) => (
        <img
          key={i}
          src="/brillonobg.png"
          className={`absolute aura-glow animate-float-${i % 4} ${pos}`}
          alt="Magic Glow"
        />
      ))}
    </div>
  );
};

export default MagicAura;
