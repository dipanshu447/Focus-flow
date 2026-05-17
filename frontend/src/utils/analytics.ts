import type { Session } from "../types/Focus.ts";
import { formatTime, getHours } from "./time.ts";

export function todayStudiedTime(sessions: Session[]) {
  const todayStudiedSeconds = sessions.reduce((hours, value) => {
    const today = new Date().toISOString().slice(0, 10);
    return value.completedAt.slice(0, 10) === today ? hours + value.duration : hours;
  }, 0);
  return formatTime(todayStudiedSeconds);
}

export function totalStudiedHour(sessions: Session[]) {
  const totalStudiedSeconds = sessions.reduce((hours, value) => hours + value.duration, 0);
  const totalStudiedHours = getHours(totalStudiedSeconds);
  return `${totalStudiedHours}h`;
}

export function weeklyFocusTime(sessions: Session[]) {
  const now = new Date();
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  startOfWeek.setDate(startOfWeek.getDate() + diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const weeklySessions = sessions.filter(session => {
    const sessionDate = new Date(session.completedAt);
    return sessionDate >= startOfWeek;
  });
  const StudiedSeconds = weeklySessions.reduce((hours, value) => hours + value.duration, 0);
  return formatTime(StudiedSeconds);
}

export function monthlyFocusTime(sessions: Session[]) {
  const now = new Date();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  startOfMonth.setHours(0, 0, 0, 0);

  const monthlySessions = sessions.filter(session => {
    const sessionDate = new Date(session.completedAt);
    return sessionDate >= startOfMonth;
  });
  const StudiedSeconds = monthlySessions.reduce((hours, value) => hours + value.duration, 0);
  const StudiedHours = getHours(StudiedSeconds);
  return `${StudiedHours}h`;
}

export function getUserConsistency(sessions: Session[]) {
  const now = new Date();
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  startOfWeek.setDate(startOfWeek.getDate() + diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const weeklySessions = sessions.filter(session => {
    const sessionDate = new Date(session.completedAt);
    return sessionDate >= startOfWeek;
  });

  const focusDays = new Set(
    weeklySessions.map(session => new Date(session.completedAt).toDateString())
  ).size;

  const currentDay = now.getDay();
  const dayPassed = currentDay === 0 ? 7 : currentDay;
  return Math.round((focusDays / dayPassed) * 100); 
}