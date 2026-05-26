export type DarkModeObj = {
  darkMode: boolean,
  toggleDarkMode: () => void,
  setTheme: (theme: "dark" | "light") => void
}