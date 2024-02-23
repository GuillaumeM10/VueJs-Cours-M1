/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {},
    screens: {
      mobile: { max: "768px" },

      tablet: { max: "1024px" },

      desktop: { max: "1280px" },
    },
  },
  plugins: [],
};
