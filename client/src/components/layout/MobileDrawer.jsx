import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, Compass, Calendar, Info, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * MobileDrawer Component
 * -------------------------------------------------------------
 * Lateral slide-out navigation panel inspired by DAQ Consulting.
 * Clean, minimal, zero filler text.
 */
export default function MobileDrawer({ isOpen, onClose }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    onClose();
  }, [location.pathname]);

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
    { name: 'Societies', path: '/societies', icon: Compass },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'About', path: '/about', icon: Info },
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
            className="absolute top-0 right-0 bottom-0 w-full max-w-xs bg-[#161311] border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 z-10"
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span
                  className="font-bold tracking-widest text-sm text-white"
                  style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                >
                  SOCIETIX
                </span>
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Pill (if authenticated) */}
              {user && (
                <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-200" />
                    <div>
                      <div className="text-white font-medium truncate max-w-[140px]">{user.fullName}</div>
                      <div className="text-white/40 text-[10px]">{user.rollNo}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Links */}
              <nav className="mt-6 space-y-1.5">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`group flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-white/10 text-white font-medium border border-white/15'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white'}`} />
                        <span className="text-sm tracking-wide">{link.name}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-white/60" />
                    </Link>
                  );
                })}

                {!user && (
                  <Link
                    to="/auth/login"
                    className="group flex items-center justify-between p-3.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <LogIn className="w-4 h-4 text-white/40 group-hover:text-white" />
                      <span className="text-sm tracking-wide">Sign In</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-white/60" />
                  </Link>
                )}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/30 text-center">
              FAST-NUCES CFD
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
