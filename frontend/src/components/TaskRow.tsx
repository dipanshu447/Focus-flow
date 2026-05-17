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
      className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6 py-4 px-5 -mx-5 rounded-2xl hover:bg-neutral-950 border border-transparent transition-all duration-500 cursor-pointer">
      <div className="flex items-center gap-6">
        <button onClick={onToggle} className="text-white/20 hover:text-white/60 transition-colors mt-1.5 shrink-0">
          <FiCircle size={22} />
        </button>
        <div className="flex flex-col gap-2">
          <span className="text-lg font-light tracking-wide text-white/90 group-hover:text-white transition-colors">
            {task.title}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-5 w-full md:w-auto justify-end">
        <button onClick={onDelete} className="text-white/20 hover:text-white/60 transition-colors p-3 opacity-0 group-hover:opacity-100 hidden md:block">
          <FiTrash2 size={18} />
        </button>
        <Link to={`/app/focus?activeTaskId=${task.id}`} className="flex items-center justify-center gap-3 px-6 py-2.5 bg-neutral-950 group-hover:bg-neutral-900 text-white/80 group-hover:text-white rounded-full transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-medium w-full md:w-auto shrink-0 border border-neutral-900 group-hover:border-neutral-800">
          <FiPlay size={12} /> Enter Focus
        </Link>
      </div>
    </motion.div>
  );
}