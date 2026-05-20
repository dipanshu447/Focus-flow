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
      })

      setSessions(prev => [...prev, data.session]);
      setStartedAt(null);

    } catch (error) {
      console.error(error);
    }
  };

  // --- Cycle Logic ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (timerState === 'running' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }

    else if (timerState === 'running' && timeLeft <= 0) {

      if (timerPhase === 'focus') {
        addSession();

        if (currentSession < sessionCount) {
          setTimerPhase('break');
          setTimeLeft(breakDuration * 60);

        } else {
          setTimerPhase('focus');
          setTimerState('idle');
          setCurrentSession(1);
          setTimeLeft(sessionDuration * 60);
        }

      } else if (timerPhase === 'break') {

        setTimerPhase('focus');
        setCurrentSession(prev => prev + 1);
        setTimeLeft(sessionDuration * 60);
      }
    }

    return () => clearInterval(interval);

  }, [
    timerState,
    timeLeft,
    timerPhase,
    currentSession,
    sessionCount,
    breakDuration,
    sessionDuration
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
      // Force full reset to session 1 focus mode
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

  console.log(pendingTasks.length ? "task list" : "back")

  return (
    <div className="h-screen w-full text-[#e5e5e5] font-sans selection:bg-white/20 relative overflow-hidden flex flex-col transition-all duration-200 ease">
      <AnimatePresence>
        {showResetWarning && (
          <ConfirmationModal modalTitle="Reset Session?" modalSubtext="Changing timer settings will reset the current session and pause the timer." leftBtntext="Cancel" rightBtntext="Confirm Reset" leftBtnfunc={cancelReset} rightBtnfunc={confirmReset} />
        )}
        {blocker.state === "blocked" && (
          <ConfirmationModal modalTitle="Focus session active" modalSubtext="Leaving this page may interrupt your session." leftBtntext="Stay" rightBtntext="Leave Anyway" leftBtnfunc={() => blocker.reset()} rightBtnfunc={() => blocker.proceed()} />
        )}
      </AnimatePresence>
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 h-full w-full">
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center items-start pl-12 md:pl-24 lg:pl-32 pr-12 h-full min-h-0">
          <div className="flex flex-col items-start w-full max-w-4xl">
            <div className="flex flex-col items-start mb-8 md:mb-12 cursor-default transition-all duration-1000">
              {timerPhase === 'focus' ? (
                <>
                  <span className="text-[10px] tracking-[0.4em] text-white/20 uppercase font-medium mb-5 flex items-center gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-1000 ${timerState === 'running' ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'bg-white/10'}`} />
                    {timerState === 'idle' ? 'Ready to Focus' : `Session ${currentSession} of ${sessionCount}`}
                  </span>
                  <div className='flex items-center gap-8 group'>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-white/70">
                      {activeTask?.title || "Select an objective"}
                    </h2>
                    {activeTaskId && <div onClick={handleClearTask} className='opacity-0 group-hover:opacity-100 border rounded-full border-neutral-700 p-0.5 hover:border-neutral-600 transition-all duration-200 ease cursor-pointer mt-1.5'><IoIosClose className='size-4.5 fill-neutral-400 hover:fill-neutral-300 transition-all duration-200 ease' /></div>}
                  </div>
                </>
              ) : (
                <>
                  <span className="text-[10px] tracking-[0.4em] text-white/20 uppercase font-medium mb-5 flex items-center gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-1000 ${timerState === 'running' ? 'bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.2)] animate-pulse' : 'bg-white/10'}`} />
                    Recovery Break
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-white/40 italic">
                    Next session starting soon.
                  </h2>
                </>
              )}
            </div>
            <div className="relative mb-16 md:mb-20 select-none cursor-default transition-all duration-1000">
              <h1
                className={`text-[clamp(6rem,14vw,17rem)] font-thin leading-[0.85] tracking-tighter tabular-nums transition-colors duration-1000 ${timerPhase === 'break' ? 'text-white/40' : 'text-white/90'}`}
                style={{ letterSpacing: '-0.05em' }}
              >
                {formatTime(timeLeft)}
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={handleToggleTimer}
                className={`group relative flex items-center justify-center gap-4 px-12 py-5 rounded-full font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] ${timerPhase === 'break' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white/90 text-black hover:bg-white'}`}
              >
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
                className={`p-5 text-white/20 hover:text-white/60 transition-colors ${timerState === 'idle' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <FiRefreshCcw size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 xl:col-span-4 border-l border-neutral-900 flex flex-col h-full min-h-0">
          <div className="p-10 lg:px-14 flex flex-col h-full min-h-0">
            <div className="flex items-center gap-8 mb-8 border-b border-neutral-950 pb-4 shrink-0">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`text-[10px] tracking-[0.3em] uppercase font-medium transition-colors relative ${activeTab === 'tasks' ? 'text-white' : 'text-white/30 hover:text-white/60'}`}>
                Tasks
                {activeTab === 'tasks' && <motion.div layoutId="activeTab" className="absolute -bottom-4.25 left-0 w-full h-px bg-white/60" />}
              </button>
              <button
                onClick={() => setActiveTab('flow')}
                className={`text-[10px] tracking-[0.3em] uppercase font-medium transition-colors relative ${activeTab === 'flow' ? 'text-white' : 'text-white/30 hover:text-white/60'}`}>
                Timer Settings
                {activeTab === 'flow' && <motion.div layoutId="activeTab" className="absolute -bottom-4.25 left-0 w-full h-px bg-white/60" />}
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-4 relative">
              <AnimatePresence mode="wait">
                {activeTab === 'tasks' && (
                  <motion.div
                    key="tasks"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-8 pb-6">
                    {/* Pending Tasks */}
                    <div className="flex flex-col gap-1 shrink-0">
                      {pendingTasks.length ? (
                        pendingTasks.map(task => (
                          <div
                            key={task.id}
                            className="flex items-center gap-4 py-2.5 cursor-pointer">
                            <button onClick={() => handleToggleComplete(task.id)} className={`transition-colors cursor-pointer ${activeTaskId === task.id ? 'text-white/60' : 'text-white/10 hover:text-white/30'}`}>
                              <FiCircle size={14} />
                            </button>
                            <span onClick={() => setActiveTaskId(task.id)} className={`text-sm transition-all ${activeTaskId === task.id ? 'text-white/80 font-medium' : 'text-white/40 font-light hover:text-white/60'}`}>
                              {task.title}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className='text-neutral-600 text-xs mt-30 flex flex-col items-center justify-center gap-1'>
                          <span>All clear for now.</span>
                          <span>Start a focus session or add your next task.</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
                {/* TAB: Timer Settings */}
                {activeTab === 'flow' && (
                  <motion.div
                    key="flow"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-10 pb-6">
                    <div className="flex flex-col gap-5 shrink-0">
                      <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase ml-1">Focus Session</span>
                      <div className="flex flex-col gap-2">
                        {focusPresets.map((preset) => (
                          <button
                            key={preset.mins}
                            onClick={() => handleSettingChangeRequest('focus', preset.mins)}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${sessionDuration === preset.mins
                              ? 'bg-neutral-950 text-white border border-neutral-900'
                              : 'text-white/30 hover:text-white/60 border border-transparent hover:bg-white/1'
                              }`}>
                            <span className="text-sm font-medium w-8 text-left">{preset.mins}m</span>
                            <span className={`text-xs font-light tracking-wide ${sessionDuration === preset.mins ? 'text-white/60' : 'text-white/30'}`}>
                              {preset.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-5 shrink-0">
                      <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase ml-1">Rest Cycle</span>
                      <div className="flex flex-wrap gap-2">
                        {breakPresets.map((preset) => (
                          <button
                            key={preset.mins}
                            onClick={() => handleSettingChangeRequest('break', preset.mins)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${breakDuration === preset.mins
                              ? 'bg-neutral-950 text-white border border-neutral-900'
                              : 'text-white/30 hover:text-white/60 border border-transparent hover:bg-white/1'
                              }`}>
                            <span className="text-xs font-medium">{preset.mins}m</span>
                            <span className={`text-[10px] font-light tracking-wide ${breakDuration === preset.mins ? 'text-white/60' : 'text-white/30'}`}>
                              {preset.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 shrink-0 mt-2">
                      <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase ml-1">Session Count</span>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4].map((count) => (
                          <button
                            key={count}
                            onClick={() => handleSettingChangeRequest('count', count)}
                            className={`flex items-center justify-center w-12 py-2.5 rounded-full transition-all duration-300 ${sessionCount === count
                              ? 'bg-neutral-950 text-white border border-neutral-900'
                              : 'text-white/30 hover:text-white/60 border border-transparent hover:bg-white/1'
                              }`}>
                            <span className="text-xs font-medium">{count}</span>
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] font-light tracking-wide text-white/20 mt-1 ml-1 italic">
                        Designed for sustainable focus, not endless sessions.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-8 pt-8 border-t border-neutral-900 shrink-0">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] tracking-[0.4em] text-white/20 uppercase">Focused Today</span>
                <span className="text-2xl font-light text-white/60">{todayStudiedTime(sessions)}</span>
              </div>
              <p className="text-xs font-light tracking-wide text-white/30 mt-6 italic pr-4">
                "Small focused hours build remarkable work."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}