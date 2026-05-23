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
        <div className="relative z-2 pb-20 flex flex-col bg-top bg-no-repeat text-neutral-950 dark:text-white w-full">
            <div className="w-full py-35 text-center text-neutral-950 dark:text-white flex flex-col items-center gap-1 self-center relative z-10 border-b border-b-neutral-800">
                <div
                    className="absolute inset-0 bg-cover bg-center mask-[linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] -z-10 opacity-35 dark:opacity-10"
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>
                <small className="px-4 py-1.5 bg-neutral-200/70 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 border border-neutral-200 rounded-full text-xs font-light tracking-wide text-neutral-600">For people who actually finish things</small>
                <h1 className="text-8xl font-black my-3 tracking-tight">Stop Switching.<br /> Start Finishing.</h1>
                <p>One task. One session. One outcome.</p>
                <div className="flex gap-5 mt-4">
                    {token ? (
                        <Link to="app" className="mt-5 bg-black text-white hover:bg-neutral-800 dark:bg-neutral-200 dark:text-black dark:hover:-translate-y-1 dark:hover:bg-white transition-all duration-200 font-medium px-7 py-3 rounded-full text-sm cursor-pointer scroll-smooth">Launch App</Link>
                    ) : (
                        <Link to="signup" className="mt-5 bg-black text-white hover:bg-neutral-800 dark:bg-neutral-200 dark:text-black dark:hover:-translate-y-1 dark:hover:bg-white transition-all duration-200 font-medium px-7 py-3 rounded-full text-sm cursor-pointer scroll-smooth">Start Free</Link>
                    )}
                    <button className="mt-5 border border-black dark:border-neutral-700 hover:text-white hover:bg-black dark:hover:bg-neutral-900 dark:text-white  dark:hover:border-neutral-600 text-black transition-all duration-200 shadow-sm hover:shadow-md font-medium px-6 py-3 rounded-full text-sm scroll-smooth cursor-pointer" onClick={e => scrollTosection(e, 'howitworks')}>See it in action →</button>
                </div>
            </div>
            <div className="py-25 px-0 flex text-neutral-950 dark:text-white relative z-10 border-b border-b-neutral-800">
                <div className='flex justify-around items-center w-full'>
                    <h1 className="text-6xl font-black my-5 tracking-tight text-black dark:text-white w-xs">You’re Not Distracted.
                        You’re<br /><span className="text-black italic bg-white font-bold text-7xl inline-block">Fragmented.</span></h1>
                    <div className='text-black dark:text-neutral-300 flex flex-col gap-6 mt-3'>
                        <div className='flex flex-col'>
                            <span>Tabs.</span>
                            <span>Notifications.</span>
                            <span>Tools.</span>
                        </div>
                        <p>Everything pulls your attention in a different direction.</p>
                        <p className='dark:text-white'> And nothing gets <span className='font-bold'>finished.</span></p>
                    </div>
                </div>
            </div>
            <div className="px-20 py-30 flex flex-col relative z-10 border-b border-b-neutral-800 w-full">
                <div className="text-black dark:text-white flex flex-col items-center text-center w-full gap-10">
                    <div id='features' className="w-3xl text-6xl font-black leading-16">FocusFlow brings your attention back under control.</div>
                    <div className='text-neutral-900 dark:text-gray-300 flex flex-col'>
                        <span>Not by adding more.</span>
                        <span>By removing what doesn’t matter.</span>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-10 mt-20 w-full'>
                    {features.map(f => (
                        <div key={f.num} className='relative bg-white/65 dark:bg-neutral-950 dark:hover:bg-neutral-900 hover:-translate-y-2 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-700 shadow-sm dark:shadow-none p-7 rounded-3xl ease transition-all duration-200 w-full'>
                            <div className="text-sm text-gray-500">{f.num}</div>
                            <div className='font-bold text-xl text-black dark:text-white relative z-4 mt-4'>{f.title}</div>
                            <div className='font- text-sm text-neutral-800 dark:text-gray-300 relative z-4 mt-2 '>{f.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-25 px-20 flex flex-col text-neutral-950 dark:text-white relative z-10 items-center text-center border-b border-b-neutral-800">
                <span className="uppercase text-neutral-500 tracking-wider text-xs">See it in action</span>
                <h1 className="w-3xl text-6xl font-black my-5 tracking-tight leading-15 text-black dark:text-white">A workspace that respects your attention.</h1>
                <p className='text-black dark:text-white'>No dashboards. No clutter. Just a clear space for deep, uninterrupted work.</p>
                <div className='w-5xl bg-[radial-gradient(circle,rgba(15,23,42,0.08),transparent)] mt-15 overflow-hidden rounded-2xl border border-neutral-300 dark:border-neutral-500 shadow-sm hover:shadow-md dark:shadow-[0_30px_80px_rgba(255,255,0,0.2)] transition-all duration-300 grayscale'>
                    <img className='scale-100 hover:scale-101 object-cover size-full transition-all duration-300 ease-in-out' src={preview} alt="preview.png" />
                </div>
                <p className='mt-8 text-center text-neutral-700 dark:text-gray-400 font-medium'>Every element serves <span className='font-bold italic'>your focus.</span></p>
            </div>
            <div className="py-25 px-20 flex flex-col text-neutral-950 dark:text-white relative z-10 border-b border-b-neutral-800">
                <h1 className="text-5xl font-black my-3 tracking-tight text-black dark:text-white scroll-mt-32 text-center" id='howitworks'>How it works</h1>
                <span className='text-center text-neutral-700 dark:text-gray-400 text-sm mb-10'>From distraction to completion.</span>
                <div className='flex mt-15 items-center justify-around'>
                    {steps.map(s => (
                        <div key={s.num} className='flex flex-col items-center gap-1 text-center w-xs'>
                            <div className='p-4 bg-neutral-300/70 dark:bg-neutral-800/70 rounded-full'>
                                <s.icon className='size-10 object-cover text-neutral-900 dark:text-white' />
                            </div>
                            <div className='mt-5 text-xl font-bold text-black dark:text-white'>{s.title}</div>
                            <div className='text-neutral-700 dark:text-neutral-400 text-sm'>{s.desc}</div>
                            <small className='text-neutral-700 dark:text-neutral-500 font-bold text-xl mt-4'>{s.num}</small>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative text-center text-neutral-950 dark:text-white py-40 flex flex-col items-center z-10 border-b border-b-neutral-800">
                <div
                    className="absolute inset-0 bg-cover bg-center mask-[linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] -z-10 opacity-25 dark:opacity-10"
                    style={{ backgroundImage: `url(${landingBg})` }}
                ></div>
                <h1 className="text-7xl font-black my-6 tracking-tight">Reclaim Your Attention.</h1>
                <p className='text-medium'>One session is all it takes to feel the difference.</p>
                <div className="flex gap-5 mt-6">
                    {token ? (
                        <Link to="app" className="mt-5 bg-black text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-black dark:hover:bg-white dark:hover:font-bold transition-all duration-300 shadow-sm hover:shadow-md font-medium px-6 py-3 rounded-full text-sm cursor-pointer hover:-translate-y-1">Launch App</Link>
                    ) : (
                       <Link to="signup" className="mt-5 bg-black text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-black dark:hover:bg-white dark:hover:font-bold transition-all duration-300 shadow-sm hover:shadow-md font-medium px-6 py-3 rounded-full text-sm cursor-pointer hover:-translate-y-1">Start Free</Link>
                    )}
                </div>
            </div>
        </div>
    )
}