/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <- VERY IMPORTANT
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        slideUp: 'slideUp 0.8s ease-in-out',
        gradientShift: 'gradientShift 8s ease infinite alternate',
        buttonPulse: 'buttonPulse 2s infinite',
        scrollFadeIn: 'fadeIn 0.8s ease-in-out',
        scrollSlideUp: 'slideUp 0.8s ease-in-out',
        scrollSlideInLeft: 'slideInLeft 0.8s ease-in-out',
        scrollSlideInRight: 'slideInRight 0.8s ease-in-out',
        letterFadeIn: 'letterFadeIn 0.8s ease-in-out',
        textReveal: 'textReveal 0.8s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        buttonPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        letterFadeIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px) rotate(10deg) scale(0.5)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0) rotate(0) scale(1)'
          }
        },
        textReveal: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px) scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          }
        },
      },
    },
  },
  plugins: [],
};
