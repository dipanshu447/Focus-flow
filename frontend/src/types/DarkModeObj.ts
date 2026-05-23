export type DarkModeObj = {
  darkMode: string | boolean,
  toggleDarkMode: () => void,
  setTheme: (theme: "dark" | "light") => void
}