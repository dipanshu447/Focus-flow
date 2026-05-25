export type DarkModeObj = {
  darkMode: string,
  toggleDarkMode: () => void,
  setTheme: (theme: "dark" | "light") => void
}