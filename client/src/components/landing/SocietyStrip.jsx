import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import societies from '../../data/societies';
import ScrollReveal from '../common/ScrollReveal';

/**
 * SocietyStrip Component
 * -------------------------------------------------------------
 * Horizontal scrolling showcase of active societies on campus.
 * Displays high-contrast editorial cards with real photography.
 */
export default function SocietyStrip() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Curate a top selection of 10 diverse societies for the landing strip
  const featuredSocieties = societies.slice(0, 10);

  return (
    <section className="relative py-24 md:py-32 bg-[#171412] text-white border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-200/80 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Campus Verticals</span>
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
              >
                Explore Active Societies
              </h2>
              <p className="mt-3 text-white/60 text-sm md:text-base max-w-xl font-sans">
                From competitive robotics and full-stack engineering to literary debates, cricket championships, and musical ensembles.
              </p>
            </div>

            {/* Right: Controls & View All */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scroll('left')}
                  aria-label="Scroll left"
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  aria-label="Scroll right"
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <Link
                to="/societies"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all group"
              >
                <span>View All 18</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Scroll Rail */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredSocieties.map((society, idx) => (
            <div
              key={society.id}
              className="flex-shrink-0 w-[290px] sm:w-[340px] snap-start group"
            >
              <Link
                to={`/societies/${society.id}`}
                className="block h-full rounded-2xl bg-[#1e1a17] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Image Cover */}
                <div className="relative h-48 w-full overflow-hidden bg-black/40">
                  <img
                    src={society.coverImage}
                    alt={society.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1a17] via-transparent to-black/30" />

                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-amber-200">
                      {society.category}
                    </span>
                  </div>

                  {/* Short Name Tag */}
                  <div className="absolute bottom-3 left-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                      [{society.shortName}]
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1"
                      style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                    >
                      {society.name}
                    </h3>
                    <p className="mt-2 text-xs text-white/60 line-clamp-3 leading-relaxed font-sans">
                      {society.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-200/60" />
                      <span>{society.memberCount}+ Members</span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-white/80 group-hover:text-white transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
