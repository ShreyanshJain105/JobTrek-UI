
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        'mine-shaft': {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#2d3748',
          '800': '#1b2234',
          '900': '#121724',
          '950': '#090d16',
        },
        'bright-sun': {
          '50': '#fffbeb',
          '100': '#fef3c7',
          '200': '#fde68a',
          '300': '#fcd34d',
          '400': '#f59e0b',
          '500': '#d97706',
          '600': '#b45309',
          '700': '#92400e',
          '800': '#78350f',
          '900': '#451a03',
          '950': '#260d01',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(245, 158, 11, 0.2)',
        'glow': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
        'glow-lg': '0 0 40px -8px rgba(245, 158, 11, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'solar-glow': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%)',
      },
      keyframes: {
        'shimmer': {
          '100%': { transform: 'translateX(100%)' }
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 }
        }
      },
      animation: {
        'option-animation': 'option-animation 200ms ease forwards',
        'pulse-subtle': 'pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      screens: {
        'xsm': "350px",
        'xs': "476px",
        'sm': "640px",
        'md': "768px",
        'bs': '900px',
        'lg': "1024px",
        'xl': "1280px",
        '2xl': "1536px",

        '2xl-mx': { 'max': "1535px" },
        'xl-mx': { 'max': "1279px" },
        'lg-mx': { 'max': "1023px" },
        'bs-mx': { 'max': "899px" },
        'md-mx': { 'max': "767px" },
        'sm-mx': { 'max': "639px" },
        'xs-mx': { 'max': "475px" },
        'xsm-mx': { 'max': "349px" },
      },
    },
  },
  plugins: [],
}
