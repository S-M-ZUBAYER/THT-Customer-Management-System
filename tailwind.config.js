/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
// }

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%, 75%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1.5s infinite',
      },
    },
  },
  plugins: [],
};