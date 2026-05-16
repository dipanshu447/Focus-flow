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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-[#fcfcfc] dark:bg-[#0a0a0a] border border-black/5 dark:border-neutral-900 p-8 md:p-10 rounded-3xl flex flex-col items-center max-w-sm text-center shadow-2xl">
                {ModalIcon && ModalIcon}
                <h3 className="text-black/90 dark:text-white/90 text-xl font-light tracking-wide mb-3">{modalTitle}</h3>
                <p className="text-black/50 dark:text-white/40 text-sm font-light leading-relaxed mb-8">{modalSubtext}</p>
                <div className="flex items-center gap-4 w-full">
                    <button
                        onClick={leftBtnfunc}
                        className="flex-1 py-3.5 rounded-xl text-black/50 hover:text-black hover:bg-black/3 dark:text-white/50 dark:hover:text-white dark:hover:bg-white/2 transition-colors text-sm font-medium">
                        {leftBtntext}
                    </button>
                    <button
                        onClick={rightBtnfunc}
                        className="flex-1 py-3.5 rounded-xl bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90 transition-colors text-sm font-medium shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        {rightBtntext}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}