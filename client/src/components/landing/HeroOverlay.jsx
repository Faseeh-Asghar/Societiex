import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';

/**
 * HeroOverlay Component
 * -------------------------------------------------------------
 * Editorial overlay floating cleanly on top of the FullscreenPhotoSlider.
 * - Non-blocking pointer events (`pointer-events-none` on container, `pointer-events-auto` on buttons).
 * - Matches the luxury editorial style of Pamidor / DAQ Consulting.
 * - Zero generic AI neon; high-contrast white typography with subtle drop-shadows.
 */
export default function HeroOverlay({ onScrollDown }) {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12 pb-24 md:pb-16 select-none">
      {/* Top spacer to give breathing room for BrandLogo & Navbar */}
      <div className="h-24 md:h-32" />

      {/* Middle/Bottom Left: Editorial Headline & Actions */}
      <div className="max-w-3xl pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-mono uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FAST-NUCES CFD • 18 Campus Societies</span>
          </div>

          {/* Main Editorial Headline */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
          >
            Where Ambition Meets Creative Expression.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl font-sans leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Explore active student communities, upcoming campus tournaments, tech hackathons, and literary declamations at FAST-NUCES.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/societies"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-medium text-xs sm:text-sm tracking-wider uppercase font-mono hover:bg-amber-100 transition-all duration-300 shadow-xl cursor-pointer"
            >
              <span>Explore Societies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/25 text-white font-medium text-xs sm:text-sm tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
            >
              <span>Upcoming Events</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Center: Scroll to explore trigger */}
      <div className="flex items-center justify-between pointer-events-auto pt-6">
        <button
          onClick={onScrollDown}
          className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <span className="w-7 h-7 rounded-full border border-white/30 group-hover:border-white flex items-center justify-center transition-colors">
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </span>
          <span className="uppercase">Scroll to Discover</span>
        </button>

        <div className="hidden sm:block text-[11px] font-mono tracking-widest text-white/50 uppercase">
          FAST-NUCES CHINIOT-FAISALABAD
        </div>
      </div>
    </div>
  );
}
