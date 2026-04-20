// import welomeBg from '../assets/welcome_bg.png';;
import preview from '../assets/preview.png';
import doomScroll from '../assets/doom_scroll.jpg';
import { VscTools } from "react-icons/vsc";
import { LuTarget, LuTimer, LuTrendingUp } from "react-icons/lu";
import { PiArrowBendUpRightThin } from "react-icons/pi";
import scrollTosection from '../utils/scrollToSection.ts';

export default function Welcome() {
    return (
        <div className="relative z-2 my-25 flex flex-col">
            <div className="w-2xl mt-10 text-center dark:text-white flex flex-col items-center gap-1 self-center">
                <small className="px-4 py-1.5 bg-neutral-200/70 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 border border-gray-300 rounded-full text-sm italic font-[Indie_Flower] tracking-wide text-neutral-600">Designed for Deep Work.</small>
                <h1 className="text-8xl font-black my-3 tracking-tight leading-26">Focus Without Noise.</h1>
                <p>A minimal workspace designed to help you finish what matters.</p>
                <div className="flex gap-5 mt-4">
                    <button className="mt-5 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all duration-200 shadow-sm hover:shadow-md font-medium px-6 py-3 rounded-full text-sm">Start Free</button>
                    <button className="mt-5 border border-black dark:border-white hover:text-white dark:text-white dark:hover:text-black text-black hover:bg-black dark:hover:bg-neutral-200 transition-all duration-200 shadow-sm hover:shadow-md font-medium px-6 py-3 rounded-full text-sm scroll-smooth" onClick={e => scrollTosection(e, 'howitworks')}>See How it works →</button>
                </div>
            </div>
            <div className="mt-25 mx-20 flex text-white gap-10">
                <div className='flex flex-col w-3xl'>
                    <img className='scale-100 hover:scale-103 grayscale object-cover transition-all duration-300 ease-in-out rounded-2xl' src={doomScroll} alt="doom_scroll.png" />
                    <p className='mt-8 text-center text-neutral-700 dark:text-gray-400 font-medium font-[Indie_Flower]'>Productivity isn't about doing more. It's about <span className='font-bold italic'>eliminating noise.</span></p>
                </div>
                <div className='flex flex-col justify-start'>
                    <h1 className="text-4xl font-black my-5 tracking-tight text-black dark:text-white text-right">Modern Work Is Fragmented.</h1>
                    <div className='text-black dark:text-neutral-300 text-right flex flex-col gap-10 mt-3'>
                        <p>Modern work environments are saturated with stimuli.<br />Notifications, layered dashboards, animated interfaces, and expanding feature sets all compete for cognitive space.</p>
                        <p>Instead of supporting deep work, many tools fragment attention and reward constant switching.</p>
                        <p>Productivity becomes busy not <span className='font-bold font-[Indie_Flower] italic'>meaningful.</span></p>
                    </div>
                </div>
            </div>
            <div className="mx-20 mt-30 flex flex-col">
                <div className="text-black dark:text-white flex justify-between w-full">
                    <div className="w-md text-5xl font-bold">FocusFlow Takes a Different Approach.</div>
                    <p className='w-md self-end text-lg'>Instead of adding more features, FocusFlow removes what does not serve focused work. It is built around structure, constraint, and clarity, creating an environment where attention can stabilize and meaningful progress can begin.</p>
                </div>
                <div className='grid grid-cols-3 gap-20 mt-35'>
                    <div className='relative'>
                        <div className="absolute text-8xl text-gray-500 font-black -top-8 z-0 -left-5 opacity-20">01</div>
                        <div className='font-bold text-2xl text-black dark:text-white relative z-4'>Structured Sessions</div>
                        <div className='font-medium text-base text-neutral-800 dark:text-gray-300 relative z-4 mt-3'>Plan intentional blocks of deep work with clear start and end points. No scattered tasks. No chaos.</div>
                    </div>
                    <div className='relative'>
                        <div className="absolute text-8xl text-gray-500 font-black -top-8 z-0 -left-5 opacity-20">02</div>
                        <div className='font-bold text-2xl text-black dark:text-white relative z-4'>Distraction-Free Workspace</div>
                        <div className='font-medium text-base text-neutral-800 dark:text-gray-300 relative z-4 mt-3'>A minimal interface designed to eliminate visual noise and keep attention where it belongs.</div>
                    </div>
                    <div className='relative'>
                        <div className="absolute text-8xl text-gray-500 font-black -top-8 z-0 -left-5 opacity-20">03</div>
                        <div className='font-bold text-2xl text-black dark:text-white relative z-4'>Track Meaningful Progress</div>
                        <div className='font-medium text-base text-neutral-800 dark:text-gray-300 relative z-4 mt-3'>Measure focused time, completed sessions, and build consistency that compounds over time.</div>
                    </div>
                </div>
            </div>
            <div className="mt-25 mx-20 flex flex-col text-white">
                <small className="px-4 py-1.5 bg-neutral-200/70 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 border border-gray-300 rounded-full text-sm italic font-[Indie_Flower] tracking-wide text-neutral-600 self-baseline">See FocusFlow in Action.</small>
                <h1 className="text-8xl font-black my-5 tracking-tight leading-26 text-black dark:text-white">A Workspace That Respects <span className='font-medium font-[Indie_Flower] italic'>Your Attention.</span></h1>
                <p className='text-black dark:text-white'>No dashboards. No visual clutter. Just a structured environment designed to support deep, uninterrupted work sessions.</p>
                <div className='mt-15 overflow-hidden rounded-2xl shadow-2xl border border-neutral-300 dark:border-neutral-500'>
                    <img className='scale-100 hover:scale-103 object-cover size-full transition-all duration-300 ease-in-out' src={preview} alt="preview.png" />
                </div>
                <p className='mt-8 text-center text-neutral-700 dark:text-gray-400 font-medium font-[Indie_Flower]'>Every element exists for one purpose to help you <span className='font-bold italic'>stay focused.</span></p>
            </div>
            <div className="mt-25 mx-20 flex flex-col text-white">
                <div className='flex items-center gap-4'>
                    <VscTools className='size-12  opacity-20 dark:fill-white fill-black' />
                    <h1 className="text-5xl font-black my-5 tracking-tight text-black dark:text-white scroll-mt-32" id='howitworks'>How FocusFlow Works</h1>
                </div>
                <div className='flex mt-15 items-center justify-center gap-4'>
                    <div className='flex flex-col items-center gap-1 text-center w-xs'>
                        <div className='p-4 bg-neutral-300/70 dark:bg-neutral-800/70 rounded-full'>
                            <LuTarget className='size-12 object-cover dark:invert-0 invert' />
                        </div>
                        <div className='mt-5 text-2xl font-bold text-black dark:text-white'>Choose What Matters</div>
                        <div className='text-neutral-700 dark:text-neutral-400'>Select one task to focus on. No multitasking.</div>
                        <small className='text-neutral-700 dark:text-neutral-500 font-bold text-2xl mt-4'>01</small>
                    </div>
                    <PiArrowBendUpRightThin className='size-20 invert dark:invert-0 rotate-20 opacity-20' />
                    <div className='flex flex-col items-center gap-1 text-center w-xs'>
                        <div className='p-4 bg-neutral-300/70 dark:bg-neutral-800/70 rounded-full'>
                            <LuTimer className='size-12 object-cover dark:invert-0 invert' />
                        </div>
                        <div className='mt-5 text-2xl font-bold text-black dark:text-white'>Enter a Structured Session</div>
                        <div className='text-neutral-700 dark:text-neutral-400'>Work in a minimal environment designed to eliminate distractions.</div>
                        <small className='text-neutral-700 dark:text-neutral-500 font-bold text-2xl mt-4'>02</small>
                    </div>
                    <PiArrowBendUpRightThin className='size-20 invert dark:invert-0 rotate-20 opacity-20' />
                    <div className='flex flex-col items-center gap-1 text-center w-xs'>
                        <div className='p-4 bg-neutral-300/70 dark:bg-neutral-800/70 rounded-full'>
                            <LuTrendingUp className='size-12 object-cover dark:invert-0 invert' />
                        </div>
                        <div className='mt-5 text-2xl font-bold text-black dark:text-white'>Review Your Progress</div>
                        <div className='text-neutral-700 dark:text-neutral-400'>Track completed sessions and build momentum over time.</div>
                        <small className='text-neutral-700 dark:text-neutral-500 font-bold text-2xl mt-4'>03</small>
                    </div>
                </div>
            </div>
            <div className="relative my-20 text-center dark:text-white py-40 flex flex-col items-center">
                <div className="absolute inset-0 bg-[url('./assets/welcome_bg.png')] bg-cover bg-center mask-[linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] grayscale -z-10 opacity-50"></div>
                <h1 className="text-7xl font-black my-3 tracking-tight">Reclaim Your Attention.</h1>
                <p className='text-medium'>FocusFlow helps you create space for deep, meaningful work.</p>
                <div className="flex gap-5 mt-6">
                    <button className="mt-5 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all duration-200 shadow-sm hover:shadow-md font-medium px-6 py-3 rounded-full text-sm">Start Free</button>
                </div>
            </div>
            {/* <div className="mt-25 mx-20 flex flex-col text-white">
                <div className='flex items-center gap-4 self-center'>
                    <VscTools className='size-45  opacity-10 absolute left-145' />
                    <h1 className="text-5xl font-black my-5 tracking-tight text-black dark:text-white">How FocusFlow Works</h1>
                </div>
                
            </div> */}
        </div>
    )
}