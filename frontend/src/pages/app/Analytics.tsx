import { useState, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
    FiClock, FiCalendar, FiTarget, FiActivity, FiLock
} from 'react-icons/fi';

type Timeframe = 'week' | 'month' | 'year' | 'all';

interface ChartPoint {
    label: string;
    value: number; // For relative curve height
    displayValue: string; // For tooltip (e.g., "4h 20m")
}

export default function AnalyticsPage() {
    const [activeChartTab, setActiveChartTab] = useState<Timeframe>('week');
    const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);
    const [hoveredHeatmap, setHoveredHeatmap] = useState<{ date: string, duration: string } | null>(null);

    const accountAgeDays = 45; // Set >30 to unlock all tabs for preview

    const overviewStats = [
        { label: "Overall Focus", value: "142h" },
        { label: "Today's Focus", value: "4h 20m" },
        { label: "Weekly Focus", value: "18h 45m" },
        { label: "Monthly Focus", value: "64h" },
        {
            label: "Consistency",
            value: "88%",
            subtext: "Focused on 22 of the last 25 days"
        },
    ];

    const insights = [
        { label: "Best Focus Time", value: "8:00 AM - 11:00 AM", icon: FiClock },
        { label: "Most Productive", value: "Tuesday", icon: FiCalendar },
        { label: "Avg. Duration", value: "52m per session", icon: FiTarget },
        { label: "Consistency Trend", value: "Rising", icon: FiActivity },
    ];

    const recentSessions = [
        { task: "Mera Saashu App - Production Build", duration: "90m" },
        { task: "Design System Polish", duration: "50m" },
        { task: "API Route Refactoring", duration: "1h 12m" },
    ];

    const chartTabs = [
        { id: 'week', label: 'This Week', locked: false },
        { id: 'month', label: 'This Month', locked: false },
        { id: 'year', label: 'This Year', locked: accountAgeDays < 30 },
        { id: 'all', label: 'All Time', locked: accountAgeDays < 30 }
    ] as const;

    const chartData: Record<Timeframe, ChartPoint[]> = {
        week: [
            { label: 'Mon', value: 40, displayValue: '3h 12m' },
            { label: 'Tue', value: 80, displayValue: '5h 45m' },
            { label: 'Wed', value: 45, displayValue: '3h 30m' },
            { label: 'Thu', value: 95, displayValue: '6h 10m' },
            { label: 'Fri', value: 60, displayValue: '4h 15m' },
            { label: 'Sat', value: 20, displayValue: '1h 30m' },
            { label: 'Sun', value: 10, displayValue: '45m' },
        ],
        month: [
            { label: 'Week 1', value: 65, displayValue: '18h 30m' },
            { label: 'Week 2', value: 85, displayValue: '24h 15m' },
            { label: 'Week 3', value: 45, displayValue: '14h 00m' },
            { label: 'Week 4', value: 75, displayValue: '21h 45m' },
        ],
        year: [
            { label: 'Jan', value: 30, displayValue: '42h' }, { label: 'Feb', value: 45, displayValue: '56h' },
            { label: 'Mar', value: 80, displayValue: '84h' }, { label: 'Apr', value: 60, displayValue: '68h' },
            { label: 'May', value: 90, displayValue: '92h' }, { label: 'Jun', value: 0, displayValue: '0h' },
            { label: 'Jul', value: 0, displayValue: '0h' }, { label: 'Aug', value: 0, displayValue: '0h' },
            { label: 'Sep', value: 0, displayValue: '0h' }, { label: 'Oct', value: 0, displayValue: '0h' },
            { label: 'Nov', value: 0, displayValue: '0h' }, { label: 'Dec', value: 0, displayValue: '0h' },
        ],
        all: [
            { label: '2024', value: 20, displayValue: '120h' },
            { label: '2025', value: 80, displayValue: '345h' },
            { label: '2026', value: 100, displayValue: '412h' },
        ]
    };

    const activeData = chartData[activeChartTab];

    // Helper to generate SVG path from data points
    const generatePath = (data: ChartPoint[]) => {
        if (data.length === 0) return '';
        const points = data.map((d, i) => {
            const x = (i / (data.length - 1)) * 1000;
            // Invert Y axis: 0 is bottom (300), 100 is top (50)
            const y = 300 - (d.value / 100) * 250;
            return { x, y };
        });

        let path = `M ${points[0].x},${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const curr = points[i];
            const next = points[i + 1];
            const cp1x = curr.x + (next.x - curr.x) / 2;
            const cp1y = curr.y;
            const cp2x = curr.x + (next.x - curr.x) / 2;
            const cp2y = next.y;
            path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
        }
        return path;
    };

    const activePath = generatePath(activeData);
    const heatmapWeeks = useMemo(() => {
        return Array.from({ length: 12 }).map((_, weekIdx) => {
            return Array.from({ length: 7 }).map((_, dayIdx) => {
                // Calculate a dummy date string
                const dateObj = new Date();
                dateObj.setDate(dateObj.getDate() - ((11 - weekIdx) * 7 + (6 - dayIdx)));
                const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                const r = Math.random();
                let intensity = 0;
                let duration = "No focus sessions";

                if (r > 0.4 && r < 0.6) { intensity = 1; duration = "1h 15m focused"; }
                else if (r >= 0.6 && r < 0.8) { intensity = 2; duration = "3h 40m focused"; }
                else if (r >= 0.8) { intensity = 3; duration = "6h 20m focused"; }

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
                                        {stat.subtext && (
                                            <span className="text-[10px] text-white/20 font-light mt-1 tracking-wide">{stat.subtext}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                    {/* ================= MAIN ANALYTICS GRAPH ================= */}
                    <motion.section variants={itemVariants} className="flex flex-col gap-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <h3 className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium">Focus Trajectory</h3>
                            {/* Tab Filters */}
                            <div className="flex items-center gap-2">
                                {chartTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => !tab.locked && setActiveChartTab(tab.id)}
                                        className={`relative px-4 py-2 rounded-full text-[9px] uppercase tracking-widest font-medium transition-colors flex items-center gap-2
                                ${tab.locked ? 'text-white/20 cursor-not-allowed' :
                                                activeChartTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
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
                                                d={`${activePath} L 1000,300 L 0,300 Z`}
                                                fill="url(#waveGradient)"
                                                className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                            {/* Crisp Line */}
                                            <path
                                                d={activePath}
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
                        {/* Locked Empty State Messaging */}
                        {accountAgeDays < 30 && activeChartTab === 'month' && (
                            <p className="text-[10px] uppercase tracking-widest font-light text-white/30 text-center mt-2">
                                Long-term trajectories unlock after 30 days.
                            </p>
                        )}
                    </motion.section>
                    {/* ================= LOWER SECTIONS ================= */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
                        {/* Left: Behavioral Insights & Recent Sessions */}
                        <div className="lg:col-span-7 flex flex-col gap-16">
                            <motion.section variants={itemVariants} className="flex flex-col gap-6">
                                <h3 className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium">Deep Work Insights</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {insights.map((insight, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-[#0a0a0a] border border-neutral-900 flex items-start gap-4">
                                            <div className="mt-1 text-white/20"><insight.icon size={16} /></div>
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">{insight.label}</span>
                                                <span className="text-sm font-light text-white/80">{insight.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                            <motion.section variants={itemVariants} className="flex flex-col gap-6">
                                <h3 className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium">Recent Sessions</h3>
                                <div className="flex flex-col gap-2">
                                    {recentSessions.map((session, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-neutral-950 transition-colors cursor-default border border-transparent">
                                            <span className="text-sm font-light text-white/70">{session.task}</span>
                                            <span className="text-xs font-mono text-white/40">{session.duration}</span>
                                        </div>
                                    ))}
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