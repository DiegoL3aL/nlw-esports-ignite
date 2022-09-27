/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif',]
    },
    extend: {
        backgroundImage: { 
        galaxy: "url('/background-galaxy.png')",
        'nlw-gradient' : 'linear-gradient(90deg, #9179F8 0%, #45E5AF 49.48%, #DDD660 100%)',
        'game-gradient' : 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      },
    },
  },
  plugins: [],
}
