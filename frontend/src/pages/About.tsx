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
        <div className="relative z-2 flex flex-col w-full mb-20">
            <div className="relative my-20 dark:text-white pt-20 flex flex-col px-20">
                <span className="uppercase text-neutral-500 tracking-wider text-sm">About FocusFlow</span>
                <h1 className="text-8xl font-black my-6 tracking-tight leading-25 text-black dark:text-white text-left">We’re Not Lazy.<br />We’re <br /><span className="text-black italic bg-white font-medium text-8xl inline-block">Overstimulated.</span></h1>
                <p className="mt-2 font-light">The problem isn't discipline. It's an environment engineered to break it.</p>
            </div>
            <div className="px-20 py-25 flex justify-between border-y border-y-neutral-800">
                <div className="text-black dark:text-white flex flex-col w-full">
                    <span className="uppercase text-neutral-500 tracking-wider text-sm">The problem</span>
                    <p className='text-black dark:text-neutral-200 font-light my-6'>Modern apps are designed for engagement.<br /> Not clarity.</p>
                    <p className='text-black dark:text-neutral-200 font-light leading-8'>Notifications.<br />Short-form content.<br />Infinite scroll.</p>
                    <div className='text-black dark:text-white mt-6 font-semibold'>Your brain absorbs micro dopamine spikes all day.</div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="text-black dark:text-white flex flex-col border-b border-b-neutral-800 w-full">
                        <div className='text-black dark:text-white font-semibold'>The result:</div>
                        <ul className="text-black dark:text-white mt-3 flex flex-col gap-1.5 mb-10">
                            {problems.map(p => (
                                <li key={p} className="mt-1 flex items-center gap-3 text-sm text-neutral-300">
                                    <FaArrowRight className="size-3 fill-neutral-600" />
                                    {p}</li>
                            ))}
                        </ul>
                    </div>
                    <p className='text-black dark:text-neutral-200 mt-12'>It's not a willpower problem.<br /> It's a systems problem.</p>
                </div>
            </div>
            <div className="py-25 px-20 flex flex-col text-white text-center items-center border-b border-b-neutral-800">
                <span className="uppercase text-neutral-500 tracking-wider text-sm text-center">Our Philosophy</span>
                <h2 className="w-4xl text-7xl font-black my-6 tracking-tight leading-22 text-black dark:text-white">FocusFlow is not another
                    productivity app.</h2>
                <p className='text-black dark:text-neutral-200 mt-4'>It's a deliberate removal of everything that doesn't serve your work.<br />A tool that respects your attention instead of competing for it.</p>
            </div>
            <div className="py-25 px-20 flex flex-col text-white border-b border-b-neutral-800">
                <span className="uppercase text-neutral-500 tracking-wider text-sm">Our Principles</span>
                <div className="my-10 grid grid-cols-2 gap-6">
                    {principles.map(p => (
                        <div key={p.num} className='relative bg-white/65 dark:bg-neutral-950 dark:hover:bg-neutral-900 hover:-translate-y-2 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-700 shadow-sm dark:shadow-none p-8 rounded-3xl ease transition-all duration-200 w-full'>
                            <div className="text-sm text-gray-500">{p.num}</div>
                            <div className='font-bold text-2xl text-black dark:text-white relative z-4 mt-4'>{p.title}</div>
                            <div className='font- text-sm text-neutral-800 dark:text-gray-300 relative z-4 mt-4'>{p.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-25 px-85 flex flex-col text-white border-b border-b-neutral-800">
                <span className="uppercase text-neutral-500 tracking-wider text-sm">A note from the team</span>
                <div className='text-neutral-800 dark:text-neutral-200 leading-7 relative z-4 mt-6'>We built FocusFlow because we were tired of tools that promised productivity but delivered distraction. We wanted something quiet. Something that got out of the way. Something that trusted us to know what needed doing.</div>
                <div className='text-neutral-800 dark:text-neutral-200 relative z-4 mt-4'>This is that tool.</div>
                <Link to='signup' className="flex gap-2 items-center bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all duration-200 shadow-sm hover:shadow-md font-medium px-5 py-3 rounded-full text-sm self-baseline mt-6">Start using FocusFlow <FaArrowRight className="size-3"/></Link>
            </div>
        </div>
    )
}