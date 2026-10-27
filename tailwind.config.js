/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#111111",
          dark: "#111111",
          surface: "#181818",
          card: "#1F1F1F",
          border: "#E5E5E5",
          borderDark: "#2A2A2A",
          muted: "#737373",
          light: "#F5F5F5",
          white: "#FFFFFF",
          secondary: "#F5F5F5",
          mutedSurface: "#EBEBEB",
          beige: "#CBB89A",
          accent: "#FFFFFF",
        }
      },
      fontFamily: {
        display: ["Syne", "Oswald", "Bebas Neue", "Impact", "sans-serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
        mega: "0.3em",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}
