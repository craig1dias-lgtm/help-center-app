/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Purple
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#1a103c', // Dark purple background
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6', // Light pink
          500: '#ec4899', // Pink
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        fifa: {
          darkPurple: '#1a103c',
          purple: '#3b1d6c',
          mediumPurple: '#2a1a5c',
          brightPurple: '#9333ea',
          pink: '#ec4899',
          lightPink: '#f472b6',
        },
        'fifa-dark-purple': '#1a103c',
        'fifa-medium-purple': '#3b1d6c',
        'fifa-light-purple': '#2a1a5c',
        'fifa-pink': '#ec4899',
        'fifa-light-pink': '#f472b6',
        'fifa-accent-purple': '#9333ea',
        'fifa-blue-purple': '#8b5cf6',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1a103c 0%, #3b1d6c 50%, #2a1a5c 100%)',
        'gradient-accent': 'linear-gradient(to right, #ec4899, #8b5cf6, #9333ea)',
        'gradient-badge': 'linear-gradient(to right, rgba(236, 72, 153, 0.3), rgba(147, 51, 234, 0.3))',
        'fifa-gradient-bg': 'linear-gradient(135deg, #1a103c 0%, #3b1d6c 50%, #2a1a5c 100%)',
        'fifa-accent-gradient': 'linear-gradient(to right, #ec4899, #8b5cf6, #9333ea)',
        'fifa-badge-gradient': 'linear-gradient(to right, rgba(236, 72, 153, 0.3), rgba(147, 51, 234, 0.3))',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}