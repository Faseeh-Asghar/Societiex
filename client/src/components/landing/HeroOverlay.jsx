import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';

/**
 * HeroOverlay Component
 * -------------------------------------------------------------
 * Minimalist, luxury editorial overlay on the FullscreenPhotoSlider.
 * - Non-blocking pointer events (`pointer-events-none` on wrapper, `pointer-events-auto` on actions).
 * - Clean, confident presentation without over-explaining or hand-holding text.
 */
export default function HeroOverlay({ onScrollDown }) {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12 pb-16 select-none">
      {/* Top spacer for BrandLogo & Navbar */}
      <div className="h-24 md:h-32" />

      {/* Main Headline & Actions */}
      <div className="max-w-2xl pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
          >
            Where Ambition Meets Expression.
          </h1>

          {/* Clean Action Links */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/societies"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-medium text-xs sm:text-sm tracking-wider uppercase font-mono hover:bg-neutral-200 transition-all duration-300 shadow-xl cursor-pointer"
            >
              <span>Societies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white font-medium text-xs sm:text-sm tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
            >
              <span>Events</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom: Minimal Scroll Indicator */}
      <div className="pointer-events-auto">
        <button
          onClick={onScrollDown}
          className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <span className="w-7 h-7 rounded-full border border-white/30 group-hover:border-white flex items-center justify-center transition-colors">
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </span>
          <span className="uppercase">Scroll</span>
        </button>
      </div>
    </div>
  );
}
