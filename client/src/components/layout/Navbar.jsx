import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ArrowRight } from 'lucide-react';
import MobileDrawer from './MobileDrawer';

/**
 * Navbar Component
 * -------------------------------------------------------------
 * Global navigation header for SOCIETIX.
 * - Perfectly coordinates with BrandLogo in the upper-left.
 * - Transparent on hero slider, frosted glass on scroll or interior pages.
 * - Anti-AI design: Crisp typography, warm slate tones, no purple/neon.
 * - No "President Portal" or admin clutter — clean public editorial hierarchy.
 */
export default function Navbar({ isLanded = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show navbar once the intro has landed
  if (!isLanded) return null;

  const isFrosted = scrolled || !isHomePage;

  const navLinks = [
    { name: 'Societies', path: '/societies' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isFrosted
            ? 'bg-[#14110f]/85 backdrop-blur-md border-b border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Spacer corresponding to the fixed BrandLogo in upper-left corner */}
          <Link
            to="/"
            className="w-[210px] md:w-[265px] h-10 flex items-center select-none"
            title="SOCIETIX — Home"
          >
            {/* Transparent click target over the fixed BrandLogo */}
            <span className="sr-only">SOCIETIX Home</span>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-widest uppercase font-mono transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-white font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="/auth/login"
              className="hidden sm:inline-block text-xs uppercase font-mono tracking-widest text-white/70 hover:text-white transition-colors px-3 py-2"
            >
              Sign In
            </Link>

            <Link
              to="/societies"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono tracking-wider text-white transition-all duration-300 group cursor-pointer"
            >
              <span>Explore Clubs</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Hamburger Trigger (Mobile & Tablet) */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
