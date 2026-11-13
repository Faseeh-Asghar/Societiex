import React, { useEffect, useRef } from 'react';

/**
 * DynamicBackground Component
 * ----------------------------------------------------
 * Creates an organic, living ambient background canvas with floating
 * dust particles and gentle constellation connections.
 * 
 * Design notes:
 * - Avoids cheap neon greens or purple glows.
 * - Uses deep emerald, champagne gold, and muted starlight dust on
 *   an obsidian (#06090e) canvas.
 * - Highly optimized with requestAnimationFrame and responsive resize handling.
 */
export default function DynamicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle responsive pixel ratio
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle setup
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.4 ? '16, 185, 129' : '212, 175, 55', // Emerald or Gold
    }));

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle ambient radial glow spots in the background
      const glowGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        10,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.6
      );
      glowGrad.addColorStop(0, 'rgba(16, 185, 129, 0.04)');
      glowGrad.addColorStop(0.5, 'rgba(6, 78, 59, 0.02)');
      glowGrad.addColorStop(1, 'rgba(6, 9, 14, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();

        // 3. Draw soft connections between close neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 110) * 0.12;
            ctx.strokeStyle = `rgba(148, 163, 184, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80"
    />
  );
}
