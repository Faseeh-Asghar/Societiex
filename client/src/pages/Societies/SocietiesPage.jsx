import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Calendar, ArrowRight } from 'lucide-react';
import societies, { CATEGORIES } from '../../data/societies';
import ScrollReveal from '../../components/common/ScrollReveal';
import Footer from '../../components/layout/Footer';

/**
 * SocietiesPage Component
 * -------------------------------------------------------------
 * Clean directory of societies at FAST-NUCES CFD.
 * Search, category filters, and direct links.
 * Minimal and functional — platform style, zero showcase bloat.
 */
export default function SocietiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter societies based on active category and search term
  const filteredSocieties = useMemo(() => {
    let list = societies;

    if (selectedCategory !== 'all') {
      list = list.filter((s) => s.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortName.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#14110f] text-white pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        {/* Header Section */}
        <ScrollReveal>
          <div className="mb-8">
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Societies
            </h1>
          </div>
        </ScrollReveal>

        {/* Filter & Search Bar */}
        <ScrollReveal delay={0.08}>
          <div className="space-y-5 mb-10">
            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search societies..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-amber-300/60 focus:bg-white/10 outline-none text-xs sm:text-sm text-white placeholder:text-white/40 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Societies Grid */}
        {filteredSocieties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSocieties.map((society, idx) => (
              <ScrollReveal key={society.id} delay={(idx % 6) * 0.05}>
                <Link
                  to={`/societies/${society.id}`}
                  className="group block h-full rounded-2xl bg-[#1b1714] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col justify-between"
                >
                  {/* Society Cover Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-black/40">
                    <img
                      src={society.coverImage}
                      alt={society.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b1714] via-transparent to-black/30" />

                    {/* Category Pill & Monogram */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-amber-200">
                        {society.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                        {society.shortName}
                      </span>
                    </div>

                    {/* Established Badge (if available) */}
                    {society.founded && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/70 flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5 text-amber-200/60" />
                          <span>Est. {society.founded}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h2
                        className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1"
                        style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                      >
                        {society.name}
                      </h2>
                      <p className="mt-2 text-xs sm:text-sm text-white/60 line-clamp-3 leading-relaxed font-sans">
                        {society.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-200/60" />
                        <span>{society.memberCount}+ Members</span>
                      </div>

                      <ArrowRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-white/40 font-mono text-xs uppercase tracking-wider">
              No societies found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
