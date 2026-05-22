import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuLoaderCircle, LuEye, LuEyeOff } from 'react-icons/lu';
import { FaCheckCircle } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import logo from '../assets/logo.svg';
import { resetPassword } from '../api/auth';
import { useNavigate } from 'react-router';
import { AiOutlineLoading } from "react-icons/ai";

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/signup");
    }
  }, [token, navigate]);

  // --- Password Strength Logic ---
  const getStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1; // Minimum length
    if (pass.length >= 8 && pass.match(/[A-Z]/) && pass.match(/[0-9]/)) score += 1; // Good
    if (pass.length >= 10 && pass.match(/[^A-Za-z0-9]/)) score += 1; // Strong
    return score;
  };

  const strength = getStrength(password);

  // --- Handlers ---
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setStatus('loading');

      if(!token) return;

      await resetPassword(token, password);

      setStatus('success');
      navigate("/signup");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full text-[#e5e5e5] font-sans selection:bg-white/20 flex flex-col items-center justify-center relative overflow-hidden">

      <div className="w-full max-w-90 px-6 relative z-10 flex flex-col items-center">

        {/* Logo Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          <img src={logo} className="text-white dark:text-black" />
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            /* --- SUCCESS STATE --- */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-white/3 border border-white/10 flex items-center justify-center mb-6">
                <FaCheckCircle size={24} className="text-white/80" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-3">Password reset successful</h1>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8 flex items-center gap-2">
                <LuLoaderCircle size={14} className="animate-spin text-neutral-500" />
                Redirecting to login...
              </p>
            </motion.div>
          ) : (
            /* --- FORM STATE --- */
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center mb-8 w-full">
                <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Create New Password</h1>
                <p className="text-sm text-neutral-400 font-light">
                  Your new password should be secure and easy to remember.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">

                {/* New Password Input Group */}
                <div className="flex flex-col gap-2">
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="New password"
                      disabled={status === 'loading'}
                      className="w-full bg-[#111111] border border-white/5 rounded-xl pl-4 pr-12 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/20 focus:bg-[#161616] transition-colors disabled:opacity-50"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-neutral-500 hover:text-white/80 transition-colors focus:outline-none"
                    >
                      {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                    </button>
                  </div>

                  {/* Monochrome Password Strength Indicator */}
                  <div className="flex items-center gap-1.5 px-1 mt-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength >= level ? 'bg-white/80' : 'bg-white/10'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Confirm Password Input Group */}
                <div className="relative flex items-center">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Confirm password"
                    disabled={status === 'loading'}
                    className="w-full bg-[#111111] border border-white/5 rounded-xl pl-4 pr-12 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/20 focus:bg-[#161616] transition-colors disabled:opacity-50"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 text-neutral-500 hover:text-white/80 transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                  </button>
                </div>

                {/* Error Message (Monochrome) */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: -4 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="flex items-center gap-2 text-neutral-400 text-xs px-1"
                    >
                      <IoAlertCircle size={14} className="shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading' || !password || !confirmPassword}
                  className="w-full bg-white text-black font-medium rounded-xl px-4 py-3.5 text-sm transition-all hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                >
                  {status === 'loading' ? (
                    <AiOutlineLoading size={18} className="animate-spin text-black" />
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}