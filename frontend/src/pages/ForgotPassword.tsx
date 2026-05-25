import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuLoaderCircle, LuArrowLeft } from 'react-icons/lu';
import logo from '../assets/logo.svg';
import { FaCheckCircle } from "react-icons/fa";
import { forgotPassword } from '../api/auth';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    try {
      setStatus('loading');

      await forgotPassword(email);
      toast.success("Check your email for reset instructions");

      setStatus('success');
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset email");
      setStatus('idle');
    }
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-colors duration-300 bg-neutral-200 dark:bg-[#111111] border border-black/5 dark:border-white/5 text-black/90 dark:text-white/90 placeholder-black/40 dark:placeholder-neutral-500 focus:border-black/20 dark:focus:border-white/20 dark:focus:bg-[#161616]";

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
              <h1 className="text-2xl font-bold tracking-tight text-black/90 dark:text-white/90 mb-3">Check your inbox</h1>
              <p className="text-sm text-black/80 dark:text-white/60 font-light leading-relaxed mb-8">
                If an account exists for <span className="text-black/90 dark:text-white/90 font-medium">{email}</span>, a reset link has been sent.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="w-full bg-black/5 dark:bg-[#111111] hover:bg-black/10 dark:hover:bg-[#1a1a1a] border border-black/5 dark:border-white/5 text-black/80 dark:text-white/90 font-medium rounded-xl px-4 py-3.5 text-sm transition-all active:scale-[0.98]">
                Back to login
              </button>
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
                <h1 className="text-2xl font-bold tracking-tight text-black/90 dark:text-white/90 mb-2">Forgot Password</h1>
                <p className="text-sm text-black/80 dark:text-white/50 font-light">
                  Enter your email and we'll send you a reset link.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    disabled={status === 'loading'}
                    className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`} />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="w-full bg-black text-white dark:bg-white dark:text-black font-medium rounded-xl px-4 py-3.5 text-sm transition-all hover:bg-black/80 dark:hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-lg hover:shadow-xl">
                  {status === 'loading' ? (
                    <>
                      Sending <LuLoaderCircle size={18} className="animate-spin text-white dark:text-black" />
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
              <div className="mt-8">
                <a
                  href="/signup"
                  className="flex items-center gap-2 text-sm text-black/40 hover:text-black/80 dark:text-white/40 dark:hover:text-white/80 transition-colors font-medium">
                  <LuArrowLeft size={14} />
                  <span>Back to login</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}