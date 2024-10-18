/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cncs-blue": "#008aa8",
        "cncs-ligthblue": "#85c7db",
      },
    },
  },
  plugins: [],
}

