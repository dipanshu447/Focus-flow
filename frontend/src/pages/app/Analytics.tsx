import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { FiLock } from 'react-icons/fi';
import { getUserConsistency, monthlyFocusTime, todayStudiedTime, totalStudiedHour, weeklyFocusTime } from '../../utils/analytics.ts';
import useFocus from '../../hooks/useFocus.ts';
import type { FocusContextType } from '../../types/Focus.ts';
import { formatTime } from '../../utils/time.ts';
import { FaLock } from "react-icons/fa";
import { getUser } from '../../api/user.ts';
import type { userDataObj } from '../../types/userTypes.ts';
import useDarkMode from '../../hooks/useDarkMode.ts';

type Timeframe = 'week' | 'month' | 'year' | 'all';

interface ChartPoint {
    label: string;
    value: number;
    displayValue: string;
}

export default function AnalyticsPage() {
    const [activeChartTab, setActiveChartTab] = useState<Timeframe>('week');
    const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);
    const [hoveredHeatmap, setHoveredHeatmap] = useState<{ date: string, duration: string } | null>(null);
    const { sessions }: FocusContextType = useFocus();
    const [userData, setUserData] = useState<userDataObj | null>(null);
    const { setTheme } = useDarkMode();

    const currentYear = new Date();
    const userjoinedAt = userData?.createdAt && new Date(userData.createdAt);
    const hasYearlyAnalytics = userjoinedAt ? (currentYear.getFullYear() > userjoinedAt.getFullYear()) : null;
    const hasAllTimeAnalytics = userjoinedAt && currentYear.getTime() - userjoinedAt.getTime() >= 365 * 24 * 60 * 60 * 1000;
    const showRnAnalytics = (activeChartTab === "year" && !hasYearlyAnalytics) || (activeChartTab === "all" && !hasAllTimeAnalytics);

    useEffect(() => {
        async function fetchUser() {
            const data = await getUser();
            setUserData(data.user);
            if (data.user.theme) setTheme(data.user.theme);
        }
        fetchUser()
    }, []);

    const overviewStats = [
        { label: "Overall Focus", value: totalStudiedHour(sessions) },
        { label: "Today's Focus", value: todayStudiedTime(sessions) },
        { label: "Weekly Focus", value: weeklyFocusTime(sessions) },
        { label: "Monthly Focus", value: monthlyFocusTime(sessions) },
        {
            label: "Consistency",
            value: `${getUserConsistency(sessions)}%`,
        },
    ];

    const recentSessions = sessions.slice(sessions.length - 3, sessions.length);

    const chartTabs = [
        { id: 'week', label: 'This Week', locked: false },
        { id: 'month', label: 'This Month', locked: false },
        { id: 'year', label: 'This Year', locked: !hasYearlyAnalytics },
        { id: 'all', label: 'All Time', locked: !hasAllTimeAnalytics }
    ] as const;

    const weeklyChartData = () => {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",];
        const weeklyTotals = [0, 0, 0, 0, 0, 0, 0];

        sessions.forEach((session) => {
            const day = new Date(session.completedAt).getDay();
            const index = day === 0 ? 6 : day - 1;
            weeklyTotals[index] += session.duration;
        });

        const maxSeconds = Math.max(...weeklyTotals);

        return days.map((day, index) => {
            const seconds = weeklyTotals[index];
            return {
                label: day,
                value: maxSeconds > 0 ? (seconds / maxSeconds) * 100 : 0,
                displayValue: formatTime(seconds),
            };
        });
    };

    const monthlyChartData = () => {
        const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5",];
        const monthlyTotals = [0, 0, 0, 0, 0];
        const now = new Date();

        sessions.forEach((session) => {
            const sesstionDate = new Date(session.completedAt);
            const sameMonth = sesstionDate.getMonth() === now.getMonth() && sesstionDate.getFullYear() === now.getFullYear();

            if (!sameMonth) return;

            const dayofMonth = sesstionDate.getDate();
            const weekIndex = Math.floor((dayofMonth - 1) / 7);
            monthlyTotals[weekIndex] += session.duration;
        });

        const maxSeconds = Math.max(...monthlyTotals);

        return weeks.map((week, index) => {
            const seconds = monthlyTotals[index];
            return {
                label: week,
                value: maxSeconds > 0 ? (seconds / maxSeconds) * 100 : 0,
                displayValue: formatTime(seconds),
            };
        });
    };

    const yearlyChartData = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const yearlyTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const now = new Date();

        sessions.forEach((session) => {
            const sesstionDate = new Date(session.completedAt);
            const sameYear = sesstionDate.getFullYear() === now.getFullYear();

            if (!sameYear) return;

            const monthIndex = sesstionDate.getMonth();
            yearlyTotals[monthIndex] += session.duration;
        });

        const maxSeconds = Math.max(...yearlyTotals);

        return months.map((month, index) => {
            const seconds = yearlyTotals[index];
            return {
                label: month,
                value: maxSeconds > 0 ? (seconds / maxSeconds) * 100 : 0,
                displayValue: formatTime(seconds),
            };
        });
    };

    const allTimeChartData = () => {
        const yearlyMap: Record<string, number> = {};

        sessions.forEach((session) => {
            const year = new Date(session.completedAt).getFullYear().toString();
            yearlyMap[year] = (yearlyMap[year] || 0) + session.duration;
        });

        const years = Object.keys(yearlyMap).sort();

        const maxSeconds = Math.max(...Object.values(yearlyMap));

        return years.map((year) => {
            const seconds = yearlyMap[year];
            return {
                label: year,
                value: maxSeconds > 0 ? (seconds / maxSeconds) * 100 : 0,
                displayValue: formatTime(seconds),
            };
        });
    };

    const chartData: Record<Timeframe, ChartPoint[]> = {
        week: weeklyChartData(),
        month: monthlyChartData(),
        year: yearlyChartData(),
        all: allTimeChartData()
    };

    const activeData = chartData[activeChartTab];

    const generatePath = (data: ChartPoint[]) => {

        if (data.length === 0) return '';

        // HANDLE SINGLE POINT
        if (data.length === 1) {

            const y =
                300 - (data[0].value / 100) * 250;

            return `M 500,${y}`;
        }

        const points = data.map((d, i) => {

            const x =
                (i / (data.length - 1)) * 1000;

            const y =
                300 - (d.value / 100) * 250;

            return { x, y };
        });

        let path =
            `M ${points[0].x},${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {

            const curr = points[i];
            const next = points[i + 1];

            const cp1x =
                curr.x + (next.x - curr.x) / 2;

            const cp1y = curr.y;

            const cp2x =
                curr.x + (next.x - curr.x) / 2;

            const cp2y = next.y;

            path +=
                ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
        }

        return path;
    };

    const activePath = generatePath(activeData);
    const heatmapWeeks = useMemo(() => {
        const sesstionByDate: Record<string, number> = {};

        sessions.forEach(session => {
            const dateKey = session.completedAt.slice(0, 10);
            sesstionByDate[dateKey] = (sesstionByDate[dateKey] || 0) + session.duration;
        });

        return Array.from({ length: 12 }).map((_, weekIdx) => {
            return Array.from({ length: 7 }).map((_, dayIdx) => {
                const dateObj = new Date();
                dateObj.setDate(dateObj.getDate() - ((11 - weekIdx) * 7 + (6 - dayIdx)));
                const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                const dateKey = dateObj.toISOString().slice(0, 10);
                const totalSeconds = sesstionByDate[dateKey] || 0;
                let intensity = 0;

                if (totalSeconds > 0 && totalSeconds < 3600) {
                    intensity = 1;
                }
                else if (totalSeconds >= 3600 && totalSeconds < 7200) {
                    intensity = 2;
                }
                else if (totalSeconds >= 7200) {
                    intensity = 3;
                }

                const duration = formatTime(totalSeconds) || "No focus sessions";
                return { intensity, dateStr, duration };
            });
        });
    }, []);

    // --- Animation Config ---
    const pageVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="h-screen w-full text-[#e5e5e5] font-sans selection:bg-white/20 flex flex-col overflow-hidden relative">
            <div className="flex-1 overflow-y-auto custom-scrollbar w-full px-8 py-16 md:px-16 lg:px-24 xl:px-32 relative">
                <motion.div
                    variants={pageVariants} initial="hidden" animate="visible"
                    className="max-w-6xl mx-auto flex flex-col gap-20 pb-20 relative">
                    <motion.header variants={itemVariants} className="flex flex-col gap-3">
                        <h1 className="text-4xl md:text-5xl font-light tracking-wide text-white/90">Reflection</h1>
                        <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/30 font-medium">
                            Consistency builds reality.
                        </p>
                    </motion.header>
                    {/* ================= OVERVIEW METRICS ================= */}
                    <motion.section variants={itemVariants} className="flex flex-col gap-8">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                            {overviewStats.map((stat, i) => (
                                <div key={i} className="flex flex-col gap-2 cursor-default">
                                    <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">{stat.label}</span>
                                    <div className="flex flex-col">
                                        <span className="text-2xl md:text-3xl font-light tracking-tight text-white/80">{stat.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                    {/* ================= MAIN ANALYTICS GRAPH ================= */}
                    <motion.section variants={itemVariants} className="flex flex-col gap-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <h3 className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium">Focus Rhythm</h3>
                            {/* Tab Filters */}
                            <div className="flex items-center gap-2">
                                {chartTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveChartTab(tab.id)}
                                        className={`relative px-4 py-2 rounded-full text-[9px] uppercase tracking-widest font-medium transition-colors flex items-center gap-2
                                ${activeChartTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
                                        {activeChartTab === tab.id && (
                                            <motion.div layoutId="chartTab" className="absolute inset-0 bg-neutral-900 border border-neutral-900 rounded-full z-[-1]" />
                                        )}
                                        {tab.locked && <FiLock size={10} className="opacity-50" />}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Immersive Wave Chart Area */}
                        <div className="relative w-full h-80 rounded-4xl bg-linear-to-b from-[#0a0a0a] to-transparent border border-neutral-900 flex flex-col group cursor-crosshair">
                            {showRnAnalytics && <div className='absolute inset-0 backdrop-blur-xs z-10 rounded-4xl flex flex-col items-center justify-center gap-2 text-neutral-500'>
                                <FaLock className='size-6' />
                                {activeChartTab === "year" ? "Yearly insights become available next calendar year." : activeChartTab === "all" && "All-time analytics unlock after one year of focus history."}
                            </div>}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeChartTab}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                                    className="relative flex-1 w-full">
                                    {/* Grid Lines */}
                                    <div className="absolute inset-0 flex flex-col justify-between py-10 px-8 pointer-events-none opacity-[0.15]">
                                        {[1, 2, 3].map(i => <div key={i} className="w-full h-px bg-white/5" />)}
                                    </div>
                                    {/* Smooth Wave SVG */}
                                    <div className="w-full h-full relative z-0">
                                        <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-[85%] absolute bottom-8">
                                            <defs>
                                                <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
                                                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.0)" />
                                                </linearGradient>
                                            </defs>
                                            {/* Gradient Fill */}
                                            <path
                                                d={activePath ? `${activePath} L 1000,300 L 0,300 Z` : ''}
                                                fill="url(#waveGradient)"
                                                className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                            {/* Crisp Line */}
                                            <path
                                                d={activePath || ''}
                                                fill="none"
                                                stroke="rgba(255, 255, 255, 0.4)"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                                className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-60 group-hover:opacity-100" />
                                        </svg>
                                        {/* Interactive Hover Zones overlaying the SVG */}
                                        <div className="absolute inset-x-8 bottom-8 top-0 flex z-10">
                                            {activeData.map((d, i) => (
                                                <div
                                                    key={i}
                                                    className="flex-1 h-full relative"
                                                    onMouseEnter={() => setHoveredPoint(d)}
                                                    onMouseLeave={() => setHoveredPoint(null)}>
                                                    {/* Data point visual marker (visible on hover) */}
                                                    <div className={`absolute bottom-0 w-px h-full bg-white/10 left-1/2 -translate-x-1/2 transition-opacity duration-300 pointer-events-none ${hoveredPoint?.label === d.label ? 'opacity-100' : 'opacity-0'}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Dynamic X-Axis Labels */}
                                    <div className="absolute bottom-0 inset-x-8 h-8 flex justify-between items-center pointer-events-none">
                                        {activeData.map((d, i) => (
                                            <span key={i} className={`flex-1 text-center text-[9px] uppercase tracking-widest transition-colors duration-300 ${hoveredPoint?.label === d.label ? 'text-white/80' : 'text-white/30'}`}>
                                                {d.label}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                            {/* Floating Global Tooltip */}
                            <AnimatePresence>
                                {hoveredPoint && (
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl pointer-events-none z-20 flex items-center gap-3 backdrop-blur-md">
                                        <span className="text-[10px] text-white/40 uppercase tracking-widest">{hoveredPoint.label}</span>
                                        <span className="text-white/20">—</span>
                                        <span className="text-xs font-light text-white/90">{hoveredPoint.displayValue}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.section>
                    {/* ================= LOWER SECTIONS ================= */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
                        {/* Left: Behavioral Insights & Recent Sessions */}
                        <div className="lg:col-span-7 flex flex-col gap-16">
                            <motion.section variants={itemVariants} className="flex flex-col gap-6">
                                <h3 className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium">Recent Sessions</h3>
                                <div className="flex flex-col gap-2">
                                    {
                                        recentSessions.length > 1 ? (
                                            recentSessions.map((session) => (
                                                <div key={session.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-neutral-950 transition-colors cursor-default border border-transparent">
                                                    <span className="text-sm font-light text-white/70">{session?.taskTitle ? session.taskTitle : "No Task Sesstion"}</span>
                                                    <span className="text-xs font-mono text-white/40">{formatTime(session.duration)}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className='pt-15 text-xs text-center text-neutral-500'>
                                                Start a focus session to begin building your reflection history.
                                            </div>
                                        )
                                    }
                                </div>
                            </motion.section>
                        </div>
                        {/* Right: Heatmap Fingerprint */}
                        <div className="lg:col-span-5 flex flex-col gap-16">
                            <motion.section variants={itemVariants} className="flex flex-col gap-6 relative">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium">Consistency Fingerprint</h3>
                                    <p className="text-xs font-light text-white/30">Last 12 weeks.</p>
                                </div>
                                <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-neutral-900 flex flex-col items-center relative">
                                    {/* Heatmap Tooltip overlay */}
                                    <AnimatePresence>
                                        {hoveredHeatmap && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                                                className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl pointer-events-none z-30 flex items-center gap-3 backdrop-blur-md w-max">
                                                <span className="text-[10px] text-white/40 uppercase tracking-widest">{hoveredHeatmap.date}</span>
                                                <span className="text-white/20">—</span>
                                                <span className="text-xs font-light text-white/90">{hoveredHeatmap.duration}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div className="flex gap-0.75 overflow-x-auto hide-scrollbar w-full justify-center">
                                        {/* 7 Rows (Days) x 12 Cols (Weeks) Grid */}
                                        <div className="grid grid-rows-7 grid-flow-col gap-0.75">
                                            {heatmapWeeks.map((week, wIdx) => (
                                                week.map((day, dIdx) => (
                                                    <div
                                                        key={`${wIdx}-${dIdx}`}
                                                        onMouseEnter={() => setHoveredHeatmap({ date: day.dateStr, duration: day.duration })}
                                                        onMouseLeave={() => setHoveredHeatmap(null)}
                                                        className={`w-3.5 h-3.5 rounded-xs transition-colors duration-300 cursor-crosshair
                                                        ${day.intensity === 0 ? 'bg-neutral-900 hover:bg-neutral-800' : ''}
                                                        ${day.intensity === 1 ? 'bg-neutral-800 hover:bg-neutral-700' : ''}
                                                        ${day.intensity === 2 ? 'bg-neutral-600 hover:bg-neutral-500' : ''}
                                                        ${day.intensity === 3 ? 'bg-neutral-400 hover:neutral-300' : ''}
                                                        `}
                                                    />
                                                ))
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mt-8 text-[9px] uppercase tracking-[0.2em] text-white/20 w-full justify-between px-2">
                                        <span>Less</span>
                                        <div className="flex items-center gap-1.5 opacity-50">
                                            <div className="w-2.5 h-2.5 rounded-xs bg-neutral-900" />
                                            <div className="w-2.5 h-2.5 rounded-xs bg-neutral-800" />
                                            <div className="w-2.5 h-2.5 rounded-xs bg-neutral-600" />
                                            <div className="w-2.5 h-2.5 rounded-xs bg-neutral-400" />
                                        </div>
                                        <span>More</span>
                                    </div>
                                </div>
                            </motion.section>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}