import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

export default function Guide() {
    const sections = [
        {
            num: "01",
            title: "The Pomodoro Principle",
            content: [
                "Work in 25-minute focused sessions, followed by a 5-minute break.",
                "After 4 sessions, take a longer 15–30 minute break.",
                "This isn't a productivity hack. It's a respect for how the brain actually works.",
            ],
        },
        {
            num: "02",
            title: "Choose One Thing",
            content: [
                "Before every session, define the single task you are working on.",
                "Not a project. Not a category. A task.",
                "If it cannot be completed in 1–3 sessions, break it down further.",
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
                "Look at your stats once a day — not after every session.",
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
        <div className="relative z-2 flex flex-col w-full mb-20">
            <div className="relative my-20 dark:text-white pt-20 pb-10 flex flex-col px-40 w-5xl">
                <span className="uppercase text-neutral-500 tracking-wider text-sm">The FocusFlow Method</span>
                <h1 className="text-8xl font-black my-6 tracking-tight leading-25 text-black dark:text-white text-left">How to work without noise.</h1>
                <p className="mt-2 font-light w-xl">A practical guide to deep work, focused sessions, and getting things done without burning out.</p>
            </div>
            <div className="px-40 py-20 flex border-y border-y-neutral-800">
                <div className="text-black dark:text-white flex flex-col w-full">
                    <span className="uppercase text-neutral-500 tracking-wider text-sm">The ground rules</span>
                    <div className='text-black dark:text-white mt-6 font-black text-2xl'>Simple. Strict. Effective.</div>
                </div>
                <ul className="text-black dark:text-white flex flex-col gap-1.5 w-full">
                    {rules.map(r => (
                        <li key={r} className="mt-1 flex items-center gap-3 text-sm text-neutral-300">
                            <FaArrowRight className="size-3 fill-neutral-600" />
                            {r}</li>
                    ))}
                </ul>
            </div>
            <div className="py-15 px-40 flex flex-col text-white border-b border-b-neutral-800">
                <div className="my-10 flex flex-col gap-15">
                    {sections.map(p => (
                        <div key={p.num} className={`relative shadow-sm dark:shadow-none ease transition-all duration-200 w-full pt-10 ${p.num === "01" ? '' : 'border-t border-t-neutral-800'}`}>
                            <div className="text-xs text-gray-500 font-medium">{p.num}</div>
                            <div className='font-bold text-lg text-black dark:text-white relative z-4 mt-3'>{p.title}</div>
                            <div className="flex flex-col gap-4 mt-6">
                                {p.content.map(c => (
                                    <span key={c} className="flex items-center gap-3 text-sm text-neutral-300">{c}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative text-center text-neutral-950 dark:text-white py-25 flex flex-col items-center z-10 border-b border-b-neutral-800">
                <h1 className="text-7xl font-black my-6 tracking-tight">Start with one session.</h1>
                <p className='text-medium'>Don't plan. Don't optimize. Open the app and start the timer.</p>
                <div className="flex gap-5 mt-6">
                    <Link to="/" className="mt-5 bg-black text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-black dark:hover:bg-white dark:hover:font-bold transition-all duration-300 shadow-sm hover:shadow-md font-medium px-6 py-3 rounded-full text-sm cursor-pointer hover:-translate-y-1 flex items-center gap-2">
                        Open FocusFlow
                        <FaArrowRight className="size-3 fill-neutral-800" />
                    </Link>
                </div>
            </div>
        </div>
    )
}