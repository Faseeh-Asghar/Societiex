/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        societix: {
          bg: "#06090e",          // Deep obsidian canvas (anti-default AI neon)
          surface: "#0d131f",     // Elevated card / panel background
          border: "rgba(255, 255, 255, 0.08)", // Subtle hairline borders
          card: "rgba(13, 19, 31, 0.7)",       // Glassmorphic card fill
          emerald: "#10b981",    // Prestigious campus green
          gold: "#d4af37",       // Academic achievement gold
          textPrimary: "#f8fafc",// Crisp chalk white
          textSecondary: "#94a3b8", // Muted slate
          textDim: "#64748b",    // Darker supporting text
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cabinet Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      transitionTimingFunction: {
        'smooth-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
      }
    },
  },
  plugins: [],
}
