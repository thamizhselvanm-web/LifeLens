/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        abyss: '#090D14',
        panel: '#121A24',
        'text-warm': '#F3F0E8',
        'bio-teal': '#5EEAD4',
        'bio-amber': '#E8A669',
        line: '#243040',
        'bio-cyan': '#5EEAD4',
        coral: '#F4776E',
        mist: '#C7D6DA',
        kelp: '#121A24',
        'panel-bg': 'rgba(18, 26, 36, 0.75)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Switzer"', 'sans-serif'],
        serif: ['"Fraunces"', 'serif'],
        sans: ['"Switzer"', 'sans-serif'],
      },
      fontOpticalSizing: {
        display: 'auto',
      },
      boxShadow: {
        'glow-teal': '0 0 35px rgba(94, 234, 212, 0.35)',
        'glow-cyan': '0 0 35px rgba(94, 234, 212, 0.35)',
        'glow-amber': '0 0 35px rgba(232, 166, 105, 0.35)',
        'panel': '0 20px 50px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
