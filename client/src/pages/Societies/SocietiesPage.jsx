import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Calendar, ArrowRight, Compass } from 'lucide-react';
import societies, { CATEGORIES } from '../../data/societies';
import ScrollReveal from '../../components/common/ScrollReveal';
import Footer from '../../components/layout/Footer';

/**
 * SocietiesPage Component
 * -------------------------------------------------------------
 * Complete public directory of all 18 FAST-NUCES CFD campus societies.
 * Features:
 * - Live keyword search (names, short names, keywords in descriptions)
 * - Category filter pills
 * - Rich editorial card grid with real photography
 * - Clean responsive layout
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
    <div className="min-h-screen bg-[#14110f] text-white pt-28 md:pt-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        {/* Header Section */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-200/80 mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Campus Directory</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              18 Student Societies.
            </h1>
            <p className="mt-4 text-white/70 text-base md:text-lg font-sans leading-relaxed">
              Explore officially chartered societies at FAST-NUCES Chiniot-Faisalabad Campus. Discover activities, upcoming competitions, and connect with student leadership.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter & Search Bar */}
        <ScrollReveal delay={0.1}>
          <div className="space-y-6 mb-12">
            {/* Search Input */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search societies (e.g. Robotics, Debates, SES, Cricket)..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-amber-300/60 focus:bg-white/10 outline-none text-sm text-white placeholder:text-white/40 transition-all font-sans"
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
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
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
                  className="group block h-full rounded-2xl bg-[#1b1714] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl flex flex-col justify-between"
                >
                  {/* Society Cover Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-black/40">
                    <img
                      src={society.coverImage}
                      alt={society.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b1714] via-transparent to-black/30" />

                    {/* Category Pill */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-amber-200">
                        {society.category}
                      </span>
                    </div>

                    {/* Established Badge (if available) */}
                    {society.founded && (
                      <div className="absolute top-3.5 right-3.5">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/70 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-200/60" />
                          <span>Est. {society.founded}</span>
                        </span>
                      </div>
                    )}

                    {/* Short Tag */}
                    <div className="absolute bottom-3 left-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                        [{society.shortName}]
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2
                        className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1"
                        style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                      >
                        {society.name}
                      </h2>
                      <p className="mt-2.5 text-xs sm:text-sm text-white/60 line-clamp-3 leading-relaxed font-sans">
                        {society.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-200/60" />
                        <span>{society.memberCount}+ Active Members</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-white/80 group-hover:text-white transition-colors">
                        <span>Profile</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-white/40 font-mono text-sm uppercase tracking-wider">
              No societies found matching "{searchQuery}" in {selectedCategory}.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
