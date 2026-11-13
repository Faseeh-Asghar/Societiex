import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Mail, User, CheckCircle } from 'lucide-react';

/**
 * SignupPage Component
 * -------------------------------------------------------------
 * Clean student registration form.
 * Clean split layout matching LoginPage.
 */
export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/societies');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#14110f] text-white flex flex-col justify-between">
      {/* Top Navbar Bar */}
      <div className="p-6 md:p-10 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <span className="font-mono text-xs text-white/40 uppercase">
          SOCIETIX REGISTRATION
        </span>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 rounded-3xl bg-[#1b1714] border border-white/10 overflow-hidden shadow-2xl">
          {/* Left Column: Visual */}
          <div className="md:col-span-5 relative hidden md:block bg-black/60 overflow-hidden">
            <img
              src="/societies/campus-18.jpeg"
              alt="Adventure club expedition"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="font-mono text-[11px] uppercase tracking-widest text-amber-200">
                FAST-NUCES CFD
              </span>
              <p
                className="mt-2 text-xl font-bold text-white leading-snug"
                style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
              >
                Join the Campus Society Ecosystem.
              </p>
              <p className="mt-2 text-xs text-white/60 font-sans leading-relaxed">
                Unlock direct RSVP to campus events, connect with society executives, and showcase your extra-curricular achievements.
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h2 className="text-2xl font-bold font-serif text-white">Account Created</h2>
                <p className="text-xs font-mono text-white/60">
                  Welcome to Societix! Redirecting to campus societies...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <h1
                    className="text-2xl sm:text-3xl font-bold text-white"
                    style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                  >
                    Student Registration
                  </h1>
                  <p className="mt-1.5 text-xs sm:text-sm text-white/60 font-sans">
                    Create your student profile with your university credentials.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        required
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Muhammad Ahmed"
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1 uppercase tracking-wider">
                      University Roll Number
                    </label>
                    <input
                      required
                      type="text"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      placeholder="e.g. 24F-0646"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1 uppercase tracking-wider">
                      University Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="f240646@cfd.nu.edu.pk"
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-amber-100 transition-colors shadow-lg cursor-pointer"
                >
                  Create Account
                </button>

                <div className="text-center text-xs text-white/50 font-sans">
                  Already registered?{' '}
                  <Link to="/auth/login" className="text-white hover:text-amber-200 font-mono underline ml-1">
                    Sign In
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 text-center text-xs font-mono text-white/30">
        FAST-NUCES CFD • Unified Platform
      </div>
    </div>
  );
}
