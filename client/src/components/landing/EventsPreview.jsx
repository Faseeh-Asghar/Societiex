import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import { getUpcomingEvents } from '../../data/events';
import ScrollReveal from '../common/ScrollReveal';

/**
 * EventsPreview Component
 * -------------------------------------------------------------
 * Clean, minimal upcoming events section for the landing page.
 * Displays high-contrast cards with dates in JetBrains Mono.
 */
export default function EventsPreview() {
  const upcomingEvents = getUpcomingEvents(4);

  return (
    <section className="relative py-20 md:py-28 bg-[#14110f] text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Events
            </h2>

            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono uppercase tracking-wider text-white transition-all group"
            >
              <span>All Events</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingEvents.map((evt, idx) => {
            const eventDate = new Date(evt.date);
            const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
            const day = eventDate.getDate().toString().padStart(2, '0');

            return (
              <ScrollReveal key={evt.id} delay={idx * 0.08}>
                <Link
                  to={`/events#${evt.id}`}
                  className="group block h-full rounded-2xl bg-[#1b1714] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col justify-between"
                >
                  {/* Event Cover Image */}
                  <div className="relative h-40 w-full overflow-hidden bg-black/40">
                    <img
                      src={evt.coverImage}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b1714] via-transparent to-black/30" />

                    {/* Date Badge */}
                    <div className="absolute top-3 left-3 flex flex-col items-center justify-center w-11 h-13 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white shadow-lg">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-amber-200">
                        {month}
                      </span>
                      <span className="font-mono text-sm font-bold leading-tight">
                        {day}
                      </span>
                    </div>

                    {/* RSVP Counter Badge */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/80 flex items-center gap-1">
                      <Users className="w-2.5 h-2.5 text-emerald-400" />
                      <span>{evt.rsvpCount}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-amber-200/70 block mb-1">
                        {evt.societyName}
                      </span>
                      <h3
                        className="text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-2 leading-snug"
                        style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                      >
                        {evt.title}
                      </h3>
                      <p className="mt-2 text-xs text-white/60 line-clamp-2 leading-relaxed font-sans">
                        {evt.description}
                      </p>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                      <div className="flex items-center gap-1 truncate max-w-[170px]">
                        <MapPin className="w-3 h-3 text-white/40 shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
