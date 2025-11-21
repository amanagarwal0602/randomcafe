/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF8F3',
          100: '#F5F1E8',
          200: '#EBE3D1',
          300: '#E0D5BA',
          400: '#D6C7A3',
          500: '#C9A961',
          600: '#B8954D',
          700: '#987A3F',
          800: '#735C2F',
          900: '#4D3D20',
        },
        brown: {
          50: '#F7F5F4',
          100: '#EBE7E5',
          200: '#D7CFCB',
          300: '#C3B7B1',
          400: '#AF9F97',
          500: '#4A2C2A',
          600: '#3D2422',
          700: '#2F1C1A',
          800: '#221412',
          900: '#140C0A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
