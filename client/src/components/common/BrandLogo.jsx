import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * BrandLogo Component
 * -----------------------------------------------------------------
 * Classical Roman Typographic Brandmark for SOCIETIX.
 * 
 * Features:
 * - Starting Phase: Frosted glass body with mountain crystal liquid fill
 *   reflecting the warm dusk tones of Photo 1.1.
 * - Landed Phase: Once it glides into the upper-left corner, it transforms
 *   into a 100% PURE SOLID WHITE (`#ffffff`) editorial wordmark, floating
 *   with pristine clarity over the fullscreen photos.
 * - Glitch-Free Continuous Transition: 100% continuous mathematical interpolation.
 */
export default function BrandLogo({ progress = 100, isLanded = false, onClick }) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // SVG viewBox: 800 wide by 150 tall
  // At 0% progress: fillY = 150. At 100% progress: fillY = 0.
  const fillY = 150 - (progress / 100) * 150;

  // Exact coordinates for glitch-free continuous interpolation
  const centerState = {
    top: '50%',
    left: '50%',
    x: '-50%',
    y: '-50%',
    width: isMobile ? '88vw' : '720px',
  };

  const cornerState = {
    top: isMobile ? '24px' : '36px',
    left: isMobile ? '24px' : '44px',
    x: '0%',
    y: '0%',
    width: isMobile ? '210px' : '265px',
  };

  return (
    <motion.div
      animate={isLanded ? cornerState : centerState}
      initial={false}
      transition={{
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1], // Silky smooth deceleration curve
      }}
      onClick={onClick}
      className="fixed z-50 select-none cursor-pointer"
      style={{ transformOrigin: 'top left' }}
    >
      <svg
        viewBox="0 0 800 150"
        className={`w-full h-auto overflow-visible transition-all duration-700 ${
          isLanded
            ? 'drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]'
            : 'drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
        }`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Classic Architectural Serif Text Mask */}
          <clipPath id="classic-societix-mask-cinematic">
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="106"
              fontWeight="800"
              fontFamily="'Cinzel', 'Cormorant Garamond', serif"
              letterSpacing="12"
            >
              SOCIETIX
            </text>
          </clipPath>

          {/* Mountain Stream Dusk Gradient (Harmonized with Photo 1.1) */}
          <linearGradient id="mountain-dusk-stream" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />   {/* Deep Rock Slate */}
            <stop offset="35%" stopColor="#0284c7" />  {/* Mountain Spring Blue */}
            <stop offset="70%" stopColor="#38bdf8" />  {/* Clear Water Aqua */}
            <stop offset="90%" stopColor="#fde68a" />  {/* Dusky Golden Hour Crest */}
            <stop offset="100%" stopColor="#ffffff" /> {/* Crisp White Light */}
          </linearGradient>

          {/* Sloshing Wave Horizon Pattern */}
          <pattern
            id="stream-wave-crest"
            width="80"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 8 Q 20 0 40 8 T 80 8 V 16 H 0 Z"
              fill="rgba(255, 255, 255, 0.95)"
            />
          </pattern>

          {/* Frosted Glass Specular Rim Reflection */}
          <linearGradient id="dusk-glass-specular" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.65)" />
            <stop offset="40%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.02)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.35)" />
          </linearGradient>
        </defs>

        {/* ==============================================================
            STATE A: LANDED (Fully Pure Solid White)
            Per user request: "when we fully land, the logo should be fully white"
            ============================================================== */}
        {isLanded ? (
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="106"
            fontWeight="800"
            fontFamily="'Cinzel', 'Cormorant Garamond', serif"
            letterSpacing="12"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="0.8"
            style={{ pointerEvents: 'none' }}
          >
            SOCIETIX
          </text>
        ) : (
          /* ==============================================================
              STATE B: INTRO LOADING (Frosted Glass with Mountain Stream Fill)
              ============================================================== */
          <>
            {/* 1. Frosted Glass Base Silhouette */}
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="106"
              fontWeight="800"
              fontFamily="'Cinzel', 'Cormorant Garamond', serif"
              letterSpacing="12"
              fill="url(#dusk-glass-specular)"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.2"
            >
              SOCIETIX
            </text>

            {/* Crisp Glass Outline */}
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="106"
              fontWeight="800"
              fontFamily="'Cinzel', 'Cormorant Garamond', serif"
              letterSpacing="12"
              fill="none"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="0.9"
            >
              SOCIETIX
            </text>

            {/* 2. Rising Mountain Stream Liquid Fill */}
            <g clipPath="url(#classic-societix-mask-cinematic)">
              <rect
                x="0"
                y={fillY}
                width="800"
                height={150 - fillY}
                fill="url(#mountain-dusk-stream)"
                className="transition-all duration-75 ease-out"
              />

              {/* Sloshing Wave Horizon */}
              <rect
                x="0"
                y={fillY - 7}
                width="800"
                height="14"
                fill="url(#stream-wave-crest)"
                className="animate-shimmer opacity-95"
              />

              {/* Specular White Crest Line */}
              <line
                x1="0"
                y1={fillY}
                x2="800"
                y2={fillY}
                stroke="#ffffff"
                strokeWidth="2.5"
                opacity="0.95"
              />

              {/* Flash pulse when 100% full */}
              {progress >= 100 && (
                <rect
                  x="0"
                  y="0"
                  width="800"
                  height="150"
                  fill="rgba(255, 255, 255, 0.35)"
                  className="animate-pulse"
                />
              )}
            </g>

            {/* 3. Crisp Foreground Bevel Contour */}
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="106"
              fontWeight="800"
              fontFamily="'Cinzel', 'Cormorant Garamond', serif"
              letterSpacing="12"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.0"
              style={{ pointerEvents: 'none' }}
            >
              SOCIETIX
            </text>
          </>
        )}
      </svg>
    </motion.div>
  );
}
