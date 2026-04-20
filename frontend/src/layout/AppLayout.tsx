import { Outlet } from "react-router";
import Navbar from "../components/Navbar.tsx";
import { useState, useEffect } from "react";
import Grainient from '../components/reactbits/Grainient.tsx';
import type { JSX } from "react";

export default function AppLayout(): JSX.Element {
  const [darkMode, setDarkMode] = useState<string | boolean>((): (string | boolean) => {
    return localStorage.getItem("theme") || document.documentElement.classList.contains("dark");
  });
  const toggleDarkMode = (): void => setDarkMode(prev => !prev);

  useEffect((): void => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode])

  return (
    <div className="relative flex justify-center font-[Inter] min-h-screen overflow-hidden">
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
      <Outlet />
    </div>
  )
}