import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowUpRight, Compass, Calendar, Info, LogIn } from 'lucide-react';

/**
 * MobileDrawer Component
 * -------------------------------------------------------------
 * Lateral slide-out navigation panel inspired by DAQ Consulting.
 * Slides smoothly from the right with spring physics, without hard page reloads.
 */
export default function MobileDrawer({ isOpen, onClose }) {
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Discover Societies', path: '/societies', icon: Compass, count: '18 Clubs' },
    { name: 'Campus Events', path: '/events', icon: Calendar, count: 'Upcoming' },
    { name: 'About Societix', path: '/about', icon: Info, count: 'FAST CFD' },
    { name: 'Member Sign In', path: '/auth/login', icon: LogIn, count: 'Portal' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#161311] border-l border-white/10 shadow-2xl flex flex-col justify-between p-8 z-10"
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-widest text-amber-200/70">
                  Navigation Menu
                </span>
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="mt-8 space-y-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-white/10 text-white font-medium border border-white/15'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-white/40 group-hover:text-amber-200'}`} />
                        <span className="text-base tracking-wide">{link.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-white/40 uppercase">
                          {link.count}
                        </span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-200" />
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between text-xs font-mono text-white/40">
                <span>FAST-NUCES CFD</span>
                <span>EST. 2026</span>
              </div>
              <p className="mt-2 text-xs text-white/50 leading-relaxed font-sans">
                Unified society hub connecting students, events, and campus life.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
