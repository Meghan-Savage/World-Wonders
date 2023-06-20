// This file had to be fixed
import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        scrollBanner: "scrollBanner 40s linear infinite",
      },
      keyframes: {
        scrollBanner: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = withMT(config);
