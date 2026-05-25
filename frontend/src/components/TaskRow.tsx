import { 
  FiPlay, FiCircle, 
  FiTrash2
} from 'react-icons/fi';
import type { Task } from '../types/Focus.ts';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

export default function TaskRow({ task, onToggle, onDelete }: { task: Task, onToggle: () => void, onDelete: () => void }) {
  return (
    <motion.div 
      layout
      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
      className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 py-4 px-4 md:px-6 -mx-4 md:-mx-6 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 border border-transparent transition-colors duration-300">
      <div className="flex items-start md:items-center gap-4 md:gap-6 w-full md:w-auto flex-1 min-w-0">
        <button 
          onClick={onToggle} 
          className="text-black/20 hover:text-black/60 dark:text-white/20 dark:hover:text-white/60 transition-colors mt-0.5 md:mt-0 shrink-0 outline-none">
          <FiCircle size={20} className="md:size-5.5" />
        </button>
        <div className="flex flex-col gap-2 w-full min-w-0">
          <span className="text-base md:text-lg font-light tracking-wide text-black/90 group-hover:text-black dark:text-white/90 dark:group-hover:text-white transition-colors wrap-break-word line-clamp-3 md:line-clamp-none">
            {task.title}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-5 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0 pl-9 md:pl-0 shrink-0">
        <button 
          onClick={onDelete} 
          className="text-black/30 hover:text-neutral-500 dark:text-white/30 dark:hover:text-neutral-300 transition-colors p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 outline-none cursor-pointer"
          aria-label="Delete task">
          <FiTrash2 size={18} />
        </button>
        <Link 
          to={`/app/focus?activeTaskId=${task.id}`} 
          className="flex items-center justify-center gap-3 px-6 py-3 md:py-2.5 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white rounded-full transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-bold w-full md:w-auto shrink-0 border border-black/10 hover:border-black/20 dark:border-white/10 dark:hover:border-white/20 active:scale-[0.98]">
          <FiPlay size={12} className="shrink-0 fill-current" /> 
          <span>Enter Focus</span>
        </Link>
      </div>
    </motion.div>
  );
}