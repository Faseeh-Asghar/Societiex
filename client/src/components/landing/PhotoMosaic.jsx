import React from 'react';
import ScrollReveal from '../common/ScrollReveal';

/**
 * PhotoMosaic Component
 * -------------------------------------------------------------
 * Editorial visual mosaic featuring authentic photography from FAST-NUCES CFD.
 * Showcases actual sports matches, mountain expeditions, night gatherings, and stage plays.
 */
export default function PhotoMosaic() {
  const photos = [
    {
      src: '/societies/campus-08.webp',
      title: 'Sports Guild • Raptors Cricket Championship',
      colSpan: 'md:col-span-8',
      height: 'h-80 md:h-[420px]',
      tag: 'Sports',
    },
    {
      src: '/societies/campus-18.jpeg',
      title: 'FAST Adventure Club • Northern Expedition',
      colSpan: 'md:col-span-4',
      height: 'h-80 md:h-[420px]',
      tag: 'Adventure',
    },
    {
      src: '/societies/campus-28.jpeg',
      title: 'Campus Community • Late-Night Leadership Forum',
      colSpan: 'md:col-span-4',
      height: 'h-72 md:h-[340px]',
      tag: 'Community',
    },
    {
      src: '/societies/campus-24.jpeg',
      title: 'DRAMOCRATS • Annual Campus Stage Play',
      colSpan: 'md:col-span-4',
      height: 'h-72 md:h-[340px]',
      tag: 'Performing Arts',
    },
    {
      src: '/societies/campus-14.jpeg',
      title: 'Symphonics • Live Acoustic Sessions',
      colSpan: 'md:col-span-4',
      height: 'h-72 md:h-[340px]',
      tag: 'Music',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-[#171412] text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-200/80 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Campus Life in Action</span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Moments Captured Across FAST CFD
            </h2>
            <p className="mt-3 text-white/60 text-sm md:text-base font-sans leading-relaxed">
              Real stories, matches, treks, and performances. Every snapshot represents the authentic spirit of student life.
            </p>
          </div>
        </ScrollReveal>

        {/* Asymmetrical Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {photos.map((photo, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.08}
              className={`${photo.colSpan} relative rounded-2xl overflow-hidden bg-black/40 group border border-white/10 shadow-lg`}
            >
              <div className={`${photo.height} w-full relative overflow-hidden`}>
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-amber-200">
                    {photo.tag}
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p
                    className="text-sm md:text-base font-medium text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                    style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                  >
                    {photo.title}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
