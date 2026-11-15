import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import Footer from '../../components/layout/Footer';

/**
 * NotFoundPage Component
 * -------------------------------------------------------------
 * Editorial, minimal 404 page for unmatched routes.
 */
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#14110f] text-white pt-32 flex flex-col justify-between">
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-amber-200">
          <Compass className="w-7 h-7 stroke-1" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-amber-200/80 mb-2 block">
          404 • Not Found
        </span>

        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
          style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
        >
          Page Departed
        </h1>

        <p className="text-white/60 text-sm leading-relaxed mb-8 font-sans">
          The requested page or resource is not available on the Societix platform.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/societies"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer"
          >
            <span>Societies</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
