/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: '#00FF00',
        pixel: {
          background: '#000000',
          foreground: '#00FF00',
          border: '#00ff99',
        },
      },
      fontFamily: {
        pixel: ['Press Start 2P', 'monospace'],
      },
    },
  },
  plugins: [],
};
