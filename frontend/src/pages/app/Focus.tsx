import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiRefreshCcw, FiCircle, FiSidebar } from 'react-icons/fi';
import useFocus from '../../hooks/useFocus';
import type { FocusContextType } from '../../types/Focus';
import { useBlocker, useSearchParams } from 'react-router';
import ConfirmationModal from '../../components/ConfirmationModal.tsx';
import { IoIosClose } from "react-icons/io";
import { todayStudiedTime } from '../../utils/analytics.ts';
import { createSessions } from '../../api/sessions.ts';
import { toast } from 'sonner';
import { playSound } from '../../utils/sounds.ts';
import buttonClick from '/sounds/button-click.mp3';
import breakTime from '/sounds/break_time.mp3';
import digitalAlram from '/sounds/digital-alarm.mp3';
import sesstionComplete from '/sounds/sesstion_complete.mp3';
import { requestNotificationPermission, showNotification } from '../../utils/notifications.ts';

export default function FocusPage() {
  const [searchParams] = useSearchParams();
  const [timerState, setTimerState] = useState<'idle' | 'running' | 'paused'>('idle');
  const [timerPhase, setTimerPhase] = useState<'focus' | 'break'>('focus');

  const [sessionDuration, setSessionDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [sessionCount, setSessionCount] = useState(1);
  const [currentSession, setCurrentSession] = useState(1);
  const [timeLeft, setTimeLeft] = useState(sessionDuration * 60);
  const [startedAt, setStartedAt] = useState<Date | null>(null);

  const [activeTab, setActiveTab] = useState<'tasks' | 'flow'>('tasks');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [showResetWarning, setShowResetWarning] = useState(false);
  const [pendingSettings, setPendingSettings] = useState<{ type: 'focus' | 'break' | 'count', val: number } | null>(null);

  const { tasks, setTasks, sessions, setSessions }: FocusContextType = useFocus();
  const [activeTaskId, setActiveTaskId] = useState<string | null>(searchParams.get('activeTaskId'));

  const blocker = useBlocker(({ currentLocation, nextLocation }) => timerState === "running" && currentLocation.pathname !== nextLocation.pathname);

  const handleToggleTimer = async () => {
    if (timerState === "idle") {
      await requestNotificationPermission();
    }
    if (timerState !== 'running' && !startedAt) {
      setStartedAt(new Date());
    }
    setTimerState(prev => prev === 'running' ? 'paused' : 'running');
    playSound(buttonClick);
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
      toast.success("Great work! Session completed");
      showNotification("Focus Session Complete", "Great work! Time for a break.");
      setSessions(prev => [...prev, data.session]);
      setStartedAt(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save session");
    }
  };

  useEffect(() => { return () => { document.title = "FocusFlow"; }; }, []);

  // --- Cycle Logic ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let message: string | undefined;
    if (timerState === 'running' && timeLeft > 0) {
      message = timerPhase === "break" ? "Recharge" : activeTask ? activeTask.title : "Deep Work";
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { clearInterval(interval); return 0; }
          const newTime = prev - 1;
          document.title = `${formatTime(newTime)} • ${message}`;
          return newTime;
        });
      }, 1000);
    } else if (timerState === 'running' && timeLeft <= 0) {
      if (timerPhase === 'focus') {
        void addSession();
        if (currentSession < sessionCount) {
          setTimerPhase('break');
          playSound(breakTime);
          setTimeLeft(breakDuration * 60);
          toast.info("Break started");
        }
        else {
          playSound(sesstionComplete);
          setTimerPhase('focus');
          setTimerState('idle');
          setCurrentSession(1);
          setTimeLeft(sessionDuration * 60);
          toast.success("Focus flow completed");
          showNotification(
            "Focus Flow Complete",
            "Amazing work. You've completed all sessions."
          );
          document.title = "FocusFlow";
        }
        return;
      }
      if (timerPhase === 'break') {
        playSound(digitalAlram); toast.success("Break finished"); showNotification("Break Finished", "Ready to get back to focus?");
        setTimerPhase('focus'); setCurrentSession(prev => prev + 1); setTimeLeft(sessionDuration * 60); return;
      }
    } else if (timerState === 'paused') { document.title = 'Paused • FocusFlow'; }
    return () => { clearInterval(interval); };
  }, [timerState, timeLeft, timerPhase, currentSession, sessionCount, breakDuration, sessionDuration, activeTask]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => { if (timerState !== "running") return; e.preventDefault(); }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => { window.removeEventListener("beforeunload", handleBeforeUnload); }
  }, [timerState]);

  useEffect(() => {
    if (isMobileDrawerOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileDrawerOpen]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleClearTask = () => setActiveTaskId(null);

  const handleResetTimer = () => {
    setTimerState('idle'); setTimerPhase('focus'); setCurrentSession(1); setTimeLeft(sessionDuration * 60);
    document.title = "FocusFlow"; toast.info("Timer reset"); playSound(buttonClick);
  };

  const handleSettingChangeRequest = (type: 'focus' | 'break' | 'count', val: number) => {
    if (timerState !== 'idle') { setPendingSettings({ type, val }); setShowResetWarning(true); }
    else { applySetting(type, val); }
  };

  const applySetting = (type: 'focus' | 'break' | 'count', val: number) => {
    if (type === 'focus') { setSessionDuration(val); if (timerPhase === 'focus') setTimeLeft(val * 60); }
    else if (type === 'break') { setBreakDuration(val); if (timerPhase === 'break') setTimeLeft(val * 60); }
    else if (type === 'count') { setSessionCount(val); }
  };

  const confirmReset = () => {
    if (pendingSettings) {
      applySetting(pendingSettings.type, pendingSettings.val);
      const newFocusDur = pendingSettings.type === 'focus' ? pendingSettings.val : sessionDuration;
      setTimerState('idle'); setTimerPhase('focus'); setCurrentSession(1); setTimeLeft(newFocusDur * 60);
    }
    setShowResetWarning(false); setPendingSettings(null);
  };

  const cancelReset = () => { setShowResetWarning(false); setPendingSettings(null); };

  const handleToggleComplete = (id: string) => {
    if (id === activeTaskId) setActiveTaskId(null);
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const focusPresets = [{ mins: 25, label: 'Focus' }, { mins: 50, label: 'Deep Work' }, { mins: 90, label: 'Flow State' }];
  const breakPresets = [{ mins: 5, label: 'Reset' }, { mins: 10, label: 'Recovery' }, { mins: 15, label: 'Long Break' }];

  const renderRightPanelContent = (idPrefix: string) => (
    <div className="flex flex-col h-full w-full lg:bg-transparent lg:dark:bg-transparent">
      <div className="flex items-center gap-8 px-6 md:px-10 lg:px-14 pt-8 lg:pt-6 shrink-0 border-b border-black/10 dark:border-white/10 pb-4">
        <button onClick={() => setActiveTab('tasks')} className={`text-[10px] tracking-[0.3em] uppercase font-bold transition-colors relative pb-1 ${activeTab === 'tasks' ? 'text-black/90 dark:text-white/90' : 'text-black/60 hover:text-black/60 dark:text-white/30 dark:hover:text-white/60'}`}>
          Tasks {activeTab === 'tasks' && <motion.div layoutId={`tabIndicator-${idPrefix}`} className="absolute -bottom-4.25 left-0 w-full h-px bg-black dark:bg-white/80" />}
        </button>
        <button onClick={() => setActiveTab('flow')} className={`text-[10px] tracking-[0.3em] uppercase font-bold transition-colors relative pb-1 ${activeTab === 'flow' ? 'text-black/90 dark:text-white/90' : 'text-black/60 hover:text-black/60 dark:text-white/30 dark:hover:text-white/60'}`}>
          Timer Settings {activeTab === 'flow' && <motion.div layoutId={`tabIndicator-${idPrefix}`} className="absolute -bottom-4.25 left-0 w-full h-px bg-black dark:bg-white/80" />}
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-6 md:px-10 lg:px-14 py-8 border-b border-black/5 dark:border-white/5">
        <AnimatePresence mode="wait">
          {activeTab === 'tasks' && (
            <motion.div key="tasks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex flex-col gap-6 pb-6">
              {pendingTasks.length ? (
                pendingTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveTaskId(task.id)}>
                    <button onClick={(e) => { e.stopPropagation(); handleToggleComplete(task.id); }} className={`transition-colors cursor-pointer shrink-0 ${activeTaskId === task.id ? 'text-black/80 dark:text-white/60' : 'text-black/20 hover:text-black/60 dark:text-white/20 dark:hover:text-white/50'}`}>
                      <FiCircle size={18} className="md:w-4 md:h-4" />
                    </button>
                    <span className={`text-base transition-all ${activeTaskId === task.id ? 'text-black/90 dark:text-white/90 font-medium' : 'text-black/60 dark:text-white/50 font-light group-hover:text-black/70 dark:group-hover:text-white/70'}`}>
                      {task.title}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-black/70 dark:text-white/40 text-xs md:text-sm mt-35 flex flex-col items-center justify-center gap-2 font-light text-center">
                  <span>All clear for now.</span>
                  <span>Start a focus session or add your next task.</span>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'flow' && (
            <motion.div key="flow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex flex-col">
              <div className="flex flex-col gap-5 shrink-0 mb-5">
                <span className="text-[10px] font-bold tracking-[0.3em] text-black/60 dark:text-white/30 uppercase ml-1">Focus Session</span>
                <div className="flex flex-col gap-1">
                  {focusPresets.map(preset => (
                    <button key={preset.mins} onClick={() => handleSettingChangeRequest('focus', preset.mins)} className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${sessionDuration === preset.mins ? 'bg-black text-white shadow-md dark:bg-[#1a1a1a] dark:text-white dark:border dark:border-white/10' : 'text-black/60 dark:text-white/40 hover:text-black/90 dark:hover:text-white/80 border border-transparent hover:bg-black/5 dark:hover:bg-white/5'}`}>
                      <span className="text-sm font-bold w-8 text-left">{preset.mins}m</span>
                      <span className={`text-xs tracking-wide ${sessionDuration === preset.mins ? 'font-medium text-white/80' : 'font-light text-black/70 dark:text-white/40'}`}>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-5 shrink-0 mb-5">
                <span className="text-[10px] font-bold tracking-[0.3em] text-black/60 dark:text-white/30 uppercase ml-1">Rest Cycle</span>
                <div className="flex flex-wrap gap-3">
                  {breakPresets.map(preset => (
                    <button key={preset.mins} onClick={() => handleSettingChangeRequest('break', preset.mins)} className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${breakDuration === preset.mins ? 'bg-black text-white shadow-md dark:bg-[#1a1a1a] dark:text-white dark:border dark:border-white/10' : 'text-black/60 dark:text-white/40 hover:text-black/90 dark:hover:text-white/80 border border-transparent hover:bg-black/5 dark:hover:bg-white/5'}`}>
                      <span className="text-xs font-bold">{preset.mins}m</span>
                      <span className={`text-[10px] tracking-wide ${breakDuration === preset.mins ? 'font-medium text-white/80' : 'font-light text-black/60 dark:text-white/40'}`}>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4 shrink-0">
                <span className="text-[10px] font-bold tracking-[0.3em] text-black/60 dark:text-white/30 uppercase ml-1">Session Count</span>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {[1, 2, 3, 4].map(count => (
                    <button key={count} onClick={() => handleSettingChangeRequest('count', count)} className={`flex items-center justify-center size-10 rounded-full transition-all duration-300 ${sessionCount === count ? 'bg-black text-white shadow-md dark:bg-[#1a1a1a] dark:text-white dark:border dark:border-white/10' : 'text-black/60 dark:text-white/40 hover:text-black/90 dark:hover:text-white/80 border border-transparent hover:bg-black/5 dark:hover:bg-white/5'}`}>
                      <span className="text-sm font-bold">{count}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] font-light tracking-wide text-black/60 dark:text-white/40 mt-2 ml-1 italic">Designed for sustainable focus, not endless sessions.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="shrink-0 px-4 py-6 md:px-10 lg:px-14 lg:pb-10">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-[0.4em] font-bold text-black/60 dark:text-white/40 uppercase">Focused Today</span>
          <span className="text-2xl md:text-3xl font-light text-black/80 dark:text-white/80">{todayStudiedTime(sessions)}</span>
        </div>
        <p className="text-xs font-light tracking-wide text-black/70 dark:text-white/50 mt-4 italic">
          "Small focused hours build remarkable work."
        </p>
      </div>
    </div>
  );

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
            rightBtnfunc={() => blocker.proceed()}
          />
        )}
      </AnimatePresence>
      <div className="flex-1 min-h-0 w-full overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full w-full relative z-10">
          <div className="lg:col-span-7 xl:col-span-8 h-full flex flex-col justify-center items-center lg:items-start px-6 md:px-12 lg:pl-24 xl:pl-32 lg:pr-12 relative z-10 mt-6">
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden absolute top-6 right-6 md:top-8 md:right-8 z-30 flex items-center justify-center p-3 rounded-full bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors shadow-sm backdrop-blur-md mt-8"
              aria-label="Open Tasks and Settings">
              <FiSidebar size={16} />
            </button>
            <div className="flex flex-col items-center lg:items-start w-full max-w-4xl gap-4 text-center lg:text-left relative z-10 -mt-12 lg:mt-0">
              <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-12 cursor-default transition-all duration-1000 w-full">
                {timerPhase === 'focus' ? (
                  <>
                    <span className="text-[10px] md:text-xs tracking-[0.3em] text-black/60 dark:text-white/40 uppercase font-bold mb-5 flex items-center justify-center lg:justify-start gap-3">
                      <span className={`w-2 h-2 rounded-full transition-all duration-1000 ${timerState === 'running' ? 'bg-black dark:bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] dark:shadow-[0_0_12px_rgba(255,255,255,0.7)]' : 'bg-black/20 dark:bg-white/20'}`} />
                      {timerState === 'idle' ? 'Ready to Focus' : `Session ${currentSession} of ${sessionCount}`}
                    </span>
                    <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-6 group relative w-full">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-black/90 dark:text-white/90 line-clamp-2 lg:line-clamp-none px-4 lg:px-0 max-w-[85%] lg:max-w-none">
                        {timerState === 'idle' ? activeTask?.title || "Select an objective" : ((timerState === "running" || timerState === "paused") && !activeTask?.title) ? "Independent focus session" : activeTask?.title}
                      </h2>
                      {activeTaskId && (
                        <div
                          onClick={handleClearTask}
                          className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 border rounded-full border-black/10 dark:border-white/10 p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer absolute right-0 lg:relative lg:right-auto shrink-0 bg-[#fcfcfc] dark:bg-[#050505]">
                          <IoIosClose className="w-5 h-5 text-black/60 dark:text-white/60 transition-colors" />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] md:text-xs tracking-[0.3em] text-black/60 dark:text-white/40 uppercase font-bold mb-5 flex items-center justify-center lg:justify-start gap-3">
                      <span className={`w-2 h-2 rounded-full transition-all duration-1000 ${timerState === 'running' ? 'bg-black/50 dark:bg-white/50 shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.3)] animate-pulse' : 'bg-black/20 dark:bg-white/20'}`} />
                      Recovery Break
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-black/60 dark:text-white/40 italic px-4 lg:px-0">
                      Next session starting soon.
                    </h2>
                  </>
                )}
              </div>
              <div className="relative mb-12 lg:mb-16 select-none cursor-default transition-all duration-1000 w-full flex justify-center lg:justify-start">
                <h1
                  className={`text-[clamp(6rem,24vw,12rem)] lg:text-[clamp(6rem,14vw,17rem)] font-light leading-[0.8] tracking-tighter tabular-nums transition-colors duration-1000 ${timerPhase === 'break'
                    ? 'text-black/60 dark:text-white/30'
                    : 'text-black/90 dark:text-white/90'
                    }`}
                  style={{ letterSpacing: '-0.05em' }}>
                  {formatTime(timeLeft)}
                </h1>
              </div>
              <div className="flex items-center justify-center lg:justify-start lg:gap-6 w-full">
                <button
                  onClick={handleToggleTimer}
                  className={`group relative flex items-center justify-center gap-3 px-12 py-4 md:px-14 md:py-5 rounded-full font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] ${timerPhase === 'break'
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
                      <FiPlay size={16} className="fill-current ml-1" />
                      <span>{timerState === 'paused' ? 'Resume' : 'Begin focus'}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleResetTimer}
                  className={`p-4 md:p-5 text-black/40 hover:text-black/80 dark:text-white/40 dark:hover:text-white/80 transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5 ${timerState === 'idle' ? 'hidden pointer-events-none' : 'block'}`}
                  aria-label="Reset Timer">
                  <FiRefreshCcw size={20} className="size-5 md:size-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="hidden min-h-[50vh] lg:flex lg:col-span-5 xl:col-span-4 border-l border-black/5 dark:border-white/5 flex-col h-full bg-black/1 dark:bg-transparent relative z-10">
            {renderRightPanelContent('desktop')}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-[85vw] max-w-100 h-full bg-[#fcfcfc] dark:bg-[#050505] shadow-2xl flex flex-col border-l border-black/10 dark:border-white/10">
              <div className="flex items-center justify-between px-5 py-1.5 border-b border-black/5 dark:border-white/5 shrink-0">
                <span className="text-[10px] uppercase tracking-widest font-bold text-black/60 dark:text-white/40">
                  Focus Menu
                </span>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-2 -mr-2 text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors outline-none">
                  <IoIosClose size={26} />
                </button>
              </div>
              <div className="flex-1 min-h-0 w-full overflow-hidden">
                {renderRightPanelContent('mobile')}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}