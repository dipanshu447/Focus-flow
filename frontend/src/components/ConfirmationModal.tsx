import { motion } from 'framer-motion';
import type { JSX } from 'react';

type modalObj = {
    modalTitle: string,
    modalSubtext: string,
    leftBtntext: string,
    rightBtntext: string,
    ModalIcon?: JSX.Element | null,
    leftBtnfunc: () => void,
    rightBtnfunc: () => void
}

export default function ConfirmationModal({ modalTitle, modalSubtext, leftBtntext, rightBtntext, leftBtnfunc, rightBtnfunc, ModalIcon }: modalObj) {
    return (
        <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-md px-4">
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/10 p-6 md:p-8 rounded-3xl flex flex-col items-center w-full max-w-90 text-center shadow-2xl transition-colors duration-500">
                {ModalIcon && (
                    <div className="mb-2">
                        {ModalIcon}
                    </div>
                )}
                <h3 className="text-black/90 dark:text-white/90 text-xl md:text-2xl font-bold tracking-tight mb-3">
                    {modalTitle}
                </h3>
                <p className="text-black/80 dark:text-white/60 text-sm font-light leading-relaxed mb-8 px-2">
                    {modalSubtext}
                </p>
                <div className="flex items-center gap-3 w-full">
                    <button
                        onClick={leftBtnfunc}
                        className="flex-1 py-3.5 rounded-xl bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:text-black hover:bg-black/10 dark:hover:text-white dark:hover:bg-white/10 transition-all duration-300 text-sm font-medium">
                        {leftBtntext}
                    </button>
                    <button
                        onClick={rightBtnfunc}
                        className="flex-1 py-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-neutral-200 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl active:scale-[0.98]">
                        {rightBtntext}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}