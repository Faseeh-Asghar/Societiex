import React from 'react';
import ScrollReveal from '../common/ScrollReveal';

/**
 * PhotoMosaic Component
 * -------------------------------------------------------------
 * Clean, editorial visual gallery of authentic photography from FAST-NUCES CFD.
 * Features actual sports matches, northern expeditions, and campus life.
 */
export default function PhotoMosaic() {
  const photos = [
    {
      src: '/societies/campus-08.webp',
      title: 'Sports Guild • Raptors Cricket Championship',
      colSpan: 'md:col-span-8',
      height: 'h-72 md:h-[380px]',
      tag: 'Sports',
    },
    {
      src: '/societies/campus-18.jpeg',
      title: 'FAST Adventure Club • Northern Expedition',
      colSpan: 'md:col-span-4',
      height: 'h-72 md:h-[380px]',
      tag: 'Adventure',
    },
    {
      src: '/societies/campus-28.jpeg',
      title: 'Campus Community • Leadership Forum',
      colSpan: 'md:col-span-4',
      height: 'h-64 md:h-[300px]',
      tag: 'Community',
    },
    {
      src: '/societies/campus-24.jpeg',
      title: 'DRAMOCRATS • Annual Campus Stage Play',
      colSpan: 'md:col-span-4',
      height: 'h-64 md:h-[300px]',
      tag: 'Arts',
    },
    {
      src: '/societies/campus-14.jpeg',
      title: 'Symphonics • Live Acoustic Sessions',
      colSpan: 'md:col-span-4',
      height: 'h-64 md:h-[300px]',
      tag: 'Music',
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#171412] text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-10">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Gallery
            </h2>
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
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-amber-200">
                    {photo.tag}
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute bottom-3 left-4 right-4">
                  <p
                    className="text-sm font-medium text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
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
