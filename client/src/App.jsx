import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import HandSketchedBackground from './components/common/HandSketchedBackground';
import BrandLogo from './components/common/BrandLogo';
import Navbar from './components/layout/Navbar';
import ScrollToTop from './components/common/ScrollToTop';

// Top-Level Pages
import LandingPage from './pages/Landing/LandingPage';
import SocietiesPage from './pages/Societies/SocietiesPage';
import SocietyProfilePage from './pages/Societies/SocietyProfilePage';
import EventsPage from './pages/Events/EventsPage';
import EventDetailPage from './pages/Events/EventDetailPage';
import AboutPage from './pages/About/AboutPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

/**
 * App Root Component
 * ----------------------------------------------------------------------
 * Orchestrates:
 * 1. Warm Mountain Dusk Intro Canvas (harmonized with Photo 1.1 on initial load).
 * 2. Unboxed SOCIETIX Logo (Fills in center -> turns 100% pure white in upper navbar).
 * 3. Unified Client-Side Routing with React Router 7.
 * 4. Persistent, elegant Navbar and smooth page transitions.
 */
export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // If user navigates directly to interior page (e.g. /societies), skip intro
  const isDirectInterior = location.pathname !== '/';
  const [progress, setProgress] = useState(isDirectInterior ? 100 : 0);
  const [isLanded, setIsLanded] = useState(isDirectInterior);

  // 3.8-second smooth internal liquid loading progression (plays on initial home visit)
  useEffect(() => {
    if (isLanded) return;

    setProgress(0);
    const duration = 3800; // 3.8 seconds
    const intervalTime = 25;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // 450ms hold at 100% to admire the full fill before gliding
          setTimeout(() => {
            setIsLanded(true);
          }, 450);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isLanded]);

  const handleLogoClick = () => {
    if (isLanded) {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#14110f] text-white overflow-x-hidden">
      {/* 1. Scroll-To-Top Helper for Route Changes */}
      <ScrollToTop />

      {/* 2. Warm Mountain Intro Canvas (fades out when landed) */}
      <HandSketchedBackground isLanded={isLanded} />

      {/* 3. Unboxed SOCIETIX Logo (Fills in center -> glides to corner & turns PURE WHITE) */}
      <BrandLogo
        progress={progress}
        isLanded={isLanded}
        onClick={handleLogoClick}
      />

      {/* 4. Global Navigation Header (Renders when landed) */}
      <Navbar isLanded={isLanded} />

      {/* 5. Application Page Routes */}
      {isLanded && (
        <div className="relative z-10 w-full min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/societies" element={<SocietiesPage />} />
            <Route path="/societies/:id" element={<SocietyProfilePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/login" element={<Navigate to="/auth/login" replace />} />
            <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
}
