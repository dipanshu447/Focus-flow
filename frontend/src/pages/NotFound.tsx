import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center justify-center relative py-40 z-1">
      {/* <GrainOverlay /> */}

      {/* Background 404 */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-black text-[clamp(12rem,40vw,28rem)] leading-[0.85] tracking-[-0.06em] text-black/3 dark:text-white/3">
        404
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-5 max-w-md">
        
        {/* Small label */}
        <p className="text-xs uppercase tracking-[0.2em] text-black/25 dark:text-white/25">
          404 - Page not found
        </p>

        {/* Main headline */}
        <div>
          <h1 className="font-black leading-[0.92] tracking-[-0.035em] text-[clamp(2.5rem,8vw,5rem)] text-black/85 dark:text-white/90">
            Lost in the noise?
          </h1>
          <p className="mt-4 text-base leading-normal text-black/40 dark:text-white/40">
            This page doesn't exist.
            <br />
            But your focus does.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-2">
          <Link
            to="/"
            className="px-7 py-3 text-sm transition-all duration-200 rounded-full bg-black/85 text-white hover:bg-black/70 dark:bg-white/90 dark:text-[#0a0a0a] dark:hover:bg-white/75"
          >
            Go Home
          </Link>
          <Link
            to="/app"
            className="px-7 py-3 text-sm transition-all duration-200 rounded-full border bg-neutral-900 border-black/10 text-black/55 hover:border-black/25 hover:text-black/85 dark:border-white/10 dark:text-white/60 dark:hover:border-white/25 dark:hover:text-white/90"
          >
            Open App
          </Link>
        </div>

        {/* Footer text */}
        <p className="text-xs mt-4 text-neutral-300 dark:text-neutral-600">
          Sometimes the most productive thing is to step back.
        </p>

      </div>
    </div>
  );
}