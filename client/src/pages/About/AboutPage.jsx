import React from 'react';
import { Database, Users, Shield } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import Footer from '../../components/layout/Footer';

/**
 * AboutPage Component
 * -------------------------------------------------------------
 * Clean narrative about SOCIETIX and its architectural purpose at FAST-NUCES CFD.
 * Minimalist, architectural, zero marketing fluff.
 */
export default function AboutPage() {
  const pillars = [
    {
      icon: Database,
      title: 'Institutional Memory',
      description:
        'When society leadership graduates, event archives, rosters, and media are preserved permanently rather than lost inside private chat groups.',
    },
    {
      icon: Users,
      title: 'Discovery',
      description:
        'Students can browse chartered societies, view live event schedules, and join directly without relying on informal invitation links.',
    },
    {
      icon: Shield,
      title: 'Activity Records',
      description:
        'Provides a centralized, verifiable record of student participation, event registrations, and society leadership.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#14110f] text-white pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        {/* Header Hero */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              About
            </h1>
            <p className="mt-4 text-white/70 text-base md:text-lg font-sans leading-relaxed">
              Societix is the unified digital network for student societies at FAST-NUCES Chiniot-Faisalabad Campus.
              It replaces informal spreadsheets and chat channels with a permanent platform for campus activities.
            </p>
          </div>
        </ScrollReveal>

        {/* Visual Banner */}
        <ScrollReveal delay={0.08}>
          <div className="relative h-[280px] md:h-[400px] rounded-3xl overflow-hidden bg-black/60 border border-white/10 mb-16 shadow-2xl">
            <img
              src="/societies/campus-28.jpeg"
              alt="Campus students"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          </div>
        </ScrollReveal>

        {/* 3 Pillars Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 0.08}>
                  <div className="p-7 rounded-2xl bg-[#1b1714] border border-white/10 hover:border-white/20 transition-all space-y-4 h-full">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2
                      className="text-lg font-bold text-white"
                      style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                    >
                      {pillar.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
