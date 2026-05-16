import { LuTarget, LuSparkles, LuPanelRightOpen, LuPanelRightClose, LuArrowUpRight } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import logo from '../assets/logo.svg';
import { Link, NavLink } from "react-router";

export default function SideBar() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const navItems = [
        { route: 'focus', icon: LuTarget, label: 'Focus' },
        { route: 'tasks', icon: FaCheckCircle, label: 'Tasks' },
        { route: 'analytics', icon: MdBarChart, label: 'Analytics' },
    ];

    return (
        <div className="text-[#e5e5e5] flex sticky top-0 h-screen">
            <aside className={`hidden md:flex flex-col border-r border-white/5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSidebarCollapsed ? 'w-18' : 'w-60'}`}>
                <Link to="." className="h-20 flex items-center px-6 border-b border-white/3">
                    <div className="size-7 rounded-lg bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                        <img src={logo} alt="logo" />
                    </div>
                    <span className={`ml-3 font-semibold tracking-tight whitespace-nowrap transition-opacity duration-200 dark:text-white text-black ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                        FocusFlow
                    </span>
                </Link>
                <nav className="flex-1 py-6 px-3 flex flex-col gap-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.route}
                                to={item.route}
                                className={({ isActive }) => (
                                    `relative flex items-center h-9.5 px-3 rounded-xl transition-all duration-300 group ${isActive
                                        ? 'bg-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]'
                                        : 'text-white/40 hover:text-white/90 hover:bg-white/2'
                                    } ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`
                                )}>
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4 bg-white/80 rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                                        )}
                                        <Icon size={18} className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-105' : ''}`} />
                                        <span className={`ml-3 text-sm font-medium tracking-wide whitespace-nowrap transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'
                                            }`}>
                                            {item.label}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
                <div className="p-3 border-t border-white/3 flex flex-col gap-1">
                    <Link to='settings' className={`flex items-center h-9.5 px-3 rounded-xl text-white/40 hover:text-white/90 hover:bg-white/2 transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
                        <IoMdSettings size={18} className="shrink-0" />
                        <span className={`ml-3 text-sm font-medium tracking-wide whitespace-nowrap ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                            Settings
                        </span>
                    </Link>
                    <Link to="/" className={`flex items-center h-[38px] px-3 rounded-xl text-white/25 hover:text-white/70 hover:bg-white/[0.015] transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
                        <LuArrowUpRight size={18} className="shrink-0" />
                        <span className={`ml-3 text-xs font-medium tracking-wide whitespace-nowrap ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                            Back to Site
                        </span>
                    </Link>
                    <div className={`flex items-center mt-3 px-3 py-2.5 rounded-xl border border-transparent hover:border-white/4 bg-white/1 hover:bg-white/2 transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                        <Link to="profile" className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-linear-to-tr from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white/80 shrink-0">
                                DS
                            </div>
                            <span className={`text-xs font-medium text-white/60 whitespace-nowrap ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                                Dipanshu Sahu
                            </span>
                        </Link>
                        {!isSidebarCollapsed && (
                            <button onClick={() => setIsSidebarCollapsed(true)} className="text-white/20 hover:text-white/80 transition-colors p-1">
                                <LuPanelRightClose size={14} />
                            </button>
                        )}
                    </div>
                    {isSidebarCollapsed && (
                        <button onClick={() => setIsSidebarCollapsed(false)} className="mt-1 w-full flex justify-center text-white/20 hover:text-white/80 transition-colors py-2">
                            <LuPanelRightOpen size={14} />
                        </button>
                    )}
                </div>
            </aside>
            <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 border-t border-white/5 bg-[#050505]/80 backdrop-blur-xl flex items-center justify-around px-6 z-50">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            to={item.route}
                            key={item.route}
                            className={({ isActive }) => (
                                `flex flex-col items-center gap-1.5 transition-colors p-2 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'text-white/30'
                                }`
                            )}>
                            <Icon size={22} className='opacity-80' />
                            <span className="text-[10px] font-medium tracking-wider uppercase opacity-80">
                                {item.label}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
}