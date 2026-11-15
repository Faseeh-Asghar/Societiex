import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Mail, User, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * SignupPage Component
 * -------------------------------------------------------------
 * Clean student registration form connected to Societix Auth API.
 * Minimalist, functional platform style.
 */
export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('BSCS');
  const [semester, setSemester] = useState('1st');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register({
        fullName,
        rollNo,
        email,
        password,
        department,
        semester,
      });

      setSubmitted(true);
      setTimeout(() => {
        navigate('/societies');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#14110f] text-white flex flex-col justify-between">
      {/* Top Bar */}
      <div className="p-6 md:p-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-12 rounded-3xl bg-[#1b1714] border border-white/10 overflow-hidden shadow-2xl">
          {/* Left Column: Visual */}
          <div className="md:col-span-5 relative hidden md:block bg-black/60 overflow-hidden">
            <img
              src="/societies/campus-18.jpeg"
              alt="Campus"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            <div className="absolute bottom-6 left-6 right-6">
              <p
                className="text-lg font-bold text-white leading-snug"
                style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
              >
                SOCIETIX
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-8 space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h2 className="text-xl font-bold font-serif text-white">Account Created</h2>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <h1
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                  >
                    Register
                  </h1>
                </div>

                {error && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        required
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Muhammad Ahmed"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1 uppercase tracking-wider">
                        Roll Number
                      </label>
                      <input
                        required
                        type="text"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        placeholder="24F-0646"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1 uppercase tracking-wider">
                        Department
                      </label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#221d19] border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                      >
                        <option value="BSCS">BS CS</option>
                        <option value="BSSE">BS SE</option>
                        <option value="BSAI">BS AI</option>
                        <option value="BSDS">BS DS</option>
                        <option value="BBA">BBA</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1 uppercase tracking-wider">
                      University Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="f240646@cfd.nu.edu.pk"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1 uppercase tracking-wider">
                        Semester
                      </label>
                      <select
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#221d19] border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                      >
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                        <option value="4th">4th</option>
                        <option value="5th">5th</option>
                        <option value="6th">6th</option>
                        <option value="7th">7th</option>
                        <option value="8th">8th</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1 uppercase tracking-wider">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          required
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-300 outline-none text-white text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
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

      <div className="p-4 text-center text-xs font-mono text-white/30">
        FAST-NUCES CFD
      </div>
    </div>
  );
}
