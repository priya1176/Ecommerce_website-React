/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // This will include all JS and TS files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2', // Example custom color
      },
    },
  },
  plugins: [],
}
