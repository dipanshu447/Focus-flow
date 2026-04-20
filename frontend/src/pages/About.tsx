export default function About() {
    return (
        <div className="relative z-2 flex flex-col w-full">
            <div className="relative my-20 dark:text-white py-40 flex flex-col items- px-20">
                <div className="absolute inset-0 bg-[url('./assets/about_bg.png')] bg-cover bg-center mask-[linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] grayscale -z-10 opacity-50"></div>
                {/* <h1 className="text-7xl font-black my-3 tracking-tight">Attention Is Finite.</h1> */}
                <h1 className="text-7xl font-black my-3 tracking-tight">About FocusFlow.</h1>
                {/* <h1 className="text-7xl font-black my-3 tracking-tight leading-20">About<br/> FocusFlow.</h1> */}
                <p>Designed for Depth.</p>
                {/* <div className="flex gap-5 mt-6">
                    <button className="mt-5 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all duration-200 shadow-sm hover:shadow-md font-medium px-6 py-3 rounded-full text-sm">Start Free</button>
                </div> */}
            </div>
            <div className="mx-20 mt-30 flex flex-col">
                <div className="text-black dark:text-white flex justify-between w-full">
                    <div className="w-md text-5xl font-bold">Built to Win Back <span className='font-medium font-[Indie_Flower] italic'>Your Attention.</span></div>
                    <p className='w-md self-end text-lg text-right'>Attention is under attack.<br />Clarity is rare.<br />FocusFlow exists to restore both.</p>
                </div>
            </div>
            <div className="mt-25 mx-20 flex flex-col text-white">
                <h1 className="text-8xl font-black my-5 tracking-tight leading-25 text-black dark:text-white text-center">We’re Not Lazy. We’re <br /><span className="text-black italic bg-white font-medium text-7xl skew-2 inline-block">Overstimulated.</span></h1>
                <p className='text-black dark:text-white mt-12 text-xl'>Modern apps are engineered for engagement.<br /> Not clarity.</p>
                <p className='text-black dark:text-white text-xl mt-10'>Notifications.<br/>Short-form content.<br/>Infinite scroll.</p>
                <div className='text-black dark:text-white text-xl mt-8 font-semibold'>Your brain absorbs micro dopamine spikes all day.</div>
                <div className='text-black dark:text-white text-xl mt-12 font-semibold'>The Result:</div>
                <ul className="text-black dark:text-white text-lg mt-4">
                    <li className="before:content-['↓'] before:absolute before:left-20 ml-6 mt-1 flex items-center">Reduced attention span</li>
                    <li className="before:content-['↓'] before:absolute before:left-20 ml-6 mt-1 flex items-center">Mental fatigue</li>
                    <li className="before:content-['↓'] before:absolute before:left-20 ml-6 mt-1 flex items-center">Shallow work</li>
                    <li className="before:content-['↓'] before:absolute before:left-20 ml-6 mt-1 flex items-center">Constant distraction</li>
                </ul>
                <p className='mt-8 text-neutral-700 dark:text-white font-bold text-2xl'>We designed against that.</p>
            </div>
            <div className="mt-25 mx-20 flex flex-col text-white">
                <h1 className="text-8xl font-black my-5 tracking-tight leading-26 text-black dark:text-white">Focus is a Skill. Not a Personality Trait.</h1>
                <p className='text-black dark:text-neutral-200 leading-7'>Focus improves when stimulation decreases.<br />Depth improves when noise is removed.</p>
            </div>
            <div className="mt-25 mx-20 flex flex-col text-white">
                <h1 className="text-8xl font-black my-5 tracking-tight leading-26 text-black dark:text-white text-right">The System Behind FocusFlow.</h1>
                <div className="flex flex-col my-10 gap-6">
                    <div className="flex flex-col py-4 px-6 bg-neutral-900/50 rounded-2xl justify-center">
                        <span className="absolute left-4 text-6xl font-extrabold text-neutral-700">01</span>
                        <div className="font-bold text-2xl">Reduce Input</div>
                        <div className="text-neutral-300 font-medium">Lower stimulation before demanding output.</div>
                    </div>
                    <div className="ml-30 flex flex-col py-4 px-6 bg-neutral-900/50 rounded-2xl justify-center text-right">
                        <span className="absolute right-4 text-6xl font-extrabold text-neutral-700">02</span>
                        <div className="font-bold text-2xl">Protect Depth</div>
                        <div className="text-neutral-300 font-medium">Design sessions that remove interruption loops.</div>
                    </div>
                    <div className="flex flex-col py-4 px-6 bg-neutral-900/50 rounded-2xl justify-center text-right">
                        <span className="absolute left-4 text-6xl font-extrabold text-neutral-700">03</span>
                        <div className="font-bold text-2xl">Reinforce Calm</div>
                        <div className="text-neutral-300 font-medium">Encourage clarity, not urgency.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}