import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import { Link } from 'react-router';
import useFocus from '../../hooks/useFocus';
import type { Session } from '../../types/Focus';
import useDarkMode from '../../hooks/useDarkMode';

type PerformanceState = 'low' | 'building' | 'high' | 'late_night';

export default function Overview() {
    const { sessions } = useFocus();
    const performance = getPerformanceState(sessions);
    const [greeting, setGreeting] = useState("GOOD AFTERNOON");
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const { setTheme } = useDarkMode();
    if (user.theme) setTheme(user.theme);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 4) setGreeting("GOOD EVENING");
        else if (hour < 12) setGreeting("GOOD MORNING");
        else if (hour < 18) setGreeting("GOOD AFTERNOON");
        else setGreeting("GOOD EVENING");
    }, []);

    function getPerformanceState(sessions: Session[]): PerformanceState {
        if (!sessions.length) return 'low';

        const now = new Date();
        const recentSessions = sessions.filter(session => { // Last 7 sessions only
            const sessionDate = new Date(session.completedAt);
            return now.getTime() - sessionDate.getTime() <= 7 * 24 * 60 * 60 * 1000
        });
        const totalMins = recentSessions.reduce((acc, session) => acc + session.duration, 0);
        const activeDays = new Set(recentSessions.map(session => new Date(session.completedAt).toDateString())).size;
        const lateNightSessions = recentSessions.filter(session => {
            const hour = new Date(session.completedAt).getHours();
            return hour >= 1 && hour <= 4;
        });

        if (lateNightSessions.length >= 3 && lateNightSessions.length >= recentSessions.length * 0.4) return 'late_night';
        if (activeDays >= 5 && totalMins >= 600) return "high";
        if (activeDays >= 2 && totalMins >= 120) return "building";
        return "low";

    }

    function getMotivationalText(state?: PerformanceState) {
        switch (state) {
            case 'low':
                return {
                    headline: "Start small.",
                    subtext: "Momentum builds through repetition."
                };

            case 'building':
                return {
                    headline: "Consistency is forming.",
                    subtext: "You're showing up more often now."
                };

            case 'high':
                return {
                    headline: "Locked in lately.",
                    subtext: "Strong focus has become a pattern."
                };

            case 'late_night':
                return {
                    headline: "Still here.",
                    subtext: "Most people stopped hours ago."
                };

            default:
                return {
                    headline: "Clear the noise.",
                    subtext: "Focus on what matters next."
                };
        }
    };

    const message = getMotivationalText(performance);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen w-full text-[#e5e5e5] overflow-hidden font-sans selection:bg-white/20">
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
                }} />
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
                <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-[10%] w-[80vw] h-[80vh] bg-white/2 blur-[150px] rounded-full" />
            </div>
            <div className="relative z-10 w-full max-w-5xl px-8 md:px-16 flex flex-col">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-start">
                    <motion.p variants={itemVariants} className="text-xs md:text-sm tracking-[0.3em] font-medium text-white/30 uppercase mb-8 md:mb-12">
                        {greeting}, {user?.name ? user.name : "User"}.
                    </motion.p>
                    <motion.div variants={itemVariants} className="flex flex-col gap-2">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white/90 leading-[1.1]">
                            {message.headline}
                        </h1>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/40 leading-[1.2]">
                            {message.subtext}
                        </h2>
                    </motion.div>
                    <motion.div variants={itemVariants} className="mt-16 md:mt-24">
                        <Link to="focus" className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold tracking-[0.15em] text-sm uppercase overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 w-full h-full bg-white/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <FiPlay size={18} className="fill-current relative z-10" />
                            <span className="relative z-10">Begin Focus</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}