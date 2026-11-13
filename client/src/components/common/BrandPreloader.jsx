import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BrandPreloader Component
 * ----------------------------------------------------
 * High-aesthetic brand entrance curtain and stage preloader.
 * 
 * Mechanics:
 * - Displays the bold "SOCIETIX" brandmark inside a frosted glass showcase.
 * - The loading progress (0% -> 100%) dynamically fills up INSIDE the text itself
 *   via an SVG clip-path mask featuring an animated multi-chromatic gradient,
 *   flowing wave crest, and blueprint sketch lines.
 * - Progress completes in ~2.8 seconds, followed by a celebratory specular gleam,
 *   and lifts like a cinematic curtain into the main application.
 */
export default function BrandPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING CAMPUS ECOSYSTEM...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 2.8 second smooth progression curve with realistic easing
    const startTime = Date.now();
    const duration = 2800; // 2.8s total loading time

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Custom ease-in-out curve for natural loading feel
      const easedProgress = Math.floor(
        rawProgress < 0.5
          ? 2 * rawProgress * rawProgress * 100
          : (1 - Math.pow(-2 * rawProgress + 2, 2) / 2) * 100
      );

      const clampedProgress = Math.min(Math.max(easedProgress, 0), 100);
      setProgress(clampedProgress);

      // Dynamic telemetry messages updating as progress climbs
      if (clampedProgress < 28) {
        setStatusText('INITIALIZING CAMPUS ECOSYSTEM...');
      } else if (clampedProgress < 58) {
        setStatusText('INDEXING FAST-NUCES SOCIETIES & CHAPTERS...');
      } else if (clampedProgress < 88) {
        setStatusText('CONFIGURING ROLE-BASED ACCESS & PERMISSIONS...');
      } else {
        setStatusText('SOCIETIX READY — WELCOME');
      }

      if (rawProgress >= 1) {
        clearInterval(timer);
        setProgress(100);
        setIsDone(true);

        // Small 450ms hold at 100% to let the user admire the full fill before lifting
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 550);
      }
    }, 24);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Calculate SVG fill y-position (180 is bottom of viewBox, 0 is top)
  // At 0% progress: y = 180 (no fill). At 100% progress: y = 0 (full fill).
  const fillY = 180 - (progress / 100) * 180;

  return (
    <motion.div
      key="brand-preloader"
      initial={{ opacity: 1, y: 0 }}
      exit={{
        y: '-100%',
        transition: {
          duration: 0.95,
          ease: [0.19, 1, 0.22, 1], // Buttery smooth cubic-bezier curtain lift
        },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05080e] overflow-hidden select-none"
    >
      {/* 1. Ambient Lighting Behind Stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. Glassmorphic Central Stage Box */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 w-full max-w-4xl mx-4 px-6 py-10 md:px-12 md:py-14 rounded-3xl glass-panel shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col items-center text-center"
      >
        {/* Subtle top pill badge */}
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill mb-6 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-slate-300 uppercase">
            FAST-NUCES • CFS CAMPUS
          </span>
        </div>

        {/* 3. The SOCIETIX Glassy Text with Dynamic Fill */}
        <div className="relative w-full max-w-2xl my-2">
          <svg
            viewBox="0 0 800 180"
            className="w-full h-auto drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Text Mask Definition */}
              <clipPath id="societix-text-mask">
                <text
                  x="50%"
                  y="62%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="122"
                  fontWeight="900"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  letterSpacing="10"
                >
                  SOCIETIX
                </text>
              </clipPath>

              {/* Multi-chromatic Vibrant Liquid Gradient */}
              <linearGradient id="liquid-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#047857" />    {/* Deep Emerald */}
                <stop offset="35%" stopColor="#10b981" />   {/* Radiant Emerald */}
                <stop offset="65%" stopColor="#d4af37" />   {/* Academic Gold */}
                <stop offset="90%" stopColor="#f59e0b" />   {/* Warm Amber */}
                <stop offset="100%" stopColor="#38bdf8" />  {/* Cyan highlight */}
              </linearGradient>

              {/* Moving wave crest at top of liquid level */}
              <pattern
                id="wave-pattern"
                x="0"
                y="0"
                width="120"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 10 Q30 0 60 10 T120 10 V20 H0 Z"
                  fill="rgba(255, 255, 255, 0.45)"
                />
              </pattern>

              {/* Subtle Architectural Blueprint Grid inside fill */}
              <pattern
                id="blueprint-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>

            {/* A. Ghost Base Layer: Translucent glass typography outline */}
            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="122"
              fontWeight="900"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              letterSpacing="10"
              fill="rgba(255, 255, 255, 0.03)"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1.5"
            >
              SOCIETIX
            </text>

            {/* B. Clipped Dynamic Filling Layer */}
            <g clipPath="url(#societix-text-mask)">
              {/* Dynamic Rising Liquid Block */}
              <rect
                x="0"
                y={fillY}
                width="800"
                height={180 - fillY}
                fill="url(#liquid-gradient)"
                className="transition-all duration-75 ease-out"
              />

              {/* Architectural grid overlay inside the liquid */}
              <rect
                x="0"
                y={fillY}
                width="800"
                height={180 - fillY}
                fill="url(#blueprint-grid)"
                opacity="0.6"
              />

              {/* Floating wave shimmer on the fill horizon */}
              <rect
                x="0"
                y={fillY - 8}
                width="800"
                height="16"
                fill="url(#wave-pattern)"
                className="animate-shimmer opacity-70"
              />

              {/* Specular White Shine at 100% completion */}
              {isDone && (
                <rect
                  x="0"
                  y="0"
                  width="800"
                  height="180"
                  fill="rgba(255, 255, 255, 0.22)"
                  className="animate-pulse"
                />
              )}
            </g>

            {/* C. Outer Crisp Contour Stroke */}
            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="122"
              fontWeight="900"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              letterSpacing="10"
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="0.75"
              style={{ pointerEvents: 'none' }}
            >
              SOCIETIX
            </text>
          </svg>
        </div>

        {/* 4. Telemetry Progress & Status Readout */}
        <div className="w-full max-w-md mt-6 flex flex-col items-center">
          {/* Progress Bar Track */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          {/* Telemetry info row */}
          <div className="w-full flex items-center justify-between mt-3 text-xs font-mono">
            <span className="text-slate-400 tracking-wider flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {statusText}
            </span>
            <span className="text-emerald-400 font-semibold tracking-widest">
              [{progress.toString().padStart(3, '0')}%]
            </span>
          </div>
        </div>

        {/* 5. Minimalist Subtitle */}
        <p className="mt-8 text-xs font-medium text-slate-500 tracking-[0.2em] uppercase">
          A Unified Platform for University Society Management
        </p>
      </motion.div>
    </motion.div>
  );
}
