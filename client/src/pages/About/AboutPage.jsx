import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Database, Users, ArrowRight, Building } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import Footer from '../../components/layout/Footer';

/**
 * AboutPage Component
 * -------------------------------------------------------------
 * Editorial narrative about SOCIETIX and its purpose at FAST-NUCES CFD.
 * Explains the problem solved without boring corporate speak.
 */
export default function AboutPage() {
  const pillars = [
    {
      icon: Database,
      title: 'Institutional Memory',
      description:
        'When society leadership graduates, years of event archives, rosters, and media are preserved permanently rather than disappearing inside private chat groups.',
    },
    {
      icon: Users,
      title: 'Zero-Friction Discovery',
      description:
        'New students and freshers can browse all 18 chartered societies, view live event schedules, and join directly without hunting for unofficial group links.',
    },
    {
      icon: Shield,
      title: 'Academic Oversight',
      description:
        'Provides the Office of Student Affairs and campus leadership with a centralized record of student achievements, attendance logs, and co-curricular compliance.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#14110f] text-white pt-28 md:pt-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        {/* Header Hero */}
        <ScrollReveal>
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-200/80 mb-3">
              <Building className="w-3.5 h-3.5" />
              <span>FAST-NUCES CFD Chapter</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              The Unified Campus Home for University Societies.
            </h1>
            <p className="mt-6 text-white/70 text-base md:text-lg font-sans leading-relaxed">
              Societix was conceived to solve a fundamental challenge at university campuses:
              student engagement was fragmented across WhatsApp groups, Google Sheets, and ephemeral social media accounts.
              We built a permanent, bespoke digital ecosystem to unite our campus life.
            </p>
          </div>
        </ScrollReveal>

        {/* Big Visual Banner */}
        <ScrollReveal delay={0.1}>
          <div className="relative h-[340px] md:h-[480px] rounded-3xl overflow-hidden bg-black/60 border border-white/10 mb-20 shadow-2xl">
            <img
              src="/societies/campus-28.jpeg"
              alt="FAST campus students"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            <div className="absolute bottom-8 left-8 right-8 max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-200">
                CAMPUS COMMUNITY
              </span>
              <p
                className="mt-2 text-2xl font-bold text-white font-serif"
                style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
              >
                18 Societies. 1 Platform. Endless Ambition.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Pillars Section */}
        <div className="mb-24">
          <ScrollReveal>
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-200/80 block mb-2">
                Core Purpose
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
              >
                Built to Protect and Elevate Campus Life
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <div className="p-8 rounded-2xl bg-[#1b1714] border border-white/10 hover:border-white/20 transition-all space-y-4 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-200 mb-6">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                      >
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-white/60 leading-relaxed font-sans">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* CTA Bar */}
        <ScrollReveal>
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#221c17] via-[#1c1815] to-[#241e1a] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
            <div>
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
              >
                Ready to explore active societies?
              </h3>
              <p className="text-white/60 text-xs sm:text-sm mt-1 font-sans">
                Browse our directory of clubs spanning technology, debating, music, and sports.
              </p>
            </div>

            <Link
              to="/societies"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-amber-100 transition-colors shadow-lg self-start sm:self-auto cursor-pointer"
            >
              <span>Browse All Societies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  );
}
