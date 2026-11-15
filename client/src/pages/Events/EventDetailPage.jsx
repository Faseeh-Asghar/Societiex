import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users, CheckCircle, Share2, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { getEventById } from '../../data/events';
import { getSocietyById } from '../../data/societies';
import ScrollReveal from '../../components/common/ScrollReveal';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../services/api';

/**
 * EventDetailPage Component
 * -------------------------------------------------------------
 * Dedicated detail page for an individual campus event.
 * Displays high-contrast photography, timing, venue, host society,
 * and interactive RSVP reservation.
 */
export default function EventDetailPage() {
  const { id } = useParams();
  const event = getEventById(id);
  const society = event?.societyId ? getSocietyById(event.societyId) : null;

  const { user, accessToken } = useAuth();
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpError, setRsvpError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rollNo, setRollNo] = useState('');
  const [copied, setCopied] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(event?.rsvpCount || 0);

  useEffect(() => {
    if (user?.rollNo) {
      setRollNo(user.rollNo);
    }
  }, [user]);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#14110f] text-white pt-40 px-6 text-center">
        <h1 className="text-2xl font-bold font-serif mb-4">Event Not Found</h1>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Events</span>
        </Link>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const monthName = eventDate.toLocaleString('en-US', { month: 'long' });
  const dayName = eventDate.toLocaleString('en-US', { weekday: 'long' });
  const dayNumber = eventDate.getDate();
  const yearNumber = eventDate.getFullYear();

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    setRsvpError('');
    setIsSubmitting(true);

    try {
      let targetEventId = event._id;
      if (!targetEventId) {
        const checkRes = await fetch(`${API_BASE_URL}/api/v1/events/${event.id}`);
        if (checkRes.ok) {
          const checkData = await checkRes.json();
          targetEventId = checkData.data.event._id;
        }
      }

      if (accessToken && targetEventId) {
        const res = await fetch(`${API_BASE_URL}/api/v1/rsvps`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ eventId: targetEventId }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to submit RSVP.');
        }
      }

      setAttendeeCount((prev) => prev + 1);
      setRsvpSubmitted(true);
      setTimeout(() => {
        setIsRsvpOpen(false);
        setRsvpSubmitted(false);
      }, 2000);
    } catch (err) {
      setRsvpError(err.message || 'Error reserving seat.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#14110f] text-white pt-24 md:pt-32">
      {/* 1. Event Hero Banner */}
      <section className="relative w-full h-[360px] md:h-[460px] overflow-hidden bg-black/70">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] via-[#14110f]/40 to-black/60" />

        {/* Back Link */}
        <div className="absolute top-6 left-6 md:left-12 z-10">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Events</span>
          </Link>
        </div>

        {/* Metadata Overlay */}
        <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className={`px-3 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider ${
                event.status === 'upcoming'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-white/10 text-white/70 border border-white/10'
              }`}
            >
              {event.status}
            </span>

            {event.societyName && (
              <span className="font-mono text-xs uppercase tracking-wider text-amber-200">
                {event.societyName}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-3xl"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              {event.title}
            </h1>

            {/* Action CTA */}
            {event.status === 'upcoming' && (
              <button
                onClick={() => setIsRsvpOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-xl cursor-pointer self-start md:self-auto"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Reserve Seat</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Event Body Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-10">
            <ScrollReveal>
              <div className="space-y-4">
                <h2
                  className="text-xl md:text-2xl font-bold text-white tracking-wide"
                  style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                >
                  Overview
                </h2>
                <p className="text-white/75 text-sm md:text-base leading-relaxed font-sans whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </ScrollReveal>

            {/* Host Society Highlight */}
            {society && (
              <ScrollReveal delay={0.1}>
                <div className="p-6 rounded-2xl bg-[#1b1714] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-200/80">
                      Organized By
                    </span>
                    <h3
                      className="text-lg font-bold text-white"
                      style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                    >
                      {society.name}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2 max-w-md font-sans">
                      {society.description}
                    </p>
                  </div>

                  <Link
                    to={`/societies/${society.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono uppercase tracking-wider text-white transition-all self-start sm:self-auto"
                  >
                    <span>View Society</span>
                  </Link>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar / Logistics Card */}
          <div className="lg:col-span-4 space-y-6">
            <ScrollReveal delay={0.15}>
              <div className="p-6 rounded-2xl bg-[#1b1714] border border-white/10 space-y-5">
                <h3
                  className="text-base font-bold text-white pb-3 border-b border-white/10"
                  style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                >
                  Fixture Details
                </h3>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-amber-200/80 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-white/50 block">Date</span>
                      <span className="text-white font-medium">
                        {dayName}, {monthName} {dayNumber}, {yearNumber}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-amber-200/80 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-white/50 block">Time</span>
                      <span className="text-white font-medium">{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-200/80 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-white/50 block">Location</span>
                      <span className="text-white font-medium">{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-white/50 block">Attendance</span>
                      <span className="text-white font-medium">{attendeeCount} Attending</span>
                    </div>
                  </div>
                </div>

                {event.status === 'upcoming' ? (
                  <button
                    onClick={() => setIsRsvpOpen(true)}
                    className="w-full py-3 rounded-xl bg-white text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
                  >
                    Confirm Attendance
                  </button>
                ) : (
                  <div className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-mono text-white/40 uppercase">
                    Event Concluded
                  </div>
                )}

                <button
                  onClick={handleShare}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Link Copied!' : 'Share Event'}</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {isRsvpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsRsvpOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md rounded-2xl bg-[#181412] border border-white/15 p-6 shadow-2xl z-10">
            {rsvpSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold font-serif text-white">RSVP Confirmed</h3>
                <p className="text-xs text-white/60 font-mono">
                  Your seat for "{event.title}" has been reserved.
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
                      className="text-base font-bold text-white line-clamp-1"
                      style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                    >
                      {event.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsRsvpOpen(false)}
                    className="text-white/50 hover:text-white text-xs font-mono cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                {rsvpError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{rsvpError}</span>
                  </div>
                )}

                <div className="space-y-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-white/60">
                      <span>Date & Time:</span>
                      <span className="text-white">{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-white/60">
                      <span>Venue:</span>
                      <span className="text-white">{event.location}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-[11px] mb-1">Roll Number</label>
                    <input
                      required
                      type="text"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      placeholder="e.g. 24F-0646"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-white text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Reserving...</span>
                    </>
                  ) : (
                    <span>Confirm RSVP</span>
                  )}
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
