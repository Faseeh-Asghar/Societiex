import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Calendar, ArrowUpRight, MapPin, Mail, ShieldCheck } from 'lucide-react';

/**
 * Footer Component
 * -------------------------------------------------------------
 * Clean, editorial footer for SOCIETIX.
 * Monochromatic elegance, warm slate tone (#14110f), zero bloated AI clichés.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#120f0d] text-white border-t border-white/10 overflow-hidden">
      {/* Subtle warm glow background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-amber-900/5 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5 space-y-4">
            <h2
              className="font-bold text-2xl md:text-3xl tracking-[0.15em] text-white select-none"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              SOCIETIX
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm font-sans">
              The official society and co-curricular network for FAST National University
              of Computer and Emerging Sciences, Chiniot-Faisalabad Campus.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-white/40">
              <MapPin className="w-4 h-4 text-amber-200/60" />
              <span>FAST Square, 9 Km from Faisalabad Motorway Interchange</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-amber-200/80">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/societies"
                  className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  <span>18 Campus Societies</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-200" />
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Upcoming Events & Seminars</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-200" />
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  <span>About the Platform</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-200" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-amber-200/80">
              Society Verticals
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Computing & Tech',
                'Sports Guild',
                'Debating & Literary',
                'Music & Drama',
                'Videography',
                'Social Welfare',
                'Fintech & DATS',
              ].map((vertical) => (
                <span
                  key={vertical}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/60"
                >
                  {vertical}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© {currentYear} FAST-NUCES CFD. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              Platform Info
            </Link>
            <span>•</span>
            <Link to="/auth/login" className="hover:text-white transition-colors">
              Member Sign In
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
