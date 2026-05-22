import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuLoaderCircle, LuArrowLeft } from 'react-icons/lu';
import logo from '../assets/logo.svg';
import { FaCheckCircle } from "react-icons/fa";
import { forgotPassword } from '../api/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    try {
      setStatus('loading');

      await forgotPassword(email);

      setStatus('success');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full text-[#e5e5e5] font-sans selection:bg-white/20 flex flex-col items-center justify-center relative overflow-hidden">

      <div className="w-full max-w-sm px-6 relative z-1 flex flex-col items-center">

        {/* Logo Placeholder (Matching your sign-in screen) */}
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
              <h1 className="text-2xl font-bold tracking-tight text-white mb-3">Check your inbox</h1>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8">
                If an account exists for <span className="text-white font-medium">{email}</span>, a reset link has been sent.
              </p>

              <button
                onClick={() => setStatus('idle')}
                className="w-full bg-[#111111] hover:bg-[#1a1a1a] border border-white/5 hover:border-white/10 text-white font-medium rounded-xl px-4 py-3.5 text-sm transition-all active:scale-[0.98]"
              >
                Back to login
              </button>
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
                <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Forgot Password</h1>
                <p className="text-sm text-neutral-400 font-light">
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
                    className="w-full bg-[#111111] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/20 focus:bg-[#161616] transition-colors disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="w-full bg-white text-black font-medium rounded-xl px-4 py-3.5 text-sm transition-all hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                >
                  {status === 'loading' ? (
                    <>
                    "Sending" <LuLoaderCircle size={18} className="animate-spin text-black" />
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              <div className="mt-8">
                <a
                  href="/signup"
                  className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors"
                >
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