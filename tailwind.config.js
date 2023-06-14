/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ari-white": "#F6FBFF",
        "ari-gray": "#E2E7F1",
        "ari-black": "#23272F",
      },
    },
  },
  plugins: [],
};
