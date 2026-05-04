import heroBg from '../assets/hero.png';
import landingBg from '../assets/landing_end.png';
import preview from '../assets/preview.png';
import { LuTarget, LuTimer, LuTrendingUp } from "react-icons/lu"
import scrollTosection from '../utils/scrollToSection.ts';

export default function Welcome() {
    return (
        <div
            className="relative z-2 pb-20 flex flex-col bg-top bg-no-repeat text-neutral-950 dark:text-white"
        >
            <div className="w-full py-35 text-center text-neutral-950 dark:text-white flex flex-col items-center gap-1 self-center relative z-10" >
                <div
                    className="absolute inset-0 bg-cover bg-center mask-[linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] -z-10 opacity-35 dark:opacity-30"
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>
                <small className="px-4 py-1.5 bg-neutral-200/70 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 border border-neutral-200 rounded-full text-sm italic font-[Indie_Flower] tracking-wide text-neutral-600">For people who actually finish things</small>
                <h1 className="text-8xl font-black my-3 tracking-tight">Stop Switching.<br/> Start Finishing.</h1>
                <p>One task. One session. One outcome.</p>
                <div className="flex gap-5 mt-4">
                    <button className="mt-5 bg-black text-white hover:bg-neutral-800 dark:bg-neutral-200 dark:text-black dark:hover:-translate-y-1 dark:hover:bg-white transition-all duration-200 font-medium px-7 py-3 rounded-full text-sm cursor-pointer scroll-smooth">Start Free</button>
                    <button className="mt-5 border border-black dark:border-neutral-200 hover:text-white hover:bg-black dark:hover:bg-white dark:text-white dark:hover:text-black  dark:hover:border-white text-black transition-all duration-200 shadow-sm hover:shadow-md font-medium px-6 py-3 rounded-full text-sm scroll-smooth cursor-pointer" onClick={e => scrollTosection(e, 'howitworks')}>See it in action →</button>
                </div>
            </div>
            <div className="mt-25 mx-20 flex text-neutral-950 dark:text-white relative z-10">
                <div className='flex flex-col'>
                    <h1 className="text-5xl font-black my-5 tracking-tight text-black dark:text-white">You’re Not Distracted.<br />
                        You’re Fragmented.</h1>
                    <div className='text-black dark:text-neutral-300 flex flex-col gap-6 mt-3'>
                        <div className='flex flex-col'>
                            <span>Tabs.</span>
                            <span>Notifications.</span>
                            <span>Tools.</span>
                        </div>
                        <p>Everything pulls your attention in a different direction.</p>
                        <p> And nothing gets <span className='font-bold'>finished.</span></p>
                    </div>
                </div>
            </div>
            <div className="mx-20 mt-30 flex flex-col relative z-10">
                <div className="text-black dark:text-white flex flex-col items-center text-center w-full gap-10">
                    <div className="w-xl text-5xl font-bold leading-13">FocusFlow brings your attention back under control.</div>
                    <div className='text-neutral-900 dark:text-gray-300 flex flex-col'>
                        <span>Not by adding more.</span>
                        <span>By removing what doesn’t matter.</span>
                    </div>
                </div>
                <div className='flex justify-between gap-20 mt-20'>
                    <div className='relative bg-white/65 dark:bg-transparent dark:hover:bg-neutral-950 hover:-translate-y-2 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-700 shadow-sm dark:shadow-none p-5 rounded-3xl ease transition-all duration-200'>
                        <div className="text-xl text-gray-500 font-black">01</div>
                        <div className='font-bold text-2xl text-black dark:text-white relative z-4 mt-2'>One Task</div>
                        <div className='font-medium text-base text-neutral-800 dark:text-gray-300 relative z-4'>Choose what matters. Ignore everything else.</div>
                    </div>
                    <div className='relative bg-white/65 dark:bg-transparent dark:hover:bg-neutral-950 hover:-translate-y-2 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-700 shadow-sm dark:shadow-none p-5 rounded-3xl ease transition-all duration-200'>
                        <div className="text-xl text-gray-500 font-black">02</div>
                        <div className='font-bold text-2xl text-black dark:text-white relative z-4 mt-2'>One Session</div>
                        <div className='font-medium text-base text-neutral-800 dark:text-gray-300 relative z-4'>Work in a clear, uninterrupted block.</div>
                    </div>
                    <div className='relative bg-white/65 dark:bg-transparent dark:hover:bg-neutral-950 hover:-translate-y-2 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-700 shadow-sm dark:shadow-none p-5 rounded-3xl ease transition-all duration-200'>
                        <div className="text-xl text-gray-500 font-black">03</div>
                        <div className='font-bold text-2xl text-black dark:text-white relative z-4 mt-2'>Real Progress</div>
                        <div className='font-medium text-base text-neutral-800 dark:text-gray-300 relative z-4'>Finish what you start. Track what counts.</div>
                    </div>
                </div>
            </div>
            <div className="mt-25 mx-20 flex flex-col text-neutral-950 dark:text-white relative z-10 items-center text-center">
                <small className="px-4 py-2 bg-neutral-200/70 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 border border-neutral-300 rounded-full text-sm italic font-[Indie_Flower] tracking-wide text-neutral-600 dark:hover:bg-neutral-900 hover:-translate-y-1 hover:border-neutral-700 p-5 ease transition-all duration-200">See it in action</small>
                <h1 className="text-5xl font-black my-4 tracking-tight text-black dark:text-white">A workspace that respects your attention.</h1>
                <p className='text-black dark:text-white'>No dashboards. No clutter. Just a clear space for deep, uninterrupted work.</p>
                <div className='w-5xl bg-[radial-gradient(circle,rgba(15,23,42,0.08),transparent)] mt-15 overflow-hidden rounded-2xl border border-neutral-300 dark:border-neutral-500 shadow-sm hover:shadow-md dark:shadow-[0_30px_80px_rgba(255,255,0,0.2)] transition-all duration-300 grayscale'>
                    <img className='scale-100 hover:scale-101 object-cover size-full transition-all duration-300 ease-in-out' src={preview} alt="preview.png" />
                </div>
                <p className='mt-8 text-center text-neutral-700 dark:text-gray-400 font-medium font-[Indie_Flower]'>Every element serves <span className='font-bold italic'>your focus.</span></p>
            </div>
            <div className="mt-25 mx-20 flex flex-col text-neutral-950 dark:text-white relative z-10">
                <h1 className="text-5xl font-black my-3 tracking-tight text-black dark:text-white scroll-mt-32 text-center" id='howitworks'>How it works</h1>
                <span className='text-center text-neutral-700 dark:text-gray-400 text-sm mb-10'>From distraction to completion.</span>
                <div className='flex mt-15 items-center justify-between gap-4'>
                    <div className='flex flex-col items-center gap-1 text-center w-xs'>
                        <div className='p-4 bg-neutral-300/70 dark:bg-neutral-800/70 rounded-full'>
                            <LuTarget className='size-12 object-cover text-neutral-900 dark:text-white' />
                        </div>
                        <div className='mt-5 text-2xl font-bold text-black dark:text-white'>Choose one task</div>
                        <div className='text-neutral-700 dark:text-neutral-400'>Pick a single task. Ignore everything else.</div>
                        <small className='text-neutral-700 dark:text-neutral-500 font-bold text-2xl mt-4'>01</small>
                    </div>
                    <div className='flex flex-col items-center gap-1 text-center w-xs'>
                        <div className='p-4 bg-neutral-300/70 dark:bg-neutral-800/70 rounded-full'>
                            <LuTimer className='size-12 object-cover text-neutral-900 dark:text-white' />
                        </div>
                        <div className='mt-5 text-2xl font-bold text-black dark:text-white'>Work in one session</div>
                        <div className='text-neutral-700 dark:text-neutral-400'>Work in a distraction-free session with clear boundaries.</div>
                        <small className='text-neutral-700 dark:text-neutral-500 font-bold text-2xl mt-4'>02</small>
                    </div>
                    <div className='flex flex-col items-center gap-1 text-center w-xs'>
                        <div className='p-4 bg-neutral-300/70 dark:bg-neutral-800/70 rounded-full'>
                            <LuTrendingUp className='size-12 object-cover text-neutral-900 dark:text-white' />
                        </div>
                        <div className='mt-5 text-2xl font-bold text-black dark:text-white'>See real progress</div>
                        <div className='text-neutral-700 dark:text-neutral-400'>Track completed sessions and build momentum.</div>
                        <small className='text-neutral-700 dark:text-neutral-500 font-bold text-2xl mt-4'>03</small>
                    </div>
                </div>
            </div>
            <div className="relative my-20 text-center text-neutral-950 dark:text-white py-40 flex flex-col items-center z-10">
                <div
                    className="absolute inset-0 bg-cover bg-center mask-[linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] -z-10 opacity-25 dark:opacity-40"
                    style={{ backgroundImage: `url(${landingBg})` }}
                ></div>
                <h1 className="text-7xl font-black my-6 tracking-tight">Reclaim Your Attention.</h1>
                <p className='text-medium'>One session is all it takes to feel the difference.</p>
                <div className="flex gap-5 mt-6">
                    <button className="mt-5 bg-black text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-black dark:hover:bg-white dark:hover:font-bold transition-all duration-300 shadow-sm hover:shadow-md font-medium px-6 py-3 rounded-full text-sm cursor-pointer hover:-translate-y-1">Start Free</button>
                </div>
            </div>
        </div>
    )
}