import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  plugins: [require('tailwind-scrollbar-hide')],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {

    },
    boxShadow: {
      primary: "4px 8px 30px 0 #b1c4da59",
      secondary: " 0px 2px 8px 0px",
      third: "1px 1px 20px 0px #749dce4b"
    },

    extend: {
      boxShadow: {
        'custom-shadow': '0 1px 1px rgba(2, 132, 199, 0.125)',
      },
      colors: {
        dashboardBackgournd: "#F8F9FB",
        dashboardBackground: "#F8F9FB",
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondarySupperDarker: "#003553",
        secondaryDarker: "#005D8D",
        secondaryDarkerOpacity: "#0285c780",
        secondaryDark: "#0284C7",
        secondary: "#CFE9FA",
        secondaryLight: "#F7FCFE",
        secondaryLighter: "#F6F8FB",
      },
    },
  },
};
export default config;
