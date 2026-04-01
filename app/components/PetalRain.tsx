"use client";
import { useMemo } from "react";
import Petal from "./Petal";
import { triggerConfetti } from "../components/Confettiburst";
// ─── Petals Rain ───────────────────────────────────────────────────────────
export function PetalRain({ isBug }: { isBug?: boolean }) {
  const COLORS = useMemo(
    () =>
      isBug
        ? ["#9999", "#8888", "#7777", "#1111"]
        : ["#f9a8c4", "#f472b6", "#fda4af", "#fbcfe8"],
    [isBug],
  );

  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        // eslint-disable-next-line react-hooks/purity
        left: `${Math.random() * 100}%`,
        // eslint-disable-next-line react-hooks/purity
        animationDuration: `${6 + Math.random() * 8}s`,
        // eslint-disable-next-line react-hooks/purity
        animationDelay: `${Math.random() * 10}s`,
        // eslint-disable-next-line react-hooks/purity
        width: `${16 + Math.random() * 20}px`,
        // eslint-disable-next-line react-hooks/purity
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        // eslint-disable-next-line react-hooks/purity
        fontSize: `${16 + Math.random() * 20}px`,
      })),
    [COLORS], // ← 空陣列，只跑一次
  );

  return (
    <div className="petal-container" aria-hidden="true">
      {petals.map((p) => (
        <Petal
          className={`${isBug ? "is-bugcard bug-6" : ""}`}
          key={p.id}
          onClick={(e) => {
            triggerConfetti(e.clientX, e.clientY);
            console.log("Petal clicked! Triggering confetti...");
          }}
          style={{
            cursor: "pointer",
            left: p.left,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            width: p.fontSize,
            color: p.color,
          }}
        />
      ))}
    </div>
  );
}

export default PetalRain;
