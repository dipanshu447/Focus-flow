import Logo from '../assets/logo.svg';
import { Link } from 'react-router';
import scrollTosection from '../utils/scrollToSection';

export default function Footer() {
    return (
        <div className="pb-20 px-30 w-full">
            <div className="border-b border-b-neutral-800 pb-15 flex justify-between w-full">
                <div className='dark:text-white flex flex-col text-sm font-medium'>
                    <div className='dark:text-white flex items-center text-sm font-medium'>
                        <img src={Logo} alt="Logo" className='size-10 dark:invert' />
                        FocusFlow
                    </div>
                    <span className="capitalize text-neutral-500 tracking-wider text-sm">One task. One session. One outcome.</span>
                </div>
                <div className='flex gap-12 justify-end'>
                    <div className='flex flex-col gap-4'>
                        <span className="text-neutral-500 font-light tracking-wider text-sm uppercase">Product</span>
                        <button onClick={(e) => scrollTosection(e, "features")} className="capitalize text-neutral-300 hover:text-white transition-all duration-200 ease font-light tracking-wider text-sm cursor-pointer mr-3">Features</button>
                        <Link to="/guide" className="capitalize text-neutral-300 hover:text-white transition-all duration-200 ease font-light tracking-wider text-sm cursor-pointer">Guide</Link>
                        <Link to="/app" className="capitalize text-neutral-300 hover:text-white transition-all duration-200 ease font-light tracking-wider text-sm cursor-pointer">App</Link>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <span className="text-neutral-500 font-light tracking-wider text-sm uppercase">Company</span>
                        <Link to="/about" className="capitalize text-neutral-300 hover:text-white transition-all duration-200 ease font-light tracking-wider text-sm cursor-pointer">About</Link>
                        <Link to="/contact" className="capitalize text-neutral-300 hover:text-white transition-all duration-200 ease font-light tracking-wider text-sm cursor-pointer">Contact</Link>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <span className="text-neutral-500 font-light tracking-wider text-sm uppercase">Legal</span>
                        <Link to="/privacy" className="capitalize text-neutral-300 hover:text-white transition-all duration-200 ease font-light tracking-wider text-sm cursor-pointer">Privacy</Link>
                        <Link to="/terms" className="capitalize text-neutral-300 hover:text-white transition-all duration-200 ease font-light tracking-wider text-sm cursor-pointer">Terms</Link>
                    </div>
                </div>
            </div>
            <div className='flex justify-between mt-6'>
                <span className="text-neutral-500 font-light tracking-wider text-xs">© {new Date().getFullYear()} FocusFlow. Built by <a href="https://www.itsdipanshu.dev" target='_blank'>Dipanshu Sahu.</a></span>
                <span className="text-neutral-500 font-light tracking-wider text-xs">Built for people who actually finish things.</span>
            </div>
        </div>
    )
}