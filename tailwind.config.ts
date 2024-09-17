import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
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
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondaryDarker: "#005D8D",
        secondaryDark: "#0284C7",
        secondary: "#CFE9FA",
        secondaryLight: "#F7FCFE",
        secondaryLighter: "#F6F8FB",
      },
    },
  },
};
export default config;
