import heroBg from '../assets/hero.png';
import landingBg from '../assets/landing_end.png';
import preview from '../assets/preview.png';
import { LuTarget, LuTimer, LuTrendingUp } from "react-icons/lu"
import scrollTosection from '../utils/scrollToSection.ts';
import { Link } from 'react-router';

export default function Welcome() {
    const token = localStorage.getItem("token");
    
    const steps = [
        {
            num: "01",
            icon: LuTarget,
            title: "Choose one task",
            desc: "Pick a single task. Ignore everything else.",
        },
        {
            num: "02",
            icon: LuTimer,
            title: "Work in one session",
            desc: "Work in a distraction-free session with clear boundaries.",
        },
        {
            num: "03",
            icon: LuTrendingUp,
            title: "See real progress",
            desc: "Track completed sessions and build momentum.",
        },
    ];

    const features = [
        {
            num: "01",
            title: "One Task",
            desc: "Choose what matters. Ignore everything else.",
        },
        {
            num: "02",
            title: "One Session",
            desc: "Work in a clear, uninterrupted block.",
        },
        {
            num: "03",
            title: "Real Progress",
            desc: "Finish what you start. Track what counts.",
        },
    ];

    return (
        <div className="relative z-2 pb-20 flex flex-col bg-top bg-no-repeat text-neutral-950 dark:text-[#e5e5e5] w-full transition-colors duration-500 overflow-hidden">
            <div className="w-full px-6 py-32 lg:py-35 text-center flex flex-col items-center gap-1 self-center relative z-10 border-b border-black/10 dark:border-white/10">
                <div
                    className="absolute inset-0 bg-cover bg-center mask-[linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] -z-10 opacity-[0.15] dark:opacity-15 pointer-events-none"
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>
                <small className="px-4 py-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-xs font-light tracking-wide text-black/80 dark:text-white/60 mb-3 transition-colors duration-300">
                    For people who actually finish things
                </small>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight leading-[1.1] text-black/90 dark:text-white/90">
                    Stop Switching.<br className="hidden sm:block" /> Start Finishing.
                </h1>
                <p className="text-base md:text-lg lg:text-xl font-light text-black/60 dark:text-white/60 mb-4">
                    One task. One session. One outcome.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    {token ? (
                        <Link to="app" className="bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 font-medium px-8 py-3.5 rounded-full text-sm shadow-lg shadow-black/10 dark:shadow-white/10 hover:-translate-y-0.5">
                            Launch App
                        </Link>
                    ) : (
                        <Link to="signup" className="bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 font-medium px-8 py-3.5 rounded-full text-sm shadow-lg shadow-black/10 dark:shadow-white/10 hover:-translate-y-0.5">
                            Start Free
                        </Link>
                    )}
                    <button 
                        onClick={e => scrollTosection(e, 'howitworks')} 
                        className="border border-black/20 dark:border-white/20 hover:border-black/50 dark:hover:border-white/50 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white transition-all duration-300 font-medium px-6 py-3.5 rounded-full text-sm hover:-translate-y-0.5 cursor-pointer">
                        See it in action →
                    </button>
                </div>
            </div>
            <div className="py-20 md:py-32 px-6 md:px-12 lg:px-24 flex relative z-10 border-b border-black/10 dark:border-white/10 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full max-w-6xl mx-auto gap-12 md:gap-8">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-black/90 dark:text-white/90 w-full md:max-w-xl">
                        You’re Not Distracted. You’re<br className="hidden md:block"/> 
                        <span className="text-white italic bg-black dark:bg-white dark:text-black font-bold inline-block px-2 mt-1 rounded-sm">Fragmented.</span>
                    </h2>
                    <div className="text-black/70 dark:text-white/60 flex flex-col gap-6 text-base md:text-lg font-light md:max-w-md">
                        <div className="flex flex-col font-medium tracking-wide text-black/40 dark:text-white/40">
                            <span>Tabs.</span>
                            <span>Notifications.</span>
                            <span>Tools.</span>
                        </div>
                        <p className="leading-relaxed">
                            Everything pulls your attention in a different direction.
                        </p>
                        <p className="text-black/90 dark:text-white/90 text-xl font-medium">
                            And nothing gets <span className="italic font-bold">finished.</span>
                        </p>
                    </div>

                </div>
            </div>
            <div className="py-20 md:py-32 px-6 md:px-12 lg:px-24 flex flex-col relative z-10 border-b border-black/10 dark:border-white/10 w-full items-center">
                <div className="flex flex-col items-center text-center w-full max-w-4xl gap-6 md:gap-10">
                    <h2 id="features" className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.15] text-black/90 dark:text-white/90">
                        FocusFlow brings your attention back under control.
                    </h2>
                    <div className="text-black/60 dark:text-white/50 flex flex-col text-base md:text-lg font-light">
                        <span>Not by adding more.</span>
                        <span>By removing what doesn’t matter.</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-16 md:mt-24 w-full max-w-6xl mx-auto">
                    {features.map(f => (
                        <div 
                            key={f.num} 
                            className="relative bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 shadow-sm hover:shadow-xl dark:shadow-none p-8 md:px-8 md:py-7 rounded-3xl transition-all duration-500 w-full group hover:-translate-y-2">
                            <div className="text-xs font-mono tracking-widest text-black/30 dark:text-white/30 mb-6">
                                {f.num}
                            </div>
                            <h3 className="font-bold text-xl md:text-2xl text-black/90 dark:text-white/90 mb-3 group-hover:text-black dark:group-hover:text-white transition-colors">
                                {f.title}
                            </h3>
                            <p className="text-sm md:text-base font-light text-black/60 dark:text-white/50 leading-relaxed">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-20 md:py-30 px-6 md:px-12 lg:px-24 flex flex-col relative z-10 items-center text-center border-b border-black/10 dark:border-white/10 w-full">
                <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] mb-4">
                    See it in action
                </span>
                <h2 className="w-full max-w-3xl text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1] text-black/90 dark:text-white/90">
                    A workspace that respects your attention.
                </h2>
                <p className="text-base md:text-lg font-light text-black/60 dark:text-white/60 max-w-2xl">
                    No dashboards. No clutter. Just a clear space for deep, uninterrupted work.
                </p>
                <div className="w-full max-w-5xl bg-black/2 dark:bg-white/2 mt-12 md:mt-20 overflow-hidden rounded-2xl md:rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl dark:shadow-[0_20px_60px_rgba(255,255,255,0.03)] transition-all duration-500">
                    <img 
                        className="w-full h-auto object-cover scale-100 hover:scale-[1.02] transition-transform duration-700 ease-in-out grayscale" 
                        src={preview} 
                        alt="FocusFlow Interface Preview" 
                        loading="lazy"/>
                </div>
                <p className="mt-10 text-center text-black/60 dark:text-white/50 font-light text-sm md:text-base">
                    Every element serves <span className="font-medium italic text-black/80 dark:text-white/80">your focus.</span>
                </p>
            </div>
            <div className="py-20 md:py-32 px-6 md:px-12 lg:px-24 flex flex-col relative z-10 border-b border-black/10 dark:border-white/10 w-full items-center">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-black/90 dark:text-white/90 scroll-mt-32 text-center" id="howitworks">
                    How it works
                </h2>
                <span className="text-center text-black/50 dark:text-white/40 text-sm md:text-base font-light mb-12 md:mb-20">
                    From distraction to completion.
                </span>
                <div className="flex flex-col md:flex-row mt-8 items-start justify-center gap-16 md:gap-8 lg:gap-16 w-full max-w-5xl mx-auto">
                    {steps.map((s) => (
                        <div key={s.num} className="flex flex-col items-center gap-4 text-center w-full md:flex-1 relative">
                            <div className="p-5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl md:rounded-3xl z-10 transition-transform duration-300 hover:scale-105">
                                <s.icon className="w-8 h-8 md:w-10 md:h-10 text-black/70 dark:text-white/70" strokeWidth={1.5} />
                            </div>
                            <h3 className="mt-4 text-xl md:text-2xl font-bold text-black/90 dark:text-white/90">
                                {s.title}
                            </h3>
                            <p className="text-black/60 dark:text-white/50 text-sm md:text-base font-light leading-relaxed px-4 md:px-0">
                                {s.desc}
                            </p>
                            <small className="text-black/20 dark:text-white/20 font-mono tracking-widest text-lg mt-2">
                                {s.num}
                            </small>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative w-full text-center py-32 md:py-48 flex flex-col items-center z-10 px-6 border-b border-black/10 dark:border-white/10">
                <div
                    className="absolute inset-0 bg-cover bg-center mask-[linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] -z-10 opacity-[0.15] dark:opacity-15 pointer-events-none"
                    style={{ backgroundImage: `url(${landingBg})` }}
                ></div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1] text-black/90 dark:text-white/90">
                    Reclaim Your Attention.
                </h2>
                <p className="text-base md:text-lg lg:text-xl font-light text-black/60 dark:text-white/60 mb-8 max-w-md">
                    One session is all it takes to feel the difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    {token ? (
                        <Link to="app" className="bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 font-medium px-10 py-4 rounded-full text-sm md:text-base shadow-2xl hover:-translate-y-1">
                            Launch App
                        </Link>
                    ) : (
                        <Link to="signup" className="bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 font-medium px-10 py-4 rounded-full text-sm md:text-base shadow-2xl hover:-translate-y-1">
                            Start Free
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}