import Logo from '../assets/logo.svg';
import { Link } from 'react-router';
import scrollTosection from '../utils/scrollToSection';

export default function Footer() {
    return (
        <footer className="w-full transition-colors duration-500 border-t border-black/2 dark:border-white/2">
            <div className="px-8 md:px-16 lg:px-24 pb-12">
                <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-8 border-b border-black/8 dark:border-white/8 pb-14">
                    <div className="flex flex-col gap-1 shrink-0">
                        <div className="flex items-center gap-1 text-black/90 dark:text-white/90 font-bold text-lg tracking-wide">
                            <img 
                                src={Logo} 
                                alt="FocusFlow Logo" 
                                className="size-10 dark:invert transition-transform hover:scale-105 duration-500" />
                            FocusFlow
                        </div>
                        <span className="text-black/90 dark:text-white/40 tracking-wider text-sm font-light leading-relaxed ml-2">
                            One task. One session. One outcome.
                        </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16 lg:gap-24">
                        <div className="flex flex-col gap-5">
                            <span className="text-black/80 dark:text-white/30 font-medium tracking-[0.2em] text-[10px] uppercase">
                                Product
                            </span>
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={(e) => scrollTosection(e, "features")} 
                                    className="text-left capitalize text-black/70 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-light tracking-wide text-sm cursor-pointer">
                                    Features
                                </button>
                                <Link 
                                    to="/guide" 
                                    className="capitalize text-black/70 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-light tracking-wide text-sm cursor-pointer">
                                    Guide
                                </Link>
                                <Link 
                                    to="/app" 
                                    className="capitalize text-black/70 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-light tracking-wide text-sm cursor-pointer">
                                    App
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <span className="text-black/80 dark:text-white/30 font-medium tracking-[0.2em] text-[10px] uppercase">
                                Company
                            </span>
                            <div className="flex flex-col gap-3">
                                <Link 
                                    to="/about" 
                                    className="capitalize text-black/70 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-light tracking-wide text-sm cursor-pointer">
                                    About
                                </Link>
                                <Link 
                                    to="/contact" 
                                    className="capitalize text-black/70 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-light tracking-wide text-sm cursor-pointer">
                                    Contact
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <span className="text-black/80 dark:text-white/30 font-medium tracking-[0.2em] text-[10px] uppercase">
                                Legal
                            </span>
                            <div className="flex flex-col gap-3">
                                <Link 
                                    to="/privacy" 
                                    className="capitalize text-black/70 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-light tracking-wide text-sm cursor-pointer">
                                    Privacy
                                </Link>
                                <Link 
                                    to="/terms" 
                                    className="capitalize text-black/70 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-light tracking-wide text-sm cursor-pointer">
                                    Terms
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 mt-6 text-center sm:text-left">
                    <span className="text-black/60 dark:text-white/30 font-light tracking-wider text-xs">
                        © {new Date().getFullYear()} FocusFlow. Built by <a href="https://www.itsdipanshu.dev" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors hover:border-black/30 dark:hover:border-white/30 pb-0.5">Dipanshu Sahu</a>.
                    </span>
                    <span className="text-black/60 dark:text-white/30 font-light tracking-wider text-xs">
                        Built for people who actually finish things.
                    </span>
                </div>
            </div>
        </footer>
    );
}