import useDarkMode from "../hooks/useDarkMode"
import type { DarkModeObj } from "../types/DarkModeObj"
import Grainient from "../components/reactbits/Grainient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { Link } from "react-router";
import { MdLoop } from "react-icons/md";

export default function Error() {
    const { darkMode, toggleDarkMode }: DarkModeObj = useDarkMode();
    
    return (
        <div className="relative flex flex-col font-sans min-h-screen overflow-hidden transition-colors duration-500">
            <div className='fixed inset-0 -z-10 pointer-events-none'>
                {!darkMode ? (
                    <Grainient
                        color1="#ffffff"
                        color2="#f5f5f5"
                        color3="#eaeaea"
                        timeSpeed={0.12}
                        colorBalance={-0.35}
                        warpStrength={0.25}
                        warpFrequency={2}
                        warpSpeed={0.4}
                        warpAmplitude={18}
                        blendAngle={0}
                        blendSoftness={0.5}
                        rotationAmount={120}
                        noiseScale={2}
                        grainAmount={0.15}
                        grainScale={2}
                        grainAnimated={false}
                        contrast={1.02}
                        gamma={1}
                        saturation={0}
                        centerX={0}
                        centerY={0.1}
                        zoom={1.1}
                    /> 
                ) : (
                    <Grainient
                        color1="#000000"
                        color2="#111111"
                        color3="#1a1a1a"
                        timeSpeed={0.12}
                        colorBalance={0.2}
                        warpStrength={0.25}
                        warpFrequency={2}
                        warpSpeed={0.4}
                        warpAmplitude={18}
                        blendAngle={0}
                        blendSoftness={0.5}
                        rotationAmount={120}
                        noiseScale={2}
                        grainAmount={0.18}
                        grainScale={2}
                        grainAnimated={false}
                        contrast={1.15}
                        gamma={0.98}
                        saturation={0}
                        centerX={0}
                        centerY={0.1}
                        zoom={1.1}
                    />
                )}
            </div>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 py-32 md:py-45 w-full">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="p-6 rounded-full bg-black/5 dark:bg-white/5 mb-8 flex items-center justify-center">
                        <ImCross className="size-10 text-black/20 dark:text-white/20" />
                    </div>
                    <h1 className="text-4xl font-black mb-4 tracking-tight leading-[1.1] text-black/90 dark:text-white/90">
                        Something went wrong.
                    </h1>
                    <p className="text-base font-light text-black/80 dark:text-white/60 mb-6 leading-relaxed">
                        An unexpected error occurred. It's not you, it's us.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
                        <Link 
                            to='.' 
                            className="flex gap-2 items-center justify-center w-full sm:w-auto bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl font-medium px-5 py-2.5 rounded-full text-sm hover:-translate-y-0.5 group">
                            <span>Try Again</span> 
                            <MdLoop className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" /> 
                        </Link>
                        <Link 
                            to='/' 
                            className="flex gap-2 items-center justify-center w-full sm:w-auto bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:text-black/90 hover:border-black/30 dark:hover:text-white/90 dark:hover:border-white/30 transition-all duration-300 font-medium px-5 py-2.5 rounded-full text-sm hover:-translate-y-0.5">
                            Go Home
                        </Link>
                    </div>
                    <p className="text-xs md:text-sm mt-8 text-black/80 dark:text-white/40 font-light">
                        If this keeps happening, <Link to="/contact" className="underline hover:text-black/70 dark:hover:text-white/70 transition-colors">let us know.</Link>
                    </p>
                </div>
            </main>
            <div className="relative z-10 w-full mt-auto">
                <Footer />
            </div>
        </div>
    )
}