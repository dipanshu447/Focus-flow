import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

export default function About() {
    const problems = [
        "Reduced attention span",
        "Inability to do deep work",
        "Constant switching between tasks",
        "Feeling busy but never productive",
    ];

    const principles = [
        {
            num: "01",
            title: "One thing at a time.",
            desc: "We don't let you manage multiple projects. We ask you to focus on one thing. Because that's the only way anything gets done.",
        },
        {
            num: "02",
            title: "Sessions over hours.",
            desc: "We measure focus in sessions, not hours. A 25-minute session of real work is worth more than 4 hours of scattered attention.",
        },
        {
            num: "03",
            title: "No streaks. No pressure.",
            desc: "Habit streaks create anxiety. We show up, we work, we leave. Simple. Consistent. Without guilt.",
        },
        {
            num: "04",
            title: "Nothing extra.",
            desc: "Every feature we remove is intentional. Every feature that doesn't serve your focus doesn't belong here.",
        },
    ];

    return (
        <div className="relative z-2 flex flex-col w-full transition-colors duration-500 overflow-hidden">
            <div className="relative pt-32 md:pt-40 pb-16 md:pb-24 flex flex-col px-6 md:px-12 lg:px-24 w-full">
                <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] md:text-xs mb-4">
                    About FocusFlow
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black my-4 tracking-tight leading-[1.1] text-black/90 dark:text-white/90 text-left">
                    We’re Not Lazy.<br />We’re <br className="hidden md:block"/>
                    <span className="text-white dark:text-black italic bg-black dark:bg-white font-bold inline-block px-2 mt-1 md:mt-2 rounded-sm">Overstimulated.</span>
                </h1>
                <p className="mt-4 text-base md:text-lg lg:text-xl font-light text-black/60 dark:text-white/60 max-w-2xl leading-relaxed">
                    The problem isn't discipline. It's an environment engineered to break it.
                </p>
            </div>
            <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24 flex flex-col md:flex-row gap-16 md:gap-12 lg:gap-24 border-y border-black/10 dark:border-white/10 w-full">
                
                <div className="flex flex-col w-full md:w-1/2">
                    <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] md:text-xs mb-6">
                        The problem
                    </span>
                    <p className="text-xl md:text-2xl text-black/90 dark:text-white/90 font-light leading-relaxed mb-8">
                        Modern apps are designed for engagement. Not clarity.
                    </p>
                    <p className="text-base md:text-lg text-black/60 dark:text-white/60 font-light leading-relaxed mb-8">
                        Notifications.<br />Short-form content.<br />Infinite scroll.
                    </p>
                    <div className="text-lg md:text-xl text-black/90 dark:text-white/90 font-medium leading-relaxed">
                        Your brain absorbs micro dopamine spikes all day.
                    </div>
                </div>

                <div className="flex flex-col w-full md:w-1/2">
                    <div className="flex flex-col border-b border-black/5 dark:border-white/5 w-full pb-10">
                        <div className="text-lg md:text-xl text-black/90 dark:text-white/90 font-medium mb-6">
                            The result:
                        </div>
                        <ul className="flex flex-col gap-4">
                            {problems.map(p => (
                                <li key={p} className="flex items-start md:items-center gap-4 text-sm md:text-base font-light text-black/60 dark:text-white/60">
                                    <div className="mt-1 md:mt-0 p-1.5 rounded-full bg-black/5 dark:bg-white/5 shrink-0">
                                        <FaArrowRight className="w-3 h-3 text-black/40 dark:text-white/40" />
                                    </div>
                                    <span>{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-xl md:text-2xl text-black/90 dark:text-white/90 font-light leading-relaxed mt-10">
                        It's not a willpower problem.<br /> It's a systems problem.
                    </p>
                </div>
            </div>
            <div className="py-24 md:py-32 px-6 md:px-12 lg:px-24 flex flex-col text-center items-center border-b border-black/10 dark:border-white/10 w-full">
                <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] md:text-xs mb-6">
                    Our Philosophy
                </span>
                <h2 className="w-full max-w-4xl text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-[1.1] text-black/90 dark:text-white/90">
                    FocusFlow is not another productivity app.
                </h2>
                <p className="text-base md:text-lg lg:text-xl font-light text-black/60 dark:text-white/60 max-w-2xl leading-relaxed">
                    It's a deliberate removal of everything that doesn't serve your work.<br className="hidden md:block"/> 
                    A tool that respects your attention instead of competing for it.
                </p>
            </div>
            <div className="py-16 md:py-24 px-6 md:px-12 lg:px-24 flex flex-col border-b border-black/10 dark:border-white/10 w-full">
                <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] md:text-xs mb-10 md:mb-16">
                    Our Principles
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {principles.map(p => (
                        <div 
                            key={p.num} 
                            className="relative bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 shadow-sm hover:shadow-xl dark:shadow-none p-8 md:p-10 rounded-3xl transition-all duration-500 w-full group hover:-translate-y-2">
                            <div className="text-xs font-mono tracking-widest text-black/30 dark:text-white/30 mb-6">
                                {p.num}
                            </div>
                            <h3 className="font-bold text-xl md:text-2xl text-black/90 dark:text-white/90 mb-4 group-hover:text-black dark:group-hover:text-white transition-colors tracking-tight">
                                {p.title}
                            </h3>
                            <p className="text-sm md:text-base font-light text-black/60 dark:text-white/50 leading-relaxed">
                                {p.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-20 md:py-25 mb-20 px-6 md:px-12 lg:px-24 flex flex-col border-b border-black/10 dark:border-white/10 w-full">
                <div className="w-full max-w-2xl mx-auto flex flex-col">
                    <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] md:text-xs mb-8">
                        A note from the team
                    </span>
                    <div className="text-base font-light text-black/80 dark:text-white/80 leading-relaxed mb-6">
                        We built FocusFlow because we were tired of tools that promised productivity but delivered distraction. We wanted something quiet. Something that got out of the way. Something that trusted us to know what needed doing.
                    </div>
                    <div className="text-base font-medium text-black/90 dark:text-white/90 mb-10">
                        This is that tool.
                    </div>
                    <Link 
                        to="/app" 
                        className="flex gap-3 items-center justify-center md:justify-start w-max bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl font-medium px-6 py-2.5 rounded-full text-sm hover:-translate-y-1 group">
                        <span>Start using FocusFlow</span> 
                        <FaArrowRight className="w-3.5 h-3.5 text-white/70 dark:text-black/70 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}