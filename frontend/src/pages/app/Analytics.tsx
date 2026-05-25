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

    const currentYear = new Date();
    const userjoinedAt = userData?.createdAt && new Date(userData.createdAt);
    const hasYearlyAnalytics = userjoinedAt ? (currentYear.getFullYear() > userjoinedAt.getFullYear()) : null;
    const hasAllTimeAnalytics = userjoinedAt && currentYear.getTime() - userjoinedAt.getTime() >= 365 * 24 * 60 * 60 * 1000;
    const showRnAnalytics = (activeChartTab === "year" && !hasYearlyAnalytics) || (activeChartTab === "all" && !hasAllTimeAnalytics);

    useEffect(() => {
        async function fetchUser() {
            const data = await getUser();
            setUserData(data.user);
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
        <div className="h-screen w-full text-[#111] dark:text-[#e5e5e5] font-sans selection:bg-black/10 dark:selection:bg-white/20 flex flex-col overflow-hidden relative transition-colors duration-500">
            <div className="flex-1 overflow-y-auto custom-scrollbar w-full px-6 md:px-12 lg:px-24 pt-12 md:pt-16 pb-24 relative">
                <motion.div
                    variants={pageVariants} 
                    initial="hidden" 
                    animate="visible"
                    className="max-w-5xl mx-auto flex flex-col gap-16 md:gap-20 relative">
                    <motion.header variants={itemVariants} className="flex flex-col gap-3">
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black/90 dark:text-white/90">Reflection</h1>
                        <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-black/40 dark:text-white/40 font-bold">
                            Consistency builds reality.
                        </p>
                    </motion.header>
                    <motion.section variants={itemVariants} className="flex flex-col gap-8">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
                            {overviewStats.map((stat, i) => (
                                <div key={i} className="flex flex-col gap-2 cursor-default">
                                    <span className="text-[9px] tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-bold">{stat.label}</span>
                                    <div className="flex flex-col">
                                        <span className="text-2xl md:text-3xl font-light tracking-tight text-black/90 dark:text-white/90">{stat.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                    <motion.section variants={itemVariants} className="flex flex-col gap-6 md:gap-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <h3 className="text-[10px] tracking-[0.3em] text-black/40 dark:text-white/40 uppercase font-bold">Focus Rhythm</h3>
                            <div className="flex flex-wrap items-center gap-2">
                                {chartTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveChartTab(tab.id)}
                                        className={`relative px-4 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold transition-colors flex items-center gap-2
                                        ${activeChartTab === tab.id ? 'text-black dark:text-white' : 'text-black/40 hover:text-black/70 dark:text-white/40 dark:hover:text-white/70'}`}>
                                        {activeChartTab === tab.id && (
                                            <motion.div layoutId="chartTab" className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900 rounded-full z-[-1]" />
                                        )}
                                        {tab.locked && <FiLock size={10} className="opacity-50" />}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="relative w-full h-64 md:h-80 rounded-2xl md:rounded-4xl bg-linear-to-b from-neutral-100 to-white dark:from-neutral-950 dark:to-neutral-950 border border-black/5 dark:border-white/5 flex flex-col group cursor-crosshair overflow-hidden transition-colors duration-500">
                            {showRnAnalytics && (
                                <div className='absolute inset-0 backdrop-blur-sm bg-white/50 dark:bg-[#050505]/50 z-20 flex flex-col items-center justify-center gap-3 text-black/60 dark:text-white/60 p-6 text-center'>
                                    <FaLock className='w-5 h-5 md:w-6 md:h-6' />
                                    <p className="text-xs md:text-sm max-w-xs font-medium">
                                        {activeChartTab === "year" ? "Yearly insights become available next calendar year." : activeChartTab === "all" && "All-time analytics unlock after one year of focus history."}
                                    </p>
                                </div>
                            )}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeChartTab}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                                    className="relative flex-1 w-full">
                                    <div className="absolute inset-0 flex flex-col justify-between py-10 px-4 md:px-8 pointer-events-none opacity-[0.15] dark:opacity-[0.1]">
                                        {[1, 2, 3].map(i => <div key={i} className="w-full h-px bg-black dark:bg-white" />)}
                                    </div>
                                    <div className="w-full h-full relative z-0">
                                        <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-[85%] absolute bottom-8 text-black dark:text-white transition-colors duration-500">
                                            <defs>
                                                <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d={activePath ? `${activePath} L 1000,300 L 0,300 Z` : ''}
                                                fill="url(#waveGradient)"
                                                className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                            <path
                                                d={activePath || ''}
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                                className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-30 dark:opacity-40 group-hover:opacity-60 dark:group-hover:opacity-80" />
                                        </svg>
                                        <div className="absolute inset-x-4 md:inset-x-8 bottom-8 top-0 flex z-10">
                                            {activeData.map((d, i) => (
                                                <div
                                                    key={i}
                                                    className="flex-1 h-full relative"
                                                    onMouseEnter={() => setHoveredPoint(d)}
                                                    onMouseLeave={() => setHoveredPoint(null)}>
                                                    <div className={`absolute bottom-0 w-px h-full bg-black/10 dark:bg-white/10 left-1/2 -translate-x-1/2 transition-opacity duration-300 pointer-events-none ${hoveredPoint?.label === d.label ? 'opacity-100' : 'opacity-0'}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 inset-x-4 md:inset-x-8 h-8 flex justify-between items-center pointer-events-none">
                                        {activeData.map((d, i) => (
                                            <span key={i} className={`flex-1 text-center text-[8px] md:text-[9px] uppercase tracking-widest transition-colors duration-300 ${hoveredPoint?.label === d.label ? 'text-black/80 dark:text-white/80 font-bold' : 'text-black/50 dark:text-white/30'}`}>
                                                {d.label}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                            <AnimatePresence>
                                {hoveredPoint && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 5 }} 
                                        animate={{ opacity: 1, y: 0 }} 
                                        exit={{ opacity: 0 }} 
                                        transition={{ duration: 0.2 }} 
                                        className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-xl shadow-xl dark:shadow-2xl pointer-events-none z-30 flex items-center gap-3 backdrop-blur-md">
                                        <span className="text-[10px] text-black/50 dark:text-white/40 uppercase tracking-widest font-bold">{hoveredPoint.label}</span>
                                        <span className="text-black/20 dark:text-white/20">—</span>
                                        <span className="text-xs font-medium text-black/90 dark:text-white/90">{hoveredPoint.displayValue}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.section>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        <div className="lg:col-span-7 flex flex-col gap-12">
                            <motion.section variants={itemVariants} className="flex flex-col gap-6">
                                <h3 className="text-[10px] tracking-[0.3em] text-black/50 dark:text-white/40 uppercase font-bold">Recent Sessions</h3>
                                <div className="flex flex-col gap-2">
                                    {recentSessions.length > 0 ? (
                                        recentSessions.map((session) => (
                                            <div key={session.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-950 transition-colors cursor-default border border-transparent">
                                                <span className="text-sm font-light text-black dark:text-white/90 truncate mr-4">
                                                    {session?.taskTitle ? session.taskTitle : "Independent Session"}
                                                </span>
                                                <span className="text-xs font-medium text-black/40 dark:text-white/40 shrink-0">
                                                    {formatTime(session.duration)}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='pt-8 pb-4 text-xs text-center text-black/40 dark:text-white/40 font-light'>
                                            Start a focus session to begin building your reflection history.
                                        </div>
                                    )}
                                </div>
                            </motion.section>
                        </div>
                        <div className="lg:col-span-5 flex flex-col gap-12">
                            <motion.section variants={itemVariants} className="flex flex-col gap-6 relative">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-[10px] tracking-[0.3em] text-black/50 dark:text-white/40 uppercase font-bold">Consistency Fingerprint</h3>
                                    <p className="text-xs font-light text-black/50 dark:text-white/40">Last 12 weeks.</p>
                                </div>
                                <div className="p-6 md:p-8 rounded-4xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/5 flex flex-col items-center relative transition-colors duration-500">
                                    <AnimatePresence>
                                        {hoveredHeatmap && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }} 
                                                animate={{ opacity: 1, y: 0 }} 
                                                exit={{ opacity: 0 }} 
                                                transition={{ duration: 0.2 }}
                                                className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-xl shadow-xl dark:shadow-2xl pointer-events-none z-30 flex items-center gap-3 backdrop-blur-md w-max">
                                                <span className="text-[10px] text-black/50 dark:text-white/40 uppercase tracking-widest font-bold">{hoveredHeatmap.date}</span>
                                                <span className="text-black/20 dark:text-white/20">—</span>
                                                <span className="text-xs font-medium text-black/90 dark:text-white/90">{hoveredHeatmap.duration}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div className="flex gap-1 overflow-x-auto hide-scrollbar w-full justify-center">
                                        <div className="grid grid-rows-7 grid-flow-col gap-1">
                                            {heatmapWeeks.map((week, wIdx) => (
                                                week.map((day, dIdx) => (
                                                    <div
                                                        key={`${wIdx}-${dIdx}`}
                                                        onMouseEnter={() => setHoveredHeatmap({ date: day.dateStr, duration: day.duration })}
                                                        onMouseLeave={() => setHoveredHeatmap(null)}
                                                        className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-[3px] transition-colors duration-300 cursor-crosshair
                                                        ${day.intensity === 0 ? 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10' : ''}
                                                        ${day.intensity === 1 ? 'bg-black/20 hover:bg-black/30 dark:bg-white/20 dark:hover:bg-white/30' : ''}
                                                        ${day.intensity === 2 ? 'bg-black/50 hover:bg-black/60 dark:bg-white/50 dark:hover:bg-white/60' : ''}
                                                        ${day.intensity === 3 ? 'bg-black/80 hover:bg-black/90 dark:bg-white/80 dark:hover:bg-white/90' : ''}
                                                        `} />
                                                ))
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mt-8 text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/30 font-bold w-full justify-between px-2">
                                        <span>Less</span>
                                        <div className="flex items-center gap-1.5 opacity-80">
                                            <div className="w-2.5 h-2.5 rounded-xs bg-black/5 dark:bg-white/5" />
                                            <div className="w-2.5 h-2.5 rounded-xs bg-black/20 dark:bg-white/20" />
                                            <div className="w-2.5 h-2.5 rounded-xs bg-black/50 dark:bg-white/50" />
                                            <div className="w-2.5 h-2.5 rounded-xs bg-black/80 dark:bg-white/80" />
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