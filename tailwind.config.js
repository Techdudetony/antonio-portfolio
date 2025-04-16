/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust as needed for your structure
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
  plugins: [
    // 👇 Custom utilities plugin for 3D flip effect
    function ({ addUtilities }) {
      addUtilities({
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.backface-visible': {
          'backface-visibility': 'visible',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.perspective': {
          perspective: '1000px',
        },
      });
    }
  ],
};
