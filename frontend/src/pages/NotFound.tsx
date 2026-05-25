import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative py-35 px-6 z-1 transition-colors duration-500 overflow-hidden border-b border-black/10 dark:border-white/10 mb-20">
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-black text-[clamp(12rem,40vw,28rem)] leading-[0.85] tracking-[-0.06em] text-black/3 dark:text-white/3">
        404
      </span>
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-md">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-black/40 dark:text-white/40">
          404 - Page not found
        </p>
        <div className="flex flex-col gap-4">
          <h1 className="font-black leading-[1.1] tracking-tight text-5xl md:text-6xl lg:text-7xl text-black/90 dark:text-white/90">
            Lost in the noise?
          </h1>
          <p className="text-base md:text-lg font-light leading-relaxed text-black/60 dark:text-white/60">
            This page doesn't exist.
            <br className="hidden sm:block" />
            But your focus does.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 w-full sm:w-auto">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 text-sm md:text-base font-medium transition-all duration-300 rounded-full bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-xl hover:-translate-y-0.5">
            Go Home
          </Link>
          <Link
            to="/app"
            className="w-full sm:w-auto px-8 py-3.5 text-sm md:text-base font-medium transition-all duration-300 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:text-black/90 hover:border-black/30 dark:hover:text-white/90 dark:hover:border-white/30 hover:-translate-y-0.5">
            Open App
          </Link>
        </div>
        <p className="text-xs md:text-sm font-light italic mt-6 text-black/50 dark:text-white/40">
          Sometimes the most productive thing is to step back.
        </p>
      </div>
    </div>
  );
}