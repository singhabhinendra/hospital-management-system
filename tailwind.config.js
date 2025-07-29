/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [],
  // Performance optimizations
  corePlugins: {
    preflight: true
  },
  future: {
    hoverOnlyWhenSupported: true
  }
};
