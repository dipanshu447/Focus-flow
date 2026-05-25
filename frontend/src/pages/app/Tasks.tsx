import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiCheckCircle, FiCircle, FiTrash2 } from 'react-icons/fi';
import TaskRow from '../../components/TaskRow';
import type { Variants } from 'framer-motion';
import useFocus from '../../hooks/useFocus';
import type { FocusContextType } from '../../types/Focus.ts';
import { todayStudiedTime } from '../../utils/analytics.ts';
import { createTask, deleteTask, toggleTask } from '../../api/tasks.ts';
import { toast } from 'sonner';

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const { tasks, setTasks, sessions }: FocusContextType = useFocus();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTitle, setNewTitle] = useState('');

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
      toast.success("Task completed");
    } catch (error) {
      console.error(error);
      setTasks(prev => prev.map(t =>
        t.id === id ? { ...t, completed: task.completed } : t
      ));
      toast.error("Failed to update Task completion");
    }
  };

  const handleDelete = async (id: string) => {
    const previousTasks = tasks;
    setTasks(prev => prev.filter(t => t.id !== id));
    try {
      await deleteTask(id);
      toast.success("Task deleted");
    } catch (error) {
      console.error(error);
      setTasks(previousTasks);
      toast.error("Failed to delete task");
    }
  };

  const handleAddTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!newTitle.trim()) return;

      const data = await createTask(newTitle);
      toast.success("Task created");

      setTasks(prev => [data.task, ...prev]);
      setNewTitle('');
      setIsAddingTask(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create task");
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

  return (
    <div className="h-screen w-full text-[#111] dark:text-[#e5e5e5] font-sans selection:bg-black/10 dark:selection:bg-white/20 relative overflow-hidden flex flex-col transition-colors duration-500">
      <div className="flex-1 overflow-y-auto custom-scrollbar w-full px-6 md:px-12 lg:px-24 pt-12 md:pt-16 max-w-5xl mx-auto pb-24">
        <motion.header
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="flex flex-col mb-12 md:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 md:mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black/90 dark:text-white/90 mb-3">
                Tasks
              </h1>
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-black/40 dark:text-white/40 font-medium">
                Clarity creates momentum.
              </p>
            </div>
            <button
              onClick={() => setIsAddingTask(true)}
              className="group flex items-center justify-center sm:justify-start gap-3 px-6 py-3.5 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black/60 hover:text-black/90 dark:text-white/60 dark:hover:text-white/90 rounded-full transition-all text-[10px] uppercase tracking-[0.2em] font-bold cursor-pointer">
              <FiPlus size={14} className="group-hover:rotate-90 transition-transform duration-500" /> 
              New Task
            </button>
          </div>
          <div className="flex items-center gap-8 md:gap-12 text-black/50 dark:text-white/50">
            <div className="flex flex-col gap-1.5 cursor-default">
              <span className="text-[9px] tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-bold">Focused Today</span>
              <span className="text-xl md:text-2xl font-light text-black/90 dark:text-white/90">{todayStudiedTime(sessions)}</span>
            </div>
            <div className="w-px h-8 bg-black/10 dark:bg-white/10" />
            <div className="flex flex-col gap-1.5 cursor-default">
              <span className="text-[9px] tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-bold">Active Tasks</span>
              <span className="text-xl md:text-2xl font-light text-black/90 dark:text-white/90">{activeTasks.length}</span>
            </div>
          </div>
        </motion.header>
        {/* ================= TABS ================= */}
        <div className="flex items-center gap-8 mb-8 border-b border-black/10 dark:border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`relative text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold transition-colors pb-1 ${
              activeTab === 'active' 
                ? 'text-black/90 dark:text-white/90' 
                : 'text-black/30 hover:text-black/60 dark:text-white/40 dark:hover:text-white/70'
            }`}>
            Active
            {activeTab === 'active' && <motion.div layoutId="taskTabIndicator" className="absolute -bottom-4 left-0 w-full h-px bg-black dark:bg-white/80" />}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`relative text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold transition-colors pb-1 ${
              activeTab === 'completed' 
                ? 'text-black/90 dark:text-white/90' 
                : 'text-black/30 hover:text-black/60 dark:text-white/40 dark:hover:text-white/70'
            }`}>
            Completed
            {activeTab === 'completed' && <motion.div layoutId="taskTabIndicator" className="absolute -bottom-4 left-0 w-full h-px bg-black dark:bg-white/80" />}
          </button>
        </div>
        <AnimatePresence>
          {isAddingTask && activeTab === 'active' && (
            <motion.form
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddTask}
              className="mb-8 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-4 border-b border-black/10 dark:border-white/10 focus-within:border-black/30 dark:focus-within:border-white/30 transition-colors group">
                <div className="flex items-center gap-4 md:gap-6 flex-1">
                  <FiCircle size={22} className="text-black/20 dark:text-white/20 shrink-0" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Set a new task..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-transparent text-lg md:text-xl font-light text-black/90 dark:text-white/90 placeholder-black/30 dark:placeholder-white/30 focus:outline-none" />
                </div>
                <div className="flex items-center gap-6 pl-10 sm:pl-0 shrink-0">
                  <button type="button" onClick={() => setIsAddingTask(false)} className="text-[10px] text-black/40 hover:text-black/90 dark:text-white/40 dark:hover:text-white uppercase tracking-[0.2em] font-bold transition-colors">Cancel</button>
                  <button type="submit" className="text-[10px] text-black/90 dark:text-white uppercase tracking-[0.2em] font-bold">Add</button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {activeTab === 'active' && (
            <motion.div key="active" variants={listVariants} initial="hidden" animate="visible" exit="hidden" className="flex flex-col gap-2">
              {activeTasks.length > 0 ? (
                activeTasks.map(task => (
                  <TaskRow key={task.id} task={task} onToggle={() => handleToggleComplete(task.id)} onDelete={() => handleDelete(task.id)} />
                ))
              ) : (
                <div className="mt-25 text-center flex flex-col items-center justify-center cursor-default">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 dark:text-white/30">Nothing demanding your attention.</p>
                </div>
              )}
            </motion.div>
          )}
          {activeTab === 'completed' && (
            <motion.div key="completed" variants={listVariants} initial="hidden" animate="visible" exit="hidden" className="flex flex-col gap-2">
              {completedTasks.length > 0 ? (
                completedTasks.map(task => (
                  <motion.div 
                    key={task.id} 
                    variants={itemVariants} 
                    className="group flex items-center justify-between py-5 px-4 md:px-6 -mx-4 md:-mx-6 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 border border-transparent transition-all duration-300">
                    <div className="flex items-center gap-4 md:gap-6 opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                      <button onClick={() => handleToggleComplete(task.id)} className="text-black/90 dark:text-white/90 mt-0.5 transition-colors">
                        <FiCheckCircle size={20} className="md:size-5.5" />
                      </button>
                      <div className="flex flex-col gap-2">
                        <span className="text-base md:text-lg font-light text-black/90 dark:text-white/90 line-through decoration-black/20 dark:decoration-white/20">{task.title}</span>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(task.id)} className="text-black/20 hover:text-black/70 dark:text-white/20 dark:hover:text-white/70 opacity-0 group-hover:opacity-100 transition-all duration-300 p-2">
                      <FiTrash2 size={18} />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="mt-25 text-center flex flex-col items-center justify-center cursor-default">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 dark:text-white/30">No history available.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}