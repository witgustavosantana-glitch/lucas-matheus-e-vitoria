import React, { useEffect, useRef } from "react";

interface SmartAmbientParticlesProps {
  particleType: "fireflies" | "snow" | "dust" | "leaves" | "ripples";
  glowColor?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
  angle: number;
  angularSpeed: number;
  color: string;
  maxSize?: number;
}

export const SmartAmbientParticles: React.FC<SmartAmbientParticlesProps> = ({
  particleType,
  glowColor = "rgba(16, 185, 129, 0.4)"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle Palette Presets
    const particleColors = {
      fireflies: ["#34d399", "#10b981", "#a3e635", "#fde047"],
      snow: ["#ffffff", "#e0f2fe", "#bae6fd", "#7dd3fc"],
      dust: ["#fbbf24", "#f59e0b", "#fb923c", "#fde68a"],
      leaves: ["#84cc16", "#65a30d", "#a3e635", "#4d7c0f"],
      ripples: ["#22d3ee", "#38bdf8", "#2dd4bf", "#67e8f9"]
    };

    const currentPalette = particleColors[particleType] || particleColors.fireflies;
    const count = particleType === "ripples" ? 18 : 36;
    const particles: Particle[] = [];

    const initParticle = (p?: Partial<Particle>): Particle => {
      const color = currentPalette[Math.floor(Math.random() * currentPalette.length)];
      if (particleType === "fireflies") {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.35,
          size: 1.5 + Math.random() * 2.5,
          alpha: 0.15 + Math.random() * 0.7,
          alphaSpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
          angle: 0,
          angularSpeed: 0,
          color,
          ...p
        };
      } else if (particleType === "snow") {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: 0.5 + Math.random() * 1.1,
          size: 1.2 + Math.random() * 2.4,
          alpha: 0.3 + Math.random() * 0.6,
          alphaSpeed: 0,
          angle: Math.random() * Math.PI * 2,
          angularSpeed: (Math.random() - 0.5) * 0.01,
          color,
          ...p
        };
      } else if (particleType === "dust") {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0.2 + Math.random() * 0.4,
          vy: (Math.random() - 0.5) * 0.25,
          size: 1.0 + Math.random() * 2.0,
          alpha: 0.15 + Math.random() * 0.55,
          alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          angle: 0,
          angularSpeed: 0,
          color,
          ...p
        };
      } else if (particleType === "leaves") {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0.3 + Math.random() * 0.5,
          vy: 0.6 + Math.random() * 0.8,
          size: 3.5 + Math.random() * 4,
          alpha: 0.25 + Math.random() * 0.55,
          alphaSpeed: 0,
          angle: Math.random() * Math.PI * 2,
          angularSpeed: (Math.random() - 0.5) * 0.04,
          color,
          ...p
        };
      } else {
        // ripples
        return {
          x: Math.random() * width,
          y: height * 0.45 + Math.random() * (height * 0.55),
          vx: (Math.random() - 0.5) * 0.1,
          vy: 0,
          size: 4 + Math.random() * 8,
          maxSize: 32 + Math.random() * 30,
          alpha: 0.65,
          alphaSpeed: -0.008 - Math.random() * 0.006,
          angle: 0,
          angularSpeed: 0,
          color,
          ...p
        };
      }
    };

    for (let i = 0; i < count; i++) {
      particles.push(initParticle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (particleType === "fireflies") {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += p.alphaSpeed;

          if (p.alpha > 0.85 || p.alpha < 0.15) {
            p.alphaSpeed = -p.alphaSpeed;
          }

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Radial glow for firefly
          const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
          radGrad.addColorStop(0, p.color);
          radGrad.addColorStop(0.35, p.color);
          radGrad.addColorStop(1, "rgba(0,0,0,0)");

          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          ctx.fillStyle = radGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.65, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

        } else if (particleType === "snow") {
          p.y += p.vy;
          p.x += Math.sin(p.angle) * 0.5 + p.vx;
          p.angle += 0.02;

          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "#e0f2fe";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

        } else if (particleType === "dust") {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += p.alphaSpeed;
          if (p.alpha > 0.75 || p.alpha < 0.1) {
            p.alphaSpeed = -p.alphaSpeed;
          }

          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#fb923c";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

        } else if (particleType === "leaves") {
          p.y += p.vy;
          p.x += Math.sin(p.angle) * 0.8 + p.vx;
          p.angle += p.angularSpeed;

          if (p.y > height) {
            p.y = -15;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) p.x = -20;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;

          // Draw slender bamboo leaf shape
          ctx.beginPath();
          ctx.moveTo(-p.size * 1.5, 0);
          ctx.quadraticCurveTo(0, -p.size * 0.6, p.size * 1.5, 0);
          ctx.quadraticCurveTo(0, p.size * 0.6, -p.size * 1.5, 0);
          ctx.fill();
          ctx.restore();

        } else if (particleType === "ripples") {
          p.size += 0.45;
          p.alpha += p.alphaSpeed;

          if (p.alpha <= 0 || (p.maxSize && p.size >= p.maxSize)) {
            // Re-seed ripple at random water point
            particles[i] = initParticle({
              x: Math.random() * width,
              y: height * 0.45 + Math.random() * (height * 0.55),
              size: 4 + Math.random() * 5,
              alpha: 0.65
            });
          } else {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            // Stretched oval ripple to match water perspective
            ctx.ellipse(p.x, p.y, p.size * 1.8, p.size * 0.55, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleType, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] select-none"
      aria-hidden="true"
    />
  );
};
