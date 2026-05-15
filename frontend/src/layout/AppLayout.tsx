import type { DarkModeObj } from "../types/DarkModeObj";
import useDarkMode from "../hooks/useDarkMode";
import Grainient from "../components/reactbits/Grainient";
import { Outlet } from "react-router";
import SideBar from "../components/SideBar";

export default function AppLayout() {
    const { darkMode, toggleDarkMode }: DarkModeObj = useDarkMode();
    return (
        <div className="relative font-[Inter] h-screen">
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
            <div className="flex items-start w-full">
                <SideBar />
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}