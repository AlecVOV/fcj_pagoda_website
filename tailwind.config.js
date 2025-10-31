/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        'wood-brown': '#8B4513',
        'copper-gold': '#B87333',
        'cream-gold': '#F5DEB3',
        'moss-green': '#8FBC8F',
        'ivory-white': '#FFFFF0',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'lift-up': 'liftUp 0.3s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        liftUp: {
          '0%': {
            transform: 'translateY(0) scale(1)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          },
          '100%': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}