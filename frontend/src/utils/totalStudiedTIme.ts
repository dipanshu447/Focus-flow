import type { Session } from "../types/Focus";

export default function totalStudiedTime(sessions: Session[]) {
    const totalStudiedSeconds = sessions.reduce((hours, value) => {
      const today = new Date().toISOString().slice(0, 10);
      return value.completedAt.slice(0, 10) === today ? hours + value.duration : hours;
    }, 0);
    const totalStudiedHours = Math.floor(totalStudiedSeconds / 3600);
    const totalStudiedMins = Math.floor((totalStudiedSeconds % 3600) / 60);
    return `${totalStudiedHours}h ${totalStudiedMins}m`;
  }