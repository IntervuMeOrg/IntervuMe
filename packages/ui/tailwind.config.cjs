const { join } = require("node:path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, "./src/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./index.html"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} 