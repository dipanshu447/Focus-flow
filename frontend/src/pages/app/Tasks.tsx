import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiCheckCircle, FiCircle, FiTrash2 } from 'react-icons/fi';
import TaskRow from '../../components/TaskRow';
import type { Variants } from 'framer-motion';
import useFocus from '../../hooks/useFocus';
import type { FocusContextType } from '../../types/Focus.ts';
import { todayStudiedTime } from '../../utils/analytics.ts';
import { createTask, deleteTask, toggleTask } from '../../api/tasks.ts';
import useDarkMode from '../../hooks/useDarkMode.ts';

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const { tasks, setTasks, sessions }: FocusContextType = useFocus();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const { setTheme } = useDarkMode();

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const handleToggleComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);

    if (!task) return;

    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !task.completed } : t
    ));

    try {
      await toggleTask(id, task.completed);
    } catch (error) {
      console.error(error);
      setTasks(prev => prev.map(t =>
        t.id === id ? { ...t, completed: task.completed } : t
      ));
    }
  };

  const handleDelete = async (id: string) => {
    const previousTasks = tasks;
    setTasks(prev => prev.filter(t => t.id !== id));
    try {
      await deleteTask(id);
    } catch (error) {
      console.error(error);
      setTasks(previousTasks);
    }
  };

  const handleAddTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!newTitle.trim()) return;

      const data = await createTask(newTitle);

      setTasks(prev => [data.task, ...prev]);
      setNewTitle('');
      setIsAddingTask(false);
    } catch (error) {
      console.error(error);
    }
  };

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  useEffect(() => {
    if (user?.theme) setTheme(user.theme);
  }, []);

  return (
    <div className="h-screen w-full text-[#e5e5e5] font-sans selection:bg-white/20 relative overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scrollbar w-full px-8 pt-16 md:px-16 lg:px-24 mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide text-white/90 mb-3">Tasks</h1>
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/40 font-medium">Clarity creates momentum.</p>
            </div>
            <button
              onClick={() => setIsAddingTask(true)}
              className="group flex items-center gap-3 px-6 py-3 bg-transparent text-white/60 hover:text-white rounded-full transition-all text-[10px] uppercase tracking-[0.2em] font-medium">
              <FiPlus size={14} className="group-hover:rotate-90 transition-transform duration-500" /> New Task
            </button>
          </div>
          <div className="flex items-center gap-12 text-white/50">
            <div className="flex flex-col gap-1.5 cursor-default">
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/40">Focused Today</span>
              <span className="text-xl font-light text-white/90">{todayStudiedTime(sessions)}</span>
            </div>
            <div className="w-px h-8 bg-neutral-900" />
            <div className="flex flex-col gap-1.5 cursor-default">
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/40">Active Tasks</span>
              <span className="text-xl font-light text-white/90">{activeTasks.length}</span>
            </div>
          </div>
        </motion.header>
        {/* ================= TABS ================= */}
        <div className="flex items-center gap-8 mb-8 border-b border-neutral-900 pb-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`relative text-[10px] tracking-[0.3em] uppercase font-medium transition-colors ${activeTab === 'active' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
            Active
            {activeTab === 'active' && <motion.div layoutId="taskTabIndicator" className="absolute -bottom-4.25 left-0 w-full h-px bg-white/60" />}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`relative text-[10px] tracking-[0.3em] uppercase font-medium transition-colors ${activeTab === 'completed' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
            Completed
            {activeTab === 'completed' && <motion.div layoutId="taskTabIndicator" className="absolute -bottom-4.25 left-0 w-full h-px bg-white/60" />}
          </button>
        </div>
        <AnimatePresence>
          {isAddingTask && activeTab === 'active' && (
            <motion.form
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddTask}
              className="mb-12 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-4 border-b border-neutral-800 focus-within:border-neutral-600 transition-colors group">
                <div className="flex items-center gap-6 flex-1">
                  <FiCircle size={22} className="text-white/20 shrink-0" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Set a new task..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-transparent text-xl font-light text-white/90 placeholder-white/30 focus:outline-none" />
                </div>
                <div className="flex items-center gap-4 pl-12 sm:pl-0 shrink-0">
                  <button type="button" onClick={() => setIsAddingTask(false)} className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest font-medium transition-colors">Cancel</button>
                  <button type="submit" className="text-[10px] text-white uppercase tracking-widest font-medium">Add</button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
        {/* ================= TASK LISTS ================= */}
        <AnimatePresence mode="wait">
          {/* --- ACTIVE TASKS --- */}
          {activeTab === 'active' && (
            <motion.div key="active" variants={listVariants} initial="hidden" animate="visible" exit="hidden" className="flex flex-col gap-2 pb-24">
              {activeTasks.length > 0 ? (
                activeTasks.map(task => (
                  <TaskRow key={task.id} task={task} onToggle={() => handleToggleComplete(task.id)} onDelete={() => handleDelete(task.id)} />
                ))
              ) : (
                <div className="py-32 text-center flex flex-col items-center justify-center cursor-default">
                  <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30">Nothing demanding your attention.</p>
                </div>
              )}
            </motion.div>
          )}
          {/* --- COMPLETED TASKS --- */}
          {activeTab === 'completed' && (
            <motion.div key="completed" variants={listVariants} initial="hidden" animate="visible" exit="hidden" className="flex flex-col gap-2 pb-24">
              {completedTasks.length > 0 ? (
                completedTasks.map(task => (
                  <motion.div key={task.id} variants={itemVariants} className="group flex items-center justify-between py-6 px-6 -mx-6 rounded-2xl hover:bg-neutral-950 border border-transparent transition-all">
                    <div className="flex items-center gap-6 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                      <button onClick={() => handleToggleComplete(task.id)} className="text-white mt-1"><FiCheckCircle size={22} /></button>
                      <div className="flex flex-col gap-2">
                        <span className="text-lg font-light text-white line-through decoration-white/20">{task.title}</span>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(task.id)} className="text-white/10 hover:text-white/50 opacity-0 group-hover:opacity-100 transition-all"><FiTrash2 size={18} /></button>
                  </motion.div>
                ))
              ) : (
                <div className="py-32 text-center flex flex-col items-center justify-center cursor-default">
                  <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30">No history available.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}