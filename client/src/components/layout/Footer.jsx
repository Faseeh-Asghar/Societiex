import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 * -------------------------------------------------------------
 * Clean, minimal editorial footer for SOCIETIX.
 * Monochromatic elegance, zero bloated text.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#120f0d] text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <h2
              className="font-bold text-xl md:text-2xl tracking-[0.15em] text-white select-none"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              SOCIETIX
            </h2>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono uppercase tracking-widest text-white/60">
            <Link to="/societies" className="hover:text-white transition-colors">
              Societies
            </Link>
            <Link to="/events" className="hover:text-white transition-colors">
              Events
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/auth/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© {currentYear} SOCIETIX • FAST-NUCES CFD</p>
        </div>
      </div>
    </footer>
  );
}
