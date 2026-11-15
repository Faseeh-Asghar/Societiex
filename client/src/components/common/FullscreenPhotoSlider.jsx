import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import user-provided images
import img1 from '../../assets/images/1.1.jpeg';
import img2 from '../../assets/images/1.2.jpeg';
import img3 from '../../assets/images/1.3.jpeg';
import img4 from '../../assets/images/1.4.jpeg';
import img5 from '../../assets/images/1.5.jpeg';

const SLIDES = [
  { id: 1, src: img1, title: 'Outdoor Adventure & Expeditions' },
  { id: 2, src: img2, title: 'Tech, Hackathons & Innovation' },
  { id: 3, src: img3, title: 'Debating & Parliamentary Declamations' },
  { id: 4, src: img4, title: 'Music & Performing Arts' },
  { id: 5, src: img5, title: 'Campus Community & Wilderness Treks' },
];

const AUTO_ROTATE_INTERVAL = 6000; // 6 seconds per photo

// Smooth horizontal slide variants
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0.9,
    scale: 1.04,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { duration: 0.95, ease: [0.19, 1, 0.22, 1] },
      opacity: { duration: 0.6 },
      scale: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0.8,
    scale: 0.98,
    transition: {
      x: { duration: 0.95, ease: [0.19, 1, 0.22, 1] },
      opacity: { duration: 0.5 },
      scale: { duration: 0.95 },
    },
  }),
};

/**
 * FullscreenPhotoSlider Component
 * -----------------------------------------------------------------
 * Full-page, edge-to-edge horizontal photo showcase.
 * 
 * Features:
 * 1. Shows 1 photo at a time covering 100% of the screen (`object-cover`).
 * 2. Automatic horizontal rotation every 6 seconds.
 * 3. Horizontal Gesture Input: Slides strictly on mouse drag or touchpad
 *    horizontal swipe (`deltaX` wheel swipe).
 * 4. Minimal luxury pagination line indicators at bottom.
 */
export default function FullscreenPhotoSlider() {
  const [[currentIndex, direction], setPage] = useState([0, 1]);
  const isDraggingRef = useRef(false);
  const lastWheelTimeRef = useRef(0);

  // Paginate handler
  const paginate = useCallback((newDirection) => {
    setPage(([prevIndex]) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = SLIDES.length - 1;
      if (nextIndex >= SLIDES.length) nextIndex = 0;
      return [nextIndex, newDirection];
    });
  }, []);

  // 1. Auto-rotation timer (loops indefinitely)
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(timer);
  }, [currentIndex, paginate]);

  // 2. Horizontal touchpad / trackpad swipe handling (wheel deltaX)
  useEffect(() => {
    const handleWheel = (e) => {
      // Only respond to deliberate horizontal swipes
      if (Math.abs(e.deltaX) > 35 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        const now = Date.now();
        // Debounce to prevent multiple slides on one continuous swipe
        if (now - lastWheelTimeRef.current > 750) {
          lastWheelTimeRef.current = now;
          if (e.deltaX > 0) {
            paginate(1); // Swipe left / move to next
          } else {
            paginate(-1); // Swipe right / move to prev
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [paginate]);

  // 3. Mouse / touch drag end handler
  const handleDragEnd = (e, { offset, velocity }) => {
    isDraggingRef.current = false;
    const swipeThreshold = 50; // px
    const velocityThreshold = 300;

    if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
      paginate(1);
    } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
      paginate(-1);
    }
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <div className="absolute inset-0 w-full h-full z-10 overflow-hidden select-none bg-black">
      {/* Horizontal Sliding Photo Container */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Full-Page Edge-to-Edge Image */}
          <img
            src={currentSlide.src}
            alt={currentSlide.title}
            className="w-full h-full object-cover pointer-events-none"
            loading="eager"
          />

          {/* Cinematic Scrims (Top & Bottom subtle gradients for navbar & indicators) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-30" />
        </motion.div>
      </AnimatePresence>

      {/* Minimal Luxury Pagination Line Indicators (Bottom Center) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 pointer-events-auto">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => {
                const newDirection = idx > currentIndex ? 1 : -1;
                setPage([idx, newDirection]);
              }}
              className="group relative py-3 focus:outline-none cursor-pointer"
              title={`Go to photo ${idx + 1}`}
            >
              {/* Line track */}
              <div
                className={`h-1 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'w-12 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                    : 'w-6 bg-white/35 group-hover:bg-white/60 group-hover:w-8'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Slide Counter (Bottom Right) */}
      <div className="absolute bottom-8 right-8 z-30 hidden md:block text-xs font-mono tracking-widest text-white/60 pointer-events-none">
        0{currentIndex + 1} / 0{SLIDES.length}
      </div>
    </div>
  );
}
