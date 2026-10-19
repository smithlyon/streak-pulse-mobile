/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        jojo: {
          bg: "#0b1320",
          card: "#111c2e",
          cardBorder: "#1e2e47",
          accent: "#38bdf8", // Sky blue
          accentGlow: "rgba(56, 189, 248, 0.35)",
          accentHover: "#0284c7",
          text: "#f0f6fc",
          muted: "#94a3b8"
        },
        chocks: {
          bg: "#13091f",
          card: "#1e1131",
          cardBorder: "#341a54",
          accent: "#c084fc", // Rich purple / neon violet
          accentGlow: "rgba(192, 132, 252, 0.35)",
          accentHover: "#a855f7",
          text: "#faf5ff",
          muted: "#a89ec4"
        }
      },
      boxShadow: {
        'jojo-glow': '0 0 25px rgba(56, 189, 248, 0.3)',
        'chocks-glow': '0 0 25px rgba(192, 132, 252, 0.3)',
      },
      fontFamily: {
        sans: ['Fredoka', 'Nunito', 'system-ui', '-apple-system', 'sans-serif'],
        playful: ['Fredoka', 'cursive', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
