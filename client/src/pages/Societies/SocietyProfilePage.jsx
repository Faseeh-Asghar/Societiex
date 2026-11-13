import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MapPin, CheckCircle, Send, Sparkles } from 'lucide-react';
import { getSocietyById } from '../../data/societies';
import { getEventsBySociety } from '../../data/events';
import ScrollReveal from '../../components/common/ScrollReveal';
import Footer from '../../components/layout/Footer';

/**
 * SocietyProfilePage Component
 * -------------------------------------------------------------
 * Dedicated profile view for a single society.
 * Displays real details, affiliated events, photo gallery, and clean Join Request modal.
 */
export default function SocietyProfilePage() {
  const { id } = useParams();
  const society = getSocietyById(id);
  const societyEvents = getEventsBySociety(id);

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    rollNo: '',
    department: 'BSCS',
    semester: '1st',
    interest: '',
  });

  if (!society) {
    return (
      <div className="min-h-screen bg-[#14110f] text-white pt-40 px-6 text-center">
        <h1 className="text-3xl font-bold font-serif">Society Not Found</h1>
        <p className="mt-3 text-white/60 text-sm">
          The requested society profile does not exist or has been relocated.
        </p>
        <Link
          to="/societies"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Societies</span>
        </Link>
      </div>
    );
  }

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setJoinSubmitted(true);
    setTimeout(() => {
      setIsJoinModalOpen(false);
      setJoinSubmitted(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#14110f] text-white pt-24 md:pt-32">
      {/* 1. Hero Cover Banner */}
      <section className="relative w-full h-[380px] md:h-[480px] overflow-hidden bg-black/60">
        <img
          src={society.coverImage}
          alt={society.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] via-[#14110f]/40 to-black/60" />

        {/* Back Link */}
        <div className="absolute top-6 left-6 md:left-12 z-10">
          <Link
            to="/societies"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Societies</span>
          </Link>
        </div>

        {/* Hero Metadata */}
        <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-wider text-amber-200">
              {society.category}
            </span>
            <span className="font-mono text-xs text-white/60 uppercase tracking-widest">
              FAST-NUCES CFD CHAPTER
            </span>
            {society.founded && (
              <span className="font-mono text-xs text-white/60">
                • Est. {society.founded}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
              >
                {society.name}
              </h1>
              <p className="font-mono text-sm tracking-widest text-amber-200/80 mt-1 uppercase">
                [{society.shortName}]
              </p>
            </div>

            {/* Action CTA */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black hover:bg-amber-100 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-xl cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Apply to Join</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Stream */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: About & Events */}
          <div className="lg:col-span-8 space-y-16">
            {/* About Section */}
            <ScrollReveal>
              <div className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold text-white tracking-wide"
                  style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                >
                  About the Society
                </h2>
                <p className="text-white/70 text-base leading-relaxed font-sans">
                  {society.description}
                </p>
                <p className="text-white/60 text-sm leading-relaxed font-sans pt-2">
                  Operating directly under the mentorship of university faculty and elected student leadership,
                  this society provides hands-on workshops, campus-wide competitions, and structured skill development
                  for students across all batches.
                </p>
              </div>
            </ScrollReveal>

            {/* Events Section */}
            <ScrollReveal>
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h2
                    className="text-2xl font-bold text-white tracking-wide"
                    style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                  >
                    Scheduled Events & Fixtures
                  </h2>
                  <span className="font-mono text-xs text-white/50">
                    {societyEvents.length} Event(s)
                  </span>
                </div>

                {societyEvents.length > 0 ? (
                  <div className="space-y-4">
                    {societyEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-5 rounded-2xl bg-[#1b1714] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-mono text-amber-200/80">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{evt.date} • {evt.time}</span>
                          </div>
                          <h3 className="text-lg font-bold text-white font-sans">{evt.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                            <MapPin className="w-3 h-3" />
                            <span>{evt.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-white/50">
                            {evt.rsvpCount} Attending
                          </span>
                          <Link
                            to={`/events#${evt.id}`}
                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <p className="text-xs font-mono text-white/40 uppercase">
                      No upcoming public fixtures posted right now. Check back soon!
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Photo Showcase */}
            <ScrollReveal>
              <div className="space-y-6">
                <h2
                  className="text-2xl font-bold text-white tracking-wide"
                  style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                >
                  Campus Activity Gallery
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    society.coverImage,
                    '/societies/campus-08.webp',
                    '/societies/campus-14.jpeg',
                    '/societies/campus-18.jpeg',
                    '/societies/campus-24.jpeg',
                    '/societies/campus-28.jpeg',
                  ].map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className="relative h-36 sm:h-44 rounded-xl overflow-hidden bg-black/40 border border-white/10 group"
                    >
                      <img
                        src={imgSrc}
                        alt="Campus activity"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Metadata Card */}
          <div className="lg:col-span-4 space-y-6">
            <ScrollReveal delay={0.2}>
              <div className="p-6 rounded-2xl bg-[#1b1714] border border-white/10 space-y-6">
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                >
                  Society Details
                </h3>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <span className="text-white/50">Category</span>
                    <span className="text-amber-200 capitalize">{society.category}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <span className="text-white/50">Active Roster</span>
                    <span className="text-white">{society.memberCount}+ Members</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <span className="text-white/50">Affiliation</span>
                    <span className="text-white">FAST-NUCES CFD</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <span className="text-white/50">Status</span>
                    <span className="text-emerald-400">Officially Chartered</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsJoinModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer"
                >
                  Request to Join
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* 3. Join Society Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsJoinModalOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md rounded-2xl bg-[#181412] border border-white/15 p-6 shadow-2xl z-10">
            {joinSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold font-serif text-white">Application Received</h3>
                <p className="text-xs text-white/60 font-mono">
                  Your interest to join {society.name} has been recorded for the upcoming recruitment cycle.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                  >
                    Join {society.shortName}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsJoinModalOpen(false)}
                    className="text-white/50 hover:text-white text-xs font-mono cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div>
                    <label className="block text-white/60 font-mono text-[11px] mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Muhammad Ahmed"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 font-mono text-[11px] mb-1">Roll Number</label>
                    <input
                      required
                      type="text"
                      value={formData.rollNo}
                      onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                      placeholder="e.g. 24F-0646"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/60 font-mono text-[11px] mb-1">Department</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#221d19] border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                      >
                        <option value="BSCS">BS Computer Science</option>
                        <option value="BSSE">BS Software Eng.</option>
                        <option value="BSAI">BS Artificial Intel.</option>
                        <option value="BSDS">BS Data Science</option>
                        <option value="BBA">BBA / FinTech</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white/60 font-mono text-[11px] mb-1">Semester</label>
                      <select
                        value={formData.semester}
                        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#221d19] border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                      >
                        <option value="1st">1st Semester</option>
                        <option value="2nd">2nd Semester</option>
                        <option value="3rd">3rd Semester</option>
                        <option value="4th">4th Semester</option>
                        <option value="5th+">5th+ Semester</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 font-mono text-[11px] mb-1">
                      Why do you want to join?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      placeholder="Briefly state your relevant skills or interest..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-sans"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-amber-100 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
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
