import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, CheckCircle, Search, Clock } from 'lucide-react';
import events from '../../data/events';
import ScrollReveal from '../../components/common/ScrollReveal';
import Footer from '../../components/layout/Footer';

/**
 * EventsPage Component
 * -------------------------------------------------------------
 * Complete campus events directory with live search, filters, and RSVP system.
 */
export default function EventsPage() {
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'upcoming' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [rsvpEvent, setRsvpEvent] = useState(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpRollNo, setRsvpRollNo] = useState('');

  // Filter events
  const filteredEvents = useMemo(() => {
    let list = events;

    if (filterStatus !== 'all') {
      list = list.filter((e) => e.status === filterStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.societyName.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q)
      );
    }

    return list;
  }, [filterStatus, searchQuery]);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setRsvpEvent(null);
      setRsvpRollNo('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#14110f] text-white pt-28 md:pt-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-200/80 mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Campus Calendar</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Tournaments & Gatherings.
            </h1>
            <p className="mt-4 text-white/70 text-base md:text-lg font-sans leading-relaxed">
              Find out what is happening across FAST-NUCES CFD. RSVP to upcoming campus hackathons, sports fixtures, and musical performances.
            </p>
          </div>
        </ScrollReveal>

        {/* Filters and Search */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events (e.g. Cricket, Hackathon, Naran)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-amber-300 outline-none text-xs sm:text-sm text-white placeholder:text-white/40 transition-all font-sans"
              />
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'All Fixtures' },
                { id: 'upcoming', label: 'Upcoming' },
                { id: 'completed', label: 'Past Highlights' },
              ].map((status) => {
                const isActive = filterStatus === status.id;
                return (
                  <button
                    key={status.id}
                    onClick={() => setFilterStatus(status.id)}
                    className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                    }`}
                  >
                    {status.label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt, idx) => {
            const eventDate = new Date(evt.date);
            const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
            const day = eventDate.getDate().toString().padStart(2, '0');

            return (
              <ScrollReveal key={evt.id} delay={(idx % 6) * 0.08}>
                <div
                  id={evt.id}
                  className="rounded-2xl bg-[#1b1714] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-lg flex flex-col justify-between h-full"
                >
                  {/* Cover */}
                  <div className="relative h-48 w-full overflow-hidden bg-black/40">
                    <img
                      src={evt.coverImage}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b1714] via-transparent to-black/30" />

                    {/* Date Badge */}
                    <div className="absolute top-3 left-3 flex flex-col items-center justify-center w-12 h-14 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white shadow-lg">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-amber-200">
                        {month}
                      </span>
                      <span className="font-mono text-base font-bold leading-tight">
                        {day}
                      </span>
                    </div>

                    {/* Status Chip */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                          evt.status === 'upcoming'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-white/10 text-white/60 border border-white/10'
                        }`}
                      >
                        {evt.status}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {evt.societyId ? (
                        <Link
                          to={`/societies/${evt.societyId}`}
                          className="font-mono text-xs uppercase tracking-wider text-amber-200/80 hover:text-amber-200 transition-colors block mb-1.5"
                        >
                          {evt.societyName}
                        </Link>
                      ) : (
                        <span className="font-mono text-xs uppercase tracking-wider text-white/50 block mb-1.5">
                          {evt.societyName}
                        </span>
                      )}

                      <h2
                        className="text-xl font-bold text-white leading-snug"
                        style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                      >
                        {evt.title}
                      </h2>
                      <p className="mt-2.5 text-xs sm:text-sm text-white/60 line-clamp-3 leading-relaxed font-sans">
                        {evt.description}
                      </p>
                    </div>

                    {/* Footer Info & RSVP Action */}
                    <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-white/50">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-200/60" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{evt.rsvpCount} Attending</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-white/40 truncate max-w-[170px]">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>

                        {evt.status === 'upcoming' ? (
                          <button
                            onClick={() => setRsvpEvent(evt)}
                            className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-mono font-semibold hover:bg-amber-100 transition-all cursor-pointer"
                          >
                            RSVP Free
                          </button>
                        ) : (
                          <span className="text-xs font-mono text-white/40">Concluded</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* RSVP Modal */}
      {rsvpEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setRsvpEvent(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md rounded-2xl bg-[#181412] border border-white/15 p-6 shadow-2xl z-10">
            {rsvpSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold font-serif text-white">RSVP Confirmed</h3>
                <p className="text-xs text-white/60 font-mono">
                  Your seat for "{rsvpEvent.title}" has been reserved.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-200">
                      RSVP Registration
                    </span>
                    <h3
                      className="text-lg font-bold text-white line-clamp-1"
                      style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                    >
                      {rsvpEvent.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRsvpEvent(null)}
                    className="text-white/50 hover:text-white text-xs font-mono cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-white/60">
                      <span>Date & Time:</span>
                      <span className="text-white">{rsvpEvent.date} • {rsvpEvent.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-white/60">
                      <span>Venue:</span>
                      <span className="text-white">{rsvpEvent.location}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-[11px] mb-1">Student Roll Number</label>
                    <input
                      required
                      type="text"
                      value={rsvpRollNo}
                      onChange={(e) => setRsvpRollNo(e.target.value)}
                      placeholder="e.g. 24F-0646"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  Confirm Attendee Ticket
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
