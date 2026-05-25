import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuLoaderCircle, LuEye, LuEyeOff } from 'react-icons/lu';
import { FaCheckCircle } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import logo from '../assets/logo.svg';
import { resetPassword } from '../api/auth';
import { useNavigate } from 'react-router';
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from 'sonner';

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
      toast.error("Reset link has expired");
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
      toast.success("Password updated successfully");

      setStatus('success');
      setTimeout(() => navigate("/signup"), 1500);

    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password");
    }
  };

  const inputClass = "w-full bg-neutral-200 dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-xl pl-4 pr-12 py-3.5 text-sm text-black/90 dark:text-white/90 placeholder-black/40 dark:placeholder-neutral-500 focus:outline-none focus:border-black/20 dark:focus:border-white/20 dark:focus:bg-[#161616] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen w-full text-[#111] dark:text-[#e5e5e5] font-sans selection:bg-black/10 dark:selection:bg-white/20 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500">
      <div className="w-full max-w-90 px-6 relative z-10 flex flex-col items-center py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="size-10 rounded-xl flex items-center justify-center mb-8 bg-black dark:bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-colors duration-500">
          <img src={logo} alt="FocusFlow Logo" className="size-9 invert dark:invert-0" />
        </motion.div>
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mb-6">
                <FaCheckCircle size={24} className="text-black/80 dark:text-white/80" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-black/90 dark:text-white/90 mb-3">Password reset successful</h1>
              <p className="text-sm text-black/80 dark:text-white/50 font-light leading-relaxed mb-8 flex items-center justify-center gap-2">
                <LuLoaderCircle size={14} className="animate-spin" />
                Redirecting to login...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center">
              <div className="text-center mb-8 w-full">
                <h1 className="text-2xl font-bold tracking-tight text-black/90 dark:text-white/90 mb-2">Create New Password</h1>
                <p className="text-sm text-black/80 dark:text-white/50 font-light">
                  Your new password should be secure and easy to remember.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
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
                      className={inputClass} />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-black/40 hover:text-black/80 dark:text-white/40 dark:hover:text-white/80 transition-colors focus:outline-none">
                      {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 px-1 mt-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          strength >= level 
                            ? 'bg-black/60 dark:bg-white/80' 
                            : 'bg-black/10 dark:bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>
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
                    className={inputClass} />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 text-black/40 hover:text-black/80 dark:text-white/40 dark:hover:text-white/80 transition-colors focus:outline-none">
                    {showConfirmPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                  </button>
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: -4 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="flex items-center gap-2 text-black/60 dark:text-white/60 text-xs px-1 font-medium">
                      <IoAlertCircle size={14} className="shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  type="submit"
                  disabled={status === 'loading' || !password || !confirmPassword}
                  className="w-full bg-black text-white dark:bg-white dark:text-black font-medium rounded-xl px-4 py-3.5 text-sm transition-all hover:bg-black/80 dark:hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-lg hover:shadow-xl">
                  {status === 'loading' ? (
                    <AiOutlineLoading size={18} className="animate-spin text-white dark:text-black" />
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