import useDarkMode from "../hooks/useDarkMode"
import type { DarkModeObj } from "../types/DarkModeObj"
import Grainient from "../components/reactbits/Grainient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import { MdLoop } from "react-icons/md";

export default function Error() {
    const { darkMode, toggleDarkMode }: DarkModeObj = useDarkMode();
    return (
        <div className="relative flex flex-col justify-center items-center font-[Inter] min-h-screen overflow-hidden">
            <div className='fixed inset-0 -z-10'>
                {!darkMode ? <Grainient
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
                /> : <Grainient
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
                />}
            </div>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div className="relative z-2 py-45 flex flex-col bg-top bg-no-repeat text-neutral-950 dark:text-white w-full">
                <div className="flex flex-col items-center justify-center">
                    <ImCross className="size-30 dark:fill-neutral-800" />
                    <h1 className="text-3xl font-black mt-8 mb-2">Something went wrong.</h1>
                    <span className="text-lg text-gray-400">An unexpected error occurred. It's not you, it's us.</span>
                    <div className="flex gap-4 items-center">
                        <Link to='signup' className="flex gap-2 items-center bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all duration-200 shadow-sm hover:shadow-md font-medium px-5 py-3 rounded-full text-sm self-baseline mt-6">Try Again <MdLoop className="size-4"/> </Link>
                        <Link to='/' className="flex gap-2 items-center bg-black dark:text-white hover:bg-neutral-800 dark:bg-neutral-950 border border-neutral-800 text-black dark:hover:bg-neutral-900 transition-all duration-200 shadow-sm hover:shadow-md font-medium px-5 py-3 rounded-full text-sm self-baseline mt-6">Go Home</Link>
                    </div>
                    <small className="text-xs mt-5 text-neutral-500">If this keeps happening, <Link to="/contact" className="underline">let us know.</Link></small>
                </div>
            </div>
            <Footer />
        </div>
    )
}