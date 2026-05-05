import Logo from '../assets/logo.svg';
import { Link } from 'react-router';

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
                        <Link to="/" className="capitalize text-neutral-300 hover:text-white transition-all duration-200 ease font-light tracking-wider text-sm cursor-pointer">Features</Link>
                        <Link to="/" className="capitalize text-neutral-300 hover:text-white transition-all duration-200 ease font-light tracking-wider text-sm cursor-pointer">Guide</Link>
                        <Link to="/" className="capitalize text-neutral-300 hover:text-white transition-all duration-200 ease font-light tracking-wider text-sm cursor-pointer">App</Link>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <span className="text-neutral-500 font-light tracking-wider text-sm uppercase">Company</span>
                        <Link to="/" className="capitalize text-neutral-300 hover:text-white transition-all duration-200 ease font-light tracking-wider text-sm cursor-pointer">About</Link>
                        <Link to="/" className="capitalize text-neutral-300 hover:text-white transition-all duration-200 ease font-light tracking-wider text-sm cursor-pointer">Contact</Link>
                    </div>
                </div>
            </div>
            <div className='flex justify-between mt-6'>
                <span className="text-neutral-500 font-light tracking-wider text-xs">© {new Date().getFullYear()} FocusFlow. All rights reserved.</span>
                <span className="text-neutral-500 font-light tracking-wider text-xs">Built for people who actually finish things.</span>
            </div>
        </div>
    )
}