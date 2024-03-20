/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          slideIn: 'slideIn 600ms ease-in-out forwards',
        },
        keyframes: {
          slideIn: {
            'from': { transform: 'translateX(-1000px)' },
            'to': { transform: 'translateX(100%)' }
          }
        }
      },
    },
    plugins: [],
}