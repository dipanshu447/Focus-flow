import React, { useState } from 'react';
import { 
  FiTarget, FiCheckCircle, FiBarChart2, FiCommand, 
  FiZap, FiPlay, FiPause, FiRefreshCcw, FiSettings,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

export default function Focus() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [timerState, setTimerState] = useState('idle'); // idle, running, paused
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes default
  const [activeTab, setActiveTab] = useState('focus');

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const navItems = [
    { id: 'focus', icon: FiTarget, label: 'Focus' },
    { id: 'tasks', icon: FiCheckCircle, label: 'Tasks' },
    { id: 'analytics', icon: FiBarChart2, label: 'Analytics' },
    { id: 'ai', icon: BsStars, label: 'Assistant' },
  ];

  return (
    <div className="w-full text-[#e5e5e5] flex font-sans selection:bg-white/20">
      {/* ================= MAIN WORKSPACE ================= */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Subtle Top Bar */}
        <header className="h-20 px-8 flex items-center justify-between w-full absolute top-0 left-0 z-10">
          <div className="text-xs font-medium tracking-[0.2em] text-white/30 uppercase">
            Wednesday, May 13
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md text-xs text-white/50">
              <FiCommand size={12} />
              <span>K</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-white/40">
              <FiZap size={14} className="text-white/60 fill-current" />
              <span>Day 12 Streak</span>
            </div>
          </div>
        </header>

        {/* Cinematic Timer Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-0">
          
          {/* Active Task Minimal Display */}
          <div className="mb-12 flex flex-col items-center group cursor-pointer">
            <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-3">Current Focus</p>
            <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-transparent group-hover:border-white/10 transition-colors">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <h2 className="text-lg md:text-xl font-medium tracking-tight text-white/80">
                Mera Saashu App - Production Build
              </h2>
            </div>
          </div>

          {/* The Timer */}
          <div className="relative flex items-center justify-center mb-16">
            {/* Extremely subtle ambient glow behind timer */}
            <div className="absolute w-[120%] h-[120%] bg-white/[0.01] blur-3xl rounded-full pointer-events-none"></div>
            
            <h1 
              className="text-[6rem] md:text-[12rem] leading-none font-light tracking-tighter text-white tabular-nums select-none"
              style={{ letterSpacing: '-0.04em' }}
            >
              {formatTime(timeLeft)}
            </h1>
          </div>

          {/* Primary Controls */}
          <div className="flex items-center gap-6">
            <button className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all">
              <FiRefreshCcw size={18} />
            </button>
            
            <button 
              onClick={() => setTimerState(timerState === 'running' ? 'paused' : 'running')}
              className="px-10 py-4 rounded-full bg-white text-black font-medium tracking-wide flex items-center gap-3 hover:bg-white/90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {timerState === 'running' ? (
                <>
                  <FiPause size={20} className="fill-current" />
                  <span>Pause Session</span>
                </>
              ) : (
                <>
                  <FiPlay size={20} className="fill-current" />
                  <span>Start Focus</span>
                </>
              )}
            </button>

            <button className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all">
              <FiCheckCircle size={18} />
            </button>
          </div>
        </div>

        {/* AI Command / Stats Footer */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6 hidden md:block">
          <div className="h-12 w-full rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-xl flex items-center px-4 overflow-hidden shadow-2xl">
            <BsStars size={16} className="text-white/30 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Ask AI to break down this task..." 
              className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-white/30"
            />
          </div>
        </div>
      </main>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      
    </div>
  );
}