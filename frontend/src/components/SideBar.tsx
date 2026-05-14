import { LuTarget, LuSparkles, LuPanelRightOpen, LuPanelRightClose } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import logo from '../assets/logo.svg';

export default function SideBar() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const navItems = [
        { id: 'focus', icon: LuTarget, label: 'Focus' },
        { id: 'tasks', icon: FaCheckCircle, label: 'Tasks' },
        { id: 'analytics', icon: MdBarChart, label: 'Analytics' },
        { id: 'ai', icon: LuSparkles, label: 'Assistant' },
    ];
    const [activeTab, setActiveTab] = useState('focus');
    return (
        <aside
            className={`hidden md:flex flex-col border-r border-white/[0.06] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSidebarCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Header / Brand */}
            <div className="h-20 flex items-center px-6 border-b border-white/[0.04]">
                <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center shrink-0">
                    <img src={logo} alt="logo" />
                </div>
                <span className={`ml-3 font-semibold tracking-tight whitespace-nowrap transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                    FocusFlow
                </span>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 py-6 px-3 flex flex-col gap-1">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center h-10 px-3 rounded-md transition-all duration-200 group ${isActive
                                ? 'bg-white/[0.08] text-white'
                                : 'text-white/40 hover:text-white/90 hover:bg-white/[0.04]'
                                } ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}
                        >
                            <Icon size={18} className="shrink-0" />
                            <span className={`ml-3 text-sm font-medium tracking-wide whitespace-nowrap transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Section (Profile & Collapse) */}
            <div className="p-3 border-t border-white/[0.04] flex flex-col gap-1">
                <button className={`flex items-center h-10 px-3 rounded-md text-white/40 hover:text-white hover:bg-white/[0.04] transition-all duration-200 ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
                    <IoMdSettings size={18} className="shrink-0" />
                    <span className={`ml-3 text-sm font-medium tracking-wide whitespace-nowrap ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                        Settings
                    </span>
                </button>

                <div className={`flex items-center mt-2 px-3 py-2 rounded-md ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/60 shrink-0">
                            DS
                        </div>
                        <span className={`text-xs font-medium text-white/60 whitespace-nowrap ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                            Dipanshu S.
                        </span>
                    </div>
                    {!isSidebarCollapsed && (
                        <button
                            onClick={() => setIsSidebarCollapsed(true)}
                            className="text-white/30 hover:text-white transition-colors"
                        >
                            <LuPanelRightClose size={16} />
                        </button>
                    )}
                </div>
                {isSidebarCollapsed && (
                    <button
                        onClick={() => setIsSidebarCollapsed(false)}
                        className="mt-2 w-full flex justify-center text-white/30 hover:text-white transition-colors py-2"
                    >
                        <LuPanelRightOpen size={16} />
                    </button>
                )}
            </div>
        </aside>
    )
}