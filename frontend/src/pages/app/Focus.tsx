import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiRefreshCcw, FiCircle } from 'react-icons/fi';
import useFocus from '../../hooks/useFocus';
import type { FocusContextType } from '../../types/Focus';
import { useBlocker, useSearchParams } from 'react-router';
import ConfirmationModal from '../../components/ConfirmationModal.tsx';
import { IoIosClose } from "react-icons/io";
import { todayStudiedTime } from '../../utils/analytics.ts';
import { createSessions } from '../../api/sessions.ts';
import { toast } from 'sonner';

export default function FocusPage() {
  const [searchParams] = useSearchParams();
  const [timerState, setTimerState] = useState<'idle' | 'running' | 'paused'>('idle');
  const [timerPhase, setTimerPhase] = useState<'focus' | 'break'>('focus');

  const [sessionDuration, setSessionDuration] = useState(25); // Default 25m
  const [breakDuration, setBreakDuration] = useState(5); // Default 5m
  const [sessionCount, setSessionCount] = useState(1); // Default 1 sessions
  const [currentSession, setCurrentSession] = useState(1);
  const [timeLeft, setTimeLeft] = useState(sessionDuration * 60);
  const [startedAt, setStartedAt] = useState<Date | null>(null);

  const [activeTab, setActiveTab] = useState<'tasks' | 'flow'>('tasks');
  const [showResetWarning, setShowResetWarning] = useState(false);
  const [pendingSettings, setPendingSettings] = useState<{ type: 'focus' | 'break' | 'count', val: number } | null>(null);

  const { tasks, setTasks, sessions, setSessions }: FocusContextType = useFocus();
  const [activeTaskId, setActiveTaskId] = useState<String | null>(searchParams.get('activeTaskId'));

  const blocker = useBlocker(({ currentLocation, nextLocation }) => timerState === "running" && currentLocation.pathname !== nextLocation.pathname);

  const handleToggleTimer = () => {
    if (timerState !== 'running' && !startedAt) {
      setStartedAt(new Date());
    }
    setTimerState(prev => prev === 'running' ? 'paused' : 'running');
  };

  const activeTask = tasks.find(t => t.id === activeTaskId);
  const pendingTasks = tasks.filter(t => !t.completed);

  const addSession = async () => {
    try {
      if (!startedAt) return;

      const data = await createSessions({
        duration: sessionDuration * 60,
        startedAt: startedAt.toISOString(),
        completedAt: new Date().toISOString(),
        taskId: activeTask?.id,
      });
      
      if (!data?.session) return;
      toast.success("Great work! Session completed");

      setSessions(prev => [...prev, data.session]);
      setStartedAt(null);

    } catch (error) {
      console.error(error);
      toast.error("Failed to save session");
    }
  };

  useEffect(() => {
    return () => {
      document.title = "FocusFlow";
    };
  }, [])

  // --- Cycle Logic ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let message: string | undefined;

    if (timerState === 'running' && timeLeft > 0) {
      message = timerPhase === "break" ? "Recharge" : activeTask ? activeTask.title : "Deep Work";
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          const newTime = prev - 1;
          document.title = `${formatTime(newTime)} • ${message}`;
          return newTime;
        });
      }, 1000);
    }
    else if (timerState === 'running' && timeLeft <= 0) {
      if (timerPhase === 'focus') {
        void addSession();
        if (currentSession < sessionCount) {
          setTimerPhase('break');
          setTimeLeft(breakDuration * 60);
        } else {
          setTimerPhase('focus');
          setTimerState('idle');
          setCurrentSession(1);
          setTimeLeft(sessionDuration * 60);
          document.title = "FocusFlow";
        }
        return;
      }
      if (timerPhase === 'break') {
        setTimerPhase('focus');
        setCurrentSession(prev => prev + 1);
        setTimeLeft(sessionDuration * 60);
        return;
      }
    } else if (timerState === 'paused') {
      document.title = 'Paused • FocusFlow';
      toast.info("Session paused");
    }

    return () => {
      clearInterval(interval);
    };

  }, [
    timerState,
    timeLeft,
    timerPhase,
    currentSession,
    sessionCount,
    breakDuration,
    sessionDuration,
    activeTask
  ]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (timerState !== "running") return;
      e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, [timerState])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleClearTask = () => {
    setActiveTaskId(null);
  };

  const handleResetTimer = () => {
    setTimerState('idle');
    setTimerPhase('focus');
    setCurrentSession(1);
    setTimeLeft(sessionDuration * 60);
    document.title = "FocusFlow";
    toast.info("Timer reset");
  };

  const handleSettingChangeRequest = (type: 'focus' | 'break' | 'count', val: number) => {
    if (timerState !== 'idle') {
      setPendingSettings({ type, val });
      setShowResetWarning(true);
    } else {
      applySetting(type, val);
    }
  };

  const applySetting = (type: 'focus' | 'break' | 'count', val: number) => {
    if (type === 'focus') {
      setSessionDuration(val);
      if (timerPhase === 'focus') setTimeLeft(val * 60);
    } else if (type === 'break') {
      setBreakDuration(val);
      if (timerPhase === 'break') setTimeLeft(val * 60);
    } else if (type === 'count') {
      setSessionCount(val);
    }
  };

  const confirmReset = () => {
    if (pendingSettings) {
      applySetting(pendingSettings.type, pendingSettings.val);
      const newFocusDur = pendingSettings.type === 'focus' ? pendingSettings.val : sessionDuration;
      setTimerState('idle');
      setTimerPhase('focus');
      setCurrentSession(1);
      setTimeLeft(newFocusDur * 60);
    }
    setShowResetWarning(false);
    setPendingSettings(null);
  };

  const cancelReset = () => {
    setShowResetWarning(false);
    setPendingSettings(null);
  };

  const handleToggleComplete = (id: string) => {
    if (id === activeTaskId) {
      setActiveTaskId(null);
    }
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const focusPresets = [
    { mins: 25, label: 'Focus' },
    { mins: 50, label: 'Deep Work' },
    { mins: 90, label: 'Flow State' }
  ];

  const breakPresets = [
    { mins: 5, label: 'Reset' },
    { mins: 10, label: 'Recovery' },
    { mins: 20, label: 'Long Break' }
  ];

  return (
    <div className="h-screen w-full text-[#111] dark:text-[#e5e5e5] font-sans selection:bg-black/10 dark:selection:bg-white/20 relative flex flex-col transition-colors duration-500 overflow-hidden">
      <AnimatePresence>
        {showResetWarning && (
          <ConfirmationModal 
            modalTitle="Reset Session?" 
            modalSubtext="Changing timer settings will reset the current session and pause the timer." 
            leftBtntext="Cancel" 
            rightBtntext="Confirm Reset" 
            leftBtnfunc={cancelReset} 
            rightBtnfunc={confirmReset} />
        )}
        {blocker.state === "blocked" && (
          <ConfirmationModal 
            modalTitle="Focus session active" 
            modalSubtext="Leaving this page may interrupt your session." 
            leftBtntext="Stay" 
            rightBtntext="Leave Anyway" 
            leftBtnfunc={() => blocker.reset()} 
            rightBtnfunc={() => blocker.proceed()} />
        )}
      </AnimatePresence>
      <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-y-hidden custom-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full lg:h-full w-full">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center items-start px-6 md:px-12 lg:pl-24 xl:pl-32 lg:pr-12 py-16 lg:py-0 min-h-[70vh] lg:min-h-0">
            <div className="flex flex-col items-start w-full max-w-4xl">
              <div className="flex flex-col items-start mb-8 md:mb-12 cursor-default transition-all duration-1000">
                {timerPhase === 'focus' ? (
                  <>
                    <span className="text-[10px] md:text-xs tracking-[0.3em] text-black/50 dark:text-white/30 uppercase font-medium mb-4 flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full transition-all duration-1000 ${timerState === 'running' ? 'bg-black dark:bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)] dark:shadow-[0_0_10px_rgba(255,255,255,0.6)]' : 'bg-black/20 dark:bg-white/20'}`} />
                      {timerState === 'idle' ? 'Ready to Focus' : `Session ${currentSession} of ${sessionCount}`}
                    </span>
                    <div className="flex items-center gap-4 md:gap-8 group">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-black/80 dark:text-white/80">
                        {timerState === 'idle' ? activeTask?.title || "Select an objective" : ((timerState === "running" || timerState === "paused") && !activeTask?.title) ? "Independent focus session" : activeTask?.title}
                      </h2>
                      {activeTaskId && (
                        <div 
                          onClick={handleClearTask} 
                          className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 border rounded-full border-black/10 dark:border-white/10 p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer mt-1">
                          <IoIosClose className="w-5 h-5 text-black/60 dark:text-white/60 transition-colors" />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] md:text-xs tracking-[0.3em] text-black/50 dark:text-white/30 uppercase font-medium mb-4 flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full transition-all duration-1000 ${timerState === 'running' ? 'bg-black/50 dark:bg-white/50 shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.3)] animate-pulse' : 'bg-black/20 dark:bg-white/20'}`} />
                      Recovery Break
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-black/50 dark:text-white/40 italic">
                      Next session starting soon.
                    </h2>
                  </>
                )}
              </div>
              <div className="relative mb-12 md:mb-16 select-none cursor-default transition-all duration-1000">
                <h1
                  className={`text-[clamp(5rem,14vw,17rem)] font-light leading-[0.85] tracking-tighter tabular-nums transition-colors duration-1000 ${
                    timerPhase === 'break' 
                      ? 'text-black/50 dark:text-white/30' 
                      : 'text-black/90 dark:text-white/90'
                  }`}
                  style={{ letterSpacing: '-0.04em' }}>
                  {formatTime(timeLeft)}
                </h1>
              </div>
              <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-center md:justify-start">
                <button
                  onClick={handleToggleTimer}
                  className={`group relative flex items-center justify-center gap-3 px-10 py-4 md:px-12 md:py-5 rounded-full font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] ${
                    timerPhase === 'break' 
                      ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20' 
                      : 'bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-neutral-200'
                  }`}>
                  {timerState === 'running' ? (
                    <>
                      <FiPause size={16} className="fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <FiPlay size={16} className="fill-current" />
                      <span>{timerState === 'paused' ? 'Resume' : 'Begin focus'}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleResetTimer}
                  className={`p-4 md:p-5 text-black/50 hover:text-black/70 dark:text-white/30 dark:hover:text-white/70 transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5 ${timerState === 'idle' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <FiRefreshCcw size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 xl:col-span-4 border-t lg:border-t-0 lg:border-l border-black/5 dark:border-white/5 flex flex-col min-h-[50vh] lg:h-full bg-black/1 dark:bg-transparent">
            <div className="p-6 md:p-10 lg:px-14 flex flex-col h-full lg:h-auto lg:flex-1 min-h-0">
              <div className="flex items-center gap-8 mb-8 border-b border-black/10 dark:border-white/10 pb-4 shrink-0">
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`text-[10px] tracking-[0.3em] uppercase font-bold transition-colors relative pb-1 ${
                    activeTab === 'tasks' ? 'text-black/90 dark:text-white/90' : 'text-black/50 hover:text-black/60 dark:text-white/30 dark:hover:text-white/60'
                  }`}>
                  Tasks
                  {activeTab === 'tasks' && <motion.div layoutId="activeTab" className="absolute -bottom-4 left-0 w-full h-px bg-black dark:bg-white/80" />}
                </button>
                <button
                  onClick={() => setActiveTab('flow')}
                  className={`text-[10px] tracking-[0.3em] uppercase font-bold transition-colors relative pb-1 ${
                    activeTab === 'flow' ? 'text-black/90 dark:text-white/90' : 'text-black/50 hover:text-black/60 dark:text-white/30 dark:hover:text-white/60'
                  }`}>
                  Timer Settings
                  {activeTab === 'flow' && <motion.div layoutId="activeTab" className="absolute -bottom-4 left-0 w-full h-px bg-black dark:bg-white/80" />}
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2 md:pr-4 relative">
                <AnimatePresence mode="wait">
                  {activeTab === 'tasks' && (
                    <motion.div
                      key="tasks"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-8 pb-6">
                      <div className="flex flex-col gap-1 shrink-0">
                        {pendingTasks.length ? (
                          pendingTasks.map(task => (
                            <div
                              key={task.id}
                              className="flex items-center gap-4 py-3 cursor-pointer group">
                              <button 
                                onClick={() => handleToggleComplete(task.id)} 
                                className={`transition-colors cursor-pointer shrink-0 ${activeTaskId === task.id ? 'text-black/80 dark:text-white/60' : 'text-black/20 hover:text-black/50 dark:text-white/20 dark:hover:text-white/50'}`}>
                                <FiCircle size={16} />
                              </button>
                              <span 
                                onClick={() => setActiveTaskId(task.id)} 
                                className={`text-sm md:text-base transition-all ${
                                  activeTaskId === task.id 
                                    ? 'text-black/90 dark:text-white/90 font-medium' 
                                    : 'text-black/60 dark:text-white/50 font-light group-hover:text-black/70 dark:group-hover:text-white/70'
                                }`}>
                                {task.title}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="text-black/60 dark:text-white/40 text-xs md:text-sm mt-20 flex flex-col items-center justify-center gap-2 font-light">
                            <span>All clear for now.</span>
                            <span>Start a focus session or add your next task.</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 'flow' && (
                    <motion.div
                      key="flow"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-10 pb-6">
                      <div className="flex flex-col gap-4 shrink-0">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-black/50 dark:text-white/30 uppercase ml-1">Focus Session</span>
                        <div className="flex flex-col gap-2">
                          {focusPresets.map((preset) => (
                            <button
                              key={preset.mins}
                              onClick={() => handleSettingChangeRequest('focus', preset.mins)}
                              className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                                sessionDuration === preset.mins
                                  ? 'bg-black text-white shadow-md dark:bg-[#1a1a1a] dark:text-white dark:border dark:border-white/10'
                                  : 'text-black/60 dark:text-white/40 hover:text-black/90 dark:hover:text-white/80 border border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                              }`}>
                              <span className="text-sm font-bold w-8 text-left">{preset.mins}m</span>
                              <span className={`text-xs tracking-wide ${sessionDuration === preset.mins ? 'font-medium text-white/80' : 'font-light text-black/50 dark:text-white/40'}`}>
                                {preset.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 shrink-0">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-black/50 dark:text-white/30 uppercase ml-1">Rest Cycle</span>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {breakPresets.map((preset) => (
                            <button
                              key={preset.mins}
                              onClick={() => handleSettingChangeRequest('break', preset.mins)}
                              className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                                breakDuration === preset.mins
                                  ? 'bg-black text-white shadow-md dark:bg-[#1a1a1a] dark:text-white dark:border dark:border-white/10'
                                  : 'text-black/60 dark:text-white/40 hover:text-black/90 dark:hover:text-white/80 border border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                              }`}>
                              <span className="text-xs font-bold">{preset.mins}m</span>
                              <span className={`text-[10px] tracking-wide ${breakDuration === preset.mins ? 'font-medium text-white/80' : 'font-light text-black/50 dark:text-white/40'}`}>
                                {preset.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 shrink-0 mt-2">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-black/50 dark:text-white/30 uppercase ml-1">Session Count</span>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {[1, 2, 3, 4].map((count) => (
                            <button
                              key={count}
                              onClick={() => handleSettingChangeRequest('count', count)}
                              className={`flex items-center justify-center size-10 rounded-full transition-all duration-300 ${
                                sessionCount === count
                                  ? 'bg-black text-white shadow-md dark:bg-[#1a1a1a] dark:text-white dark:border dark:border-white/10'
                                  : 'text-black/60 dark:text-white/40 hover:text-black/90 dark:hover:text-white/80 border border-transparent hover:bg-black/5 dark:hover:bg-white/5'}`}>
                              <span className="text-sm font-bold">{count}</span>
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] font-light tracking-wide text-black/50 dark:text-white/40 mt-2 ml-1 italic">
                          Designed for sustainable focus, not endless sessions.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5 shrink-0">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] tracking-[0.4em] font-bold text-black/50 dark:text-white/40 uppercase">Focused Today</span>
                  <span className="text-2xl md:text-3xl font-light text-black/80 dark:text-white/80">{todayStudiedTime(sessions)}</span>
                </div>
                <p className="text-xs font-light tracking-wide text-black/60 dark:text-white/50 mt-4 italic">
                  "Small focused hours build remarkable work."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}