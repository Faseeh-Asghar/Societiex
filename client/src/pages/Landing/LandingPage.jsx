import React, { useRef } from 'react';
import FullscreenPhotoSlider from '../../components/common/FullscreenPhotoSlider';
import HeroOverlay from '../../components/landing/HeroOverlay';
import SocietyStrip from '../../components/landing/SocietyStrip';
import EventsPreview from '../../components/landing/EventsPreview';
import PhotoMosaic from '../../components/landing/PhotoMosaic';
import Footer from '../../components/layout/Footer';

/**
 * LandingPage Component
 * -------------------------------------------------------------
 * Complete editorial landing page for SOCIETIX:
 * 1. Fullscreen edge-to-edge photo carousel (auto-rotates + horizontal drag/swipe).
 * 2. Non-blocking HeroOverlay with editorial headline & scroll trigger.
 * 3. SocietyStrip showing campus verticals with direct links.
 * 4. EventsPreview highlighting upcoming campus tournaments & hackathons.
 * 5. PhotoMosaic showing real photography from FAST-NUCES CFD.
 * 6. Minimalist, academic-grade Footer.
 */
export default function LandingPage() {
  const contentRef = useRef(null);

  const handleScrollDown = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-[#14110f] text-white">
      {/* 1. Full-Viewport Hero Slider Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <FullscreenPhotoSlider />
        <HeroOverlay onScrollDown={handleScrollDown} />
      </section>

      {/* 2. Structured Editorial Content Stream */}
      <div ref={contentRef} className="relative z-20">
        <SocietyStrip />
        <EventsPreview />
        <PhotoMosaic />
        <Footer />
      </div>
    </main>
  );
}
