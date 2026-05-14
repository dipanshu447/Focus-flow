import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, CheckCircle, BarChart2, 
  Sparkles, Settings, PanelLeftClose, PanelLeftOpen, 
  Target, Zap, Command
} from 'lucide-react';

export default function FocusFlowDashboard() {
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
    { id: 'focus', icon: Target, label: 'Focus' },
    { id: 'tasks', icon: CheckCircle, label: 'Tasks' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'ai', icon: Sparkles, label: 'Assistant' },
  ];

  return (
    <div className="w-full text-[#e5e5e5] flex font-sans selection:bg-white/20 py-30">
      
      {/* ================= DESKTOP SIDEBAR ================= */}
      

      {/* ================= MAIN WORKSPACE ================= */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Subtle Top Bar */}
        <header className="h-20 px-8 flex items-center justify-between w-full absolute top-0 left-0 z-10">
          <div className="text-xs font-medium tracking-[0.2em] text-white/30 uppercase">
            Wednesday, May 13
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md text-xs text-white/50">
              <Command size={12} />
              <span>K</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-white/40">
              <Zap size={14} className="text-white/60" />
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
              <RotateCcw size={18} />
            </button>
            
            <button 
              onClick={() => setTimerState(timerState === 'running' ? 'paused' : 'running')}
              className="px-10 py-4 rounded-full bg-white text-black font-medium tracking-wide flex items-center gap-3 hover:bg-white/90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {timerState === 'running' ? (
                <>
                  <Pause size={20} fill="currentColor" />
                  <span>Pause Session</span>
                </>
              ) : (
                <>
                  <Play size={20} fill="currentColor" />
                  <span>Start Focus</span>
                </>
              )}
            </button>

            <button className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all">
              <CheckCircle size={18} />
            </button>
          </div>
        </div>

        {/* AI Command / Stats Footer */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6 hidden md:block">
          <div className="h-12 w-full rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-xl flex items-center px-4 overflow-hidden shadow-2xl">
            <Sparkles size={16} className="text-white/30 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Ask AI to break down this task..." 
              className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-white/30"
            />
          </div>
        </div>
      </main>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 border-t border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl flex items-center justify-around px-6 z-50">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1.5 transition-colors p-2 ${
                isActive ? 'text-white' : 'text-white/30'
              }`}
            >
              <Icon size={22} className={isActive ? 'opacity-100' : 'opacity-80'} />
              <span className="text-[10px] font-medium tracking-wider uppercase opacity-80">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
      
    </div>
  );
}