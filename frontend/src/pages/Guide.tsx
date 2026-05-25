import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

export default function Guide() {
    const sections = [
        {
            num: "01",
            title: "The Pomodoro Principle",
            content: [
                "Work in 25-minute focused sessions, followed by a 5-minute break.",
                "After 4 sessions, take a longer 15-30 minute break.",
                "This isn't a productivity hack. It's a respect for how the brain actually works.",
            ],
        },
        {
            num: "02",
            title: "Choose One Thing",
            content: [
                "Before every session, define the single task you are working on.",
                "Not a project. Not a category. A task.",
                "If it cannot be completed in 1-3 sessions, break it down further.",
            ],
        },
        {
            num: "03",
            title: "Protect the Session",
            content: [
                "Close every tab that isn't necessary.",
                "Put your phone in another room or face-down.",
                "Tell people around you that you're in a focus block.",
                "The session is sacred. Guard it.",
            ],
        },
        {
            num: "04",
            title: "Use Breaks Correctly",
            content: [
                "Breaks are not rewards. They're part of the system.",
                "Step away from your screen. Drink water. Breathe.",
                "Do not check messages, feeds, or notifications during breaks.",
                "Return to the next session fresh.",
            ],
        },
        {
            num: "05",
            title: "Track Without Obsession",
            content: [
                "FocusFlow records your sessions quietly.",
                "Look at your stats once a day, not after every session.",
                "The goal is not to maximize sessions. It's to finish what matters.",
            ],
        },
        {
            num: "06",
            title: "Show Up Consistently",
            content: [
                "Three sessions done is better than ten planned.",
                "Don't optimize. Don't gamify. Just show up.",
                "Consistency over intensity, every time.",
            ],
        },
    ];

    const rules = [
        "One task per session",
        "No multitasking",
        "No checking notifications mid-session",
        "No guilt for stopping, just restart",
        "The session ends. You rest. You continue.",
    ];

    return (
        <div className="relative z-2 flex flex-col w-full transition-colors duration-500 overflow-hidden">
            <div className="relative pt-32 md:pt-40 pb-16 md:pb-24 flex flex-col px-6 md:px-12 lg:px-24 w-full">
                <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] md:text-xs mb-4">
                    The FocusFlow Method
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black my-4 tracking-tight leading-[1.1] text-black/90 dark:text-white/90 text-left">
                    How to work<br className="hidden md:block"/> without noise.
                </h1>
                <p className="mt-4 text-base md:text-lg lg:text-xl font-light text-black/60 dark:text-white/60 max-w-2xl leading-relaxed">
                    A practical guide to deep work, focused sessions, and getting things done without burning out.
                </p>
            </div>
            <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24 flex flex-col md:flex-row gap-12 md:gap-8 border-y border-black/10 dark:border-white/10 w-full">
                <div className="flex flex-col w-full md:w-1/2">
                    <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] md:text-xs">
                        The ground rules
                    </span>
                    <h2 className="text-black/90 dark:text-white/90 mt-4 md:mt-6 font-black text-3xl md:text-4xl tracking-tight">
                        Simple. Strict. Effective.
                    </h2>
                </div>
                <ul className="flex flex-col gap-4 w-full md:w-1/2 justify-center">
                    {rules.map((r, i) => (
                        <li key={i} className="flex items-start md:items-center gap-4 text-sm md:text-base font-light text-black/60 dark:text-white/60">
                            <div className="mt-1 md:mt-0 p-1.5 rounded-full bg-black/5 dark:bg-white/5 shrink-0">
                                <FaArrowRight className="w-3 h-3 text-black/40 dark:text-white/40" />
                            </div>
                            <span>{r}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="py-16 md:py-24 px-6 md:px-12 lg:px-24 flex flex-col border-b border-black/10 dark:border-white/10 w-full">
                <div className="flex flex-col w-full max-w-4xl">
                    {sections.map((p, index) => (
                        <div 
                            key={p.num} 
                            className={`relative transition-all duration-300 w-full py-12 md:py-16 ${index === 0 ? '' : 'border-t border-black/5 dark:border-white/5'}`}>
                            <div className="text-xs font-mono tracking-widest text-black/30 dark:text-white/30 mb-4">
                                {p.num}
                            </div>
                            <h3 className="font-bold text-2xl md:text-3xl text-black/90 dark:text-white/90 mb-6 tracking-tight">
                                {p.title}
                            </h3>
                            <div className="flex flex-col gap-4">
                                {p.content.map((c, i) => (
                                    <p key={i} className="text-base md:text-lg font-light text-black/60 dark:text-white/60 leading-relaxed">
                                        {c}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative text-center py-32 md:py-40 mb-20 flex flex-col items-center border-b border-black/10 dark:border-white/10 px-6">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1] text-black/90 dark:text-white/90">
                    Start with one session.
                </h2>
                <p className="text-base md:text-lg lg:text-xl font-light text-black/60 dark:text-white/60 mb-8 max-w-md">
                    Don't plan. Don't optimize. Open the app and start the timer.
                </p>
                <div className="flex justify-center mt-4">
                    <Link 
                        to="/app" 
                        className="bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl font-medium px-8 py-4 rounded-full text-sm md:text-base flex items-center gap-3 hover:-translate-y-1 group">
                        <span>Open FocusFlow</span>
                        <FaArrowRight className="w-3.5 h-3.5 text-white/70 dark:text-black/70 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}