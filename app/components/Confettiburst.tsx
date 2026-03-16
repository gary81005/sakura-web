"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  shape: "rect" | "circle" | "strip";
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  gravity: number;
}

const COLORS = [
  "#ff6b9d",
  "#ffd93d",
  "#6bcb77",
  "#4d96ff",
  "#ff9a3c",
  "#c77dff",
  "#ff4d6d",
  "#00bbf9",
  "#ffb347",
  "#a8e6cf",
];

function createParticles(x: number, y: number): Particle[] {
  return Array.from({ length: 60 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 10 + 4;
    const shape = (["rect", "circle", "strip"] as const)[
      Math.floor(Math.random() * 3)
    ];
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - Math.random() * 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape,
      width: shape === "strip" ? Math.random() * 3 + 2 : Math.random() * 10 + 5,
      height:
        shape === "strip" ? Math.random() * 16 + 8 : Math.random() * 10 + 5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      gravity: Math.random() * 0.3 + 0.2,
    };
  });
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);

  if (p.shape === "circle") {
    ctx.beginPath();
    ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // rect or strip
    ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
  }
  ctx.restore();
}

export function ConfettiBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Match viewport size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(
        (p) => p.opacity > 0.02,
      );

      for (const p of particlesRef.current) {
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.013;
        drawParticle(ctx, p);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Expose trigger via custom event
  useEffect(() => {
    const handler = (e: CustomEvent<{ x: number; y: number }>) => {
      particlesRef.current.push(...createParticles(e.detail.x, e.detail.y));
    };
    window.addEventListener("confetti-burst", handler as EventListener);
    return () =>
      window.removeEventListener("confetti-burst", handler as EventListener);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

// ── Helper: call this anywhere to trigger a burst ──
export function triggerConfetti(x: number, y: number) {
  window.dispatchEvent(new CustomEvent("confetti-burst", { detail: { x, y } }));
}

export default ConfettiBurst;
